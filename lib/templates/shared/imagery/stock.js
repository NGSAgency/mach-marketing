// =========================================================
// STOCK FILL
// Fills the image slots a config has no photo for from the hand-tagged
// library. The business's own photos always win.
//
// Rules (agreed 2026-09-11):
//   - Concepts may use any library photo; every stock photo on a concept is
//     labelled "Sample photo" on the page (StockLabels).
//   - Client sites get only photos without people: a house, a room, a
//     product. Nothing that could be taken for the client's own team.
//   - A slot is filled only by a photo whose tags match it. If nothing
//     matches, the slot stays empty and the page shows its no-photo design.
//   - The same photo is never used twice on one site, and the pick is seeded
//     by the business, so two prospects in the same trade don't look alike.
// =========================================================

import { PHOTOS, url } from './library.js'

// Industry keys and profile keys to library trades.
const TRADE_OF = {
  pest_control: 'pest', pest: 'pest',
  hvac: 'hvac', heating_cooling: 'hvac',
  plumbing: 'plumbing',
  electrical: 'electrical', electrician: 'electrical',
  roofing: 'roofing',
  landscaping: 'landscaping', lawn_care: 'landscaping',
  medspa: 'medspa', med_spa: 'medspa', aesthetics: 'medspa', wellness: 'medspa',
  general_contractor: 'home', home_services: 'home',
}

// Words in a service's name (or category) -> the tags a photo for it may carry.
// Order matters only for readability; every rule that matches contributes.
const SERVICE_RULES = [
  [/termite/, ['termite']],
  [/mosquito/, ['mosquito']],
  [/\b(rodents?|mouse|mice|rats?)\b/, ['rodent']],
  [/bed ?bugs?/, ['bed-bug']],
  [/\bants?\b/, ['ant']],
  [/\b(wasps?|bees?|hornets?|stinging|yellow ?jackets?)\b/, ['wasp']],
  [/spiders?/, ['spider']],
  [/(wildlife|raccoons?|squirrels?|opossums?|\bbats?\b|animal)/, ['wildlife']],
  [/(cock)?roach/, ['cockroach']],
  [/(general pest|pest control|quarterly|residential pest|home pest|pest prevention)/, ['general-pest']],
  [/heat pump/, ['heat-pump']],
  [/(mini[- ]?split|ductless)/, ['mini-split']],
  [/\b(ac|a\/c|air condition\w*|cooling)\b/, ['ac', 'cooling']],
  [/water heater|tankless/, ['water-heater']],
  [/(furnace|heating|boiler|\bheat\b(?! pump))/, ['heating']],
  [/(duct|air quality|ventilation|indoor air)/, ['duct']],
  [/thermostat/, ['thermostat']],
  [/(drain|sewer|clog)/, ['drain']],
  [/(leak|burst)/, ['leak']],
  [/(pipe|repip)/, ['pipes']],
  [/(faucet|fixture|sink)/, ['faucet', 'sink']],
  [/(toilet|bathroom)/, ['toilet', 'bathroom']],
  [/(panel|breaker)/, ['panel']],
  [/(wiring|rewir)/, ['wiring']],
  [/(outlet|switch)/, ['outlet']],
  [/(lighting|lights?\b)/, ['lighting']],
  [/(\bev\b|electric vehicle|charger)/, ['ev']],
  [/gutter/, ['gutter']],
  [/(replacement|new roof|re-?roof|roof install)/, ['roof-replacement']],
  [/(roof repair|storm|hail)/, ['repair']],
  [/inspection/, ['inspection']],
  [/shingle/, ['shingles']],
  [/(lawn|mow|turf|fertili)/, ['lawn']],
  [/\btrees?\b/, ['tree']],
  [/(irrigation|sprinkler)/, ['irrigation']],
  [/(patio|paver|hardscape|retaining wall|walkway)/, ['hardscape']],
  [/(hedge|shrub)/, ['hedge']],
  [/(leaf|leaves|clean ?up)/, ['cleanup']],
  [/(landscape design|landscaping|design)/, ['design']],
  [/(mulch|flower bed|garden bed|planting)/, ['beds']],
  [/(facial|hydrafacial|dermaplan)/, ['facial']],
  [/peel/, ['peel']],
  [/(laser|hair removal|\bipl\b)/, ['laser']],
  [/(botox|dysport|xeomin|filler|injectable|lip|neurotoxin|kybella|sculptra)/, ['injectables']],
  [/(microneedl|morpheus|radiofrequency|\brf\b|microcurrent)/, ['device']],
  [/massage/, ['massage']],
  [/(skin ?care|products?)/, ['skincare']],
]

// Page-level slots: which tags make a good photo there, most wanted first.
const PAGE_SLOTS = {
  pest:        { home_hero: ['general-pest', 'home'], home_secondary: ['home'], about_hero: ['home'] },
  hvac:        { home_hero: ['ac', 'heat-pump', 'home'], home_secondary: ['thermostat', 'home'], about_hero: ['home'] },
  plumbing:    { home_hero: ['kitchen', 'bathroom', 'home'], home_secondary: ['pipes', 'sink'], about_hero: ['home'] },
  electrical:  { home_hero: ['panel', 'lighting', 'home'], home_secondary: ['ev', 'lighting'], about_hero: ['home'] },
  roofing:     { home_hero: ['roof-replacement', 'home'], home_secondary: ['shingles', 'home'], about_hero: ['home'] },
  landscaping: { home_hero: ['lawn', 'design', 'hardscape'], home_secondary: ['hardscape', 'lawn'], about_hero: ['design', 'lawn'] },
  medspa:      { home_hero: ['portrait', 'room'], home_secondary: ['room', 'facial'], about_hero: ['reception', 'room'] },
  home:        { home_hero: ['home'], home_secondary: ['home-interior', 'home'], about_hero: ['home'] },
}

const HOME_TRADES = new Set(['pest', 'hvac', 'plumbing', 'electrical', 'roofing', 'landscaping', 'home'])

function hash(s) {
  let h = 2166136261
  for (const ch of String(s || '')) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return h >>> 0
}

function serviceTags(service) {
  const text = `${service?.name || ''} ${service?.category || ''}`.toLowerCase()
  const tags = new Set()
  for (const [re, t] of SERVICE_RULES) if (re.test(text)) t.forEach(x => tags.add(x))
  return tags
}

/** The library trade for a config: industry first, then what its services look like. */
export function tradeFor(c) {
  const key = String(c?.industry_key || c?.profile?.key || '').toLowerCase()
  if (TRADE_OF[key] && TRADE_OF[key] !== 'home') return TRADE_OF[key]
  const votes = {}
  for (const s of c?.services || []) {
    for (const tag of serviceTags(s)) {
      const p = PHOTOS.find(ph => ph.tags.includes(tag))
      const trade = p && p.tags.find(t => PAGE_SLOTS[t])
      if (trade) votes[trade] = (votes[trade] || 0) + 1
    }
  }
  const best = Object.entries(votes).sort((a, b) => b[1] - a[1])[0]
  return best ? best[0] : (TRADE_OF[key] || null)
}

/**
 * Returns the config with empty image slots filled from the library. Each
 * filled image carries stock: true so renderers and labels can tell.
 */
export function fillStock(c) {
  if (!c || c.stock === false) return c
  const trade = tradeFor(c)
  if (!trade) return c
  const concept = c.concept === true
  const own = c.images || {}
  const used = new Set(Object.values(own).map(i => i?.url).filter(Boolean))

  const eligible = PHOTOS.filter(p => (concept || !p.people) && (
    p.tags.includes(trade) ||
    (HOME_TRADES.has(trade) && (p.tags.includes('home') || p.tags.includes('home-interior')))
  ))
  const seed = hash(c.business?.display_name || c.site_slug || '')
  const take = (wanted) => {
    for (const tag of wanted) {
      const pool = eligible.filter(p => p.tags.includes(tag) && !used.has(url(p)))
      if (pool.length) {
        const p = pool[seed % pool.length]
        used.add(url(p))
        return { url: url(p), alt: p.alt, stock: true, credit: `${p.credit} / Unsplash` }
      }
    }
    return null
  }

  const images = {}
  for (const [slot, wanted] of Object.entries(PAGE_SLOTS[trade] || {})) {
    if (!own[slot]) { const img = take(wanted); if (img) images[slot] = img }
  }
  for (const s of c.services || []) {
    const slot = `service_${s.slug}`
    if (own[slot]) continue
    const tags = [...serviceTags(s)]
    // No photo made for this service: a house photo still beats an empty
    // card on a home services site, and it can't be the wrong subject.
    const img = (tags.length ? take(tags) : null) || (HOME_TRADES.has(trade) ? take(['home']) : null)
    if (img) images[slot] = img
  }
  if (Object.keys(images).length === 0) return c
  return { ...c, images: { ...images, ...own } }
}
