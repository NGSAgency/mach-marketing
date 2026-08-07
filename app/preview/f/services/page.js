import { FHeader, FFooter, Eyebrow, fTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

const BLOCKS = ['moody1', 'moody2', 'moody3', 'moody4']

export default function FServices() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <FHeader />

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}><Eyebrow label="Services" /></div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 10vw, 112px)', fontWeight: 500, letterSpacing: -4.5, lineHeight: 0.95, margin: '0 0 40px 0' }}>
            Four pillars<br />
            <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>of growth.</span>
          </h1>
          <p style={{ fontSize: 'clamp(19px, 2vw, 24px)', color: T.inkDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            Website development, SEO, paid media, and content - designed to work together, measured by what matters, reported transparently.
          </p>
        </div>
      </section>

      {content.services.map((s, idx) => {
        const bgColor = T[BLOCKS[idx % 4]]
        const isDark = bgColor === T.moody2
        return (
          <section key={s.tag} style={{ background: bgColor, color: isDark ? T.bg : T.ink, padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
            <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(80px, 15vw, 200px)', fontWeight: 700, color: isDark ? T.accent : T.accent, letterSpacing: -8, lineHeight: 0.9, marginBottom: 24 }}>{s.tag}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 600, letterSpacing: -0.5 }}>{s.name}</div>
              </div>
              <div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.15, margin: '0 0 24px 0' }}>{s.headline}</h2>
                <p style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: isDark ? 'rgba(255,255,255,0.8)' : T.inkDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            </div>
          </section>
        )
      })}

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 500, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 40px 0' }}>Ready to <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>build?</span></h2>
          <a href="/preview/f/contact" style={{ background: T.ink, color: T.bg, padding: '20px 40px', borderRadius: 4, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Start a conversation →</a>
        </div>
      </section>

      <FFooter />
    </div>
  )
}
