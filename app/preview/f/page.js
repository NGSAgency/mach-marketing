import { FHeader, FFooter, Eyebrow, fTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH - Digital marketing that drives measurable growth', robots: { index: false, follow: false } }

export default function FHome() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <FHeader />

      {/* Hero - framed layout */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 32px) 0' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <Eyebrow label="Kansas City × Boston" />
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 11vw, 128px)', fontWeight: 500, letterSpacing: -5, lineHeight: 0.9, margin: '0 0 40px 0' }}>
            Digital<br />
            <span style={{ display: 'inline-block', background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 24px)' }}>marketing</span><br />
            that <span style={{ fontStyle: 'italic' }}>works.</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 4vw, 64px)', marginTop: 64, alignItems: 'end' }}>
            <p style={{ fontSize: 'clamp(19px, 2.2vw, 26px)', color: T.inkDim, lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
              A modern digital marketing agency helping ambitious businesses grow through strategic web development, SEO, paid media, and content that delivers measurable results.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/preview/f/contact" style={{ background: T.ink, color: T.bg, padding: '18px 32px', borderRadius: 4, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Get started →</a>
              <a href="/preview/f/services" style={{ background: T.bg, color: T.ink, padding: '18px 32px', borderRadius: 4, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: `1.5px solid ${T.borderStrong}` }}>See services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services - moody cream block */}
      <section style={{ background: T.moody1, padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', marginTop: 'clamp(60px, 10vw, 120px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ marginBottom: 24 }}><Eyebrow label="What we do" /></div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 500, letterSpacing: -3, lineHeight: 1, margin: 0, maxWidth: 900 }}>Four services. <span style={{ color: T.accent }}>One growth engine.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
            {content.services.map(s => (
              <a key={s.tag} href="/preview/f/services" style={{ padding: 32, background: T.bg, borderRadius: 12, textDecoration: 'none', color: 'inherit', display: 'block', border: `2px solid ${T.ink}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 32 }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: T.accent, letterSpacing: -1 }}>{s.tag}</div>
                  <div style={{ fontSize: 18 }}>→</div>
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 12, letterSpacing: -0.5 }}>{s.name}</div>
                <div style={{ fontSize: 15, color: T.inkDim, lineHeight: 1.5 }}>{s.headline}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why - dark block */}
      <section style={{ background: T.moody2, color: T.bg, padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}><Eyebrow label="Why MACH" /></div>
          <blockquote style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(30px, 5.5vw, 60px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.15, margin: 0 }}>
            Every business deserves <span style={{ color: T.accent }}>transparent communication</span>, accountable execution, and a partner who is invested in <span style={{ color: T.accent }}>long-term success.</span>
          </blockquote>
        </div>
      </section>

      {/* Industries - ice block */}
      <section style={{ background: T.moody3, padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ marginBottom: 24 }}><Eyebrow label="Who we serve" /></div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 500, letterSpacing: -3, lineHeight: 1, margin: 0, maxWidth: 900 }}>Service businesses that <span style={{ fontStyle: 'italic' }}>show up.</span></h2>
            </div>
            <a href="/preview/f/industries" style={{ color: T.accent, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>See all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: 12 }}>
            {content.industries.slice(0, 8).map(i => (
              <div key={i.name} style={{ padding: '28px 20px', background: T.bg, borderRadius: 12, textAlign: 'center', border: `1.5px solid ${T.ink}` }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{i.icon}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600 }}>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - white with big accent */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}><Eyebrow label="Get started" /></div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 500, letterSpacing: -3.5, lineHeight: 1, margin: '0 0 40px 0' }}>
            <span style={{ background: T.accent, color: T.bg, padding: '0 clamp(12px, 2vw, 20px)' }}>Let's grow</span><br />together.
          </h2>
          <a href="/preview/f/contact" style={{ background: T.ink, color: T.bg, padding: '20px 40px', borderRadius: 4, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Start a conversation →</a>
        </div>
      </section>

      <FFooter />
    </div>
  )
}
