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
    slug: 'contact',
    title: 'Contact',
    description: `Contact ${c.business.display_name}${c.primary_service_area ? ' for service in ' + c.primary_service_area : ''}${c.business.phone_display ? '. Call ' + c.business.phone_display : ''}.`,
  })
}

export default async function ClientContactPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'Contact')
  return <Renderer config={result.config} siteSlug={slug} />
}
