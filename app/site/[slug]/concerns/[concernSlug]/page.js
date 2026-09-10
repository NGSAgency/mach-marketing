import { fetchSiteConfig } from '../../../../../lib/site/fetch.js'
import { buildStaticMetadata } from '../../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import SereneConcern from '../../renderers/SereneConcern.js'

const RENDERERS = { serene: SereneConcern }

function findConcern(config, slug) {
  return (config.concerns || []).find(c => c.slug === slug) || null
}

export async function generateMetadata({ params }) {
  const { slug, concernSlug } = await params
  const result = await fetchSiteConfig({ slug, page: 'concern_detail', id: concernSlug })
  if (!result) return {}
  const concern = findConcern(result.config, concernSlug)
  if (!concern) return {}
  const c = result.config
  const city = c.primary_service_area || c.business.address_line || ''
  return buildStaticMetadata(c, {
    slug: `concerns/${concernSlug}`,
    title: `${concern.label}${city ? ` in ${city}` : ''}`,
    description: `What contributes to ${concern.label.toLowerCase()} and the approaches available at ${c.business.display_name}.`,
  })
}

export default async function ConcernPage({ params }) {
  const { slug, concernSlug } = await params
  const result = await fetchSiteConfig({ slug, page: 'concern_detail', id: concernSlug })
  if (!result) notFound()

  const concern = findConcern(result.config, concernSlug)
  if (!concern) notFound()

  const Renderer = RENDERERS[result.config.template_slug]
  if (!Renderer) notFound()

  return <Renderer config={result.config} siteSlug={slug} concern={concern} />
}
