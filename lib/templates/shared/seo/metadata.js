// SEO metadata generators for each page type
// Used by Next.js generateMetadata() to output <head> tags
// Preview mode adds noindex; production mode indexes

const SITE_ORIGIN = (config) => config?.meta?.canonical?.replace(/\/$/, '') || 'https://example.com'

// Trailing punctuation off, so a sentence can be built around a field.
const clause = (s) => String(s || '').trim().replace(/[.!\s]+$/, '')

// Reviewed, generated title and description for the page being rendered win
// over the assembled ones: they're written per page, to length, for search.
const written = (text) => (typeof text === 'string' && text.trim() ? text.trim().replace(/^["']|["']$/g, '') : null)
const pageTitle = (config, fallback) => written(config?.page_copy?.meta_title) || fallback
const pageDescription = (config, fallback) => written(config?.page_copy?.meta_description) || fallback

// URL segments come from the industry profile (/treatments, /locations for a
// med spa). Kept local to avoid a circular import with urls.js.
const offeringPath = (config, slug) => `/${config?.profile?.nouns?.offering_url || 'services'}/${slug}`
const placePath = (config, area) => `/${config?.profile?.nouns?.place_url || 'service-areas'}/${slugify(area)}`

export function buildHomeMetadata(config, { isPreview = false } = {}) {
  const b = config.business || {}
  const m = config.meta || {}
  const name = b.display_name || ''
  const primaryService = config.services?.[0]?.category || config.profile?.label || null
  const areas = (config.service_areas || []).filter(Boolean).slice(0, 3).join(', ')
  const place = config.primary_service_area || areas
  const tagline = clause(config.positioning?.tagline)

  const titleTail = primaryService
    ? `${primaryService}${place ? ` in ${place}` : ''}`
    : place
  const gen = config.generated || {}
  const title = written(gen['home|meta_title']) || m.site_title || [name, titleTail].filter(Boolean).join(' | ')
  const description = written(gen['home|meta_description']) || m.site_description || [
    name && tagline ? `${name} - ${tagline}.` : (name ? `${name}.` : (tagline ? `${tagline}.` : null)),
    areas ? `Serving ${areas}.` : null,
  ].filter(Boolean).join(' ')

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: m.canonical || SITE_ORIGIN(config) },
    openGraph: {
      title,
      description,
      url: m.canonical,
      siteName: b.display_name,
      images: config.brand?.hero_image ? [{ url: config.brand.hero_image }] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function buildServiceMetadata(config, service, { isPreview = false } = {}) {
  const b = config.business || {}
  const name = b.display_name || ''
  const area = config.primary_service_area || (config.service_areas || [])[0] || ''
  const title = pageTitle(config, [`${service.name}${area ? ` in ${area}` : ''}`, name].filter(Boolean).join(' | '))
  const description = pageDescription(config, [
    name ? `${name} offers ${service.name.toLowerCase()}${area ? ` in ${area}` : ''}.` : null,
    service.description || service.short || null,
  ].filter(Boolean).join(' '))
  const canonical = `${SITE_ORIGIN(config)}${offeringPath(config, service.slug)}`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: b.display_name, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function buildAreaMetadata(config, area, { isPreview = false } = {}) {
  const b = config.business || {}
  const all = (config.services || []).map(s => s?.name).filter(Boolean)
  const services = all.slice(0, 3).join(', ')
  const tagline = clause(config.positioning?.tagline)
  const title = pageTitle(config, [`${b.display_name || ''} in ${area}`.trim(), services].filter(Boolean).join(' | '))
  const description = pageDescription(config, [
    services ? `${services}${all.length > 3 ? ' and more' : ''} in ${area}.` : null,
    tagline ? `${tagline}.` : null,
  ].filter(Boolean).join(' '))
  const canonical = `${SITE_ORIGIN(config)}${placePath(config, area)}`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: b.display_name, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function buildComboMetadata(config, service, area, { isPreview = false } = {}) {
  const b = config.business
  const title = pageTitle(config, `${service.name} in ${area} | ${b.display_name}`)
  const phoneCta = b.phone_display ? ` Call ${b.phone_display}.` : ''
  const description = pageDescription(config, `${service.name} in ${area}. ${service.description || service.short || ''}${phoneCta}`.replace(/\s+/g, ' ').trim())
  const canonical = `${SITE_ORIGIN(config)}/${service.slug}-in-${slugify(area)}`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: b.display_name, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function buildStaticMetadata(config, page, { isPreview = false } = {}) {
  // For about, contact, faq
  const b = config.business
  const canonical = `${SITE_ORIGIN(config)}/${page.slug}`
  return {
    title: { absolute: pageTitle(config, `${page.title} | ${b.display_name}`) },
    description: pageDescription(config, page.description),
    alternates: { canonical },
    openGraph: { title: page.title, description: page.description, url: canonical, siteName: b.display_name, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function slugify(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function buildBlogIndexMetadata(config, { isPreview = false } = {}) {
  const name = config?.business?.display_name || 'Blog'
  const area = config?.primary_service_area || ''
  const title = `Blog | ${name}`
  const description = `Guides, tips, and answers from ${name}${area ? ' in ' + area : ''}.`
  const canonical = config?.meta?.canonical ? config.meta.canonical + '/blog' : undefined

  return {
    title: { absolute: title },
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: isPreview ? { index: false, follow: false } : undefined,
    openGraph: { title, description, type: 'website' },
  }
}

export function buildBlogPostMetadata(config, post, { isPreview = false } = {}) {
  const name = config?.business?.display_name || ''
  const title = post?.meta_title || post?.title || 'Post'
  const description = post?.meta_description || post?.excerpt || ''
  const canonical = config?.meta?.canonical && post?.slug
    ? `${config.meta.canonical}/blog/${post.slug}`
    : undefined

  return {
    title: { absolute: title.includes(name) || !name ? title : `${title} | ${name}` },
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: isPreview ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post?.published_at || undefined,
      modifiedTime: post?.updated_at || undefined,
    },
  }
}
