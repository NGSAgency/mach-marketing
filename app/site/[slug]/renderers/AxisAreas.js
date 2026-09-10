import { axisTokens } from '../../../templates/axis/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisCTA, AxisFooter } from './AxisServices.js'

export default function AxisAreas({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(axisTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 64px', textAlign: 'center', borderBottom: `1px solid ${T.colors.borderLight}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Coverage</div>
            <h1 style={{ fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>
              Serving the <span style={{ color: T.colors.accent }}>{c.primary_service_area}</span>.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '24px auto 0', maxWidth: 680 }}>{c.service_areas.length}+ neighborhoods · Same-day response</p>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`${base}/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, padding: 32, borderRadius: T.radius.lg, display: 'block', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                  <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8, margin: 0 }}>{area}</h2>
                  <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{c.services.length}+ services available</div>
                  <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>View details →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <AxisCTA T={T} c={c} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
