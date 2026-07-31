import { boltTokens } from '../../../templates/bolt/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'

export default function BoltAreaDetail({ config: c, siteSlug, area }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const categories = [...new Set(c.services.map(s => s.category))]
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas' }, { name: area, url: `/service-areas/${slugify(area)}` }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ marginBottom: 20, fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
              <a href={base} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Home</a> / <a href={`${base}/service-areas`} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Areas</a> / <span style={{ color: T.colors.accent }}>{area}</span>
            </div>
            <div style={{ fontFamily: T.fonts.display, fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Service Area</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 72, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95 }}>
              Home service <span style={{ color: T.colors.accent }}>in {area}</span>
            </h1>
            <p style={{ fontSize: 20, color: T.colors.textDim, marginTop: 24, maxWidth: 800 }}>Same-day response, 24/7 emergency service. {c.services.length}+ services for {area} homeowners.</p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontFamily: T.fonts.display, fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, borderRadius: T.radius.sm, display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
              ☎ {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 800, textTransform: 'uppercase', marginBottom: 40 }}>Services in <span style={{ color: T.colors.accent }}>{area}</span></h2>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 48 }}>
                <h3 style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 800, textTransform: 'uppercase', color: T.colors.accent, marginBottom: 16, letterSpacing: 1 }}>{cat}</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`${base}/${svc.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ color: T.colors.accent }}><ServiceIcon name={svc.icon} size={24} /></div>
                      <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: T.colors.text }}>{svc.name} in {area}</div>
                      <div style={{ color: T.colors.accent, fontSize: 18 }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <BoltCTA T={T} c={c} headline={`Serving ${area}`} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
