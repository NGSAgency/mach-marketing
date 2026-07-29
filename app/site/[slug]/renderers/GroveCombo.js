import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

export default function GroveCombo({ config: c, siteSlug, service, area }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const otherAreas = c.service_areas.filter(a => a !== area).slice(0, 6)
  const otherServices = c.services.filter(s => s.slug !== service.slug && s.category === service.category).slice(0, 3)
  const crumbs = [{ name: 'Home', url: '/' }, { name: service.name, url: `/services/${service.slug}` }, { name: `${service.name} in ${area}`, url: `/${service.slug}-in-${slugify(area)}` }]

  return (
    <>
      <JsonLd data={buildServiceSchema(c, service)} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 96px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{service.category} · {area}</div>
              {service.emergency && <div style={{ background: T.colors.accent, color: T.colors.bgLight, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.full }}>24/7</div>}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 68, fontWeight: 500, letterSpacing: -2, margin: '0 0 28px 0', lineHeight: 1.05 }}>
              {service.name} <em style={{ fontStyle: 'italic', color: T.colors.accent }}>in {area}</em>.
            </h1>
            <p style={{ fontSize: 20, color: T.colors.textDim, lineHeight: 1.55, margin: '0 0 40px 0', maxWidth: 720 }}>{service.description || service.short}. Serving {area} homes since {c.business.established_year}.</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '20px 40px', fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, marginBottom: 20 }}>{service.name} in other areas</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {otherAreas.map(a => (
                  <a key={a} href={`${base}/${service.slug}-in-${slugify(a)}`} style={{ padding: '10px 18px', background: T.colors.accentGlow, color: T.colors.accent, fontSize: 14, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none' }}>{a}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, marginBottom: 20 }}>Other {service.category} in {area}</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherServices.map(s => (
                  <a key={s.slug} href={`${base}/${s.slug}-in-${slugify(area)}`} style={{ padding: '12px 18px', background: T.colors.surfaceAlt, color: T.colors.text, fontSize: 14, fontWeight: 500, borderRadius: T.radius.sm, textDecoration: 'none', border: `1px solid ${T.colors.border}` }}>{s.name} in {area}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GroveCTA T={T} c={c} headline={`${service.name} in ${area}`} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
