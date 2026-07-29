// GROVE Template - Design Tokens
// Warm, organic, approachable, humanist
export const groveTokens = {
  colors: {
    // Warm base palette
    bg: '#faf8f4',           // off-white cream
    bgAlt: '#f0ebe0',        // warmer cream
    bgLight: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f5f1e8',

    // Text - warm dark browns/greens
    text: '#2a2820',         // deep warm charcoal
    textDim: '#5a544a',      // warm gray
    textMuted: '#8a8479',    // muted warm

    // Accent - warm green (client can override with warm color)
    accent: '#4a6b3a',       // deep forest green
    accentDim: '#3a5628',
    accentLight: '#6d8b5e',
    accentGlow: '#e8f0e3',

    // Secondary warm accent
    secondary: '#c17c3f',    // warm terracotta
    secondaryLight: '#e8b985',

    // Semantic
    success: '#4a6b3a',
    urgent: '#b8482d',
    warning: '#c17c3f',

    // Borders
    border: '#d9d1c2',
    borderLight: '#e8e2d5',
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",     // warm serif w/ personality
    body: "'Manrope', system-ui, sans-serif",  // humanist sans
    mono: "ui-monospace, monospace",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '56px',
    xxl: '80px',
    xxxl: '120px',
  },
  radius: {
    none: '0',
    sm: '6px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
  shadow: {
    soft: '0 2px 8px rgba(74,107,58,0.08)',
    warm: '0 8px 32px rgba(74,107,58,0.12)',
    inset: 'inset 0 1px 0 rgba(255,255,255,0.9)',
  },
  transition: {
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
