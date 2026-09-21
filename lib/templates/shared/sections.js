// Which sections a site shows, and who decides.
//
// Three layers, resolved in this order, each able to turn a section off but
// only the first able to turn one on:
//
//   1. the family's default   — the arrangement the design was drawn around
//   2. the client's choice    — their toggles from onboarding (config.sections)
//   3. whether the data exists — always wins
//
// The third layer is the important one. A client who switches Reviews on and
// then gives us no reviews gets no reviews section, not an empty frame, and a
// family that wants a team section on a business with no named staff simply
// doesn't render one. Nothing on these sites is ever a placeholder.
//
// The locked sections are not offered as choices anywhere: services and areas
// carry the internal links that make the town pages rank, and a site with no
// way to make contact has nowhere to send a lead. Switching those off would be
// a client quietly deleting their own SEO.
import { faqsFrom, aboutBody, parseJson } from './claims.js'

const looksLikeJson = (v) => typeof v === 'string' && /^\s*[\[{]/.test(v)
const hasSteps = (v) => {
  const list = Array.isArray(v) ? v : (looksLikeJson(v) ? parseJson(v) : null)
  return Array.isArray(list) && list.length > 0
}

export const LOCKED = ['hero', 'services', 'areas', 'contact', 'privacy']

/**
 * Every optional section: what it is called in the questionnaire, where it
 * lands, and the one question that decides whether we have the content.
 *
 * `runtime: true` marks a section whose data isn't in the site config — the
 * renderer checks it where the data actually is (blog posts arrive per page).
 */
export const SECTIONS = [
  {
    key: 'signs',
    label: 'Signs you need this',
    where: 'Every service page',
    blurb: 'The symptoms people actually search for, answered on the page they land on.',
    off: 'People searching symptoms rather than service names may not find you.',
    // The copy lives per service page (config.page_copy.signs on a client
    // site, generated['service_detail|signs'] on a concept), not in one place
    // the registry can see. The renderer hides the section when a page has no
    // signs, so the choice is always offered.
    runtime: true,
    available: () => true,
  },
  {
    key: 'reviews',
    label: 'Reviews',
    where: 'Home page and service pages',
    blurb: 'Your Google rating and the reviews you picked out.',
    off: 'Your rating is not shown anywhere on the site.',
    needs: 'Needs a Google rating or reviews to feature. Neither is asked in the questionnaire; they come from the client’s Google profile.',
    available: (c) => !!(c.reviews?.google_rating) || ((c.reviews?.featured || []).length > 0),
  },
  {
    key: 'faq',
    label: 'Questions',
    where: 'Home page and the FAQ page',
    blurb: 'The questions customers ask before they book.',
    off: 'You lose the question markup Google reads, and the FAQ page.',
    needs: 'Needs questions: the client can add their own on the “Trust & Pricing” step, or they are written with the site’s copy.',
    available: (c) => faqsFrom(c).length > 0,
  },
  {
    key: 'steps',
    label: 'How it works',
    where: 'Home page and service pages',
    blurb: 'What happens between the call and the job being finished.',
    off: 'People do not know what happens after they call.',
    needs: 'Needs the steps of a visit, which are written with the home page copy.',
    available: (c) => hasSteps(c.generated?.['home|process']),
  },
  {
    key: 'pricing',
    label: 'What it costs',
    where: 'Service pages',
    blurb: 'Your call-out fee, typical range, estimates and financing.',
    off: 'People call to ask the price instead of arriving knowing it.',
    needs: 'Needs a price range, a call-out fee, an estimate policy or financing, from the “Trust & Pricing” step.',
    available: (c) => {
      const p = c.pricing || {}
      return !!(p.diagnostic_fee || p.service_call_fee || p.price_range_general || p.free_estimates || p.financing || p.approach)
    },
  },
  {
    key: 'story',
    label: 'The company',
    where: 'About page and home page',
    blurb: 'How the business started and how it works, with your credentials.',
    off: 'Nothing on the site says how long you have been doing this.',
    needs: 'Needs the company’s story or how they work, which is written with the About page copy.',
    available: (c) => ((aboutBody(c) || []).length > 0) || !!c.generated?.['about|our_approach'],
  },
  {
    key: 'team',
    label: 'Who turns up',
    where: 'Home page and About',
    blurb: 'The people who will actually be at the house, with their names.',
    off: 'The site never shows who is coming to the house.',
    needs: 'Add your team on the “Your Team” step to switch this on.',
    available: (c) => (c.providers || []).filter(p => p && p.name).length > 0,
  },
  {
    key: 'blog',
    label: 'From the blog',
    where: 'Home page',
    blurb: 'Your most recent posts, linked from the front page.',
    off: 'Posts still publish; they are just not linked from the home page.',
    runtime: true,
    available: () => true,
  },
  {
    key: 'gallery',
    label: 'Photos of your work',
    where: 'Home page',
    blurb: 'Photographs of your own work.',
    off: 'Your own photographs are never shown together.',
    needs: 'Upload photos of your work to switch this on.',
    // Only their own photographs count. Every empty slot is filled from the
    // stock library before a renderer sees the config, so counting c.images
    // would offer a gallery of library pictures as "photos of your work".
    // config.gallery is their tagged photographs; images are the slots. Either
    // can carry a gallery, and counting only the slots hid the section on a
    // site whose photographs were all tagged to services.
    available: (c) => ((c.gallery || []).length > 1)
      || ((c.before_after || []).length > 0)
      || Object.values(c.images || {}).filter(i => i && i.url && !i.stock).length > 1,
  },
  {
    key: 'figures',
    label: 'The numbers',
    where: 'Home page',
    blurb: 'Your rating, the year you started, how many towns you cover.',
    off: 'Your rating and your years in business are not shown as figures.',
    needs: 'Needs a Google rating, the year the business started, or more than one area served.',
    available: (c) => !!(c.reviews?.google_rating || c.business?.established_year || (c.service_areas || []).length > 1),
  },
]

export const SECTION_KEYS = SECTIONS.map(s => s.key)

/**
 * What each family shows when nobody has chosen anything. This is the
 * ownership split: a section marked here for one family and not the others is
 * that family's own, and is what stops six designs being six arrangements of
 * one page.
 */
export const FAMILY_SECTIONS = {
  // The plain one. It owns nothing on purpose — a client who wants a
  // straightforward local site picks this, and a gimmick would spoil it.
  crew:    ['signs', 'reviews', 'faq', 'figures'],
  // Established and careful: its story and its certifications, and the advice
  // it publishes.
  hearth:  ['signs', 'reviews', 'story', 'blog', 'figures'],
  // Modern and plain-spoken: leads with the method and publishes the price.
  level:   ['signs', 'reviews', 'steps', 'pricing'],
  // Composed and photographic.
  centre:  ['signs', 'reviews', 'faq', 'steps', 'gallery', 'figures'],
  // The form does the work; the rest stays quiet.
  booking: ['signs', 'reviews', 'faq'],
  // The panel carries the facts, so the page carries the argument.
  stage:   ['signs', 'reviews', 'faq', 'steps', 'figures'],
  // Dark and photographic: the people who turn up.
  rail:    ['signs', 'reviews', 'team', 'gallery'],
  // Editorial, med spa only.
  serene:  ['signs', 'reviews', 'story', 'team', 'gallery'],
}

/**
 * Resolve the three layers for one site.
 *
 * Returns a plain object of key → boolean. Renderers ask it one question at a
 * time (`if (!x.sections.reviews) return null`) rather than reasoning about
 * where the answer came from.
 */
export function resolveSections(config, familyKey) {
  const chosen = config?.sections || null
  const defaults = FAMILY_SECTIONS[familyKey] || FAMILY_SECTIONS.crew
  const out = {}
  for (const s of SECTIONS) {
    const onByDefault = defaults.includes(s.key)
    // A client choice overrides the family's arrangement in both directions;
    // no choice means the family decides.
    const wanted = chosen && Object.prototype.hasOwnProperty.call(chosen, s.key)
      ? chosen[s.key] !== false
      : onByDefault
    out[s.key] = wanted && (s.runtime ? true : s.available(config || {}))
  }
  for (const k of LOCKED) out[k] = true
  return out
}

/**
 * Where a section lands differs by design, so the words say the right thing
 * about the one the client picked. Anything not listed uses the section's own
 * line.
 */
export const PLACEMENT = {
  booking: { faq: 'Home page, below the services', reviews: 'Directly under the form, high on the home page' },
  centre:  { reviews: 'Home page, set as a single large quote', figures: 'Home page, across a dark band' },
  stage:   { reviews: 'Home page, as its own chapter', figures: 'The panel beside the page' },
  rail:    { team: 'Home page, with photographs' },
  level:   { pricing: 'Home page and service pages' },
}

/** The core of every site, as the questionnaire and staff panel describe it.
 *  Shown, never offered: services and service areas carry the internal
 *  linking the town pages rank on. Keys match LOCKED. */
export const LOCKED_COPY = [
  { key: 'hero', label: 'Your headline and opening', why: 'Every page needs somewhere to start.' },
  { key: 'services', label: 'Services', why: 'Each one gets its own page, and those pages carry your rankings.' },
  { key: 'areas', label: 'Service areas', why: 'A page per town, and a page for each service in each town.' },
  { key: 'contact', label: 'Contact', why: 'Somewhere for a lead to land, and a call button on every page.' },
  { key: 'privacy', label: 'Privacy notice', why: 'Required once your site uses analytics or a contact form.' },
]

const wordsFor = (s, familyKey) => ({
  key: s.key,
  label: s.label,
  where: PLACEMENT[familyKey]?.[s.key] || s.where,
  blurb: s.blurb,
  off: s.off || null,
  needs: s.needs || null,
  runtime: !!s.runtime,
})

/**
 * The registry itself, for Command Center.
 *
 * Command Center kept its own copy of this file — the keys, every family's
 * defaults, and the words its questionnaire and staff panel show. The two had
 * already drifted in nine lines of wording and had nothing keeping the rest in
 * step, and its copy knew whether two of the ten sections had content and
 * assumed the other eight did, so its panel could call a section on that the
 * site hides. It now asks for this instead (app/api/sections), and keeps only
 * what is its own: which sections an industry never generates copy for, and
 * the two checks it can make from questionnaire answers before a site exists.
 */
export function sectionRegistry() {
  return {
    keys: SECTION_KEYS,
    families: FAMILY_SECTIONS,
    placement: PLACEMENT,
    locked: LOCKED_COPY,
    sections: SECTIONS.map(s => wordsFor(s, null)),
  }
}

/**
 * One site's sections exactly as it renders them: the words, whether the
 * content exists (null for a section decided page by page, like the blog),
 * whether the family shows it by default, what the client chose, and whether
 * it is on. What the staff panel shows, so it can never say a section is on
 * that the site hides.
 */
export function sectionChoices(config, familyKey) {
  const resolved = resolveSections(config, familyKey)
  const defaults = FAMILY_SECTIONS[familyKey] || FAMILY_SECTIONS.crew
  const chosen = config?.sections || null
  return SECTIONS.map(s => ({
    ...wordsFor(s, familyKey),
    available: s.runtime ? null : !!s.available(config || {}),
    byDefault: defaults.includes(s.key),
    chosen: chosen && Object.prototype.hasOwnProperty.call(chosen, s.key) ? chosen[s.key] !== false : null,
    on: !!resolved[s.key],
  }))
}
