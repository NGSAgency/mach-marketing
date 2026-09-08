import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'

export default function BoltAreas({ config: c, siteSlug }) {
  const brand = {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: T.fonts.display, fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Service Areas</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 64, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              Serving <span style={{ color: T.colors.accent }}>{c.primary_service_area}</span>
            </h1>
            <p style={{ fontSize: 18, color: T.colors.textDim, marginTop: 24 }}>{c.service_areas.length}+ neighborhoods · 24/7 emergency service</p>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px 120px' }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`${base}/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, borderLeft: `4px solid ${T.colors.accent}`, padding: 28, display: 'block' }}>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, textTransform: 'uppercase', color: T.colors.text }}>{area}</div>
                  <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 8 }}>{c.services.length}+ services available</div>
                  <div style={{ color: T.colors.accent, marginTop: 16, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>View →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <BoltCTA T={T} c={c} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
