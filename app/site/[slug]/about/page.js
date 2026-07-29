import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltAbout from '../renderers/BoltAbout.js'
import GroveAbout from '../renderers/GroveAbout.js'
import AxisAbout from '../renderers/AxisAbout.js'

const RENDERERS = { bolt: BoltAbout, grove: GroveAbout, axis: AxisAbout }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return { title: `About | ${c.business.display_name}`, description: `Family-owned since ${c.business.established_year}. Meet the ${c.business.display_name} team.` }
}

export default async function ClientAboutPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltAbout
  return <Renderer config={result.config} siteSlug={slug} />
}
