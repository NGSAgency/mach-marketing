import { CHeader, CFooter, Statement, cTokens as T } from './shell.js'
import { content } from '../../../lib/site-content/data.js'

export const metadata = { title: 'MACH', robots: { index: false, follow: false } }

export default function CHome() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />

      {/* Opening statement */}
      <section style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px) clamp(40px, 8vw, 96px)', borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 32 }}>Est. 2024 · Kansas City × Boston</div>
          <h1 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(64px, 18vw, 300px)', textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.85, margin: 0, wordBreak: 'break-word' }}>
            Grow<span style={{ color: T.accent }}>.</span>
          </h1>
          <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(24px, 4vw, 44px)', color: T.inkDim, lineHeight: 1.35, margin: '48px 0 0 0', maxWidth: 900, fontWeight: 300 }}>
            A digital marketing agency for service-based businesses that would rather grow than guess.
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 64, flexWrap: 'wrap' }}>
            <a href="/preview/c/contact" style={{ background: T.ink, color: T.bg, padding: '20px 40px', textDecoration: 'none', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Start →</a>
            <a href="/preview/c/services" style={{ color: T.ink, padding: '20px 40px', textDecoration: 'none', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', border: `2px solid ${T.ink}` }}>What we do</a>
          </div>
        </div>
      </section>

      {/* Statement 01 - Belief */}
      <Statement
        number="01"
        kicker="We believe"
        statement={<>Every business<br />deserves <span style={{ color: T.accent }}>proof</span>.</>}
        sub="Not clicks. Not impressions. Not vanity metrics. Real customers, measurable results, and a partner who's accountable for both."
      />

      {/* Services list - each huge */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 48px)', background: T.bgAlt, borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 48 }}>What we do</div>
          {content.services.map((s, idx) => (
            <a key={s.tag} href="/preview/c/services" style={{ display: 'block', padding: 'clamp(24px, 4vw, 40px) 0', borderTop: `2px solid ${T.ink}`, textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 24, alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 2.5vw, 24px)', color: T.accent }}>{s.tag} /</div>
                <div style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(36px, 7vw, 88px)', textTransform: 'uppercase', letterSpacing: -1, lineHeight: 0.95 }}>{s.name}</div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.ink }}>Read →</div>
              </div>
            </a>
          ))}
          <div style={{ borderTop: `2px solid ${T.ink}` }} />
        </div>
      </section>

      {/* Statement 02 - dark accent */}
      <Statement
        dark
        number="02"
        kicker="We work with"
        statement={<>Service<br />businesses.<br /><span style={{ color: T.accent, fontStyle: 'italic', fontFamily: 'Instrument Serif, Georgia, serif', textTransform: 'none', fontWeight: 400 }}>Full stop.</span></>}
        sub="Landscaping, pest control, HVAC, plumbing, window cleaning, and every service-based industry in between. If customers search for what you do, we can help."
      />

      {/* Industry ticker */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', background: T.accent, color: T.ink, borderBottom: `2px solid ${T.ink}`, overflow: 'hidden' }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center' }}>
          {content.industries.map((i, idx) => (
            <div key={i.name} style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 64px)', textTransform: 'uppercase', letterSpacing: -1, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>{i.name}</span>
              {idx < content.industries.length - 1 && <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(24px, 4vw, 48px)', color: T.ink }}>+</span>}
            </div>
          ))}
          <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 36px)', color: T.ink }}>and yours?</div>
        </div>
      </section>

      {/* Statement 03 - final */}
      <Statement
        number="03"
        kicker="Then"
        statement={<>You built the<br /><span style={{ color: T.accent }}>business</span>. Let us<br />build the growth.</>}
        note="Get in touch"
      />

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <a href="/preview/c/contact" style={{ background: T.ink, color: T.bg, padding: '24px 48px', textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block' }}>Start a conversation →</a>
      </section>

      <CFooter />
    </div>
  )
}
