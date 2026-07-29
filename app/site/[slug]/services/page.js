import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltServices from '../renderers/BoltServices.js'
import GroveServices from '../renderers/GroveServices.js'
import AxisServices from '../renderers/AxisServices.js'

const RENDERERS = { bolt: BoltServices, grove: GroveServices, axis: AxisServices }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return { title: `Services | ${c.business.display_name}`, description: `${c.services.length} services · ${c.primary_service_area}` }
}

export default async function ClientServicesPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltServices
  return <Renderer config={result.config} siteSlug={slug} />
}
