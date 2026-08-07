import { BHeader, BFooter, bTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'team - mach.digital', robots: { index: false, follow: false } }

export default function BTeam() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(32px, 6vw, 48px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgMuted, marginBottom: 24 }}><span style={{ color: T.accent }}>$</span> mach team --whoami</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 104px)', fontWeight: 700, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 32px 0' }}>Three founders.<br /><span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>One mission</span>.</h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: '0 0 24px 0', maxWidth: 800 }}>{content.mission}</p>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 800 }}>{content.why}</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 24px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', display: 'grid', gap: 20 }}>
          {content.bios.map((b, idx) => (
            <div key={b.name} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: T.panel2, padding: '14px 24px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.accent }}>./team/{b.name.toLowerCase()}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, letterSpacing: 1 }}>{b.location.toUpperCase()} · {String(idx + 1).padStart(3, '0')}</div>
              </div>
              <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
                <div>
                  <div style={{ background: T.panel2, aspectRatio: '4/5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 'clamp(80px, 12vw, 120px)', color: T.accent, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{b.name[0]}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>{b.role}</div>
                  <h2 style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 700, letterSpacing: -2.5, lineHeight: 1, margin: '0 0 24px 0' }}>{b.name}<span style={{ color: T.accent }}>.</span></h2>
                  <p style={{ fontSize: 'clamp(15px, 1.7vw, 17px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{b.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>Work <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>with us</span>.</h2>
          <a href="/preview/b/contact" style={{ background: T.accent, color: T.bg, padding: '16px 32px', borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>./contact()</a>
        </div>
      </section>
      <BFooter />
    </div>
  )
}
