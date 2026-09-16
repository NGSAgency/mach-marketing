// BOOKING: the business you can book in one step.
//
// Concept A, approved September 2026. Where CENTRE is composed and CREW is
// local and plain, BOOKING exists to get the visit booked: the form is in the
// hero, the proof sits directly under it, and the catalogue comes last because
// by then the decision is made.
//
// Structure differs from the others, not only colour:
// - the hero is half argument, half a real request-a-visit form, with what
//   happens next inside the card
// - proof comes immediately after the fold, not near the footer
// - the services are a quiet two-column list low on the page
// - inner pages carry the same booking card in a sticky column beside the
//   content, so every page can be acted on without scrolling back
// - there is no closing band: the form already did that job
//
// Principles kept from every family: conventional skeleton, WCAG AA, body
// 18px, lines under 70 characters, real photographs or none, nothing invented.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const bookingTokens = {
  colors: defineColors('booking', {
    bg: '#f7f6f2',
    bgAlt: '#efeee8',
    bgRaised: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f2f1ec',

    text: '#15201b',
    textDim: '#41504a',
    textMuted: '#4e5952',

    accent: '#d9481f',        // replaced by the client's brand colour
    accentDim: '#a83616',
    accentLight: '#f0917a',
    accentGlow: '#fbeae5',
    onAccent: '#ffffff',
    secondary: '#10382a',
    secondaryLight: '#4e8a74',

    border: '#dcd9cf',
    borderLight: '#e9e6de',

    inverseBg: '#10241c',
    inverseBgAlt: '#163026',
    inverseText: '#f1f5f2',
    inverseTextDim: '#aebbb4',
    inverseBorder: '#24463a',

    success: '#1c6b45',
    urgent: '#b8371f',
    warning: '#8a6414',

    logoPlate: '#ffffff',
  }),

  // A warm working white: the form card has to read as the brightest thing on
  // the page whatever colour the client brings.
  ground: { base: '#f7f6f2', alt: '#efeee8', raised: '#ffffff', tint: 0.015 },

  fonts: {
    // A tight grotesk for headings and a plain one for reading. Nothing
    // decorative: this family is a form, and a form should look like work.
    display: "'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, monospace',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap',

  type: {
    xs: '13px',
    sm: '15px',
    base: '18px',
    lg: '21px',
    xl: '28px',
    display: 'clamp(28px, 3.4vw, 46px)',
    hero: 'clamp(38px, 4.8vw, 70px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  radius: { none: '0', sm: '6px', md: '10px', lg: '14px', full: '9999px' },
}
