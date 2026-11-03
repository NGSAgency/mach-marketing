// Titles and descriptions held to what Google shows (about 60 and 160
// characters). The same rules as Command Center's src/lib/seo-check.js, which
// applies them when copy is written; here they're the safety net for the
// titles the site assembles itself while a page's own isn't approved yet.

export const TITLE_MAX = 60
export const DESC_MAX = 160

const STATES = 'AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY'
const STATE_AFTER_TOWN = new RegExp(`(?<=[a-z])\\s*,\\s*(?:${STATES})\\b(?=$|[\\s.,|])`)
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const tidy = (s) => String(s || '').replace(/\s+/g, ' ').trim()

function cutAtWord(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max + 1)
  const sp = cut.lastIndexOf(' ')
  return (sp > max * 0.6 ? cut.slice(0, sp) : s.slice(0, max)).replace(/[\s|,;:–—-]+$/, '')
}

/** Drop "Since 2019", then the business name, then the state; then cut at a word. */
export function fitTitle(text, businessName = '') {
  let t = tidy(text)
  if (t.length <= TITLE_MAX) return t
  const steps = [
    (s) => s.replace(/\s+Since \d{4}\b/i, ''),
    (s) => businessName ? s.replace(new RegExp(`\\s*[|–—-]\\s*${esc(businessName)}.*$`, 'i'), '') : s,
    (s) => s.replace(/\s*\|[^|]*$/, ''),
    (s) => s.replace(STATE_AFTER_TOWN, ''),
  ]
  for (const step of steps) {
    const next = step(t).trim()
    if (next) t = next
    if (t.length <= TITLE_MAX) return t
  }
  return cutAtWord(t, TITLE_MAX)
}

/** End at a sentence if one fits, else at a word. */
export function fitDescription(text) {
  const t = tidy(text)
  if (t.length <= DESC_MAX) return t
  const cut = t.slice(0, DESC_MAX + 1)
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  if (end >= 100) return t.slice(0, end + 1)
  return cutAtWord(t, DESC_MAX - 1).replace(/[,;:\s]+$/, '') + '.'
}

/** A real town for a title, or null ("your area" is the generator's placeholder). */
export function townOf(config) {
  const a = tidy(config?.primary_service_area || (config?.service_areas || [])[0])
  return a && a.toLowerCase() !== 'your area' ? a : null
}

/** The state a town is in, when the client gave one. */
export function stateOf(config, area) {
  const facts = config?.area_facts || {}
  const key = Object.keys(facts).find(k => tidy(k).toLowerCase() === tidy(area).toLowerCase())
  return key ? tidy(facts[key]?.state) || null : null
}
