import { content } from '../../../lib/site-content/data.js'
export const aTokens = { bg: '#fbf9f4', bgAlt: '#f0ebe0', ink: '#111', inkDim: '#4a4a4a', inkMuted: '#8a8479', accent: '#b8443a', accentSoft: '#f5d9d5', border: 'rgba(17,17,17,0.12)', borderStrong: '#111' }

export function AHeader() {
  return (
    <nav style={{ borderBottom: `1px solid ${aTokens.border}`, position: 'sticky', top: 0, background: 'rgba(251,249,244,0.94)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', zIndex: 10 }}>
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', padding: '18px clamp(16px, 4vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/a" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 500, fontSize: 24, letterSpacing: -1, color: aTokens.ink, textDecoration: 'none', fontStyle: 'italic' }}>MACH<span style={{ color: aTokens.accent }}>.</span></a>
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: 0.3 }}>
          <a href="/preview/a/services" style={{ color: aTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>Services</a>
          <a href="/preview/a/industries" style={{ color: aTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>Industries</a>
          <a href="/preview/a/team" style={{ color: aTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>Team</a>
          <a href="/preview/a/contact" style={{ color: aTokens.ink, padding: '10px 20px', border: `1.5px solid ${aTokens.ink}`, fontWeight: 500, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>Get in touch</a>
        </div>
      </div>
    </nav>
  )
}

export function AFooter() {
  return (
    <footer style={{ background: aTokens.ink, color: aTokens.bg, padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 40px) 40px' }}>
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 300, letterSpacing: -3, lineHeight: 1, marginBottom: 64, maxWidth: 900 }}>The end of the beginning.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 40, paddingTop: 48, borderTop: `1px solid rgba(255,255,255,0.15)` }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 8, fontSize: 13, opacity: 0.8 }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>Company</div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/a/team" style={{ color: 'inherit', opacity: 0.8, textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/a/industries" style={{ color: 'inherit', opacity: 0.8, textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/a/contact" style={{ color: 'inherit', opacity: 0.8, textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>Offices</div>
            <div style={{ marginBottom: 8, fontSize: 13, opacity: 0.8 }}>Kansas City · MO</div>
            <div style={{ marginBottom: 8, fontSize: 13, opacity: 0.8 }}>Boston · MA</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>Contact</div>
            <a href="mailto:hello@machdigitalsolutions.com" style={{ color: 'inherit', fontSize: 13, opacity: 0.8, textDecoration: 'none' }}>hello@machdigitalsolutions.com</a>
          </div>
        </div>
        <div style={{ marginTop: 48, fontSize: 11, opacity: 0.4, letterSpacing: 1 }}>© 2026 MACH Digital Solutions · NGS Digital LLC</div>
      </div>
    </footer>
  )
}
