import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildServiceSchema,
  breadcrumbsForService,
} from '../../../../lib/templates/shared/seo/index.js'
import { serviceEmergencyBadge, parseJson } from '../../../../lib/templates/shared/claims.js'
import { pageCopy, faqList, asText } from '../../../../lib/templates/shared/pageCopy.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  crewContext, crewFacts, CrewPage, FactStrip, PageHero, SectionHead, Prose, Steps, FaqList, QuoteCard,
  ServiceCard, LinkTile, looksLikeJson,
} from './CrewChrome.js'
import { signsFrom, lowerName, pricingModel } from './family/data.js'

/** "What to expect" as steps when it is a list, else null. */
export function stepsFrom(v) {
  const list = Array.isArray(v) ? v : (looksLikeJson(v) ? parseJson(v) : null)
  if (!Array.isArray(list)) return null
  const steps = list.map(s => (typeof s === 'string'
    ? { title: null, description: s }
    : { title: s?.title || s?.name || null, description: s?.description || s?.text || s?.body || null }))
    .filter(s => s.title || s.description)
  return steps.length ? steps : null
}

/** A single-paragraph line fit for a page header, or null. */
export const oneLine = (s) => (typeof s === 'string' && s.trim() && !looksLikeJson(s) && !/\n/.test(s.trim()) && s.length <= 220 ? s.trim() : null)

/**
 * One service. Links to this service in every area (the combo pages) and to
 * related services. On a concept only the service the copy was written for
 * carries it; every other service page shows its structure and a note.
 */
export default function CrewServiceDetail({ config: c, siteSlug, service }) {
  const x = crewContext(c, siteSlug)
  const { C, F, T, wrap, concept, services, areas, href, imgs, name, sectionPad } = x

  const genFor = c.generated_for || {}
  const generatedSlug = genFor.service || services[0]?.slug
  const isGenerated = concept && generatedSlug === service.slug
  const copy = pageCopy(c, 'service_detail', { concept: isGenerated })
  const noCopy = concept && !isGenerated

  // Client data sometimes carries page copy in the description; only plain
  // prose is used as a fallback.
  const ownDescription = !concept && service.description && !looksLikeJson(service.description) ? service.description : null
  const intro = asText(copy('intro')) || ownDescription
  const rawSteps = copy('what_to_expect')
  const steps = stepsFrom(rawSteps)
  const stepsText = steps ? null : asText(rawSteps)
  const methods = asText(copy('materials_and_methods'))
  // The symptoms people search for, in their words, before they know the name
  // of the job. Hidden when the client has turned the section off.
  const signs = x.sections.signs ? signsFrom(copy('signs')) : null
  const faqs = faqList(copy('faq'))
  const subhead = copy('hero_subheadline') || (oneLine(service.short) !== intro ? oneLine(service.short) : null)

  const crumbs = breadcrumbsForService(service, c)
  const schemas = [
    buildBreadcrumbSchema(c, crumbs),
    buildServiceSchema(c, { ...service, description: intro || oneLine(service.short) || undefined }),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ]

  const related = [
    ...services.filter(s => s.slug !== service.slug && s.category && s.category === service.category),
    ...services.filter(s => s.slug !== service.slug && !(s.category && s.category === service.category)),
  ].slice(0, 3)
  const generatedService = services.find(s => s.slug === generatedSlug)
  // What the job costs, from their own pricing answers. CREW published none
  // of them until now: a visitor could read the whole page and still not know
  // whether an estimate was free. It reads the shared model, so a field added
  // to the questionnaire reaches this page with the others.
  const cost = pricingModel(c)
  const hasBody = !!(intro || signs || steps || stepsText || methods || faqs.length || noCopy || cost.has)
  const facts = crewFacts(x, service)
  const badge = serviceEmergencyBadge(c, service, { long: true })

  const block = { paddingTop: 48, marginTop: 48, borderTop: `1px solid ${C.border}` }

  return (
    <CrewPage x={x} current="services" schemas={schemas}>
      <PageHero
        x={x}
        image={imgs[`service_${service.slug}`]}
        crumbs={crumbs}
        eyebrow={service.category && service.category !== service.name ? service.category : 'Services'}
        badge={badge}
        title={service.name}
        support={subhead}
      />

      {hasBody ? (
        <section style={{ paddingBlock: sectionPad }}>
          <div className="crew-detail" style={wrap}>
            <div>
              {noCopy ? (
                <>
                  <SectionHead x={x} eyebrow="Overview" title={`About ${service.name}`} small />
                  <ConceptNote T={T} minHeight={260} title={`Your ${service.name} page`}>
                    What {lowerName(service.name)} involves, {x.sections.signs ? 'the signs that send people looking for it, ' : ''}what happens on a visit, the products and methods you use, and the questions customers ask about it. Written for your business{generatedService ? `, like the ${generatedService.name} page,` : ''} and checked by you before it goes live.
                  </ConceptNote>
                </>
              ) : (
                <>
                  {intro && (
                    <div>
                      <SectionHead x={x} eyebrow="Overview" title={`About ${service.name}`} small />
                      <Prose x={x} text={intro} />
                    </div>
                  )}
                  {signs && (
                    <div style={intro ? block : {}}>
                      <SectionHead x={x} eyebrow="Know the signs" title={`Signs you need ${lowerName(service.name)}`} small />
                      <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, borderTop: `2px solid ${C.text}` }}>
                        {signs.map((sg, i) => (
                          <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: '0 18px', paddingBlock: 18, borderBottom: `1px solid ${C.border}` }}>
                            <span style={{ fontFamily: F.display, fontWeight: 800, fontSize: 15, letterSpacing: '0.08em', color: C.accentDim, paddingTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
                            <div>
                              <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(19px, 2vw, 23px)', lineHeight: 1.2 }}>{sg.sign}</h3>
                              {sg.detail && <p style={{ margin: '7px 0 0', color: C.textDim, fontSize: 16.5, lineHeight: 1.65 }}>{sg.detail}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(steps || stepsText) && (
                    <div style={intro || signs ? block : {}}>
                      <SectionHead x={x} eyebrow="How it works" title="What to expect" small />
                      {steps ? <Steps x={x} steps={steps} /> : <Prose x={x} text={stepsText} />}
                    </div>
                  )}
                  {methods && (
                    <div style={intro || signs || steps || stepsText ? block : {}}>
                      <SectionHead x={x} eyebrow="Methods" title="Products and methods" small />
                      <Prose x={x} text={methods} />
                    </div>
                  )}
                  {cost.has && (
                    <div style={intro || signs || steps || stepsText || methods ? block : {}}>
                      <SectionHead x={x} eyebrow="Cost" title="What it costs" small />
                      <dl style={{ margin: '22px 0 0', borderTop: `2px solid ${C.text}` }}>
                        {cost.rows.map(r => (
                          <div key={r.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 30%) minmax(0, 1fr)', gap: '0 18px', alignItems: 'baseline', paddingBlock: 16, borderBottom: `1px solid ${C.border}` }}>
                            <dt style={{ fontFamily: F.display, fontWeight: 800, fontSize: 14.5, letterSpacing: '0.06em', color: C.accentDim }}>{r.k}</dt>
                            <dd style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: C.text }}>{r.v}</dd>
                          </div>
                        ))}
                      </dl>
                      {cost.notes.map((n, i) => (
                        <p key={i} style={{ margin: i ? '12px 0 0' : '18px 0 0', color: C.textDim, fontSize: 16.5, lineHeight: 1.65 }}>{n}</p>
                      ))}
                    </div>
                  )}
                  {faqs.length > 0 && (
                    <div style={intro || signs || steps || stepsText || methods || cost.has ? block : {}}>
                      <SectionHead x={x} eyebrow="Questions" title={`${service.name} questions`} small />
                      <FaqList x={x} faqs={faqs} open={faqs.length <= 3} />
                    </div>
                  )}
                </>
              )}
            </div>
            <QuoteCard x={x} context={service.name} facts={facts} />
          </div>
        </section>
      ) : (
        // No written copy for this page: the facts under the header, which
        // already carries both routes to act.
        <FactStrip x={x} facts={facts} />
      )}

      {/* This service in every area: the combo pages, linked from here so
          they are found and crawled. */}
      {areas.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Service areas" title={`${service.name} near you`} />
            <div className="crew-tiles">
              {areas.map(a => <LinkTile key={a} x={x} href={href.combo(service, a)} lead={`${service.name} in`} title={a} />)}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow={`More from ${name}`}
              title="Other services"
              aside={<a href={href.services} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>All services</a>}
            />
            <div className="crew-services">
              {related.map(s => <ServiceCard key={s.slug} x={x} s={s} href={href.service(s.slug)} />)}
            </div>
          </div>
        </section>
      )}
    </CrewPage>
  )
}
