// Sitemap generator - produces all URLs for a config
// Use in app/sitemap.js to auto-generate sitemap.xml
import { slugify } from './metadata.js'

export function generateSitemap(config, baseUrl) {
  const url = (path) => `${baseUrl.replace(/\/$/, '')}${path}`
  const now = new Date().toISOString()

  const urls = [
    { url: url('/'), lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: url('/services'), lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: url('/service-areas'), lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: url('/about'), lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
    { url: url('/contact'), lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: url('/faq'), lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
  ]

  // Service pages
  for (const svc of (config.services || [])) {
    urls.push({ url: url(`/services/${svc.slug}`), lastModified: now, priority: 0.8, changeFrequency: 'monthly' })
  }

  // Area pages
  for (const area of (config.service_areas || [])) {
    urls.push({ url: url(`/service-areas/${slugify(area)}`), lastModified: now, priority: 0.7, changeFrequency: 'monthly' })
  }

  // Combo pages - services × areas
  for (const svc of (config.services || [])) {
    for (const area of (config.service_areas || [])) {
      urls.push({ url: url(`/${svc.slug}-in-${slugify(area)}`), lastModified: now, priority: 0.6, changeFrequency: 'monthly' })
    }
  }

  return urls
}
