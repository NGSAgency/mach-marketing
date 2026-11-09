// SEO metadata generators for each page type
// Used by Next.js generateMetadata() to output <head> tags
// Preview mode adds noindex; production mode indexes

import { lowerName } from '../claims.js'
import { fitTitle, fitDescription, townOf, stateOf } from './fit.js'

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
  // What they do, in the words people search: the industry's noun ("Med Spa"),
  // else the profile's label, else the first service's category. Questionnaire
  // categories like "primary" are rankings, not names, and once put
  // "primary in Kansas City" in a title.
  const category = config.services?.[0]?.category
  const primaryService = AREA_NOUN[config.industry_key] || config.profile?.label ||
    (category && !/^(primary|secondary|other|main|core)$/i.test(category) ? category : null)
  const areas = (config.service_areas || []).filter(Boolean).slice(0, 3).join(', ')
  const place = config.primary_service_area || areas
  const tagline = clause(config.positioning?.tagline)

  const titleTail = primaryService
    ? `${primaryService}${place ? ` in ${place}` : ''}`
    : place
  const gen = config.generated || {}
  const title = fitTitle(written(gen['home|meta_title']) || m.site_title || [name, titleTail].filter(Boolean).join(' | '), name)
  const description = fitDescription(written(gen['home|meta_description']) || m.site_description || [
    name && tagline ? `${name} - ${tagline}.` : (name ? `${name}.` : (tagline ? `${tagline}.` : null)),
    areas ? `Serving ${areas}.` : null,
  ].filter(Boolean).join(' '))

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
  const area = townOf(config) || ''
  // The home town in the title: "[Service] in [Town] | [Name]". Town pages
  // carry the state as well ("in Kansas City, MO"), so the two never match.
  const title = fitTitle(pageTitle(config, [`${service.name}${area ? ` in ${area}` : ''}`, name].filter(Boolean).join(' | ')), name)
  const description = fitDescription(pageDescription(config, [
    name ? `${name} offers ${lowerName(service.name)}${area ? ` in ${area}` : ''}.` : null,
    service.description || service.short || null,
  ].filter(Boolean).join(' ')))
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

const AREA_NOUN = {
  medspa: 'Med Spa', med_spa: 'Med Spa', aesthetics: 'Med Spa', wellness: 'Med Spa',
  pest_control: 'Pest Control', hvac: 'Heating & Cooling', plumbing: 'Plumbing', roofing: 'Roofing',
  electrical: 'Electrician', landscaping: 'Lawn & Landscaping', general_contractor: 'Home Improvement',
  house_cleaning: 'House Cleaning',
  carpet_cleaning: 'Carpet Cleaning',
  painting: 'House Painting',
  handyman: 'Handyman Services',
  garage_doors: 'Garage Door Repair',
  window_cleaning: 'Window Cleaning',
  gutters: 'Gutter Services',
  pressure_washing: 'Pressure Washing',
  pool_service: 'Pool Service',
  junk_removal: 'Junk Removal',
  moving: 'Movers',
  flooring: 'Flooring',
  fencing: 'Fence Installation',
  concrete: 'Concrete',
  tree_service: 'Tree Service',
  appliance_repair: 'Appliance Repair',
  locksmith: 'Locksmith',
  auto_detailing: 'Auto Detailing',
  auto_body: 'Auto Body & Dent Repair',
}

export function buildAreaMetadata(config, area, { isPreview = false } = {}) {
  const b = config.business || {}
  const all = (config.services || []).map(s => s?.name).filter(Boolean)
  const services = all.slice(0, 3).join(', ')
  const tagline = clause(config.positioning?.tagline)
  // "[What they do] in [Area] | [Name]": the old fallback listed three
  // services after the name and ran to 70-96 characters, cut off in Google.
  const noun = AREA_NOUN[config.industry_key] || null
  const title = fitTitle(pageTitle(config, noun
    ? `${noun} in ${area} | ${b.display_name || ''}`.replace(/ \| $/, '')
    : [`${b.display_name || ''} in ${area}`.trim(), all[0]].filter(Boolean).join(' | ')), b.display_name)
  const description = fitDescription(pageDescription(config, [
    services ? `${services}${all.length > 3 ? ' and more' : ''} in ${area}.` : null,
    tagline ? `${tagline}.` : null,
  ].filter(Boolean).join(' ')))
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
  // With the state ("in Kansas City, MO") so it never matches the service
  // page's own title, which names the home town without one.
  const st = stateOf(config, area)
  // A long treatment name can't fit "in Kansas City, MO": shortening would drop
  // the state and give it the treatment page's title, so it drops "in" instead.
  const town = String(area).trim()
  const full = `${service.name} in ${town}${st ? `, ${st}` : ''}`
  const fallback = full.length <= 60 ? `${full} | ${b.display_name}` : (st ? `${service.name}, ${town} ${st}` : full)
  const title = fitTitle(pageTitle(config, fallback), b.display_name)
  const phoneCta = b.phone_display ? ` Call ${b.phone_display}.` : ''
  const description = fitDescription(pageDescription(config, `${service.name} in ${area}. ${service.description || service.short || ''}${phoneCta}`.replace(/\s+/g, ' ').trim()))
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
  // For about, contact, faq and the index pages.
  //
  // The title and description are the page's reviewed copy when it was
  // fetched with its own, then the copy generated for the site, then a line
  // written here. The middle step was missing: about and FAQ are never
  // fetched with their own copy, so every site fell straight through to
  // "About | Name" while a written, keyword-bearing title sat unused in
  // config.generated — on every About and FAQ page, on every site.
  const b = config.business
  const canonical = `${SITE_ORIGIN(config)}/${page.slug}`
  const gen = config.generated || {}
  const key = page.generatedKey || page.slug
  // The assembled fallback names the town for the pages that compete locally
  // ("About KC Skin & Wellness | Med Spa in Kansas City").
  const town = townOf(config)
  const noun = AREA_NOUN[config.industry_key] || null
  const fallback = page.slug === 'about' && town
    ? `About ${b.display_name}${noun ? ` | ${noun} in ${town}` : ` | ${town}`}`
    : `${page.title} | ${b.display_name}`
  const title = fitTitle(pageTitle(config, null) || written(gen[`${key}|meta_title`]) || fallback, b.display_name)
  const description = fitDescription(pageDescription(config, null) || written(gen[`${key}|meta_description`]) || page.description || '')
  // Shared previews carry the same title and description as the search
  // result. They used to carry the bare page name: a link to the About page
  // posted anywhere read "About".
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: b.display_name, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
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
  const offering = config?.profile?.nouns?.offering?.plural || 'services'
  const description = `Guides, tips, and answers about ${offering} from ${name}${area && area !== 'your area' ? ` in ${String(area).trim()}` : ''}.`
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
  const description = fitDescription(post?.meta_description || post?.excerpt || '')
  // Within 60: with the business name when it fits, else the title alone,
  // else its main clause ("Gentle Exfoliation for Sensitive Skin: Safe
  // Strategies Beyond Dermaplaning" -> the part before the colon), else cut
  // at a word. Imported posts kept their old, long titles.
  const searchTitle = (() => {
    const withName = title.includes(name) || !name ? title : `${title} | ${name}`
    if (withName.length <= 60) return withName
    if (title.length <= 60) return title
    const m = title.match(/^(.{20,60}?[?])\s/) || title.match(/^(.{20,60}?)(?::|\s[–—-]\s)/)
    return m ? m[1].trim() : fitTitle(title, name)
  })()
  const canonical = config?.meta?.canonical && post?.slug
    ? `${config.meta.canonical}/blog/${post.slug}`
    : undefined

  return {
    title: { absolute: searchTitle },
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
