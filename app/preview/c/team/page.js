import { CHeader, CFooter, cTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team - MACH', robots: { index: false, follow: false } }

export default function CTeam() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32, fontFamily: 'JetBrains Mono, monospace' }}>// Team</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(56px, 12vw, 180px)', fontWeight: 800, letterSpacing: -8, lineHeight: 0.9, margin: '0 0 48px 0' }}>
            Three founders,<br /><span style={{ color: T.accent }}>one mission.</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(24px, 3vw, 48px)' }}>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: T.fgDim, lineHeight: 1.65, margin: 0 }}>{content.mission}</p>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: T.fgDim, lineHeight: 1.65, margin: 0 }}>{content.why}</p>
          </div>
        </div>
      </section>

      {/* Full-viewport bio sections */}
      {content.bios.map((b, idx) => (
        <section key={b.name} style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, background: idx % 2 === 1 ? T.bgAlt : T.bg, position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', top: '20%', left: idx % 2 === 0 ? '60%' : '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}10, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative', width: '100%' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>// 0{idx + 1} · {b.location}</div>
            <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(72px, 20vw, 320px)', fontWeight: 800, letterSpacing: -14, lineHeight: 0.85, margin: '0 0 32px 0' }}>{b.name}<span style={{ color: T.accent }}>.</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'start' }}>
              <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 500, color: T.accent, letterSpacing: -0.5, lineHeight: 1.2 }}>{b.role}</div>
              <p style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{b.text}</p>
            </div>
          </div>
        </section>
      ))}

      <CFooter />
    </div>
  )
}
