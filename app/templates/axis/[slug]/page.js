import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildComboMetadata, buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForCombo, slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisFooter } from '../components/Chrome.js'
import { AxisCTA } from '../components/Blocks.js'
import { notFound } from 'next/navigation'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

function parseComboSlug(slug) {
  for (const svc of config.services) {
    const prefix = `${svc.slug}-in-`
    if (slug.startsWith(prefix)) {
      const areaSlug = slug.substring(prefix.length)
      const area = config.service_areas.find(a => slugify(a) === areaSlug)
      if (area) return { service: svc, area }
    }
  }
  return null
}

export async function generateStaticParams() {
  const params = []
  for (const svc of config.services) {
    for (const area of config.service_areas) params.push({ slug: `${svc.slug}-in-${slugify(area)}` })
  }
  return params
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const parsed = parseComboSlug(slug)
  if (!parsed) return {}
  return buildComboMetadata(config, parsed.service, parsed.area, { isPreview: true })
}

export default async function ComboPage({ params, searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const { slug } = await params
  const parsed = parseComboSlug(slug)
  if (!parsed) notFound()
  const { service, area } = parsed
  const c = config
  const crumbs = breadcrumbsForCombo(service, area)
  const otherAreas = c.service_areas.filter(a => a !== area).slice(0, 6)
  const otherServices = c.services.filter(s => s.slug !== service.slug && s.category === service.category).slice(0, 3)

  return (
    <>
      <JsonLd data={buildServiceSchema(c, service)} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} logo={brand.logo} T={T} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', textAlign: 'center' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
            <nav style={{ marginBottom: 32, fontSize: 13, color: T.colors.textDim }}>
              {crumbs.map((cr, i) => (<span key={i}>{i > 0 && <span style={{ margin: '0 8px' }}>/</span>}{i < crumbs.length - 1 ? <a href={`/templates/axis${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a> : <span style={{ color: T.colors.text, fontWeight: 600 }}>{cr.name}</span>}</span>))}
            </nav>
            <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 600, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>{service.category} · {area}</div>
              {service.emergency && (<div style={{ fontSize: 12, color: T.colors.onAccent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '6px 14px', background: T.colors.accent, borderRadius: T.radius.full }}>24/7 Emergency</div>)}
            </div>
            <h1 style={{ fontSize: "clamp(32px, 7vw, 84px)", fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>
              {service.name}<br /><span style={{ color: T.colors.accent }}>in {area}</span>.
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 720 }}>
              {service.description || service.short}
            </p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.glow, display: 'inline-flex', alignItems: 'center', gap: 8 }}>Call {c.business.phone_display}</a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, margin: '0 0 32px 0', lineHeight: 1.1 }}>
              Trusted {service.name.toLowerCase()} for {area} homes.
            </h2>
            <div style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>When your {area} home needs {service.name.toLowerCase()}, we're a call away. Same-day service most days, techs who know the neighborhood, and pricing you can trust.</p>
              <p>Family-owned since {c.business.established_year}. {c.reviews.google_count}+ five-star reviews. One team, one accountability.</p>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
            <div>
              <h3 style={{ fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: -1, marginBottom: 24 }}>{service.name} in other areas.</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {otherAreas.map(a => (
                  <a key={a} href={`/templates/axis/${service.slug}-in-${slugify(a)}`} style={{ padding: '10px 18px', background: T.colors.surface, color: T.colors.text, fontSize: 14, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none', border: `1px solid ${T.colors.borderLight}` }}>{a}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: -1, marginBottom: 24 }}>Other {service.category.toLowerCase()} in {area}.</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherServices.map(s => (
                  <a key={s.slug} href={`/templates/axis/${s.slug}-in-${slugify(area)}`} style={{ padding: '14px 20px', background: T.colors.surface, color: T.colors.text, fontSize: 15, fontWeight: 600, borderRadius: T.radius.md, textDecoration: 'none', border: `1px solid ${T.colors.borderLight}` }}>{s.name} in {area}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AxisCTA T={T} config={c} headline={`${service.name} in ${area}.`} />
        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
