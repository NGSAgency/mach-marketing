import { BHeader, BFooter, bTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Services - MACH', robots: { index: false, follow: false } }

const ACCENT_MAP = {
  '01': { primary: '#0851cf', soft: '#dbeafe', dim: '#0537a0' },
  '02': { primary: '#7c3aed', soft: '#ede9fe', dim: '#6d28d9' },
  '03': { primary: '#059669', soft: '#d1fae5', dim: '#047857' },
  '04': { primary: '#2563eb', soft: '#dbeafe', dim: '#1d4ed8' },
}

export default function BServices() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}20, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, marginBottom: 32, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Services</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 800, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 1000 }}>
            Four services. <span style={{ color: T.accent }}>Zero fluff.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.inkDim, lineHeight: 1.5, margin: '0 auto', maxWidth: 640 }}>
            Every piece designed to work with the others. Measured by what matters. Reported transparently.
          </p>
        </div>
      </section>

      {/* Services - alternating layout */}
      {content.services.map((s, idx) => {
        const c = ACCENT_MAP[s.tag]
        const reverse = idx % 2 === 1
        return (
          <section key={s.tag} style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px)', background: idx % 2 === 1 ? T.bgAlt : T.bg }}>
            <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}>
              <div style={{ order: reverse ? 2 : 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: c.soft, color: c.dim, borderRadius: 100, marginBottom: 24, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                  <span>{s.tag}</span>
                  <span>{s.name}</span>
                </div>
                <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, margin: '0 0 24px 0' }}>{s.headline}</h2>
                <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.inkDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
              <div style={{ order: reverse ? 1 : 2 }}>
                <div style={{ aspectRatio: '4/3', borderRadius: 24, background: `linear-gradient(135deg, ${c.primary}, ${c.dim})`, position: 'relative', overflow: 'hidden', boxShadow: `0 24px 60px -20px ${c.primary}60` }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15))' }} />
                  <div style={{ position: 'absolute', top: 32, left: 32, color: T.bg, opacity: 0.95 }}>
                    <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(80px, 15vw, 180px)', fontWeight: 800, letterSpacing: -8, lineHeight: 0.85 }}>{s.tag}</div>
                    <div style={{ fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginTop: -8 }}>{s.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px)', background: T.bgDark, color: T.bg, borderRadius: 32, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}30, transparent 60%)`, filter: 'blur(100px)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 32px 0' }}>Ready to <span style={{ color: T.accent }}>grow</span>?</h2>
            <a href="/preview/b/contact" style={{ background: T.accent, color: T.bgDark, padding: '18px 36px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block', boxShadow: `0 12px 40px ${T.accentGlow}` }}>Start today →</a>
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  )
}
