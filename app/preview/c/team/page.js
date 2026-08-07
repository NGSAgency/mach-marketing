import { CHeader, CFooter, Statement, cTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team - MACH', robots: { index: false, follow: false } }

export default function CTeam() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />
      <section style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 32 }}>Three founders</div>
          <h1 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(72px, 16vw, 240px)', textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.85, margin: 0, wordBreak: 'break-word' }}>Us<span style={{ color: T.accent }}>.</span></h1>
          <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)', color: T.inkDim, lineHeight: 1.5, margin: '48px 0 0 0', maxWidth: 900, fontWeight: 300 }}>{content.mission}</div>
        </div>
      </section>
      {content.bios.map((b, idx) => (
        <section key={b.name} style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', background: idx % 2 === 0 ? T.bgAlt : T.bg, borderBottom: `2px solid ${T.ink}` }}>
          <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 40, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(32px, 5vw, 56px)', color: T.accent, fontWeight: 300 }}>{String(idx + 1).padStart(2, '0')} —</div>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700 }}>{b.location}</div>
            </div>
            <h2 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(80px, 20vw, 320px)', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 0.85, margin: '0 0 32px 0', wordBreak: 'break-word' }}>{b.name}<span style={{ color: T.accent }}>.</span></h2>
            <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 2.5vw, 28px)', color: T.accent, marginBottom: 32, fontWeight: 300 }}>{b.role}</div>
            <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 1000, fontWeight: 300 }}>{b.text}</p>
          </div>
        </section>
      ))}
      <Statement
        dark
        kicker="Now"
        statement={<>Work <span style={{ color: T.accent }}>with</span> us.</>}
      />
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <a href="/preview/c/contact" style={{ background: T.ink, color: T.bg, padding: '24px 48px', textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block' }}>Get in touch →</a>
      </section>
      <CFooter />
    </div>
  )
}
