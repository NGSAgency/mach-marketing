import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltAreas from '../renderers/BoltAreas.js'
import GroveAreas from '../renderers/GroveAreas.js'
import AxisAreas from '../renderers/AxisAreas.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'

const RENDERERS = { bolt: BoltAreas, grove: GroveAreas, axis: AxisAreas }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'service-areas',
    title: 'Service Areas',
    description: `${c.business.display_name} serves ${c.service_areas.length} areas including ${(c.service_areas || []).slice(0, 3).join(', ')}.`,
  })
}

export default async function ClientAreasPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltAreas
  return <Renderer config={result.config} siteSlug={slug} />
}
