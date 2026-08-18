import { fetchSiteConfig } from '../../../lib/site/fetch.js'

export const dynamic = 'force-dynamic'

export default async function robots({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })

  // No config means the site is unpublished or missing - do not invite crawlers
  if (!result) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  const config = result.config
  const baseUrl = config?.meta?.canonical || `https://machdigitalsolutions.com/site/${slug}`

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  }
}
