import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import SereneTeam from '../renderers/SereneTeam.js'

const RENDERERS = { serene: SereneTeam }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'team',
    title: 'Our Team',
    description: `Meet the providers at ${c.business.display_name}.`,
  })
}

export default async function TeamPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()

  // Only families whose industry declares a practitioners page have a team
  // renderer. Others should not expose the route at all.
  const Renderer = RENDERERS[result.config.template_slug]
  if (!Renderer) notFound()

  return <Renderer config={result.config} siteSlug={slug} />
}
