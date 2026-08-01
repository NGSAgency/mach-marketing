import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as t } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'service-areas',
    title: 'Service Areas',
    description: `${config.business.display_name} serves ${config.service_areas.length}+ neighborhoods across the ${config.primary_service_area} area.`
  }, { isPreview: true })
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
        <BoltHeader config={c} logo={brand.logo} T={T} />

        <BoltPageHero T={T} eyebrow="Where We Serve"
          title={c.primary_service_area}
          sub={`We serve families across ${c.service_areas.length}+ neighborhoods with same-day and 24/7 emergency response.`}
        />

        <section style={{ background: T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/bolt/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, display: 'block', borderRadius: T.radius.sm }}>
                  <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>{area}</h2>
                  <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 8 }}>{c.services.length}+ services available</div>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.colors.border}`, color: T.colors.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>View Details →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <BoltCTA T={T} config={c} />
        <BoltFooter config={c} T={T} />
      </div>
    </>
  )
}
