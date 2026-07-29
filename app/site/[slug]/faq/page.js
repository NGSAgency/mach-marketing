import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltFAQ from '../renderers/BoltFAQ.js'
import GroveFAQ from '../renderers/GroveFAQ.js'
import AxisFAQ from '../renderers/AxisFAQ.js'

const RENDERERS = { bolt: BoltFAQ, grove: GroveFAQ, axis: AxisFAQ }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return { title: `FAQ | ${c.business.display_name}`, description: `Common questions about ${c.business.display_name} services.` }
}

export default async function ClientFAQPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltFAQ
  return <Renderer config={result.config} siteSlug={slug} />
}
