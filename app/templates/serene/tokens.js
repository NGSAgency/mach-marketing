// SERENE Template - Design Tokens
//
// Built for medical aesthetics, wellness, and boutique professional services.
// The brief from research on this vertical is that winning sites hold clinical
// credibility and luxury appeal at the same time. A practice that looks purely
// spa-like undercuts the medical part; one that looks purely clinical loses the
// aspirational part that drives the purchase.
//
// So: warm neutrals rather than clinical white, generous whitespace, light
// typographic weight, and restraint. Nothing shouts.
export const sereneTokens = {
  colors: {
    // Warm, soft base. Avoids both sterile white and spa-cliche beige.
    bg: '#fbf9f7',
    bgAlt: '#f4efe9',
    bgLight: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f7f3ef',

    // Text - warm charcoal rather than black, which reads softer at length
    text: '#2b2724',
    textDim: '#635c56',
    textMuted: '#948b83',

    // Accent - muted sage. Calm and credible, and unlike the saturated
    // pinks and golds most medspa templates default to.
    accent: '#7d8f7b',
    accentDim: '#63735f',
    accentLight: '#9dab99',
    accentGlow: '#eef1ec',

    // Secondary - warm clay for CTAs that need to feel warmer than sage
    secondary: '#b8896b',
    secondaryLight: '#d9b299',

    // Semantic
    success: '#7d8f7b',
    urgent: '#a8635a',
    warning: '#b8896b',

    // Borders - barely there. Structure through space, not lines.
    border: '#e5ddd4',
    borderLight: '#f0eae3',
  },

  fonts: {
    // Light serif display reads as considered and premium without ornament
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "ui-monospace, monospace",
  },

  // Deliberately larger than the other families. Whitespace is the primary
  // signal of quality in this vertical.
  spacing: {
    xs: '6px',
    sm: '12px',
    md: '24px',
    lg: '48px',
    xl: '80px',
    xxl: '120px',
    xxxl: '160px',
  },

  radius: {
    none: '0',
    sm: '4px',
    md: '10px',
    lg: '18px',
    full: '9999px',
  },

  // Soft and diffuse. Hard shadows read as cheap here.
  shadow: {
    soft: '0 2px 12px rgba(43,39,36,0.05)',
    warm: '0 12px 40px rgba(43,39,36,0.08)',
    inset: 'inset 0 1px 0 rgba(255,255,255,0.8)',
  },

  transition: {
    slow: '500ms cubic-bezier(0.22, 1, 0.36, 1)',
    normal: '320ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
}
