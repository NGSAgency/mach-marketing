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
    blurb: 'The symptoms people search for, answered on the page they land on.',
    off: 'People searching symptoms rather than service names may not find you.',
    available: (c) => Object.keys(c.generated || {}).some(k => /\|signs$/.test(k)) || !!c.generated?.['service_detail|signs'],
  },
  {
    key: 'reviews',
    label: 'Reviews',
    where: 'Home page and service pages',
    blurb: 'Your Google rating and the reviews you have picked out.',
    off: 'Your rating is not shown anywhere on the site.',
    available: (c) => !!(c.reviews?.google_rating) || ((c.reviews?.featured || []).length > 0),
  },
  {
    key: 'faq',
    label: 'Questions',
    where: 'Home page and the FAQ page',
    blurb: 'The questions customers ask before they book.',
    off: 'You lose the question markup Google reads, and the FAQ page.',
    available: (c) => faqsFrom(c).length > 0,
  },
  {
    key: 'steps',
    label: 'How it works',
    where: 'Home page and service pages',
    blurb: 'What happens between the call and the job being finished.',
    off: '',
    available: (c) => hasSteps(c.generated?.['home|process']),
  },
  {
    key: 'pricing',
    label: 'What it costs',
    where: 'Service pages',
    blurb: 'Your call-out fee, typical range, estimates and financing.',
    off: 'Callers ask by phone instead of arriving knowing.',
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
    off: '',
    available: (c) => ((aboutBody(c) || []).length > 0) || !!c.generated?.['about|our_approach'],
  },
  {
    key: 'team',
    label: 'Who turns up',
    where: 'Home page and About',
    blurb: 'The people who will actually be at the house, with their names.',
    off: '',
    needs: 'Add your team earlier in this form to switch this on.',
    available: (c) => (c.providers || []).filter(p => p && p.name).length > 0,
  },
  {
    key: 'blog',
    label: 'From the blog',
    where: 'Home page',
    blurb: 'Your most recent posts, linked from the front page.',
    off: 'Posts still publish, they are just not linked from the home page.',
    runtime: true,
    available: () => true,
  },
  {
    key: 'gallery',
    label: 'Photos',
    where: 'Home page',
    blurb: 'Photographs of your own work.',
    off: '',
    needs: 'Upload photos of your work to switch this on.',
    available: (c) => ((c.before_after || []).length > 0) || Object.keys(c.images || {}).length > 1,
  },
  {
    key: 'figures',
    label: 'The numbers',
    where: 'Home page',
    blurb: 'Your rating, the year you started, how many towns you cover.',
    off: '',
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
 * What the questionnaire should show: every optional section with whether we
 * have the content for it, so a client is never offered a toggle we cannot
 * honour. `on` is what the toggle starts as.
 */
export function sectionChoices(config, familyKey) {
  const resolved = resolveSections(config, familyKey)
  return SECTIONS.map(s => ({
    key: s.key,
    label: s.label,
    where: s.where,
    blurb: s.blurb,
    off: s.off || null,
    needs: s.needs || null,
    available: s.runtime ? true : s.available(config || {}),
    on: resolved[s.key],
  }))
}
