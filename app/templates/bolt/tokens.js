// BOLT Template — Design Tokens
// Bold, industrial, high-contrast, energetic
import { defineColors } from '../../../lib/templates/shared/colors.js'
export const boltTokens = {
  // Colours use the shared roles in lib/templates/shared/colors.js.
  colors: defineColors('bolt', {
    // Dark base
    bg: '#0a0a0b',
    bgAlt: '#151517',
    bgRaised: '#1f1f22',
    surface: '#1c1c1f',
    surfaceAlt: '#232326',

    // Text
    text: '#ffffff',
    textDim: '#a1a1aa',
    textMuted: '#71717a',

    // Accent (client can override; default: electric orange)
    accent: '#f97316',
    accentDim: '#c2410c',
    accentLight: '#fb923c',
    accentGlow: 'rgba(249,115,22,0.12)',
    onAccent: '#0a0a0b',
    secondary: '#f97316',
    secondaryLight: '#fb923c',

    // Borders
    border: '#27272a',
    borderLight: '#1f1f22',

    // Light bands inside the dark page
    inverseBg: '#ffffff',
    inverseBgAlt: '#f4f4f5',
    inverseText: '#0a0a0b',
    inverseTextDim: '#52525b',
    inverseBorder: '#e4e4e7',

    // Semantic
    success: '#10b981',
    urgent: '#ef4444',
    warning: '#f59e0b',

    logoPlate: '#ffffff',
  }),
  fonts: {
    display: "'Anton', 'Impact', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  // Loaded on client sites and concepts by FamilyFonts. Keep in step with fonts above.
  fontsHref: 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap',
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    xxl: '64px',
    xxxl: '96px',
  },
  radius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  shadow: {
    sharp: '0 4px 0 rgba(0,0,0,0.2)',
    heavy: '0 8px 24px rgba(0,0,0,0.4)',
    glow: '0 0 32px rgba(249,115,22,0.35)',
  },
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
