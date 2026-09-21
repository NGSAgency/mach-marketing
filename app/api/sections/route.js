import { NextResponse } from 'next/server'
import { sectionRegistry, sectionChoices } from '../../../lib/templates/shared/sections.js'

// The section registry, for Command Center, so there is one copy of it.
//
// GET   the registry: every optional section, its words, every family's
//       defaults, where a section lands in each design, and the core that is
//       always included. Public — it is the same for every site and says
//       nothing about any client. The questionnaire reads it.
// POST  { slug, token? } one site's sections exactly as it renders them,
//       from its real config. Server to server only, for the staff panel.
//
// See lib/templates/shared/sections.js for why Command Center no longer keeps
// its own copy.

export const dynamic = 'force-dynamic'

const CONFIG_API = 'https://app.machdigitalsolutions.com/api/site/config'

export async function GET() {
  return NextResponse.json(sectionRegistry(), {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
  })
}

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

  // A retired or unknown family resolves against CREW's defaults, as the
  // registry does everywhere else.
  const family = config.template_slug || 'crew'
  return NextResponse.json({ family, locked: sectionRegistry().locked, sections: sectionChoices(config, family) })
}
