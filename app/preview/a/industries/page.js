import { AHeader, AFooter, aTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries - MACH', robots: { index: false, follow: false } }

export default function AIndustries() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px) 0' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 32 }}>The Directory</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(48px, 10vw, 128px)', fontWeight: 300, letterSpacing: -5, lineHeight: 0.92, margin: '0 0 40px 0' }}>Industries<br /><em style={{ fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>served</em>.</h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(20px, 2.4vw, 26px)', color: T.inkDim, lineHeight: 1.5, margin: 0, maxWidth: 780, fontWeight: 300 }}>Every business we work with shares one trait: their customers are searching for them. If yours is a service-based business, you belong on this page.</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 4vw, 40px)' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', borderTop: `2px solid ${T.borderStrong}` }}>
          {content.industries.map((i, idx) => (
            <div key={i.name} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 24, padding: 'clamp(28px, 4vw, 40px) 0', borderBottom: `1px solid ${T.border}`, alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(15px, 1.6vw, 17px)', color: T.inkMuted }}>№ {String(idx + 1).padStart(2, '0')}</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1 }}>{i.name}<span style={{ color: T.accent, fontStyle: 'italic' }}>.</span></div>
              <div style={{ fontSize: 32, textAlign: 'right' }}>{i.icon}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 40px)', background: T.bgAlt }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 32 }}>An open invitation</div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 300, letterSpacing: -3, lineHeight: 0.95, margin: '0 0 32px 0' }}>Don't see yours?<br /><em style={{ fontStyle: 'italic', color: T.accent }}>Inquire</em> to find out.</h2>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(18px, 2vw, 22px)', color: T.inkDim, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55, fontWeight: 300 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
          <a href="/preview/a/contact" style={{ background: T.ink, color: T.bg, padding: '20px 40px', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block', letterSpacing: 1, textTransform: 'uppercase' }}>Tell us about your business →</a>
        </div>
      </section>
      <AFooter />
    </div>
  )
}
