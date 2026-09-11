import { buildBreadcrumbSchema, buildFAQSchema, urlFAQ } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { crewContext, crewFacts, CrewPage, PageHero, FaqList, QuoteCard } from './CrewChrome.js'

/**
 * The client's questions and answers (generated, else their own). With none,
 * a plain line pointing at the phone; on a concept, a note.
 */
export default function CrewFAQ({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const { T, C, wrap, concept, faqs, href, tradeNoun, name, sectionPad, phone, phoneDisplay } = x

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: urlFAQ() }]
  const schemas = [buildBreadcrumbSchema(c, crumbs), faqs.length > 0 ? buildFAQSchema(faqs) : null]

  return (
    <CrewPage x={x} current="faq" schemas={schemas}>
      <PageHero x={x} crumbs={crumbs} eyebrow="Questions" title={`${tradeNoun} FAQ`} showProof={false} />

      <section style={{ paddingBlock: sectionPad }}>
        <div className="crew-detail" style={wrap}>
          <div>
            {faqs.length > 0 ? (
              <FaqList x={x} faqs={faqs} open />
            ) : concept ? (
              <ConceptNote T={T} minHeight={260} title="The questions customers ask you">
                The questions people ask before they book, answered in your words: how visits work, what to do beforehand, how you charge.
              </ConceptNote>
            ) : (
              <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: C.textDim, maxWidth: '48ch' }}>
                Have a question for {name}?{' '}
                {phone
                  ? <>Call <a href={`tel:${phone}`} style={{ color: C.text, fontWeight: 700 }}>{phoneDisplay}</a> or <a href={href.contact} style={{ color: C.text, fontWeight: 700 }}>send us a message</a>.</>
                  : <><a href={href.contact} style={{ color: C.text, fontWeight: 700 }}>Send us a message</a>.</>}
              </p>
            )}
          </div>
          <QuoteCard x={x} context="Still have a question?" facts={crewFacts(x)} />
        </div>
      </section>
    </CrewPage>
  )
}
