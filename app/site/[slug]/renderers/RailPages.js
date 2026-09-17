import { servicesIndexModel, serviceModel, pricingModel, lowerName, paragraphs } from './family/data.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  railContext, RailPage, Opening, Band, Section, Head, Prose, Chips, ServiceCards, Directory,
  Signs, Steps, Questions, FactCard, Inset, Closing, workItems, textLink,
} from './RailKit.js'

// RAIL's services index and service pages. An inner page runs its prose
// beside a sticky card of facts, its signs in two columns and its visit
// across the page: the rail takes 300px and leaves about 1100, and a reading
// measure down the left of that leaves two thirds of the page empty.

/** The facts that decide whether someone calls, beside the reading. */
function serviceFacts(x, service) {
  const p = pricingModel(x.c)
  const warranty = (x.pos.warranties || [])[0]
  const wt = typeof warranty === 'string' ? warranty : warranty?.name || warranty?.description
  return [
    ...p.rows.slice(0, 3),
    x.emergency && { k: 'Emergencies', v: x.emergency },
    wt && { k: 'Warranty', v: wt },
    x.biz.hours_display && { k: 'Hours', v: x.biz.hours_display },
  ].filter(Boolean).slice(0, 5)
}

export function RailServices({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = servicesIndexModel(x)
  const { services, areas, href, offeringLabel, placeLabel, tradeNoun } = x
  return (
    <RailPage x={x} schemas={m.schemas} current="services">
      <Opening x={x} image={x.imgs.home_secondary || null} crumbs={m.crumbs} eyebrow={offeringLabel} title={m.title}
        lede={services.length > 0 ? `Everything ${x.name} does, and what each job involves.` : null} />

      {services.length > 0 && (
        <Section x={x}>
          <Directory x={x} items={services.map(s => ({ href: href.service(s.slug), title: s.name, line: s.short || null }))} />
        </Section>
      )}

      {areas.length > 0 && (
        <Band x={x}>
          <Section x={x}>
            <Head x={x} eyebrow={placeLabel} title="Where we work" line={`${tradeNoun} across ${areas.length} ${areas.length === 1 ? 'community' : 'communities'}.`} />
            <Chips x={x} items={areas.map(a => ({ href: href.area(a), label: a }))} />
          </Section>
        </Band>
      )}

      <Closing x={x} />
    </RailPage>
  )
}

export function RailServiceDetail({ config: c, siteSlug, service }) {
  const x = railContext(c, siteSlug)
  const m = serviceModel(x, service)
  const { C, concept, areas, href, offeringLabel, placeLabel } = x

  const facts = serviceFacts(x, service)
  const photos = workItems(x).filter(p => p.url !== m.image?.url)
  const shot = photos[0] || null
  const steps = m.steps
  const methods = paragraphs(m.methods)

  const toc = [
    (m.intro || m.noCopy) && { id: 'rl-about', label: 'What the job involves' },
    m.signs && { id: 'rl-signs', label: 'Signs you need it' },
    (steps || m.stepsText) && { id: 'rl-visit', label: 'On the visit' },
    methods.length > 0 && { id: 'rl-methods', label: 'What we fit' },
    m.faqs.length > 0 && { id: 'rl-questions', label: 'Questions' },
    areas.length > 0 && { id: 'rl-near', label: 'Near you' },
  ].filter(Boolean)

  return (
    <RailPage x={x} schemas={m.schemas} current="services" toc={toc}>
      <Opening x={x} image={m.image} crumbs={m.crumbs} eyebrow={m.eyebrow} badge={m.badge}
        title={service.name} lede={m.subhead} />

      {(m.intro || m.noCopy) && (
        <Section x={x} id="rl-about">
          <div className="rl-two">
            <div>
              <Head x={x} eyebrow="What it covers" title="What the job involves" />
              {m.noCopy
                ? <ConceptNote T={x.T} minHeight={240} title={m.note.title}>{m.note.body}</ConceptNote>
                : <Prose x={x} text={m.intro} lead />}
            </div>
            <FactCard x={x} title="Before you call" rows={facts} action={{ href: x.second.href, label: x.second.label }} />
          </div>
        </Section>
      )}

      {/* One photograph of real work, to break a long page once. */}
      {shot && <Inset x={x} image={{ url: shot.url, alt: shot.alt }} caption={shot.caption} />}

      {m.signs && (
        <Section x={x} id="rl-signs" tight={!!shot}>
          <Head x={x} eyebrow="Know the signs" title={`Signs you need ${lowerName(service.name)}`}
            line="What people notice first, in the words they use when they call." />
          <Signs x={x} signs={m.signs} />
        </Section>
      )}

      {(steps || m.stepsText) && (
        <Band x={x} id="rl-visit">
          <Section x={x}>
            <Head x={x} eyebrow="On the visit" title="What happens when we arrive" />
            {steps ? <Steps x={x} steps={steps} across /> : <Prose x={x} text={m.stepsText} />}
          </Section>
        </Band>
      )}

      {methods.length > 0 && (
        <Section x={x} id="rl-methods">
          <Head x={x} eyebrow="Methods" title="What we fit and work on" />
          <div className="rl-cols" style={{ color: C.textDim, fontSize: 17.5, lineHeight: 1.68 }}>
            {methods.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Section>
      )}

      {m.faqs.length > 0 && (
        <Section x={x} id="rl-questions" tight={methods.length > 0}>
          <Head x={x} eyebrow="Questions" title={`${service.name} questions`} />
          <Questions x={x} faqs={m.faqs} />
        </Section>
      )}

      {areas.length > 0 && (
        <Section x={x} id="rl-near" tight={m.faqs.length > 0}>
          <Head x={x} eyebrow={placeLabel} title={`${service.name} near you`} />
          <Chips x={x} items={areas.map(a => ({ href: href.combo(service, a), label: `${service.name} in ${a}` }))} />
        </Section>
      )}

      {m.related.length > 0 && (
        <Band x={x}>
          <Section x={x}>
            <Head x={x} eyebrow={`More from ${x.name}`} title={`Other ${offeringLabel.toLowerCase()}`}
              aside={<a href={href.services} style={textLink(x)}>All {offeringLabel.toLowerCase()}</a>} />
            <ServiceCards x={x} services={m.related} hrefFor={s => href.service(s.slug)} />
          </Section>
        </Band>
      )}

      <Closing x={x} context={lowerName(service.name)} />
    </RailPage>
  )
}
