import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { rendererFor, previewFamily } from '../renderers/registry.js'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'team',
    title: 'Our Team',
    // Names and roles, so the search snippet says who they will see rather
    // than a one-line placeholder Google treats as thin
    description: teamDescription(c),
  })
}

export default async function TeamPage({ params, searchParams }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()

  // Only families whose industry declares a practitioners page have a team
  // renderer. Others should not expose the route at all.
  const Renderer = rendererFor(await previewFamily(searchParams) || result.config.template_slug, 'Team')
  if (!Renderer) notFound()

  return <Renderer config={result.config} siteSlug={slug} />
}

function teamDescription(c) {
  const name = c.business.display_name
  const city = String(c.business?.city || (c.service_areas || [])[0] || '').trim()
  const people = (c.providers || []).filter(p => p && p.name)
    .map(p => p.title ? `${p.name}, ${p.title}` : p.name)
  const where = city ? ` in ${city}` : ''
  if (!people.length) return `Meet the providers at ${name}${where}, and book a consultation with the right person for your goals.`
  return `Meet the providers at ${name}${where}: ${people.join('; ')}.`
}
