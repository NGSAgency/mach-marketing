import { axisTokens } from '../../../templates/axis/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { faqsFrom } from '../../../../lib/templates/shared/claims.js'
import { AxisHeader, AxisCTA, AxisFooter } from './AxisServices.js'

export default function AxisFAQ({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(axisTokens, brand)
  const logo = c.brand?.logo_url
  const base = c.base_path || `/site/${siteSlug}`
  const faqs = faqsFrom(c)
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      {faqs.length > 0 && <JsonLd data={buildFAQSchema(faqs)} />}
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 64px', textAlign: 'center', borderBottom: `1px solid ${T.colors.borderLight}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>FAQ</div>
            <h1 style={{ fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>
              Common <span style={{ color: T.colors.accent }}>questions</span>.
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.bg, border: `1px solid ${T.colors.borderLight}`, borderRadius: T.radius.lg, padding: 28, marginBottom: 12, boxShadow: T.shadow.subtle }}>
                <summary style={{ fontSize: 20, fontWeight: 700, color: T.colors.text, cursor: 'pointer', listStyle: 'none', letterSpacing: -0.3 }}>{f.question}</summary>
                <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>{f.answer}</p>
              </details>
            ))}
            {faqs.length === 0 && c.business?.phone_display && (
              <p style={{ fontSize: 20, color: T.colors.textDim, textAlign: 'center', margin: 0 }}>
                Have a question? Call <a href={`tel:${c.business.phone}`} style={{ color: T.colors.accent, fontWeight: 600, textDecoration: 'none' }}>{c.business.phone_display}</a>.
              </p>
            )}
          </div>
        </section>

        <AxisCTA T={T} c={c} />
        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
