import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltAbout from '../renderers/BoltAbout.js'
import GroveAbout from '../renderers/GroveAbout.js'
import AxisAbout from '../renderers/AxisAbout.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import SereneAbout from '../renderers/SereneAbout.js'

const RENDERERS = { bolt: BoltAbout, grove: GroveAbout, axis: AxisAbout, serene: SereneAbout }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'about',
    title: 'About',
    description: `Learn about ${c.business.display_name}${c.business.established_year ? ', established ' + c.business.established_year : ''}.`,
  })
}

export default async function ClientAboutPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltAbout
  return <Renderer config={result.config} siteSlug={slug} />
}
