#!/usr/bin/env node
// Field drift audit, as a sweep across every family against a dev server.
//
// The judgement itself lives in lib/site/field-audit.js, shared with the
// endpoint Command Center calls before a site is published; this is the
// sweep we run while working on designs. It audits every family, not just
// the one the client is on — `?family=` on every page type is what makes
// that possible, and it only works on a dev server.
//
//   node scripts/field-audit.mjs http://localhost:3000 internal-qa-mach
//   node scripts/field-audit.mjs http://localhost:3000 internal-qa-mach crew,rail
// Options (env): AUDIT_CONFIG=https://.../api/site/config  AUDIT_MAX=80
//
// Exit code 1 if any answer is unpublished, a raw database value reached a
// page, or a family could not be fully crawled.

import fs from 'node:fs'
import nodePath from 'node:path'
import { fileURLToPath } from 'node:url'

// The shared modules are written for Next, in a package that does not declare
// itself an ES module, so Node prints a "reparsing as ES module" warning on
// loading them. Harmless, and it reads like an error in a terminal, so that
// one warning is silenced.
const quiet = (w) => w?.message?.includes('Reparsing as ES module')
const listeners = process.listeners('warning')
process.removeAllListeners('warning')
process.on('warning', (w) => { if (!quiet(w)) listeners.forEach(l => l(w)) })
const { judgeAnswers, crawlSite, countAnswers } = await import('../lib/site/field-audit.js')

const [, , ORIGIN = 'http://localhost:3000', SLUG, FAMILY_ARG] = process.argv
if (!SLUG) {
  console.error('usage: node field-audit.mjs <origin> <site-slug> [family,family]')
  process.exit(2)
}
const CONFIG_API = process.env.AUDIT_CONFIG || 'https://app.machdigitalsolutions.com/api/site/config'
const MAX_PAGES = +(process.env.AUDIT_MAX || 80)

/** The families to sweep, read from the registry rather than written out
 *  here, so a family added tomorrow is audited without anyone remembering. */
function familiesFromRegistry() {
  const here = nodePath.dirname(fileURLToPath(import.meta.url))
  const src = fs.readFileSync(nodePath.join(here, '..', 'app', 'site', '[slug]', 'renderers', 'registry.js'), 'utf8')
  const body = src.slice(src.indexOf('export const FAMILIES = {'))
  return [...body.matchAll(/^  ([a-z][a-z0-9]*): \{/gm)].map(m => m[1])
}

// The first request goes to Command Center, not the local server, so a hang
// here is silent in both terminals. It announces itself and gives up quickly.
console.log(`reading ${SLUG}'s config from ${CONFIG_API}…`)
let config
try {
  const res = await fetch(`${CONFIG_API}?slug=${encodeURIComponent(SLUG)}`, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) { console.error(`config ${res.status} for ${SLUG}`); process.exit(2) }
  const body = await res.json()
  config = body.config || body
} catch (e) {
  console.error(`could not reach Command Center for the config: ${e.message}`)
  process.exit(2)
}

const families = (FAMILY_ARG ? FAMILY_ARG.split(',') : familiesFromRegistry()).map(f => f.trim()).filter(Boolean)
let failures = 0
console.log(`crawling ${families.length} families: ${families.join(', ')}`)
for (const family of families) {
  console.log(`${family}: crawling…`)
  // One page at a time, with patience: a dev server compiles each route the
  // first time it is asked for, and a cold one is slow.
  const { pages, unreachable } = await crawlSite({ origin: ORIGIN, slug: SLUG, query: `?family=${encodeURIComponent(family)}`, maxPages: MAX_PAGES })
  const rendered = pages.filter(p => p.status === 200)
  const broken = pages.filter(p => p.status !== 200)
  if (unreachable.length) {
    console.log(`${family}: ${unreachable.length} pages could not be reached — this family was NOT audited`)
    for (const u of unreachable.slice(0, 5)) console.log(`   unreachable  ${u}`)
    failures++
    continue
  }
  if (rendered.length === 0) {
    console.log(`${family}: nothing rendered; is the server running?`)
    failures++
    continue
  }
  const { unpublished, raw, switchedOff, galleryNote } = judgeAnswers({ config, htmls: rendered.map(p => p.html), family })
  console.log(`${family}: ${pages.length} pages, ${unpublished.length} unpublished${raw.length ? `, ${raw.length} raw` : ''}${broken.length ? `, ${broken.length} not 200` : ''}`)
  for (const b of broken) console.log(`   ${b.status} ${b.path}`)
  for (const e of raw) console.log(`   RAW          ${e.path}  "${e.value}"  — a database value reached a page`)
  for (const e of unpublished) console.log(`   UNPUBLISHED  ${e.path}  "${e.value.slice(0, 70)}${e.value.length > 70 ? '…' : ''}"`)
  for (const [section, n] of switchedOff) console.log(`   switched off ${section}: ${n} answers not shown, by choice — the client can turn it on`)
  if (galleryNote) console.log(`   gallery: ${galleryNote}`)
  failures += unpublished.length + raw.length + broken.length
}

console.log(`${SLUG}: ${countAnswers(config)} answers checked across ${families.length} families, ${failures} to answer for`)
process.exit(failures ? 1 : 0)
