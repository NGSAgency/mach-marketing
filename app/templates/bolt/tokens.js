// BOLT Template — Design Tokens
// Bold, industrial, high-contrast, energetic
export const boltTokens = {
  colors: {
    // Dark base
    bg: '#0a0a0b',
    bgAlt: '#151517',
    bgLight: '#ffffff',
    surface: '#1c1c1f',
    surfaceLight: '#f4f4f5',

    // Text
    text: '#ffffff',
    textDim: '#a1a1aa',
    textMuted: '#71717a',
    textDark: '#0a0a0b',
    textDarkDim: '#52525b',

    // Accent (client can override; default: electric orange)
    accent: '#f97316',
    accentDim: '#c2410c',
    accentBright: '#fb923c',

    // Semantic
    success: '#10b981',
    urgent: '#ef4444',
    warning: '#f59e0b',

    // Borders
    border: '#27272a',
    borderLight: '#e4e4e7',
  },
  fonts: {
    display: "'Anton', 'Impact', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
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
