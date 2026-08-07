import { BHeader, BFooter, bTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'mach.digital', robots: { index: false, follow: false } }

export default function BHome() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      {/* Terminal-style hero */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(32px, 6vw, 64px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgMuted, marginBottom: 24 }}>
            <span style={{ color: T.accent }}>$</span> mach --init <span style={{ color: T.accent }}>--growth</span>
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 10vw, 120px)', fontWeight: 700, letterSpacing: -5, lineHeight: 0.92, margin: '0 0 32px 0' }}>
            The <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>operating system</span><br />
            for growth.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: '0 0 40px', maxWidth: 780 }}>
            A digital marketing agency for service-based businesses. Four modules — websites, SEO, paid media, content — connected, measured, and always running.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/preview/b/contact" style={{ background: T.accent, color: T.bg, padding: '14px 24px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>./start()</a>
            <a href="/preview/b/services" style={{ background: 'transparent', color: T.fg, padding: '14px 24px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 600, textDecoration: 'none', border: `1px solid ${T.borderStrong}` }}>./modules --list</a>
          </div>
        </div>
      </section>

      {/* Live-feel metrics dashboard */}
      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 16 }}>
            {[
              { label: 'services', val: '4', delta: 'all systems live', color: T.accent },
              { label: 'coasts', val: '2', delta: 'kc + bos', color: T.accent },
              { label: 'industries', val: '8+', delta: 'expanding', color: T.warn },
              { label: 'response', val: '< 1d', delta: 'guaranteed', color: T.accent },
            ].map((m, i) => (
              <div key={i} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.fgMuted, letterSpacing: 1, textTransform: 'uppercase' }}>{m.label}</div>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                </div>
                <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1, marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>{m.val}</div>
                <div style={{ fontSize: 12, color: T.fgDim }}>{m.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services as command palette rows */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, marginBottom: 16 }}>// modules.list()</div>
            <h2 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>Four modules, one engine.</h2>
          </div>
          <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {content.services.map((s, idx) => (
              <a key={s.tag} href="/preview/b/services" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 'clamp(16px, 3vw, 32px)', padding: 'clamp(20px, 3vw, 28px) clamp(20px, 3vw, 32px)', alignItems: 'center', textDecoration: 'none', color: 'inherit', borderBottom: idx < content.services.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.accent, background: `${T.accent}15`, padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>./{s.name.toLowerCase().replace(/ /g, '-')}</div>
                <div>
                  <div style={{ fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 600, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.4 }}>{s.headline}</div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: T.fgMuted }}>⏎</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why - big statement panel */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)` }} />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, marginBottom: 32 }}>// operating_principle</div>
          <blockquote style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.2, margin: 0 }}>
            Every business deserves <span style={{ color: T.accent }}>transparent communication</span>, accountable execution, and a partner invested in <span style={{ color: T.accent }}>long-term success</span>.
          </blockquote>
        </div>
      </section>

      {/* Industries as tag chips */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, marginBottom: 12 }}>// industries.supported</div>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.05, margin: 0 }}>Service businesses we serve.</h2>
            </div>
            <a href="/preview/b/industries" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, textDecoration: 'none', fontWeight: 600 }}>show --all →</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {content.industries.map(i => (
              <div key={i.name} style={{ padding: '10px 16px', background: T.panel, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.fgDim }}>
                <span style={{ marginRight: 8 }}>{i.icon}</span>{i.name.toLowerCase()}
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: `${T.accent}15`, border: `1px solid ${T.accent}30`, borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, fontWeight: 700 }}>+ inquire</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: T.accent, marginBottom: 24 }}>$ ./start</div>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>Let's <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>build</span>.</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: T.fgDim, margin: '0 auto 32px', maxWidth: 560, lineHeight: 1.55 }}>Tell us about your business. We respond within one business day.</p>
          <a href="/preview/b/contact" style={{ background: T.accent, color: T.bg, padding: '16px 32px', borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>./start()</a>
        </div>
      </section>

      <BFooter />
    </div>
  )
}
