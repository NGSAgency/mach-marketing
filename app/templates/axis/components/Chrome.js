"use client"
import { axisTokens } from '../tokens.js'
import { MobileMenu } from '../../../../lib/templates/shared/MobileMenu.js'

export function AxisHeader({ config, logo, T: Toverride }) {
  const T = Toverride || axisTokens
  const c = config
  return (
    <header style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 40, borderBottom: `1px solid ${T.colors.borderLight}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <a href="/templates/axis" style={{ textDecoration: 'none' }}>
          {logo ? (
            <img src={logo} alt={c.business.display_name} style={{ maxHeight: 'clamp(28px, 5vw, 40px)', maxWidth: 'min(50vw, 200px)', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
          ) : (
            <div style={{ fontSize: 20, fontWeight: 700, color: T.colors.text, letterSpacing: -0.5 }}>
              {c.business.display_name}
            </div>
          )}
        </a>
        <MobileMenu
          items={[
            { href: '/templates/axis/services', label: 'Services' },
            { href: '/templates/axis/service-areas', label: 'Areas' },
            { href: '/templates/axis/about', label: 'About' },
            { href: '/templates/axis/faq', label: 'FAQ' },
          ]}
          phoneNumber={c.business.phone}
          phoneDisplay={c.business.phone_display}
          accent={T.colors.accent}
          bg={T.colors.bg}
          text={T.colors.text}
          textDim={T.colors.textDim}
          borderColor={T.colors.border}
          fontFamily={T.fonts.body}
        />
      </div>
    </header>
  )
}

export function AxisFooter({ config, T: Toverride }) {
  const T = Toverride || axisTokens
  const c = config
  return (
    <footer style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: '80px 32px 32px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: T.colors.textInverse, marginBottom: 16, letterSpacing: -0.5 }}>{c.business.display_name}</div>
            <div style={{ fontSize: 15, color: T.colors.textInverseDim, lineHeight: 1.6, maxWidth: 380 }}>
              {c.positioning.tagline}
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 600, borderRadius: T.radius.full }}>
                {c.business.phone_display}
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20, fontWeight: 700 }}>Services</div>
            {c.services.slice(0, 6).map(s => (
              <div key={s.slug} style={{ fontSize: 14, marginBottom: 10 }}>
                <a href={`/templates/axis/services/${s.slug}`} style={{ color: T.colors.textInverseDim, textDecoration: 'none' }}>{s.name}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20, fontWeight: 700 }}>Areas</div>
            {c.service_areas.slice(0, 6).map(a => (
              <div key={a} style={{ fontSize: 14, color: T.colors.textInverseDim, marginBottom: 10 }}>{a}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20, fontWeight: 700 }}>Contact</div>
            <div style={{ fontSize: 14, marginBottom: 10, color: T.colors.textInverseDim }}>{c.business.email}</div>
            <div style={{ fontSize: 14, marginBottom: 10, color: T.colors.textInverseDim, lineHeight: 1.5 }}>{c.business.address_line}</div>
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
