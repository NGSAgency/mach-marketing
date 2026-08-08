import { CHeader, CFooter, cTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries - MACH', robots: { index: false, follow: false } }

export default function CIndustries() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32, fontFamily: 'JetBrains Mono, monospace' }}>// Industries</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(56px, 12vw, 180px)', fontWeight: 800, letterSpacing: -8, lineHeight: 0.9, margin: '0 0 40px 0' }}>
            Who we <span style={{ color: T.accent }}>serve.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.5, margin: 0, maxWidth: 780 }}>
            Service-based businesses whose customers are searching for them. If you deliver a service, we can help.
          </p>
        </div>
      </section>

      {/* Big chip cloud */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {content.industries.map((i, idx) => (
              <div key={i.name} style={{ padding: 'clamp(16px, 2vw, 24px) clamp(24px, 3vw, 36px)', background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 100, display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 600, letterSpacing: -0.5 }}>
                <span style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>{i.icon}</span>
                <span>{i.name}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, fontWeight: 400 }}>{String(idx + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquire CTA */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>// Don't see yours?</div>
          <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 800, letterSpacing: -4, lineHeight: 1, margin: '0 0 32px 0' }}><span style={{ color: T.accent }}>Inquire</span> to find out.</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: T.fgDim, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help you grow.</p>
          <a href="/preview/c/contact" style={{ background: T.accent, color: T.bg, padding: '18px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: `0 20px 40px -12px ${T.accentGlow}` }}>Tell us about your business →</a>
        </div>
      </section>

      <CFooter />
    </div>
  )
}
