import { DHeader, DFooter, dTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team — MACH Digital Solutions', robots: { index: false, follow: false } }

export default function DTeam() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32, fontWeight: 600 }}>Team</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 9vw, 92px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Three founders. <em style={{ fontStyle: 'italic', color: T.accent }}>One mission.</em>
          </h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: '0 0 24px 0', maxWidth: 780 }}>{content.mission}</p>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>{content.why}</p>
        </div>
      </section>

      {/* Bios */}
      {content.bios.map((b, idx) => (
        <section key={b.name} style={{ padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'start' }}>
            <div>
              <div style={{ background: T.accentSoft, aspectRatio: '4/5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.border}` }}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(80px, 15vw, 160px)', fontWeight: 400, color: T.accent, fontStyle: 'italic', letterSpacing: -4 }}>{b.name[0]}</div>
              </div>
              <div style={{ fontSize: 11, color: T.inkMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginTop: 16, textAlign: 'center' }}>{String(idx + 1).padStart(2, '0')} · {b.location}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: T.accent, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{b.role}</div>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1, margin: '0 0 32px 0' }}>{b.name}<em style={{ fontStyle: 'italic', color: T.accent }}>.</em></h2>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(17px, 1.8vw, 20px)', color: T.inkDim, lineHeight: 1.7, margin: 0 }}>{b.text}</p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 400, letterSpacing: -2.5, lineHeight: 1.05, margin: '0 0 24px 0' }}>Work with us.</h2>
          <a href="/preview/d/contact" style={{ background: T.ink, color: T.bg, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>Get in touch →</a>
        </div>
      </section>

      <DFooter />
    </div>
  )
}
