import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  breadcrumbsForArea,
  JsonLd,
  urlArea,
  urlCombo,
} from '../../../../lib/templates/shared/seo/index.js'
import { parseJson } from '../../../../lib/templates/shared/claims.js'
import { aroundTownFor } from './family/data.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { RailLayout, Paras, QAList, sideId } from './SereneSide.js'
import { pickCols, fillRows, FillCSS } from '../../../../lib/templates/shared/fill.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())

// Page copy arrives as plain text with blank lines between paragraphs.
const paragraphs = (text) => (typeof text === 'string' ? text : '')
  .split(/\n\s*\n/)
  .map(p => p.trim())
  .filter(Boolean)

function faqList(raw) {
  const list = parseJson(raw)
  return (Array.isArray(list) ? list : [])
    .map(f => ({ question: f?.question || f?.q, answer: f?.answer || f?.a }))
    .filter(f => f.question && f.answer)
}

/**
 * One location. On a client site it carries copy written for this area; on a
 * concept it shows the page's structure with a note in place of the copy,
 * because nothing has been written for the area yet.
 */
export default function SereneAreaDetail({ config: c, siteSlug, area }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const isConcept = c.concept === true
  const copy = (!isConcept && c.page_copy && typeof c.page_copy === 'object') ? c.page_copy : {}
  const services = c.services || []
  const otherAreas = (c.service_areas || []).filter(a => a && a !== area)

  const subheadline = typeof copy.hero_subheadline === 'string' ? copy.hero_subheadline.trim() : ''
  const intro = paragraphs(copy.intro)
  const local = paragraphs(copy.local_context)
  // Neighbourhoods and landmarks the client named, as sentences. Their own
  // answers, so they show on a real site whether or not copy was written.
  const around = isConcept ? [] : aroundTownFor(c, area, 'clinic').sentences
  const faqs = faqList(copy.faq)

  const schemas = isConcept ? [] : [
    buildBreadcrumbSchema(c, breadcrumbsForArea(area, c)),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)

  const bookHref = c.business?.booking_url || (c.business?.phone ? `tel:${c.business.phone}` : null)

  const allLabel = `All ${labels.offering.toLowerCase()}`
  // Rows always full: 20 treatments go four across
  const cell = fillRows(services.length, pickCols(services.length, 4))
  // The text sections in order, beside one side rail (SereneSide.js)
  const parasBody = (ps) => ps.length > 0 ? <Paras T={T} text={ps.join('\n\n')} /> : null
  const railSections = [
    { label: 'Overview', body: parasBody(intro) },
    { label: `Around ${area}`, body: parasBody(local) },
    { label: 'Where we work', body: parasBody(around) },
    { label: 'Questions', body: faqs.length > 0 ? <QAList T={T} faqs={faqs} /> : null },
  ]

  const hasCopy = intro.length > 0 || local.length > 0

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(40px, 5vw, 64px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              {labels.place}
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.6vw, 60px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 880,
            }}>
              {labels.offering} in {area}
            </h1>
            {subheadline && (
              <p style={{ fontSize: T.type.lg, lineHeight: 1.6, color: T.colors.textDim, margin: '24px 0 0', maxWidth: 560, fontWeight: 300 }}>
                {subheadline}
              </p>
            )}
            {bookHref && (
              <a href={bookHref} style={{
                display: 'inline-block',
                marginTop: 40,
                background: T.colors.accent,
                color: T.colors.onAccent,
                padding: '16px 40px',
                borderRadius: T.radius.full,
                textDecoration: 'none',
                fontSize: T.type.sm,
                letterSpacing: '0.04em',
              }}>
                {labels.conversion.replace(/^\w/, ch => ch.toUpperCase())}
              </a>
            )}
          </div>
        </section>

        {isConcept && (
          <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(40px, 5vw, 64px)' }}>
            <div style={{
              maxWidth: 1400,
              margin: '0 auto',
              padding: '28px 32px',
              border: `1px solid ${T.colors.border}`,
              borderRadius: T.radius.md,
            }}>
              <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 12 }}>
                Concept
              </div>
              <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, margin: 0, maxWidth: 720 }}>
                Shown in structure only. Each location you serve gets its own page like this,
                written for that area: an introduction, what&apos;s relevant locally, questions
                people there ask, and links to every {(c.profile?.nouns?.offering?.singular || 'service').toLowerCase()}.
              </p>
            </div>
          </section>
        )}

        {/* The treatment list comes first, straight under the heading, so
            visitors see what is offered here before any reading. */}
        {/* Every treatment for this area, each linking to its combo page. This
            is what gets the combo pages crawled from the area side. */}
        {services.length > 0 && (
          <section id={sideId(allLabel)} style={{ scrollMarginTop: 96, padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)', borderTop: `1px solid ${T.colors.borderLight}` }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <h2 style={{
                fontFamily: T.fonts.display,
                fontSize: 'clamp(24px, 3.2vw, 38px)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                margin: '0 0 40px',
              }}>
                All {labels.offering.toLowerCase()}
              </h2>

              <FillCSS />
              <div className="sr-fill" style={{ '--g': '8px' }}>
                {services.map((s, i) => {
                  const img = (c.images || {})[`service_${s.slug}`]
                  return (
                    <a
                      key={s.slug}
                      className="sr-cell"
                      href={`${base}${urlCombo(s, area, c)}`}
                      style={{
                        ...cell(i),
                        position: 'relative',
                        display: 'block',
                        minHeight: 220,
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: T.colors.text,
                        background: T.colors.surface,
                      }}
                    >
                      {img && (
                        <img src={img.url} alt={img.alt || s.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: img ? `linear-gradient(180deg, ${T.colors.overlayFaint} 0%, ${T.colors.overlayStrong} 100%)` : 'none' }} />
                      <div data-on-image={img ? '' : undefined} style={{ '--on-image': T.colors.textOnImage, '--on-image-dim': T.colors.textOnImageDim, color: img ? T.colors.textOnImage : T.colors.text, position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 24, minHeight: 220 }}>
                        <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(17px, 1.9vw, 22px)', fontWeight: 300, lineHeight: 1.2 }}>
                          {s.name} in {area}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        <RailLayout T={T} c={c} labels={labels} area={area} sections={railSections} />

        {otherAreas.length > 0 && (
          <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(56px, 8vw, 104px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', borderTop: `1px solid ${T.colors.borderLight}`, paddingTop: 'clamp(40px, 5vw, 56px)' }}>
              <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
                Other {labels.place.toLowerCase()}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 8 }}>
                {otherAreas.map(a => (
                  <a
                    key={a}
                    href={`${base}${urlArea(a, c)}`}
                    style={{
                      display: 'block',
                      padding: '18px 20px',
                      border: `1px solid ${T.colors.borderLight}`,
                      background: T.colors.surface,
                      textDecoration: 'none',
                      color: T.colors.text,
                      fontFamily: T.fonts.display,
                      fontSize: 20,
                      fontWeight: 300,
                      lineHeight: 1.2,
                    }}
                  >
                    {a}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <SereneCTA T={T} c={c} headline={`${labels.offering} in ${area}`} />
        <SereneFooter T={T} c={c} base={base} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
