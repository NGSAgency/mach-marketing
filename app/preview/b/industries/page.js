import { BHeader, BFooter, bTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'industries - mach.digital', robots: { index: false, follow: false } }

export default function BIndustries() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(32px, 6vw, 48px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgMuted, marginBottom: 24 }}><span style={{ color: T.accent }}>$</span> mach industries --supported</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 104px)', fontWeight: 700, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 32px 0' }}>Built for <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>service</span> businesses.</h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>Every business we serve shares one trait: customers are searching for them. If yours is a service-based business, you're in.</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 24px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: T.panel2, padding: '14px 24px', borderBottom: `1px solid ${T.border}`, display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
              <div>id</div><div>industry</div><div>status</div>
            </div>
            {content.industries.map((i, idx) => (
              <div key={i.name} style={{ padding: '18px 24px', display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 24, alignItems: 'center', borderBottom: idx < content.industries.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgMuted }}>{String(idx + 1).padStart(3, '0')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{i.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{i.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.accent }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 6px ${T.accent}` }} /> supported
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, marginBottom: 24 }}>// not_found?</div>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>Don't see yours? <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>Inquire</span>.</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: T.fgDim, margin: '0 auto 32px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business.</p>
          <a href="/preview/b/contact" style={{ background: T.accent, color: T.bg, padding: '16px 32px', borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>./inquire()</a>
        </div>
      </section>
      <BFooter />
    </div>
  )
}
