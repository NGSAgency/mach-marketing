import { CHeader, CFooter, Statement, cTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

export default function CServices() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      <section style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 32 }}>Four services</div>
          <h1 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(72px, 16vw, 240px)', textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.85, margin: 0, wordBreak: 'break-word' }}>What<br />we do<span style={{ color: T.accent }}>.</span></h1>
        </div>
      </section>

      {content.services.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', background: idx % 2 === 0 ? T.bg : T.bgAlt, borderBottom: `2px solid ${T.ink}` }}>
          <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(48px, 10vw, 120px)', color: T.accent, fontWeight: 300, letterSpacing: -3, lineHeight: 1 }}>{s.tag}</div>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700 }}>{s.name}</div>
            </div>
            <h2 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(40px, 10vw, 140px)', textTransform: 'uppercase', letterSpacing: -2, lineHeight: 0.9, margin: '0 0 48px 0', wordBreak: 'break-word' }}>{s.headline}</h2>
            <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 900, fontWeight: 300 }}>{s.body}</p>
          </div>
        </section>
      ))}

      <Statement
        dark
        kicker="Now"
        statement={<>Let's <span style={{ color: T.accent }}>build</span>.</>}
      />

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <a href="/preview/c/contact" style={{ background: T.ink, color: T.bg, padding: '24px 48px', textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block' }}>Get in touch →</a>
      </section>

      <CFooter />
    </div>
  )
}
