"use client"
import { axisTokens as T } from '../tokens.js'

export function AxisHeader({ config }) {
  const c = config
  return (
    <header style={{ background: T.colors.bg, position: 'sticky', top: 0, zIndex: 40, borderBottom: `1px solid ${T.colors.border}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <a href="/templates/axis" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 400, color: T.colors.text, letterSpacing: -0.5 }}>
            {c.business.display_name}
          </div>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/templates/axis/services" style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0.1 }}>Services</a>
          <a href="/templates/axis/service-areas" style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0.1 }}>Areas</a>
          <a href="/templates/axis/about" style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0.1 }}>About</a>
          <a href="/templates/axis/faq" style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0.1 }}>FAQ</a>
          <div style={{ height: 20, width: 1, background: T.colors.border }} />
          <a href={`tel:${c.business.phone}`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 0.1 }}>
            {c.business.phone_display}
          </a>
          <a href="/templates/axis/contact" style={{ background: T.colors.text, color: T.colors.bg, textDecoration: 'none', padding: '10px 20px', fontFamily: T.fonts.body, fontSize: 14, fontWeight: 500 }}>
            Get a quote →
          </a>
        </nav>
      </div>
    </header>
  )
}

export function AxisFooter({ config }) {
  const c = config
  return (
    <footer style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: '96px 40px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 64, marginBottom: 80 }}>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 400, color: T.colors.textInverse, marginBottom: 20, letterSpacing: -0.5 }}>{c.business.display_name}</div>
            <div style={{ fontSize: 15, color: T.colors.textInverseDim, lineHeight: 1.6, maxWidth: 400 }}>
              {c.positioning.tagline}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600 }}>Contact</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}><a href={`tel:${c.business.phone}`} style={{ color: T.colors.textInverse, textDecoration: 'none' }}>{c.business.phone_display}</a></div>
            <div style={{ fontSize: 14, color: T.colors.textInverseDim }}>{c.business.email}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600 }}>Services</div>
            {c.services.slice(0, 5).map(s => (
              <div key={s.slug} style={{ fontSize: 14, marginBottom: 8 }}>
                <a href={`/templates/axis/services/${s.slug}`} style={{ color: T.colors.textInverseDim, textDecoration: 'none' }}>{s.name}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600 }}>Areas</div>
            {c.service_areas.slice(0, 5).map(a => (
              <div key={a} style={{ fontSize: 14, color: T.colors.textInverseDim, marginBottom: 8 }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 32, borderTop: `1px solid ${T.colors.borderDark}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.colors.textMuted }}>
          <div>© {new Date().getFullYear()} {c.business.legal_name}</div>
          <div>Licensed · Bonded · Insured</div>
        </div>
      </div>
    </footer>
  )
}
