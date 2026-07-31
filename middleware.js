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

  // Root domain: pass through (marketing site)
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
    return NextResponse.next()
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
        url.pathname = `/site/${data.slug}${url.pathname === '/' ? '' : url.pathname}`
        return NextResponse.rewrite(url)
      }
    }
  } catch (e) {
    // Silent fail - just pass through, will 404
  }

  return NextResponse.next()
}
