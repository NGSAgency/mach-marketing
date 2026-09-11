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

// How an address is compared with the redirect map (same rule as Command
// Center's redirectKey): lower-case, no trailing slash.
function redirectKey(path) {
  const [p, q] = String(path || '/').split('?')
  const clean = p.toLowerCase().replace(/\/+$/, '') || '/'
  return q ? `${clean}?${q.toLowerCase()}` : clean
}

// NextURL keeps a trailing slash when re-serialised, so use a plain URL.
function withoutTrailingSlash(request) {
  const u = new URL(request.url)
  u.pathname = u.pathname.replace(/\/+$/, '') || '/'
  return NextResponse.redirect(u, 308)
}

// Must match Command Center's api/_lib/staff-viewer.js.
async function staffKey() {
  const secret = process.env.INTERNAL_API_SECRET
  if (!secret) return null
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode('mach-staff-browser-v1')))
  return [...sig].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

async function markStaff(request) {
  const u = new URL(request.url)
  const given = u.searchParams.get('mach_staff')
  u.searchParams.delete('mach_staff')
  const res = NextResponse.redirect(u, 302)
  const key = await staffKey()
  if (key && given === key) {
    res.cookies.set('mach_staff', key, { httpOnly: true, secure: u.protocol === 'https:', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 400 })
  }
  return res
}

const lookups = new Map()
const LOOKUP_TTL = 60 * 1000
async function lookupDomain(hostname) {
  const hit = lookups.get(hostname)
  if (hit && Date.now() - hit.at < LOOKUP_TTL) return hit.data
  let data = null
  try {
    const res = await fetch(`${CONFIG_API}?domain=${encodeURIComponent(hostname)}`, { signal: AbortSignal.timeout(2500) })
    if (res.ok) data = await res.json()
  } catch (e) {
    // Couldn't reach Command Center: use what we had, however old.
    if (hit) return hit.data
  }
  lookups.set(hostname, { data, at: Date.now() })
  return data
}

export async function middleware(request) {
  const hostname = (request.headers.get('host') || '').toLowerCase()
  const url = request.nextUrl.clone()
  const trailing = url.pathname.length > 1 && url.pathname.endsWith('/')

  // Root domain: pass through (marketing site). A visitor holding a private
  // preview cookie is looking at an unpublished site: keep it out of search
  // even if the page were shared (search engines never carry the cookie, and
  // without it an unpublished site doesn't load at all).
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}` || hostname.endsWith('.vercel.app') || !hostname.includes('.')) {
    // A concept or preview opened from Command Center: remember this browser
    // as MACH staff, so our own views aren't counted or emailed about, and
    // take the key out of the address bar.
    if (url.searchParams.has('mach_staff')) return markStaff(request)
    if (trailing) return withoutTrailingSlash(request)
    // Only the middleware sets x-mach-site-origin (custom domains, below).
    let res
    if (request.headers.has('x-mach-site-origin')) {
      const headers = new Headers(request.headers)
      headers.delete('x-mach-site-origin')
      res = NextResponse.next({ request: { headers } })
    } else res = NextResponse.next()
    if (url.pathname.startsWith('/site/') && request.cookies.get('mach_preview')) res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  // Subdomain of our root: extract subdomain
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '')

    // Skip our own subdomains
    if (RESERVED_SUBDOMAINS.has(subdomain)) return NextResponse.next()

    if (trailing) return withoutTrailingSlash(request)
    // Rewrite to /site/{subdomain}
    if (!url.pathname.startsWith('/site/')) {
      url.pathname = `/site/${subdomain}${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  // Custom domain: look up the client by hostname (cached briefly per server).
  const data = await lookupDomain(hostname)
  if (data?.slug) {
    const prefix = `/site/${data.slug}`
    const canonicalHost = data.canonical_host || hostname
    const path = url.pathname

    // Old website addresses: one permanent redirect to the new page, on the
    // canonical host (www and apex both land there). Anything under the
    // /site/<slug> prefix is ours, never an old address.
    if (!path.startsWith(prefix)) {
      const redirects = data.redirects || {}
      const withQuery = url.search && /[?&](p|page_id|id|cat|tag|post)=/i.test(url.search) ? redirectKey(path + url.search) : null
      const target = (withQuery && redirects[withQuery]) || redirects[redirectKey(path)]
      if (target && redirectKey(target) !== redirectKey(path + (withQuery ? url.search : ''))) {
        const dest = new URL(target, `https://${canonicalHost}`)
        // Keep campaign tags and the like, but not the old page's own id.
        if (!withQuery && url.search && !dest.search) dest.search = url.search
        return NextResponse.redirect(dest, 301)
      }
      if (hostname !== canonicalHost || trailing) {
        return NextResponse.redirect(new URL((path.replace(/\/+$/, '') || '/') + url.search, `https://${canonicalHost}`), 301)
      }
    } else if (hostname === canonicalHost || hostname === `www.${canonicalHost}`) {
      // Pages here link to their clean addresses; an old /site/<slug>/... link
      // on the live domain goes to the clean one.
      const clean = path.slice(prefix.length) || '/'
      return NextResponse.redirect(new URL(clean + url.search, `https://${canonicalHost}`), 301)
    }

    // Serve the page. The header tells the site to link to clean addresses on
    // this domain (lib/site/fetch.js sets the config's base path from it).
    url.pathname = `${prefix}${path === '/' ? '' : path}`
    const headers = new Headers(request.headers)
    headers.set('x-mach-site-origin', `https://${canonicalHost}`)
    return NextResponse.rewrite(url, { request: { headers } })
  }

  return NextResponse.next()
}
