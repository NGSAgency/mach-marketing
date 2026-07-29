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
