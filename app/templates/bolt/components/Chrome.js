"use client"
import { boltTokens } from '../tokens.js'
import { MobileMenu } from '../../../../lib/templates/shared/MobileMenu.js'

export function BoltHeader({ config, logo, T: Toverride }) {
  const T = Toverride || boltTokens
  const c = config
  return (
    <>
      {c.positioning.emergency_service && (
        <div style={{ background: T.colors.accent, color: T.colors.bg, padding: '8px 20px', textAlign: 'center', fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          <span style={{ animation: 'pulse 2s infinite' }}>●</span> 24/7 Emergency Service · Call <a href={`tel:${c.business.phone}`} style={{ color: T.colors.bg, textDecoration: 'underline', fontWeight: 700 }}>{c.business.phone_display}</a>
        </div>
      )}
      <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(12px, 2vw, 16px) clamp(16px, 4vw, 24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <a href="/templates/bolt" style={{ textDecoration: 'none' }}>
            {logo ? (
              <img src={logo} alt={c.business.display_name} style={{ maxHeight: 'clamp(32px, 7vw, 44px)', maxWidth: 'min(50vw, 240px)', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
            ) : (
              <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(16px, 4.5vw, 22px)", fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                {(() => {
                  const words = c.business.display_name.split(' ')
                  if (words.length <= 2) {
                    return <>
                      <span style={{ color: T.colors.accent }}>{words[0]}</span>{words.length > 1 && <span style={{ color: T.colors.text }}> {words.slice(1).join(' ')}</span>}
                    </>
                  }
                  const half = Math.ceil(words.length / 2)
                  const line1 = words.slice(0, half).join(' ')
                  const line2 = words.slice(half).join(' ')
                  return (
                    <>
                      <div style={{ color: T.colors.accent }}>{line1}</div>
                      <div style={{ color: T.colors.text }}>{line2}</div>
                    </>
                  )
                })()}
              </div>
            )}
          </a>
          <MobileMenu
            items={[
              { href: '/templates/bolt/services', label: 'Services' },
              { href: '/templates/bolt/service-areas', label: 'Areas' },
              { href: '/templates/bolt/about', label: 'About' },
              { href: '/templates/bolt/faq', label: 'FAQ' },
            ]}
            phoneNumber={c.business.phone}
            phoneDisplay={c.business.phone_display}
            accent={T.colors.accent}
            bg={T.colors.bg}
            text={T.colors.text}
            textDim={T.colors.textDim}
            borderColor={T.colors.border}
            fontFamily={T.fonts.display}
          />
        </div>
      </header>
    </>
  )
}

export function BoltFooter({ config, T: Toverride }) {
  const T = Toverride || boltTokens
  const c = config
  return (
    <footer style={{ background: T.colors.bgAlt, padding: '48px 24px 24px', borderTop: `1px solid ${T.colors.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(16px, 1.8vw, 22px)", fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
              <span style={{ color: T.colors.accent }}>{c.business.display_name.split(' ')[0]}</span> <span style={{ color: T.colors.text }}>{c.business.display_name.split(' ').slice(1).join(' ')}</span>
            </div>
            <div style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.6 }}>
              Family-owned since {c.business.established_year}.<br/>Licensed · Bonded · Insured
            </div>
          </div>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, color: T.colors.textDim }}>Contact</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}><a href={`tel:${c.business.phone}`} style={{ color: T.colors.accent, textDecoration: 'none', fontWeight: 700 }}>{c.business.phone_display}</a></div>
            <div style={{ fontSize: 14, color: T.colors.textDim, marginBottom: 8 }}>{c.business.email}</div>
            <div style={{ fontSize: 14, color: T.colors.textDim }}>{c.business.hours_display}</div>
          </div>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, color: T.colors.textDim }}>Services</div>
            {c.services.slice(0, 6).map(s => (
              <div key={s.slug} style={{ fontSize: 13, color: T.colors.textDim, marginBottom: 6 }}>
                <a href={`/templates/bolt/services/${s.slug}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{s.name}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, color: T.colors.textDim }}>Service Areas</div>
            {c.service_areas.slice(0, 6).map(a => (
              <div key={a} style={{ fontSize: 13, color: T.colors.textDim, marginBottom: 6 }}>{a}</div>
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
