"use client"
import { boltTokens } from '../tokens.js'

export function BoltCTA({ config, headline = "Need Service? Call Now.", sub = "24/7 emergency service. Free estimates. Financing available." , T: Toverride }) {
  const T = Toverride || boltTokens
  const c = config
  return (
    <section style={{ background: T.colors.accent, padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', color: T.colors.bg, margin: '0 0 20px 0', lineHeight: 1 }}>
          {headline}
        </h2>
        <p style={{ fontSize: 20, color: T.colors.bg, opacity: 0.85, marginBottom: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          {sub}
        </p>
        <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bg, color: T.colors.accent, textDecoration: 'none', padding: '24px 48px', fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, boxShadow: T.shadow.heavy, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 32 }}>☎</span> {c.business.phone_display}
        </a>
      </div>
    </section>
  )
}

export function BoltPageHero({ eyebrow, title, sub, T: Toverride }) {
  const T = Toverride || boltTokens
  return (
    <section style={{ background: T.colors.bg, padding: '80px 24px 60px', borderBottom: `4px solid ${T.colors.accent}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {eyebrow && <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>{eyebrow}</div>}
        <h1 style={{ fontFamily: T.fonts.display, fontSize: 72, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95, color: T.colors.text }}>
          {title}
        </h1>
        {sub && <p style={{ fontSize: 20, color: T.colors.textDim, lineHeight: 1.5, margin: '20px 0 0 0', maxWidth: 800 }}>{sub}</p>}
      </div>
    </section>
  )
}
