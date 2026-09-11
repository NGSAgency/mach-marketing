import { fetchSiteConfig, fetchBlogPost } from '../../../../../lib/site/fetch.js'
import { buildBlogPostMetadata } from '../../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { rendererFor } from '../../renderers/registry.js'

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
  const Renderer = rendererFor(config.template_slug, 'BlogPost')

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
