import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { pageCopy, faqList, asText } from '../../../../lib/templates/shared/pageCopy.js'
import { buildBreadcrumbSchema, buildFAQSchema, buildConcernPageSchema, JsonLd, urlService } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { RailLayout, Paras, QAList, sideId } from './SereneSide.js'
import { pickCols, fillRows, FillCSS } from '../../../../lib/templates/shared/fill.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

/**
 * A page about a concern rather than a treatment.
 *
 * People search by problem before they know the solution: "acne scarring" is
 * typed long before "microneedling". These pages catch that earlier intent on
 * far less contested queries, and route the reader to the treatments this
 * practice actually offers for it.
 */
export default function SereneConcern({ config: c, siteSlug, concern }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const copy = pageCopy(c, 'concern_detail')
  const subhead = copy('hero_subheadline')
  const treatments = concern.treatments || []

  const faqs = faqList(copy('faq'))

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: concern.label, url: `/concerns/${concern.slug}` },
  ]

  const schemas = [
    buildConcernPageSchema(c, concern),
    buildBreadcrumbSchema(c, crumbs),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)

  const texts = { 'About this': asText(copy('intro')), 'What contributes': asText(copy('causes')), Approaches: asText(copy('treatment_options')) }
  const tCell = fillRows(treatments.length, pickCols(treatments.length, 3))
  const treatmentsLabel = `${labels.offering} for ${concern.label.toLowerCase()}`
  // The text sections in order, beside one side rail (SereneSide.js)
  const railSections = [
    ...Object.keys(texts).map(k => ({ label: k, body: texts[k] ? <Paras T={T} text={texts[k]} max={720} /> : null })),
    { label: 'Questions', body: faqs.length > 0 ? <QAList T={T} faqs={faqs} /> : null },
  ]

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${T.colors.borderLight}` }}>
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 4fr)',
            gap: 'clamp(32px, 6vw, 88px)',
            alignItems: 'end',
          }}>
            <div>
              <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
                Concern
              </div>
              <h1 style={{
                fontFamily: T.fonts.display,
                fontSize: 'clamp(32px, 4.6vw, 60px)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                {concern.label}
              </h1>
              {subhead && (
                <p style={{ fontSize: T.type.lg, lineHeight: 1.6, color: T.colors.textDim, margin: '24px 0 0', maxWidth: 620, fontWeight: 300 }}>
                  {subhead}
                </p>
              )}
            </div>

            {/* The right column was empty. A count and an action fill it and
                give the page something to do besides read. */}
            <div style={{ borderLeft: `1px solid ${T.colors.borderLight}`, paddingLeft: 'clamp(20px, 3vw, 40px)' }}>
              {treatments.length > 0 && (
                <>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 300, color: T.colors.accent, lineHeight: 1 }}>
                    {String(treatments.length).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: T.type.sm, color: T.colors.textDim, marginTop: 12, lineHeight: 1.6 }}>
                    {labels.offering.toLowerCase()} we offer that address this
                  </div>
                </>
              )}
              {c.business.phone_display && (
                <a href={c.business.booking_url || `tel:${c.business.phone}`} style={{
                  display: 'inline-block',
                  marginTop: 28,
                  background: T.colors.accent,
                  color: T.colors.onAccent,
                  padding: '14px 32px',
                  borderRadius: T.radius.full,
                  textDecoration: 'none',
                  fontSize: T.type.sm,
                  letterSpacing: '0.04em',
                }}>
                  {labels.conversion.replace(/^\w/, ch => ch.toUpperCase())}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Only treatments explicitly mapped to this concern. The mapping is a
            fixed table rather than a judgment, so an unrelated service can never
            surface here. */}
        {treatments.length > 0 && (
          <section id={sideId(treatmentsLabel)} style={{ scrollMarginTop: 96, background: T.colors.bgAlt, padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 3.4vw, 44px)', fontWeight: 300, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                {treatmentsLabel}
              </h2>
              <p style={{ fontSize: T.type.sm, color: T.colors.textMuted, margin: '0 0 40px', maxWidth: 560 }}>
                Which of these suits you is determined at a consultation.
              </p>

              <FillCSS />
              <div className="sr-fill" style={{ '--g': '8px' }}>
                {treatments.map((t, i) => {
                  const img = (c.images || {})[`service_${t.slug}`]
                  return (
                    <a
                      key={t.slug}
                      className="sr-cell"
                      href={`${base}${urlService(t.slug, c)}`}
                      style={{
                        ...tCell(i),
                        position: 'relative',
                        display: 'block',
                        minHeight: 240,
                        textDecoration: 'none',
                        color: T.colors.text,
                        background: T.colors.surface,
                        overflow: 'hidden',
                      }}
                    >
                      {img && (
                        <img src={img.url} alt={img.alt || t.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: img ? `linear-gradient(180deg, ${T.colors.overlayLight} 0%, ${T.colors.overlayStrong} 100%)` : 'none' }} />
                      <div data-on-image={img ? '' : undefined} style={{ '--on-image': T.colors.textOnImage, '--on-image-dim': T.colors.textOnImageDim, color: img ? T.colors.textOnImage : T.colors.text, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 28 }}>
                        <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', color: img ? T.colors.textOnImageDim : T.colors.accent, marginBottom: 12 }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div style={{ fontFamily: T.fonts.display, fontSize: T.type.lg, fontWeight: 300, lineHeight: 1.15 }}>
                          {t.name}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        <RailLayout T={T} c={c} labels={labels} sections={railSections} />

        <SereneCTA T={T} c={c} headline={concern.label} />
        <SereneFooter T={T} c={c} base={base} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
