// URL builders for templates - consistent slugs, canonical paths, breadcrumbs
import { slugify } from './metadata.js'
export { slugify }

// URL segments come from the client's industry profile, so a med spa gets
// /treatments/botox while an HVAC company gets /services/ac-repair. The segment
// is a weak ranking signal, but changing URLs after launch is harmful, so it is
// resolved once at build time and every consumer reads from the same place.
//
// Each function accepts an optional config. Without one they fall back to the
// home-services defaults, which keeps existing callers working unchanged.
const offeringSeg = (config) => config?.profile?.nouns?.offering_url || 'services'
const placeSeg = (config) => config?.profile?.nouns?.place_url || 'service-areas'

export function urlHome() { return '/' }
export function urlServices(config) { return `/${offeringSeg(config)}` }
export function urlServiceAreas(config) { return `/${placeSeg(config)}` }
export function urlService(slug, config) { return `/${offeringSeg(config)}/${slug}` }
export function urlArea(area, config) { return `/${placeSeg(config)}/${slugify(area)}` }

// Combo pages stay at the root for every industry. This is the highest-intent
// page type we generate and the structure is already correct.
// Which "service in town" pages exist. The Command Center lists them in
// config.combos ("<area>/<service>"): a service can have its town pages
// switched off, and one added in the Content editor waits for approval. An
// older config without the list means every pair, as before.
export function comboAllowed(config, service, area) {
  const list = config?.combos
  if (!Array.isArray(list)) return true
  return list.includes(`${slugify(area)}/${service?.slug}`)
}
// With the config, a pair that has no page links to the service instead, so
// no link on the site ever lands on a missing page.
export function urlCombo(service, area, config = null) {
  if (config && !comboAllowed(config, service, area)) return urlService(service.slug, config)
  return `/${service.slug}-in-${slugify(area)}`
}
export function urlAbout() { return '/about' }
export function urlContact() { return '/contact' }
export function urlFAQ() { return '/faq' }
export function urlPrivacy() { return '/privacy' }
export function urlBlog() { return '/blog' }
export function urlBlogPost(slug) { return `/blog/${slug}` }

const titleCase = (s) => String(s || '').replace(/\b\w/g, c => c.toUpperCase())

export function breadcrumbsForService(service, config) {
  const label = titleCase(config?.profile?.nouns?.offering?.plural || 'services')
  return [
    { name: 'Home', url: urlHome() },
    { name: label, url: urlServices(config) },
    { name: service.name, url: urlService(service.slug, config) },
  ]
}

export function breadcrumbsForArea(area, config) {
  const label = titleCase(config?.profile?.nouns?.place?.plural || 'service areas')
  return [
    { name: 'Home', url: urlHome() },
    { name: label, url: urlServiceAreas(config) },
    { name: area, url: urlArea(area, config) },
  ]
}

export function breadcrumbsForCombo(service, area, config) {
  const label = titleCase(config?.profile?.nouns?.offering?.plural || 'services')
  return [
    { name: 'Home', url: urlHome() },
    { name: label, url: urlServices(config) },
    { name: service.name, url: urlService(service.slug, config) },
    { name: `${service.name} in ${area}`, url: urlCombo(service, area) },
  ]
}

export function breadcrumbsForBlogIndex() {
  return [
    { name: 'Home', url: urlHome() },
    { name: 'Blog', url: urlBlog() },
  ]
}

export function breadcrumbsForBlogPost(post) {
  return [
    { name: 'Home', url: urlHome() },
    { name: 'Blog', url: urlBlog() },
    { name: post.title, url: urlBlogPost(post.slug) },
  ]
}
