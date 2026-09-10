// SERENE — dark editorial luxury for medical aesthetics
//
// Design principles this family is built on, in priority order:
//
// 1. HIERARCHY FIRST. Layouts fail at hierarchy, not aesthetics. Every section
//    has one dominant element; nothing competes.
// 2. SCALE CONTRAST. Display type runs 5-8x body size. Timid contrast is what
//    makes a layout read as templated.
// 3. ASYMMETRY. Split compositions and off-center emphasis create tension and
//    direct the eye. Centered everything creates neither.
// 4. NEGATIVE SPACE AS STRUCTURE. Space is an active element, not leftover.
// 5. 8PT GRID. Every spacing value is a multiple of 8, which is why standard
//    sizes are 16, 24, 32, 48, 64, 96.
//
// Palette is dark because the luxury editorial archetype reads as a fashion
// house rather than a medical office, which is what high-ticket aesthetic work
// sells on. Light cream is what every generic spa template uses.
import { defineColors } from '../../../lib/templates/shared/colors.js'
export const sereneTokens = {
  // Colours use the shared roles in lib/templates/shared/colors.js. Serene is
  // the reference family those roles were named from. Image scrims, text on
  // photos and translucent headers are derived from these, not set here.
  colors: defineColors('serene', {
    bg: '#0f0e0d',          // warm near-black; pure black reads cheap on screens
    bgAlt: '#171512',
    bgRaised: '#1f1c18',
    surface: '#171512',
    surfaceAlt: '#211d19',

    text: '#f4efe8',        // warm cream; pure white is harsh at body sizes
    textDim: '#a99f94',
    textMuted: '#6e665f',

    accent: '#b8975f',      // brass, not gold; gold reads gaudy
    accentDim: '#96784a',
    accentLight: '#d4b884',
    accentGlow: 'rgba(184,151,95,0.12)',
    onAccent: '#0f0e0d',

    secondary: '#b8975f',
    secondaryLight: '#d4b884',

    border: 'rgba(244,239,232,0.12)',
    borderLight: 'rgba(244,239,232,0.06)',

    // Serene has no inverse bands yet; these are what one would use.
    inverseBg: '#f4efe8',
    inverseBgAlt: '#e9e2d8',
    inverseText: '#0f0e0d',
    inverseTextDim: '#5c544c',
    inverseBorder: 'rgba(15,14,13,0.12)',

    success: '#7d9070',
    urgent: '#c07a6a',
    warning: '#b8975f',

    logoPlate: '#ffffff',
  }),

  fonts: {
    display: "'Cormorant Garamond', 'Times New Roman', serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "ui-monospace, monospace",
  },

  // Type scale at a 1.5 ratio. Wide gaps between steps are what produce
  // hierarchy; a scale that steps 16, 18, 20 produces none.
  type: {
    xs: '13px',
    sm: '15px',
    base: '17px',
    lg: '21px',
    xl: '32px',
    display: 'clamp(44px, 7vw, 88px)',
    hero: 'clamp(56px, 11vw, 152px)',
  },

  // Strict 8pt grid
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '32px',
    lg: '64px',
    xl: '96px',
    xxl: '144px',
    xxxl: '192px',
  },

  radius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },

  shadow: {
    soft: 'none',
    warm: '0 24px 80px rgba(0,0,0,0.55)',
    inset: 'none',
  },

  transition: {
    slow: '700ms cubic-bezier(0.16, 1, 0.3, 1)',
    normal: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
}
