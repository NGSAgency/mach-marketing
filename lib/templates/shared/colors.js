// Shared colour roles for every template family.
//
// Every family defines exactly these roles, with the same meaning, and every
// renderer and shared component reads only these names. A palette (a client's
// brand, a light or dark mode) is therefore all-or-nothing: it either supplies
// every role or it doesn't apply.
//
// Why this exists: the palette attempt of 2026-09-08 was merged over each
// family's own token names with a spread. Families that used the palette's
// names were fully recoloured; AXIS, which named its surfaces differently, kept
// 9 of its 19 colours while its text flipped, which rendered cream text on
// near-white cards. Text and the background behind it must always come from the
// same source. See CONTENT_ROADMAP.md, "Palette failure: diagnosed".
//
// Serene is the reference family for these names.

// ---- base roles: every family (and any palette) must set all of these ----
export const BASE_ROLES = [
  // Backgrounds, in normal text contexts
  'bg',            // page
  'bgAlt',         // alternating full-width sections
  'bgRaised',      // a step away from bg: lighter in dark families, white in light ones
  'surface',       // cards, tiles, chips, form panels
  'surfaceAlt',    // secondary surfaces, image placeholders

  // Text on any of the backgrounds above
  'text',
  'textDim',
  'textMuted',

  // Brand
  'accent',
  'accentDim',     // hover / pressed
  'accentLight',
  'accentGlow',    // soft accent-tinted fill; text on it uses `text`
  'onAccent',      // text on an accent or secondary fill
  'secondary',
  'secondaryLight',

  // Lines
  'border',
  'borderLight',

  // Inverse: a section in the opposite lightness (AXIS black bands, BOLT light
  // bands). Text on inverse backgrounds uses the inverse text roles, never `text`.
  'inverseBg',
  'inverseBgAlt',
  'inverseText',
  'inverseTextDim',
  'inverseBorder',

  // Status
  'success',
  'urgent',
  'warning',

  // Fixed white plate behind a client logo, so artwork of either lightness is
  // visible. Deliberately not palette-driven.
  'logoPlate',
]

// ---- derived roles: computed from the base roles, never set directly ----
export const DERIVED_ROLES = [
  'overlayFaint',     // image scrim stops, top to bottom of a gradient
  'overlayLight',
  'overlayStrong',
  'textOnImage',      // text sitting on a scrimmed photo
  'textOnImageDim',
  'bgTranslucent',    // sticky headers over content
]

export const ALL_ROLES = [...BASE_ROLES, ...DERIVED_ROLES]

function parse(color) {
  const s = String(color || '').trim()
  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) h = h.split('').map(c => c + c).join('')
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
  }
  const rgb = s.match(/^rgba?\(([^)]+)\)$/i)
  if (rgb) {
    const [r, g, b] = rgb[1].split(',').map(v => parseFloat(v))
    return { r, g, b }
  }
  return null
}

function relativeLuminance(color) {
  const c = parse(color)
  if (!c) return 0.5
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b)
}

const rgba = (color, alpha) => {
  const c = parse(color)
  return c ? `rgba(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${alpha})` : color
}

/**
 * Roles that follow from the base roles. Recomputed whenever base roles change
 * (a brand tint, a palette), so they can never drift from the colours they
 * depend on.
 *
 * Photos are always scrimmed with the darker of the page's two main tones and
 * carry the lighter one as text. In a dark family that is the page background
 * under the page's text colour, exactly as Serene was designed. In a light
 * palette the same pair flips roles, so text on a photo stays light on dark
 * instead of turning dark on a fixed dark overlay.
 */
export function deriveColors(base) {
  const bgIsDarker = relativeLuminance(base.bg) <= relativeLuminance(base.text)
  const dark = bgIsDarker ? base.bg : base.text
  const light = bgIsDarker ? base.text : base.bg
  return {
    overlayFaint: rgba(dark, 0.05),
    overlayLight: rgba(dark, 0.15),
    overlayStrong: rgba(dark, 0.88),
    textOnImage: light,
    textOnImageDim: rgba(light, 0.72),
    bgTranslucent: rgba(base.bg, 0.92),
  }
}

/**
 * A family's colours: checks that exactly the base roles are present, then adds
 * the derived ones. Throws at import, so a missing or misnamed role fails the
 * build instead of rendering as a transparent or template-coloured gap.
 */
export function defineColors(family, colors) {
  const keys = Object.keys(colors)
  const missing = BASE_ROLES.filter(r => !(r in colors))
  const unknown = keys.filter(k => !BASE_ROLES.includes(k))
  if (missing.length || unknown.length) {
    throw new Error(
      `${family} colours do not match the shared roles.` +
      (missing.length ? ` Missing: ${missing.join(', ')}.` : '') +
      (unknown.length ? ` Not a role: ${unknown.join(', ')}.` : '')
    )
  }
  return { ...colors, ...deriveColors(colors) }
}

/** Recompute derived roles after base roles have been changed. */
export function withDerived(colors) {
  return { ...colors, ...deriveColors(colors) }
}

/**
 * Replace a family's colours with a complete palette. Refuses a palette that
 * leaves any base role unset, which is the failure this module exists to
 * prevent: some colours from the palette, the rest from the template.
 */
export function applyPalette(baseTokens, palette) {
  const missing = BASE_ROLES.filter(r => palette[r] == null)
  if (missing.length) {
    throw new Error(`Palette is incomplete, refusing to mix it with template colours. Missing: ${missing.join(', ')}`)
  }
  const colors = Object.fromEntries(BASE_ROLES.map(r => [r, palette[r]]))
  return { ...baseTokens, colors: withDerived(colors) }
}
