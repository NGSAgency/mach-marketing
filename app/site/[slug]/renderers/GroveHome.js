import { groveTokens } from '../../../templates/grove/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildLocalBusinessSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'

export default function GroveHome({ config: c }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const categories = [...new Set((c.services || []).map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, padding: '20px 32px' }}>
          <div style={{ maxWidth: 'min(1240px, 100%)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {logo ? (
              <img src={logo} alt={c.business.display_name} style={{ maxHeight: 48, width: 'auto' }} />
            ) : (
              <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 700, color: T.colors.text, letterSpacing: -0.5 }}>
                {c.business.display_name}
              </div>
            )}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '12px 22px', fontFamily: T.fonts.body, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full }}>
              ☎ {c.business.phone_display}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section style={{ background: T.colors.bg, padding: '96px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(32px, 8vw, 88px)", fontWeight: 500, letterSpacing: -3, margin: '0 0 32px 0', lineHeight: 0.98, color: T.colors.text }}>
              {c.positioning?.tagline || c.business.display_name}
            </h1>
            {c.positioning?.subtagline && (
              <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.55, margin: '0 auto 48px', maxWidth: 620 }}>{c.positioning.subtagline}</p>
            )}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '20px clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        {/* Services */}
        {categories.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
            <div style={{ maxWidth: 'min(1240px, 100%)', margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 500, letterSpacing: -1.5, textAlign: 'center', margin: '0 0 64px 0' }}>Our Services</h2>
              {categories.map(cat => (
                <div key={cat} style={{ marginBottom: 48 }}>
                  <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, marginBottom: 24, color: T.colors.accent }}>{cat}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
                    {c.services.filter(s => s.category === cat).map(svc => (
                      <div key={svc.slug} style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.md, border: `1px solid ${T.colors.border}` }}>
                        <div style={{ color: T.colors.accent, marginBottom: 16 }}><ServiceIcon name={svc.icon} size={28} /></div>
                        <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 500, letterSpacing: -0.3 }}>{svc.name}</div>
                        <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ background: T.colors.accent, padding: '96px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 500, letterSpacing: -1, color: T.colors.bgLight, margin: '0 0 32px 0' }}>Ready when you need us.</h2>
          <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bgLight, color: T.colors.accent, textDecoration: 'none', padding: '20px clamp(20px, 5vw, 44px)', fontSize: 22, fontWeight: 600, borderRadius: T.radius.full, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>☎</span> {c.business.phone_display}
          </a>
        </section>

        <footer style={{ background: T.colors.bgAlt, padding: '48px 32px', textAlign: 'center', color: T.colors.textMuted, fontSize: 12 }}>
          © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
        </footer>
      </div>
    </>
  )
}
