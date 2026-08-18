// Fetch a client's generated site config from command-center
const CONFIG_API = 'https://app.machdigitalsolutions.com/api/site/config'

export async function fetchSiteConfig({ slug, clientId, domain }) {
  const params = new URLSearchParams()
  if (slug) params.set('slug', slug)
  else if (clientId) params.set('clientId', clientId)
  else if (domain) params.set('domain', domain)

  try {
    const res = await fetch(`${CONFIG_API}?${params}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

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
