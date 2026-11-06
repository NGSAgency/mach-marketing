// Card grids whose rows are always full.
//
// An auto-fill grid puts as many cards in a row as fit and leaves whatever is
// over alone in the last row: 20 treatments three across left two cards and an
// empty third, 4 reasons three across left one. The balance check flags it.
//
// pickCols chooses a column count that divides the cards evenly (20 go four
// across, 10 go five across, 4 go four or two by two). When nothing divides
// evenly, the last row's cards widen to fill it, so every row runs edge to
// edge. Cards in a row share one height (flex stretch).
//
// Usage:
//   const cell = fillRows(items.length, pickCols(items.length, 4))
//   <div className="sr-fill" style={{ '--g': '8px' }}>
//     {items.map((it, i) => <a className="sr-cell" style={{ ...cell(i), ... }}>)}
//   </div>
//   <FillCSS />   (once per page; repeats are harmless)

export function pickCols(n, max = 4, min = 2) {
  if (n <= max) return Math.max(1, n)
  for (let c = max; c >= min; c--) if (n % c === 0) return c
  // No even split: the most cards per row, leftovers widen to fill
  return max
}

export function fillRows(n, cols, colsMd = 2) {
  const per = (i, c) => {
    if (c <= 1) return 1
    const r = n % c
    return r && i >= n - r ? r : c
  }
  const md = Math.min(colsMd, cols)
  return (i) => ({ '--k': per(i, cols), '--k-md': per(i, md) })
}

export function FillCSS() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .sr-fill { display: flex; flex-wrap: wrap; gap: var(--g, 8px); }
      .sr-fill > .sr-cell { flex: 0 0 calc((100% - (var(--k) - 1) * var(--g, 8px)) / var(--k)); min-width: 0; box-sizing: border-box; }
      @media (max-width: 900px) { .sr-fill > .sr-cell { flex-basis: calc((100% - (var(--k-md) - 1) * var(--g, 8px)) / var(--k-md)); } }
      @media (max-width: 560px) { .sr-fill > .sr-cell { flex-basis: 100%; } }
    ` }} />
  )
}

// Cards whose parts line up across a row: each card's title sits on one
// shared row and its text on the next (CSS subgrid), so the text starts level
// however many lines a title wraps to.
//   <div className="sr-align" style={{ '--g': '32px', '--cols': 4, '--cols-md': 2 }}>
//     <div><h3 /><p /></div> ...
export function AlignCSS() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .sr-align { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); column-gap: var(--g, 32px); row-gap: var(--g, 32px); }
      .sr-align > * { display: grid; grid-row: span 2; grid-template-rows: subgrid; row-gap: 10px; min-width: 0; }
      @media (max-width: 900px) { .sr-align { grid-template-columns: repeat(var(--cols-md, 2), minmax(0, 1fr)); } }
      @media (max-width: 560px) { .sr-align { grid-template-columns: minmax(0, 1fr); } }
    ` }} />
  )
}
