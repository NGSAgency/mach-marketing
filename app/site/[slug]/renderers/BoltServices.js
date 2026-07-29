import { boltTokens } from '../../../templates/bolt/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'

export default function BoltServices({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const categories = [...new Set((c.services || []).map(s => s.category))]
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: T.fonts.display, fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Our Services</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 64, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95 }}>
              Everything for <span style={{ color: T.colors.accent }}>your home</span>
            </h1>
            <p style={{ fontSize: 18, color: T.colors.textDim, marginTop: 24 }}>{c.services.length} services · Serving {c.primary_service_area}</p>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px 120px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 64 }}>
                <div style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 800, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 24px 0', paddingBottom: 12, borderBottom: `2px solid ${T.colors.accent}` }}>{cat}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`${base}/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm, display: 'block' }}>
                      <div style={{ color: T.colors.accent, marginBottom: 16 }}><ServiceIcon name={svc.icon} size={36} /></div>
                      <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: T.colors.text }}>{svc.name}</div>
                      <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{svc.short}</div>
                      {svc.emergency && <div style={{ background: T.colors.accent, color: T.colors.bg, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.sm, display: 'inline-block', marginTop: 12 }}>24/7</div>}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <BoltCTA T={T} c={c} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}

// Shared components - kept here for simplicity
function BoltHeader({ T, c, logo, base }) {
  return (
    <>
      {c.positioning?.emergency_service && (
        <div style={{ background: T.colors.accent, color: T.colors.bg, padding: '8px 20px', textAlign: 'center', fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>
          24/7 Emergency · <a href={`tel:${c.business.phone}`} style={{ color: T.colors.bg, textDecoration: 'underline', fontWeight: 700 }}>{c.business.phone_display}</a>
        </div>
      )}
      <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <a href={base} style={{ textDecoration: 'none' }}>
            {logo ? <img src={logo} alt={c.business.display_name} style={{ maxHeight: 44 }} /> : (
              <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                <span style={{ color: T.colors.accent }}>{c.business.display_name.split(' ')[0]}</span> <span style={{ color: T.colors.text }}>{c.business.display_name.split(' ').slice(1).join(' ')}</span>
              </div>
            )}
          </a>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href={`${base}/services`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Services</a>
            <a href={`${base}/service-areas`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Areas</a>
            <a href={`${base}/about`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>About</a>
            <a href={`${base}/contact`} style={{ color: T.colors.text, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Contact</a>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '10px 20px', fontFamily: T.fonts.display, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, borderRadius: T.radius.sm }}>
              ☎ {c.business.phone_display}
            </a>
          </nav>
        </div>
      </header>
    </>
  )
}

function BoltCTA({ T, c, headline }) {
  return (
    <section style={{ background: T.colors.accent, padding: '80px 24px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 800, textTransform: 'uppercase', color: T.colors.bg, margin: '0 0 20px 0', letterSpacing: -0.5 }}>
        {headline || 'Ready to book?'}
      </h2>
      <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bg, color: T.colors.accent, textDecoration: 'none', padding: '20px 40px', fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, borderRadius: T.radius.sm, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 32 }}>☎</span> {c.business.phone_display}
      </a>
    </section>
  )
}

function BoltFooter({ T, c }) {
  return (
    <footer style={{ background: T.colors.bgAlt, padding: '48px 24px', borderTop: `1px solid ${T.colors.border}`, textAlign: 'center', color: T.colors.textMuted, fontSize: 12 }}>
      © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
    </footer>
  )
}

export { BoltHeader, BoltCTA, BoltFooter }
