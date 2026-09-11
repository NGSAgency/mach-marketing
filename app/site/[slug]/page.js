import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import { trackingMetadata } from '../../../lib/site/tracking.js'
import { buildHomeMetadata } from '../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { rendererFor } from './renderers/registry.js'


export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return {
    ...buildHomeMetadata(c),
    ...trackingMetadata(c.tracking),
  }
}

export default async function ClientSitePage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()

  const config = result.config
  const templateSlug = config.template_slug
  const Renderer = rendererFor(templateSlug, 'Home')

  return <Renderer config={config} siteSlug={slug} />
}
