import { cache } from 'react'
import { cookies } from 'next/headers'
import { fillStock } from '../templates/shared/imagery/stock.js'
import { PREVIEW_COOKIE } from './preview.js'

// The private preview token, when the visitor came in through a preview link.
// Command Center only honours it for the site it belongs to.
async function previewToken() {
  try { return (await cookies()).get(PREVIEW_COOKIE)?.value || null } catch { return null }
}

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
  const token = await previewToken()
  if (token) params.set('preview', token)
  return fetchSiteConfigCached(params.toString())
}

const fetchSiteConfigCached = cache(async (params) => {
  try {
    const res = await fetch(`${CONFIG_API}?${params}`, { cache: 'no-store' })
    if (!res.ok) return null
    return withStock(await res.json())
  } catch (e) { return null }
})

// Empty photo slots are filled from the stock library (the business's own
// photos always win). See lib/templates/shared/imagery/stock.js.
function withStock(result) {
  return result?.config ? { ...result, config: fillStock(result.config) } : result
}

const PREVIEW_API = 'https://app.machdigitalsolutions.com/api/site/preview-config'

export async function fetchPreviewConfig(token) {
  try {
    const res = await fetch(`${PREVIEW_API}?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
    if (!res.ok) return null
    return withStock(await res.json())
  } catch (e) { return null }
}

const BLOG_API = 'https://app.machdigitalsolutions.com/api/blog/public'

export async function fetchBlogIndex(slug) {
  try {
    const token = await previewToken()
    const res = await fetch(`${BLOG_API}?slug=${encodeURIComponent(slug)}${token ? `&preview=${encodeURIComponent(token)}` : ''}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

export async function fetchBlogPost(slug, postSlug) {
  try {
    const token = await previewToken()
    const res = await fetch(`${BLOG_API}?slug=${encodeURIComponent(slug)}&post=${encodeURIComponent(postSlug)}${token ? `&preview=${encodeURIComponent(token)}` : ''}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

const MOCKUP_API = 'https://app.machdigitalsolutions.com/api/mockups/public'

export const fetchMockup = cache(async (token) => {
  try {
    const res = await fetch(`${MOCKUP_API}?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
    if (!res.ok) return { error: res.status === 410 ? 'expired' : 'notfound' }
    return withStock(await res.json())
  } catch (e) {
    return { error: 'notfound' }
  }
})
