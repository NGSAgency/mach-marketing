// SEO metadata generators for each page type
// Used by Next.js generateMetadata() to output <head> tags
// Preview mode adds noindex; production mode indexes

const SITE_ORIGIN = (config) => config?.meta?.canonical?.replace(/\/$/, '') || 'https://example.com'

export function buildHomeMetadata(config, { isPreview = false } = {}) {
  const b = config.business
  const m = config.meta
  const primaryService = config.services?.[0]?.category || 'Home Services'
  const areas = (config.service_areas || []).slice(0, 3).join(', ')

  const title = m.site_title || `${b.display_name} | ${primaryService} in ${config.primary_service_area || areas}`
  const description = m.site_description || `${b.display_name} - ${config.positioning.tagline}. Serving ${areas} and surrounding areas.`

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
  const b = config.business
  const area = config.primary_service_area || (config.service_areas || [])[0] || ''
  const title = `${service.name} in ${area} | ${b.display_name}`
  const description = `${b.display_name} offers ${service.name.toLowerCase()} services in ${area} and surrounding areas. ${service.description || service.short || ''}`
  const canonical = `${SITE_ORIGIN(config)}/services/${service.slug}`

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
  const b = config.business
  const services = (config.services || []).slice(0, 3).map(s => s.name).join(', ')
  const title = `${b.display_name} in ${area} | ${services}`
  const description = `${services} and more in ${area}. ${config.positioning.tagline || ''}`
  const canonical = `${SITE_ORIGIN(config)}/service-areas/${slugify(area)}`

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
  const title = `${service.name} in ${area} | ${b.display_name}`
  const phoneCta = b.phone_display ? ` Call ${b.phone_display}.` : ''
  const description = `${service.name} in ${area}. ${service.description || service.short || ''}${phoneCta}`.replace(/\s+/g, ' ').trim()
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
    title: { absolute: `${page.title} | ${b.display_name}` },
    description: page.description,
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
