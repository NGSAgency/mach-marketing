"use client"
import { groveTokens } from '../tokens.js'
import { MobileMenu } from '../../../../lib/templates/shared/MobileMenu.js'

export function GroveHeader({ config, logo, T: Toverride }) {
  const T = Toverride || groveTokens
  const c = config
  return (
    <>
      {c.positioning.emergency_service && (
        <div style={{ background: T.colors.accent, color: T.colors.bgLight, padding: '10px 20px', textAlign: 'center', fontSize: 13, fontWeight: 500, letterSpacing: 0.3 }}>
          24/7 emergency service · Call <a href={`tel:${c.business.phone}`} style={{ color: T.colors.bgLight, textDecoration: 'underline', fontWeight: 700 }}>{c.business.phone_display}</a>
        </div>
      )}
      <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <a href="/templates/grove" style={{ textDecoration: 'none', flex: '0 1 auto', minWidth: 0, overflow: 'hidden' }}>
            {logo ? (
              <img src={logo} alt={c.business.display_name} style={{ maxHeight: 'clamp(36px, 8vw, 48px)', maxWidth: 'min(50vw, 240px)', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
            ) : (
              <div style={{ fontFamily: T.fonts.display, fontWeight: 700, color: T.colors.text, letterSpacing: -0.5, maxWidth: 'min(35vw, 145px)', minWidth: 0, flex: '0 1 auto' }}>
                <div style={{ fontSize: "clamp(16px, 3.5vw, 22px)", lineHeight: 1.15, wordBreak: 'break-word' }}>
                  {c.business.display_name}
                </div>
                {c.business.family_owned && (
                  <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", fontFamily: T.fonts.body, fontWeight: 500, color: T.colors.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Family-owned · Est. {c.business.established_year}
                  </div>
                )}
              </div>
            )}
          </a>
          <MobileMenu
            items={[
              { href: '/templates/grove/services', label: 'Services' },
              { href: '/templates/grove/service-areas', label: 'Service Areas' },
              { href: '/templates/grove/about', label: 'About' },
              { href: '/templates/grove/faq', label: 'FAQ' },
            ]}
            phoneNumber={c.business.phone}
            phoneDisplay={c.business.phone_display}
            accent={T.colors.accent}
            bg={T.colors.bgLight}
            text={T.colors.text}
            textDim={T.colors.textDim}
            borderColor={T.colors.border}
            fontFamily={T.fonts.body}
          />
        </div>
      </header>
    </>
  )
}

export function GroveFooter({ config, T: Toverride }) {
  const T = Toverride || groveTokens
  const c = config
  return (
    <footer style={{ background: T.colors.bgAlt, padding: '64px 32px 32px', borderTop: `1px solid ${T.colors.border}` }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 700, color: T.colors.text, marginBottom: 12, letterSpacing: -0.5 }}>
              {c.business.display_name}
            </div>
            <div style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.7 }}>
              Family-owned since {c.business.established_year}.<br/>
              Licensed, bonded, and insured.<br/>
              Serving {c.primary_service_area} for {c.business.years_in_business}+ years.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, color: T.colors.text, marginBottom: 16, letterSpacing: 0.5, textTransform: 'uppercase' }}>Contact</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}><a href={`tel:${c.business.phone}`} style={{ color: T.colors.accent, textDecoration: 'none', fontWeight: 600 }}>{c.business.phone_display}</a></div>
            <div style={{ fontSize: 14, color: T.colors.textDim, marginBottom: 8 }}>{c.business.email}</div>
            <div style={{ fontSize: 13, color: T.colors.textDim, lineHeight: 1.6 }}>{c.business.hours_display}</div>
          </div>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, color: T.colors.text, marginBottom: 16, letterSpacing: 0.5, textTransform: 'uppercase' }}>Services</div>
            {c.services.slice(0, 6).map(s => (
              <div key={s.slug} style={{ fontSize: 14, marginBottom: 8 }}>
                <a href={`/templates/grove/services/${s.slug}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{s.name}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, color: T.colors.text, marginBottom: 16, letterSpacing: 0.5, textTransform: 'uppercase' }}>Service Areas</div>
            {c.service_areas.slice(0, 6).map(a => (
              <div key={a} style={{ fontSize: 14, color: T.colors.textDim, marginBottom: 8 }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${T.colors.border}`, fontSize: 12, color: T.colors.textMuted, textAlign: 'center' }}>
          © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
