import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor, previewFamily } from '../renderers/registry.js'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'privacy',
    title: 'Privacy',
    description: `What ${c.business.display_name}'s website collects, why, and what you can do about it.`,
  })
}

export default async function ClientPrivacyPage({ params, searchParams }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = rendererFor(await previewFamily(searchParams) || result.config.template_slug, 'Privacy')
  return <Renderer config={result.config} siteSlug={slug} />
}
