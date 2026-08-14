import { BHeader, BFooter, bTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function BContact() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-15%', width: '50%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}20, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)' }}>
          {/* Left - context */}
          <div>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, marginBottom: 32, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Contact</div>
            <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, letterSpacing: -3.5, lineHeight: 0.98, margin: '0 0 32px 0' }}>
              Let's <span style={{ color: T.accent }}>grow</span>.
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: T.inkDim, lineHeight: 1.5, marginBottom: 48 }}>
              Tell us about your business and what you're looking to achieve. We respond within one business day — every time.
            </p>
            {/* Info cards */}
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ padding: 24, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: T.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✉</div>
                <div>
                  <div style={{ fontSize: 12, color: T.inkMuted, marginBottom: 4, fontWeight: 500 }}>Email</div>
                  <a href="mailto:sales@machdigitalsolutions.com" style={{ fontSize: 15, color: T.ink, textDecoration: 'none', fontWeight: 500, wordBreak: 'break-word' }}>sales@machdigitalsolutions.com</a>
                </div>
              </div>
              <div style={{ padding: 24, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📍</div>
                <div>
                  <div style={{ fontSize: 12, color: T.inkMuted, marginBottom: 4, fontWeight: 500 }}>Offices</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>Kansas City · Boston</div>
                </div>
              </div>
              <div style={{ padding: 24, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div>
                  <div style={{ fontSize: 12, color: T.inkMuted, marginBottom: 4, fontWeight: 500 }}>Response</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>&lt; 1 business day, guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 24, padding: 'clamp(28px, 4vw, 40px)' }}>
            <form style={{ display: 'grid', gap: 20 }}>
              {[{ label: 'Your name', type: 'text', ph: 'Jane Smith' }, { label: 'Company', type: 'text', ph: 'Acme HVAC' }, { label: 'Email', type: 'email', ph: 'jane@acme.com' }, { label: 'Phone', type: 'tel', ph: '(555) 123-4567' }].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, color: T.inkMuted, fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} style={{ width: '100%', background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 12, padding: '14px 16px', fontSize: 15, fontFamily: 'Inter, system-ui, sans-serif', color: T.ink, outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, color: T.inkMuted, fontWeight: 600, marginBottom: 8 }}>What are you looking for?</label>
                <textarea rows={4} placeholder="Tell us about your business and goals..." style={{ width: '100%', background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 12, padding: '14px 16px', fontSize: 15, fontFamily: 'Inter, system-ui, sans-serif', color: T.ink, outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: T.ink, color: T.bg, padding: '16px 24px', borderRadius: 100, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(15,14,12,0.15)' }}>Send message →</button>
            </form>
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  )
}
