import { FHeader, FFooter, Eyebrow, fTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team - MACH', robots: { index: false, follow: false } }

const BLOCKS = ['moody1', 'moody3', 'moody4']

export default function FTeam() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <FHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}><Eyebrow label="Team" /></div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 10vw, 112px)', fontWeight: 500, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 40px 0' }}>
            Three founders,<br />
            <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>one mission.</span>
          </h1>
          <p style={{ fontSize: 'clamp(19px, 2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: '0 0 24px 0', maxWidth: 780 }}>{content.mission}</p>
          <p style={{ fontSize: 'clamp(19px, 2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>{content.why}</p>
        </div>
      </section>

      {content.bios.map((b, idx) => {
        const bgColor = T[BLOCKS[idx % 3]]
        return (
          <section key={b.name} style={{ background: bgColor, padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
            <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'start' }}>
              <div>
                <div style={{ background: T.bg, aspectRatio: '4/5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${T.ink}` }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(80px, 15vw, 160px)', color: T.accent, fontWeight: 700, letterSpacing: -6 }}>{b.name[0]}</div>
                </div>
                <div style={{ fontSize: 11, color: T.ink, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginTop: 16, textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif' }}>{String(idx + 1).padStart(2, '0')} · {b.location}</div>
              </div>
              <div>
                <div style={{ marginBottom: 20 }}><Eyebrow label={b.role} /></div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 9vw, 96px)', fontWeight: 500, letterSpacing: -3.5, lineHeight: 0.95, margin: '0 0 32px 0' }}>{b.name}<span style={{ color: T.accent }}>.</span></h2>
                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: T.inkDim, lineHeight: 1.7, margin: 0 }}>{b.text}</p>
              </div>
            </div>
          </section>
        )
      })}

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 500, letterSpacing: -3.5, lineHeight: 1, margin: '0 0 40px 0' }}>Work <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>with us.</span></h2>
          <a href="/preview/f/contact" style={{ background: T.ink, color: T.bg, padding: '20px 40px', borderRadius: 4, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Get in touch →</a>
        </div>
      </section>

      <FFooter />
    </div>
  )
}
