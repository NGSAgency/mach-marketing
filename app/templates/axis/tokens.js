// AXIS Template - Design Tokens
// Modern, minimal, sophisticated, spacious
export const axisTokens = {
  colors: {
    bg: '#ffffff',
    bgSecondary: '#fafafa',
    bgTertiary: '#f5f5f5',
    bgInverse: '#0a0a0a',
    bgInverseAlt: '#171717',

    text: '#0a0a0a',
    textInverse: '#ffffff',
    textDim: '#525252',
    textMuted: '#a3a3a3',
    textInverseDim: '#a3a3a3',

    // Single crisp accent (client can override)
    accent: '#0057ff',
    accentHover: '#0044cc',
    accentGlow: '#e6efff',

    border: '#e5e5e5',
    borderDark: '#262626',

    success: '#059669',
    urgent: '#dc2626',
  },
  fonts: {
    display: "'Instrument Serif', 'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '48px',
    xl: '80px',
    xxl: '128px',
    xxxl: '200px',
  },
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  shadow: {
    subtle: '0 1px 2px rgba(0,0,0,0.04)',
    medium: '0 4px 24px rgba(0,0,0,0.06)',
    intense: '0 24px 64px rgba(0,0,0,0.12)',
  },
  transition: {
    quick: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
}
