// Whether every answer a client gave reaches their site.
//
// One copy of the judgement, used in two places: scripts/field-audit.mjs,
// which sweeps every family against a dev server while we work on designs,
// and app/api/field-audit, which Command Center calls from its pre-publish
// crawl so a stranded answer blocks a launch. Keeping it here, beside the
// renderers it checks, is the point — a second copy in Command Center would
// drift from this one the way every duplicated list in this codebase has.
//
// Why it exists: a field is added to the questionnaire, carried into the
// config, and then either no renderer reads it or one family's copy of a
// shared list falls behind the others. Nothing fails; the client simply never
// sees the answer they gave. Reading the code missed every one of these,
// because the value was read and then dropped further down. Only the rendered
// page settles it.
//
// Plain ES modules and no JSX, so Node runs it without a build.

import { resolveSections } from '../templates/shared/sections.js'
import { hasFaqPage } from '../templates/shared/claims.js'

/**
 * Config paths that are not answers and are not meant to appear as words.
 *
 * Every entry carries its reason. A path belongs here when publishing it
 * would be wrong, never merely because it is not published yet — that is the
 * finding this exists to make.
 */
const NOT_FOR_A_PAGE = [
  ['industry_key', 'picks the profile; the profile picks the words'],
  ['profile.', 'the industry profile: nouns and page lists, not content'],
  ['urls.', 'where the index pages live'],
  ['template_slug', 'which family renders'],
  ['brand.', 'colours'],
  ['tracking.', 'analytics ids'],
  ['.slug', 'a URL segment, and the URL is checked by the crawl itself'],
  ['services[].icon', 'names a glyph, not text'],
  ['gallery[].service', 'tags a photo to a service; the tag is not printed'],
  ['images.', 'image urls and alt text are checked as attributes, not prose'],
  ['reviews.source', 'tells us whether we may republish a review, not a review'],
  ['meta.canonical', 'a link element'],
  ['base_path', 'where the site is served'],
  ['page_copy.', 'one page\'s reviewed copy, fetched for that page alone'],
  ['generated.pricing|', 'no industry has had a pricing page since 10 September 2026, '
    + 'when it was taken out of generation; copy written before then remains in some '
    + 'records and nothing reads it'],
  ['.local_notes', 'what the client told us about a town is source material for '
    + 'the copy written about it, not a paragraph to print as they typed it; '
    + 'whether the copy honours it is the fact checker\'s job, not this one'],
]

/**
 * Answers that stand in for another and are rightly unused while it exists.
 * Each is excused only while its replacement is there, so a site that has
 * neither is still reported.
 */
const FALLBACKS = [
  ['meta.site_description', (c) => !!String(c.generated?.['home|meta_description'] || '').trim()],
  ['meta.site_title', (c) => !!String(c.generated?.['home|meta_title'] || '').trim()],
]

/** Copy for a page this site does not have. The FAQ page exists only when
 *  there are questions to put on it (hasFaqPage, which the page and the
 *  sitemap also ask), so its title and description have nowhere to go. */
const NO_SUCH_PAGE = [
  ['generated.faq|', (c) => !hasFaqPage(c)],
]

/**
 * Answers that only reach a page through an optional section. When that
 * section is off for a family — by its default or the client's own choice —
 * the answer is switched off, not missing. The rules are the registry's own,
 * so this cannot disagree with what the renderers decide.
 */
const SHOWN_BY_SECTION = [
  ['gallery[]', 'gallery'],
]
const sectionFor = (path) => (SHOWN_BY_SECTION.find(([prefix]) => path.startsWith(prefix)) || [])[1] || null

/** Values the renderers translate into English rather than print. A raw one
 *  on a page is a bug we have shipped ("transparent_flat_rate"). */
const looksLikeADatabaseValue = (t) => typeof t === 'string' && /^[a-z0-9]+(_[a-z0-9]+)+$/.test(t.trim())

/**
 * Punctuation, case and HTML entities differ between the database and the
 * page; words are what must survive. Entities go first: React writes an
 * apostrophe as &#x27;, and stripping only punctuation leaves "x27" in the
 * middle of the sentence, which read every apostrophe as unpublished.
 */
export const words = (s) => String(s)
  .replace(/&[#a-z0-9]+;/gi, ' ')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

/** Enough of a value to be sure it was found. Long copy is split into
 *  paragraphs by the renderers, so the opening is what to look for. */
const needleOf = (value) => words(value).split(' ').slice(0, 8).join(' ')

function leaves(node, path, out) {
  if (node === null || node === undefined) return out
  if (Array.isArray(node)) {
    for (const item of node) leaves(item, `${path}[]`, out)
    return out
  }
  if (typeof node === 'object') {
    for (const k of Object.keys(node)) leaves(node[k], path ? `${path}.${k}` : k, out)
    return out
  }
  // Booleans decide phrasing rather than supply it: free_estimates true is
  // published as "Free", not "true". The one kind of answer this cannot check.
  if (typeof node === 'boolean') return out
  const text = String(node).trim()
  if (text) out.push({ path, value: text })
  return out
}

/** Generated copy often arrives as a JSON string: an FAQ is a list, and it is
 *  the questions that must reach the page. */
function expand(entry) {
  const t = entry.value.trim()
  if (!(t.startsWith('[') || t.startsWith('{'))) return [entry]
  try { return leaves(JSON.parse(t), entry.path, []) } catch { return [entry] }
}

/**
 * Two haystacks: the words a visitor reads, every tag removed whole (a
 * caption set as the job in bold and the town beside it is one caption), and
 * the attributes that carry answers of their own — alt text, titles, meta,
 * and the source of each photograph.
 */
function haystackOf(htmls) {
  const bodies = htmls.map(h => h.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' '))
  return words(bodies.map(h => h.replace(/<[^>]*>/g, ' ')).join(' ')) + ' ' +
    words(bodies.map(h => [...h.matchAll(/\s(?:alt|title|aria-label|content|src|href)="([^"]*)"/g)].map(m => m[1]).join(' ')).join(' '))
}

/** How many answers there are to check in a config. */
export const countAnswers = (config) => leaves(config, '', []).flatMap(expand).length

/**
 * Judge one rendered site against its config.
 *
 * htmls:  the HTML of every page that rendered, as strings
 * family: the family those pages were drawn in, for the section rules
 *
 * Returns { unpublished, raw, switchedOff, galleryNote }. A failure is any
 * unpublished answer or raw value; switched-off sections and a gallery
 * showing its newest photographs are notes.
 */
export function judgeAnswers({ config, htmls, family }) {
  const excused = (path) => NOT_FOR_A_PAGE.find(([prefix]) => path.startsWith(prefix) || path.endsWith(prefix))
    || FALLBACKS.find(([p, replaced]) => path === p && replaced(config))
    || NO_SUCH_PAGE.find(([prefix, absent]) => path.startsWith(prefix) && absent(config))

  const haystack = haystackOf(htmls)
  const sections = resolveSections(config, family)
  const unpublished = []
  const raw = []
  const switchedOff = new Map()
  const seenPath = new Set()

  for (const e of leaves(config, '', []).flatMap(expand)) {
    if (excused(e.path)) continue
    const section = sectionFor(e.path)
    if (section && sections[section] === false) {
      switchedOff.set(section, (switchedOff.get(section) || 0) + 1)
      continue
    }
    // Photographs are judged as a set, below: a gallery shows its newest, as
    // many as its layout holds, and that is the gallery working.
    if (e.path.startsWith('gallery[]')) continue
    if (looksLikeADatabaseValue(e.value)) {
      if (haystack.includes(words(e.value))) raw.push(e)
      continue
    }
    const needle = needleOf(e.value)
    if (!needle || haystack.includes(needle)) continue
    // One line per field: a missing row is missing whether on one page or twelve.
    if (seenPath.has(e.path)) continue
    seenPath.add(e.path)
    unpublished.push(e)
  }

  let galleryNote = null
  const photos = (config.gallery || []).filter(g => g?.url)
  if (photos.length >= 2 && sections.gallery !== false) {
    const shown = photos.filter(g => haystack.includes(needleOf(g.url))).length
    if (shown === 0) unpublished.push({ path: 'gallery', value: `section is on, and none of ${photos.length} photographs is shown` })
    else if (shown < photos.length) galleryNote = `${shown} of ${photos.length} photographs appear on the site; the gallery shows the newest, up to its layout's limit`
  }

  return { unpublished, raw, switchedOff: [...switchedOff], galleryNote }
}

/**
 * Crawl a client's site from its home page, following its own links.
 *
 * A page that could not be fetched is a hole in the evidence, never an
 * answer about the site: it is returned in unreachable, and a caller must not
 * score a site with holes in it. The dev sweep once reported most of a site
 * as unpublished because a cold dev server was slow; the server was fine.
 */
export async function crawlSite({ origin, slug, query = '', headers = {}, maxPages = 80, concurrency = 1, timeout = 90000, attempts = 3, fetchImpl = fetch }) {
  const root = `/site/${slug}`
  const seen = new Set([root])
  const queue = [root]
  const pages = []
  const unreachable = []

  const get = async (url) => {
    let last
    for (let i = 0; i < attempts; i++) {
      try {
        return await fetchImpl(url, { redirect: 'follow', headers, signal: AbortSignal.timeout(timeout) })
      } catch (e) {
        last = e
        await new Promise(r => setTimeout(r, 1500 * (i + 1)))
      }
    }
    throw last
  }

  const visit = async (path) => {
    let res
    try { res = await get(origin + path + query) } catch (e) { unreachable.push(`${path}: ${e.message}`); return }
    const html = await res.text()
    pages.push({ path, status: res.status, html })
    if (res.status !== 200) return
    for (const m of html.matchAll(/href="([^"#?]+)"/g)) {
      const href = m[1]
      if (!href.startsWith(root) || seen.has(href) || seen.size > maxPages * 2) continue
      seen.add(href)
      queue.push(href)
    }
  }

  while (queue.length && pages.length + unreachable.length < maxPages) {
    const batch = queue.splice(0, Math.max(1, concurrency))
    await Promise.all(batch.map(visit))
  }
  return { pages, unreachable }
}
