import { fetchSiteConfig, fetchBlogIndex } from '../../../../lib/site/fetch.js'
import { buildBlogIndexMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { BoltBlogIndex } from '../renderers/BoltBlog.js'
import { GroveBlogIndex } from '../renderers/GroveBlog.js'
import { AxisBlogIndex } from '../renderers/AxisBlog.js'

const RENDERERS = {
  bolt: BoltBlogIndex,
  grove: GroveBlogIndex,
  axis: AxisBlogIndex,
}

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
  const Renderer = RENDERERS[config.template_slug || 'bolt'] || RENDERERS.bolt

  return <Renderer config={config} siteSlug={slug} posts={blogResult?.posts || []} />
}
