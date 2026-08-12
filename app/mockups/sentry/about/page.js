import { SHeader, SFooter, sTokens as T } from '../shell.js'

export const metadata = { title: 'About - Sentry Solutions', robots: { index: false, follow: false } }

export default function SentryAbout() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <SHeader />

      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '-10%', width: '50%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>About</div>
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 40px 0' }}>
            A trusted partner for <em style={{ fontStyle: 'italic', color: T.accent }}>ambitious founders</em>.
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 64px)' }}>
            <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.6, margin: 0 }}>
              After spending a decade advising business owners and helping deploy more than <span style={{ color: T.accent, fontStyle: 'italic' }}>$1 billion in capital</span>, we saw firsthand that founders need a trusted partner — one who brings the discipline of institutional finance to the realities of running a growing business.
            </p>
            <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 24px)', color: T.fgDim, lineHeight: 1.6, margin: 0 }}>
              Sentry Solutions was built to fill that gap: a growth advisory firm that combines the strategic thinking of top-tier consulting with the operational expertise of a seasoned CFO, delivered as a long-term partner to the businesses we serve.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 64, maxWidth: 900 }}>
            <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>What We Believe</div>
            <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
              Principles that guide <em style={{ fontStyle: 'italic', color: T.accent }}>every engagement</em>.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 24 }}>
            {[
              { t: 'Institutional Discipline', d: 'The same rigor and process used by the largest funds — applied to entrepreneurial businesses.' },
              { t: 'Long-term Partnership', d: 'We measure success in years, not quarters. Our best clients stay with us as they scale.' },
              { t: 'Transparent Communication', d: 'No jargon. No hidden math. Clear reporting so you always know where you stand.' },
              { t: 'Founder-First', d: 'Every recommendation is made with the founder\'s long-term goals — not our billable hours — in mind.' },
            ].map((v, i) => (
              <div key={i} style={{ padding: 32, background: T.bgLift, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 32, color: T.accent, fontWeight: 500, marginBottom: 16 }}>0{i + 1}</div>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.5, marginBottom: 12 }}>{v.t}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.6 }}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 64, maxWidth: 700 }}>
            <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>By the Numbers</div>
            <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
              A decade of <em style={{ fontStyle: 'italic', color: T.accent }}>proven results</em>.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 32, borderTop: `1px solid ${T.borderStrong}`, paddingTop: 40 }}>
            {[
              { n: '$1B+', l: 'Capital deployed across client transactions' },
              { n: '10+', l: 'Years of institutional advisory experience' },
              { n: '$2M–$50M', l: 'Client revenue range we specialize in' },
              { n: '100%', l: 'Focus on founder-led businesses' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(56px, 8vw, 88px)', color: T.accent, fontWeight: 400, lineHeight: 0.9, letterSpacing: -3, marginBottom: 16 }}>{s.n}</div>
                <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 32px 0' }}>Let's <em style={{ fontStyle: 'italic', color: T.accent }}>talk</em>.</h2>
          <a href="/mockups/sentry/contact" style={{ background: T.accent, color: T.navy, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block', letterSpacing: 0.3 }}>Get in Touch →</a>
        </div>
      </section>

      <SFooter />
    </div>
  )
}
