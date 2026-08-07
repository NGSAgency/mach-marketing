import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'

export default function BoltAbout({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: T.fonts.display, fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>About Us</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              Family-owned since <span style={{ color: T.colors.accent }}>{c.business.established_year}</span>
            </h1>
            <p style={{ fontSize: 20, color: T.colors.textDim, marginTop: 24 }}>{c.business.years_in_business}+ years serving {c.primary_service_area}.</p>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Our Story</h2>
            <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7 }}>{c.business.display_name} was founded in {c.business.established_year} on a simple promise: treat every customer's home like our own. Today, our licensed team of professionals responds to service calls across {c.service_areas.length}+ neighborhoods, delivering the same personal care we did on day one.</p>
          </div>
        </section>

        {c.certifications.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: '80px 24px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 800, textTransform: 'uppercase', marginBottom: 32 }}>Certifications</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {c.certifications.map(cert => (
                  <div key={cert.name} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, borderLeft: `4px solid ${T.colors.accent}`, padding: 20 }}>
                    <div style={{ color: T.colors.accent, fontSize: 18, marginBottom: 6 }}>✓</div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cert.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <BoltCTA T={T} c={c} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
