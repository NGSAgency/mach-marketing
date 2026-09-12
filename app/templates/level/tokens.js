// LEVEL: the modern service company.
//
// Archetype: Product-Clean (Design Directions brief, 2026-09-11). The business
// that wants to feel easy to deal with: one grotesque typeface, an off-white
// ground, the client's colour as the only accent, rounded tiles and pill
// buttons. Seen on Dandelion, Jetson, Housekeep, Resi.
//
// Structure differs from CREW and Hearth, not only colour:
// - the heading is centred, with a "what do you need?" picker under it and the
//   photo as a wide band BELOW the hero (CREW puts text on the photo, Hearth
//   beside it)
// - services as mixed-size tiles, one large and the rest small
// - the process runs across the page as a numbered rail, not down it
// - inner pages have a sticky "on this page" rail and a full-width quote band
//   between sections, instead of a card beside the copy
// - the closing call panel sits inside the top of the footer
//
// Principles kept from every family: conventional skeleton (logo left, phone
// and button right, a hero naming the service and the town), WCAG AA, body
// 18px, lines under 70 characters, real photos or none, nothing invented.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const levelTokens = {
  colors: defineColors('level', {
    bg: '#fafaf7',
    bgAlt: '#f0f1ef',
    bgRaised: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#eef0f3',

    text: '#111418',
    textDim: '#414852',
    textMuted: '#59616b',

    accent: '#2f4bd8',        // replaced by the client's brand colour
    accentDim: '#2339a8',
    accentLight: '#7189e8',
    accentGlow: '#e8ecfb',
    onAccent: '#ffffff',
    secondary: '#0f7a63',
    secondaryLight: '#5cb7a3',

    border: '#d9dde2',
    borderLight: '#e8ebee',

    inverseBg: '#111418',
    inverseBgAlt: '#1b2026',
    inverseText: '#f7f8f7',
    inverseTextDim: '#b2b8bf',
    inverseBorder: '#2c333a',

    success: '#1c7a4b',
    urgent: '#bb3626',
    warning: '#8a6414',

    logoPlate: '#ffffff',
  }),

  // The near-white ground a client's palette is built on, so Level stays
  // bright and neutral in anyone's colours.
  ground: { base: '#fafaf7', alt: '#f0f1ef', raised: '#ffffff', tint: 0.015 },

  fonts: {
    // One grotesque at every size: heavy and tight for headings, plain for
    // reading. Tabular numbers for prices and steps.
    display: "'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, monospace',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap',

  type: {
    xs: '13px',
    sm: '15px',
    base: '18px',
    lg: '21px',
    xl: '30px',
    display: 'clamp(30px, 4vw, 52px)',
    hero: 'clamp(40px, 6.2vw, 84px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  radius: { none: '0', sm: '8px', md: '12px', lg: '20px', full: '9999px' },
}
