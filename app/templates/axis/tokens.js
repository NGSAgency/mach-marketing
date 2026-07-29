// AXIS Template - Design Tokens
// Modern Tech - Apple/Tesla premium consumer vibe
export const axisTokens = {
  colors: {
    bg: '#ffffff',
    bgSecondary: '#f5f5f7',      // Apple-style off-white
    bgTertiary: '#fafafa',
    bgInverse: '#000000',
    bgInverseAlt: '#1d1d1f',

    text: '#1d1d1f',              // Apple's dark text
    textInverse: '#ffffff',
    textDim: '#6e6e73',           // Apple's secondary text
    textMuted: '#86868b',
    textInverseDim: '#a1a1a6',

    // Bold single accent (client can override)
    accent: '#0066ff',            // Electric blue
    accentHover: '#0052cc',
    accentGlow: '#ebf4ff',
    accentSubtle: '#f0f6ff',

    border: '#d2d2d7',
    borderLight: '#e8e8ed',
    borderDark: '#424245',

    success: '#00c853',
    urgent: '#ff3b30',
  },
  fonts: {
    display: "'Inter Display', 'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
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
