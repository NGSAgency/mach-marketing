#!/usr/bin/env node
// Rendered contrast audit.
//
// Measures every piece of text on a page against the pixels actually painted
// behind it: photos, gradients and overlays included, not the CSS
// background-color. Each page is rendered twice, once as-is and once with all
// text made transparent to get the background plate, and each text box is
// sampled on a 9x5 grid.
//
// This is how the palette failure of 2026-09-08 was diagnosed, and the seed of
// the design linter in the roadmap. Reasoning about the code had pointed at
// hardcoded colours; rendering showed the real cause (see CONTENT_ROADMAP.md,
// "Palette failure: diagnosed").
//
// Not a project dependency, so Vercel builds don't install a browser. To run:
//   mkdir -p /tmp/audit && cd /tmp/audit && npm i playwright pngjs
//   node /path/to/scripts/contrast-audit.mjs http://localhost:3000 /site/slug /site/slug/about
// Options (env): AUDIT_OUT=report.json  AUDIT_FAIL=1.5  AUDIT_WARN=3  AUDIT_WIDTH=1280  CHROMIUM=/path/to/chrome
//
// Hero rule: text inside [data-hero] must reach WCAG AA against the pixels
// behind it (4.5:1, or 3:1 for large text), measured near the worst part of
// the photo (10th percentile of samples), not the median.
//
// Exit code 1 if any text falls below AUDIT_FAIL (median across its box), or
// breaks the text-on-photo rule: inside an element marked data-on-image, text
// must be the container's --on-image or --on-image-dim colour, unless it sits
// on its own opaque fill such as a button. A brand colour
// can't be relied on to read against a client's own photography, so accent
// text on photos isn't allowed at all, whatever its measured contrast.

import { chromium } from 'playwright'
import { PNG } from 'pngjs'
import fs from 'node:fs'

const [,, base, ...paths] = process.argv
if (!base || !paths.length) {
  console.error('usage: contrast-audit.mjs <baseUrl> <path> [path...]')
  process.exit(2)
}
const FAIL = +(process.env.AUDIT_FAIL || 1.5)
const WARN = +(process.env.AUDIT_WARN || 3)
// AUDIT_WIDTH=390 audits the phone layout, where hero text spans the photo.
const WIDTH = +(process.env.AUDIT_WIDTH || 1280)

const lum = ([r, g, b]) => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {})
const report = {}
let failures = 0

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: WIDTH < 600 ? 844 : 900 }, deviceScaleFactor: 1 })
  const resp = await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 120000 })
  await page.evaluate(() => Promise.race([
    Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r }))),
    new Promise(r => setTimeout(r, 8000)),
  ]))
  await page.waitForTimeout(800)

  const els = await page.evaluate(() => {
    // Open FAQ answers and other collapsed content so it gets checked too;
    // menus stay shut, since an open menu covers the page.
    for (const d of document.querySelectorAll('details:not([open])')) if (!/menu/i.test(d.className)) d.open = true
    // Bars fixed to the bottom of a phone screen (call / book) would sit on
    // top of whatever section is behind them in a full-page capture. Their
    // buttons have their own fills; take them out of this pass.
    for (const el of document.querySelectorAll('body *')) {
      const st = getComputedStyle(el)
      if (st.position === 'fixed' && el.getBoundingClientRect().top > innerHeight / 2) el.style.setProperty('visibility', 'hidden', 'important')
    }
    const out = []
    const seen = new Set()
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const el = walker.currentNode.parentElement
      const text = walker.currentNode.textContent.trim()
      if (!text || !el || seen.has(el)) continue
      seen.add(el)
      const cs = getComputedStyle(el)
      // Measure where the glyphs are, not the whole box: a heading's box can
      // run far past its last word, over a different part of a photo.
      const range = document.createRange()
      range.selectNodeContents(el)
      const tight = range.getBoundingClientRect()
      const r = tight.width >= 2 && tight.height >= 2 ? tight : el.getBoundingClientRect()
      if (cs.visibility === 'hidden' || cs.display === 'none' || r.width < 2 || r.height < 2) continue
      // Inside a collapsed menu: not on screen.
      const shut = el.closest('details:not([open])')
      if (shut && !el.closest('summary')) continue
      let opacity = 1
      for (let n = el; n; n = n.parentElement) opacity *= +getComputedStyle(n).opacity
      if (opacity < 0.05) continue
      const m = cs.color.match(/[\d.]+/g).map(Number)
      // Text-on-photo rule: the nearest data-on-image container declares the
      // only colours allowed on it.
      let onImage = null
      const holder = el.closest('[data-on-image]')
      // Text on its own opaque fill (a button) sits on that fill, not the photo.
      let ownFill = false
      for (let n = el; n && n !== holder; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor.match(/[\d.]+/g)
        if (bg && (bg[3] === undefined || +bg[3] >= 0.95)) { ownFill = true; break }
      }
      if (holder && !ownFill) {
        const hs = getComputedStyle(holder)
        const norm = v => { const probe = document.createElement('span'); probe.style.color = v.trim(); document.body.appendChild(probe); const c = getComputedStyle(probe).color; probe.remove(); return c }
        const allowed = ['--on-image', '--on-image-dim'].map(k => hs.getPropertyValue(k)).filter(Boolean).map(norm)
        onImage = { ok: allowed.includes(cs.color), color: cs.color }
      }
      // Hero rule (Hero Research Brief): text in the first screen meets WCAG AA
      // against the photo: 4.5:1, or 3:1 for large text (24px, or 18.66px bold).
      const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight) || 400
      const hero = !!el.closest('[data-hero]')
      const large = size >= 24 || (size >= 18.66 && weight >= 700)
      out.push({ onImage, hero, need: large ? 3 : 4.5,
        text: text.slice(0, 60), tag: el.tagName.toLowerCase(),
        color: m.slice(0, 3), alpha: (m[3] ?? 1) * opacity,
        x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height,
      })
    }
    return out
  })

  const plate = await page.addStyleTag({
    content: '*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}',
  })
  const png = PNG.sync.read(await page.screenshot({ fullPage: true }))
  await plate.evaluate(n => n.remove())
  const px = (x, y) => { const i = (png.width * y + x) << 2; return [png.data[i], png.data[i + 1], png.data[i + 2]] }

  const items = els.map(e => {
    const rs = []
    for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 9; gx++) {
      const x = Math.min(png.width - 1, Math.max(0, Math.round(e.x + (gx + 0.5) * e.w / 9)))
      const y = Math.min(png.height - 1, Math.max(0, Math.round(e.y + (gy + 0.5) * e.h / 5)))
      const bg = px(x, y)
      rs.push(ratio(e.color.map((c, i) => c * e.alpha + bg[i] * (1 - e.alpha)), bg))
    }
    rs.sort((a, b) => a - b)
    // p10: near the lightest (or darkest) part of the photo under the text,
    // which is what WCAG F83 asks for, without one stray pixel deciding it.
    return { ...e, worst: +rs[0].toFixed(2), p10: +rs[Math.floor(rs.length / 10)].toFixed(2), median: +rs[Math.floor(rs.length / 2)].toFixed(2) }
  })

  const offRule = items.filter(i => i.onImage && !i.onImage.ok)
  const heroLow = items.filter(i => i.hero && i.p10 < i.need)
  const bad = items.filter(i => i.median < FAIL)
  const low = items.filter(i => i.median >= FAIL && i.median < WARN)
  failures += bad.length + offRule.length + heroLow.length
  report[path] = { status: resp.status(), items }
  console.log(`${resp.status()} ${path}  text=${items.length}  unreadable=${bad.length}  low=${low.length}  photo-rule=${offRule.length}  hero=${heroLow.length}`)
  for (const i of bad) console.log(`   FAIL ${i.median.toFixed(2)}  "${i.text}"  rgb(${i.color.join(',')})  at y=${Math.round(i.y)}`)
  for (const i of heroLow) console.log(`   HERO ${i.p10.toFixed(2)} < ${i.need}  "${i.text}"  rgb(${i.color.join(',')})`)
  for (const i of offRule) console.log(`   RULE text on a photo must use textOnImage roles: "${i.text}"  ${i.onImage.color}  at y=${Math.round(i.y)}`)
  await page.close()
}

if (process.env.AUDIT_OUT) fs.writeFileSync(process.env.AUDIT_OUT, JSON.stringify(report, null, 1))
await browser.close()
process.exit(failures ? 1 : 0)
