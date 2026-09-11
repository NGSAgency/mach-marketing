// Brand palette: a complete set of colour roles built from a brand colour.
//
// The template supplies structure, type and layout; the palette makes the page
// theirs. Their scraped colours are input, not copy: a page-builder site carries
// a framework blue and a stock red alongside the real brand colour, so the
// dominant brand colour and whether their site reads light or dark are taken,
// and a palette is designed around them.
//
// Every role in lib/templates/shared/colors.js is set, never a subset. Setting
// some of a family's colours and leaving the rest to the template is what
// produced the white on white in September 2026.
//
// Legibility is guaranteed by rule rather than by tuning:
// - text, textDim and textMuted are pushed until they meet their contrast
//   targets against every background they can sit on
// - the accent is used as text (eyebrows, links, numerals), so a brand colour
//   that doesn't reach 3:1 against the page is shifted in lightness, keeping
//   its hue and saturation, until it does. Fills use the same shifted colour, so a button and
//   the link beside it always match
// - onAccent is whichever of near-black or white reads better on the accent
// - inverse bands get their own text, checked against the inverse backgrounds

// ---- colour maths ---------------------------------------------------------

const toRgb = (hex) => {
  const h = String(hex || '').replace('#', '')
  if (h.length !== 6) return null
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
}
const toHex = ({ r, g, b }) =>
  '#' + [r, g, b].map(n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('')

export function mix(a, b, amount) {
  const ca = toRgb(a), cb = toRgb(b)
  if (!ca || !cb) return a
  return toHex({ r: ca.r + (cb.r - ca.r) * amount, g: ca.g + (cb.g - ca.g) * amount, b: ca.b + (cb.b - ca.b) * amount })
}

function relLum(hex) {
  const c = toRgb(hex)
  if (!c) return 0.5
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b)
}

export function contrast(a, b) {
  const x = relLum(a), y = relLum(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

/** Perceived brightness 0-1, for scoring scraped candidates. */
export function luminance(hex) {
  const c = toRgb(hex)
  if (!c) return 0.5
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255
}

function saturation(hex) {
  const c = toRgb(hex)
  if (!c) return 0
  const max = Math.max(c.r, c.g, c.b), min = Math.min(c.r, c.g, c.b)
  return max === 0 ? 0 : (max - min) / max
}

function shiftHue(hex, degrees) {
  const c = toRgb(hex)
  if (!c) return hex
  let { r, g, b } = c
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
  }
  h = (h + degrees + 360) % 360
  const c2 = (1 - Math.abs(2 * l - 1)) * s
  const x = c2 * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c2 / 2
  const rgb = h < 60 ? [c2, x, 0] : h < 120 ? [x, c2, 0] : h < 180 ? [0, c2, x] : h < 240 ? [0, x, c2] : h < 300 ? [x, 0, c2] : [c2, 0, x]
  return toHex({ r: (rgb[0] + m) * 255, g: (rgb[1] + m) * 255, b: (rgb[2] + m) * 255 })
}

/**
 * Move `color` toward `toward` in small steps until it reaches `target`
 * contrast against every colour in `against`. Returns the first colour that
 * passes, or `toward` itself if none short of it does.
 */
export function pushUntil(color, toward, against, target) {
  for (let t = 0; t <= 1.0001; t += 0.02) {
    const c = mix(color, toward, t)
    if (against.every(bg => contrast(c, bg) >= target)) return c
  }
  return toward
}

function toHsl(hex) {
  const c = toRgb(hex)
  let r = c.r / 255, g = c.g / 255, b = c.b / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h *= 60
  }
  return { h, s, l }
}

function fromHsl({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const rgb = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  return toHex({ r: (rgb[0] + m) * 255, g: (rgb[1] + m) * 255, b: (rgb[2] + m) * 255 })
}

/**
 * Shift a brand colour's lightness, keeping hue and saturation, until it meets
 * `target` against every colour in `against`. Mixing with black or white would
 * also get there, but greys the colour out on the way: navy turns slate.
 */
export function shiftLightnessUntil(color, darker, against, target) {
  const hsl = toHsl(color)
  for (let i = 0; i <= 50; i++) {
    const l = darker ? hsl.l * (1 - i / 50) : hsl.l + (1 - hsl.l) * (i / 50)
    const c = fromHsl({ ...hsl, l })
    if (against.every(bg => contrast(c, bg) >= target)) return c
  }
  return darker ? '#000000' : '#ffffff'
}

// ---- scraping helpers -----------------------------------------------------

/**
 * Pick the brand colour from scraped candidates. Frequency alone is unreliable,
 * since a framework blue can appear more often than the real brand colour, so
 * weight by saturation and ignore near-black, near-white and grey.
 */
export function pickBrandColor(candidates = []) {
  if (!candidates.length) return null
  const scored = candidates
    .map(c => {
      const hex = c.hex || c
      const sat = saturation(hex)
      const lum = luminance(hex)
      if (sat < 0.35 || lum < 0.12 || lum > 0.92) return null
      return { hex, score: (c.count || 1) * (0.4 + sat) }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
  return scored[0]?.hex || null
}

// ---- the palette ----------------------------------------------------------

export const TARGETS = {
  text: 7,          // body copy
  textDim: 4.5,     // secondary copy
  textMuted: 3.5,   // captions, meta, small labels
  accent: 3,        // accent as text: eyebrows, links, numerals
}

/**
 * Build every colour role from a brand colour and a mode.
 *
 * Neutrals are tinted toward the brand rather than pure grey, which is what
 * makes a site feel like one company's rather than assembled from defaults.
 */
export function buildPalette({ brandColor, mode = 'light', secondary = null, ground = null }) {
  const dark = mode === 'dark'
  const brand = /^#[0-9a-f]{6}$/i.test(brandColor || '') ? brandColor : (dark ? '#4a9eff' : '#0851cf')

  // Backgrounds first; everything else is checked against them. A family can
  // set its own light ground (Hearth's cream, Terrace's stone) so its
  // character survives the client's palette; the brand still tints it, and
  // every text role below is still pushed to its target against it.
  const g = !dark && ground && /^#[0-9a-f]{6}$/i.test(ground.base || '') ? ground : null
  const tint = g ? (g.tint ?? 0.03) : 0
  const bg = dark ? mix('#0d0d0f', brand, 0.05) : g ? mix(g.base, brand, tint) : mix('#ffffff', brand, 0.02)
  const bgAlt = dark ? mix(bg, brand, 0.05) : g ? mix(g.alt || g.base, brand, tint * 1.6) : mix('#ffffff', brand, 0.06)
  const bgRaised = dark ? mix(bg, '#ffffff', 0.06) : g ? (g.raised || '#ffffff') : '#ffffff'
  const surface = dark ? mix(bg, '#ffffff', 0.04) : g ? (g.raised || '#ffffff') : '#ffffff'
  const surfaceAlt = dark ? mix(bg, brand, 0.09) : g ? mix(g.alt || g.base, brand, tint * 2.6) : mix('#ffffff', brand, 0.09)
  const grounds = [bg, bgAlt, bgRaised, surface, surfaceAlt]

  const ink = dark ? '#ffffff' : '#000000'
  const text = pushUntil(dark ? mix('#ffffff', brand, 0.04) : mix('#16161a', brand, 0.08), ink, grounds, TARGETS.text)
  const textDim = pushUntil(dark ? mix('#ffffff', bg, 0.35) : mix('#5a5a63', brand, 0.06), ink, grounds, TARGETS.textDim)
  const textMuted = pushUntil(dark ? mix('#ffffff', bg, 0.55) : mix('#8e8e99', brand, 0.05), ink, grounds, TARGETS.textMuted)

  // Accent-tinted chips and pills, which carry accent text.
  const accentGlow = dark ? mix(bg, brand, 0.16) : mix('#ffffff', brand, 0.12)

  // The accent doubles as text, so it must read on every ground, including its
  // own tinted chips. A brand colour that doesn't is shifted in lightness,
  // keeping its hue and saturation.
  let accent = shiftLightnessUntil(brand, !dark, [...grounds, accentGlow], TARGETS.accent)
  let onAccent = contrast('#ffffff', accent) >= contrast('#141416', accent) ? '#ffffff' : '#141416'
  // Button labels need 4.5:1. A mid-tone brand colour (hot pink, orange) can
  // fall just short with either label colour; then the label takes the colour
  // that moves the accent further from the page (white in a light palette,
  // near-black in a dark one) and the accent shifts until the label passes.
  // That shift only raises the accent's contrast with the page.
  if (contrast(onAccent, accent) < 4.5) {
    onAccent = dark ? '#141416' : '#ffffff'
    accent = shiftLightnessUntil(accent, !dark, [onAccent], 4.5)
  }

  // An analogous hue rather than a complement: complements fight the brand.
  const secRaw = secondary && /^#[0-9a-f]{6}$/i.test(secondary)
    ? secondary
    : mix(mix(shiftHue(accent, 42), '#000000', 0.18), '#8a8a8a', 0.12)
  const secondaryColor = shiftLightnessUntil(secRaw, !dark, grounds, TARGETS.accent)

  // Inverse bands take the text colour as their background.
  const inverseBg = text
  const inverseBgAlt = mix(text, bg, 0.1)
  const invGrounds = [inverseBg, inverseBgAlt]
  const inverseText = pushUntil(bg, dark ? '#000000' : '#ffffff', invGrounds, TARGETS.text)
  const inverseTextDim = pushUntil(mix(bg, text, 0.35), dark ? '#000000' : '#ffffff', invGrounds, TARGETS.textDim)

  return {
    bg, bgAlt, bgRaised, surface, surfaceAlt,
    text, textDim, textMuted,
    accent,
    accentDim: mix(accent, '#000000', dark ? 0.28 : 0.22),
    accentLight: mix(accent, '#ffffff', dark ? 0.32 : 0.42),
    accentGlow,
    onAccent,
    secondary: secondaryColor,
    secondaryLight: mix(secondaryColor, '#ffffff', dark ? 0.3 : 0.4),
    border: dark ? mix(bg, '#ffffff', 0.14) : mix('#e2e2e8', brand, 0.14),
    borderLight: dark ? mix(bg, '#ffffff', 0.07) : mix('#eeeef2', brand, 0.08),
    inverseBg, inverseBgAlt, inverseText, inverseTextDim,
    inverseBorder: mix(text, bg, 0.2),
    success: dark ? '#5fb37a' : '#2f8f52',
    urgent: dark ? '#d4685c' : '#c2452f',
    warning: dark ? '#d9a441' : '#b8801f',
    logoPlate: '#ffffff',
  }
}
