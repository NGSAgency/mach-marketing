import { FHeader, FFooter, Eyebrow, fTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries - MACH', robots: { index: false, follow: false } }

export default function FIndustries() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <FHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}><Eyebrow label="Industries" /></div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 10vw, 112px)', fontWeight: 500, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 40px 0' }}>
            Built for<br />
            <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>service</span>{' '}
            businesses.
          </h1>
          <p style={{ fontSize: 'clamp(19px, 2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            We work with businesses whose customers are looking for them - not the other way around. If you deliver a service, we can help you grow.
          </p>
        </div>
      </section>

      <section style={{ background: T.moody1, padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 16 }}>
            {content.industries.map((i, idx) => (
              <div key={i.name} style={{ padding: 'clamp(28px, 3vw, 40px)', background: T.bg, borderRadius: 12, border: `2px solid ${T.ink}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24 }}>
                  <div style={{ fontSize: 40 }}>{i.icon}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: 2 }}>{String(idx + 1).padStart(2, '0')}</div>
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, letterSpacing: -0.5 }}>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: T.moody2, color: T.bg, padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}><Eyebrow label="Don't see yours?" /></div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 500, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 32px 0' }}><span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>Inquire</span> to find out.</h2>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', opacity: 0.75, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
          <a href="/preview/f/contact" style={{ background: T.bg, color: T.ink, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Tell us about your business →</a>
        </div>
      </section>

      <FFooter />
    </div>
  )
}
