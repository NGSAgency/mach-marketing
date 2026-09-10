import { parseJson } from './claims.js'

/**
 * Written copy for the page being rendered, by section.
 *
 * Client sites get it as config.page_copy, requested for that one page.
 * Concepts write copy for a single item per page type (the first treatment,
 * area, concern) and carry it as config.generated["<pageType>|<section>"]. That
 * copy belongs to that item only: pass { concept: false } for any other item,
 * or its page would show another treatment's text.
 */
export function pageCopy(c, pageType, { concept = true } = {}) {
  const own = c?.page_copy
  const gen = c?.generated || {}
  return (section) => {
    if (own) return present(own[section])
    return concept ? present(gen[`${pageType}|${section}`]) : null
  }
}

const present = (v) => (v == null || (typeof v === 'string' && !v.trim()) ? null : v)

/** [{question, answer}] from a JSON string or an array; [] otherwise. */
export function faqList(v) {
  const list = Array.isArray(v) ? v : parseJson(v)
  return (Array.isArray(list) ? list : [])
    .map(q => ({ question: q?.question || q?.q, answer: q?.answer || q?.a }))
    .filter(q => q.question && q.answer)
}

/**
 * Plain text for a section that may come back as a JSON list (what to
 * expect is written as numbered steps). Steps become "Title. Description"
 * paragraphs, so the section never shows raw JSON.
 */
export function asText(v) {
  if (v == null) return null
  const parsed = Array.isArray(v) ? v : (/^\s*[\[{]/.test(String(v)) ? parseJson(v) : null)
  if (!Array.isArray(parsed)) return String(v)
  const paras = parsed.map(item => {
    if (typeof item === 'string') return item
    const title = item?.title || item?.name || ''
    const body = item?.description || item?.text || item?.body || ''
    return [title && `${String(title).replace(/[.:\s]+$/, '')}.`, body].filter(Boolean).join(' ')
  }).filter(Boolean)
  return paras.length ? paras.join('\n\n') : null
}
