import { AHeader, AFooter, aTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH Digital Solutions', robots: { index: false, follow: false } }

export default function AHome() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AHeader />

      {/* Dateline + opening */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px) 0' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: T.accent, fontWeight: 600, marginBottom: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>Kansas City & Boston · Issue No. 001</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(48px, 10vw, 128px)', fontWeight: 300, letterSpacing: -5, lineHeight: 0.92, margin: '0 0 40px 0' }}>
            How service<br />businesses <em style={{ fontStyle: 'italic', color: T.accent, fontWeight: 400 }}>actually</em><br />win online.
          </h1>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(20px, 2.4vw, 28px)', color: T.inkDim, lineHeight: 1.5, margin: 0, maxWidth: 780, fontWeight: 300 }}>
            <em style={{ color: T.accent, fontStyle: 'italic' }}>A working thesis</em> — from a digital marketing agency for businesses that would rather grow than guess.
          </p>
        </div>
      </section>

      {/* Chapter I - The Problem */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 40px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.inkMuted, marginBottom: 24, letterSpacing: 1 }}>Chapter I</div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.1, margin: '0 0 32px 0' }}>Most agencies don't understand service businesses.</h2>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 22px)', color: T.inkDim, lineHeight: 1.7, columns: 'clamp(280px, 100%, 500px)', columnGap: 48 }}>
            <p style={{ margin: '0 0 20px 0' }}>They optimize for clicks. You need calls. They talk about "engagement." You need customers who show up. Their case studies feature SaaS startups. Yours is a family business that's been in operation for two decades.</p>
            <p style={{ margin: 0 }}>Home services, landscaping, pest control, window cleaning — these are different animals. The buyer's journey is compressed. Trust is earned locally. And the difference between page one and page three is the difference between busy and broke.</p>
          </div>
        </div>
      </section>

      {/* Pull quote - accent block */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px)' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', borderLeft: `4px solid ${T.accent}`, paddingLeft: 32 }}>
          <blockquote style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 300, letterSpacing: -1, lineHeight: 1.25, margin: 0, color: T.ink }}>
            "Every business deserves transparent communication, accountable execution, and a partner who is invested in its long-term success."
          </blockquote>
          <div style={{ fontSize: 12, color: T.inkMuted, marginTop: 24, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif' }}>— Our operating principle</div>
        </div>
      </section>

      {/* Chapter II - What we do */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 40px) clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ maxWidth: 780, marginBottom: 80 }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.inkMuted, marginBottom: 24, letterSpacing: 1 }}>Chapter II</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.1, margin: '0 0 32px 0' }}>Four services, engineered to work as one.</h2>
            <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(19px, 2.2vw, 22px)', color: T.inkDim, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
              We don't sell packages. We build growth engines. Every service is designed to strengthen the others — and every decision is measured against the same question: <em>is this making the business grow?</em>
            </p>
          </div>
          <div style={{ borderTop: `2px solid ${T.borderStrong}` }}>
            {content.services.map((s, idx) => (
              <a key={s.tag} href="/preview/a/services" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 48px)', padding: 'clamp(32px, 5vw, 48px) 0', borderBottom: `1px solid ${T.border}`, textDecoration: 'none', color: 'inherit', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', color: T.accent, fontWeight: 400, letterSpacing: -1, marginBottom: 8 }}>{s.tag}</div>
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 500, letterSpacing: -1, lineHeight: 1.1 }}>{s.name}</div>
                </div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(17px, 1.8vw, 20px)', color: T.inkDim, lineHeight: 1.6, fontWeight: 400 }}>{s.headline}</div>
                <div style={{ fontSize: 13, color: T.accent, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'right' }}>Read →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter III - Numbers as narrative */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 40px)', background: T.bgAlt }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ maxWidth: 780, marginBottom: 80 }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.inkMuted, marginBottom: 24, letterSpacing: 1 }}>Chapter III</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.1, margin: 0 }}>By the numbers.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 'clamp(32px, 4vw, 64px)' }}>
            {[
              { n: '4', d: 'services, built to compound' },
              { n: '2', d: 'coasts, one system' },
              { n: '8+', d: 'industries served' },
              { n: '∞', d: 'growth ceiling' },
            ].map((s, i) => (
              <div key={i} style={{ borderTop: `1px solid ${T.borderStrong}`, paddingTop: 24 }}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(64px, 12vw, 128px)', color: T.accent, lineHeight: 0.9, letterSpacing: -6, fontWeight: 300, marginBottom: 16 }}>{s.n}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(15px, 1.5vw, 17px)', color: T.inkDim, lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries teaser as ticker */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px)' }}>
        <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.1, margin: 0, maxWidth: 700 }}>Who this is <em style={{ fontStyle: 'italic', color: T.accent }}>for</em> —</h2>
            <a href="/preview/a/industries" style={{ fontSize: 13, color: T.accent, fontWeight: 600, textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase' }}>All industries →</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {content.industries.map(i => (
              <div key={i.name} style={{ padding: '10px 20px', border: `1.5px solid ${T.ink}`, fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 400, background: T.bg }}>{i.icon} {i.name}</div>
            ))}
            <div style={{ padding: '10px 20px', border: `1.5px solid ${T.accent}`, background: T.accent, color: T.bg, fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 500 }}>+ Yours?</div>
          </div>
        </div>
      </section>

      {/* Closing chapter - big statement */}
      <section style={{ padding: 'clamp(100px, 16vw, 200px) clamp(16px, 4vw, 40px)', background: T.ink, color: T.bg }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.accent, marginBottom: 40, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>The last word</div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(40px, 9vw, 112px)', fontWeight: 300, letterSpacing: -5, lineHeight: 0.95, margin: '0 0 64px 0' }}>
            You built the business.<br />
            <em style={{ fontStyle: 'italic', color: T.accent }}>Let us build the growth.</em>
          </h2>
          <a href="/preview/a/contact" style={{ background: T.bg, color: T.ink, padding: '20px 40px', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Inter, system-ui, sans-serif' }}>Start a conversation →</a>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
