import { DHeader, DFooter, dTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH Digital Solutions — Growth marketing for ambitious businesses', robots: { index: false, follow: false } }

export default function DHome() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 40, fontWeight: 600 }}>Est. 2024 · Kansas City + Boston</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 10vw, 104px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 40px 0' }}>
            Digital marketing, <em style={{ fontStyle: 'italic', color: T.accent }}>reimagined</em> for businesses that want to grow.
          </h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.4vw, 26px)', color: T.inkDim, lineHeight: 1.55, margin: '0 0 48px', maxWidth: 780 }}>
            We help businesses grow with confidence through strategic digital solutions, measurable results, and lasting partnerships — not just marketing metrics.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="/preview/d/contact" style={{ background: T.ink, color: T.bg, padding: '16px 28px', borderRadius: 4, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Start a conversation</a>
            <a href="/preview/d/services" style={{ color: T.ink, padding: '16px 12px', fontSize: 15, fontWeight: 500, textDecoration: 'underline', textDecorationColor: T.accent, textUnderlineOffset: 6 }}>See how we work →</a>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start', marginBottom: 64 }}>
            <div>
              <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>What we do</div>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>Four services. <em style={{ fontStyle: 'italic', color: T.accent }}>One system.</em></h2>
            </div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, color: T.inkDim, lineHeight: 1.65, paddingTop: 12 }}>
              We combine innovative marketing, exceptional web development, and data-driven financial insight to create strategies that deliver meaningful business outcomes.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 4, borderTop: `2px solid ${T.borderStrong}` }}>
            {content.services.map(s => (
              <a key={s.tag} href="/preview/d/services" style={{ borderBottom: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`, padding: 'clamp(28px, 4vw, 40px)', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ fontSize: 13, color: T.accent, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>{s.tag}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 500, letterSpacing: -0.5, marginBottom: 12, lineHeight: 1.15 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: T.inkDim, lineHeight: 1.55 }}>{s.headline}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why pull-quote */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.ink, color: T.bg }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>Why MACH</div>
          <blockquote style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(26px, 4.5vw, 44px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.3, margin: 0 }}>
            Every business deserves <em style={{ color: T.accent, fontStyle: 'italic' }}>transparent communication</em>, accountable execution, and a partner who is invested in its long-term success.
          </blockquote>
        </div>
      </section>

      {/* Industries teaser */}
      <section style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>Who we serve</div>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>Service-based businesses that <em style={{ fontStyle: 'italic', color: T.accent }}>show up</em>.</h2>
            </div>
            <a href="/preview/d/industries" style={{ color: T.ink, fontSize: 15, fontWeight: 500, textDecoration: 'underline', textDecorationColor: T.accent, textUnderlineOffset: 6 }}>See all industries →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 12 }}>
            {content.industries.slice(0, 6).map(i => (
              <div key={i.name} style={{ padding: '32px 24px', background: T.accentSoft, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{i.icon}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, fontWeight: 500 }}>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 400, letterSpacing: -2.5, lineHeight: 1.05, margin: '0 0 24px 0' }}>Let's grow together.</h2>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(18px, 2vw, 22px)', color: T.inkDim, lineHeight: 1.55, margin: '0 auto 32px', maxWidth: 620 }}>Tell us about your business. We'll show you how we can help.</p>
          <a href="/preview/d/contact" style={{ background: T.ink, color: T.bg, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>Start a conversation →</a>
        </div>
      </section>

      <DFooter />
    </div>
  )
}
