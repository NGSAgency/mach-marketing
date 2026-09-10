// AXIS Template - Design Tokens
// Modern Tech - Apple/Tesla premium consumer vibe
import { defineColors } from '../../../lib/templates/shared/colors.js'
export const axisTokens = {
  // Colours use the shared roles in lib/templates/shared/colors.js.
  colors: defineColors('axis', {
    bg: '#ffffff',
    bgAlt: '#f5f5f7',             // Apple-style off-white sections
    bgRaised: '#ffffff',
    surface: '#f5f5f7',           // cards and chips on white
    surfaceAlt: '#fafafa',

    text: '#1d1d1f',              // Apple's dark text
    textDim: '#6e6e73',           // Apple's secondary text
    textMuted: '#86868b',

    // Bold single accent (client can override)
    accent: '#0066ff',            // Electric blue
    accentDim: '#0052cc',
    accentLight: '#4d94ff',
    accentGlow: '#ebf4ff',
    onAccent: '#ffffff',
    secondary: '#0066ff',
    secondaryLight: '#4d94ff',

    border: '#d2d2d7',
    borderLight: '#e8e8ed',

    // Black bands
    inverseBg: '#000000',
    inverseBgAlt: '#1d1d1f',
    inverseText: '#ffffff',
    inverseTextDim: '#a1a1a6',
    inverseBorder: '#424245',

    success: '#00c853',
    urgent: '#ff3b30',
    warning: '#ff9500',

    logoPlate: '#ffffff',
  }),
  fonts: {
    display: "'Inter Display', 'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  // Loaded on client sites and concepts by FamilyFonts. Keep in step with fonts above.
  fontsHref: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '48px',
    xl: '80px',
    xxl: '120px',
  },
  radius: {
    none: '0',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  shadow: {
    subtle: '0 1px 3px rgba(0,0,0,0.04)',
    card: '0 4px 24px rgba(0,0,0,0.06)',
    lift: '0 20px 48px rgba(0,0,0,0.10)',
    glow: '0 8px 32px rgba(0,102,255,0.20)',
  },
  transition: {
    quick: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
