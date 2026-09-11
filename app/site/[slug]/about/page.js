import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor } from '../renderers/registry.js'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'about',
    title: 'About',
    description: `Learn about ${c.business.display_name}${c.business.established_year ? ', established ' + c.business.established_year : ''}.`,
  })
}

export default async function ClientAboutPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'About')
  return <Renderer config={result.config} siteSlug={slug} />
}
