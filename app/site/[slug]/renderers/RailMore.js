import {
  areasIndexModel, areaModel, comboModel, aboutModel, contactModel, faqModel,
  proofItems, formColors, listAreas, lowerName, paragraphs, pricingModel,
} from './family/data.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import {
  railContext, RailPage, Opening, Masthead, Plate, Band, Section, Head, Prose, Chips,
  Directory, Faces, Questions, FactCard, Figures, Inset, Closing, Rows, Crew,
  workItems, textLink, btnAccent,
} from './RailKit.js'

// RAIL's remaining page types. Three of these carry a place, and no two of
// them open the same way: the areas index on a photograph, one area on the
// town set as large as the page will carry it, a service in a town on a solid
// plate of the brand colour.

/** Only figures a field actually gives us. There is no drive time from a
 *  business to a town anywhere in the data, so there is none on the page. */
function areaFigures(x) {
  const proof = proofItems(x)
  const rating = proof.find(p => p.kind === 'rating')
  return [
    rating && { value: rating.value, label: rating.label },
    x.emergency && { value: 'Same day', label: x.emergency.length <= 28 ? x.emergency : 'Availability' },
    x.services.length > 0 && { value: String(x.services.length), label: x.services.length === 1 ? 'Service available here' : 'Services available here' },
    x.year && { value: String(x.year), label: 'Working here since' },
  ].filter(Boolean).slice(0, 4)
}

// ---- Service areas ---------------------------------------------------------

export function RailAreas({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = areasIndexModel(x)
  const { areas, services, href, placeLabel, tradeNoun, phone, phoneDisplay, C } = x
  return (
    <RailPage x={x} schemas={m.schemas} current="areas">
      <Opening x={x} image={x.imgs.home_secondary || null} crumbs={m.crumbs} eyebrow={placeLabel} title={m.title}
        lede={areas.length > 0 ? `${tradeNoun} in ${listAreas(areas)}.` : null} />

      <Section x={x}>
        {areas.length > 0 ? (
          <Directory x={x} items={areas.map(a => ({
            href: href.area(a),
            title: a,
            line: services.length > 0 ? `${services.slice(0, 3).map(s => s.name).join(', ')}${services.length > 3 ? ' and more' : ''}` : null,
          }))} />
        ) : (
          <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
            {phone
              ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> to ask whether we cover your address.</>
              : <>Ask whether we cover your address: <a href={href.contact} style={textLink(x)}>get in touch</a>.</>}
          </p>
        )}
      </Section>

      <Closing x={x} />
    </RailPage>
  )
}

export function RailAreaDetail({ config: c, siteSlug, area }) {
  const x = railContext(c, siteSlug)
  const m = areaModel(x, area)
  const { C, concept, services, areas, href, tradeNoun, sections, placeLabel } = x

  const people = (c.providers || []).filter(p => p && p.name).slice(0, 4)
  const showCrew = sections.team && people.length > 0
  const local = paragraphs([m.intro, m.local].filter(Boolean).join('\n\n'))

  const toc = [
    (local.length > 0 || m.noCopy) && { id: 'rl-local', label: 'What we see here' },
    services.length > 0 && { id: 'rl-here', label: 'What we do here' },
    showCrew && { id: 'rl-crew', label: 'Who covers it' },
    m.faqs.length > 0 && { id: 'rl-questions', label: 'Questions' },
    m.otherAreas.length > 0 && { id: 'rl-other', label: 'Other towns' },
  ].filter(Boolean)

  return (
    <RailPage x={x} schemas={m.schemas} current="areas" toc={toc}>
      {/* The town carries the page. No photograph: nothing in the data is a
          picture of a town, and one job photo across eight area pages reads
          as a mistake. */}
      <Masthead x={x} crumbs={m.crumbs} where={placeLabel} title={`${tradeNoun} in`} place={area} lede={m.subhead} />

      <Figures x={x} items={areaFigures(x)} />

      {(local.length > 0 || m.noCopy) && (
        <Section x={x} id="rl-local">
          <Head x={x} eyebrow="Locally" title={`What we see in ${area}`} />
          {m.noCopy ? (
            <ConceptNote T={x.T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote>
          ) : (
            <div className="rl-cols" style={{ color: C.textDim, fontSize: 17.5, lineHeight: 1.68 }}>
              {local.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </Section>
      )}

      {services.length > 0 && (
        <Section x={x} id="rl-here" tight={local.length > 0 || m.noCopy}>
          <Head x={x} eyebrow={x.offeringLabel} title={`What we do in ${area}`} />
          <Directory x={x} items={services.map(s => ({ href: href.combo(s, area), title: s.name, line: s.short || null }))} />
        </Section>
      )}

      {showCrew && (
        <Band x={x} id="rl-crew">
          <Section x={x}>
            <Head x={x} eyebrow="The crew" title={`Who covers ${area}`} />
            <Faces x={x} people={people} />
          </Section>
        </Band>
      )}

      {m.faqs.length > 0 && (
        <Section x={x} id="rl-questions">
          <Head x={x} eyebrow="Questions" title={`${area} questions`} />
          <Questions x={x} faqs={m.faqs} />
        </Section>
      )}

      {m.otherAreas.length > 0 && (
        <Section x={x} id="rl-other" tight={m.faqs.length > 0}>
          <Head x={x} eyebrow="Nearby" title="Other towns we cover" />
          <Chips x={x} items={m.otherAreas.map(a => ({ href: href.area(a), label: a }))} />
        </Section>
      )}

      <Closing x={x} place={area} />
    </RailPage>
  )
}

// ---- A service in a town ----------------------------------------------------

export function RailCombo({ config: c, siteSlug, service, area }) {
  const x = railContext(c, siteSlug)
  const m = comboModel(x, service, area)
  const { C, href, placeLabel } = x

  const p = pricingModel(c)
  const people = (c.providers || []).filter(pr => pr && pr.name)
  const facts = [
    x.emergency && { k: 'Availability', v: x.emergency },
    ...p.rows.slice(0, 2),
    { k: 'Covering', v: area },
    x.sections.team && people.length > 0 && { k: 'Who turns up', v: `${people.slice(0, 2).map(pr => pr.name).join(' or ')}, named when you book` },
  ].filter(Boolean).slice(0, 5)

  const photos = workItems(x).filter(w => w.url !== m.image?.url)
  const shot = photos[0] || null
  const local = paragraphs([m.intro, m.local].filter(Boolean).join('\n\n'))

  const toc = [
    (local.length > 0 || m.noCopy) && { id: 'rl-here', label: 'Here specifically' },
    m.faqs.length > 0 && { id: 'rl-questions', label: 'Questions' },
    m.otherServices.length > 0 && { id: 'rl-also', label: 'Also here' },
    m.otherAreas.length > 0 && { id: 'rl-towns', label: 'Nearby towns' },
  ].filter(Boolean)

  return (
    <RailPage x={x} schemas={m.schemas} current="areas" toc={toc}>
      {/* The shortest page on the site and the one most likely to be
          somebody's first, so it opens on a solid plate of their colour.
          Nothing general about the job is repeated here: that lives on the
          service page, which is one link away at the top. */}
      <Plate x={x} crumbs={m.crumbs} parents={m.upLinks.map(l => ({ href: l.href, label: l.label }))}
        where={m.badge || null} title={m.title} lede={m.subhead} />

      {(local.length > 0 || m.noCopy) && (
        <Section x={x} id="rl-here">
          <div className="rl-two">
            <div>
              <Head x={x} eyebrow="Here specifically" title={`${service.name} in this part of town`} />
              {m.noCopy
                ? <ConceptNote T={x.T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote>
                : <Prose x={x} text={local.join('\n\n')} lead />}
            </div>
            <FactCard x={x} title={`Booking in ${area}`} rows={facts} action={{ href: x.second.href, label: x.second.label }} />
          </div>
        </Section>
      )}

      {/* Set into the page rather than bled: an accent plate running straight
          into a photograph reads as two unfinished pages stacked. */}
      {shot && <Inset x={x} image={{ url: shot.url, alt: shot.alt }} caption={shot.caption} />}

      {m.faqs.length > 0 && (
        <Section x={x} id="rl-questions" tight={!!shot}>
          <Head x={x} eyebrow="Questions" title={`Asked in ${area}`} />
          <Questions x={x} faqs={m.faqs} />
        </Section>
      )}

      {m.otherServices.length > 0 && (
        <Section x={x} id="rl-also" tight={m.faqs.length > 0}>
          <Head x={x} eyebrow="Also here" title={`Other work we do in ${area}`} />
          {/* The label carries only what the heading does not: every pill
              repeating the town leaves half a line empty and orphans the next. */}
          <Chips x={x} items={m.otherServices.slice(0, 8).map(s => ({ href: href.combo(s, area), label: s.name }))} />
        </Section>
      )}

      {m.otherAreas.length > 0 && (
        <Section x={x} id="rl-towns" tight>
          <Head x={x} eyebrow="Nearby" title={`${service.name} in the towns next door`} />
          <Chips x={x} items={m.otherAreas.map(a => ({ href: href.combo(service, a), label: a }))} />
        </Section>
      )}

      <Closing x={x} context={lowerName(service.name)} place={area} />
    </RailPage>
  )
}

// ---- About ------------------------------------------------------------------

export function RailAbout({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = aboutModel(x)
  const { C, concept, sections, name } = x
  const people = (c.providers || []).filter(p => p && p.name)
  const showCrew = sections.team && people.length > 0
  const story = paragraphs((m.story || []).join('\n\n'))

  const toc = [
    (story.length > 0 || concept) && { id: 'rl-story', label: 'The company' },
    m.approach && { id: 'rl-approach', label: 'How we work' },
    showCrew && { id: 'rl-crew', label: 'The crew' },
  ].filter(Boolean)

  return (
    <RailPage x={x} schemas={m.schemas} current="about" toc={toc}>
      <Opening x={x} image={m.image} crumbs={m.crumbs} eyebrow="About" title={`About ${name}`} lede={x.since || null} />

      {/* A figure is a number and a short label. The licence fact carries the
          whole licence string, which wraps to six lines and unbalances the
          row; it is already set out in full in the footer. */}
      {m.facts.filter(f => f.label.length <= 34).length > 0 && (
        <Figures x={x} items={m.facts.filter(f => f.label.length <= 34)} />
      )}

      {(story.length > 0 || concept) && (
        <Section x={x} id="rl-story">
          <Head x={x} eyebrow="The company" title="How we got here" />
          {story.length > 0 ? (
            <div className="rl-cols" style={{ color: C.textDim, fontSize: 17.5, lineHeight: 1.68 }}>
              {story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : (
            <ConceptNote T={x.T} minHeight={220} title="Your story">
              How the business started, who runs it and what it has done since. Written from your answers and checked by you
              before it goes live.
            </ConceptNote>
          )}
        </Section>
      )}

      {m.approach && (
        <Section x={x} id="rl-approach" tight={story.length > 0 || concept}>
          <Head x={x} eyebrow="How we work" title="Our approach" />
          <Prose x={x} text={m.approach} lead />
        </Section>
      )}

      {showCrew && (
        <Band x={x} id="rl-crew">
          <Section x={x}>
            <Head x={x} eyebrow="The crew" title="The people who turn up" />
            <Crew x={x} people={people} />
          </Section>
        </Band>
      )}

      <Closing x={x} />
    </RailPage>
  )
}

// ---- Contact ----------------------------------------------------------------

export function RailContact({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = contactModel(x)
  const { C, F, concept, name, phone, phoneDisplay, areas } = x
  return (
    <RailPage x={x} schemas={m.schemas} current="contact">
      <Masthead x={x} crumbs={m.crumbs} where="Contact" title={`Contact ${name}`}
        lede={phone ? 'Call and we will book a window with you, or send the form and we will come back with a time.' : 'Send the form and we will come back to you with a time.'} />

      <Section x={x}>
        <div className="rl-two">
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: x.T.radius.lg, padding: 'clamp(22px, 2.6vw, 32px)' }}>
            <h2 style={{ ...x.label(C.textMuted), margin: '0 0 18px' }}>Request a visit</h2>
            <ContactForm
              slug={siteSlug}
              concept={concept}
              colors={formColors(C, C.surface)}
              fonts={{ body: F.body, display: F.display }}
              radius={10}
              submitLabel="Send"
            />
          </div>
          <div>
            {phone && <a href={`tel:${phone}`} style={{ ...btnAccent(x), display: 'flex', marginBottom: 20 }}>Call {phoneDisplay}</a>}
            <Rows x={x} rows={[
              ...m.details.map(d => ({ k: d.k, v: d.href ? <a href={d.href} style={textLink(x)}>{d.v}</a> : d.v })),
              areas.length > 0 && { k: x.placeLabel, v: areas.join(', ') },
            ].filter(Boolean)} />
          </div>
        </div>
      </Section>

      <Closing x={x} />
    </RailPage>
  )
}

// ---- FAQ --------------------------------------------------------------------

export function RailFAQ({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = faqModel(x)
  const { faqs, services, href, offeringLabel } = x
  return (
    <RailPage x={x} schemas={m.schemas} current="faq">
      <Masthead x={x} crumbs={m.crumbs} where="Questions" title={m.title}
        lede={faqs.length > 0 ? 'The questions people ask before they book.' : null} />

      {faqs.length > 0 && (
        <Section x={x}>
          <Questions x={x} faqs={faqs} />
        </Section>
      )}

      {services.length > 0 && (
        <Band x={x}>
          <Section x={x}>
            <Head x={x} eyebrow={offeringLabel} title="What we do"
              aside={<a href={href.services} style={textLink(x)}>All {offeringLabel.toLowerCase()}</a>} />
            <Chips x={x} items={services.slice(0, 10).map(s => ({ href: href.service(s.slug), label: s.name }))} />
          </Section>
        </Band>
      )}

      <Closing x={x} />
    </RailPage>
  )
}

// ---- Blog -------------------------------------------------------------------

function chrome(x) {
  return function Chrome({ children }) {
    return (
      <RailPage x={x} current="blog">
        <Section x={x}>{children}</Section>
      </RailPage>
    )
  }
}

export function RailBlogIndex({ config: c, siteSlug, posts }) {
  const x = railContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={chrome(x)} />
}

export function RailBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = railContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={chrome(x)} />
}
