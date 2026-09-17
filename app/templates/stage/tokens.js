// STAGE: the business you can see the whole time.
//
// Approved September 2026, after Spec Sheet was scrapped. The page is two
// permanent halves: the content scrolls on the left, and a fixed panel on the
// right carries the business — its name, its menu, its rating, its phone
// number — for the whole visit. The panel is not decoration: as you pass each
// chapter it shows the facts belonging to what you are reading, so the two
// halves are always a pair.
//
// Structure differs from every other family, not only colour:
// - the screen is two halves, one of which never moves
// - the left is six numbered chapters, each on its own ground
// - the right holds the menu, a photograph or a plate of the client's colour,
//   a board of facts that changes with the chapter, and the two ways to act
// - inner pages swap the chapter rail for a contents list of that page
// - a service page, an area page and a service-in-a-town page each have a
//   device the others do not: a dark band of steps, a colour plate, a stamp
//
// Principles kept from every family: conventional skeleton, WCAG AA, body
// 18px, lines under 70 characters, real photographs or none, nothing invented.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const stageTokens = {
  colors: defineColors('stage', {
    bg: '#faf8f4',
    bgAlt: '#f1ede5',
    bgRaised: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f1ede5',

    text: '#14201c',
    textDim: '#4c5651',
    textMuted: '#6b7671',

    accent: '#1d6f5c',        // replaced by the client's brand colour
    accentDim: '#155346',
    accentLight: '#6aa79a',
    accentGlow: '#e6efec',
    onAccent: '#ffffff',
    secondary: '#14201c',
    secondaryLight: '#4b5b55',

    border: '#ded8cd',
    borderLight: '#ebe6dc',

    // The panel is this colour for the whole visit, so the inverse roles do
    // more work here than in any other family.
    inverseBg: '#14201c',
    inverseBgAlt: '#1b2a25',
    inverseText: '#eceade',
    inverseTextDim: '#a8b3ae',
    inverseBorder: '#2b3b35',

    success: '#1a6b4c',
    urgent: '#a8341f',
    warning: '#7f5c12',

    logoPlate: '#ffffff',
  }),

  ground: { base: '#faf8f4', alt: '#f1ede5', raised: '#ffffff', tint: 0.014 },

  fonts: {
    // A grotesk with real character in the headings, and its plain sister for
    // reading. Nothing else in the set uses either.
    display: "'Schibsted Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Source Sans 3', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, monospace',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Source+Sans+3:wght@400;600;700&display=swap',

  type: {
    xs: '13px',
    sm: '15px',
    base: '18px',
    lg: '21px',
    xl: '27px',
    display: 'clamp(28px, 3.2vw, 46px)',
    hero: 'clamp(34px, 4.2vw, 58px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  // Square, but not aggressively so: 2px keeps the panel's buttons from
  // looking like a wireframe without softening the page.
  radius: { none: '0', sm: '2px', md: '2px', lg: '2px', full: '9999px' },
}
