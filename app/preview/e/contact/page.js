import { EHeader, EFooter, GridBg, eTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function EContact() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <EHeader />

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)', position: 'relative', overflow: 'hidden' }}>
        <GridBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>// Contact</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -3.5, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Let's <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>start.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 720 }}>Tell us about your business and what you're looking to achieve. We'll respond within one business day.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 64px)' }}>
          <form style={{ display: 'grid', gap: 20 }}>
            {[
              { label: 'Your name', type: 'text' },
              { label: 'Company', type: 'text' },
              { label: 'Email', type: 'email' },
              { label: 'Phone', type: 'tel' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 11, color: T.fgMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: T.bgLight, border: `1px solid ${T.border}`, borderRadius: 10, padding: '14px 18px', fontSize: 16, fontFamily: 'Inter, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 11, color: T.fgMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>Tell us about your business</label>
              <textarea rows={4} style={{ width: '100%', background: T.bgLight, border: `1px solid ${T.border}`, borderRadius: 10, padding: '14px 18px', fontSize: 16, fontFamily: 'Inter, system-ui, sans-serif', color: T.fg, outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ background: T.accent, color: T.bg, padding: '16px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', justifySelf: 'start', fontFamily: 'Inter, system-ui, sans-serif' }}>Send message →</button>
          </form>

          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, color: T.fgMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>Email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontSize: 20, color: T.fg, textDecoration: 'none', fontWeight: 500 }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, color: T.fgMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>Offices</div>
              <div style={{ fontSize: 18, marginBottom: 6 }}>Kansas City, MO</div>
              <div style={{ fontSize: 18 }}>Boston, MA</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.fgMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>Response time</div>
              <div style={{ fontSize: 15, color: T.fgDim, lineHeight: 1.6 }}>We respond within one business day.</div>
            </div>
          </div>
        </div>
      </section>

      <EFooter />
    </div>
  )
}
