import { CHeader, CFooter, cTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function CContact() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />
      <section style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 32 }}>Say hello</div>
          <h1 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(72px, 16vw, 240px)', textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.85, margin: 0, wordBreak: 'break-word' }}>Start<span style={{ color: T.accent }}>.</span></h1>
          <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 32px)', color: T.inkDim, lineHeight: 1.5, margin: '48px 0 0 0', maxWidth: 900, fontWeight: 300 }}>Tell us about your business. We respond within one business day.</div>
        </div>
      </section>
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)' }}>
          <form style={{ display: 'grid', gap: 40 }}>
            {[{ label: 'Name', type: 'text' }, { label: 'Company', type: 'text' }, { label: 'Email', type: 'email' }, { label: 'Phone', type: 'tel' }].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 10 }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `2px solid ${T.ink}`, padding: '12px 0', fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', textTransform: 'uppercase', letterSpacing: 1, color: T.ink, outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 10 }}>Tell us more</label>
              <textarea rows={5} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `2px solid ${T.ink}`, padding: '12px 0', fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(18px, 2vw, 22px)', color: T.ink, outline: 'none', resize: 'vertical', fontStyle: 'italic' }} />
            </div>
            <button type="submit" style={{ background: T.ink, color: T.bg, padding: '24px 48px', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', justifySelf: 'start', letterSpacing: 2, textTransform: 'uppercase' }}>Send →</button>
          </form>
          <div>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 16 }}>Email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', textTransform: 'uppercase', letterSpacing: 1, color: T.ink, textDecoration: 'none', lineHeight: 1.05, wordBreak: 'break-word' }}>hello@<br />machdigital<br />solutions.com</a>
            </div>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 16 }}>Offices</div>
              <div style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Kansas City<span style={{ color: T.accent }}>.</span></div>
              <div style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', textTransform: 'uppercase', letterSpacing: 1 }}>Boston<span style={{ color: T.accent }}>.</span></div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 16 }}>Response</div>
              <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.5 }}>Within one business day. Every time.</div>
            </div>
          </div>
        </div>
      </section>
      <CFooter />
    </div>
  )
}
