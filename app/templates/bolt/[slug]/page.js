import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as t } from '../tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { buildComboMetadata, buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForCombo, slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltCTA } from '../components/Blocks.js'
import { notFound } from 'next/navigation'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

// Parse "service-in-area" pattern
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
    for (const area of config.service_areas) {
      params.push({ slug: `${svc.slug}-in-${slugify(area)}` })
    }
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ background: T.colors.surface, padding: 10, borderRadius: T.radius.sm, color: T.colors.accent }}><ServiceIcon name={service.icon} size={32} /></div>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>{service.category} · {area}</div>
              {service.emergency && (<div style={{ background: T.colors.urgent, color: T.colors.text, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.sm }}>24/7 Emergency</div>)}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 68, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95, color: T.colors.text }}>
              {service.name} in <span style={{ color: T.colors.accent }}>{area}</span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", color: T.colors.textDim, lineHeight: 1.5, margin: '24px 0 32px 0', maxWidth: 800 }}>
              Professional {service.name.toLowerCase()} for {area} homeowners. {service.description || service.short} Family-owned since {c.business.established_year}.
            </p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '20px 32px', fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, boxShadow: T.shadow.sharp, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>☎</span> Call {c.business.phone_display}
            </a>
          </div>
        </section>

        {/* Body content */}
        <section style={{ background: T.colors.bgAlt, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 24px 0' }}>Trusted {service.name} in {area}</h2>
            <div style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>{c.business.display_name} has been serving {area} homeowners with expert {service.name.toLowerCase()} services since {c.business.established_year}. Our NATE-certified technicians know {area} homes inside and out.</p>
              <p>With {c.reviews.google_count}+ five-star Google reviews and same-day service throughout {area}, we're the trusted choice when you need {service.name.toLowerCase()} done right the first time.</p>
              <ul style={{ paddingLeft: 20, marginTop: 32 }}>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Fast {area} response</strong> — most jobs completed same day</li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Upfront pricing</strong> — no surprises, free estimates on installs</li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Licensed & insured in {area}</strong></li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>100% satisfaction guarantee</strong> on every job</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-linking */}
        <section style={{ background: T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>{service.name} in Other Areas</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherAreas.map(a => (
                  <a key={a} href={`/templates/bolt/${service.slug}-in-${slugify(a)}`} style={{ textDecoration: 'none', padding: '12px 16px', background: T.colors.surface, border: `1px solid ${T.colors.border}`, fontSize: 14, fontWeight: 600, letterSpacing: 0.3, color: T.colors.text, borderRadius: T.radius.sm, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{service.name} in {a}</span><span style={{ color: T.colors.accent }}>→</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>Other {service.category} Services in {area}</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherServices.map(s => (
                  <a key={s.slug} href={`/templates/bolt/${s.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', padding: '12px 16px', background: T.colors.surface, border: `1px solid ${T.colors.border}`, fontSize: 14, fontWeight: 600, letterSpacing: 0.3, color: T.colors.text, borderRadius: T.radius.sm, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{s.name} in {area}</span><span style={{ color: T.colors.accent }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BoltCTA T={T} config={c} headline={`${service.name} in ${area} — Call Now`} />
        <BoltFooter config={c} T={T} />
      </div>
    </>
  )
}
