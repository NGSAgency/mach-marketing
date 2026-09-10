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
// Options (env): AUDIT_OUT=report.json  AUDIT_FAIL=1.5  AUDIT_WARN=3  CHROMIUM=/path/to/chrome
//
// Exit code 1 if any text falls below AUDIT_FAIL (median across its box).

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

const lum = ([r, g, b]) => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {})
const report = {}
let failures = 0

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
  const resp = await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 120000 })
  await page.evaluate(() => Promise.race([
    Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r }))),
    new Promise(r => setTimeout(r, 8000)),
  ]))
  await page.waitForTimeout(800)

  const els = await page.evaluate(() => {
    const out = []
    const seen = new Set()
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const el = walker.currentNode.parentElement
      const text = walker.currentNode.textContent.trim()
      if (!text || !el || seen.has(el)) continue
      seen.add(el)
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (cs.visibility === 'hidden' || cs.display === 'none' || r.width < 2 || r.height < 2) continue
      let opacity = 1
      for (let n = el; n; n = n.parentElement) opacity *= +getComputedStyle(n).opacity
      if (opacity < 0.05) continue
      const m = cs.color.match(/[\d.]+/g).map(Number)
      out.push({
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
    return { ...e, worst: +rs[0].toFixed(2), median: +rs[Math.floor(rs.length / 2)].toFixed(2) }
  })

  const bad = items.filter(i => i.median < FAIL)
  const low = items.filter(i => i.median >= FAIL && i.median < WARN)
  failures += bad.length
  report[path] = { status: resp.status(), items }
  console.log(`${resp.status()} ${path}  text=${items.length}  unreadable=${bad.length}  low=${low.length}`)
  for (const i of bad) console.log(`   FAIL ${i.median.toFixed(2)}  "${i.text}"  rgb(${i.color.join(',')})  at y=${Math.round(i.y)}`)
  await page.close()
}

if (process.env.AUDIT_OUT) fs.writeFileSync(process.env.AUDIT_OUT, JSON.stringify(report, null, 1))
await browser.close()
process.exit(failures ? 1 : 0)
