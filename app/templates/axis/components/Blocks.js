"use client"
import { axisTokens as T } from '../tokens.js'

export function AxisCTA({ config, headline, sub }) {
  const c = config
  return (
    <section style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: '160px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 80, fontWeight: 400, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0', color: T.colors.textInverse }}>
          {headline || <>Ready to <em style={{ fontStyle: 'italic' }}>get started</em>?</>}
        </h2>
        <p style={{ fontSize: 20, color: T.colors.textInverseDim, marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
          {sub || 'Reach us anytime for a free quote or urgent service.'}
        </p>
        <div style={{ display: 'inline-flex', gap: 16 }}>
          <a href={`tel:${c.business.phone}`} style={{ background: T.colors.textInverse, color: T.colors.text, textDecoration: 'none', padding: '18px 36px', fontFamily: T.fonts.body, fontSize: 16, fontWeight: 500 }}>
            Call {c.business.phone_display} →
          </a>
          <a href="/templates/axis/contact" style={{ background: 'transparent', color: T.colors.textInverse, textDecoration: 'none', padding: '18px 36px', fontFamily: T.fonts.body, fontSize: 16, fontWeight: 500, border: `1px solid ${T.colors.borderDark}` }}>
            Get a quote
          </a>
        </div>
      </div>
    </section>
  )
}

export function AxisPageHero({ eyebrow, title, sub }) {
  return (
    <section style={{ background: T.colors.bg, padding: '160px 40px 96px', borderBottom: `1px solid ${T.colors.border}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {eyebrow && (
          <div style={{ fontSize: 11, color: T.colors.textDim, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32 }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontFamily: T.fonts.display, fontSize: 120, fontWeight: 400, letterSpacing: -5, lineHeight: 0.95, margin: 0, color: T.colors.text, maxWidth: 1200 }}>
          {title}
        </h1>
        {sub && <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '40px 0 0 0', maxWidth: 700 }}>{sub}</p>}
      </div>
    </section>
  )
}
