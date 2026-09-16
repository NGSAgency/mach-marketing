// CENTRE: the business that wants to look like the best one in town.
//
// Concept B, approved September 2026. Where CREW is local and plain, Hearth is
// established, and Level is easy to deal with, CENTRE is composed: a high
// contrast serif, photography given room, and everything on one centre line.
//
// Structure differs from the others, not only colour:
// - the nav is a floating pill over a full-height photographic hero, rather
//   than a bar above the page
// - one service at a time fills a panel; the other names switch it. No list,
//   no grid of cards
// - the figures (since, rating, reviews, areas) run across a dark band and the
//   review stands alone as a pull quote with no score beside it
// - how it works is a timeline with the line drawn through the markers
// - the areas are tiles on a full-strength accent band, the only place the
//   accent appears at full strength
// - questions open and close; the footer is one centred line, not columns
//
// Principles kept from every family: conventional skeleton (name, phone and a
// way to book always reachable), WCAG AA, body 18px, lines under 70
// characters, real photographs or none, nothing invented.
import { defineColors } from '../../../lib/templates/shared/colors.js'

export const centreTokens = {
  colors: defineColors('centre', {
    bg: '#f2f0ec',
    bgAlt: '#e9e6e0',
    bgRaised: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f7f5f2',

    text: '#1a1715',
    textDim: '#4a433d',
    textMuted: '#5d554d',

    accent: '#a3302c',        // replaced by the client's brand colour
    accentDim: '#7d2320',
    accentLight: '#d98a86',
    accentGlow: '#f6e9e8',
    onAccent: '#ffffff',
    secondary: '#2a5f63',
    secondaryLight: '#7fb0b3',

    border: '#d8d3cb',
    borderLight: '#e6e2db',

    inverseBg: '#211d1a',
    inverseBgAlt: '#2c2724',
    inverseText: '#f4f1ec',
    inverseTextDim: '#b8b0a7',
    inverseBorder: '#3b3531',

    success: '#1c6b45',
    urgent: '#b03227',
    warning: '#8a6414',

    logoPlate: '#ffffff',
  }),

  // The warm off-white a client's palette is built on, so CENTRE keeps its
  // composed, gallery-like ground whatever colour the client brings.
  ground: { base: '#f2f0ec', alt: '#e9e6e0', raised: '#ffffff', tint: 0.02 },

  fonts: {
    // A high-contrast serif for anything that carries the voice, and a text
    // face chosen for reading rather than for looks: Inter has a tall x-height
    // and open shapes, so a paragraph at 18px holds up where Mulish went
    // spindly. The contrast between the two is the family; the reading has to
    // come first.
    display: "'Bodoni Moda', Georgia, 'Times New Roman', serif",
    body: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, monospace',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Inter:wght@400;500;600;700&display=swap',

  type: {
    xs: '13px',
    sm: '15px',
    base: '18.5px',
    lg: '21px',
    xl: '30px',
    display: 'clamp(30px, 3.8vw, 54px)',
    hero: 'clamp(42px, 6.4vw, 96px)',
  },

  spacing: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '96px', xxl: '128px' },

  radius: { none: '0', sm: '8px', md: '12px', lg: '16px', full: '9999px' },
}
