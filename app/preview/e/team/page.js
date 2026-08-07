import { EHeader, EFooter, GridBg, eTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team - MACH', robots: { index: false, follow: false } }

export default function ETeam() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <EHeader />

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)', position: 'relative', overflow: 'hidden' }}>
        <GridBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>// Team</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -3.5, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Three founders, <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>one mission.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: '0 0 24px 0', maxWidth: 780 }}>{content.mission}</p>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>{content.why}</p>
        </div>
      </section>

      {content.bios.map((b, idx) => (
        <section key={b.name} style={{ padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 32px)', background: idx % 2 === 0 ? T.bgAlt : T.bg, borderTop: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'start' }}>
            <div>
              <div style={{ background: T.bgLight, aspectRatio: '4/5', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 30%, ${T.accent}15, transparent 60%)` }} />
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(80px, 15vw, 160px)', color: T.accent, letterSpacing: -4, position: 'relative' }}>{b.name[0]}</div>
              </div>
              <div style={{ fontSize: 11, color: T.fgMuted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginTop: 16, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace' }}>{String(idx + 1).padStart(2, '0')} / {b.location}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>{b.role}</div>
              <h2 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, letterSpacing: -2.5, lineHeight: 1, margin: '0 0 32px 0' }}>{b.name}<span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>.</span></h2>
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{b.text}</p>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 24px 0' }}>Work <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>with us.</span></h2>
          <a href="/preview/e/contact" style={{ background: T.accent, color: T.bg, padding: '18px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Get in touch →</a>
        </div>
      </section>

      <EFooter />
    </div>
  )
}
