import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as t } from '../tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'services',
    title: 'Services',
    description: `Complete list of home services offered by ${config.business.display_name} — HVAC, plumbing, electrical, and more.`
  }, { isPreview: true })
}

export default async function ServicesIndex({ searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader config={c} logo={brand.logo} T={T} />

        <BoltPageHero T={T} eyebrow="What We Do"
          title={<>Full-Service <span style={{ color: T.colors.accent }}>Home Services</span></>}
          sub={`One call for all your home service needs. Licensed, insured, and family-owned since ${c.business.established_year}.`}
        />

        <section style={{ background: T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            {[...new Set(c.services.map(s => s.category))].map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 64 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <div style={{ height: 2, background: T.colors.accent, width: 40 }} />
                    <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>{cat}</h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`/templates/bolt/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, position: 'relative', display: 'block', borderRadius: T.radius.sm }}>
                        {svc.emergency && <div style={{ position: 'absolute', top: 12, right: 12, background: T.colors.urgent, color: T.colors.text, fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 8px', borderRadius: T.radius.sm }}>24/7</div>}
                        <div style={{ color: T.colors.accent, marginBottom: 16 }}><ServiceIcon name={svc.icon} size={40} /></div>
                        <h3 style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 700, color: T.colors.text, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>{svc.name}</h3>
                        <p style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.5, margin: '8px 0 0 0' }}>{svc.short}</p>
                        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.colors.border}`, color: T.colors.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Learn More →</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <BoltCTA T={T} config={c} />
        <BoltFooter config={c} T={T} />
      </div>
    </>
  )
}
