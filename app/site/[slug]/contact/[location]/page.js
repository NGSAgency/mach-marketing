// One location of a multi-location business: /contact/<location>.
//
// The family's own contact page, with the business details scoped to this
// location (address, phone, hours, booking link), its own LocalBusiness
// structured data tied to the main business, and the form sending leads for
// this location. A one-location business has no such pages.
import { fetchSiteConfig } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { buildStaticMetadata } from '../../../../../lib/templates/shared/seo/index.js'
import { rendererFor, previewFamily } from '../../renderers/registry.js'
import { scopedToLocation as scoped } from '../../../../../lib/site/location-page.js'

export async function generateMetadata({ params }) {
  const { slug, location } = await params
  const result = await fetchSiteConfig({ slug })
  const c = result && scoped(result.config, location)
  if (!c) return {}
  const loc = c.current_location
  return buildStaticMetadata(c, {
    slug: `contact/${loc.slug}`,
    title: `${loc.name} location`,
    description: `${c.business.display_name} in ${loc.city || loc.name}${loc.address_line ? ', ' + loc.address_line : ''}${loc.phone_display ? '. Call ' + loc.phone_display : ''}.`,
  })
}

export default async function LocationContactPage({ params, searchParams }) {
  const { slug, location } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()
  const c = scoped(result.config, location)
  if (!c) notFound()
  const Renderer = rendererFor(await previewFamily(searchParams) || c.template_slug, 'Contact')
  return <Renderer config={c} siteSlug={slug} />
}
