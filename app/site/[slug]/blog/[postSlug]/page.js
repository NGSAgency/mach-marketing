import { fetchSiteConfig, fetchBlogPost } from '../../../../../lib/site/fetch.js'
import { buildBlogPostMetadata } from '../../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { BoltBlogPost } from '../../renderers/BoltBlog.js'
import { GroveBlogPost } from '../../renderers/GroveBlog.js'
import { AxisBlogPost } from '../../renderers/AxisBlog.js'

const RENDERERS = {
  bolt: BoltBlogPost,
  grove: GroveBlogPost,
  axis: AxisBlogPost,
}

export async function generateMetadata({ params }) {
  const { slug, postSlug } = await params
  const [siteResult, blogResult] = await Promise.all([
    fetchSiteConfig({ slug }),
    fetchBlogPost(slug, postSlug),
  ])
  if (!siteResult || !blogResult) return {}
  return buildBlogPostMetadata(siteResult.config, blogResult.post)
}

export default async function BlogPostPage({ params }) {
  const { slug, postSlug } = await params
  const [siteResult, blogResult] = await Promise.all([
    fetchSiteConfig({ slug }),
    fetchBlogPost(slug, postSlug),
  ])

  if (!siteResult || !blogResult) notFound()

  const config = siteResult.config
  const Renderer = RENDERERS[config.template_slug || 'bolt'] || RENDERERS.bolt

  return (
    <Renderer
      config={config}
      siteSlug={slug}
      post={blogResult.post}
      prev={blogResult.prev}
      next={blogResult.next}
    />
  )
}
