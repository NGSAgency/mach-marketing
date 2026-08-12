import { AHeader, AFooter, MeshBg, GridBg, BrainMockup, aTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH - Growth infrastructure for service businesses', robots: { index: false, follow: false } }

export default function AHome() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />

      {/* HERO with mesh gradient + product mockup */}
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 140px)', overflow: 'hidden' }}>
        <MeshBg />
        <GridBg />
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px 6px 8px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${T.border}`, borderRadius: 100, marginBottom: 40, fontSize: 13, backdropFilter: 'blur(10px)' }}>
            <span style={{ padding: '3px 10px', background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2})`, borderRadius: 100, fontSize: 11, fontWeight: 600 }}>NEW</span>
            <span style={{ color: T.fgDim }}>AI-powered automation for service businesses</span>
            <span style={{ color: T.fgMuted }}>→</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 1, margin: '0 0 32px 0' }}>
            Growth marketing,<br />
            <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>engineered.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto 40px', maxWidth: 640 }}>
            A digital marketing agency for service-based businesses. Websites, SEO, paid media, and content — measured, reported, and always improving.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80, padding: '0 8px' }}>
            <a href="/preview/a/contact" style={{ background: T.fg, color: T.bg, padding: 'clamp(12px, 2vw, 14px) clamp(18px, 3vw, 26px)', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: `0 0 30px ${T.glowPurple}` }}>Get started <span>→</span></a>
            <a href="/preview/a/services" style={{ background: 'rgba(255,255,255,0.05)', color: T.fg, padding: 'clamp(12px, 2vw, 14px) clamp(18px, 3vw, 26px)', borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: 'none', border: `1px solid ${T.border}`, backdropFilter: 'blur(10px)' }}>See how it works</a>
          </div>
          {/* Product mockup */}
          <BrainMockup />
        </div>
      </section>

      {/* Logo cloud */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.fgMuted, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>Powered by best-in-class infrastructure</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(24px, 5vw, 64px)', flexWrap: 'wrap', opacity: 0.5 }}>
            {['CLAUDE', 'GOOGLE ADS', 'VERCEL', 'SUPABASE', 'STRIPE', 'RESEND'].map(n => (
              <div key={n} style={{ fontFamily: 'Geist Mono, monospace', fontSize: 15, fontWeight: 600, letterSpacing: 1, color: T.fgDim }}>{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - feature grid with hover-glow */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent1}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>Services</div>
            <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, margin: '0 auto 20px', maxWidth: 900 }}>Four services, engineered as <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>one system</span>.</h2>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.fgDim, lineHeight: 1.6, margin: '0 auto', maxWidth: 640 }}>Every piece designed to work with the others. Every decision measured against the same question: is this making the business grow?</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
            {content.services.map(s => (
              <a key={s.tag} href="/preview/a/services" style={{ display: 'block', padding: 28, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent1}, ${T.accent2})`, opacity: 0.5 }} />
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: T.accent1, fontWeight: 600, marginBottom: 20 }}>{s.tag}</div>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, letterSpacing: -0.5 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.55, marginBottom: 20 }}>{s.headline}</div>
                <div style={{ fontSize: 13, color: T.accent2, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Learn more →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why - gradient panel */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)', borderRadius: 24, background: `linear-gradient(135deg, ${T.accent1}25, ${T.accent2}20, ${T.accent3}15)`, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent1}30, transparent 60%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, color: T.fg, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 32, opacity: 0.7 }}>Our operating principle</div>
            <blockquote style={{ fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.2, margin: 0, maxWidth: 1000 }}>
              Every business deserves <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>transparent communication</span>, accountable execution, and a partner invested in <span style={{ background: `linear-gradient(135deg, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>long-term success</span>.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>Industries</div>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, margin: 0, maxWidth: 700 }}>Built for <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>service businesses</span>.</h2>
            </div>
            <a href="/preview/a/industries" style={{ color: T.accent2, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>All industries →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: 12 }}>
            {content.industries.map(i => (
              <div key={i.name} style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, textAlign: 'center' }}>
                
                <div style={{ fontSize: 14, fontWeight: 500, color: T.fg }}>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, margin: '0 0 24px 0' }}>Let's <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build</span>.</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: T.fgDim, margin: '0 auto 40px', maxWidth: 560, lineHeight: 1.55 }}>Tell us about your business. We respond within one business day.</p>
          <a href="/preview/a/contact" style={{ background: T.fg, color: T.bg, padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: `0 0 40px ${T.glowPurple}` }}>Start a conversation →</a>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
