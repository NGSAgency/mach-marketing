import { boltTokens } from '../../../templates/bolt/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildLocalBusinessSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'

export default function BoltHome({ config: c }) {
  const brand = {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const categories = [...new Set((c.services || []).map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        {/* Emergency bar */}
        {c.positioning?.emergency_service && (
          <div style={{ background: T.colors.accent, color: T.colors.bg, padding: '8px 20px', textAlign: 'center', fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            <span>●</span> 24/7 Emergency Service · Call <a href={`tel:${c.business.phone}`} style={{ color: T.colors.bg, textDecoration: 'underline', fontWeight: 700 }}>{c.business.phone_display}</a>
          </div>
        )}

        {/* Header */}
        <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            {logo ? (
              <img src={logo} alt={c.business.display_name} style={{ maxHeight: 44, width: 'auto' }} />
            ) : (
              <div style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
                <span style={{ color: T.colors.accent }}>{c.business.display_name.split(' ')[0]}</span> <span style={{ color: T.colors.text }}>{c.business.display_name.split(' ').slice(1).join(' ')}</span>
              </div>
            )}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '10px 20px', fontFamily: T.fonts.display, fontSize: 18, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm }}>
              ☎ {c.business.phone_display}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section style={{ background: T.colors.bg, padding: '60px 24px 80px', borderBottom: `4px solid ${T.colors.accent}`, textAlign: 'center' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6vw, 68px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              {c.positioning?.tagline || c.business.display_name}
            </h1>
            {c.positioning?.subtagline && (
              <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.5, margin: '0 0 32px 0' }}>{c.positioning.subtagline}</p>
            )}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '20px 32px', fontFamily: T.fonts.display, fontSize: 24, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>☎</span> Call {c.business.phone_display}
            </a>
          </div>
        </section>

        {/* Services */}
        {categories.length > 0 && (
          <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
            <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: '0 0 40px 0', textAlign: 'center', lineHeight: 1 }}>
                Our <span style={{ color: T.colors.accent }}>Services</span>
              </h2>
              {categories.map(cat => (
                <div key={cat} style={{ marginBottom: 48 }}>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>{cat}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {c.services.filter(s => s.category === cat).map(svc => (
                      <div key={svc.slug} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm }}>
                        <div style={{ color: T.colors.accent, marginBottom: 16 }}><ServiceIcon name={svc.icon} size={36} /></div>
                        <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{svc.name}</div>
                        <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{svc.short}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ background: T.colors.accent, padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', color: T.colors.bg, margin: '0 0 20px 0' }}>
              Need Service?
            </h2>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bg, color: T.colors.accent, textDecoration: 'none', padding: '24px clamp(20px, 5vw, 48px)', fontFamily: T.fonts.display, fontSize: 32, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 36 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: T.colors.bgAlt, padding: '48px 24px', borderTop: `1px solid ${T.colors.border}`, textAlign: 'center', color: T.colors.textMuted, fontSize: 12 }}>
          © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
        </footer>
      </div>
    </>
  )
}
