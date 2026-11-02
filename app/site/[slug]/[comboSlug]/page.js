import { fetchSiteConfig } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { slugify, comboAllowed } from '../../../../lib/templates/shared/seo/urls.js'
import { buildComboMetadata, buildStaticMetadata } from '../../../../lib/templates/shared/seo/index.js'
import { rendererFor, previewFamily } from '../renderers/registry.js'

function parseComboSlug(comboSlug, config) {
  for (const svc of config.services) {
    const prefix = `${svc.slug}-in-`
    if (comboSlug.startsWith(prefix)) {
      const areaSlug = comboSlug.substring(prefix.length)
      const area = config.service_areas.find(a => slugify(a) === areaSlug)
      // Only pairs that have a page: town pages can be switched off per service
      if (area && comboAllowed(config, svc, area)) return { service: svc, area }
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

// The specials page sits at the top level too, at whatever address the
// client's old site used (/pricing-and-promotions, /specials). It is checked
// before the town pages; Command Center never lets its address look like one.
async function loadSpecials(slug, comboSlug) {
  const base = await fetchSiteConfig({ slug })
  const sp = base?.config?.specials
  return sp?.slug && sp.slug === String(comboSlug).toLowerCase() ? base : null
}

export async function generateMetadata({ params }) {
  const { slug, comboSlug } = await params
  const special = await loadSpecials(slug, comboSlug)
  if (special) {
    const c = special.config
    const names = (c.specials.items || []).map(i => i.name).slice(0, 4)
    return buildStaticMetadata(c, {
      slug: c.specials.slug,
      title: c.specials.title,
      description: c.specials.intro?.length <= 160 ? c.specials.intro
        : `${c.specials.title} at ${c.business.display_name}${names.length ? `: ${names.join(', ')}` : ''}.`.slice(0, 300),
    })
  }
  const combo = await loadCombo(slug, comboSlug)
  if (!combo) return {}
  return buildComboMetadata(combo.config, combo.service, combo.area)
}

export default async function ClientComboPage({ params, searchParams }) {
  const { slug, comboSlug } = await params
  // Reserved paths have their own routes.
  const RESERVED = ['about', 'contact', 'faq', 'services', 'service-areas', 'treatments', 'locations', 'concerns', 'team', 'blog']
  if (RESERVED.includes(comboSlug)) notFound()

  const special = await loadSpecials(slug, comboSlug)
  if (special) {
    const Specials = rendererFor(await previewFamily(searchParams) || special.config.template_slug, 'Specials')
    return <Specials config={special.config} siteSlug={slug} />
  }

  const combo = await loadCombo(slug, comboSlug)
  if (!combo) notFound()

  const Renderer = rendererFor(await previewFamily(searchParams) || combo.config.template_slug, 'Combo')
  return <Renderer config={combo.config} siteSlug={slug} service={combo.service} area={combo.area} />
}
