import { NextResponse } from 'next/server'
import { fetchPreviewConfig } from '../../../lib/site/fetch.js'
import { PREVIEW_COOKIE } from '../../../lib/site/preview.js'

export const dynamic = 'force-dynamic'

/**
 * A private preview link: /preview-site/<token>.
 *
 * Checks the token with Command Center (which counts the view), then sets the
 * preview cookie and sends the visitor to the site itself, so every page of
 * the unpublished site works exactly as it will after launch: treatments,
 * locations, combos, contact, the form. Pages are only served to requests
 * carrying the matching token, and are marked noindex (middleware).
 */
export async function GET(request, { params }) {
  const { token } = await params
  const result = await fetchPreviewConfig(token)
  const slug = result?.meta?.slug
  if (!slug) {
    return new NextResponse('<!doctype html><title>Preview not found</title><p style="font-family:system-ui;padding:40px">This preview link is not active. Ask MACH Digital Solutions for a new one.</p>', {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
    })
  }
  const res = NextResponse.redirect(new URL(`/site/${slug}`, request.url), 302)
  res.cookies.set(PREVIEW_COOKIE, token, {
    httpOnly: true,
    secure: new URL(request.url).protocol === 'https:',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  res.headers.set('x-robots-tag', 'noindex, nofollow')
  return res
}
