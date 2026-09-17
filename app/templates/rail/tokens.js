// RAIL: the way to act never leaves the screen.
//
// Approved September 2026 from the original Direction D, rebuilt after the
// mocks (public/concepts/g*.html). There is no top bar. The logo, the menu,
// the phone number and both buttons live in a rail pinned down the right
// edge, and the page scrolls beside it on a dark ground. On an inner page the
// rail also carries a contents list, because an inner page is read rather
// than browsed.
//
// Structure differs from every other family, not only colour:
// - the navigation is a column down the right, not a bar across the top
// - the content runs in three bands — the work, the people, the answers —
//   rather than a list of equal sections
// - the crew is a real section high on the home page, with names and
//   certifications: RAIL is the family for a business whose people are the
//   argument
// - a service page runs its prose beside a sticky card of facts, its signs in
//   two columns and its visit across the page
// - an area page opens on the town set as large as the page will carry it; a
//   service-in-a-town page opens on a solid plate of the brand colour, so no
//   two page types open the same way
//
// The first dark family. Every ground is dark, so the inverse roles are the
// accent plate rather than a black band, and applyBrand shifts a client's
// colour upwards in lightness until it reads on these grounds.
//
// Principles kept from every family: conventional skeleton, WCAG AA, body
// 17.5px, lines under 70 characters, real photographs or none, nothing
// invented.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const railTokens = {
  colors: defineColors('rail', {
    bg: '#0d1114',
    bgAlt: '#151d22',
    bgRaised: '#1a2229',
    surface: '#1a2229',
    surfaceAlt: '#202a32',

    text: '#f1f3f2',
    textDim: '#a6b0b8',
    textMuted: '#7d878f',

    accent: '#f0a132',        // replaced by the client's brand colour
    accentDim: '#c8801f',
    accentLight: '#f6c27a',
    accentGlow: '#241c12',
    onAccent: '#1a1305',
    secondary: '#f1f3f2',
    secondaryLight: '#a6b0b8',

    border: '#28313a',
    borderLight: '#202930',

    // On a dark family the inverse band is the accent plate: the area page's
    // masthead rule, the combo page's opening, the closing band.
    inverseBg: '#f0a132',
    inverseBgAlt: '#e09324',
    inverseText: '#1a1305',
    inverseTextDim: '#4f3c12',
    inverseBorder: '#c8801f',

    success: '#5cb98a',
    urgent: '#f2775c',
    warning: '#e3ad3a',

    logoPlate: '#ffffff',
  }),

  ground: { base: '#0d1114', alt: '#151d22', raised: '#1a2229', tint: 0.02 },

  fonts: {
    // One family across the whole page. RAIL's character is the rail and the
    // dark ground, not a display face fighting a body face, and Manrope's
    // heavy weights carry a heading on their own.
    display: "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, monospace',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap',

  type: {
    xs: '12.5px',
    sm: '15px',
    base: '17.5px',
    lg: '20px',
    xl: '26px',
    display: 'clamp(26px, 2.9vw, 38px)',
    hero: 'clamp(36px, 4.3vw, 60px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  // Softer than the rest of the set. On a dark ground a hard corner reads as
  // a hole; a 10px radius reads as a panel.
  radius: { none: '0', sm: '8px', md: '10px', lg: '14px', full: '9999px' },
}
