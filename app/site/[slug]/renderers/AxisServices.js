import { axisTokens } from '../../../templates/axis/tokens.js'
import { ServiceIcon } from '../../../../lib/templates/shared/icons.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { MobileMenu } from '../../../../lib/templates/shared/MobileMenu.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'

export default function AxisServices({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(axisTokens, brand)
  const logo = c.brand?.logo_url
  const categories = [...new Set((c.services || []).map(s => s.category))]
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 64px', textAlign: 'center', borderBottom: `1px solid ${T.colors.borderLight}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Services</div>
            <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>
              Everything you need <span style={{ color: T.colors.accent }}>for your home</span>.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '24px auto 0', maxWidth: 680 }}>{c.services.length} services · One licensed team</p>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {categories.map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 64 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${T.colors.borderLight}` }}>
                    <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, margin: 0 }}>{cat}</h2>
                    <div style={{ fontSize: 15, color: T.colors.textMuted }}>{catServices.length} services</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`${base}/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bgSecondary, padding: 32, borderRadius: T.radius.lg, display: 'block', position: 'relative', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                        {svc.emergency && <div style={{ position: 'absolute', top: 20, right: 20, background: T.colors.accent, color: T.colors.bg, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.full }}>24/7</div>}
                        <div style={{ width: 56, height: 56, background: T.colors.bg, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.colors.accent, marginBottom: 20, boxShadow: T.shadow.subtle }}>
                          <ServiceIcon name={svc.icon} size={28} />
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: T.colors.text, marginBottom: 8, letterSpacing: -0.5 }}>{svc.name}</div>
                        <div style={{ fontSize: 15, color: T.colors.textDim, lineHeight: 1.5 }}>{svc.short}</div>
                        <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>Learn more →</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <AxisCTA T={T} c={c} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}

function AxisHeader({ T, c, logo, base }) {
  return (
    <header style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 40, borderBottom: `1px solid ${T.colors.borderLight}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href={base} style={{ textDecoration: 'none' }}>
          {logo ? <img src={logo} alt={c.business.display_name} style={{ maxHeight: 32 }} /> : (
            <div style={{ fontSize: 20, fontWeight: 700, color: T.colors.text, letterSpacing: -0.5 }}>{c.business.display_name}</div>
          )}
        </a>
        <MobileMenu
            items={[
              { href: `${base}/services`, label: 'Services' },
              { href: `${base}/service-areas`, label: 'Areas' },
              { href: `${base}/about`, label: 'About' },
              { href: `${base}/faq`, label: 'FAQ' },
            ]}
            phoneNumber={c.business.phone}
            phoneDisplay={c.business.phone_display}
            accent={T.colors.accent}
            bg={T.colors.bg}
            text={T.colors.text}
            textDim={T.colors.textDim}
            borderColor={T.colors.border}
            fontFamily={T.fonts.body}
          />
      </div>
    </header>
  )
}

function AxisCTA({ T, c, headline }) {
  return (
    <section style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: '120px 32px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 20px 0', color: T.colors.textInverse }}>{headline || 'Ready to book?'}</h2>
        <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full }}>Call {c.business.phone_display}</a>
      </div>
    </section>
  )
}

function AxisFooter({ T, c }) {
  return (
    <footer style={{ background: T.colors.bgInverse, color: T.colors.textInverseDim, padding: '48px 32px', textAlign: 'center', fontSize: 12 }}>
      © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved.
    </footer>
  )
}

export { AxisHeader, AxisCTA, AxisFooter }
