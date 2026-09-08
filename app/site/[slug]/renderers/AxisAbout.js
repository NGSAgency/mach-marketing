import { axisTokens } from '../../../templates/axis/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisCTA, AxisFooter } from './AxisServices.js'

export default function AxisAbout({ config: c, siteSlug }) {
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
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 64px', textAlign: 'center', borderBottom: `1px solid ${T.colors.borderLight}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Since {c.business.established_year}</div>
            <h1 style={{ fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>
              Built on <span style={{ color: T.colors.accent }}>trust</span>.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.5, margin: '24px auto 0', maxWidth: 680 }}>{c.business.years_in_business} years. {c.team.size} technicians. One family.</p>
          </div>
        </section>

        <section style={{ background: T.colors.bgSecondary, padding: '120px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <p style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.3, letterSpacing: -0.8, marginBottom: 40 }}>
              We started with a handshake, a truck, and a promise: treat every home like our own.
            </p>
            <div style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>{c.business.display_name} was born in {c.business.established_year}. Today we serve {c.service_areas.length}+ neighborhoods with {c.team.size} team members.</p>
              <p>{c.team.description}</p>
            </div>
          </div>
        </section>

        {c.certifications.length > 0 && (
          <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 style={{ fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, margin: '0 0 48px 0' }}>Credentials that matter.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {c.certifications.map(cert => (
                  <div key={cert.name} style={{ background: T.colors.bgSecondary, padding: 28, borderRadius: T.radius.lg, border: `1px solid ${T.colors.borderLight}` }}>
                    <div style={{ color: T.colors.accent, fontSize: 20, marginBottom: 12 }}>✓</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: T.colors.text }}>{cert.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <AxisCTA T={T} c={c} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
