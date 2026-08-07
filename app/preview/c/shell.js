import { content } from '../../../lib/site-content/data.js'
export const cTokens = { bg: '#f2ede4', bgAlt: '#e5decd', ink: '#050505', inkDim: '#3a3a3a', inkMuted: '#7a7570', accent: '#ff4d1c', accentSoft: '#ffd8cc', border: '#050505' }

export function CHeader() {
  return (
    <nav style={{ borderBottom: `2px solid ${cTokens.ink}`, position: 'sticky', top: 0, background: cTokens.bg, zIndex: 10 }}>
      <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto', padding: '20px clamp(20px, 5vw, 48px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/c" style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 28, letterSpacing: 2, color: cTokens.ink, textDecoration: 'none', textTransform: 'uppercase' }}>MACH<span style={{ color: cTokens.accent }}>/</span></a>
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          <a href="/preview/c/services" style={{ color: cTokens.ink, textDecoration: 'none' }}>Services</a>
          <a href="/preview/c/industries" style={{ color: cTokens.ink, textDecoration: 'none' }}>Industries</a>
          <a href="/preview/c/team" style={{ color: cTokens.ink, textDecoration: 'none' }}>Team</a>
          <a href="/preview/c/contact" style={{ background: cTokens.ink, color: cTokens.bg, padding: '10px 18px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Contact →</a>
        </div>
      </div>
    </nav>
  )
}

export function CFooter() {
  return (
    <footer style={{ background: cTokens.ink, color: cTokens.bg, padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px) 40px', borderTop: `4px solid ${cTokens.accent}` }}>
      <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
        <div style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(60px, 14vw, 200px)', textTransform: 'uppercase', letterSpacing: -2, lineHeight: 0.85, marginBottom: 64, wordBreak: 'break-word' }}>MACH<span style={{ color: cTokens.accent }}>.</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 32, paddingTop: 48, borderTop: `1px solid rgba(255,255,255,0.2)`, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700, opacity: 0.5 }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 8, fontSize: 14, opacity: 0.85, fontFamily: 'Instrument Serif, Georgia, serif' }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700, opacity: 0.5 }}>Company</div>
            <div style={{ marginBottom: 8, fontSize: 14 }}><a href="/preview/c/team" style={{ color: 'inherit', opacity: 0.85, textDecoration: 'none', fontFamily: 'Instrument Serif, Georgia, serif' }}>Team</a></div>
            <div style={{ marginBottom: 8, fontSize: 14 }}><a href="/preview/c/industries" style={{ color: 'inherit', opacity: 0.85, textDecoration: 'none', fontFamily: 'Instrument Serif, Georgia, serif' }}>Industries</a></div>
            <div style={{ marginBottom: 8, fontSize: 14 }}><a href="/preview/c/contact" style={{ color: 'inherit', opacity: 0.85, textDecoration: 'none', fontFamily: 'Instrument Serif, Georgia, serif' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700, opacity: 0.5 }}>Offices</div>
            <div style={{ marginBottom: 8, fontSize: 14, opacity: 0.85, fontFamily: 'Instrument Serif, Georgia, serif' }}>Kansas City · MO</div>
            <div style={{ marginBottom: 8, fontSize: 14, opacity: 0.85, fontFamily: 'Instrument Serif, Georgia, serif' }}>Boston · MA</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700, opacity: 0.5 }}>Say hello</div>
            <a href="mailto:hello@machdigitalsolutions.com" style={{ color: 'inherit', fontSize: 14, opacity: 0.85, textDecoration: 'none', fontFamily: 'Instrument Serif, Georgia, serif' }}>hello@machdigitalsolutions.com</a>
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.4, letterSpacing: 1, fontFamily: 'Inter, system-ui, sans-serif' }}>© 2026 MACH DIGITAL SOLUTIONS · NGS DIGITAL LLC</div>
      </div>
    </footer>
  )
}

// Reusable statement block
export function Statement({ number, kicker, statement, sub, accent = false, dark = false, note }) {
  const bg = dark ? cTokens.ink : cTokens.bg
  const fg = dark ? cTokens.bg : cTokens.ink
  const dim = dark ? 'rgba(255,255,255,0.65)' : cTokens.inkDim
  return (
    <section style={{ background: bg, color: fg, padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${dark ? cTokens.accent : cTokens.ink}`, position: 'relative' }}>
      <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
        {number && <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(60px, 10vw, 120px)', color: cTokens.accent, lineHeight: 1, marginBottom: 32, fontWeight: 300 }}>{number}</div>}
        {kicker && <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: cTokens.accent, fontWeight: 700, marginBottom: 32 }}>{kicker}</div>}
        <h2 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(48px, 12vw, 180px)', textTransform: 'uppercase', letterSpacing: -2, lineHeight: 0.9, margin: 0, wordBreak: 'break-word' }}>
          {statement}
        </h2>
        {sub && <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(20px, 3vw, 32px)', color: dim, lineHeight: 1.4, margin: '40px 0 0 0', maxWidth: 900, fontStyle: 'italic', fontWeight: 300 }}>{sub}</div>}
        {note && <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: dim, marginTop: 48, fontWeight: 600 }}>— {note}</div>}
      </div>
    </section>
  )
}
