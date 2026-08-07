import { DHeader, DFooter, dTokens as T } from '../shell.js'

export const metadata = { title: 'Contact — MACH Digital Solutions', robots: { index: false, follow: false } }

export default function DContact() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DHeader />

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32, fontWeight: 600 }}>Contact</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 9vw, 92px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Let's <em style={{ fontStyle: 'italic', color: T.accent }}>start</em>.
          </h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 720 }}>Tell us about your business and what you're looking to achieve. We'll respond within one business day.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)' }}>
          <form style={{ display: 'grid', gap: 24 }}>
            {[
              { label: 'Your name', type: 'text' },
              { label: 'Company', type: 'text' },
              { label: 'Email', type: 'email' },
              { label: 'Phone', type: 'tel' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${T.borderStrong}`, padding: '10px 0', fontSize: 17, fontFamily: 'Fraunces, Georgia, serif', color: T.ink, outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Tell us about your business</label>
              <textarea rows={4} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${T.borderStrong}`, padding: '10px 0', fontSize: 17, fontFamily: 'Fraunces, Georgia, serif', color: T.ink, outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ background: T.ink, color: T.bg, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 500, border: 'none', cursor: 'pointer', justifySelf: 'start', fontFamily: 'Inter, system-ui, sans-serif' }}>Send message →</button>
          </form>

          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: T.ink, textDecoration: 'underline', textDecorationColor: T.accent, textUnderlineOffset: 6 }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Offices</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, marginBottom: 6 }}>Kansas City</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22 }}>Boston</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Response time</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: T.inkDim, lineHeight: 1.6 }}>We respond to inquiries within one business day.</div>
            </div>
          </div>
        </div>
      </section>

      <DFooter />
    </div>
  )
}
