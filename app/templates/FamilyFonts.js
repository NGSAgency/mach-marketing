import { sereneTokens } from './serene/tokens.js'
import { crewTokens } from './crew/tokens.js'
import { hearthTokens } from './hearth/tokens.js'
import { levelTokens } from './level/tokens.js'

// Each family's typefaces. The template demo pages always loaded these, but
// client sites, previews and concepts didn't, so every family rendered in its
// fallback fonts (Serene's Cormorant came out as Times New Roman).
const HREFS = {
  serene: sereneTokens.fontsHref,
  crew: crewTokens.fontsHref,
  hearth: hearthTokens.fontsHref,
  level: levelTokens.fontsHref,
}

/**
 * Stylesheet links for the given families. React hoists them into <head> and
 * drops duplicates, so a renderer that also links its own fonts is harmless.
 */
export default function FamilyFonts({ families = [] }) {
  const hrefs = [...new Set(families.map(f => HREFS[f]).filter(Boolean))]
  if (hrefs.length === 0) return null
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {hrefs.map(href => <link key={href} rel="stylesheet" href={href} precedence="default" />)}
    </>
  )
}
