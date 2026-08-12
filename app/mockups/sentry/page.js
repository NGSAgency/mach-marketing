import { SHeader, SFooter, sTokens as T, SERVICES, INDUSTRIES } from './shell.js'

export const metadata = { title: 'Sentry Solutions - Institutional-grade strategy for entrepreneurial businesses', robots: { index: false, follow: false } }

export default function SentryHome() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SHeader />

      {/* HERO */}
      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 160px) clamp(16px, 4vw, 32px) clamp(60px, 10vw, 120px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '-15%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '-10%', width: '40%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}08, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 8.5vw, 108px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0', maxWidth: 1100 }}>
            Institutional-grade <em style={{ fontStyle: 'italic', color: T.accent }}>strategy</em> for entrepreneurial businesses.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: '0 0 48px', maxWidth: 720 }}>
            More than a strategy consultant or CFO services firm. We're a growth advisory firm helping owners, investors, and entrepreneurs scale with the discipline and rigor typically reserved for institutional capital.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 80 }}>
            <a href="/mockups/sentry/contact" style={{ background: T.accent, color: T.navy, padding: '16px 28px', borderRadius: 4, fontSize: 15, fontWeight: 700, textDecoration: 'none', letterSpacing: 0.3 }}>Schedule a Strategy Call →</a>
            <a href="/mockups/sentry/services" style={{ background: T.panel, color: T.fg, padding: '16px 28px', borderRadius: 4, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: `1px solid ${T.borderStrong}` }}>Explore Services</a>
          </div>
          {/* Credibility bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 32, paddingTop: 48, borderTop: `1px solid ${T.border}` }}>
            {[
              { n: '$1B+', l: 'Capital deployed' },
              { n: '10+', l: 'Years advising' },
              { n: '$2M–50M', l: 'Client revenue range' },
              { n: '100%', l: 'Founder-focused' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 4vw, 44px)', color: T.accent, fontWeight: 500, lineHeight: 1, letterSpacing: -1, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: T.fgMuted, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 64, maxWidth: 900 }}>
            <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>Our Services</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>
              Six services. <em style={{ fontStyle: 'italic', color: T.accent }}>One partner.</em>
            </h2>
            <p style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 640 }}>
              From growth strategy to exit planning, we bring institutional-level expertise to every phase of your business.
            </p>
          </div>
          <div className="sentry-services-grid" style={{ display: 'grid', gap: 20 }}>
            {SERVICES.map(s => (
              <a key={s.tag} href={`/mockups/sentry/services/${s.slug}`} style={{ display: 'block', padding: 32, background: T.bgLift, border: `1px solid ${T.border}`, borderRadius: 12, textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent}, transparent)`, opacity: 0.6 }} />
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 13, color: T.accent, fontWeight: 500, marginBottom: 20, fontStyle: 'italic' }}>{s.tag}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, fontWeight: 500, letterSpacing: -0.5, marginBottom: 12 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.55, marginBottom: 20 }}>{s.short}</div>
                <div style={{ fontSize: 12, color: T.accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Learn more →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 64, maxWidth: 900 }}>
            <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>Who We Serve</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>
              Built for <em style={{ fontStyle: 'italic', color: T.accent }}>founders</em>, investors, and entrepreneurs.
            </h2>
            <p style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 700 }}>
              We work with owner-operated companies at pivotal moments — planning for growth, evaluating a transaction, or building for an exit.
            </p>
          </div>
          <div className="sentry-industries-grid" style={{ display: 'grid', gap: 16 }}>
            {INDUSTRIES.map((i, idx) => (
              <div key={i.name} style={{ padding: 'clamp(28px, 3vw, 40px)', background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent}, transparent)`, opacity: 0.4 }} />
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.accent, marginBottom: 16, fontWeight: 500 }}>0{idx + 1}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.5, marginBottom: 10 }}>{i.name}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.55 }}>{i.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 32 }}>Our Approach</div>
          <blockquote style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.25, margin: 0 }}>
            After a decade advising business owners and helping deploy more than <span style={{ color: T.accent, fontStyle: 'italic' }}>$1 billion in capital</span>, we saw firsthand that founders need a trusted partner — not just another consultant.
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)', borderRadius: 16, background: `linear-gradient(135deg, ${T.bgLift}, ${T.bgAlt})`, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}20, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>Schedule a <em style={{ fontStyle: 'italic', color: T.accent }}>complimentary</em> strategy call.</h2>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', color: T.fgDim, margin: '0 auto 40px', maxWidth: 640, lineHeight: 1.55 }}>An opportunity to discuss your business, your goals, and how our team can help you get where you're going.</p>
            <a href="/mockups/sentry/contact" style={{ background: T.accent, color: T.navy, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block', letterSpacing: 0.3 }}>Get in Touch →</a>
          </div>
        </div>
      </section>

      <SFooter />
    </div>
  )
}
