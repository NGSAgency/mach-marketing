import { groveTokens } from '../../../templates/grove/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

export default function GroveServiceDetail({ config: c, siteSlug, service }) {
  const brand = brandFrom(c)
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const relatedServices = c.services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3)
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: service.name, url: `/services/${service.slug}` }]

  return (
    <>
      <JsonLd data={buildServiceSchema(c, service)} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 96px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <nav style={{ marginBottom: 24, fontSize: 13, color: T.colors.textMuted }}>
              <a href={base} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Home</a> / <a href={`${base}/services`} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Services</a> / <span style={{ color: T.colors.accent }}>{service.name}</span>
            </nav>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ color: T.colors.accent, background: T.colors.accentGlow, padding: 14, borderRadius: T.radius.md }}><ServiceIcon name={service.icon} size={32} /></div>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{service.category}</div>
              {service.emergency && <div style={{ background: T.colors.accent, color: T.colors.onAccent, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.full }}>24/7 Emergency</div>}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2.5, margin: '0 0 28px 0', lineHeight: 1.02 }}>
              <em style={{ fontStyle: 'italic', color: T.colors.accent }}>{service.name}</em> in {c.primary_service_area}.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.55, margin: '0 0 40px 0', maxWidth: 700 }}>{service.description || service.short}</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '20px clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, margin: '0 0 24px 0', lineHeight: 1.15 }}>Why families choose us.</h2>
            <div style={{ marginTop: 32, padding: 32, background: T.colors.bgRaised, borderRadius: T.radius.md, border: `1px solid ${T.colors.border}` }}>
              <div style={{ fontFamily: T.fonts.display, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Every job includes:</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {['Upfront pricing before we start', 'Licensed, insured, background-checked', 'Clean workspace', '100% satisfaction guarantee', 'Financing available'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15 }}>
                    <span style={{ color: T.colors.accent, fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, marginBottom: 24 }}>{service.name} near you</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`${base}/${service.slug}-in-${slugify(area)}`} style={{ padding: '12px 20px', background: T.colors.accentGlow, color: T.colors.accent, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none' }}>
                  {service.name} in {area}
                </a>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 500, letterSpacing: -1, marginBottom: 32 }}>Other {service.category} services</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {relatedServices.map(svc => (
                  <a key={svc.slug} href={`${base}/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bgRaised, border: `1px solid ${T.colors.border}`, padding: 28, borderRadius: T.radius.md }}>
                    <div style={{ color: T.colors.accent, marginBottom: 12 }}><ServiceIcon name={svc.icon} size={28} /></div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 500, letterSpacing: -0.3 }}>{svc.name}</div>
                    <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <GroveCTA T={T} c={c} headline={`Ready for ${service.name.toLowerCase()}?`} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
