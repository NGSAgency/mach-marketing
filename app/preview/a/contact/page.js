import { AHeader, AFooter, aTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function AContact() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px) 0' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 32 }}>Correspondence</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(48px, 10vw, 128px)', fontWeight: 300, letterSpacing: -5, lineHeight: 0.92, margin: '0 0 40px 0' }}><em style={{ fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>Write</em> to us.</h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(20px, 2.4vw, 26px)', color: T.inkDim, lineHeight: 1.5, margin: 0, maxWidth: 720, fontWeight: 300 }}>Tell us about your business, what you're trying to build, and what's in your way. We respond within one business day.</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 40px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)' }}>
          <form style={{ display: 'grid', gap: 32 }}>
            {[{ label: 'Your name', type: 'text' }, { label: 'Company', type: 'text' }, { label: 'Email', type: 'email' }, { label: 'Phone', type: 'tel' }].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 15, color: T.inkMuted, marginBottom: 10 }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1.5px solid ${T.borderStrong}`, padding: '10px 0', fontSize: 20, fontFamily: 'Fraunces, Georgia, serif', color: T.ink, outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 15, color: T.inkMuted, marginBottom: 10 }}>Tell us about your business</label>
              <textarea rows={5} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1.5px solid ${T.borderStrong}`, padding: '10px 0', fontSize: 20, fontFamily: 'Fraunces, Georgia, serif', color: T.ink, outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ background: T.ink, color: T.bg, padding: '20px 40px', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', justifySelf: 'start', letterSpacing: 1, textTransform: 'uppercase' }}>Send letter →</button>
          </form>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontStyle: 'italic', fontSize: 15, color: T.inkMuted, marginBottom: 12 }}>By email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', color: T.ink, textDecoration: 'underline', textDecorationColor: T.accent, textUnderlineOffset: 6, fontWeight: 400 }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontStyle: 'italic', fontSize: 15, color: T.inkMuted, marginBottom: 12 }}>Offices</div>
              <div style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', marginBottom: 6, fontWeight: 400 }}>Kansas City, MO</div>
              <div style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400 }}>Boston, MA</div>
            </div>
            <div>
              <div style={{ fontStyle: 'italic', fontSize: 15, color: T.inkMuted, marginBottom: 12 }}>Response time</div>
              <div style={{ fontSize: 17, color: T.inkDim, lineHeight: 1.6 }}>We respond to inquiries within one business day.</div>
            </div>
          </div>
        </div>
      </section>
      <AFooter />
    </div>
  )
}
