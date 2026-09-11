import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { faqsFrom } from '../../../../lib/templates/shared/claims.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'

export default function BoltFAQ({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(boltTokens, brand)
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
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 64, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              Common <span style={{ color: T.colors.accent }}>questions</span>
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, borderLeft: `4px solid ${T.colors.accent}`, padding: 24, marginBottom: 12 }}>
                <summary style={{ fontFamily: T.fonts.display, fontSize: 18, fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5, cursor: 'pointer' }}>{f.question}</summary>
                <p style={{ fontSize: 16, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>{f.answer}</p>
              </details>
            ))}
            {faqs.length === 0 && c.business?.phone_display && (
              <p style={{ fontSize: 18, color: T.colors.textDim, textAlign: 'center', margin: 0 }}>
                Have a question? Call <a href={`tel:${c.business.phone}`} style={{ color: T.colors.accent, fontWeight: 700, textDecoration: 'none' }}>{c.business.phone_display}</a>.
              </p>
            )}
          </div>
        </section>

        <BoltCTA T={T} c={c} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
