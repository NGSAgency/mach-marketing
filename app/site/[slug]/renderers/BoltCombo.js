import { boltTokens } from '../../../templates/bolt/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'

export default function BoltCombo({ config: c, siteSlug, service, area }) {
  const brand = brandFrom(c)
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const otherAreas = c.service_areas.filter(a => a !== area).slice(0, 6)
  const otherServices = c.services.filter(s => s.slug !== service.slug && s.category === service.category).slice(0, 3)
  const crumbs = [{ name: 'Home', url: '/' }, { name: service.name, url: `/services/${service.slug}` }, { name: `${service.name} in ${area}`, url: `/${service.slug}-in-${slugify(area)}` }]

  return (
    <>
      <JsonLd data={buildServiceSchema(c, service)} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: T.fonts.display, fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{service.category} · {area}</div>
              {service.emergency && <div style={{ background: T.colors.accent, color: T.colors.onAccent, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.sm }}>24/7</div>}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6vw, 68px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95 }}>
              {service.name} <span style={{ color: T.colors.accent }}>in {area}</span>
            </h1>
            <p style={{ fontSize: 20, color: T.colors.textDim, marginTop: 24, maxWidth: 800 }}>{service.description || service.short}. Serving {area} since {c.business.established_year}.</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '18px 36px', fontFamily: T.fonts.display, fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, borderRadius: T.radius.sm, display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
              ☎ {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>{service.name} in other areas</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {otherAreas.map(a => (
                  <a key={a} href={`${base}/${service.slug}-in-${slugify(a)}`} style={{ padding: '10px 18px', background: T.colors.surface, border: `1px solid ${T.colors.border}`, color: T.colors.text, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{a}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>Other {service.category} in {area}</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherServices.map(s => (
                  <a key={s.slug} href={`${base}/${s.slug}-in-${slugify(area)}`} style={{ padding: 14, background: T.colors.surface, border: `1px solid ${T.colors.border}`, color: T.colors.text, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{s.name} in {area}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BoltCTA T={T} c={c} headline={`${service.name} in ${area}`} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
