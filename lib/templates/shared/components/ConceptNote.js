// A labelled placeholder shown only on concepts, where a real site would have
// content the prospect hasn't given us yet (their crew photo, prices, reviews).
// A real site never shows one: the section hides instead. Styled from the
// shared roles so it reads as deliberate, never as a broken page.

export function ConceptNote({ T, title, children, inverse = false, style = {}, minHeight }) {
  const c = T.colors
  const fg = inverse ? c.inverseText : c.text
  const dim = inverse ? c.inverseTextDim : c.textDim
  const line = inverse ? c.inverseBorder : c.border
  return (
    <div style={{
      border: `1.5px dashed ${line}`,
      borderRadius: T.radius?.md || '8px',
      padding: 'clamp(20px, 3vw, 32px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 10,
      minHeight,
      color: fg,
      ...style,
    }}>
      <span style={{
        alignSelf: 'flex-start',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: 4,
        background: inverse ? c.inverseBgAlt : c.accentGlow,
        color: fg,
      }}>
        Concept note
      </span>
      {title && <div style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>}
      {children && <div style={{ fontSize: 15, lineHeight: 1.6, color: dim, maxWidth: '56ch' }}>{children}</div>}
    </div>
  )
}
