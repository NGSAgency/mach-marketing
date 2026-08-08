import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function AContact() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Contact</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 800 }}>
            Let's <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>start</span>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 640 }}>
            Tell us about your business and what you're looking to achieve. We respond within one business day.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 64px)' }}>
          <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 'clamp(28px, 4vw, 40px)' }}>
            <form style={{ display: 'grid', gap: 20 }}>
              {[{ label: 'Your name', type: 'text' }, { label: 'Company', type: 'text' }, { label: 'Email', type: 'email' }, { label: 'Phone', type: 'tel' }].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>{f.label}</label>
                  <input type={f.type} style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Tell us about your business</label>
                <textarea rows={4} style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: T.fg, color: T.bg, padding: '14px 24px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', justifySelf: 'start', boxShadow: `0 0 30px ${T.glowPurple}` }}>Send message →</button>
            </form>
          </div>
          <div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.fg, textDecoration: 'none', fontWeight: 500, wordBreak: 'break-word' }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: T.accent2, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Offices</div>
              <div style={{ fontSize: 16, marginBottom: 6, fontWeight: 500 }}>Kansas City, MO</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Boston, MA</div>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16 }}>
              <div style={{ fontSize: 11, color: T.accent3, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Response</div>
              <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.6 }}>Within one business day, every time.</div>
            </div>
          </div>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
