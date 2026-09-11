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
  const { C, T, wrap, concept, services, areas, href, imgs, name, sectionPad } = x

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
  const hasBody = !!(intro || steps || stepsText || methods || faqs.length || noCopy)
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
                    What {service.name.toLowerCase()} involves, what happens on a visit, the products and methods you use, and the questions customers ask about it. Written for your business{generatedService ? `, like the ${generatedService.name} page,` : ''} and checked by you before it goes live.
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
                  {(steps || stepsText) && (
                    <div style={intro ? block : {}}>
                      <SectionHead x={x} eyebrow="How it works" title="What to expect" small />
                      {steps ? <Steps x={x} steps={steps} /> : <Prose x={x} text={stepsText} />}
                    </div>
                  )}
                  {methods && (
                    <div style={intro || steps || stepsText ? block : {}}>
                      <SectionHead x={x} eyebrow="Methods" title="Products and methods" small />
                      <Prose x={x} text={methods} />
                    </div>
                  )}
                  {faqs.length > 0 && (
                    <div style={intro || steps || stepsText || methods ? block : {}}>
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
