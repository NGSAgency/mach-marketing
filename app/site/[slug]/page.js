import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import { trackingMetadata } from '../../../lib/site/tracking.js'
import { buildHomeMetadata } from '../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'
import { rendererFor, familyKey } from './renderers/registry.js'
import { stepsFrom } from './renderers/family/data.js'


// The page declares `let process` further down (Level's visit steps), which
// shadows the global for the whole function, so the environment is read here.
const DEV = process.env.NODE_ENV === 'development'

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

export default async function ClientSitePage({ params, searchParams }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()

  const config = result.config
  // Development only: ?family=stage draws the page in another family's
  // layout, so a change can be checked across all of them without rewriting
  // the client's record. Ignored anywhere but a dev server.
  const preview = DEV ? (await searchParams)?.family || null : null
  const family = familyKey(preview || config.template_slug)
  const Renderer = rendererFor(preview || config.template_slug, 'Home')

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
