import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { faqsFrom } from '../../../../lib/templates/shared/claims.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

export default function GroveFAQ({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(groveTokens, brand)
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
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Answers</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
              Common <em style={{ fontStyle: 'italic', color: T.colors.accent }}>questions</em>.
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '48px 32px 120px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.bgRaised, border: `1px solid ${T.colors.border}`, borderRadius: T.radius.md, padding: 28, marginBottom: 12, boxShadow: T.shadow.soft }}>
                <summary style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 500, color: T.colors.text, cursor: 'pointer', listStyle: 'none', letterSpacing: -0.3 }}>{f.question}</summary>
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

        <GroveCTA T={T} c={c} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
