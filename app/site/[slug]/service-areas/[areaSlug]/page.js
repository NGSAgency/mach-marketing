import { fetchSiteConfig } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import BoltAreaDetail from '../../renderers/BoltAreaDetail.js'
import GroveAreaDetail from '../../renderers/GroveAreaDetail.js'
import AxisAreaDetail from '../../renderers/AxisAreaDetail.js'

const RENDERERS = { bolt: BoltAreaDetail, grove: GroveAreaDetail, axis: AxisAreaDetail }

export async function generateMetadata({ params }) {
  const { slug, areaSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  const area = c.service_areas.find(a => slugify(a) === areaSlug)
  if (!area) return {}
  return { title: `Home Service in ${area} | ${c.business.display_name}`, description: `${c.services.length}+ services in ${area}. Same-day response.` }
}

export default async function ClientAreaDetailPage({ params }) {
  const { slug, areaSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const area = result.config.service_areas.find(a => slugify(a) === areaSlug)
  if (!area) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltAreaDetail
  return <Renderer config={result.config} siteSlug={slug} area={area} />
}
