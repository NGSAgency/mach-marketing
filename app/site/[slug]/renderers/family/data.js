// What every page of every design family knows about the business, and the
// content of each page type, with no styling at all.
//
// A family (CREW, Hearth, ...) decides how a page looks and how its sections
// are laid out; this file decides what the page says. Keeping the two apart is
// what lets the families differ in structure while every one of them follows
// the same rules: every link goes to a real page, every fact comes from a field
// in the data, and a concept shows a labelled note where a real site would
// hide a section.
import {
  urlServices, urlService, urlServiceAreas, urlArea, urlCombo, urlAbout, urlFAQ, urlContact,
  breadcrumbsForService, breadcrumbsForArea, breadcrumbsForCombo,
  buildBreadcrumbSchema, buildFAQSchema, buildServiceSchema, buildLocalBusinessSchema,
} from '../../../../../lib/templates/shared/seo/index.js'
import {
  emergencyLabel, faqsFrom, sinceLabel, whyUsItems, aboutBody, heroTrust, parseJson,
  serviceEmergencyBadge, credentialLabel,
} from '../../../../../lib/templates/shared/claims.js'
import { pageCopy, faqList, asText } from '../../../../../lib/templates/shared/pageCopy.js'

export const TRADE_NOUN = {
  pest_control: 'Pest control',
  hvac: 'Heating and cooling',
  plumbing: 'Plumbing',
  roofing: 'Roofing',
  electrical: 'Electrical work',
  landscaping: 'Lawn and landscaping',
  general_contractor: 'Home improvement',
  house_cleaning: 'House cleaning',
  carpet_cleaning: 'Carpet cleaning',
  painting: 'House painting',
  handyman: 'Handyman services',
  garage_doors: 'Garage door repair',
  window_cleaning: 'Window cleaning',
  gutters: 'Gutter services',
  pressure_washing: 'Pressure washing',
  pool_service: 'Pool service',
  junk_removal: 'Junk removal',
  moving: 'Movers',
  flooring: 'Flooring',
  fencing: 'Fence installation',
  concrete: 'Concrete work',
  tree_service: 'Tree service',
  appliance_repair: 'Appliance repair',
  locksmith: 'Locksmith',
  auto_detailing: 'Auto detailing',
}

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())

export function listAreas(areas) {
  if (areas.length <= 1) return areas[0] || ''
  if (areas.length === 2) return `${areas[0]} and ${areas[1]}`
  return `${areas[0]}, ${areas[1]} and nearby`
}

/** Paragraphs from copy with blank lines between them. */
export const paragraphs = (text) => (typeof text === 'string' ? text : '')
  .split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

/** Text that is a JSON blob (steps, FAQs) rather than prose. */
export const looksLikeJson = (v) => typeof v === 'string' && /^\s*[\[{]/.test(v)

/**
 * The config with each service's description cleared when it holds a JSON
 * blob (client data can carry page copy there), so structured data never
 * publishes raw JSON as a description.
 */
export const schemaConfig = (c) => ({
  ...c,
  services: (c.services || []).map(s => (looksLikeJson(s.description) ? { ...s, description: '' } : s)),
})

/** "What to expect" as steps when it is a list, else null. */
export function stepsFrom(v) {
  const list = Array.isArray(v) ? v : (looksLikeJson(v) ? parseJson(v) : null)
  if (!Array.isArray(list)) return null
  const steps = list.map(s => (typeof s === 'string'
    ? { title: null, description: s }
    : { title: s?.title || s?.name || null, description: s?.description || s?.text || s?.body || null }))
    .filter(s => s.title || s.description)
  return steps.length ? steps : null
}

/** A single-paragraph line fit for a page header, or null. */
export const oneLine = (s) => (typeof s === 'string' && s.trim() && !looksLikeJson(s) && !/\n/.test(s.trim()) && s.length <= 220 ? s.trim() : null)

/** An image slot for an area page. */
export const areaImageKey = (area) => `area_${String(area).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

/**
 * Facts and links for one page of any family. Every link goes to a real page,
 * on a client site and on a concept (whose routes live under c.base_path).
 */
export function siteData(c, siteSlug) {
  const concept = c.concept === true
  const base = c.base_path || `/site/${siteSlug}`
  const biz = c.business || {}
  const pos = c.positioning || {}
  const services = c.services || []
  const areas = (c.service_areas || []).filter(Boolean)
  const primaryArea = c.primary_service_area || areas[0] || ''
  const phone = (biz.phone || '').replace(/[^0-9+]/g, '')
  const phoneDisplay = biz.phone_display || biz.phone || ''
  const name = biz.display_name || ''
  const nouns = c.profile?.nouns || {}

  const href = {
    home: base,
    services: `${base}${urlServices(c)}`,
    service: (slug) => `${base}${urlService(slug, c)}`,
    areas: `${base}${urlServiceAreas(c)}`,
    area: (a) => `${base}${urlArea(a, c)}`,
    combo: (s, a) => `${base}${urlCombo(s, a)}`,
    about: `${base}${urlAbout()}`,
    faq: `${base}${urlFAQ()}`,
    contact: `${base}${urlContact()}`,
  }

  // The trade in a few words, for page headings ("Pest control in Olathe").
  const tradeNoun = TRADE_NOUN[c.industry_key] || services[0]?.category || titleCase(nouns.offering?.plural || 'services')
  const faqs = faqsFrom(c)
  const hasAbout = concept || !!(aboutBody(c) || c.generated?.['about|our_approach'] || biz.established_year || c.credentials?.license_number)

  // The second way to act: online booking when they take it, else a quote.
  // "Free" only when they told us estimates are free.
  const bookingUrl = /^https?:\/\//i.test(biz.booking_url || '') ? biz.booking_url : null
  const quoteLabel = pos.free_estimates ? 'Get a free quote' : 'Get a quote'
  const second = bookingUrl
    ? { href: bookingUrl, label: 'Book online', external: true }
    : { href: href.contact, label: quoteLabel }

  return {
    c, concept, base, biz, pos, services, areas, primaryArea, phone, phoneDisplay, name,
    logo: c.brand?.logo_url, imgs: c.images || {}, href, quoteHref: href.contact, quoteLabel, second, bookingUrl,
    tradeNoun, faqs, hasAbout,
    offeringLabel: titleCase(nouns.offering?.plural || 'services'),
    placeLabel: titleCase(nouns.place?.plural || 'service areas'),
    emergency: emergencyLabel(c),
    since: sinceLabel(c),
    year: biz.established_year || null,
    credential: credentialLabel(c),
    license: c.credentials?.license_number || null,
    statedOnTheirSite: concept && c.reviews?.source === 'their_site',
  }
}

/** The menu: only pages that exist. */
export function navItems(d) {
  const { href, services, areas, faqs, hasAbout, offeringLabel } = d
  return [
    services.length > 0 && { key: 'services', label: offeringLabel === 'Services' ? 'Services' : offeringLabel, href: href.services },
    areas.length > 0 && { key: 'areas', label: 'Areas', href: href.areas },
    hasAbout && { key: 'about', label: 'About', href: href.about },
    faqs.length > 0 && { key: 'faq', label: 'FAQ', href: href.faq },
  ].filter(Boolean)
}

/**
 * Proof from the data only: rating (shown exactly, never rounded up), years,
 * licence, warranty. A rating stated on their own website is not called a
 * Google rating. Returns [{ kind, value, label }].
 */
export function proofItems(d) {
  const { c, biz, pos } = d
  const r = c.reviews || {}
  const out = []
  const rating = Number(r.google_rating)
  if (rating > 0) {
    const shown = (Math.floor(rating * 10 + 1e-9) / 10).toFixed(1)
    const count = parseInt(r.google_count) || null
    const google = r.source !== 'their_site'
    out.push({ kind: 'rating', value: shown, label: count ? `${count.toLocaleString('en-US')} ${google ? 'Google reviews' : 'reviews'}` : (google ? 'Google rating' : 'Rating') })
  }
  const years = biz.years_in_business || (biz.established_year ? new Date().getFullYear() - biz.established_year : null)
  if (biz.established_year) out.push({ kind: 'since', value: String(biz.established_year), label: biz.family_owned === true ? 'Family-owned since' : 'In business since' })
  else if (years && years > 1) out.push({ kind: 'since', value: String(years), label: 'Years in business' })
  if (pos.licensed && pos.insured) out.push({ kind: 'licence', value: 'Licensed', label: `and insured${c.credentials?.license_number ? ` · Lic. ${c.credentials.license_number}` : ''}` })
  else if (pos.licensed) out.push({ kind: 'licence', value: 'Licensed', label: c.credentials?.license_number ? `Lic. ${c.credentials.license_number}` : 'Licence on file' })
  else if (pos.insured) out.push({ kind: 'licence', value: 'Insured', label: 'Fully insured' })
  const w = (pos.warranties || [])[0]
  const wt = typeof w === 'string' ? w : w?.name || w?.description
  if (wt) out.push({ kind: 'warranty', value: 'Warranty', label: wt })
  return out
}

/** The hero's trust line (claims.heroTrust), most persuasive first. */
export const trustLine = (d, max = 5) => heroTrust(d.c, { max })

/**
 * The checklist beside the quote buttons on inner pages: a Google rating,
 * founding year, licence, emergency service, financing and warranty, each
 * only when the data holds it.
 */
export function pageFacts(d, service) {
  const { c } = d
  const reviews = c.reviews || {}
  const items = []
  if (reviews.source !== 'their_site' && reviews.google_rating) {
    items.push(`${Number(reviews.google_rating).toFixed(1)} Google rating${reviews.google_count ? ` · ${reviews.google_count.toLocaleString()} reviews` : ''}`)
  }
  if (d.since) items.push(d.since)
  return [...items, ...whyUsItems(c, service)]
}

// ---- Page content -------------------------------------------------------------

/** The home page's content. */
export function homeModel(d) {
  const { c, pos, services, primaryArea, name, imgs } = d
  const gen = c.generated || {}
  // The H1 says what they do and where, in plain words ("Plumbing in
  // Springfield"). Without a place or a trade, the generated headline, then
  // their own short tagline, then the name.
  const place = primaryArea && primaryArea !== 'your area' ? primaryArea : null
  const trade = TRADE_NOUN[c.industry_key] || services[0]?.category || null
  const whatWhere = place && (trade || services[0]?.name) ? `${trade || services[0].name} in ${place}` : null
  const ownTagline = pos.own_tagline && pos.own_tagline.length <= 60 ? pos.own_tagline : null
  const headline = whatWhere || pos.headline || ownTagline || trade || name
  const support = gen['home|hero_subheadline']
    || (pos.headline && pos.headline !== headline ? pos.headline : null)
    || (pos.tagline && pos.tagline !== headline && !pos.tagline.includes(' — ') ? pos.tagline : null)

  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const whyUs = (parseJson(gen['home|why_us']) || []).filter(p => p?.title && p?.description).slice(0, 4)
  const faqs = (parseJson(gen['faq|questions']) || c.faq || [])
    .map(q => ({ question: q.question || q.q, answer: q.answer || q.a }))
    .filter(q => q.question && q.answer)
    .slice(0, 6)
  const reviews = ((c.reviews || {}).featured || []).filter(r => r?.text).slice(0, 3)
  const video = imgs.home_video?.url ? imgs.home_video : null
  const hero = imgs.home_hero || (video ? { url: video.poster || null, alt: '' } : null)
  const intro = asText(gen['home|intro_paragraph']) || (aboutBody(c) || [])[0] || null

  return {
    place, trade, headline, support, trust: trustLine(d), categories,
    grouped: services.length > 6 && categories.length > 1,
    whyUs, faqs, reviews, video, hero: hero?.url ? hero : null, secondary: imgs.home_secondary || null,
    intro, plans: Array.isArray(c.plans) ? c.plans : [],
    schemas: [buildLocalBusinessSchema(schemaConfig(c))],
  }
}

/** One service's page. */
export function serviceModel(d, service) {
  const { c, concept, services, imgs } = d
  const genFor = c.generated_for || {}
  const generatedSlug = genFor.service || services[0]?.slug
  const isGenerated = concept && generatedSlug === service.slug
  const copy = pageCopy(c, 'service_detail', { concept: isGenerated })
  const noCopy = concept && !isGenerated
  const ownDescription = !concept && service.description && !looksLikeJson(service.description) ? service.description : null
  const intro = asText(copy('intro')) || ownDescription
  const rawSteps = copy('what_to_expect')
  const steps = stepsFrom(rawSteps)
  const stepsText = steps ? null : asText(rawSteps)
  const methods = asText(copy('materials_and_methods'))
  const faqs = faqList(copy('faq'))
  const subhead = copy('hero_subheadline') || (oneLine(service.short) !== intro ? oneLine(service.short) : null)
  const crumbs = breadcrumbsForService(service, c)
  const related = [
    ...services.filter(s => s.slug !== service.slug && s.category && s.category === service.category),
    ...services.filter(s => s.slug !== service.slug && !(s.category && s.category === service.category)),
  ].slice(0, 3)
  const generatedService = services.find(s => s.slug === generatedSlug)
  return {
    crumbs, noCopy, intro, steps, stepsText, methods, faqs, subhead, related,
    image: imgs[`service_${service.slug}`] || null,
    eyebrow: service.category && service.category !== service.name ? service.category : d.offeringLabel,
    badge: serviceEmergencyBadge(c, service, { long: true }),
    facts: pageFacts(d, service),
    hasBody: !!(intro || steps || stepsText || methods || faqs.length || noCopy),
    note: {
      title: `Your ${service.name} page`,
      body: `What ${service.name.toLowerCase()} involves, what happens on a visit, the products and methods you use, and the questions customers ask about it. Written for your business${generatedService ? `, like the ${generatedService.name} page,` : ''} and checked by you before it goes live.`,
    },
    schemas: [
      buildBreadcrumbSchema(c, crumbs),
      buildServiceSchema(c, { ...service, description: intro || oneLine(service.short) || undefined }),
      faqs.length > 0 ? buildFAQSchema(faqs) : null,
    ],
  }
}

/** One area's page. */
export function areaModel(d, area) {
  const { c, concept, areas, imgs, tradeNoun, name } = d
  const genFor = c.generated_for || {}
  const generatedArea = genFor.area || areas[0]
  const isGenerated = concept && generatedArea === area
  const copy = pageCopy(c, 'area_detail', { concept: isGenerated })
  const faqs = faqList(copy('faq'))
  const crumbs = breadcrumbsForArea(area, c)
  const intro = asText(copy('intro'))
  const local = asText(copy('local_context'))
  const noCopy = concept && !isGenerated
  return {
    crumbs, noCopy, intro, local, faqs,
    subhead: copy('hero_subheadline'),
    title: `${tradeNoun} in ${area}`,
    otherAreas: areas.filter(a => a !== area),
    image: imgs[areaImageKey(area)] || imgs.home_hero || imgs.home_secondary || null,
    facts: pageFacts(d),
    hasBody: !!(intro || local || faqs.length || noCopy),
    note: {
      title: `Your ${area} page`,
      body: `An introduction written for ${area}: the calls you get there, what is different about homes in that part of town, and the questions people there ask. Written for your business${generatedArea ? `, like the ${generatedArea} page,` : ''} and checked by you before it goes live.`,
    },
    overviewTitle: `${name} in ${area}`,
    schemas: [buildBreadcrumbSchema(c, crumbs), faqs.length > 0 ? buildFAQSchema(faqs) : null],
  }
}

/** One service in one area: the highest-intent page type. */
export function comboModel(d, service, area) {
  const { c, concept, services, areas, imgs, href, tradeNoun } = d
  const genFor = c.generated_for || {}
  const genService = genFor.service || services[0]?.slug
  const genArea = genFor.area || areas[0]
  const isGenerated = concept && genService === service.slug && genArea === area
  const copy = pageCopy(c, 'combo', { concept: isGenerated })
  const intro = asText(copy('intro'))
  const local = asText(copy('local_considerations'))
  const faqs = faqList(copy('faq'))
  const crumbs = breadcrumbsForCombo(service, area, c)
  const genServiceObj = services.find(s => s.slug === genService)
  const noCopy = concept && !isGenerated
  return {
    crumbs, noCopy, intro, local, faqs,
    subhead: copy('hero_subheadline'),
    title: `${service.name} in ${area}`,
    image: imgs.combo_hero || imgs[`service_${service.slug}`] || null,
    badge: serviceEmergencyBadge(c, service, { long: true }),
    facts: pageFacts(d, service),
    upLinks: [
      { href: href.service(service.slug), label: `${service.name} services` },
      { href: href.area(area), label: `${tradeNoun} in ${area}` },
    ],
    otherAreas: areas.filter(a => a !== area),
    otherServices: services.filter(s => s.slug !== service.slug),
    hasBody: !!(intro || local || faqs.length || noCopy),
    note: {
      title: `Your ${service.name} page for ${area}`,
      body: `${service.name} written for ${area}: what you see in homes there, anything local that changes how you do the job, and the questions people in ${area} ask. ${genServiceObj && genArea ? `Written like the ${genServiceObj.name} in ${genArea} page, ` : 'Written for your business '}and checked by you before it goes live.`,
    },
    schemas: [
      buildBreadcrumbSchema(c, crumbs),
      buildServiceSchema(c, { ...service, description: intro || undefined }),
      faqs.length > 0 ? buildFAQSchema(faqs) : null,
    ],
  }
}

/** The about page: their story and approach, and facts from fields. */
export function aboutModel(d) {
  const { c, biz, services, areas, imgs, credential, license } = d
  const gen = c.generated || {}
  const facts = [
    biz.established_year && { value: String(biz.established_year), label: biz.family_owned === true ? 'Family-owned since' : 'Founded' },
    credential && { value: credential === 'Licensed & insured' ? 'Licensed' : credential, label: credential === 'Licensed & insured' ? `and insured${license ? ` · Lic. ${license}` : ''}` : (license ? `Lic. ${license}` : 'Credentials') },
    !credential && license && { value: 'Licence', label: license },
    services.length > 0 && { value: String(services.length), label: services.length === 1 ? 'Service offered' : 'Services offered' },
    areas.length > 0 && { value: String(areas.length), label: areas.length === 1 ? 'Area served' : 'Areas served' },
  ].filter(Boolean)
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: urlAbout() }]
  return {
    crumbs, facts, story: aboutBody(c), approach: asText(gen['about|our_approach']),
    image: imgs.about_hero || null,
    schemas: [buildBreadcrumbSchema(c, crumbs)],
  }
}

/** The contact page's details, from fields. */
export function contactModel(d) {
  const { c, biz, emergency, license } = d
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: urlContact() }]
  return {
    crumbs,
    details: [
      biz.email && { k: 'Email', v: biz.email, href: `mailto:${biz.email}` },
      biz.address_line && { k: 'Address', v: biz.address_line },
      biz.hours_display && { k: 'Hours', v: biz.hours_display },
      emergency && { k: 'Emergencies', v: emergency },
      license && { k: 'License', v: license },
    ].filter(Boolean),
    schemas: [buildLocalBusinessSchema(schemaConfig(c)), buildBreadcrumbSchema(c, crumbs)],
  }
}

export function servicesIndexModel(d) {
  const { c, tradeNoun, offeringLabel } = d
  const crumbs = [{ name: 'Home', url: '/' }, { name: offeringLabel, url: urlServices(c) }]
  return { crumbs, title: /services?$/i.test(tradeNoun) ? tradeNoun : `${tradeNoun} services`, schemas: [buildBreadcrumbSchema(c, crumbs)] }
}

export function areasIndexModel(d) {
  const { c, placeLabel, tradeNoun } = d
  const crumbs = [{ name: 'Home', url: '/' }, { name: placeLabel, url: urlServiceAreas(c) }]
  return { crumbs, title: `${tradeNoun} service areas`, schemas: [buildBreadcrumbSchema(c, crumbs)] }
}

export function faqModel(d) {
  const { c, faqs, tradeNoun } = d
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: urlFAQ() }]
  return { crumbs, title: `${tradeNoun} FAQ`, schemas: [buildBreadcrumbSchema(c, crumbs), faqs.length > 0 ? buildFAQSchema(faqs) : null] }
}

/** The contact form's colours from a family's roles. */
export const formColors = (C, field) => ({
  text: C.text, textDim: C.textDim, textMuted: C.textMuted, border: C.border,
  field: field || C.bg, fieldText: C.text, accent: C.accent, onAccent: C.onAccent,
  success: C.success, urgent: C.urgent,
})
