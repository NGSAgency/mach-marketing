import { axisTokens } from '../../../templates/axis/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { emergencyLabel, sinceYear, joinParts, countLabel } from '../../../../lib/templates/shared/claims.js'
import { AxisHeader, AxisCTA, AxisFooter } from './AxisServices.js'

export default function AxisAreaDetail({ config: c, siteSlug, area }) {
  const brand = brandFrom(c)
  const T = applyBrand(axisTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const categories = [...new Set(c.services.map(s => s.category))]
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }, { name: area, url: `/service-areas/${slugify(area)}` }]
  const summary = joinParts([countLabel((c.services || []).length, 'service', 'services'), emergencyLabel(c), sinceYear(c)])

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <nav style={{ marginBottom: 32, fontSize: 13, color: T.colors.textDim }}>
              <a href={base} style={{ color: T.colors.textDim, textDecoration: 'none' }}>Home</a> / <a href={`${base}/service-areas`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>Areas</a> / <span style={{ color: T.colors.text, fontWeight: 600 }}>{area}</span>
            </nav>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full, marginBottom: 24 }}>Service Area</div>
            <h1 style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0' }}>
              Home service<br /><span style={{ color: T.colors.accent }}>in {area}</span>.
            </h1>
            {summary && <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 720 }}>{summary}</p>}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full }}>Call {c.business.phone_display}</a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, margin: '0 0 48px 0', lineHeight: 1.05 }}>Services in {area}.</h2>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 48 }}>
                <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, marginBottom: 20 }}>{cat}</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`${base}/${svc.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.bg, padding: '20px 24px', borderRadius: T.radius.md, display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${T.colors.borderLight}`, boxShadow: T.shadow.subtle }}>
                      <div style={{ color: T.colors.accent }}><ServiceIcon name={svc.icon} size={24} /></div>
                      <div style={{ flex: 1, fontSize: 16, color: T.colors.text, fontWeight: 600 }}>{svc.name} in {area}</div>
                      <div style={{ color: T.colors.text }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AxisCTA T={T} c={c} headline={`Serving ${area}.`} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
