import { SHeader, SFooter, sTokens as T, SERVICES } from '../../shell.js'
import { notFound } from 'next/navigation'

export const metadata = { title: 'Advisory & Board Services - Sentry Solutions', robots: { index: false, follow: false } }

export default function ServicePage() {
  const service = SERVICES.find(s => s.slug === 'advisory-board')
  if (!service) notFound()

  const otherServices = SERVICES.filter(s => s.slug !== 'advisory-board')

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <SHeader />

      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: T.fgMuted, marginBottom: 32 }}>
            <a href="/mockups/sentry/services" style={{ color: T.accent, textDecoration: 'none' }}>Services</a>
            <span>/</span>
            <span>{service.name}</span>
          </div>
          <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 36px)', color: T.accent, marginBottom: 24 }}>{service.tag}</div>
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            {service.name}<em style={{ fontStyle: 'italic', color: T.accent }}>.</em>
          </h1>
          <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(19px, 2.4vw, 28px)', color: T.fgDim, lineHeight: 1.5, margin: 0, maxWidth: 780, fontStyle: 'italic' }}>{service.short}</p>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Overview</div>
          <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(18px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{service.body}</p>
        </div>
      </section>

      {/* What's included - generic scaffolding */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48, maxWidth: 800 }}>
            <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>What's Included</div>
            <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.1, margin: 0 }}>
              A <em style={{ fontStyle: 'italic', color: T.accent }}>disciplined process</em>, tailored to your business.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 16 }}>
            {[
              { t: 'Discovery & Alignment', d: 'A deep dive into your business, current state, and goals to set the foundation.' },
              { t: 'Strategic Framework', d: 'Development of a customized approach aligned with your specific objectives.' },
              { t: 'Execution & Support', d: 'Hands-on partnership through implementation with regular touchpoints.' },
              { t: 'Ongoing Advisory', d: 'Continued strategic input as your business evolves and grows.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: 28, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 24, color: T.accent, marginBottom: 12 }}>0{i + 1}</div>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 20, fontWeight: 500, letterSpacing: -0.5, marginBottom: 10 }}>{item.t}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.55 }}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.1, margin: '0 0 24px 0' }}>Explore how {service.name.toLowerCase()} can help.</h2>
          <a href="/mockups/sentry/contact" style={{ background: T.accent, color: T.navy, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block', letterSpacing: 0.3 }}>Schedule a Call →</a>
        </div>
      </section>

      {/* Other services */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 32 }}>Other Services</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 12 }}>
            {otherServices.map(s => (
              <a key={s.tag} href={`/mockups/sentry/services/${s.slug}`} style={{ padding: 20, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 12, color: T.accent, marginBottom: 4 }}>{s.tag}</div>
                  <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 16, fontWeight: 500 }}>{s.name}</div>
                </div>
                <div style={{ color: T.accent }}>→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SFooter />
    </div>
  )
}
