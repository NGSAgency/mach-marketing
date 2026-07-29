import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'service-areas',
    title: 'Service Areas',
    description: `${config.business.display_name} serves ${config.service_areas.length}+ neighborhoods across the ${config.primary_service_area} area.`
  }, { isPreview: true })
}

export default function AreasIndex() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader config={c} />

        <BoltPageHero
          eyebrow="Where We Serve"
          title={c.primary_service_area}
          sub={`We serve families across ${c.service_areas.length}+ neighborhoods with same-day and 24/7 emergency response.`}
        />

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/bolt/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, display: 'block', borderRadius: T.radius.sm }}>
                  <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>{area}</h2>
                  <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 8 }}>{c.services.length}+ services available</div>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.colors.border}`, color: T.colors.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>View Details →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <BoltCTA config={c} />
        <BoltFooter config={c} />
      </div>
    </>
  )
}
