#!/usr/bin/env node
// Field drift audit.
//
// Asks one question: of everything a client told us, what never reaches a
// page? It reads the generated config, crawls the whole site, and reports
// every answer that appears nowhere.
//
// This exists because the same fault kept recurring. A field is added to the
// questionnaire, carried into the config, and then either no renderer reads
// it or one family's copy of a shared list quietly falls behind the others.
// Nothing fails; the client simply never sees the answer they gave us. Seven
// fields were found stranded that way in one pass, and four more the next.
// Reading the code had missed all of them, because the code looked right —
// the value was read, then dropped by a slice further down. Only the rendered
// page settles it.
//
// It sweeps every family, not just the one the client is on. The first
// version audited whichever family the record happened to name, which made
// every finding a fact about that family alone: a fix verified on one and a
// report that still listed it on another. `?family=` on every page type is
// what makes the sweep possible.
//
// No dependencies, and no build: it works against `npm run dev`.
//   node scripts/field-audit.mjs http://localhost:3000 internal-qa-mach
//   node scripts/field-audit.mjs http://localhost:3000 internal-qa-mach crew,rail
// Options (env): AUDIT_CONFIG=https://.../api/site/config  AUDIT_MAX=80
//
// Exit code 1 if any answer is unpublished, or if a raw database value
// reached a page. Both have happened in production.

import fs from 'node:fs'
import nodePath from 'node:path'
import { fileURLToPath } from 'node:url'

const [, , ORIGIN = 'http://localhost:3000', SLUG, FAMILY_ARG] = process.argv
if (!SLUG) {
  console.error('usage: node field-audit.mjs <origin> <site-slug> [family,family]')
  process.exit(2)
}

/** The families to sweep, read from the registry rather than written out
 *  here, so a family added tomorrow is audited without anyone remembering. */
function familiesFromRegistry() {
  const here = nodePath.dirname(fileURLToPath(import.meta.url))
  const registry = nodePath.join(here, '..', 'app', 'site', '[slug]', 'renderers', 'registry.js')
  const src = fs.readFileSync(registry, 'utf8')
  const body = src.slice(src.indexOf('export const FAMILIES = {'))
  return [...body.matchAll(/^  ([a-z][a-z0-9]*): \{/gm)].map(m => m[1])
}
const CONFIG_API = process.env.AUDIT_CONFIG || 'https://app.machdigitalsolutions.com/api/site/config'
const MAX_PAGES = +(process.env.AUDIT_MAX || 80)

/**
 * Config paths that are not answers and are not meant to appear as words.
 *
 * Every entry carries its reason. A path belongs here when publishing it
 * would be wrong, never merely because it is not published yet — that is the
 * finding this script exists to make.
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
  ['.local_notes', 'what the client told us about a town is source material for '
    + 'the copy written about it, not a paragraph to print as they typed it; '
    + 'whether the copy honours it is the fact checker\'s job, not this one'],
]

/** Values the renderers translate into English rather than print. A raw one
 *  on a page is a bug we have shipped before ("transparent_flat_rate"). */
const looksLikeADatabaseValue = (t) => typeof t === 'string' && /^[a-z0-9]+(_[a-z0-9]+)+$/.test(t.trim())

/**
 * Punctuation, case and HTML entities all differ between the database and the
 * page. Words are what must survive the trip.
 *
 * Entities have to go before the rest, not with it: React writes an
 * apostrophe as &#x27;, and stripping only the punctuation leaves the word
 * "x27" sitting in the middle of the sentence, so every value containing an
 * apostrophe reads as unpublished. Four of them did, on all eight families,
 * and the pages were fine.
 */
const words = (s) => String(s)
  .replace(/&[#a-z0-9]+;/gi, ' ')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

/** Enough of a value to be sure we found it and not something else. Long
 *  copy is split into paragraphs by the renderers, so the opening is what to
 *  look for, never the whole. */
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
  // published as the word "Free", which is not the word "true". They are the
  // one kind of answer this script cannot check by looking for it.
  if (typeof node === 'boolean') return out
  const text = String(node).trim()
  if (text) out.push({ path, value: text })
  return out
}

/** Generated copy arrives as a JSON string often enough to matter: an FAQ is
 *  a list of questions, and it is the questions that must reach the page. */
function expand(entry) {
  const t = entry.value.trim()
  if (!(t.startsWith('[') || t.startsWith('{'))) return [entry]
  try {
    return leaves(JSON.parse(t), entry.path, [])
  } catch {
    return [entry]
  }
}

async function crawl(origin, slug, family) {
  const q = family ? `?family=${encodeURIComponent(family)}` : ''
  const root = `/site/${slug}`
  const seen = new Set([root])
  const queue = [root]
  const pages = []
  while (queue.length && pages.length < MAX_PAGES) {
    const path = queue.shift()
    let res
    try {
      res = await fetch(origin + path + q, { redirect: 'follow' })
    } catch (e) {
      console.error(`   could not reach ${path}: ${e.message}`)
      continue
    }
    const html = await res.text()
    pages.push({ path, status: res.status, html })
    if (res.status !== 200) continue
    for (const m of html.matchAll(/href="([^"#?]+)"/g)) {
      const href = m[1]
      if (!href.startsWith(root)) continue
      if (seen.has(href) || seen.size > MAX_PAGES * 2) continue
      seen.add(href)
      queue.push(href)
    }
  }
  return pages
}

const res = await fetch(`${CONFIG_API}?slug=${encodeURIComponent(SLUG)}`)
if (!res.ok) {
  console.error(`config ${res.status} for ${SLUG}`)
  process.exit(2)
}
const body = await res.json()
const config = body.config || body

const families = (FAMILY_ARG ? FAMILY_ARG.split(',') : familiesFromRegistry()).map(f => f.trim()).filter(Boolean)
const entries = leaves(config, '', []).flatMap(expand)
const excused = (path) => NOT_FOR_A_PAGE.find(([prefix]) => path.startsWith(prefix) || path.endsWith(prefix))

let failures = 0
for (const family of families) {
  const pages = await crawl(ORIGIN, SLUG, family)
  const rendered = pages.filter(p => p.status === 200)
  const broken = pages.filter(p => p.status !== 200)
  if (rendered.length === 0) {
    console.log(`${family}: nothing rendered; is the server running?`)
    failures++
    continue
  }

  // One haystack of every word the site says, attributes included: alt text
  // and link titles are answers too.
  const haystack = words(
    rendered.map(p => p.html.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')).join(' ')
  )

  const unpublished = []
  const raw = []
  const seenPath = new Set()
  for (const e of entries) {
    if (excused(e.path)) continue
    if (looksLikeADatabaseValue(e.value)) {
      if (haystack.includes(words(e.value))) raw.push(e)
      continue
    }
    const needle = needleOf(e.value)
    if (!needle) continue
    if (haystack.includes(needle)) continue
    // One line per field, not one per service: a missing row is a missing row
    // whether it is missing on one page or twelve.
    if (seenPath.has(e.path)) continue
    seenPath.add(e.path)
    unpublished.push(e)
  }

  const trouble = unpublished.length + raw.length + broken.length
  console.log(`${family}: ${pages.length} pages, ${unpublished.length} unpublished${raw.length ? `, ${raw.length} raw` : ''}${broken.length ? `, ${broken.length} not 200` : ''}`)
  for (const b of broken) console.log(`   ${b.status} ${b.path}`)
  for (const e of raw) console.log(`   RAW          ${e.path}  "${e.value}"  — a database value reached a page`)
  for (const e of unpublished) console.log(`   UNPUBLISHED  ${e.path}  "${e.value.slice(0, 70)}${e.value.length > 70 ? '\u2026' : ''}"`)
  failures += trouble
}

console.log(`${SLUG}: ${entries.length} answers checked across ${families.length} families, ${failures} to answer for`)
process.exit(failures ? 1 : 0)
