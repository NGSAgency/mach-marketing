import { BHeader, BFooter, bTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries - MACH', robots: { index: false, follow: false } }

export default function BIndustries() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}20, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, marginBottom: 32, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Industries</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 800, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 1000 }}>
            Built for <span style={{ color: T.accent }}>service businesses</span>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.inkDim, lineHeight: 1.5, margin: '0 auto', maxWidth: 640 }}>
            We work with businesses whose customers are searching for them. If you deliver a service, we can help you grow.
          </p>
        </div>
      </section>

      {/* Industry cards - large tiles */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
          {content.industries.map((i, idx) => (
            <div key={i.name} style={{ padding: 'clamp(32px, 4vw, 48px)', background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}20, transparent 60%)`, filter: 'blur(30px)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 32 }}>
                  <div style={{ fontSize: 44 }}>{i.icon}</div>
                  <div style={{ padding: '4px 10px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{String(idx + 1).padStart(2, '0')}</div>
                </div>
                <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 700, letterSpacing: -0.8 }}>{i.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquire CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px)', background: `linear-gradient(135deg, ${T.accent}, ${T.accentDim})`, color: T.bg, borderRadius: 32, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-10%', width: '60%', height: '150%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(255,255,255,0.2)', borderRadius: 100, marginBottom: 24, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Don't see yours?</div>
            <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 24px 0' }}>Inquire to find out.</h2>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', opacity: 0.9, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.5 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
            <a href="/preview/b/contact" style={{ background: T.bgDark, color: T.bg, padding: '18px 36px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Tell us about your business →</a>
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  )
}
