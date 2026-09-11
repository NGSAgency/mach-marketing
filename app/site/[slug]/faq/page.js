import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltFAQ from '../renderers/BoltFAQ.js'
import GroveFAQ from '../renderers/GroveFAQ.js'
import AxisFAQ from '../renderers/AxisFAQ.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import SereneFAQ from '../renderers/SereneFAQ.js'
import CrewFAQ from '../renderers/CrewFAQ.js'

const RENDERERS = { bolt: BoltFAQ, grove: GroveFAQ, axis: AxisFAQ, serene: SereneFAQ, crew: CrewFAQ }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'faq',
    title: 'FAQ',
    description: `Questions about ${c.business.display_name}${c.primary_service_area ? ' in ' + c.primary_service_area : ''}.`,
  })
}

export default async function ClientFAQPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltFAQ
  return <Renderer config={result.config} siteSlug={slug} />
}
