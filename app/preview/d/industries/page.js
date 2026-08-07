import { DHeader, DFooter, dTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries — MACH Digital Solutions', robots: { index: false, follow: false } }

export default function DIndustries() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32, fontWeight: 600 }}>Industries</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 9vw, 92px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Built for <em style={{ fontStyle: 'italic', color: T.accent }}>service-based businesses</em>.
          </h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            We work with businesses whose customers are looking for them — not the other way around. If you deliver a service, we can help you grow.
          </p>
        </div>
      </section>

      {/* Industries grid */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 4, borderTop: `2px solid ${T.borderStrong}` }}>
            {content.industries.map((i, idx) => (
              <div key={i.name} style={{ padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 40px)', borderBottom: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{i.icon}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.5, marginBottom: 6 }}>{i.name}</div>
                <div style={{ fontSize: 12, color: T.inkMuted, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>{String(idx + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't see yours? */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.accentSoft }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>Don't see yours?</div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 32px 0' }}>
            <em style={{ fontStyle: 'italic', color: T.accent }}>Inquire</em> to find out.
          </h2>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(17px, 2vw, 22px)', color: T.inkDim, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
          <a href="/preview/d/contact" style={{ background: T.ink, color: T.bg, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>Tell us about your business →</a>
        </div>
      </section>

      <DFooter />
    </div>
  )
}
