import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

export default function AServices() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />

      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Services</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 900 }}>
            Four services.<br /><span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One growth engine.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 640 }}>
            Website development, SEO, paid media, and content — engineered to work together, measured by what matters, reported transparently.
          </p>
        </div>
      </section>

      {content.services.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${T.border}` }}>
          <div style={{ position: 'absolute', top: '50%', left: idx % 2 === 0 ? '-20%' : '60%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${[T.accent1, T.accent2, T.accent3, T.accent1][idx]}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${T.borderStrong}`, borderRadius: 100, marginBottom: 24 }}>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: T.accent1, fontWeight: 700, letterSpacing: 1 }}>{s.tag}</span>
              </div>
              <div style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 0.95, background: `linear-gradient(135deg, ${T.fg}, ${T.fgDim})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>{s.name}</div>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 600, letterSpacing: -1, lineHeight: 1.15, margin: '0 0 24px 0' }}>{s.headline}</h2>
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 24px 0' }}>Ready to <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build</span>?</h2>
          <a href="/preview/a/contact" style={{ background: T.fg, color: T.bg, padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: `0 0 40px ${T.glowPurple}` }}>Start a conversation →</a>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
