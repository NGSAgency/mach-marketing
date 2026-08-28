import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'
import { content } from '../../lib/site-content/data.js'

export const metadata = { title: 'Team | MACH Digital Solutions', description: 'Meet the founders of MACH Digital Solutions. Three partners, one mission: help service-based businesses grow.' }

export default function ATeam() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Team</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 900 }}>
            Three founders.<br /><span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One mission.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto 24px', maxWidth: 800 }}>{content.mission}</p>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 800 }}>{content.why}</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 24 }}>
          {content.bios.map((b, idx) => (
            <div key={b.name} style={{ padding: 32, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${[T.accent1, T.accent2, T.accent3][idx]}30, transparent 60%)`, filter: 'blur(40px)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 12, background: `linear-gradient(135deg, ${[T.accent1, T.accent2, T.accent3][idx]}30, ${T.bgAlt})`, border: `1px solid ${T.border}`, marginBottom: 24, overflow: 'hidden' }}>
                  <img
                    src={`/team/${b.name.toLowerCase()}.jpg`}
                    alt={`${b.name}, ${b.role}`}
                    width={800}
                    height={1000}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: [T.accent1, T.accent2, T.accent3][idx], letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>{b.location} · 0{idx + 1}</div>
                <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1.5, margin: '0 0 8px 0' }}>{b.name}</h2>
                <div style={{ fontSize: 14, color: T.fgDim, marginBottom: 20 }}>{b.role}</div>
                <p style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.65, margin: 0 }}>{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 32px 0' }}>Work <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>with us</span>.</h2>
          <a href="/contact" style={{ background: T.fg, color: T.bg, padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: `0 0 40px ${T.glowPurple}` }}>Get in touch →</a>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
