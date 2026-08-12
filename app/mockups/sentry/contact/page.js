import { SHeader, SFooter, sTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - Sentry Solutions', robots: { index: false, follow: false } }

export default function SentryContact() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <SHeader />

      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', right: '-15%', width: '50%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Contact</div>
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Schedule a <em style={{ fontStyle: 'italic', color: T.accent }}>complimentary</em> strategy call.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            If you're planning for significant growth, capital raising, or a strategic transaction, we'd welcome a conversation. This call is an opportunity to discuss your business, your goals, and how we can help.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)' }}>
          {/* Form */}
          <div style={{ background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: 'clamp(28px, 4vw, 40px)' }}>
            <form style={{ display: 'grid', gap: 24 }}>
              {[
                { label: 'Full Name', type: 'text' },
                { label: 'Company', type: 'text' },
                { label: 'Email', type: 'email' },
                { label: 'Phone', type: 'tel' },
                { label: 'Company Revenue', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>{f.label}</label>
                  <input type={f.type} style={{ width: '100%', background: T.bg, border: `1px solid ${T.borderStrong}`, borderRadius: 4, padding: '14px 16px', fontSize: 15, fontFamily: 'Manrope, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>How can we help?</label>
                <textarea rows={4} style={{ width: '100%', background: T.bg, border: `1px solid ${T.borderStrong}`, borderRadius: 4, padding: '14px 16px', fontSize: 15, fontFamily: 'Manrope, system-ui, sans-serif', color: T.fg, outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: T.accent, color: T.navy, padding: '16px 28px', borderRadius: 4, fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', justifySelf: 'start', letterSpacing: 0.3 }}>Send Message →</button>
            </form>
          </div>
          {/* Info */}
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Response Time</div>
              <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 22, marginBottom: 8 }}>Within 24 hours</div>
              <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.5 }}>Every inquiry receives a personal response from our team.</div>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Ideal Fit</div>
              <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.65 }}>Founder-led companies and lower middle market businesses with $2M–$50M in revenue, particularly those planning for growth, capital raising, or exit.</div>
            </div>
            <div style={{ padding: 24, background: `linear-gradient(135deg, ${T.accent}18, ${T.accent}05)`, border: `1px solid ${T.accent}40`, borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.accent, boxShadow: `0 0 12px ${T.accent}` }} />
                <div style={{ fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>Currently Accepting</div>
              </div>
              <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.6 }}>New client engagements starting this quarter.</div>
            </div>
          </div>
        </div>
      </section>

      <SFooter />
    </div>
  )
}
