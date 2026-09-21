import { NextResponse } from 'next/server'
import { crawlSite, judgeAnswers, countAnswers } from '../../../lib/site/field-audit.js'
import { PREVIEW_COOKIE } from '../../../lib/site/preview.js'

// POST /api/field-audit  { slug, token? }
//
// Whether every answer a client gave appears on their site, for Command
// Center's pre-publish crawl: a stranded answer or a raw database value on a
// page blocks the launch there like any other failed check. The judgement is
// lib/site/field-audit.js, the same one the design sweep uses, kept here
// beside the renderers rather than copied into Command Center.
//
// Server to server only: it crawls a whole site, so it answers only to the
// secret the two projects already share. It audits the family the client is
// on — the family preview is a development tool and does not work here.

export const dynamic = 'force-dynamic'
export const maxDuration = 120

const CONFIG_API = 'https://app.machdigitalsolutions.com/api/site/config'

export async function POST(req) {
  const secret = process.env.INTERNAL_API_SECRET
  if (!secret || req.headers.get('x-internal-secret') !== secret) {
    return NextResponse.json({ error: 'Not allowed.' }, { status: 401 })
  }
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const slug = String(body?.slug || '').trim()
  const token = body?.token ? String(body.token) : null
  if (!/^[a-z0-9-]+$/.test(slug)) return NextResponse.json({ error: 'A site slug is required.' }, { status: 400 })

  // The config as the site itself reads it, with the preview token so a site
  // that is not live yet answers.
  let config
  try {
    const params = new URLSearchParams({ slug })
    if (token) params.set('preview', token)
    const res = await fetch(`${CONFIG_API}?${params}`, { cache: 'no-store', signal: AbortSignal.timeout(20000) })
    if (!res.ok) return NextResponse.json({ error: `The site's config did not load (${res.status}).` }, { status: 502 })
    const data = await res.json()
    config = data.config || data
  } catch (e) {
    return NextResponse.json({ error: `The site's config did not load: ${e.message}` }, { status: 502 })
  }

  // The section rules treat a retired or unknown family as CREW, as the
  // registry does, so the template name is enough; importing the registry
  // would pull every renderer into this endpoint to learn the same thing.
  const family = config.template_slug || 'crew'
  const origin = new URL(req.url).origin
  const { pages, unreachable } = await crawlSite({
    origin, slug,
    headers: { 'user-agent': 'MACH-FieldAudit/1.0', ...(token ? { cookie: `${PREVIEW_COOKIE}=${token}` } : {}) },
    maxPages: 400, concurrency: 6, timeout: 20000, attempts: 2,
  })
  const rendered = pages.filter(p => p.status === 200)

  // A site with pages we could not fetch has not been audited, and saying so
  // is the whole value of the answer. It is reported, never scored.
  if (unreachable.length || rendered.length === 0) {
    return NextResponse.json({
      audited: false, family, pages: pages.length,
      unreachable: unreachable.slice(0, 20),
      reason: rendered.length === 0 ? 'No page of the site rendered.' : `${unreachable.length} pages could not be fetched.`,
    })
  }

  const result = judgeAnswers({ config, htmls: rendered.map(p => p.html), family })
  return NextResponse.json({
    audited: true, family, pages: pages.length, answers: countAnswers(config),
    unpublished: result.unpublished.map(e => ({ path: e.path, value: e.value.slice(0, 160) })),
    raw: result.raw.map(e => ({ path: e.path, value: e.value })),
    switchedOff: result.switchedOff,
    galleryNote: result.galleryNote,
  })
}
