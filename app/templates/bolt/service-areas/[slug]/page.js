import { config } from '../../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as t } from '../../tokens.js'
import { ServiceIcon } from '../../../../../lib/templates/shared/icons.js'
import { buildAreaMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForArea, slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltFooter } from '../../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../../components/Blocks.js'
import { notFound } from 'next/navigation'
import { getBrandOverrides, applyBrand } from '../../../../../lib/templates/shared/brand.js'

export async function generateStaticParams() {
  return config.service_areas.map(a => ({ slug: slugify(a) }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const area = config.service_areas.find(a => slugify(a) === slug)
  if (!area) return {}
  return buildAreaMetadata(config, area, { isPreview: true })
}

export default async function AreaPage({ params, searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const { slug } = await params
  const c = config
  const area = c.service_areas.find(a => slugify(a) === slug)
  if (!area) notFound()
  const crumbs = breadcrumbsForArea(area)

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader config={c} logo={brand.logo} T={T} />

        <section style={{ background: T.colors.bg, padding: '60px 24px 80px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            <nav style={{ marginBottom: 24, fontSize: 12, color: T.colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>
              {crumbs.map((cr, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ margin: '0 8px', color: T.colors.border }}>/</span>}
                  {i < crumbs.length - 1 ? <a href={`/templates/bolt${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a> : <span style={{ color: T.colors.accent, fontWeight: 700 }}>{cr.name}</span>}
                </span>
              ))}
            </nav>
            <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Service Area</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(30px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95, color: T.colors.text }}>
              {c.business.display_name}<br/>
              <span style={{ color: T.colors.accent }}>in {area}</span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", color: T.colors.textDim, lineHeight: 1.5, margin: '24px 0 32px 0', maxWidth: 800 }}>
              {c.services.length}+ home services · Same-day response · Serving {area} homeowners since {c.business.established_year}
            </p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '20px 32px', fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, boxShadow: T.shadow.sharp, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 32px 0' }}>Services Available in {area}</h2>
            {[...new Set(c.services.map(s => s.category))].map(cat => (
              <div key={cat} style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ height: 2, background: T.colors.accent, width: 40 }} />
                  <h3 style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>{cat} Services in {area}</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`/templates/bolt/${svc.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.bg, border: `1px solid ${T.colors.border}`, padding: 20, display: 'flex', alignItems: 'center', gap: 12, borderRadius: T.radius.sm }}>
                      <div style={{ color: T.colors.accent }}><ServiceIcon name={svc.icon} size={24} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, color: T.colors.text, fontWeight: 700 }}>{svc.name}</div>
                        <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>in {area}</div>
                      </div>
                      <div style={{ color: T.colors.accent, fontSize: 18 }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <BoltCTA T={T} config={c} headline={`Home Service Pro in ${area}`} />
        <BoltFooter config={c} T={T} />
      </div>
    </>
  )
}
