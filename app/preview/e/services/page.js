import { EHeader, EFooter, GridBg, eTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

export default function EServices() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <EHeader />

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 64px)', position: 'relative', overflow: 'hidden' }}>
        <GridBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>// Services</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -3.5, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Four pillars, <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>one system.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            Website development, SEO, paid media, and content - designed to work together, measured by what matters, reported transparently.
          </p>
        </div>
      </section>

      {content.services.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: idx % 2 === 0 ? T.bgAlt : T.bg, borderTop: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
          {idx % 2 === 1 && <GridBg />}
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, letterSpacing: 1, fontWeight: 600, marginBottom: 20 }}>{s.tag} / {String(content.services.length).padStart(2, '0')}</div>
              <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 88px)', color: T.accent, lineHeight: 0.95, letterSpacing: -3, marginBottom: 24, fontWeight: 400 }}>{s.name.split(' ')[0]}</div>
              <div style={{ fontSize: 12, color: T.fgMuted, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{s.name}</div>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.2, margin: '0 0 24px 0' }}>{s.headline}</h2>
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>Ready to <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>build?</span></h2>
          <a href="/preview/e/contact" style={{ background: T.accent, color: T.bg, padding: '18px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Start a conversation →</a>
        </div>
      </section>

      <EFooter />
    </div>
  )
}
