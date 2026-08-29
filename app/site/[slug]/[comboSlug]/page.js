import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import BoltCombo from '../renderers/BoltCombo.js'
import GroveCombo from '../renderers/GroveCombo.js'
import AxisCombo from '../renderers/AxisCombo.js'
import SereneCombo from '../renderers/SereneCombo.js'
import { buildComboMetadata } from '../../../../lib/templates/shared/seo/index.js'

const RENDERERS = { bolt: BoltCombo, grove: GroveCombo, axis: AxisCombo, serene: SereneCombo }

function parseComboSlug(comboSlug, config) {
  for (const svc of config.services) {
    const prefix = `${svc.slug}-in-`
    if (comboSlug.startsWith(prefix)) {
      const areaSlug = comboSlug.substring(prefix.length)
      const area = config.service_areas.find(a => slugify(a) === areaSlug)
      if (area) return { service: svc, area }
    }
  }
  return null
}

export async function generateMetadata({ params }) {
  const { slug, comboSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) return {}
  const parsed = parseComboSlug(comboSlug, result.config)
  if (!parsed) return {}
  const c = result.config
  return buildComboMetadata(c, parsed.service, parsed.area)
}

export default async function ClientComboPage({ params }) {
  const { slug, comboSlug } = await params
  const result = await fetchSiteConfig({ slug })
  if (!result) notFound()

  // If this slug is a reserved static path, defer to that page (about, contact, faq handled by their own routes)
  const RESERVED = ['about', 'contact', 'faq', 'services', 'service-areas']
  if (RESERVED.includes(comboSlug)) notFound()

  const parsed = parseComboSlug(comboSlug, result.config)
  if (!parsed) notFound()

  const Renderer = RENDERERS[result.config.template_slug] || BoltCombo
  return <Renderer config={result.config} siteSlug={slug} service={parsed.service} area={parsed.area} />
}
