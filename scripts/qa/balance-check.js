// Section balance check, run in a browser against the rendered site.
//
// The crawl in the Command Center reads HTML, so it cannot see layout. This
// measures the pages as drawn and lists sections that look lopsided:
//   - a heading alone in a side column beside a tall stack of content
//   - a grid whose last row is short (a leftover card)
//   - cards in one row filled to very different lengths
//   - matching parts (photo, paragraph) starting at different heights
//   - some cards in a row with a photo and others without
//
// How to run: open any page of the site (same origin as the preview), paste
// this file into the console, then:
//   await balanceSite('/site/<slug>', ['', '/about', '/treatments', ...])
// Each page loads in a hidden 1280px-wide frame. Part of every site QA.

function balanceIssues(doc) {
  const win = doc.defaultView, out = []
  const vis = el => { const r = el.getBoundingClientRect(); const s = win.getComputedStyle(el); return r.width > 40 && r.height > 20 && s.display !== 'none' && s.visibility !== 'hidden' && s.position !== 'absolute' && s.position !== 'fixed' }
  const label = sec => (sec.querySelector('h2,h1')?.textContent || sec.textContent).trim().replace(/\s+/g, ' ').slice(0, 40)
  // Height of what is drawn in an element, not its box: a grid stretches a
  // short heading to the height of the column beside it.
  const contentH = el => {
    const top = el.getBoundingClientRect().top; let b = top
    ;[el, ...el.querySelectorAll('*')].forEach(k => {
      let r = null
      // Text is measured wherever it sits, including a link with a small
      // marker beside its words (a span), which is not a leaf element
      const hasText = [...k.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
      if (k.tagName === 'IMG') r = k.getBoundingClientRect()
      else if (hasText || (k.children.length === 0 && k.textContent.trim())) { const rg = doc.createRange(); rg.selectNodeContents(k); r = rg.getBoundingClientRect() }
      else if (k.children.length === 0 && /^(A|BUTTON)$/.test(k.tagName)) r = k.getBoundingClientRect()
      if (r && r.height) b = Math.max(b, r.bottom)
    })
    return b - top
  }
  for (const sec of doc.querySelectorAll('section')) {
    if (!vis(sec)) continue
    const name = label(sec)
    for (const g of sec.querySelectorAll('*')) {
      const s = win.getComputedStyle(g)
      if (!(s.display === 'grid' || (s.display === 'flex' && s.flexWrap === 'wrap'))) continue
      const kids = [...g.children].filter(vis)
      if (kids.length < 2) continue
      const rows = {}
      kids.forEach(k => { const t = Math.round(k.getBoundingClientRect().top / 4) * 4; (rows[t] = rows[t] || []).push(k) })
      const rowList = Object.keys(rows).map(Number).sort((a, b) => a - b).map(t => rows[t])
      if (rowList.length === 1 && kids.length === 2) {
        const hs = kids.map(contentH); const lo = Math.min(...hs), hi = Math.max(...hs)
        const short = kids[hs.indexOf(lo)]
        // A side column that stays in view as the text scrolls never sits
        // empty, so it passes when it holds more than a heading
        const sticky = [short, ...short.children].some(e => win.getComputedStyle(e).position === 'sticky') && short.querySelectorAll('*').length > 1
        if (hi > 600 && lo / hi < 0.2 && !sticky) { out.push(`${name} | heading alone beside ${Math.round(hi)}px of content`); continue }
        if (sticky) continue
        // A heading beside a short block of text is the section's layout,
        // not two cards; only the tall case above is a problem
        if (short.querySelector('h2, h3') && !short.querySelector('img') && short.textContent.trim().length < 80) continue
      }
      // A deliberate big-and-small grid (one card two rows tall) is judged
      // on whether it fills its rows, not on matching heights
      const spans = kids.some(k => { const cs = win.getComputedStyle(k); return /span\s*[2-9]/.test(cs.gridRowStart + ' ' + cs.gridRowEnd) })
      if (spans) continue
      if (rowList[0].length < 2) continue
      // Small tags and chips wrap freely; only cards are held to full rows
      const avgH = kids.reduce((n, k) => n + k.getBoundingClientRect().height, 0) / kids.length
      const first = rowList[0].length, last = rowList[rowList.length - 1].length
      if (avgH > 70 && rowList.length > 1 && last < first && rowList.slice(0, -1).every(r => r.length === first)) out.push(`${name} | last row has ${last} of ${first}`)
      for (const row of rowList) {
        if (row.length < 2 || avgH < 70) continue
        const hs = row.map(contentH); const mx = Math.max(...hs), mn = Math.min(...hs)
        if (mx > 160 && (mx - mn) / mx > 0.3) out.push(`${name} | cards in a row run ${Math.round(mn)}–${Math.round(mx)}px`)
        for (const sel of ['img', 'p']) {
          const tops = row.map(k => k.querySelector(sel)).filter(Boolean).map(e => e.getBoundingClientRect().top)
          if (tops.length === row.length && Math.max(...tops) - Math.min(...tops) > 10) { out.push(`${name} | ${sel === 'img' ? 'photos' : 'text'} start ${Math.round(Math.max(...tops) - Math.min(...tops))}px apart`); break }
        }
        const withImg = row.filter(k => k.querySelector('img')).length
        if (withImg > 0 && withImg < row.length) out.push(`${name} | ${withImg} of ${row.length} cards have a photo`)
      }
    }
  }
  return [...new Set(out)]
}

async function balanceSite(base, paths, width = 1280) {
  const res = {}
  for (const p of paths) {
    const f = document.createElement('iframe')
    f.style.cssText = `position:fixed;left:-${width + 200}px;top:0;width:${width}px;height:900px`
    document.body.appendChild(f)
    await new Promise(r => { f.onload = r; f.src = base + p })
    await new Promise(r => setTimeout(r, 1500))
    try { const r = balanceIssues(f.contentDocument); if (r.length) res[p || '/'] = r } catch (e) { res[p || '/'] = ['error ' + e.message] }
    f.remove()
  }
  return res
}
