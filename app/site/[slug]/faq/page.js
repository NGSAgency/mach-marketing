import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor, previewFamily } from '../renderers/registry.js'
import { hasFaqPage } from '../../../../lib/templates/shared/claims.js'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result || !hasFaqPage(result.config)) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'faq',
    title: 'FAQ',
    description: `Questions about ${c.business.display_name}${c.primary_service_area ? ' in ' + c.primary_service_area : ''}.`,
  })
}

export default async function ClientFAQPage({ params, searchParams }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  // No questions, no page: a heading and a footer is a thin page, and it
  // used to be indexed and in the sitemap. See hasFaqPage.
  if (!result || !hasFaqPage(result.config)) notFound()
  const Renderer = rendererFor(await previewFamily(searchParams) || result.config.template_slug, 'FAQ')
  return <Renderer config={result.config} siteSlug={slug} />
}
