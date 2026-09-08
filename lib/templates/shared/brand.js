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

import { buildPalette, pickBrandColor } from './palette.js'

/**
 * Build a client's palette and merge it into the template's tokens.
 *
 * The template supplies structure, typography, spacing, and layout. The colors
 * come from the client's brand. A site rendered in the template's own palette
 * reads as a template with their name dropped in, which is exactly what a
 * concept has to avoid and what a real client should never receive either.
 *
 * Their colors are input rather than copy: a scraped site typically carries a
 * framework blue and a stock red alongside the actual brand color, so the
 * dominant brand color and the light or dark reading are taken, and a designed
 * palette is computed around them.
 */
export function applyBrand(baseTokens, brand = {}) {
  const brandColor = brand.accent || pickBrandColor(brand.palette || [])
  if (!brandColor) return baseTokens

  const palette = buildPalette({
    brandColor,
    mode: brand.mode || 'light',
    secondary: brand.secondary || null,
  })

  return {
    ...baseTokens,
    colors: {
      ...baseTokens.colors,
      ...palette,
    },
  }
}
