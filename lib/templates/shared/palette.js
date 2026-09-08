// =========================================================
// BRAND PALETTE
//
// A client's site is built in their colors, not the template's. The template
// supplies structure, typography, and layout; the palette comes from their
// brand.
//
// Their colors are used as INPUT, not copied wholesale. A scraped site often
// carries a framework blue, a stock red, and three greys alongside the actual
// brand color, and reproducing all of that inherits their design problems. So:
// take the dominant brand color and whether their site reads light or dark,
// then compute a designed palette around those.
//
// The result is their brand, executed properly.
// =========================================================

const toRgb = (hex) => {
  const h = String(hex || '').replace('#', '')
  if (h.length !== 6) return null
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
}

const toHex = ({ r, g, b }) =>
  '#' + [r, g, b].map(n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('')

function mix(a, b, amount) {
  const ca = toRgb(a), cb = toRgb(b)
  if (!ca || !cb) return a
  return toHex({
    r: ca.r + (cb.r - ca.r) * amount,
    g: ca.g + (cb.g - ca.g) * amount,
    b: ca.b + (cb.b - ca.b) * amount,
  })
}

/** Perceived brightness 0-1. */
export function luminance(hex) {
  const c = toRgb(hex)
  if (!c) return 0.5
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255
}

/** Saturation 0-1. A brand color has some; a grey does not. */
function saturation(hex) {
  const c = toRgb(hex)
  if (!c) return 0
  const max = Math.max(c.r, c.g, c.b), min = Math.min(c.r, c.g, c.b)
  return max === 0 ? 0 : (max - min) / max
}

/** Rotate hue, for deriving a secondary that relates to the primary. */
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
  let rgb
  if (h < 60) rgb = [c2, x, 0]
  else if (h < 120) rgb = [x, c2, 0]
  else if (h < 180) rgb = [0, c2, x]
  else if (h < 240) rgb = [0, x, c2]
  else if (h < 300) rgb = [x, 0, c2]
  else rgb = [c2, 0, x]

  return toHex({ r: (rgb[0] + m) * 255, g: (rgb[1] + m) * 255, b: (rgb[2] + m) * 255 })
}

/** Whichever of black or white reads legibly on a background. */
export function readableOn(bg) {
  return luminance(bg) > 0.55 ? '#1a1a1a' : '#ffffff'
}

/**
 * Pick the brand color from scraped candidates.
 *
 * Frequency alone is unreliable: a framework blue can appear more often than
 * the actual brand color. Weight by saturation so a vivid color used twenty
 * times beats a muted one used thirty.
 */
export function pickBrandColor(candidates = []) {
  if (!candidates.length) return null

  const scored = candidates
    .map(c => {
      const hex = c.hex || c
      const sat = saturation(hex)
      const lum = luminance(hex)
      // Very dark and very light colors are rarely the brand color even when
      // saturated, and a color with no saturation never is.
      if (sat < 0.35 || lum < 0.12 || lum > 0.92) return null
      return { hex, score: (c.count || 1) * (0.4 + sat) }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)

  return scored[0]?.hex || null
}

/**
 * Does their site read light or dark?
 *
 * Framework CSS makes body background unreliable, so infer from the colors
 * present: a light site carries near-whites, a dark one near-blacks.
 */
export function detectMode(candidates = [], allColors = []) {
  const pool = allColors.length ? allColors : candidates.map(c => c.hex || c)
  let light = 0, dark = 0
  for (const hex of pool) {
    const l = luminance(hex)
    if (l > 0.85) light++
    else if (l < 0.15) dark++
  }
  // Default to light: most local service sites are, and a light site that
  // should have been dark is a milder failure than the reverse.
  return dark > light * 1.5 ? 'dark' : 'light'
}

/**
 * Build a complete, designed palette from a brand color.
 *
 * Neutrals are tinted toward the brand rather than pure grey, which is what
 * makes a site feel like it belongs to one company rather than assembled from
 * defaults.
 */
export function buildPalette({ brandColor, mode = 'light', secondary = null }) {
  const accent = brandColor || (mode === 'dark' ? '#4a9eff' : '#0851cf')
  // An analogous hue rather than a complement. True complements are often too
  // aggressive: magenta opposite lands on bright green, which fights the brand
  // instead of supporting it. A shift of about 40 degrees, darkened and slightly
  // desaturated, reads as a considered second colour in the same family.
  const sec = secondary || mix(mix(shiftHue(accent, 42), '#000000', 0.18), '#8a8a8a', 0.12)

  if (mode === 'dark') {
    const bg = mix('#0d0d0f', accent, 0.05)
    return {
      mode: 'dark',
      bg,
      bgAlt: mix(bg, accent, 0.05),
      bgLight: mix(bg, '#ffffff', 0.06),
      surface: mix(bg, '#ffffff', 0.04),
      surfaceAlt: mix(bg, accent, 0.09),

      text: mix('#ffffff', accent, 0.04),
      textDim: mix('#ffffff', bg, 0.35),
      textMuted: mix('#ffffff', bg, 0.58),

      accent,
      accentDim: mix(accent, '#000000', 0.28),
      accentLight: mix(accent, '#ffffff', 0.32),
      accentGlow: mix(bg, accent, 0.16),

      secondary: sec,
      secondaryLight: mix(sec, '#ffffff', 0.3),

      success: '#5fb37a',
      urgent: '#d4685c',
      warning: '#d9a441',

      border: mix(bg, '#ffffff', 0.14),
      borderLight: mix(bg, '#ffffff', 0.07),

      onAccent: readableOn(accent),
    }
  }

  const bg = mix('#ffffff', accent, 0.02)
  return {
    mode: 'light',
    bg,
    bgAlt: mix('#ffffff', accent, 0.06),
    bgLight: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: mix('#ffffff', accent, 0.09),

    text: mix('#16161a', accent, 0.08),
    textDim: mix('#5a5a63', accent, 0.06),
    textMuted: mix('#8e8e99', accent, 0.05),

    accent,
    accentDim: mix(accent, '#000000', 0.22),
    accentLight: mix(accent, '#ffffff', 0.42),
    accentGlow: mix('#ffffff', accent, 0.12),

    secondary: sec,
    secondaryLight: mix(sec, '#ffffff', 0.4),

    success: '#2f8f52',
    urgent: '#c2452f',
    warning: '#b8801f',

    border: mix('#e2e2e8', accent, 0.14),
    borderLight: mix('#eeeef2', accent, 0.08),

    onAccent: readableOn(accent),
  }
}
