import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound, redirect } from 'next/navigation'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import BoltCombo from '../../../site/[slug]/renderers/BoltCombo.js'
import GroveCombo from '../../../site/[slug]/renderers/GroveCombo.js'
import AxisCombo from '../../../site/[slug]/renderers/AxisCombo.js'
import SereneCombo from '../../../site/[slug]/renderers/SereneCombo.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = { bolt: BoltCombo, grove: GroveCombo, axis: AxisCombo, serene: SereneCombo }

export default async function MockupComboPage({ params }) {
  const { token, comboSlug } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const config = result.config

  // Combo slugs are "<service>-in-<area>"
  let matched = null
  for (const svc of config.services || []) {
    const prefix = `${svc.slug}-in-`
    if (comboSlug.startsWith(prefix)) {
      const areaSlug = comboSlug.substring(prefix.length)
      const area = (config.service_areas || []).find(a => slugify(a) === areaSlug)
      if (area) { matched = { service: svc, area }; break }
    }
  }

  if (!matched) notFound()

  // Only the first service and area pair is generated
  const firstService = (config.services || [])[0]
  const firstArea = (config.service_areas || [])[0]
  if (matched.service.slug !== firstService?.slug || matched.area !== firstArea) {
    redirect(`/mockup/${token}`)
  }

  const Renderer = RENDERERS[config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={config} siteSlug={token} service={matched.service} area={matched.area} />
      </div>
    </>
  )
}
