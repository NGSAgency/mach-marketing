// Place pages (service areas for a trade, locations for a med spa), served at
// the URL segment the client's industry profile uses. See offerings.js.
import { notFound } from 'next/navigation'
import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { buildAreaMetadata, buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor } from '../renderers/registry.js'

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())
const segmentOf = (c) => c?.profile?.nouns?.place_url || 'service-areas'

async function load(slug, segment, page) {
  const result = await fetchSiteConfig({ slug, ...page })
  if (!result || segmentOf(result.config) !== segment) return null
  return result
}


export async function placeIndexMetadata({ params }, segment) {
  const { slug } = await params
  const result = await load(slug, segment)
  if (!result) return {}
  const c = result.config
  const areas = (c.service_areas || []).filter(Boolean)
  const plural = titleCase(c.profile?.nouns?.place?.plural || 'service areas')
  return buildStaticMetadata(c, {
    slug: segment,
    title: plural,
    description: areas.length
      ? `${c.business.display_name} serves ${areas.slice(0, 4).join(', ')}${areas.length > 4 ? ' and more' : ''}.`
      : `${plural} served by ${c.business.display_name}.`,
  })
}

export async function placeIndexPage({ params }, segment) {
  const { slug } = await params
  const result = await load(slug, segment)
  if (!result) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'Areas')
  return <Renderer config={result.config} siteSlug={slug} />
}


export async function placeDetailMetadata({ params }, segment) {
  const { slug, areaSlug } = await params
  const result = await load(slug, segment, { page: 'area_detail', id: areaSlug })
  const area = result && (result.config.service_areas || []).find(a => slugify(a) === areaSlug)
  if (!area) return {}
  return buildAreaMetadata(result.config, area)
}

export async function placeDetailPage({ params }, segment) {
  const { slug, areaSlug } = await params
  const result = await load(slug, segment, { page: 'area_detail', id: areaSlug })
  const area = result && (result.config.service_areas || []).find(a => slugify(a) === areaSlug)
  if (!area) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'AreaDetail')
  return <Renderer config={result.config} siteSlug={slug} area={area} />
}
