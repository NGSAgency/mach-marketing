import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisFooter } from '../components/Chrome.js'
import { AxisCTA, AxisPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'service-areas', title: 'Service Areas', description: `${config.business.display_name} serves ${config.service_areas.length}+ neighborhoods across ${config.primary_service_area}.` }, { isPreview: true })
}

export default async function AreasIndex({ searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} logo={brand.logo} T={T} />
        <AxisPageHero T={T} eyebrow="Coverage" title={<>Serving the <span style={{ color: T.colors.accent }}>{c.primary_service_area}</span>.</>} sub={`${c.service_areas.length}+ neighborhoods. Same-day response. 24/7 emergency.`} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/axis/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.bgSecondary, padding: 32, borderRadius: T.radius.lg, display: 'block', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                  <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8, margin: 0 }}>{area}</h2>
                  <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{c.services.length}+ services available</div>
                  <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>View details →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <AxisCTA T={T} config={c} />
        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
