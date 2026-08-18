import { fetchSiteConfig } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltServiceDetail from '../../renderers/BoltServiceDetail.js'
import GroveServiceDetail from '../../renderers/GroveServiceDetail.js'
import AxisServiceDetail from '../../renderers/AxisServiceDetail.js'
import { buildServiceMetadata } from '../../../../../lib/templates/shared/seo/index.js'

const RENDERERS = { bolt: BoltServiceDetail, grove: GroveServiceDetail, axis: AxisServiceDetail }

export async function generateMetadata({ params }) {
  const { slug, serviceSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  const service = c.services.find(s => s.slug === serviceSlug)
  if (!service) return {}
  return buildServiceMetadata(c, service)
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
