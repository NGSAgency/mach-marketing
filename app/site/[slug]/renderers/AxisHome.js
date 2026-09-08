import { axisTokens } from '../../../templates/axis/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildLocalBusinessSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'

export default function AxisHome({ config: c }) {
  const brand = {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  }
  const T = applyBrand(axisTokens, brand)
  const logo = c.brand?.logo_url
  const categories = [...new Set((c.services || []).map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 40, borderBottom: `1px solid ${T.colors.borderLight}`, padding: '16px 32px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {logo ? (
              <img src={logo} alt={c.business.display_name} style={{ maxHeight: 32, width: 'auto' }} />
            ) : (
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>{c.business.display_name}</div>
            )}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '12px 24px', fontSize: 14, fontWeight: 600, borderRadius: T.radius.full }}>
              {c.business.phone_display}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h1 style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3.5, lineHeight: 1.02, margin: '0 0 32px 0' }}>
              {c.positioning?.tagline || c.business.display_name}
            </h1>
            {c.positioning?.subtagline && (
              <p style={{ fontSize: 24, color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 48px', maxWidth: 720 }}>{c.positioning.subtagline}</p>
            )}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full }}>
              Call {c.business.phone_display}
            </a>
          </div>
        </section>

        {/* Services */}
        {categories.length > 0 && (
          <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2.5, textAlign: 'center', margin: '0 0 64px 0' }}>Services</h2>
              {categories.map(cat => (
                <div key={cat} style={{ marginBottom: 48 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, letterSpacing: -0.5 }}>{cat}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {c.services.filter(s => s.category === cat).map(svc => (
                      <div key={svc.slug} style={{ background: T.colors.bgSecondary, padding: 32, borderRadius: T.radius.lg, border: `1px solid ${T.colors.borderLight}` }}>
                        <div style={{ width: 56, height: 56, background: T.colors.bg, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.colors.accent, marginBottom: 20 }}>
                          <ServiceIcon name={svc.icon} size={28} />
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>{svc.name}</div>
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
        <section style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: '120px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, margin: '0 0 32px 0', color: T.colors.textInverse }}>Ready to book?</h2>
          <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full }}>
            Call {c.business.phone_display}
          </a>
        </section>

        <footer style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: '48px 32px', textAlign: 'center', fontSize: 12, color: T.colors.textMuted }}>
          © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
        </footer>
      </div>
    </>
  )
}
