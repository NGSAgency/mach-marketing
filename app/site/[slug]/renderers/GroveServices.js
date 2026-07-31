import { groveTokens } from '../../../templates/grove/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'

export default function GroveServices({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const categories = [...new Set((c.services || []).map(s => s.category))]
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Our services</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 72, fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05, color: T.colors.text }}>
              Everything for your <em style={{ fontStyle: 'italic', color: T.colors.accent }}>home</em>.
            </h1>
            <p style={{ fontSize: 20, color: T.colors.textDim, marginTop: 24 }}>{c.services.length} services · Serving {c.primary_service_area}</p>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '48px 32px 120px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            {categories.map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 72 }}>
                  <div style={{ paddingBottom: 20, borderBottom: `1px solid ${T.colors.border}`, marginBottom: 32 }}>
                    <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: 0, color: T.colors.text }}>{cat}</h2>
                    <div style={{ fontSize: 14, color: T.colors.textMuted, marginTop: 8 }}>{catServices.length} services</div>
                  </div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`${base}/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', gap: 24, boxShadow: T.shadow.soft }}>
                        <div style={{ color: T.colors.accent, flexShrink: 0 }}><ServiceIcon name={svc.icon} size={40} /></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 500, color: T.colors.text, letterSpacing: -0.5 }}>{svc.name}</div>
                          <div style={{ fontSize: 15, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                        </div>
                        {svc.emergency && <div style={{ background: T.colors.accentGlow, color: T.colors.accent, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.full }}>24/7</div>}
                        <div style={{ color: T.colors.accent, fontSize: 20 }}>→</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <GroveCTA T={T} c={c} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}

function GroveHeader({ T, c, logo, base }) {
  return (
    <>
      {c.positioning?.emergency_service && (
        <div style={{ background: T.colors.accent, color: T.colors.bgLight, padding: '10px 20px', textAlign: 'center', fontSize: 13, fontWeight: 500, letterSpacing: 0.3 }}>
          24/7 emergency · <a href={`tel:${c.business.phone}`} style={{ color: T.colors.bgLight, textDecoration: 'underline', fontWeight: 700 }}>{c.business.phone_display}</a>
        </div>
      )}
      <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={base} style={{ textDecoration: 'none' }}>
            {logo ? <img src={logo} alt={c.business.display_name} style={{ maxHeight: 48 }} /> : (
              <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 700, color: T.colors.text, letterSpacing: -0.5 }}>{c.business.display_name}</div>
            )}
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href={`${base}/services`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Services</a>
            <a href={`${base}/service-areas`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Areas</a>
            <a href={`${base}/about`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>About</a>
            <a href={`${base}/contact`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Contact</a>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '12px 22px', fontSize: 15, fontWeight: 600, borderRadius: T.radius.full }}>☎ {c.business.phone_display}</a>
          </nav>
        </div>
      </header>
    </>
  )
}

function GroveCTA({ T, c, headline }) {
  return (
    <section style={{ background: T.colors.accent, padding: '96px 32px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: -1, color: T.colors.bgLight, margin: '0 0 32px 0' }}>{headline || 'Ready when you need us.'}</h2>
      <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bgLight, color: T.colors.accent, textDecoration: 'none', padding: '20px 44px', fontSize: 22, fontWeight: 600, borderRadius: T.radius.full, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24 }}>☎</span> {c.business.phone_display}
      </a>
    </section>
  )
}

function GroveFooter({ T, c }) {
  return (
    <footer style={{ background: T.colors.bgAlt, padding: '48px 32px', textAlign: 'center', color: T.colors.textMuted, fontSize: 12 }}>
      © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
    </footer>
  )
}

export { GroveHeader, GroveCTA, GroveFooter }
