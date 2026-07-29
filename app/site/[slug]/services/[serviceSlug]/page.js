import { fetchSiteConfig } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltServiceDetail from '../../renderers/BoltServiceDetail.js'
import GroveServiceDetail from '../../renderers/GroveServiceDetail.js'
import AxisServiceDetail from '../../renderers/AxisServiceDetail.js'

const RENDERERS = { bolt: BoltServiceDetail, grove: GroveServiceDetail, axis: AxisServiceDetail }

export async function generateMetadata({ params }) {
  const { slug, serviceSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  const service = c.services.find(s => s.slug === serviceSlug)
  if (!service) return {}
  return { title: `${service.name} in ${c.primary_service_area} | ${c.business.display_name}`, description: service.description || service.short }
}

export default async function ClientServiceDetailPage({ params }) {
  const { slug, serviceSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const service = result.config.services.find(s => s.slug === serviceSlug)
  if (!service) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltServiceDetail
  return <Renderer config={result.config} siteSlug={slug} service={service} />
}
