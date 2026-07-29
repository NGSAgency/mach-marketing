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

// Apply brand overrides to a base tokens object
export function applyBrand(baseTokens, brand) {
  if (!brand.accent && !brand.secondary) return baseTokens
  return {
    ...baseTokens,
    colors: {
      ...baseTokens.colors,
      accent: brand.accent || baseTokens.colors.accent,
      secondary: brand.secondary || baseTokens.colors.secondary,
    }
  }
}
