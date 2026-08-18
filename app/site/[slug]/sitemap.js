import { fetchSiteConfig, fetchBlogIndex } from '../../../lib/site/fetch.js'
import { generateSitemap } from '../../../lib/templates/shared/seo/index.js'

export const dynamic = 'force-dynamic'

export default async function sitemap({ params }) {
  const { slug } = await params

  const [siteResult, blogResult] = await Promise.all([
    fetchSiteConfig({ slug }),
    fetchBlogIndex(slug),
  ])

  if (!siteResult) return []

  const config = siteResult.config
  const baseUrl = config?.meta?.canonical || `https://machdigitalsolutions.com/site/${slug}`

  return generateSitemap(config, baseUrl, blogResult?.posts || [])
}
