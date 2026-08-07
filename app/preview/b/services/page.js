import { BHeader, BFooter, bTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'services - mach.digital', robots: { index: false, follow: false } }

export default function BServices() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(32px, 6vw, 48px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgMuted, marginBottom: 24 }}><span style={{ color: T.accent }}>$</span> mach modules --list --verbose</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 104px)', fontWeight: 700, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 32px 0' }}>Four <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>modules</span>.<br />One engine.</h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>Each module is designed to reinforce the others. Together, they form the operating system for your business's growth.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 24px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', display: 'grid', gap: 16 }}>
          {content.services.map((s, idx) => (
            <div key={s.tag} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: T.panel2, padding: 'clamp(16px, 2vw, 20px) clamp(20px, 3vw, 28px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.accent, background: `${T.accent}15`, padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>./{s.name.toLowerCase().replace(/ /g, '-')}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.fgMuted }}>module {s.tag}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.accent }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 8px ${T.accent}` }} /> active
                </div>
              </div>
              <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)' }}>
                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.15, margin: '0 0 20px 0' }}>{s.headline}</h2>
                <p style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>Ready to <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>deploy</span>?</h2>
          <a href="/preview/b/contact" style={{ background: T.accent, color: T.bg, padding: '16px 32px', borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>./start()</a>
        </div>
      </section>

      <BFooter />
    </div>
  )
}
