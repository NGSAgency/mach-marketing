import { boltTokens } from '../../../templates/bolt/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildServiceSchema, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'
import { whyUsItems, serviceEmergencyBadge } from '../../../../lib/templates/shared/claims.js'

export default function BoltServiceDetail({ config: c, siteSlug, service }) {
  const brand = brandFrom(c)
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = c.base_path || `/site/${siteSlug}`
  const relatedServices = c.services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3)
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: service.name, url: `/services/${service.slug}` }]
  const whyItems = whyUsItems(c, service)
  const whyText = service.generated?.why_us || null
  const badge = serviceEmergencyBadge(c, service)
  const intro = service.description || service.short
  const shortName = (c.business?.display_name || '').split(' ')[0]

  return (
    <>
      <JsonLd data={buildServiceSchema(c, service)} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ marginBottom: 20, fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
              <a href={base} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Home</a> / <a href={`${base}/services`} style={{ color: T.colors.textMuted, textDecoration: 'none' }}>Services</a> / <span style={{ color: T.colors.accent }}>{service.name}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ color: T.colors.accent, background: T.colors.surface, padding: 14, borderRadius: T.radius.sm }}><ServiceIcon name={service.icon} size={40} /></div>
              <div style={{ fontFamily: T.fonts.display, fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{service.category}</div>
              {badge && <div style={{ background: T.colors.accent, color: T.colors.onAccent, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 12px', borderRadius: T.radius.sm }}>{badge}</div>}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95 }}>
              {service.name}{c.primary_service_area && <> <span style={{ color: T.colors.accent }}>in {c.primary_service_area}</span></>}
            </h1>
            {intro && <p style={{ fontSize: 20, color: T.colors.textDim, marginTop: 24, maxWidth: 800 }}>{intro}</p>}
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '18px 36px', fontFamily: T.fonts.display, fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, borderRadius: T.radius.sm, display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
              ☎ {c.business.phone_display}
            </a>
          </div>
        </section>

        {(whyItems.length > 0 || whyText) && (
          <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 40, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>
                {shortName ? <>Why <span style={{ color: T.colors.accent }}>{shortName}</span>?</> : <>Why <span style={{ color: T.colors.accent }}>us</span>?</>}
              </h2>
              {whyText && <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7, margin: '0 0 24px 0' }}>{whyText}</p>}
              {whyItems.length > 0 && (
                <div style={{ display: 'grid', gap: 12 }}>
                  {whyItems.map(item => (
                    <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 17, color: T.colors.text, padding: 16, background: T.colors.surface, borderLeft: `4px solid ${T.colors.accent}` }}>
                      <span style={{ color: T.colors.accent, fontSize: 20, fontWeight: 700 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>{service.name} near you</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`${base}/${service.slug}-in-${slugify(area)}`} style={{ padding: '10px 18px', background: T.colors.surface, border: `1px solid ${T.colors.border}`, color: T.colors.text, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  {service.name} in {area}
                </a>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Related {service.category} Services</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {relatedServices.map(svc => (
                  <a key={svc.slug} href={`${base}/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm }}>
                    <div style={{ color: T.colors.accent, marginBottom: 12 }}><ServiceIcon name={svc.icon} size={28} /></div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 20, fontWeight: 700, textTransform: 'uppercase', color: T.colors.text }}>{svc.name}</div>
                    <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <BoltCTA T={T} c={c} headline={`Ready for ${service.name}?`} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
