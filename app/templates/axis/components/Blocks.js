"use client"
import { axisTokens } from '../tokens.js'

export function AxisCTA({ config, headline, sub , T: Toverride }) {
  const T = Toverride || axisTokens
  const c = config
  return (
    <section style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
      <div style={{ maxWidth: 'min(1080px, 100%)', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: "clamp(28px, 5.5vw, 64px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 20px 0', color: T.colors.textInverse }}>
          {headline || 'Ready to book?'}
        </h2>
        <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", color: T.colors.textInverseDim, marginBottom: 40, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
          {sub || 'Call now for immediate service or request a free quote online.'}
        </p>
        <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.glow, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Call {c.business.phone_display}
          </a>
          <a href="/templates/axis/contact" style={{ background: T.colors.bgInverseAlt, color: T.colors.textInverse, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, border: `1px solid ${T.colors.borderDark}` }}>
            Get a free quote →
          </a>
        </div>
      </div>
    </section>
  )
}

export function AxisPageHero({ eyebrow, title, sub, T: Toverride }) {
  const T = Toverride || axisTokens
  return (
    <section style={{ background: T.colors.bg, padding: '96px 32px 64px', borderBottom: `1px solid ${T.colors.borderLight}` }}>
      <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', textAlign: 'center' }}>
        {eyebrow && (
          <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontSize: "clamp(30px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0, color: T.colors.text, maxWidth: 'min(900px, 100%)', marginLeft: 'auto', marginRight: 'auto' }}>
          {title}
        </h1>
        {sub && <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: T.colors.textDim, lineHeight: 1.5, margin: '24px auto 0', maxWidth: 680 }}>{sub}</p>}
      </div>
    </section>
  )
}
