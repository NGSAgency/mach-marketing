// HEARTH: the established family firm.
//
// Archetype: Heritage Craft (Design Directions brief, 2026-09-11). The trade
// business whose strongest selling point is how long it has been trusted
// locally: warm paper ground, a sturdy slab serif, ruled lines, a founding-year
// seal. Seen on Wentworth Studio, Keith Zars Pools, Pimlico Plumbers.
//
// Structure differs from CREW, not only colour:
// - letterhead header: large phone number with hours, ruled menu bar beneath
// - hero text on the paper ground beside a framed photo (never text on a photo)
// - services as a ruled index, like a price board, rather than photo cards
// - the company's story near the top; one featured review; areas as a directory
// - a service "ticket" beside inner-page copy; footer in the client's colour
//
// Principles kept from every family: conventional skeleton (logo left, phone
// and button right, a hero naming the service and the town), WCAG AA, body
// 18px, lines under 70 characters, real photos or none, nothing invented.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const hearthTokens = {
  colors: defineColors('hearth', {
    bg: '#f6f1e7',            // paper
    bgAlt: '#ede4d3',
    bgRaised: '#fffdf8',
    surface: '#fffdf8',
    surfaceAlt: '#efe7d8',

    text: '#1d252c',          // ink
    textDim: '#46505a',
    textMuted: '#5c646e',

    accent: '#7a2e1f',        // oxblood livery; replaced by the client's brand
    accentDim: '#5e2217',
    accentLight: '#a4553f',
    accentGlow: '#f3e3dc',
    onAccent: '#fffaf2',
    secondary: '#86601d',     // brass, for rules and the seal
    secondaryLight: '#c9a45a',

    border: '#d6c9b2',
    borderLight: '#e5dac8',

    inverseBg: '#1d252c',
    inverseBgAlt: '#262f37',
    inverseText: '#f6f1e7',
    inverseTextDim: '#bdb6a9',
    inverseBorder: '#3a434b',

    success: '#2d6f3f',
    urgent: '#a8322a',
    warning: '#86601d',

    logoPlate: '#ffffff',
  }),

  // The paper ground a client's palette is built on (concepts), so a Hearth
  // concept stays warm in anyone's colours.
  ground: { base: '#f6f1e7', alt: '#ede4d3', raised: '#fffdf8', tint: 0.015 },

  fonts: {
    // A slab serif: sturdy, sign-painted, established. Fit to the category
    // matters more than style (Doyle & Bottomley 2004).
    display: "'Zilla Slab', Rockwell, 'Roboto Slab', Georgia, serif",
    body: "'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, monospace',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap',

  type: {
    xs: '13px',
    sm: '15px',
    base: '18px',
    lg: '22px',
    xl: '32px',
    display: 'clamp(32px, 4.4vw, 56px)',
    hero: 'clamp(40px, 6.2vw, 84px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  radius: { none: '0', sm: '3px', md: '4px', lg: '6px', full: '9999px' },
}
