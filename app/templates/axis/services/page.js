import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from '../components/Chrome.js'
import { AxisCTA, AxisPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'services',
    title: 'Services',
    description: `${config.business.display_name} home services - HVAC, plumbing, electrical, and more.`
  }, { isPreview: true })
}

export default async function ServicesIndex({ searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]
  const categories = [...new Set(c.services.map(s => s.category))]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} logo={brand.logo} T={T} />
        <AxisPageHero T={T} eyebrow="Services" title={<>Everything you need <span style={{ color: T.colors.accent }}>for your home</span>.</>} sub={`${c.services.length} services across ${categories.length} categories, one licensed team.`} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
            {categories.map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 64 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${T.colors.borderLight}` }}>
                    <h2 style={{ fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: -1.5, margin: 0, color: T.colors.text }}>{cat}</h2>
                    <div style={{ fontSize: 15, color: T.colors.textMuted }}>{catServices.length} services</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`/templates/axis/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bgSecondary, padding: 32, borderRadius: T.radius.lg, display: 'block', position: 'relative', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                        {svc.emergency && (<div style={{ position: 'absolute', top: 20, right: 20, background: T.colors.accent, color: T.colors.bg, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.full }}>24/7</div>)}
                        <div style={{ width: 56, height: 56, background: T.colors.bg, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.colors.accent, marginBottom: 20, boxShadow: T.shadow.subtle }}>
                          <ServiceIcon name={svc.icon} size={28} />
                        </div>
                        <div style={{ fontSize: "clamp(15px, 1.8vw, 22px)", fontWeight: 700, color: T.colors.text, marginBottom: 8, letterSpacing: -0.5 }}>{svc.name}</div>
                        <div style={{ fontSize: 15, color: T.colors.textDim, lineHeight: 1.5 }}>{svc.short}</div>
                        <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>Learn more →</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <AxisCTA T={T} config={c} />
        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
