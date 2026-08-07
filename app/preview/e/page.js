import { EHeader, EFooter, GridBg, eTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH — Digital growth infrastructure', robots: { index: false, follow: false } }

export default function EHome() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <EHeader />

      {/* Hero */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <GridBg />
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: 500, height: 500, background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.accent, padding: '6px 14px', background: `${T.accent}15`, border: `1px solid ${T.accent}30`, borderRadius: 100, marginBottom: 32, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 12px ${T.accent}` }} /> ACTIVELY BUILDING · KC + BOS
          </div>
          <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(44px, 10vw, 108px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.95, margin: '0 0 32px 0' }}>
            Growth marketing,<br />
            <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: T.accent, letterSpacing: -2 }}>engineered.</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.55, margin: '0 0 48px', maxWidth: 720 }}>
            The digital marketing infrastructure for businesses that want measurable growth. Websites, SEO, paid media, and content — measured, reported, and always improving.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/preview/e/contact" style={{ background: T.accent, color: T.bg, padding: '16px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: `0 8px 32px ${T.accent}30` }}>Get started →</a>
            <a href="/preview/e/services" style={{ background: 'transparent', color: T.fg, padding: '16px 28px', borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: 'none', border: `1px solid ${T.borderStrong}` }}>See services</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 24, marginTop: 80, paddingTop: 48, borderTop: `1px solid ${T.border}` }}>
            {[
              { k: '4', v: 'Core services' },
              { k: '2', v: 'Coasts covered' },
              { k: '∞', v: 'Growth potential' },
              { k: '1', v: 'Trusted partner' },
            ].map(s => (
              <div key={s.v}>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(40px, 5vw, 56px)', color: T.accent, fontStyle: 'italic', lineHeight: 1, letterSpacing: -2 }}>{s.k}</div>
                <div style={{ fontSize: 12, color: T.fgMuted, fontFamily: 'JetBrains Mono, monospace', marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>// Services</div>
            <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, margin: 0, maxWidth: 900 }}>Four services, <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>built to work together.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 16 }}>
            {content.services.map(s => (
              <a key={s.tag} href="/preview/e/services" style={{ padding: 32, background: T.bgLight, border: `1px solid ${T.border}`, borderRadius: 16, textDecoration: 'none', color: 'inherit', display: 'block', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.accent, letterSpacing: 1, fontWeight: 600 }}>{s.tag}</div>
                  <div style={{ fontSize: 14, color: T.fgMuted }}>→</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: -0.5 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.5 }}>{s.headline}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why quote */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden' }}>
        <GridBg />
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32, fontWeight: 600 }}>// Why MACH</div>
          <blockquote style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.25, margin: 0 }}>
            Every business deserves <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>transparent communication</span>, accountable execution, and a partner invested in <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>long-term success</span>.
          </blockquote>
        </div>
      </section>

      {/* Industries */}
      <section style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: T.accent, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>// Industries</div>
              <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>Service businesses <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>we serve.</span></h2>
            </div>
            <a href="/preview/e/industries" style={{ color: T.accent, fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}>see all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: 12 }}>
            {content.industries.slice(0, 8).map(i => (
              <div key={i.name} style={{ padding: '28px 20px', background: T.bgLight, border: `1px solid ${T.border}`, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{i.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${T.border}` }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 800, height: 800, background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 24px 0' }}>Let's <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>build.</span></h2>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, margin: '0 auto 32px', maxWidth: 620, lineHeight: 1.55 }}>Tell us about your business. We'll show you how we can help.</p>
          <a href="/preview/e/contact" style={{ background: T.accent, color: T.bg, padding: '18px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: `0 12px 40px ${T.accent}30` }}>Start a conversation →</a>
        </div>
      </section>

      <EFooter />
    </div>
  )
}
