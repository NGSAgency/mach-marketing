import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'
import { sinceLabel, aboutBody, aboutFacts } from '../../../../lib/templates/shared/claims.js'

export default function GroveAbout({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = c.base_path || `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]
  const since = sinceLabel(c)
  const facts = aboutFacts(c)
  const body = aboutBody(c)
  const certifications = c.certifications || []

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            {since && <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>{since}</div>}
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
              Who <em style={{ fontStyle: 'italic', color: T.colors.accent }}>we are</em>.
            </h1>
          </div>
        </section>

        {(facts || body) && (
          <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
              {facts && <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>{facts}</p>}
              {body && body.map((para, i) => <p key={i} style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>{para}</p>)}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 48px 0' }}>Credentials.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {certifications.map(cert => (
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
