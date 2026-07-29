"use client"
import { groveTokens as T } from '../tokens.js'

export function GroveCTA({ config, headline, sub }) {
  const c = config
  return (
    <section style={{ background: T.colors.accent, padding: '96px 32px', textAlign: 'center', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: -1, color: T.colors.bgLight, margin: '0 0 20px 0', lineHeight: 1.1 }}>
          {headline || 'Ready when you need us.'}
        </h2>
        <p style={{ fontSize: 20, color: T.colors.bgLight, opacity: 0.9, marginBottom: 40, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
          {sub || 'Give us a call. We\'ll take care of the rest.'}
        </p>
        <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bgLight, color: T.colors.accent, textDecoration: 'none', padding: '20px 44px', fontFamily: T.fonts.body, fontSize: 22, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.warm, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>☎</span> {c.business.phone_display}
        </a>
      </div>
    </section>
  )
}

export function GrovePageHero({ eyebrow, title, sub }) {
  return (
    <section style={{ background: T.colors.bg, padding: '96px 32px 72px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'center' }}>
        {eyebrow && (
          <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontFamily: T.fonts.display, fontSize: 72, fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05, color: T.colors.text, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          {title}
        </h1>
        {sub && <p style={{ fontSize: 20, color: T.colors.textDim, lineHeight: 1.5, margin: '24px auto 0', maxWidth: 700 }}>{sub}</p>}
      </div>
    </section>
  )
}
