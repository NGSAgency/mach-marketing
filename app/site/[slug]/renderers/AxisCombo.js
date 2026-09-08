import { axisTokens } from '../../../templates/axis/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisCTA, AxisFooter } from './AxisServices.js'

export default function AxisCombo({ config: c, siteSlug, service, area }) {
  const brand = {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  }
  const T = applyBrand(axisTokens, brand)
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
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 600, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>{service.category} · {area}</div>
              {service.emergency && <div style={{ fontSize: 12, color: T.colors.bg, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '6px 14px', background: T.colors.accent, borderRadius: T.radius.full }}>24/7</div>}
            </div>
            <h1 style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>
              {service.name}<br /><span style={{ color: T.colors.accent }}>in {area}</span>.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 720 }}>{service.description || service.short}</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full }}>Call {c.business.phone_display}</a>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 24 }}>{service.name} in other areas.</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {otherAreas.map(a => (
                  <a key={a} href={`${base}/${service.slug}-in-${slugify(a)}`} style={{ padding: '10px 18px', background: T.colors.bgSecondary, color: T.colors.text, fontSize: 14, fontWeight: 600, borderRadius: T.radius.full, textDecoration: 'none', border: `1px solid ${T.colors.borderLight}` }}>{a}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 24 }}>Other {service.category.toLowerCase()} in {area}.</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {otherServices.map(s => (
                  <a key={s.slug} href={`${base}/${s.slug}-in-${slugify(area)}`} style={{ padding: '14px 20px', background: T.colors.bgSecondary, color: T.colors.text, fontSize: 15, fontWeight: 600, borderRadius: T.radius.md, textDecoration: 'none', border: `1px solid ${T.colors.borderLight}` }}>{s.name} in {area}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AxisCTA T={T} c={c} headline={`${service.name} in ${area}.`} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
