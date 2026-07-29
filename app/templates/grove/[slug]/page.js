import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as t } from '../tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildComboMetadata, buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForCombo, slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveFooter } from '../components/Chrome.js'
import { GroveCTA } from '../components/Blocks.js'
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
        <GroveHeader config={c} logo={brand.logo} T={T} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 96px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <nav style={{ marginBottom: 24, fontSize: 13, color: T.colors.textMuted }}>
              {crumbs.map((cr, i) => (<span key={i}>{i > 0 && <span style={{ margin: '0 8px' }}>/</span>}{i < crumbs.length - 1 ? <a href={`/templates/grove${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a> : <span style={{ color: T.colors.accent, fontWeight: 600 }}>{cr.name}</span>}</span>))}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ color: T.colors.accent, background: T.colors.accentGlow, padding: 14, borderRadius: T.radius.md }}><ServiceIcon name={service.icon} size={32} /></div>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{service.category} · {area}</div>
              {service.emergency && (<div style={{ background: T.colors.accent, color: T.colors.bgLight, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.full }}>24/7 Emergency</div>)}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 68, fontWeight: 500, letterSpacing: -2, margin: '0 0 28px 0', lineHeight: 1.05, color: T.colors.text }}>
              {service.name} <em style={{ fontStyle: 'italic', color: T.colors.accent }}>in {area}</em>.
            </h1>
            <p style={{ fontSize: 20, color: T.colors.textDim, lineHeight: 1.55, margin: '0 0 40px 0', maxWidth: 720 }}>
              {service.description || service.short} Serving {area} homes since {c.business.established_year}.
            </p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '20px 40px', fontFamily: T.fonts.body, fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.warm, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: '0 0 24px 0', lineHeight: 1.15, color: T.colors.text }}>
              Trusted {service.name.toLowerCase()} for {area} homes.
            </h2>
            <div style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.75 }}>
              <p>When your {area} home needs {service.name.toLowerCase()}, we're a call away. Same-day service most days, and our techs know the neighborhood.</p>
              <p>Family-owned since {c.business.established_year}. {c.reviews.google_count}+ five-star reviews. Same neighborly service, whether you're a first-time customer or a repeat one.</p>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, marginBottom: 20 }}>{service.name} in other areas</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {otherAreas.map(a => (
                  <a key={a} href={`/templates/grove/${service.slug}-in-${slugify(a)}`} style={{ padding: '10px 18px', background: T.colors.accentGlow, color: T.colors.accent, fontSize: 14, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none' }}>{a}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, marginBottom: 20 }}>Other {service.category} in {area}</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherServices.map(s => (
                  <a key={s.slug} href={`/templates/grove/${s.slug}-in-${slugify(area)}`} style={{ padding: '12px 18px', background: T.colors.surfaceAlt, color: T.colors.text, fontSize: 14, fontWeight: 500, borderRadius: T.radius.sm, textDecoration: 'none', border: `1px solid ${T.colors.border}` }}>{s.name} in {area}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GroveCTA T={T} config={c} headline={`${service.name} in ${area}`} sub="Give us a call. We'll take good care of your home." />
        <GroveFooter config={c} T={T} />
      </div>
    </>
  )
}
