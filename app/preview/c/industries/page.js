import { CHeader, CFooter, Statement, cTokens as T } from '../shell.js'
import { content } from '../../../../lib/site-content/data.js'

export const metadata = { title: 'Industries - MACH', robots: { index: false, follow: false } }

export default function CIndustries() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CHeader />
      <section style={{ padding: 'clamp(60px, 12vw, 160px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, color: T.accent, marginBottom: 32 }}>Who this is for</div>
          <h1 style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(72px, 16vw, 240px)', textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.85, margin: 0, wordBreak: 'break-word' }}>Service<br />businesses<span style={{ color: T.accent }}>.</span></h1>
        </div>
      </section>
      <section style={{ padding: 'clamp(0, 0, 0)', background: T.bg }}>
        {content.industries.map((i, idx) => (
          <div key={i.name} style={{ padding: 'clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px)', borderBottom: `2px solid ${T.ink}` }}>
            <div style={{ maxWidth: 'min(1600px, 100%)', margin: '0 auto', display: 'flex', alignItems: 'baseline', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(32px, 5vw, 56px)', color: T.accent, fontWeight: 300, minWidth: 80 }}>{String(idx + 1).padStart(2, '0')}</div>
              <div style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 'clamp(56px, 12vw, 160px)', textTransform: 'uppercase', letterSpacing: -2, lineHeight: 0.9, flex: 1 }}>{i.name}</div>
              <div style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>{i.icon}</div>
            </div>
          </div>
        ))}
      </section>
      <Statement
        dark
        kicker="Don't see yours?"
        statement={<><span style={{ color: T.accent, fontStyle: 'italic', fontFamily: 'Instrument Serif, Georgia, serif', textTransform: 'none', fontWeight: 400 }}>Inquire</span><br />to find<br />out.</>}
        sub="Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help."
      />
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <a href="/preview/c/contact" style={{ background: T.ink, color: T.bg, padding: '24px 48px', textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block' }}>Tell us about your business →</a>
      </section>
      <CFooter />
    </div>
  )
}
