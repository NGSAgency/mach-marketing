import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltContact from '../renderers/BoltContact.js'
import GroveContact from '../renderers/GroveContact.js'
import AxisContact from '../renderers/AxisContact.js'

const RENDERERS = { bolt: BoltContact, grove: GroveContact, axis: AxisContact }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return { title: `Contact | ${c.business.display_name}`, description: `Contact ${c.business.display_name} for service in ${c.primary_service_area}.` }
}

export default async function ClientContactPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltContact
  return <Renderer config={result.config} siteSlug={slug} />
}
