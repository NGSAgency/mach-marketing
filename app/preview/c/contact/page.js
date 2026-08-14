import { CHeader, CFooter, cTokens as T } from '../shell.js'

export const metadata = { title: 'Contact - MACH', robots: { index: false, follow: false } }

export default function CContact() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32, fontFamily: 'JetBrains Mono, monospace' }}>// Contact</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(56px, 12vw, 180px)', fontWeight: 800, letterSpacing: -8, lineHeight: 0.9, margin: '0 0 40px 0' }}>
            Let's <span style={{ color: T.accent }}>talk.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.5, margin: 0, maxWidth: 780 }}>
            Tell us about your business and what you're looking to achieve. We respond within one business day, every time.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 14vw, 160px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)' }}>
          {/* Form as "terminal" */}
          <div style={{ background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', background: T.panel, borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ marginLeft: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted }}>mach.digital/new_conversation</div>
            </div>
            <form style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'grid', gap: 24 }}>
              {[{ label: 'name', type: 'text', ph: '' }, { label: 'company', type: 'text', ph: '' }, { label: 'email', type: 'email', ph: '' }, { label: 'phone', type: 'tel', ph: '' }].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>› {f.label}</label>
                  <input type={f.type} style={{ width: '100%', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, padding: '14px 16px', fontSize: 15, fontFamily: 'JetBrains Mono, monospace', color: T.fg, outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>› message</label>
                <textarea rows={5} style={{ width: '100%', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, padding: '14px 16px', fontSize: 15, fontFamily: 'JetBrains Mono, monospace', color: T.fg, outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: T.accent, color: T.bg, padding: '14px 24px', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', justifySelf: 'start', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5, boxShadow: `0 12px 32px -8px ${T.accentGlow}` }}>./submit()</button>
            </form>
          </div>

          {/* Info sidebar */}
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 12 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>// direct</div>
              <a href="mailto:sales@machdigitalsolutions.com" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.fg, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-word', fontWeight: 500 }}>hello@machdigital solutions.com</a>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 12 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>// offices</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, marginBottom: 6, fontWeight: 500 }}>kansas_city.mo</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 500 }}>boston.ma</div>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 12 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>// response_sla</div>
              <div style={{ fontSize: 15, color: T.fgDim, lineHeight: 1.6 }}>&lt; 1 business day, guaranteed.</div>
            </div>
            <div style={{ padding: 24, background: `linear-gradient(135deg, ${T.accent}20, ${T.accent}05)`, border: `1px solid ${T.accent}30`, borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.accent, boxShadow: `0 0 12px ${T.accentGlow}` }} />
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>Currently accepting</div>
              </div>
              <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.6 }}>New client engagements starting this quarter.</div>
            </div>
          </div>
        </div>
      </section>

      <CFooter />
    </div>
  )
}
