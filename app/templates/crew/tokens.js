// CREW: the trades family.
//
// Archetype: the well-run local company. Clean trucks, uniformed crews, a phone
// that gets answered. Confident, practical and warm; not industrial-aggressive
// (BOLT's failure) and not rustic (GROVE's). Designed from the brief in
// docs/briefs (the trades family brief) and the research behind it.
//
// Principles, in priority order:
// 1. THE FIRST SCREEN IS FOR ACTING. Headline, call, a second route, and proof
//    fit on the first phone screen. 57% of viewing time is on the first screen.
// 2. PROOF SITS NEXT TO THE ASK. Rating, years and licence beside the buttons,
//    not in a trust section three scrolls down.
// 3. REAL PHOTOS OR NONE. Their crew and their trucks. A concept without a photo
//    shows a labelled note, never stock.
// 4. CONVENTIONAL STRUCTURE, DISTINCTIVE SURFACE. Familiar page order; the
//    character comes from condensed signage type and full-bleed photography.
// 5. THE BRAND COLOUR IS FOR ACTING. Call buttons, the phone number and prices.
//    Nothing else is that saturated, so the call button always wins the eye.
// 6. 8PT GRID, like Serene.
//
// Light by construction: most trades customers' current sites are light, and
// the one dark band carries the drama.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const crewTokens = {
  colors: defineColors('crew', {
    bg: '#f6f7f5',
    bgAlt: '#eceee9',
    bgRaised: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f0f2ee',

    text: '#14181b',
    textDim: '#465057',
    textMuted: '#626c75',

    accent: '#1b5fd0',        // work-van blue; replaced by the client's brand
    accentDim: '#144aa6',
    accentLight: '#5e8fe4',
    accentGlow: '#e7eefb',
    onAccent: '#ffffff',
    secondary: '#9a6412',
    secondaryLight: '#e9b862',

    border: '#d9ddd6',
    borderLight: '#e7eae4',

    inverseBg: '#10161b',
    inverseBgAlt: '#18212a',
    inverseText: '#f3f5f3',
    inverseTextDim: '#a9b3bb',
    inverseBorder: '#2a343c',

    success: '#1d7f48',
    urgent: '#c0392b',
    warning: '#9a6412',

    logoPlate: '#ffffff',
  }),

  fonts: {
    // Condensed signage grotesk: the vernacular of fleet lettering and job signs.
    display: "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif",
    // Same superfamily at normal width for reading; legible on a phone at 18px.
    body: "'Barlow', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: "ui-monospace, monospace",
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap',

  type: {
    xs: '13px',
    sm: '15px',
    base: '18px',
    lg: '22px',
    xl: '34px',
    display: 'clamp(36px, 5.2vw, 60px)',
    hero: 'clamp(44px, 7.4vw, 92px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  radius: { none: '0', sm: '4px', md: '8px', lg: '14px', full: '9999px' },
}
