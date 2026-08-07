import { AHeader, AFooter, aTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team - MACH', robots: { index: false, follow: false } }

export default function ATeam() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px) 0' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 32 }}>The Masthead</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(48px, 10vw, 128px)', fontWeight: 300, letterSpacing: -5, lineHeight: 0.92, margin: '0 0 40px 0' }}>Three founders,<br /><em style={{ fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>one mission</em>.</h1>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.inkDim, lineHeight: 1.65, columns: 'clamp(280px, 100%, 500px)', columnGap: 48, fontWeight: 400 }}>
            <p style={{ margin: '0 0 24px 0' }}>{content.mission}</p>
            <p style={{ margin: 0 }}>{content.why}</p>
          </div>
        </div>
      </section>
      {content.bios.map((b, idx) => (
        <section key={b.name} style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 40px)', borderTop: `1px solid ${T.border}`, background: idx % 2 === 1 ? T.bgAlt : T.bg }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'start' }}>
            <div>
              <div style={{ background: T.accentSoft, aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.border}` }}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(96px, 18vw, 200px)', color: T.accent, fontWeight: 300, letterSpacing: -8 }}>{b.name[0]}</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 16, fontFamily: 'Inter, system-ui, sans-serif' }}>№ {String(idx + 1).padStart(2, '0')} · {b.location}</div>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(48px, 9vw, 112px)', fontWeight: 300, letterSpacing: -4, lineHeight: 0.92, margin: '0 0 12px 0' }}>{b.name}<em style={{ fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>.</em></h2>
              <div style={{ fontSize: 14, color: T.inkMuted, marginBottom: 32, letterSpacing: 0.5, fontStyle: 'italic', fontFamily: 'Fraunces, Georgia, serif' }}>{b.role}</div>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(17px, 1.8vw, 20px)', color: T.inkDim, lineHeight: 1.7, margin: 0 }}>{b.text}</p>
            </div>
          </div>
        </section>
      ))}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 40px)', textAlign: 'center', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 300, letterSpacing: -4, lineHeight: 0.95, margin: '0 0 40px 0' }}>Work <em style={{ fontStyle: 'italic', color: T.accent }}>with us</em>.</h2>
          <a href="/preview/a/contact" style={{ background: T.ink, color: T.bg, padding: '20px 40px', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block', letterSpacing: 1, textTransform: 'uppercase' }}>Get in touch →</a>
        </div>
      </section>
      <AFooter />
    </div>
  )
}
