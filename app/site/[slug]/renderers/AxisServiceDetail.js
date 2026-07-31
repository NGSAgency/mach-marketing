import { axisTokens } from '../../../templates/axis/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisCTA, AxisFooter } from './AxisServices.js'

export default function AxisServiceDetail({ config: c, siteSlug, service }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(axisTokens, brand)
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
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <nav style={{ marginBottom: 32, fontSize: 13, color: T.colors.textDim }}>
              <a href={base} style={{ color: T.colors.textDim, textDecoration: 'none' }}>Home</a> / <a href={`${base}/services`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>Services</a> / <span style={{ color: T.colors.text, fontWeight: 600 }}>{service.name}</span>
            </nav>
            <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 600, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>{service.category}</div>
              {service.emergency && <div style={{ fontSize: 12, color: T.colors.bg, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '6px 14px', background: T.colors.accent, borderRadius: T.radius.full }}>24/7 Emergency</div>}
            </div>
            <h1 style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>
              {service.name}<br /><span style={{ color: T.colors.accent }}>in {c.primary_service_area}.</span>
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 720 }}>{service.description || service.short}</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full }}>Call {c.business.phone_display}</a>
          </div>
        </section>

        <section style={{ background: T.colors.bgSecondary, padding: '120px 32px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1.5, margin: '0 0 32px 0' }}>Why us.</h2>
            <div style={{ background: T.colors.bg, padding: 40, borderRadius: T.radius.lg, boxShadow: T.shadow.subtle }}>
              <div style={{ display: 'grid', gap: 16 }}>
                {['Same-day service', 'Upfront pricing', 'Licensed & insured', '100% satisfaction guarantee', 'Financing options'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 16 }}>
                    <div style={{ width: 24, height: 24, background: T.colors.accentGlow, color: T.colors.accent, borderRadius: T.radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1.5, marginBottom: 32 }}>{service.name} near you.</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`${base}/${service.slug}-in-${slugify(area)}`} style={{ padding: '12px 20px', background: T.colors.bgSecondary, color: T.colors.text, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none', border: `1px solid ${T.colors.borderLight}` }}>
                  {service.name} in {area}
                </a>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section style={{ background: T.colors.bgSecondary, padding: '120px 32px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1.5, marginBottom: 40 }}>Related {service.category.toLowerCase()} services.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {relatedServices.map(svc => (
                  <a key={svc.slug} href={`${base}/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bg, padding: 32, borderRadius: T.radius.lg, display: 'block', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                    <div style={{ color: T.colors.accent, marginBottom: 16 }}><ServiceIcon name={svc.icon} size={28} /></div>
                    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>{svc.name}</div>
                    <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{svc.short}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <AxisCTA T={T} c={c} headline={`Ready for ${service.name.toLowerCase()}?`} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
