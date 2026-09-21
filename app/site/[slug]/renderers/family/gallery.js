// How many of a client's photographs each family's gallery shows, and in what
// arrangement, for any number they have.
//
// The mock had six. Real clients have two, or five, or twenty. Every rule here
// has the same constraint: no photograph left alone at the end of a row, and
// no hole in a grid. So each family shows the largest count its layout fills
// cleanly, up to a limit that keeps a home-page section a section. Plain
// functions, no JSX, so they can be checked without rendering a page.

const MIN = 2 // one photograph is not a gallery

/** CREW: the latest job large, two beside it, then full rows of three. */
export function crewPlan(n) {
  if (n < MIN) return null
  if (n === 2) return { mode: 'pair', count: 2 }
  const count = 3 + Math.floor((Math.min(n, 9) - 3) / 3) * 3
  return { mode: 'feature', count }
}

/** HEARTH: prints in threes, the middle one hung lower; twos when that fits. */
export function hearthPlan(n) {
  if (n < MIN) return null
  if (n === 2 || n === 4) return { cols: 2, count: n, stagger: false }
  return { cols: 3, count: Math.min(Math.floor(n / 3) * 3, 6), stagger: true }
}

/**
 * LEVEL: a bento of up to six, one arrangement per count. Each tile is
 * [column start, column end, row start, row end] on a four-column grid.
 */
const LEVEL = {
  2: { rows: 2, tiles: [[1, 3, 1, 3], [3, 5, 1, 3]] },
  3: { rows: 2, tiles: [[1, 3, 1, 3], [3, 5, 1, 2], [3, 5, 2, 3]] },
  4: { rows: 2, tiles: [[1, 3, 1, 3], [3, 5, 1, 2], [3, 4, 2, 3], [4, 5, 2, 3]] },
  5: { rows: 3, tiles: [[1, 3, 1, 3], [3, 5, 1, 2], [3, 4, 2, 3], [4, 5, 2, 3], [1, 5, 3, 4]] },
  6: { rows: 3, tiles: [[1, 3, 1, 3], [3, 5, 1, 2], [3, 4, 2, 3], [4, 5, 2, 3], [1, 3, 3, 4], [3, 5, 3, 4]] },
}
export function levelPlan(n) {
  if (n < MIN) return null
  const count = Math.min(n, 6)
  return { count, ...LEVEL[count] }
}

/** CENTRE: one large photograph and a strip of the rest; two side by side. */
export function centrePlan(n) {
  if (n < MIN) return null
  if (n === 2) return { mode: 'pair', count: 2 }
  const count = Math.min(n, 6)
  return { mode: 'hero', count, strip: count - 1 }
}

/** BOOKING: one row that scrolls, so any count fits; ten keeps it a row. */
export function bookingPlan(n) {
  if (n < MIN) return null
  return { count: Math.min(n, 10) }
}

/** STAGE: a contact sheet in threes, or twos when that fits. */
export function stagePlan(n) {
  if (n < MIN) return null
  if (n === 2 || n === 4) return { cols: 2, count: n }
  return { cols: 3, count: Math.min(Math.floor(n / 3) * 3, 9) }
}

/**
 * SERENE: an editorial column of wide photographs and pairs, alternating.
 * A pair with one photograph in it becomes a wide one.
 */
export function serenePlan(n) {
  if (n < MIN) return null
  const count = Math.min(n, 6)
  const groups = []
  let i = 0
  let wide = true
  while (i < count) {
    if (wide || count - i === 1) { groups.push([i]); i += 1 }
    else { groups.push([i, i + 1]); i += 2 }
    wide = !wide
  }
  return { count, groups }
}
