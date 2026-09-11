import { fetchSiteConfig, fetchBlogIndex } from '../../../../lib/site/fetch.js'
import { buildBlogIndexMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { rendererFor } from '../renderers/registry.js'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  return buildBlogIndexMetadata(result.config)
}

export default async function BlogIndexPage({ params }) {
  const { slug } = await params
  const [siteResult, blogResult] = await Promise.all([
    fetchSiteConfig({ slug }),
    fetchBlogIndex(slug),
  ])

  if (!siteResult) notFound()

  const config = siteResult.config
  const Renderer = rendererFor(config.template_slug, 'BlogIndex')

  return <Renderer config={config} siteSlug={slug} posts={blogResult?.posts || []} />
}
