// Offering pages (services for a trade, treatments for a med spa), served at
// whichever URL segment the client's industry profile uses. The segment
// folders (services/, treatments/) are thin wrappers around these, so both
// URL shapes share one implementation and a site only answers at its own:
// /services on a med spa is a 404 rather than a duplicate of /treatments.
import { notFound } from 'next/navigation'
import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { buildServiceMetadata, buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor } from '../renderers/registry.js'

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())
const segmentOf = (c) => c?.profile?.nouns?.offering_url || 'services'

async function load(slug, segment, page) {
  const result = await fetchSiteConfig({ slug, ...page })
  if (!result || segmentOf(result.config) !== segment) return null
  return result
}


export async function offeringIndexMetadata({ params }, segment) {
  const { slug } = await params
  const result = await load(slug, segment)
  if (!result) return {}
  const c = result.config
  const plural = titleCase(c.profile?.nouns?.offering?.plural || 'services')
  return buildStaticMetadata(c, {
    slug: segment,
    title: `${plural}${c.primary_service_area ? ` in ${c.primary_service_area}` : ''}`,
    description: [
      `${plural} at ${c.business.display_name}${c.primary_service_area ? ` in ${c.primary_service_area}` : ''}: ${(c.services || []).slice(0, 4).map(s => s.name).join(', ')}${(c.services || []).length > 4 ? ' and more' : ''}.`,
      c.positioning?.tagline || null,
    ].filter(Boolean).join(' '),
  })
}

export async function offeringIndexPage({ params }, segment) {
  const { slug } = await params
  const result = await load(slug, segment)
  if (!result) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'Services')
  return <Renderer config={result.config} siteSlug={slug} />
}

const find = (c, serviceSlug) => (c.services || []).find(s => s.slug === serviceSlug) || null

export async function offeringDetailMetadata({ params }, segment) {
  const { slug, serviceSlug } = await params
  const result = await load(slug, segment, { page: 'service_detail', id: serviceSlug })
  const service = result && find(result.config, serviceSlug)
  if (!service) return {}
  return buildServiceMetadata(result.config, service)
}

export async function offeringDetailPage({ params }, segment) {
  const { slug, serviceSlug } = await params
  const result = await load(slug, segment, { page: 'service_detail', id: serviceSlug })
  const service = result && find(result.config, serviceSlug)
  if (!service) notFound()
  const Renderer = rendererFor(result.config.template_slug, 'ServiceDetail')
  return <Renderer config={result.config} siteSlug={slug} service={service} />
}
