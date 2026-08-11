import { BHeader, BFooter, bTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Team - MACH', robots: { index: false, follow: false } }

const BIO_COLORS = [
  { primary: '#0851cf', soft: '#dbeafe', dim: '#0537a0' },
  { primary: '#3b7ce8', soft: '#dbeafe', dim: '#0851cf' },
  { primary: '#0537a0', soft: '#dbeafe', dim: '#020c4a' },
]

export default function BTeam() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', right: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}20, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, marginBottom: 32, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Team</div>
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 800, letterSpacing: -4, lineHeight: 0.98, margin: '0 0 40px 0' }}>
            Three founders. <span style={{ color: T.accent }}>One mission.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.inkDim, lineHeight: 1.5, margin: '0 0 24px 0', maxWidth: 900 }}>{content.mission}</p>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.inkDim, lineHeight: 1.5, margin: 0, maxWidth: 900 }}>{content.why}</p>
        </div>
      </section>

      {/* Bio cards - vertical stack with big colorful blocks */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gap: 24 }}>
          {content.bios.map((b, idx) => {
            const c = BIO_COLORS[idx]
            return (
              <div key={b.name} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 32, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', minHeight: 320 }}>
                <div style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.dim})`, padding: 'clamp(32px, 4vw, 48px)', position: 'relative', overflow: 'hidden', color: T.bg, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '80%', height: '150%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 60%)', filter: 'blur(40px)' }} />
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 20 }}>{String(idx + 1).padStart(2, '0')} · {b.location.toUpperCase()}</div>
                    <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(120px, 20vw, 200px)', fontWeight: 800, letterSpacing: -12, lineHeight: 0.85, marginBottom: 0 }}>{b.name[0]}</div>
                  </div>
                </div>
                <div style={{ padding: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ padding: '4px 10px', background: c.soft, color: c.dim, borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12, display: 'inline-block', width: 'fit-content' }}>{b.role}</div>
                  <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: -2, margin: '0 0 20px 0', lineHeight: 1 }}>{b.name}</h2>
                  <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: T.inkDim, lineHeight: 1.65, margin: 0 }}>{b.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <BFooter />
    </div>
  )
}
