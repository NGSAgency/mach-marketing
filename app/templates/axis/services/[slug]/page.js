import { config } from '../../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../../tokens.js'
import { ServiceIcon } from '../../../../../lib/templates/shared/icons.js'
import { buildServiceMetadata, buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForService, slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisFooter } from '../../components/Chrome.js'
import { AxisCTA } from '../../components/Blocks.js'
import { notFound } from 'next/navigation'
import { getBrandOverrides, applyBrand } from '../../../../../lib/templates/shared/brand.js'

export async function generateStaticParams() { return config.services.map(s => ({ slug: s.slug })) }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = config.services.find(s => s.slug === slug)
  if (!service) return {}
  return buildServiceMetadata(config, service, { isPreview: true })
}

export default async function ServicePage({ params, searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const { slug } = await params
  const c = config
  const service = c.services.find(s => s.slug === slug)
  if (!service) notFound()
  const relatedServices = c.services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3)
  const crumbs = breadcrumbsForService(service)

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
              <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>{service.category}</div>
              {service.emergency && (<div style={{ fontSize: 12, color: T.colors.bg, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '6px 14px', background: T.colors.accent, borderRadius: T.radius.full }}>24/7 Emergency</div>)}
            </div>
            <h1 style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0', color: T.colors.text }}>
              {service.name}<br /><span style={{ color: T.colors.accent }}>in {c.primary_service_area}.</span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 720 }}>{service.description || service.short}</p>
            <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.glow }}>Call {c.business.phone_display}</a>
              <a href="/templates/axis/contact" style={{ background: T.colors.bg, color: T.colors.text, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, border: `1.5px solid ${T.colors.border}` }}>Request quote →</a>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bgSecondary, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, margin: '0 0 32px 0', lineHeight: 1.1 }}>Why {c.business.display_name.split(' ')[0]} for {service.name.toLowerCase()}.</h2>
            <div style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>When you need {service.name.toLowerCase()} in {c.primary_service_area}, you need it done right the first time. That's what we've been doing since {c.business.established_year}.</p>
              <p>Licensed, insured, and NATE-certified where applicable. {c.reviews.google_count}+ five-star reviews. One team, one accountability.</p>
            </div>
            <div style={{ marginTop: 48, background: T.colors.bg, padding: 40, borderRadius: T.radius.lg, boxShadow: T.shadow.subtle }}>
              <div style={{ fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 700, marginBottom: 24, letterSpacing: -0.3 }}>Every job includes</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {['Same-day or next-day service', 'Upfront pricing before we start', 'Licensed & insured technicians', '100% satisfaction guarantee', 'Financing options available'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 16 }}>
                    <div style={{ width: 24, height: 24, background: T.colors.accentGlow, color: T.colors.accent, borderRadius: T.radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, margin: '0 0 12px 0' }}>{service.name} near you.</h2>
            <p style={{ fontSize: 17, color: T.colors.textDim, marginBottom: 32 }}>Serving {c.service_areas.length}+ neighborhoods across {c.primary_service_area}.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/axis/${service.slug}-in-${slugify(area)}`} style={{ padding: '12px 20px', background: T.colors.bgSecondary, color: T.colors.text, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none', border: `1px solid ${T.colors.borderLight}` }}>
                  {service.name} in {area}
                </a>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section style={{ background: T.colors.bgSecondary, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
            <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
              <h2 style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, margin: '0 0 40px 0' }}>Related {service.category.toLowerCase()} services.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {relatedServices.map(svc => (
                  <a key={svc.slug} href={`/templates/axis/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bg, padding: 32, borderRadius: T.radius.lg, display: 'block', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                    <div style={{ color: T.colors.accent, marginBottom: 16 }}><ServiceIcon name={svc.icon} size={28} /></div>
                    <div style={{ fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 700, color: T.colors.text, letterSpacing: -0.3 }}>{svc.name}</div>
                    <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{svc.short}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <AxisCTA T={T} config={c} headline={`Ready for ${service.name.toLowerCase()}?`} />
        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
