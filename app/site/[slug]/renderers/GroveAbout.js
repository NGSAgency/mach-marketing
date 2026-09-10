import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

export default function GroveAbout({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Family-owned since {c.business.established_year}</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
              Who <em style={{ fontStyle: 'italic', color: T.colors.accent }}>we are</em>.
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <p style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 400, fontStyle: 'italic', color: T.colors.accent, lineHeight: 1.35, marginBottom: 32 }}>
              "We treat every home like our own."
            </p>
            <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>{c.business.display_name} started in {c.business.established_year}. Today we serve {c.service_areas.length}+ neighborhoods with {c.team.size} team members.</p>
          </div>
        </section>

        {c.certifications.length > 0 && (
          <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 48px 0' }}>Licenses & credentials.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {c.certifications.map(cert => (
                  <div key={cert.name} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, borderRadius: T.radius.md, boxShadow: T.shadow.soft }}>
                    <div style={{ color: T.colors.accent, fontSize: 20, marginBottom: 12 }}>✓</div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 20, fontWeight: 500, color: T.colors.text }}>{cert.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <GroveCTA T={T} c={c} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
