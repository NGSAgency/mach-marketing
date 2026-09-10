import { cache } from 'react'

// Fetch a client's generated site config from command-center
const CONFIG_API = 'https://app.machdigitalsolutions.com/api/site/config'

// The layout (for fonts) and the page both need the config. cache() makes
// them share one request per render; it keys on arguments, so the lookup is
// reduced to a string first.
// page/id ask for one page's reviewed copy as config.page_copy (see Command
// Center api/site/config.js).
export async function fetchSiteConfig({ slug, clientId, domain, page, id }) {
  const params = new URLSearchParams()
  if (slug) params.set('slug', slug)
  else if (clientId) params.set('clientId', clientId)
  else if (domain) params.set('domain', domain)
  if (page) { params.set('page', page); if (id) params.set('id', id) }
  return fetchSiteConfigCached(params.toString())
}

const fetchSiteConfigCached = cache(async (params) => {
  try {
    const res = await fetch(`${CONFIG_API}?${params}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
})

const PREVIEW_API = 'https://app.machdigitalsolutions.com/api/site/preview-config'

export async function fetchPreviewConfig(token) {
  try {
    const res = await fetch(`${PREVIEW_API}?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

const BLOG_API = 'https://app.machdigitalsolutions.com/api/blog/public'

export async function fetchBlogIndex(slug) {
  try {
    const res = await fetch(`${BLOG_API}?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

export async function fetchBlogPost(slug, postSlug) {
  try {
    const res = await fetch(`${BLOG_API}?slug=${encodeURIComponent(slug)}&post=${encodeURIComponent(postSlug)}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

const MOCKUP_API = 'https://app.machdigitalsolutions.com/api/mockups/public'

export const fetchMockup = cache(async (token) => {
  try {
    const res = await fetch(`${MOCKUP_API}?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
    if (!res.ok) return { error: res.status === 410 ? 'expired' : 'notfound' }
    return await res.json()
  } catch (e) {
    return { error: 'notfound' }
  }
})
