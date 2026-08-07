import { BHeader, BFooter, bTokens as T } from '../shell.js'

export const metadata = { title: 'contact - mach.digital', robots: { index: false, follow: false } }

export default function BContact() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(32px, 6vw, 48px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgMuted, marginBottom: 24 }}><span style={{ color: T.accent }}>$</span> mach contact --new</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 104px)', fontWeight: 700, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 32px 0' }}>Let's <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>start</span>.</h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 720 }}>Tell us about your business and what you're looking to achieve. We respond within one business day.</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 24px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 64px)' }}>
          <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: T.panel2, padding: '14px 24px', borderBottom: `1px solid ${T.border}`, display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.danger }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.warn }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.accent }} />
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.fgMuted, marginLeft: 12 }}>new_inquiry.form</div>
            </div>
            <form style={{ padding: 'clamp(28px, 4vw, 40px)', display: 'grid', gap: 24 }}>
              {[{ label: 'name', type: 'text' }, { label: 'company', type: 'text' }, { label: 'email', type: 'email' }, { label: 'phone', type: 'tel' }].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{f.label}</label>
                  <input type={f.type} style={{ width: '100%', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, padding: '12px 16px', fontSize: 15, fontFamily: 'JetBrains Mono, monospace', color: T.fg, outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>message</label>
                <textarea rows={5} style={{ width: '100%', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, padding: '12px 16px', fontSize: 15, fontFamily: 'JetBrains Mono, monospace', color: T.fg, outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: T.accent, color: T.bg, padding: '14px 24px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', justifySelf: 'start' }}>./submit()</button>
            </form>
          </div>
          <div>
            <div style={{ marginBottom: 40, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>// direct</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.fg, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-word' }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ marginBottom: 40, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>// offices</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, marginBottom: 8 }}>kansas_city.mo</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15 }}>boston.ma</div>
            </div>
            <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>// response_time</div>
              <div style={{ fontSize: 15, color: T.fgDim, lineHeight: 1.6 }}>≤ 1 business day, guaranteed.</div>
            </div>
          </div>
        </div>
      </section>
      <BFooter />
    </div>
  )
}
