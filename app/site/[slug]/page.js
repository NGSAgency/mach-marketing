import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import { trackingMetadata } from '../../../lib/site/tracking.js'
import { buildHomeMetadata } from '../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { rendererFor, familyKey } from './renderers/registry.js'
import { stepsFrom } from './renderers/family/data.js'


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
  const family = familyKey(config.template_slug)
  const Renderer = rendererFor(config.template_slug, 'Home')

  // Level's home page shows how a visit goes. Those steps are written for one
  // service, not for the business in general, so they are fetched with that
  // service's copy and shown under its name. No steps written, nothing shown.
  let process = null
  if (family === 'level') {
    const service = (config.services || [])[0]
    if (service) {
      const withCopy = await fetchSiteConfig({ slug, page: 'service_detail', id: service.slug })
      const steps = stepsFrom(withCopy?.config?.page_copy?.what_to_expect)
      if (steps) process = { steps, service }
    }
  }

  return <Renderer config={config} siteSlug={slug} process={process} />
}
