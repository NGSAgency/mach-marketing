import { homeModel, proofItems, listAreas } from './family/data.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  railContext, RailPage, Opening, Band, Section, Head, Prose, Chips, ServiceCards,
  Crew, Work, Rating, Questions, Figures, Closing, workItems, textLink,
} from './RailKit.js'

// RAIL's home page. Three bands rather than a list of equal sections: the
// work, then the people on the second ground, then everything that answers a
// question. The crew is this family's own section and sits in the second
// band, high on the page — RAIL is the family for a business whose people are
// the argument, so they are not buried on an About page.
//
// Every section renders from real data. A section with nothing behind it
// hides; on a concept it shows a labelled note instead.

export default function RailHome({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = homeModel(x)
  const { C, concept, services, areas, href, sections, tradeNoun, offeringLabel, placeLabel } = x

  const proof = proofItems(x)
  const people = (c.providers || []).filter(p => p && p.name).slice(0, 6)
  const photos = workItems(x)
  const review = m.reviews[0] || null

  const showCrew = sections.team && people.length > 0
  const showWork = sections.gallery && photos.length > 1
  const showRating = sections.reviews && (proof.some(p => p.kind === 'rating') || review)
  const showFigures = sections.figures && proof.length > 1
  const showFaq = sections.faq && m.faqs.length > 0
  const band = showCrew || showWork || showRating || concept

  return (
    <RailPage x={x} schemas={m.schemas} current="home">
      <Opening
        x={x}
        image={m.hero}
        eyebrow={x.name}
        title={m.headline}
        lede={m.support}
      />

      {m.trust.length > 0 && (
        <div style={{ ...x.wrap, paddingTop: 'clamp(22px, 2.6vw, 34px)' }}>
          <Chips x={x} items={m.trust.map(t => ({ label: t.text }))} />
        </div>
      )}

      {/* ---- band one: the work ---- */}
      {services.length > 0 && (
        <Section x={x}>
          <Head x={x} eyebrow={offeringLabel} title="What we take care of"
            aside={services.length > 6 ? <a href={href.services} style={textLink(x)}>All {offeringLabel.toLowerCase()}</a> : null} />
          <ServiceCards x={x} services={services.slice(0, 8)} hrefFor={s => href.service(s.slug)} />
        </Section>
      )}

      {/* ---- band two: the people ---- */}
      {band && (
        <Band x={x}>
          {showCrew && (
            <Section x={x}>
              <Head x={x} eyebrow="The crew" title="Who turns up"
                line={people.length > 1 ? 'Whoever is coming, you get their name when you book.' : null} />
              <Crew x={x} people={people} />
            </Section>
          )}

          {!showCrew && concept && sections.team && (
            <Section x={x}>
              <Head x={x} eyebrow="The crew" title="Who turns up" />
              <ConceptNote T={x.T} minHeight={220} title="Your team">
                The people who will actually be at the house, with their names, what they are certified in and how long they have
                been doing it. Added on the “Your Team” step of your questionnaire, and this section hides entirely if you would
                rather not name anyone.
              </ConceptNote>
            </Section>
          )}

          {showWork && (
            <Section x={x} tight={showCrew}>
              <Head x={x} eyebrow="Recent work" title="Jobs we have done" />
              <Work x={x} items={photos} />
            </Section>
          )}

          {showRating && (
            <Section x={x} tight={showCrew || showWork}>
              <Rating x={x} proof={proof} review={review} />
              {x.statedOnTheirSite && (
                <p style={{ margin: '18px 0 0', fontSize: 14, color: C.textMuted }}>Rating as stated on their own website.</p>
              )}
            </Section>
          )}
        </Band>
      )}

      {/* ---- band three: the answers ---- */}
      {showFigures && <Figures x={x} items={proof.map(p => ({ value: p.value, label: p.label }))} />}

      {m.intro && (
        <Section x={x}>
          <Head x={x} eyebrow="About us" title={`Why people call ${x.name}`}
            aside={x.hasAbout ? <a href={href.about} style={textLink(x)}>More about us</a> : null} />
          <Prose x={x} text={m.intro} lead />
        </Section>
      )}

      {m.whyUs.length > 0 && (
        <Section x={x} tight={!!m.intro}>
          <div className="rl-qa">
            {m.whyUs.map(w => (
              <div key={w.title} style={{ borderTop: `3px solid ${C.accent}`, paddingTop: 15 }}>
                <h3 style={x.h3}>{w.title}</h3>
                <p style={{ margin: '6px 0 0', color: C.textDim, fontSize: 15.5, lineHeight: 1.6 }}>{w.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {areas.length > 0 && (
        <Section x={x}>
          <Head x={x} eyebrow={placeLabel} title="Where we work"
            line={`${tradeNoun} in ${listAreas(areas)}.`}
            aside={<a href={href.areas} style={textLink(x)}>All {placeLabel.toLowerCase()}</a>} />
          <Chips x={x} items={areas.map(a => ({ href: href.area(a), label: a }))} />
        </Section>
      )}

      {showFaq && (
        <Section x={x} tight={areas.length > 0}>
          <Head x={x} eyebrow="Questions" title="Good to know"
            aside={<a href={href.faq} style={textLink(x)}>All questions</a>} />
          <Questions x={x} faqs={m.faqs.slice(0, 4)} />
        </Section>
      )}

      <Closing x={x} />
    </RailPage>
  )
}
