import { config } from '../../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as t } from '../../tokens.js'
import { ServiceIcon } from '../../../../../lib/templates/shared/icons.js'
import { buildServiceMetadata, buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForService, slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveFooter } from '../../components/Chrome.js'
import { GroveCTA } from '../../components/Blocks.js'
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
        <GroveHeader config={c} logo={brand.logo} T={T} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 96px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <nav style={{ marginBottom: 24, fontSize: 13, color: T.colors.textMuted }}>
              {crumbs.map((cr, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ margin: '0 8px' }}>/</span>}
                  {i < crumbs.length - 1 ? <a href={`/templates/grove${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a> : <span style={{ color: T.colors.accent, fontWeight: 600 }}>{cr.name}</span>}
                </span>
              ))}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ color: T.colors.accent, background: T.colors.accentGlow, padding: 14, borderRadius: T.radius.md }}>
                <ServiceIcon name={service.icon} size={32} />
              </div>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{service.category}</div>
              {service.emergency && (<div style={{ background: T.colors.accent, color: T.colors.bgLight, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.full }}>24/7 Emergency</div>)}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2.5, margin: '0 0 28px 0', lineHeight: 1.02, color: T.colors.text, maxWidth: 800 }}>
              <em style={{ fontStyle: 'italic', color: T.colors.accent }}>{service.name}</em> in {c.primary_service_area}.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.55, margin: '0 0 40px 0', maxWidth: 700 }}>
              {service.description || service.short}
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '20px clamp(20px, 4vw, 40px)', fontFamily: T.fonts.body, fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.warm, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
              </a>
              <a href="/templates/grove/contact" style={{ color: T.colors.text, textDecoration: 'underline', textDecorationColor: T.colors.accent, textUnderlineOffset: 6, fontSize: 17, fontWeight: 500, padding: '20px 12px' }}>Request a quote →</a>
            </div>
          </div>
        </section>

        {/* Story-driven content */}
        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: '0 0 24px 0', lineHeight: 1.15, color: T.colors.text }}>
              Why families choose us for {service.name.toLowerCase()}.
            </h2>
            <div style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.75 }}>
              <p>When you need {service.name.toLowerCase()} in {c.primary_service_area}, you don't want a stranger showing up to your home. You want someone who cares about your home like their own.</p>
              <p>That's what we've been doing since {c.business.established_year}. {c.reviews.google_count}+ five-star Google reviews later, it still feels like the neighborhood job we started with.</p>
              <div style={{ marginTop: 40, padding: 32, background: T.colors.bgLight, borderRadius: T.radius.md, border: `1px solid ${T.colors.border}` }}>
                <div style={{ fontFamily: T.fonts.display, fontSize: 18, fontWeight: 600, color: T.colors.text, marginBottom: 16 }}>Every job includes:</div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {['Upfront pricing before we start', 'Licensed, insured, background-checked techs', 'Clean workspace, tools packed out', '100% satisfaction guarantee', 'Financing available for larger jobs'].map(item => (
                    <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: T.colors.text }}>
                      <span style={{ color: T.colors.accent, fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service areas */}
        <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: '0 0 12px 0', color: T.colors.text }}>{service.name} near you</h2>
            <p style={{ fontSize: 17, color: T.colors.textDim, marginBottom: 32 }}>Serving {c.service_areas.length}+ neighborhoods across {c.primary_service_area}.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/grove/${service.slug}-in-${slugify(area)}`} style={{ padding: '12px 20px', background: T.colors.accentGlow, color: T.colors.accent, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none' }}>
                  {service.name} in {area}
                </a>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: '0 0 32px 0', color: T.colors.text }}>Other {service.category} services</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {relatedServices.map(svc => (
                  <a key={svc.slug} href={`/templates/grove/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bgLight, border: `1px solid ${T.colors.border}`, padding: 28, borderRadius: T.radius.md, display: 'block', boxShadow: T.shadow.soft }}>
                    <div style={{ color: T.colors.accent, marginBottom: 12 }}><ServiceIcon name={svc.icon} size={28} /></div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 500, color: T.colors.text, letterSpacing: -0.3 }}>{svc.name}</div>
                    <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <GroveCTA T={T} config={c} headline={`Ready for ${service.name.toLowerCase()}?`} sub="Give us a call. Same-day response most days." />
        <GroveFooter config={c} T={T} />
      </div>
    </>
  )
}
