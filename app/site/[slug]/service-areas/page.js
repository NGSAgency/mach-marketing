import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltAreas from '../renderers/BoltAreas.js'
import GroveAreas from '../renderers/GroveAreas.js'
import AxisAreas from '../renderers/AxisAreas.js'

const RENDERERS = { bolt: BoltAreas, grove: GroveAreas, axis: AxisAreas }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return { title: `Service Areas | ${c.business.display_name}`, description: `${c.service_areas.length}+ neighborhoods across ${c.primary_service_area}` }
}

export default async function ClientAreasPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltAreas
  return <Renderer config={result.config} siteSlug={slug} />
}
