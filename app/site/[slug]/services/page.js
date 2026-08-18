import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltServices from '../renderers/BoltServices.js'
import GroveServices from '../renderers/GroveServices.js'
import AxisServices from '../renderers/AxisServices.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'

const RENDERERS = { bolt: BoltServices, grove: GroveServices, axis: AxisServices }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'services',
    title: 'Services',
    description: `${c.services.length} services offered across ${c.primary_service_area}. ${c.positioning?.tagline || ''}`,
  })
}

export default async function ClientServicesPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltServices
  return <Renderer config={result.config} siteSlug={slug} />
}
