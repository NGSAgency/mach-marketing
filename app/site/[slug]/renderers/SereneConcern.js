import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd, urlService } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
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
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const gen = c.generated || {}
  const treatments = concern.treatments || []

  const faqs = Array.isArray(gen['concern_detail|faq']) ? gen['concern_detail|faq'] : []

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Concerns', url: '/concerns' },
    { name: concern.label, url: `/concerns/${concern.slug}` },
  ]

  const schemas = [
    buildBreadcrumbSchema(c, crumbs),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)

  const Block = ({ label, body }) => body ? (
    <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(40px, 6vw, 72px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 9fr)', gap: 'clamp(24px, 5vw, 80px)' }}>
        <div style={{
          fontFamily: T.fonts.display,
          fontSize: 'clamp(21px, 2.4vw, 30px)',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: T.colors.text,
          paddingTop: 4,
        }}>
          {label}
        </div>
        <div style={{ maxWidth: 780, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
          {String(body).split('\n\n').map((p, i) => <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>)}
        </div>
      </div>
    </section>
  ) : null

  return (
    <>
      <SereneResponsive />
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />

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
              {gen['concern_detail|hero_subheadline'] && (
                <p style={{ fontSize: T.type.lg, lineHeight: 1.6, color: T.colors.textDim, margin: '24px 0 0', maxWidth: 620, fontWeight: 300 }}>
                  {gen['concern_detail|hero_subheadline']}
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
                <a href={`tel:${c.business.phone}`} style={{
                  display: 'inline-block',
                  marginTop: 28,
                  background: T.colors.accent,
                  color: T.colors.bg,
                  padding: '14px 32px',
                  borderRadius: T.radius.full,
                  textDecoration: 'none',
                  fontSize: T.type.sm,
                  letterSpacing: '0.04em',
                }}>
                  {labels.conversion.replace(/\b\w/g, ch => ch.toUpperCase())}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Only treatments explicitly mapped to this concern. The mapping is a
            fixed table rather than a judgment, so an unrelated service can never
            surface here. */}
        {treatments.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 3.4vw, 44px)', fontWeight: 300, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                {labels.offering} for {concern.label.toLowerCase()}
              </h2>
              <p style={{ fontSize: T.type.sm, color: T.colors.textMuted, margin: '0 0 40px', maxWidth: 560 }}>
                Which of these suits you is determined at a consultation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 8 }}>
                {treatments.map((t, i) => {
                  const img = (c.images || {})[`service_${t.slug}`]
                  return (
                    <a
                      key={t.slug}
                      href={`${base}${urlService(t.slug, c)}`}
                      style={{
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
                      <div style={{ position: 'absolute', inset: 0, background: img ? 'linear-gradient(180deg, rgba(15,14,13,0.1) 0%, rgba(15,14,13,0.85) 100%)' : 'none' }} />
                      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 28 }}>
                        <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', color: T.colors.accent, marginBottom: 12 }}>
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

        <div style={{ paddingTop: 'clamp(40px, 6vw, 72px)' }}>
          <Block label="About this" body={gen['concern_detail|intro']} />
          <Block label="What contributes" body={gen['concern_detail|causes']} />
          <Block label="Approaches" body={gen['concern_detail|treatment_options']} />
        </div>

        {faqs.length > 0 && (
          <section style={{ padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 9fr)', gap: 'clamp(24px, 5vw, 80px)' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 300, margin: 0, letterSpacing: '-0.015em' }}>
                Questions
              </h2>
              <div style={{ maxWidth: 720 }}>
                {faqs.map((f, i) => (
                  <div key={i} style={{ padding: '24px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}` }}>
                    <h3 style={{ fontSize: T.type.lg, fontWeight: 400, margin: '0 0 10px' }}>{f.question}</h3>
                    <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, margin: 0 }}>{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <SereneCTA T={T} c={c} headline={concern.label} />
        <SereneFooter T={T} c={c} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
