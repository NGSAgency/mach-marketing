import { groveTokens } from '../../../templates/grove/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

export default function GroveAreaDetail({ config: c, siteSlug, area }) {
  const brand = brandFrom(c)
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const categories = [...new Set(c.services.map(s => s.category))]
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }, { name: area, url: `/service-areas/${slugify(area)}` }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 96px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <nav style={{ marginBottom: 24, fontSize: 13, color: T.colors.textMuted }}>
              <a href={base} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Home</a> / <a href={`${base}/service-areas`} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Areas</a> / <span style={{ color: T.colors.accent }}>{area}</span>
            </nav>
            <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Serving {area}</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2.5, margin: '0 0 28px 0', lineHeight: 1.02 }}>
              {c.business.display_name} <em style={{ fontStyle: 'italic', color: T.colors.accent }}>in {area}</em>.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.55, margin: '0 0 40px 0', maxWidth: 700 }}>{c.services.length}+ home services · Same-day response · Since {c.business.established_year}</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '20px clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 48px 0' }}>Services available in {area}</h2>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 48 }}>
                <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, color: T.colors.accent, marginBottom: 20 }}>{cat} in {area}</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`${base}/${svc.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.bgRaised, border: `1px solid ${T.colors.border}`, padding: '18px 24px', borderRadius: T.radius.sm, display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ color: T.colors.accent }}><ServiceIcon name={svc.icon} size={24} /></div>
                      <div style={{ flex: 1, fontSize: 16, color: T.colors.text, fontWeight: 500 }}>{svc.name} in {area}</div>
                      <div style={{ color: T.colors.accent }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <GroveCTA T={T} c={c} headline={`Serving ${area}`} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
