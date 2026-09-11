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
    slug: 'faq',
    title: 'FAQ',
    description: `Questions about ${c.business.display_name}${c.primary_service_area ? ' in ' + c.primary_service_area : ''}.`,
  })
}

export default async function ClientFAQPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'FAQ')
  return <Renderer config={result.config} siteSlug={slug} />
}
