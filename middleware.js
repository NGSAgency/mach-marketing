import { NextResponse } from 'next/server'

const ROOT_DOMAIN = 'machdigitalsolutions.com'
const CONFIG_API = 'https://app.machdigitalsolutions.com/api/site/lookup-domain'

// Skip subdomains that are ours (not client sites)
const RESERVED_SUBDOMAINS = new Set(['app', 'api', 'www', 'admin', 'staging'])

export const config = {
  matcher: [
    // Match all paths except: static assets, _next internals, api routes, favicon
    '/((?!_next/|api/|_static/|_vercel|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|css|js)$).*)',
  ],
}

export async function middleware(request) {
  const hostname = (request.headers.get('host') || '').toLowerCase()
  const url = request.nextUrl.clone()

  // Root domain: pass through (marketing site). A visitor holding a private
  // preview cookie is looking at an unpublished site: keep it out of search
  // even if the page were shared (search engines never carry the cookie, and
  // without it an unpublished site doesn't load at all).
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}` || hostname.endsWith('.vercel.app') || !hostname.includes('.')) {
    const res = NextResponse.next()
    if (url.pathname.startsWith('/site/') && request.cookies.get('mach_preview')) res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  // Subdomain of our root: extract subdomain
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '')

    // Skip our own subdomains
    if (RESERVED_SUBDOMAINS.has(subdomain)) return NextResponse.next()

    // Rewrite to /site/{subdomain}
    if (!url.pathname.startsWith('/site/')) {
      url.pathname = `/site/${subdomain}${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  // Custom domain: look up client by hostname
  try {
    const lookupRes = await fetch(`${CONFIG_API}?domain=${encodeURIComponent(hostname)}`, {
      signal: AbortSignal.timeout(2500),
    })
    if (lookupRes.ok) {
      const data = await lookupRes.json()
      if (data.slug) {
        // Site links carry the /site/<slug> prefix (the same pages serve
        // subdomains and previews), so don't add it a second time.
        const prefix = `/site/${data.slug}`
        if (url.pathname === prefix || url.pathname.startsWith(`${prefix}/`)) return NextResponse.rewrite(url)
        url.pathname = `${prefix}${url.pathname === '/' ? '' : url.pathname}`
        return NextResponse.rewrite(url)
      }
    }
  } catch (e) {
    // Silent fail - just pass through, will 404
  }

  return NextResponse.next()
}
