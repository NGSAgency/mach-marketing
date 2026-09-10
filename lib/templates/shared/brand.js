import { withDerived, applyPalette } from './colors.js'
import { buildPalette, pickBrandColor } from './palette.js'

// Extract brand overrides from Next.js searchParams
// Used by every template page to inject client's colors + logo
export async function getBrandOverrides(searchParams) {
  const params = await (searchParams || Promise.resolve({}))
  return {
    accent: params.accent || null,
    logo: params.logo || null,
    secondary: params.secondary || null,
    // ?mode=light or ?mode=dark renders the preview through a full palette
    mode: params.mode === 'light' || params.mode === 'dark' ? params.mode : null,
  }
}

/** The brand inputs a renderer passes to applyBrand, from a site or concept config. */
export function brandFrom(c) {
  const b = c?.brand || {}
  return {
    accent: b.primary_accent || null,
    secondary: b.secondary || null,
    logo: b.logo_url || null,
    // Concepts ask for a full palette (derive). Client configs don't, so client
    // sites keep the tint below until that is chosen for them deliberately.
    derive: b.derive === true,
    // An explicit light or dark; without one a derived palette keeps the
    // family's own lightness.
    mode: b.mode === 'light' || b.mode === 'dark' ? b.mode : null,
    palette: Array.isArray(b.palette) ? b.palette : [],
  }
}

/** Hex to RGB. */
function toRgb(hex) {
  const h = String(hex || '').replace('#', '')
  if (h.length !== 6) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

const toHex = ({ r, g, b }) =>
  '#' + [r, g, b].map(n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('')

/** Mix two colors. amount 0 returns a, 1 returns b. */
function mix(a, b, amount) {
  const ca = toRgb(a)
  const cb = toRgb(b)
  if (!ca || !cb) return a
  return toHex({
    r: ca.r + (cb.r - ca.r) * amount,
    g: ca.g + (cb.g - ca.g) * amount,
    b: ca.b + (cb.b - ca.b) * amount,
  })
}

/** Perceived brightness, for deciding what text sits legibly on a color. */
function luminance(hex) {
  const c = toRgb(hex)
  if (!c) return 0.5
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255
}

/**
 * Apply a client's brand color across the palette rather than to a single
 * accent.
 *
 * A concept in someone else's colors reads as a template with the client's name
 * dropped in. Deriving tints and shades from their brand color means the whole
 * page belongs to them, while the template's structure and typography still
 * carry the design.
 *
 * Backgrounds are tinted rather than replaced: a page in full brand color is
 * unreadable, and a subtle tint reads as intentional.
 */
export function applyBrand(baseTokens, brand = {}) {
  // A derived palette (concepts) or an explicit mode builds the page in the
  // client's palette: every colour role comes from their brand, none from the
  // template. applyPalette refuses a palette that leaves any role unset, so the
  // two can never be mixed.
  if (brand.derive || brand.mode) {
    const brandColor = brand.accent || pickBrandColor(brand.palette || []) || baseTokens.colors.accent
    const mode = brand.mode || (luminance(baseTokens.colors.bg) < 0.5 ? 'dark' : 'light')
    return applyPalette(baseTokens, buildPalette({ brandColor, mode, secondary: brand.secondary }))
  }

  // Without one, the brand tints the template's own palette. This is what
  // client sites render today.
  if (!brand.accent && !brand.secondary) return baseTokens

  const accent = brand.accent || baseTokens.colors.accent
  const base = baseTokens.colors
  const isDarkTemplate = luminance(base.bg) < 0.5

  const derived = {
    accent,
    accentDim: mix(accent, isDarkTemplate ? '#000000' : '#000000', 0.25),
    accentLight: mix(accent, '#ffffff', isDarkTemplate ? 0.35 : 0.25),
    accentGlow: isDarkTemplate
      ? mix(base.bg, accent, 0.14)
      : mix('#ffffff', accent, 0.10),

    // Secondary defaults to the brand color so calls to action stay on brand
    secondary: brand.secondary || accent,
    secondaryLight: mix(brand.secondary || accent, '#ffffff', 0.3),

    // Surfaces pick up a trace of the brand so the page feels theirs without
    // becoming unreadable
    bgAlt: mix(base.bgAlt, accent, isDarkTemplate ? 0.06 : 0.04),
    surfaceAlt: mix(base.surfaceAlt || base.surface, accent, isDarkTemplate ? 0.08 : 0.05),
    border: mix(base.border, accent, 0.12),
  }

  // Scrims, text on photos and translucent headers follow the tinted colours.
  return {
    ...baseTokens,
    colors: withDerived({ ...base, ...derived }),
  }
}
