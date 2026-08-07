import { content } from '../../../lib/site-content/data.js'

export const eTokens = {
  bg: '#0a0b0e',
  bgAlt: '#111318',
  bgLight: '#1a1d24',
  fg: '#f5f5f7',
  fgDim: '#a1a1a6',
  fgMuted: '#6e6e73',
  accent: '#5eead4',
  accentDim: '#2dd4bf',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.15)',
}

// Grid background pattern
export function GridBg({ opacity = 0.03 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
  )
}

export function EHeader() {
  return (
    <nav style={{ borderBottom: `1px solid ${eTokens.border}`, position: 'sticky', top: 0, background: 'rgba(10,11,14,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 10 }}>
      <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', padding: '18px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/e" style={{ display: 'flex', alignItems: 'center', gap: 10, color: eTokens.fg, textDecoration: 'none' }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${eTokens.accent}, ${eTokens.accentDim})`, boxShadow: `0 0 20px ${eTokens.accent}40` }} />
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>MACH</span>
        </a>
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center', fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <a href="/preview/e/services" style={{ color: eTokens.fgDim, textDecoration: 'none', fontWeight: 500 }}>Services</a>
          <a href="/preview/e/industries" style={{ color: eTokens.fgDim, textDecoration: 'none', fontWeight: 500 }}>Industries</a>
          <a href="/preview/e/team" style={{ color: eTokens.fgDim, textDecoration: 'none', fontWeight: 500 }}>Team</a>
          <a href="/preview/e/contact" style={{ background: eTokens.accent, color: eTokens.bg, padding: '10px 18px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' }}>Get started →</a>
        </div>
      </div>
    </nav>
  )
}

export function EFooter() {
  return (
    <footer style={{ background: eTokens.bgAlt, color: eTokens.fg, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px', borderTop: `1px solid ${eTokens.border}`, position: 'relative', overflow: 'hidden' }}>
      <GridBg opacity={0.02} />
      <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${eTokens.accent}, ${eTokens.accentDim})` }} />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>MACH</span>
            </div>
            <div style={{ fontSize: 14, color: eTokens.fgDim, lineHeight: 1.6, maxWidth: 280 }}>Marketing infrastructure for businesses that want measurable growth.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: eTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 10, fontSize: 14, color: eTokens.fgDim }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: eTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>Company</div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/e/team" style={{ color: eTokens.fgDim, textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/e/industries" style={{ color: eTokens.fgDim, textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/e/contact" style={{ color: eTokens.fgDim, textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: eTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>Offices</div>
            <div style={{ marginBottom: 10, fontSize: 14, color: eTokens.fgDim }}>Kansas City · MO</div>
            <div style={{ marginBottom: 10, fontSize: 14, color: eTokens.fgDim }}>Boston · MA</div>
          </div>
        </div>
        <div style={{ paddingTop: 32, borderTop: `1px solid ${eTokens.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12, color: eTokens.fgMuted, fontFamily: 'JetBrains Mono, monospace' }}>
          <div>© 2026 MACH Digital Solutions</div>
          <div>NGS Digital LLC</div>
        </div>
      </div>
    </footer>
  )
}
