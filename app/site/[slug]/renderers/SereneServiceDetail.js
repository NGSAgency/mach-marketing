import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildMedicalProcedureSchema,
  breadcrumbsForService,
  JsonLd,
  urlCombo,
} from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'
import { pageCopy, faqList, asText } from '../../../../lib/templates/shared/pageCopy.js'
import { resolveSections } from '../../../../lib/templates/shared/sections.js'
import { signsFrom, serviceCostRows } from './family/data.js'
import { RelatedLinks } from '../../../../lib/templates/shared/related.js'
import { RailLayout, Paras, QAList } from './SereneSide.js'

export default function SereneServiceDetail({ config: c, siteSlug, service, conceptOnly = false }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  // On a concept only the first treatment has copy; the others show structure.
  const copy = pageCopy(c, 'service_detail', { concept: !conceptOnly })
  const img = (c.images || {})[`service_${service.slug}`]
  const areas = c.service_areas || []

  const faqs = faqList(copy('faq'))
  // The symptoms or concerns that bring someone to this treatment. Hidden when
  // the client has turned the section off in the questionnaire.
  const signs = resolveSections(c, 'serene').signs ? signsFrom(copy('signs')) : null

  const schemas = [
    buildBreadcrumbSchema(c, breadcrumbsForService(service, c)),
    buildMedicalProcedureSchema(c, service),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)
  const subhead = copy('hero_subheadline')

  // The page's sections in order, for the side list of a long section
  const texts = {
    Overview: asText(copy('intro')), 'What to expect': asText(copy('what_to_expect')),
    'Our approach': asText(copy('materials_and_methods')), 'Who it suits': asText(copy('candidacy')),
    Aftercare: asText(copy('aftercare')),
  }

  // Prices as label and value rows, with any notes under them.
  //
  // SERENE was built before the shared content layer and never read any of
  // it, so a client could tell us what a treatment costs, how they take
  // payment, whether a consultation is free and what their licence number is,
  // and the site said none of it. For a practice where the first question is
  // "how much is this", that was the worst gap of the eight families.
  const cost = serviceCostRows(c, service)
  const costBody = cost.has ? (
    <div style={{ maxWidth: 680 }}>
      <dl style={{ margin: 0 }}>
        {cost.rows.map((r, i) => (
          <div key={r.k} style={{
            display: 'grid', gridTemplateColumns: 'minmax(0, 34%) minmax(0, 1fr)', gap: 24,
            alignItems: 'baseline', paddingBlock: 18,
            borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}`,
          }}>
            <dt style={{ fontSize: T.type.xs, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.colors.accent }}>{r.k}</dt>
            <dd style={{ margin: 0, fontSize: T.type.base, lineHeight: 1.7, color: T.colors.text, fontWeight: 300 }}>{r.v}</dd>
          </div>
        ))}
      </dl>
      {cost.notes.map((n, i) => (
        <p key={i} style={{ margin: i ? '14px 0 0' : '22px 0 0', fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>{n}</p>
      ))}
    </div>
  ) : null

  // The concern set in the display face, what it usually means underneath
  const signsBody = signs ? (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 680 }}>
      {signs.map((sg, i) => (
        <li key={i} style={{ padding: '22px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}` }}>
          <h3 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(19px, 2vw, 23px)', fontWeight: 300, lineHeight: 1.25, letterSpacing: '-0.01em', margin: 0, color: T.colors.text }}>{sg.sign}</h3>
          {sg.detail && <p style={{ fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim, margin: '10px 0 0' }}>{sg.detail}</p>}
        </li>
      ))}
    </ul>
  ) : null

  // Every text section in order, beside one side rail (SereneSide.js)
  const textBody = (k) => texts[k] ? <Paras T={T} text={texts[k]} /> : null
  const railSections = [
    { label: 'Overview', body: textBody('Overview') },
    { label: 'Signs to look for', body: signsBody },
    { label: 'What to expect', body: textBody('What to expect') },
    { label: 'Our approach', body: textBody('Our approach') },
    { label: 'Who it suits', body: textBody('Who it suits') },
    { label: 'Aftercare', body: textBody('Aftercare') },
    { label: 'What it costs', body: costBody },
    { label: 'Questions', body: faqs.length > 0 ? <QAList T={T} faqs={faqs} /> : null },
  ]

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />
        <main>

        <section style={{
          display: 'grid',
          gridTemplateColumns: img ? 'minmax(0, 1fr) minmax(0, 0.9fr)' : '1fr',
          alignItems: 'stretch',
          borderBottom: `1px solid ${T.colors.borderLight}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 6vw, 88px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              {labels.offering}
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.4vw, 58px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {service.name}
            </h1>
            {subhead && (
              <p style={{ fontSize: T.type.lg, lineHeight: 1.6, color: T.colors.textDim, margin: '24px 0 0', maxWidth: 480, fontWeight: 300 }}>
                {subhead}
              </p>
            )}
            {c.business.phone_display && (
              <a href={c.business.booking_url || `tel:${c.business.phone}`} style={{
                display: 'inline-block',
                marginTop: 40,
                alignSelf: 'flex-start',
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

          {img && (
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(260px, 34vh, 480px)', maxWidth: 700, justifySelf: 'end', width: '100%' }}>
              <img src={img.url} alt={img.alt || service.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </section>

        {conceptOnly && (
          <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 96px) 0' }}>
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
                Shown in structure only. Every treatment gets a page written like the one
                for {(c.services || [])[0]?.name}, with its own overview, what to expect,
                aftercare, FAQ schema, and links to each area you serve.
              </p>
            </div>
          </section>
        )}

        <div style={{ paddingTop: conceptOnly ? 'clamp(8px, 2vw, 24px)' : 'clamp(16px, 3vw, 32px)' }}>
          <RailLayout T={T} c={c} labels={labels} sections={railSections} />
        </div>

        {/* Links to every area page for this treatment. These are the combo
            pages, and cross-linking them from the treatment page is what gets
            them crawled. */}
        {areas.length > 0 && (
          <section style={{ padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 32 }}>
                {service.name} near you
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 8 }}>
                {areas.map(area => (
                  <a
                    key={area}
                    href={`${base}${urlCombo(service, area, c)}`}
                    style={{
                      position: 'relative',
                      display: 'block',
                      minHeight: 130,
                      overflow: 'hidden',
                      background: T.colors.surface,
                      border: `1px solid ${T.colors.borderLight}`,
                      textDecoration: 'none',
                      color: T.colors.text,
                    }}
                  >
                    {/* Deliberately no image: the same treatment photo repeated
                        across eight area tiles reads as a mistake. */}
                    <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 20, minHeight: 130 }}>
                      <div>
                        <div style={{ fontSize: T.type.xs, letterSpacing: '0.14em', color: T.colors.accent, marginBottom: 6 }}>
                          {service.name}
                        </div>
                        <div style={{ fontFamily: T.fonts.display, fontSize: 20, fontWeight: 300, lineHeight: 1.15 }}>
                          {area}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <RelatedLinks c={c} base={base} kind="service" slug={service.slug} C={{ text: T.colors.text, textDim: T.colors.textDim, accent: T.colors.accent, border: T.colors.border }} F={{ display: T.fonts.display }} wrap={{ maxWidth: 1400, margin: '0 auto', paddingInline: 'clamp(24px, 5vw, 96px)', boxSizing: 'border-box' }} />
        <SereneCTA T={T} c={c} headline={service.name} />
        </main>
        <SereneFooter T={T} c={c} base={base} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
