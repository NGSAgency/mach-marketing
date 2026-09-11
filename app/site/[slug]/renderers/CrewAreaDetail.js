import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  breadcrumbsForArea,
} from '../../../../lib/templates/shared/seo/index.js'
import { pageCopy, faqList, asText } from '../../../../lib/templates/shared/pageCopy.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  crewContext, crewFacts, CrewPage, FactStrip, PageHero, SectionHead, Prose, FaqList, QuoteCard,
  ServiceGrid, AreaChips,
} from './CrewChrome.js'

/**
 * One area. Links to every service in this area (the combo pages) and to the
 * other areas. On a concept only the area the copy was written for carries
 * it; every other area page shows its structure and a note.
 */
export default function CrewAreaDetail({ config: c, siteSlug, area }) {
  const x = crewContext(c, siteSlug)
  const { C, T, wrap, concept, services, areas, href, imgs, name, tradeNoun, sectionPad } = x

  const genFor = c.generated_for || {}
  const generatedArea = genFor.area || areas[0]
  const isGenerated = concept && generatedArea === area
  const copy = pageCopy(c, 'area_detail', { concept: isGenerated })
  const noCopy = concept && !isGenerated

  const intro = asText(copy('intro'))
  const local = asText(copy('local_context'))
  const faqs = faqList(copy('faq'))
  const subhead = copy('hero_subheadline')
  const title = `${tradeNoun} in ${area}`
  const otherAreas = areas.filter(a => a !== area)

  const crumbs = breadcrumbsForArea(area, c)
  const schemas = [
    buildBreadcrumbSchema(c, crumbs),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ]

  const facts = crewFacts(x)
  const hasBody = !!(intro || local || faqs.length || noCopy)
  const block = { paddingTop: 48, marginTop: 48, borderTop: `1px solid ${C.border}` }
  const image = imgs[`area_${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`] || imgs.home_hero || imgs.home_secondary

  return (
    <CrewPage x={x} current="areas" schemas={schemas}>
      <PageHero x={x} image={image} crumbs={crumbs} eyebrow="Service area" title={title} support={subhead} />

      {hasBody ? (
        <section style={{ paddingBlock: sectionPad }}>
          <div className="crew-detail" style={wrap}>
            <div>
              {noCopy ? (
                <>
                  <SectionHead x={x} eyebrow="Overview" title={`${name} in ${area}`} small />
                  <ConceptNote T={T} minHeight={260} title={`Your ${area} page`}>
                    An introduction written for {area}: the calls you get there, what is different about homes in that part of town, and the questions people there ask. Written for your business{generatedArea ? `, like the ${generatedArea} page,` : ''} and checked by you before it goes live.
                  </ConceptNote>
                </>
              ) : (
                <>
                  {intro && (
                    <div>
                      <SectionHead x={x} eyebrow="Overview" title={`${name} in ${area}`} small />
                      <Prose x={x} text={intro} />
                    </div>
                  )}
                  {local && (
                    <div style={intro ? block : {}}>
                      <SectionHead x={x} eyebrow="Local knowledge" title={`Around ${area}`} small />
                      <Prose x={x} text={local} />
                    </div>
                  )}
                  {faqs.length > 0 && (
                    <div style={intro || local ? block : {}}>
                      <SectionHead x={x} eyebrow="Questions" title={`Questions from ${area}`} small />
                      <FaqList x={x} faqs={faqs} open={faqs.length <= 3} />
                    </div>
                  )}
                </>
              )}
            </div>
            <QuoteCard x={x} context={`Serving ${area}`} facts={facts} />
          </div>
        </section>
      ) : (
        // No written copy for this page: the facts under the header, which
        // already carries both routes to act.
        <FactStrip x={x} facts={facts} />
      )}

      {/* Every service in this area: the combo pages, linked from the area
          side so each one is found and crawled. */}
      {services.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow={area} title={`Services in ${area}`} />
            <ServiceGrid
              x={x}
              services={services}
              hrefFor={s => href.combo(s, area)}
              titleFor={s => `${s.name} in ${area}`}
              summary={false}
              cta="See details →"
            />
          </div>
        </section>
      )}

      {otherAreas.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow="Service areas"
              title="Other areas we serve"
              aside={<a href={href.areas} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>All service areas</a>}
            />
            <AreaChips x={x} areas={otherAreas} />
          </div>
        </section>
      )}
    </CrewPage>
  )
}
