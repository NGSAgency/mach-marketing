import { CHeader, CFooter, TerminalMockup, cTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH - The growth engine for service businesses', robots: { index: false, follow: false } }

export default function CHome() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      {/* Full-bleed cinematic hero */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 160px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '30%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', right: '-10%', width: '50%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}10, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative' }}>
          {/* Kicker */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 40, padding: '6px 12px 6px 6px', background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 100, fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>
            <span style={{ padding: '2px 8px', background: T.accent, color: T.bg, borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>NEW</span>
            <span style={{ color: T.fgDim }}>Now serving KC + Boston</span>
            <span style={{ color: T.fgMuted }}>→</span>
          </div>
          {/* Massive headline */}
          <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(56px, 14vw, 200px)', fontWeight: 800, letterSpacing: -8, lineHeight: 0.9, margin: '0 0 48px 0', maxWidth: 1400 }}>
            Growth,<br />
            <span style={{ color: T.accent, letterSpacing: -6 }}>engineered.</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'end' }}>
            <div>
              <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.5, margin: '0 0 40px', maxWidth: 560 }}>
                Digital marketing for service-based businesses. Websites, SEO, paid media, content — measured, reported, and always improving.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/preview/c/contact" style={{ background: T.accent, color: T.bg, padding: '16px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: `0 20px 40px -12px ${T.accentGlow}` }}>Get started →</a>
                <a href="/preview/c/services" style={{ background: T.panel, color: T.fg, padding: '16px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: 'none', border: `1px solid ${T.borderStrong}` }}>See how it works</a>
              </div>
            </div>
            <div style={{ maxWidth: 480, justifySelf: 'end', width: '100%' }}>
              <TerminalMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics band */}
      <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 50%), 1fr))' }}>
          {[
            { n: '142%', l: 'Avg lead lift' },
            { n: '24', l: 'Active clients' },
            { n: '<1d', l: 'Response time' },
            { n: '8+', l: 'Industries served' },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 40px)', borderRight: i < 3 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1, color: T.fg, marginBottom: 8 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: T.fgMuted, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services - list layout with big hover interaction */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 80, maxWidth: 900 }}>
            <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>Services</div>
            <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, letterSpacing: -4, lineHeight: 1, margin: '0 0 24px 0' }}>Four services, <span style={{ color: T.accent }}>one system.</span></h2>
            <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.5, margin: 0, maxWidth: 640 }}>Every service designed to reinforce the others. Every decision measured against the same question: is this making the business grow?</p>
          </div>
          <div style={{ borderTop: `1px solid ${T.borderStrong}` }}>
            {content.services.map((s, idx) => (
              <a key={s.tag} href="/preview/c/services" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 'clamp(24px, 4vw, 64px)', padding: 'clamp(32px, 5vw, 56px) 0', borderBottom: `1px solid ${T.border}`, textDecoration: 'none', color: 'inherit', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 800, letterSpacing: -6, lineHeight: 0.9, color: T.fgMuted, minWidth: '2ch' }}>{s.tag}</div>
                <div>
                  <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 12, color: T.fg }}>{s.name}</div>
                  <div style={{ fontSize: 'clamp(14px, 1.6vw, 17px)', color: T.fgDim, lineHeight: 1.55, maxWidth: 640 }}>{s.headline}</div>
                </div>
                <div style={{ color: T.accent, fontSize: 24, fontWeight: 300 }}>→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', background: T.bgAlt, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}10, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 40, fontFamily: 'JetBrains Mono, monospace' }}>// Our principle</div>
          <blockquote style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1.1, margin: 0, maxWidth: 1200 }}>
            Every business deserves <span style={{ color: T.accent }}>transparent communication</span>, accountable execution, and a partner invested in <span style={{ color: T.accent }}>long-term success</span>.
          </blockquote>
        </div>
      </section>

      {/* Industries chip cloud */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
            <div>
              <div style={{ fontSize: 12, color: T.accent, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>Industries</div>
              <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: 0, maxWidth: 800 }}>Service businesses that <span style={{ color: T.accent }}>show up.</span></h2>
            </div>
            <a href="/preview/c/industries" style={{ color: T.accent, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace' }}>See all →</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {content.industries.map(i => (
              <div key={i.name} style={{ padding: '14px 22px', background: T.panel, border: `1px solid ${T.borderStrong}`, borderRadius: 100, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{i.icon}</span>
                {i.name}
              </div>
            ))}
            <a href="/preview/c/contact" style={{ padding: '14px 22px', background: T.accent, color: T.bg, borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: `0 10px 30px -10px ${T.accentGlow}` }}>+ Yours?</a>
          </div>
        </div>
      </section>

      <CFooter />
    </div>
  )
}
