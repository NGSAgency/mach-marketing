import { CHeader, CFooter, cTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

export default function CServices() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      {/* Full-bleed hero */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32, fontFamily: 'JetBrains Mono, monospace' }}>// Services</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(56px, 12vw, 180px)', fontWeight: 800, letterSpacing: -8, lineHeight: 0.9, margin: '0 0 40px 0', maxWidth: 1400 }}>
            What we <span style={{ color: T.accent }}>build.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.5, margin: 0, maxWidth: 780 }}>
            Four services. Every one measurable, transparent, and designed to compound with the others.
          </p>
        </div>
      </section>

      {/* Service breakdowns - two-column with number + content */}
      {content.services.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, background: idx % 2 === 1 ? T.bgAlt : T.bg, position: 'relative', overflow: 'hidden' }}>
          {idx % 2 === 1 && <div style={{ position: 'absolute', top: '30%', right: idx % 4 === 1 ? '-20%' : '60%', width: '50%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}08, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />}
          <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 96px)', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>// {s.tag} of 04</div>
              <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(80px, 15vw, 180px)', fontWeight: 800, letterSpacing: -10, lineHeight: 0.85, color: T.fg, marginBottom: 20 }}>{s.tag}</div>
              <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, letterSpacing: -1, color: T.accent }}>{s.name}</div>
            </div>
            <div style={{ paddingTop: 16 }}>
              <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, margin: '0 0 32px 0' }}>{s.headline}</h2>
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 800, letterSpacing: -4, lineHeight: 1, margin: '0 0 32px 0' }}>Ready to <span style={{ color: T.accent }}>build?</span></h2>
          <a href="/preview/c/contact" style={{ background: T.accent, color: T.bg, padding: '18px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: `0 20px 40px -12px ${T.accentGlow}` }}>Start a conversation →</a>
        </div>
      </section>

      <CFooter />
    </div>
  )
}
