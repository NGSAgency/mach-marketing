import { EHeader, EFooter, GridBg, eTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries - MACH', robots: { index: false, follow: false } }

export default function EIndustries() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <EHeader />

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)', position: 'relative', overflow: 'hidden' }}>
        <GridBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>// Industries</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -3.5, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Built for <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>service businesses.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            We work with businesses whose customers are looking for them - not the other way around. If you deliver a service, we can help you grow.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 16 }}>
            {content.industries.map((i, idx) => (
              <div key={i.name} style={{ padding: 'clamp(28px, 3vw, 40px)', background: T.bgLight, border: `1px solid ${T.border}`, borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24 }}>
                  <div style={{ fontSize: 36 }}>{i.icon}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, letterSpacing: 1 }}>{String(idx + 1).padStart(2, '0')}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.5 }}>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${T.border}` }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 700, height: 700, background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32, fontWeight: 600 }}>// Don't see yours?</div>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 32px 0' }}>
            <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>Inquire</span> to find out.
          </h2>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
          <a href="/preview/e/contact" style={{ background: T.accent, color: T.bg, padding: '18px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Tell us about your business →</a>
        </div>
      </section>

      <EFooter />
    </div>
  )
}
