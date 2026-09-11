import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltContact from '../renderers/BoltContact.js'
import GroveContact from '../renderers/GroveContact.js'
import AxisContact from '../renderers/AxisContact.js'
import SereneContact from '../renderers/SereneContact.js'
import CrewContact from '../renderers/CrewContact.js'
import { buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'

const RENDERERS = { bolt: BoltContact, grove: GroveContact, axis: AxisContact, serene: SereneContact, crew: CrewContact }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const c = result.config
  return buildStaticMetadata(c, {
    slug: 'contact',
    title: 'Contact',
    description: `Contact ${c.business.display_name}${c.primary_service_area ? ' for service in ' + c.primary_service_area : ''}${c.business.phone_display ? '. Call ' + c.business.phone_display : ''}.`,
  })
}

export default async function ClientContactPage({ params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const Renderer = RENDERERS[result.config.template_slug] || BoltContact
  return <Renderer config={result.config} siteSlug={slug} />
}
