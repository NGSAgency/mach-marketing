import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildServiceSchema,
  breadcrumbsForCombo,
} from '../../../../lib/templates/shared/seo/index.js'
import { serviceEmergencyBadge } from '../../../../lib/templates/shared/claims.js'
import { pageCopy, faqList, asText } from '../../../../lib/templates/shared/pageCopy.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  crewContext, crewFacts, CrewPage, FactStrip, PageHero, SectionHead, Prose, FaqList, QuoteCard,
  ServiceCard, LinkTile,
} from './CrewChrome.js'

/**
 * One service in one area, the highest-intent page type. Links up to the
 * service and the area, across to this service in the other areas, and to the
 * other services in this area. On a concept only the service-in-area pair the
 * copy was written for carries it; every other pair shows a note.
 */
export default function CrewCombo({ config: c, siteSlug, service, area }) {
  const x = crewContext(c, siteSlug)
  const { C, T, wrap, concept, services, areas, href, imgs, tradeNoun, sectionPad } = x

  const genFor = c.generated_for || {}
  const genService = genFor.service || services[0]?.slug
  const genArea = genFor.area || areas[0]
  const isGenerated = concept && genService === service.slug && genArea === area
  const copy = pageCopy(c, 'combo', { concept: isGenerated })
  const noCopy = concept && !isGenerated

  const intro = asText(copy('intro'))
  const local = asText(copy('local_considerations'))
  const faqs = faqList(copy('faq'))
  const subhead = copy('hero_subheadline')
  const title = `${service.name} in ${area}`

  const crumbs = breadcrumbsForCombo(service, area, c)
  const schemas = [
    buildBreadcrumbSchema(c, crumbs),
    buildServiceSchema(c, { ...service, description: intro || undefined }),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ]

  const facts = crewFacts(x, service)
  const upLinks = [
    { href: href.service(service.slug), label: `${service.name} services` },
    { href: href.area(area), label: `${tradeNoun} in ${area}` },
  ]
  const otherAreas = areas.filter(a => a !== area)
  const otherServices = services.filter(s => s.slug !== service.slug)
  const genServiceObj = services.find(s => s.slug === genService)
  const block = { paddingTop: 48, marginTop: 48, borderTop: `1px solid ${C.border}` }
  const hasBody = !!(intro || local || faqs.length || noCopy)

  return (
    <CrewPage x={x} current="services" schemas={schemas}>
      <PageHero
        x={x}
        image={imgs.combo_hero || imgs[`service_${service.slug}`]}
        crumbs={crumbs}
        eyebrow={area}
        badge={serviceEmergencyBadge(c, service, { long: true })}
        title={title}
        support={subhead}
      />

      {hasBody ? (
        <section style={{ paddingBlock: sectionPad }}>
          <div className="crew-detail" style={wrap}>
            <div>
              {noCopy ? (
                <>
                  <SectionHead x={x} eyebrow="Overview" title={title} as="h2" small />
                  <ConceptNote T={T} minHeight={260} title={`Your ${service.name} page for ${area}`}>
                    {service.name} written for {area}: what you see in homes there, anything local that changes how you do the job, and the questions people in {area} ask. {genServiceObj && genArea ? `Written like the ${genServiceObj.name} in ${genArea} page, ` : 'Written for your business '}and checked by you before it goes live.
                  </ConceptNote>
                </>
              ) : (
                <>
                  {intro && (
                    <div>
                      <SectionHead x={x} eyebrow="Overview" title={`${service.name} for ${area} homes`} small />
                      <Prose x={x} text={intro} />
                    </div>
                  )}
                  {local && (
                    <div style={intro ? block : {}}>
                      <SectionHead x={x} eyebrow="Local knowledge" title={`What’s different in ${area}`} small />
                      <Prose x={x} text={local} />
                    </div>
                  )}
                  {faqs.length > 0 && (
                    <div style={intro || local ? block : {}}>
                      <SectionHead x={x} eyebrow="Questions" title={`${service.name} in ${area}: questions`} small />
                      <FaqList x={x} faqs={faqs} open={faqs.length <= 3} />
                    </div>
                  )}
                </>
              )}
            </div>
            <QuoteCard x={x} context={title} facts={facts} links={upLinks} />
          </div>
        </section>
      ) : (
        // No written copy for this page: the facts under the header, which
        // already carries both routes to act.
        <FactStrip x={x} facts={facts} links={upLinks} />
      )}

      {otherAreas.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow={service.name} title={`${service.name} in nearby areas`} />
            <div className="crew-tiles">
              {otherAreas.map(a => <LinkTile key={a} x={x} href={href.combo(service, a)} lead={`${service.name} in`} title={a} />)}
            </div>
          </div>
        </section>
      )}

      {otherServices.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow={area}
              title={`Other services in ${area}`}
              aside={<a href={href.area(area)} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>{tradeNoun} in {area}</a>}
            />
            <div className="crew-services">
              {otherServices.map(s => (
                <ServiceCard key={s.slug} x={x} s={s} href={href.combo(s, area)} title={`${s.name} in ${area}`} summary={false} cta="See details →" />
              ))}
            </div>
          </div>
        </section>
      )}
    </CrewPage>
  )
}
