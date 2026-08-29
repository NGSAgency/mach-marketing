import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import { trackingMetadata } from '../../../lib/site/tracking.js'
import { buildHomeMetadata } from '../../../lib/templates/shared/seo/index.js'
import { notFound } from 'next/navigation'

// Import all 3 template family homes
import BoltHomeRender from './renderers/BoltHome.js'
import GroveHomeRender from './renderers/GroveHome.js'
import AxisHomeRender from './renderers/AxisHome.js'
import SereneHomeRender from './renderers/SereneHome.js'

const RENDERERS = {
  bolt: BoltHomeRender,
  grove: GroveHomeRender,
  axis: AxisHomeRender,
  serene: SereneHomeRender,
}

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
  const templateSlug = config.template_slug || 'bolt'
  const Renderer = RENDERERS[templateSlug] || RENDERERS.bolt

  return <Renderer config={config} />
}
