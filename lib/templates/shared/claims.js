// Wording for anything that asserts a fact about the business.
//
// Every string here is derived from a field in the site config. When the field
// is missing the helper returns null (or an empty list) and the caller renders
// nothing: no generic claim takes its place.

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

export function countLabel(n, one, many) {
  const num = Number(n)
  return Number.isFinite(num) && num > 0 ? plural(num, one, many) : null
}

export function joinList(items) {
  const list = (items || []).filter(Boolean)
  if (list.length <= 1) return list[0] || ''
  return `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`
}

export function parseJson(raw) {
  if (!raw) return null
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(String(raw).replace(/```json/gi, '').replace(/```/g, '').trim()) } catch { return null }
}

/** "24/7 emergency service", "Same-day or emergency service", or null. */
export function emergencyLabel(c) {
  const p = c?.positioning || {}
  if (p.emergency_24_7) return '24/7 emergency service'
  if (p.emergency_service) return 'Same-day or emergency service'
  return null
}

/**
 * Badge for one service: "24/7" only when the business offers 24/7 emergency
 * service and this service is flagged as an emergency service; "Emergency"
 * when only the service is flagged; otherwise null.
 */
export function serviceEmergencyBadge(c, svc, { long = false } = {}) {
  if (svc?.emergency !== true) return null
  if (c?.positioning?.emergency_24_7) return long ? '24/7 Emergency' : '24/7'
  return 'Emergency'
}

/** "Licensed & insured", "Licensed", "Insured", or null. */
export function credentialLabel(c) {
  const p = c?.positioning || {}
  if (p.licensed && p.insured) return 'Licensed & insured'
  if (p.licensed) return 'Licensed'
  if (p.insured) return 'Insured'
  return null
}

/** "Since 2009", or null when the year is unknown. */
export function sinceYear(c) {
  const y = c?.business?.established_year
  return y ? `Since ${y}` : null
}

/** "Family-owned since 2009" only when the client said so, else "Since 2009", else null. */
export function sinceLabel(c) {
  const y = c?.business?.established_year
  if (!y) return null
  return c.business.family_owned === true ? `Family-owned since ${y}` : `Since ${y}`
}

export function warrantyText(w) {
  if (!w) return null
  if (typeof w === 'string') return w.trim() || null
  return w.name || w.description || null
}

/**
 * The "why us" list on service pages, built only from confirmed data. An
 * empty list means the block should not render at all.
 */
export function whyUsItems(c, service) {
  const p = c?.positioning || {}
  const lic = c?.credentials?.license_number
  const items = []

  if (p.licensed && p.insured) items.push(`Licensed & insured${lic ? ` · Lic. ${lic}` : ''}`)
  else if (p.licensed) items.push('Licensed')
  else if (p.insured) items.push('Insured')

  const emergency = emergencyLabel(c)
  if (emergency) items.push(emergency)

  if (p.financing) {
    const partners = (p.financing_partners || []).filter(Boolean)
    items.push(`Financing available${partners.length ? ` through ${joinList(partners)}` : ''}`)
  }

  const warranty = warrantyText(service?.warranty) || warrantyText((p.warranties || [])[0])
  if (warranty) items.push(warranty)

  return items
}

/** FAQs the client or the generation pipeline supplied; never defaults. */
export function faqsFrom(c) {
  const norm = (list) => (Array.isArray(list) ? list : [])
    .map(q => ({ question: q?.question || q?.q, answer: q?.answer || q?.a }))
    .filter(q => q.question && q.answer)
  const generated = norm(parseJson(c?.generated?.['faq|questions']))
  if (generated.length > 0) return generated
  return norm(c?.faq)
}

/** About-page body: the generated story, else the team description, else null. */
export function aboutBody(c) {
  const text = c?.generated?.['about|story'] || c?.team?.description || null
  if (!text) return null
  const paras = String(text).split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
  return paras.length > 0 ? paras : null
}

/** A plain factual sentence for about pages, from whatever is known. */
export function aboutFacts(c) {
  const name = c?.business?.display_name
  const year = c?.business?.established_year
  const areas = countLabel((c?.service_areas || []).filter(Boolean).length, 'area', 'areas')
  const team = countLabel(c?.team?.size, 'team member', 'team members')
  const sentences = []
  if (name && year) sentences.push(`${name} was established in ${year}.`)
  if (areas && team) sentences.push(`Today we serve ${areas} with ${team}.`)
  else if (areas) sentences.push(`Today we serve ${areas}.`)
  else if (team) sentences.push(`We have ${team}.`)
  return sentences.length > 0 ? sentences.join(' ') : null
}

/** Join the non-empty parts of a line, e.g. ["12 services", null, "Since 2009"]. */
export function joinParts(parts, sep = ' · ') {
  return (parts || []).filter(Boolean).join(sep)
}

/**
 * The trust row in a hero, most persuasive first, from confirmed data only.
 * Research (Hero Research Brief, 2026-09-11): the rating and review count come
 * first and are shown exactly, never rounded up; then years, licence,
 * availability, financing and a short guarantee. A rating stated on the
 * business's own site is not called a Google rating.
 *
 * Returns [{ kind, text, rating?, count? }].
 */
export function heroTrust(c, { max = 5 } = {}) {
  const p = c?.positioning || {}
  const r = c?.reviews || {}
  const items = []
  const rating = Number(r.google_rating)
  if (rating > 0) {
    const count = parseInt(r.google_count) || null
    const source = r.source === 'their_site' ? 'reviews' : 'Google reviews'
    // One decimal, rounded down: 4.86 shows as 4.8, never as 4.9.
    const shown = (Math.floor(rating * 10 + 1e-9) / 10).toFixed(1)
    items.push({
      kind: 'rating', rating: shown, count,
      text: count ? `${shown} from ${count.toLocaleString('en-US')} ${source}` : `${shown} ${r.source === 'their_site' ? 'rating' : 'Google rating'}`,
    })
  }
  const since = sinceLabel(c)
  if (since) items.push({ kind: 'since', text: since })
  else if (c?.business?.years_in_business > 1) items.push({ kind: 'since', text: `${c.business.years_in_business} years in business` })
  const lic = c?.credentials?.license_number
  if (p.licensed && p.insured) items.push({ kind: 'licence', text: `Licensed & insured${lic ? ` · Lic. ${lic}` : ''}` })
  else if (p.licensed) items.push({ kind: 'licence', text: `Licensed${lic ? ` · Lic. ${lic}` : ''}` })
  else if (p.insured) items.push({ kind: 'licence', text: 'Insured' })
  const emergency = emergencyLabel(c)
  if (emergency) items.push({ kind: 'availability', text: emergency })
  if (p.financing) items.push({ kind: 'financing', text: 'Financing available' })
  const w = warrantyText((p.warranties || [])[0])
  if (w && w.length <= 40) items.push({ kind: 'guarantee', text: w })
  return items.slice(0, max)
}
