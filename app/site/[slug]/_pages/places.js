// Place pages (service areas for a trade, locations for a med spa), served at
// the URL segment the client's industry profile uses. See offerings.js.
import { notFound } from 'next/navigation'
import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { buildAreaMetadata, buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor, previewFamily } from '../renderers/registry.js'

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
    // A full sentence: what they offer, where, and how to book. The old one
    // line ("X serves Kansas City.") was too short to be worth showing.
    description: placeIndexDescription(c, areas, plural),
  })
}

export async function placeIndexPage({ params, searchParams }, segment) {
  const { slug } = await params
  const result = await load(slug, segment)
  if (!result) notFound()
  const Renderer = rendererFor(await previewFamily(searchParams) || result.config.template_slug, 'Areas')
  return <Renderer config={result.config} siteSlug={slug} />
}


export async function placeDetailMetadata({ params }, segment) {
  const { slug, areaSlug } = await params
  const result = await load(slug, segment, { page: 'area_detail', id: areaSlug })
  const area = result && (result.config.service_areas || []).find(a => slugify(a) === areaSlug)
  if (!area) return {}
  return buildAreaMetadata(result.config, area)
}

export async function placeDetailPage({ params, searchParams }, segment) {
  const { slug, areaSlug } = await params
  const result = await load(slug, segment, { page: 'area_detail', id: areaSlug })
  const area = result && (result.config.service_areas || []).find(a => slugify(a) === areaSlug)
  if (!area) notFound()
  const Renderer = rendererFor(await previewFamily(searchParams) || result.config.template_slug, 'AreaDetail')
  return <Renderer config={result.config} siteSlug={slug} area={area} />
}

function placeIndexDescription(c, areas, plural) {
  const name = c.business.display_name
  const offering = String(c.profile?.nouns?.offering?.plural || 'services').toLowerCase()
  const phone = String(c.business?.phone || '').trim()
  const list = areas.slice(0, 4).map(a => String(a).trim()).join(', ') + (areas.length > 4 ? ' and more' : '')
  const book = phone ? ` Call ${phone} or book online.` : ' Book online.'
  return areas.length
    ? `${name} offers ${offering} in ${list}. See what is available near you.${book}`
    : `${plural} served by ${name}, with the ${offering} available in each.${book}`
}
