// Extract brand overrides from Next.js searchParams
// Used by every template page to inject client's colors + logo
export async function getBrandOverrides(searchParams) {
  const params = await (searchParams || Promise.resolve({}))
  return {
    accent: params.accent || null,
    logo: params.logo || null,
    secondary: params.secondary || null,
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
export function applyBrand(baseTokens, brand) {
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

  return {
    ...baseTokens,
    colors: { ...base, ...derived },
  }
}
