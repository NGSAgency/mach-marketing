import { BHeader, BFooter, DashboardMockup, LogoMarquee, bTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH - Growth marketing for service businesses', robots: { index: false, follow: false } }

export default function BHome() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BHeader />

      {/* HERO - side-by-side */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}25, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '-15%', width: '50%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${T.purple}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, marginBottom: 32, fontSize: 13, fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent }} /> New: AI-powered automation for service businesses
            </div>
            <h1 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 800, letterSpacing: -4, lineHeight: 0.98, margin: '0 0 24px 0' }}>
              Grow home service businesses <span style={{ color: T.accent }}>faster.</span>
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.inkDim, lineHeight: 1.5, margin: '0 0 40px', maxWidth: 560 }}>
              The complete marketing platform for HVAC, plumbing, roofing, electrical, and every service-based business. Websites, SEO, paid media, content — measured and always improving.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <a href="/preview/b/contact" style={{ background: T.ink, color: T.bg, padding: '16px 28px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: `0 8px 24px rgba(15,14,12,0.15)` }}>Get started free →</a>
              <a href="/preview/b/services" style={{ background: 'transparent', color: T.ink, padding: '16px 28px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: `1.5px solid ${T.border}` }}>See how it works</a>
            </div>
            {/* Trust stat row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))', gap: 24, paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
              {[
                { n: '142%', l: 'Avg lead lift' },
                { n: '24/7', l: 'Coverage' },
                { n: '<1d', l: 'Response' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, letterSpacing: -1, fontFamily: 'Inter Tight, Inter, sans-serif' }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: T.inkMuted, marginTop: 4, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* Marquee industries */}
      <LogoMarquee />

      {/* Bento grid services */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-block', padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>Services</div>
              <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0, maxWidth: 800 }}>Everything you need. <span style={{ color: T.accent }}>Nothing you don't.</span></h2>
            </div>
            <a href="/preview/b/services" style={{ color: T.ink, fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '10px 20px', border: `1.5px solid ${T.border}`, borderRadius: 100 }}>All services →</a>
          </div>
          {/* Bento layout - featured + smaller cards */}
          <div className="bento-grid-b" style={{ display: 'grid', gap: 16 }}>
            <div className="span-2" style={{ minHeight: 320, padding: 40, background: `linear-gradient(135deg, ${T.ink} 0%, #2a2620 100%)`, color: T.bg, borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}30, transparent 60%)`, filter: 'blur(60px)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 20 }}>{content.services[0].tag} · {content.services[0].name}</div>
                <h3 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.15, margin: '0 0 20px 0' }}>{content.services[0].headline}</h3>
                <p style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6, marginBottom: 32, maxWidth: 500 }}>Modern, responsive websites built to convert. Fast, secure, and scalable — designed for growth.</p>
                <a href="/preview/b/services" style={{ color: T.accent, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Learn more →</a>
              </div>
            </div>
            <div style={{ padding: 32, background: T.accentSoft, borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, color: T.accentDim, marginBottom: 20 }}>{content.services[1].tag} · SEO</div>
              <h3 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: -1, lineHeight: 1.15, margin: '0 0 16px 0' }}>{content.services[1].headline}</h3>
              <p style={{ fontSize: 14, color: T.inkDim, lineHeight: 1.55, margin: 0 }}>Sustainable organic growth that drives qualified traffic.</p>
            </div>
            <div style={{ padding: 32, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 20 }}>{content.services[2].tag} · Paid Media</div>
              <h3 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: -1, lineHeight: 1.15, margin: '0 0 16px 0' }}>{content.services[2].headline}</h3>
              <p style={{ fontSize: 14, color: T.inkDim, lineHeight: 1.55, margin: 0 }}>Measurable returns from Google, Meta, and other leading platforms.</p>
            </div>
            <div className="span-2" style={{ padding: 40, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 32, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, color: T.accentDim, marginBottom: 20 }}>{content.services[3].tag} · Content</div>
                <h3 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: -1, lineHeight: 1.15, margin: '0 0 12px 0' }}>{content.services[3].headline}</h3>
                <p style={{ fontSize: 14, color: T.inkDim, lineHeight: 1.55, margin: 0 }}>Strategic content that educates, builds credibility, and drives action.</p>
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {['Blog articles', 'Landing pages', 'Service page copy'].map(t => (
                  <div key={t} style={{ padding: '10px 14px', background: T.bg, borderRadius: 8, fontSize: 13, fontWeight: 500, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: T.green }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big stat panel */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px)', background: T.bgDark, color: T.bg, borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}30, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: `${T.accent}20`, color: T.accent, borderRadius: 100, fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 24, textTransform: 'uppercase' }}>Why MACH</div>
            <blockquote style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.2, margin: '0 0 48px 0', maxWidth: 1100 }}>
              Every business deserves <span style={{ color: T.accent }}>transparent communication</span>, accountable execution, and a partner invested in <span style={{ color: T.accent }}>long-term success</span>.
            </blockquote>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {[
                { n: '4', l: 'Core services' },
                { n: '2', l: 'Coasts, one team' },
                { n: '8+', l: 'Industries served' },
                { n: '100%', l: 'Reporting transparency' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 800, letterSpacing: -1.5, color: T.accent, fontFamily: 'Inter Tight, Inter, sans-serif' }}>{s.n}</div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries grid */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: T.accentSoft, color: T.accentDim, borderRadius: 100, fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>Industries</div>
            <h2 style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: '0 auto', maxWidth: 900 }}>Built for <span style={{ color: T.accent }}>service businesses</span>.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 12 }}>
            {content.industries.map(i => (
              <div key={i.name} style={{ padding: 24, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, textAlign: 'center' }}>
                
                <div style={{ fontSize: 15, fontWeight: 600, color: T.ink }}>{i.name}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="/preview/b/industries" style={{ color: T.accentDim, fontSize: 15, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4 }}>Don't see yours? Inquire to find out →</a>
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  )
}
