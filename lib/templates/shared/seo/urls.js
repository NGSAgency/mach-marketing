// URL builders for templates - consistent slugs, canonical paths, breadcrumbs
import { slugify } from './metadata.js'

export function urlHome() { return '/' }
export function urlServices() { return '/services' }
export function urlServiceAreas() { return '/service-areas' }
export function urlService(slug) { return `/services/${slug}` }
export function urlArea(area) { return `/service-areas/${slugify(area)}` }
export function urlCombo(service, area) { return `/${service.slug}-in-${slugify(area)}` }
export function urlAbout() { return '/about' }
export function urlContact() { return '/contact' }
export function urlFAQ() { return '/faq' }

export function breadcrumbsForService(service) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${service.slug}` },
  ]
}

export function breadcrumbsForArea(area) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/service-areas' },
    { name: area, url: `/service-areas/${slugify(area)}` },
  ]
}

export function breadcrumbsForCombo(service, area) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${service.slug}` },
    { name: `${service.name} in ${area}`, url: `/${service.slug}-in-${slugify(area)}` },
  ]
}
