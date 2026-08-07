import { AHeader, AFooter, aTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

export default function AServices() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px) 0' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 32 }}>Services · An Essay in Four Parts</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(48px, 10vw, 128px)', fontWeight: 300, letterSpacing: -5, lineHeight: 0.92, margin: '0 0 40px 0' }}>What we <em style={{ fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>actually</em> do.</h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(20px, 2.4vw, 28px)', color: T.inkDim, lineHeight: 1.5, margin: 0, maxWidth: 780, fontWeight: 300 }}>Four services. One growth engine. Each designed to reinforce the others, and none delivered in isolation.</p>
        </div>
      </section>
      {content.services.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 40px)', background: idx % 2 === 1 ? T.bgAlt : T.bg, borderTop: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 80px)', color: T.accent, fontWeight: 400, letterSpacing: -3, lineHeight: 1 }}>Ch. {s.tag}</div>
              <div style={{ fontSize: 12, color: T.inkMuted, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{s.name}</div>
            </div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 5.5vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 40px 0' }}>{s.headline}</h2>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 23px)', color: T.inkDim, lineHeight: 1.7, columns: 'clamp(280px, 100%, 500px)', columnGap: 48, fontWeight: 400 }}>
              <p style={{ margin: 0 }}>{s.body}</p>
            </div>
          </div>
        </section>
      ))}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 40px)', background: T.ink, color: T.bg, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 300, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>Ready to <em style={{ fontStyle: 'italic', color: T.accent }}>build</em>?</h2>
          <a href="/preview/a/contact" style={{ background: T.bg, color: T.ink, padding: '20px 40px', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block', letterSpacing: 1, textTransform: 'uppercase' }}>Start a conversation →</a>
        </div>
      </section>
      <AFooter />
    </div>
  )
}
