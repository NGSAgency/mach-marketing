import { DHeader, DFooter, dTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services — MACH Digital Solutions', robots: { index: false, follow: false } }

export default function DServices() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32, fontWeight: 600 }}>Services</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 9vw, 92px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Four pillars of <em style={{ fontStyle: 'italic', color: T.accent }}>growth</em>.
          </h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            Website development, SEO, paid media, and content — designed to work together, measured by what matters, and reported transparently.
          </p>
        </div>
      </section>

      {/* Services blocks */}
      {content.services.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, background: idx % 2 === 1 ? T.accentSoft : T.bg }}>
          <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(64px, 12vw, 120px)', fontWeight: 400, letterSpacing: -4, lineHeight: 0.9, color: T.accent, fontStyle: 'italic' }}>{s.tag}</div>
              <div style={{ fontSize: 13, color: T.inkMuted, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 }}>{s.name}</div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.1, margin: '0 0 24px 0' }}>{s.headline}</h2>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(17px, 1.8vw, 20px)', color: T.inkDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.ink, color: T.bg, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>Ready to build?</h2>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(17px, 2vw, 22px)', opacity: 0.75, margin: '0 auto 32px', maxWidth: 620, lineHeight: 1.55 }}>Every engagement starts with a conversation about your business.</p>
          <a href="/preview/d/contact" style={{ background: T.bg, color: T.ink, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>Start a conversation →</a>
        </div>
      </section>

      <DFooter />
    </div>
  )
}
