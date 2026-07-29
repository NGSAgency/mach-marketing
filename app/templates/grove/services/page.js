import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as t } from '../tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from '../components/Chrome.js'
import { GroveCTA, GrovePageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'services',
    title: 'Services',
    description: `${config.business.display_name} home services - HVAC, plumbing, electrical, and more. Family-owned since ${config.business.established_year}.`
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
        <GroveHeader config={c} logo={brand.logo} T={T} />
        <GrovePageHero T={T} eyebrow="Our services" title={<>Everything for your <em style={{ fontStyle: 'italic', color: T.colors.accent }}>home</em>.</>} sub={`One licensed team. ${c.services.length} home services. Family-owned since ${c.business.established_year}.`} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            {categories.map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 72 }}>
                  <div style={{ paddingBottom: 20, borderBottom: `1px solid ${T.colors.border}`, marginBottom: 32 }}>
                    <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: 0, color: T.colors.text }}>{cat}</h2>
                    <div style={{ fontSize: 14, color: T.colors.textMuted, marginTop: 8 }}>{catServices.length} services in this category</div>
                  </div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`/templates/grove/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', gap: 24, boxShadow: T.shadow.soft }}>
                        <div style={{ color: T.colors.accent, flexShrink: 0 }}><ServiceIcon name={svc.icon} size={40} /></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 500, color: T.colors.text, letterSpacing: -0.5 }}>{svc.name}</div>
                          <div style={{ fontSize: 15, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                        </div>
                        {svc.emergency && (<div style={{ background: T.colors.accentGlow, color: T.colors.accent, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.full }}>24/7</div>)}
                        <div style={{ color: T.colors.accent, fontSize: 20 }}>→</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <GroveCTA T={T} config={c} />
        <GroveFooter config={c} T={T} />
      </div>
    </>
  )
}
