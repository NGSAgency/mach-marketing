import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'
import { content } from '../../lib/site-content/data.js'

export const metadata = { title: 'Industries | MACH Digital Solutions', description: 'Growth marketing built for service-based businesses. HVAC, plumbing, roofing, electrical, landscaping, and more.' }

export default function AIndustries() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Industries</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 900 }}>
            Built for <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>service businesses</span>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 640 }}>
            We work with businesses whose customers are searching for them. If you deliver a service, we can help you grow.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 16 }}>
          {content.industries.map((i, idx) => (
            <div key={i.name} style={{ padding: 32, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${[T.accent1, T.accent2, T.accent3][idx % 3]}30, transparent 60%)`, filter: 'blur(30px)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'start', marginBottom: 32 }}>
                  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: T.fgMuted, letterSpacing: 1 }}>{String(idx + 1).padStart(2, '0')}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.5 }}>{i.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)', borderRadius: 24, background: `linear-gradient(135deg, ${T.accent1}20, ${T.accent2}15)`, border: `1px solid ${T.border}`, textAlign: 'center', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent1}25, transparent 60%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, color: T.fg, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24, opacity: 0.7 }}>Don't see yours?</div>
            <h2 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}><span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Inquire</span> to find out.</h2>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: T.fgDim, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
            <a href="/contact" style={{ background: T.fg, color: T.bg, padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Tell us about your business →</a>
          </div>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
