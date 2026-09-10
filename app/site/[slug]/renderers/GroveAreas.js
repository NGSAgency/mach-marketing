import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { countLabel } from '../../../../lib/templates/shared/claims.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

export default function GroveAreas({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }]
  const areasCount = countLabel((c.service_areas || []).length, 'area', 'areas')
  const servicesCount = countLabel((c.services || []).length, 'service', 'services')

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px' }}>
          <div style={{ maxWidth: 'min(1240px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Where we serve</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
              Our service <em style={{ fontStyle: 'italic', color: T.colors.accent }}>areas</em>.
            </h1>
            {areasCount && <p style={{ fontSize: 20, color: T.colors.textDim, marginTop: 24 }}>{areasCount}{c.primary_service_area ? ` across ${c.primary_service_area}` : ''}</p>}
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '48px 32px 120px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`${base}/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32, borderRadius: T.radius.md, boxShadow: T.shadow.soft }}>
                  <h2 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 500, letterSpacing: -0.8, margin: 0 }}>{area}</h2>
                  {servicesCount && <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{servicesCount}</div>}
                  <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>See what we do →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <GroveCTA T={T} c={c} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
