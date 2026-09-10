import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import FAQAccordion from './FAQAccordion.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

export default function SereneFAQ({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  const gen = c.generated || {}

  const raw = gen['faq|questions']
  let faqs = []
  if (Array.isArray(raw)) faqs = raw
  else if (typeof raw === 'string') {
    try { faqs = JSON.parse(raw.replace(/```json/gi, '').replace(/```/g, '').trim()) } catch { faqs = [] }
  }

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      {faqs.length > 0 && <JsonLd data={buildFAQSchema(faqs)} />}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 5vw, 56px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              Questions
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.6vw, 60px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Frequently asked
            </h1>
          </div>
        </section>

        <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)',
            gap: 'clamp(24px, 5vw, 80px)',
            alignItems: 'start',
          }}>
            <div style={{ fontSize: T.type.sm, lineHeight: 1.8, color: T.colors.textDim }}>
              Cannot find what you are looking for?
              {c.business.phone_display && (
                <>
                  {' '}
                  <a href={`tel:${c.business.phone}`} style={{ color: T.colors.accent, textDecoration: 'none', borderBottom: `1px solid ${T.colors.accent}` }}>
                    Call {c.business.phone_display}
                  </a>
                </>
              )}
            </div>

            <div>
              {faqs.length > 0 ? (
                <FAQAccordion
                  items={faqs}
                  tokens={{
                    display: T.fonts.display,
                    text: T.colors.text,
                    textDim: T.colors.textDim,
                    accent: T.colors.accent,
                    borderLight: T.colors.borderLight,
                  }}
                />
              ) : c.concept === true ? (
                <p style={{ fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
                  Questions your clients actually ask, answered here and marked up with FAQ
                  schema so search engines can surface the answers directly.
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
