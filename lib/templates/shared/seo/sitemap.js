// Sitemap generator - produces all URLs for a config
// Use in app/sitemap.js to auto-generate sitemap.xml
import { slugify } from './metadata.js'

export function generateSitemap(config, baseUrl, posts = []) {
  const url = (path) => `${baseUrl.replace(/\/$/, '')}${path}`
  const now = new Date().toISOString()

  // Segments follow the industry profile (/treatments and /locations for a
  // med spa), matching the routes and canonicals.
  const off = config?.profile?.nouns?.offering_url || 'services'
  const place = config?.profile?.nouns?.place_url || 'service-areas'
  const pages = config?.profile?.pages || []
  const services = config.services || []
  const areas = (config.service_areas || []).filter(Boolean)

  const urls = [
    { url: url('/'), lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: url(`/${off}`), lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    ...(areas.length ? [{ url: url(`/${place}`), lastModified: now, priority: 0.8, changeFrequency: 'monthly' }] : []),
    { url: url('/about'), lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
    ...(pages.includes('practitioners') && (config.providers || []).length ? [{ url: url('/team'), lastModified: now, priority: 0.7, changeFrequency: 'monthly' }] : []),
    { url: url('/contact'), lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: url('/faq'), lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
  ]

  for (const svc of services) {
    urls.push({ url: url(`/${off}/${svc.slug}`), lastModified: now, priority: 0.8, changeFrequency: 'monthly' })
  }

  // Concern pages (med spa): people search by problem before treatment.
  for (const concern of (pages.includes('concern_detail') ? (config.concerns || []) : [])) {
    urls.push({ url: url(`/concerns/${concern.slug}`), lastModified: now, priority: 0.7, changeFrequency: 'monthly' })
  }

  for (const area of areas) {
    urls.push({ url: url(`/${place}/${slugify(area)}`), lastModified: now, priority: 0.7, changeFrequency: 'monthly' })
  }

  // Combo pages - services x areas
  for (const svc of services) {
    for (const area of areas) {
      urls.push({ url: url(`/${svc.slug}-in-${slugify(area)}`), lastModified: now, priority: 0.6, changeFrequency: 'monthly' })
    }
  }

  // Blog - index only listed when there is something to read
  if (Array.isArray(posts) && posts.length > 0) {
    urls.push({ url: url('/blog'), lastModified: posts[0]?.published_at || now, priority: 0.7, changeFrequency: 'weekly' })
    for (const post of posts) {
      urls.push({
        url: url(`/blog/${post.slug}`),
        lastModified: post.updated_at || post.published_at || now,
        priority: 0.6,
        changeFrequency: 'monthly',
      })
    }
  }

  return urls
}
