import { FHeader, FFooter, Eyebrow, fTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function FContact() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <FHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}><Eyebrow label="Contact" /></div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 10vw, 112px)', fontWeight: 500, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 40px 0' }}>
            Let's<br />
            <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>start.</span>
          </h1>
          <p style={{ fontSize: 'clamp(19px, 2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 720 }}>Tell us about your business and what you're looking to achieve. We'll respond within one business day.</p>
        </div>
      </section>

      <section style={{ background: T.moody1, padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 64px)' }}>
          <form style={{ display: 'grid', gap: 20 }}>
            {[
              { label: 'Your name', type: 'text' },
              { label: 'Company', type: 'text' },
              { label: 'Email', type: 'email' },
              { label: 'Phone', type: 'tel' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 11, color: T.ink, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Grotesk, sans-serif' }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: T.bg, border: `2px solid ${T.ink}`, borderRadius: 8, padding: '14px 18px', fontSize: 16, fontFamily: 'Inter, system-ui, sans-serif', color: T.ink, outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 11, color: T.ink, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Grotesk, sans-serif' }}>Tell us about your business</label>
              <textarea rows={4} style={{ width: '100%', background: T.bg, border: `2px solid ${T.ink}`, borderRadius: 8, padding: '14px 18px', fontSize: 16, fontFamily: 'Inter, system-ui, sans-serif', color: T.ink, outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ background: T.ink, color: T.bg, padding: '18px 32px', borderRadius: 4, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', justifySelf: 'start' }}>Send message →</button>
          </form>

          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, color: T.ink, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Space Grotesk, sans-serif' }}>Email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, color: T.ink, textDecoration: 'underline', textDecorationColor: T.accent, textUnderlineOffset: 6, fontWeight: 500 }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, color: T.ink, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Space Grotesk, sans-serif' }}>Offices</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, marginBottom: 6, fontWeight: 500 }}>Kansas City, MO</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 500 }}>Boston, MA</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.ink, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Space Grotesk, sans-serif' }}>Response time</div>
              <div style={{ fontSize: 15, color: T.inkDim, lineHeight: 1.6 }}>We respond within one business day.</div>
            </div>
          </div>
        </div>
      </section>

      <FFooter />
    </div>
  )
}
