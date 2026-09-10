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

// The combo's copy is stored under "<area>/<service>". The slug has to be
// parsed against the service list first, so the plain config is fetched, then
// the one carrying this page's copy (both requests are shared with the page).
async function loadCombo(slug, comboSlug) {
  const base = await fetchSiteConfig({ slug })
  if (!base) return null
  const parsed = parseComboSlug(comboSlug, base.config)
  if (!parsed) return null
  const withCopy = await fetchSiteConfig({ slug, page: 'combo', id: `${slugify(parsed.area)}/${parsed.service.slug}` })
  return { config: (withCopy || base).config, ...parsed }
}

export async function generateMetadata({ params }) {
  const { slug, comboSlug } = await params
  const combo = await loadCombo(slug, comboSlug)
  if (!combo) return {}
  return buildComboMetadata(combo.config, combo.service, combo.area)
}

export default async function ClientComboPage({ params }) {
  const { slug, comboSlug } = await params
  // Reserved paths have their own routes.
  const RESERVED = ['about', 'contact', 'faq', 'services', 'service-areas', 'treatments', 'locations', 'concerns', 'team', 'blog']
  if (RESERVED.includes(comboSlug)) notFound()

  const combo = await loadCombo(slug, comboSlug)
  if (!combo) notFound()

  const Renderer = RENDERERS[combo.config.template_slug] || BoltCombo
  return <Renderer config={combo.config} siteSlug={slug} service={combo.service} area={combo.area} />
}
