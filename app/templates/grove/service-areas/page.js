import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveFooter } from '../components/Chrome.js'
import { GroveCTA, GrovePageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'service-areas', title: 'Service Areas', description: `${config.business.display_name} serves ${config.service_areas.length}+ neighborhoods across ${config.primary_service_area}.` }, { isPreview: true })
}

export default function AreasIndex() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader config={c} />
        <GrovePageHero eyebrow="Where we serve" title={<>On your <em style={{ fontStyle: 'italic', color: T.colors.accent }}>street.</em></>} sub={`${c.service_areas.length}+ neighborhoods across ${c.primary_service_area}. Same-day and 24/7 emergency response.`} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/grove/service-areas/${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32, borderRadius: T.radius.md, display: 'block', boxShadow: T.shadow.soft }}>
                  <h2 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 500, color: T.colors.text, letterSpacing: -0.8, margin: 0 }}>{area}</h2>
                  <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{c.services.length}+ services available</div>
                  <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>See what we do →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <GroveCTA config={c} />
        <GroveFooter config={c} />
      </div>
    </>
  )
}
