import { stageContext, StagePage, Chapter, btnAccent } from './StageKit.js'
import { PageHead, Actions } from './StagePages.js'
import {
  shotsFor, plateFor, facts, boardOf, figuresFor, Figures, CoverageRows,
  Prose, ServiceGroups, Questions, Blocks, LinkRow, SiteFooter,
} from './StageShared.js'
import {
  areasIndexModel, areaModel, comboModel, aboutModel, contactModel, faqModel,
  formColors, oneLine,
} from './family/data.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'

// The rest of STAGE. An area page's panel is a plate of the client's colour
// rather than a photograph, and a service-in-a-town page stamps its pair on
// the picture — so the three inner page types are told apart at a glance.

const numbered = (chapters, shots) =>
  chapters.map((ch, i) => ({ ...ch, n: String(i + 1).padStart(2, '0'), shot: shots.length ? i % shots.length : null }))

// ---- Service areas --------------------------------------------------------

export function StageAreas({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const { C, T, areas, services, href, concept, placeLabel, tradeNoun, biz } = x
  const m = areasIndexModel(x)
  const shots = shotsFor(x)

  const chapters = [{
    id: 'coverage', label: placeLabel,
    cap: { title: areas.length > 1 ? `${areas.length} communities` : (areas[0] || placeLabel), line: 'Every town has its own page, and every service has a page in every town.' },
    board: boardOf(x, [facts.basedAt(x), facts.hours(x), facts.emergency(x)]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} title={m.title}
          lede={areas.length > 1 ? `${tradeNoun} in ${areas.length} communities. Pick yours to see what we do there.` : null} />
        <Actions x={x} />
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[biz.address_line && { k: 'Based at', v: biz.address_line }, biz.hours_display && { k: 'Hours', v: biz.hours_display }]} />
          <Figures x={x} items={figuresFor(x, [
            areas.length > 1 && { v: String(areas.length), k: 'Communities served' },
            services.length > 1 && { v: String(services.length), k: `${x.offeringLabel} offered` },
          ].filter(Boolean))} />
        </div>
      </>
    ),
  }]

  if (areas.length > 0) chapters.push({
    id: 'towns', label: 'The towns',
    cap: { title: 'Pick your town', line: 'Each one has a page written for it.' },
    board: boardOf(x, [facts.areas(x), facts.services(x), facts.phone(x)]),
    content: (
      <>
        <h2 style={x.h2}>Where we work</h2>
        <div style={{ marginTop: 28 }}>
          <Blocks x={x} items={areas.map(a => ({
            href: href.area(a),
            title: a,
            meta: services.length > 0 ? `${services.length} ${services.length === 1 ? 'service' : 'services'}` : null,
            links: services.slice(0, 6).map(s => ({ href: href.combo(s, a), label: s.name })),
            out: { href: href.area(a), label: `Everything in ${a}` },
          }))} />
        </div>
      </>
    ),
  })
  else if (concept) chapters.push({
    id: 'towns', label: 'The towns', cap: null, board: null,
    content: <ConceptNote T={T} minHeight={220} title="The towns you cover">Every town you work in gets its own page here.</ConceptNote>,
  })

  const list = numbered(chapters, shots)
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots: [], toc: true, plate: plateFor(x, { kicker: placeLabel, title: x.name, line: areas.length ? `${areas.length} ${areas.length === 1 ? 'community' : 'communities'}` : null }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- One area -------------------------------------------------------------

export function StageAreaDetail({ config: c, siteSlug, area }) {
  const x = stageContext(c, siteSlug)
  const { C, T, services, areas, href, concept, tradeNoun, biz, name } = x
  const m = areaModel(x, area)

  const chapters = [{
    id: 'here', label: `In ${area}`,
    cap: null,
    board: boardOf(x, [facts.basedAt(x), facts.credentials(x), facts.hours(x)]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} title={m.title} lede={m.subhead} />
        <Actions x={x} second={services.length ? { href: '#what', label: 'What we do here' } : null} />
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[
            m.otherAreas.length > 0 && { k: 'Also serving', v: m.otherAreas.join(', ') },
            biz.hours_display && { k: 'Hours', v: biz.hours_display },
          ]} />
          <Figures x={x} items={figuresFor(x, [
            services.length > 0 && { v: String(services.length), k: `${x.offeringLabel} in ${area}` },
          ].filter(Boolean))} />
        </div>
      </>
    ),
  }]

  if (services.length > 0) chapters.push({
    id: 'what', label: 'What we do here',
    cap: null,
    board: boardOf(x, [facts.estimates(x), facts.warranty(x), facts.emergency(x)]),
    content: (
      <>
        <h2 style={x.h2}>What we do in {area}</h2>
        <ServiceGroups x={x} hrefFor={s => href.combo(s, area)} nameFor={s => `${s.name} in ${area}`} />
      </>
    ),
  })

  if (m.intro || m.local || m.aroundTown.length > 0) chapters.push({
    id: 'about', label: `About ${area}`,
    cap: null,
    board: boardOf(x, [facts.since(x), facts.rating(x), facts.credentials(x)]),
    content: (
      <>
        <h2 style={x.h2}>{m.intro ? m.overviewTitle : `What we see in ${area}`}</h2>
        <div style={{ marginTop: 24 }}><Prose x={x} text={m.intro} /></div>
        {m.local && (
          <div style={{ marginTop: m.intro ? 34 : 24 }}>
            {m.intro && <h3 style={{ ...x.h3, marginBottom: 14 }}>What is different about {area}</h3>}
            <Prose x={x} text={m.local} />
          </div>
        )}
        {m.aroundTown.length > 0 && (
          <div style={{ marginTop: m.intro || m.local ? 34 : 24 }}>
            <h3 style={{ ...x.h3, marginBottom: 14 }}>Where we work in {area}</h3>
            <Prose x={x} text={m.aroundTown.join('\n\n')} />
          </div>
        )}
      </>
    ),
  })

  if (m.faqs.length > 0) chapters.push({
    id: 'questions', label: 'Questions',
    cap: null,
    board: boardOf(x, [facts.phone(x), facts.hours(x), facts.basedAt(x)]),
    content: (
      <>
        <h2 style={x.h2}>Questions from {area}</h2>
        <div style={{ marginTop: 24 }}><Questions x={x} items={m.faqs} /></div>
      </>
    ),
  })

  if (m.otherAreas.length > 0) chapters.push({
    id: 'nearby', label: 'Nearby',
    cap: null,
    board: boardOf(x, [facts.areas(x), facts.emergency(x)]),
    content: (
      <>
        <h2 style={x.h2}>Towns next to {area}</h2>
        <div style={{ marginTop: 26 }}>
          <LinkRow x={x} items={m.otherAreas.map(a => ({ href: href.area(a), title: `${tradeNoun} in ${a}` }))} />
        </div>
        <a href={href.areas} style={{ display: 'inline-block', marginTop: 24, color: C.accentDim, fontWeight: 700, fontSize: 15.5, textDecoration: 'none' }}>All {x.placeLabel.toLowerCase()} →</a>
      </>
    ),
  })

  const list = numbered(chapters, [])
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots: [], toc: true, plate: plateFor(x, {
        kicker: x.placeLabel === 'Service areas' ? 'Service area' : x.placeLabel,
        title: area,
        line: [x.since && `${x.since}`, biz.address_line].filter(Boolean).join(' · ') || null,
      }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      {m.noCopy && concept && (
        <section className="stg-chap"><ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote></section>
      )}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- One service in one area ---------------------------------------------

export function StageCombo({ config: c, siteSlug, service, area }) {
  const x = stageContext(c, siteSlug)
  const { C, F, T, href, concept, biz, areas } = x
  const m = comboModel(x, service, area)
  const shots = shotsFor(x, [x.imgs.combo_hero, x.imgs[`service_${service.slug}`]])

  const chapters = [{
    id: 'short', label: 'The short answer',
    cap: null,
    board: boardOf(x, [
      { k: x.offeringLabel.replace(/s$/, ''), v: service.name },
      { k: 'Town', v: area },
      m.badge && { k: 'Availability', v: m.badge },
    ]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} badge={m.badge} title={m.title} lede={m.subhead} />
        {/* Both parents, named and linked: the page's place in the site is
            visible at once, and so are the two links. */}
        <p style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, margin: '22px 0 0', fontSize: 15.5 }}>
          <a href={href.service(service.slug)} style={{ display: 'inline-flex', background: C.surface, border: `1px solid ${C.border}`, borderBottom: `3px solid ${C.accent}`, padding: '9px 14px', textDecoration: 'none', fontWeight: 600, color: C.text }}>{service.name}</a>
          <span style={{ color: C.textMuted }}>in</span>
          <a href={href.area(area)} style={{ display: 'inline-flex', background: C.surface, border: `1px solid ${C.border}`, borderBottom: `3px solid ${C.accent}`, padding: '9px 14px', textDecoration: 'none', fontWeight: 600, color: C.text }}>{area}</a>
        </p>
        <Actions x={x} />
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[biz.hours_display && { k: 'Hours', v: biz.hours_display }, biz.address_line && { k: 'Based at', v: biz.address_line }]} />
          <Figures x={x} items={figuresFor(x)} />
        </div>
      </>
    ),
  }]

  if (m.intro || m.local) chapters.push({
    id: 'town', label: 'In this town',
    cap: null,
    board: boardOf(x, [facts.basedAt(x), facts.emergency(x), facts.warranty(x)]),
    content: (
      <>
        <h2 style={x.h2}>{service.name} on {/^[aeiou]/i.test(area) ? 'an' : 'a'} {area} house</h2>
        {m.intro && <div style={{ marginTop: 24 }}><Prose x={x} text={m.intro} /></div>}
        {m.local && (
          <div style={{ marginTop: m.intro ? 30 : 24 }}>
            {m.intro && <h3 style={{ ...x.h3, marginBottom: 14 }}>What changes in {area}</h3>}
            <Prose x={x} text={m.local} />
          </div>
        )}
      </>
    ),
  })

  if (m.faqs.length > 0) chapters.push({
    id: 'questions', label: 'Questions',
    cap: null,
    board: boardOf(x, [facts.phone(x), facts.hours(x), facts.estimates(x)]),
    content: (
      <>
        <h2 style={x.h2}>{service.name} in {area} — questions</h2>
        <div style={{ marginTop: 24 }}><Questions x={x} items={m.faqs} /></div>
      </>
    ),
  })

  chapters.push({
    id: 'also', label: 'See also',
    cap: null,
    board: boardOf(x, [facts.areas(x), facts.services(x)]),
    content: (
      <>
        <h2 style={x.h2}>The pages either side of this one</h2>
        <div style={{ marginTop: 26 }}>
          <LinkRow x={x} items={m.upLinks.map(l => ({ href: l.href, title: l.label }))} />
        </div>
        {m.otherAreas.length > 0 && (
          <>
            <p style={{ margin: '30px 0 0', fontSize: 17.5, color: C.textDim }}>The same service in the other {m.otherAreas.length === 1 ? 'town' : `${m.otherAreas.length} towns`}:</p>
            <div style={{ marginTop: 18 }}>
              <LinkRow x={x} items={m.otherAreas.map(a => ({ href: href.combo(service, a), title: `${service.name} in ${a}` }))} />
            </div>
          </>
        )}
      </>
    ),
  })

  const list = numbered(chapters, shots)
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{
        shots, toc: true,
        stamp: shots.length ? { a: service.name, b: area, note: 'One service · one town' } : null,
        plate: shots.length ? null : plateFor(x, { kicker: service.name, title: area, line: m.badge || null }),
      }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      {m.noCopy && concept && (
        <section className="stg-chap"><ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote></section>
      )}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- About ----------------------------------------------------------------

export function StageAbout({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const { C, T, name, concept, biz, areas } = x
  const m = aboutModel(x)
  const shots = shotsFor(x, [x.imgs.about_hero])

  const chapters = [{
    id: 'who', label: 'About',
    cap: { title: name, line: 'Who you are calling, and what they are licensed to do.' },
    board: boardOf(x, [facts.since(x), facts.credentials(x), facts.basedAt(x)]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} title={name} />
        <Actions x={x} />
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[
            areas.length > 0 && { k: 'Service areas', v: areas.join(', ') },
            biz.hours_display && { k: 'Hours', v: biz.hours_display },
          ]} />
          <Figures x={x} items={m.facts.slice(0, 4).map(f => ({ v: f.value, k: f.label }))} />
        </div>
      </>
    ),
  }]

  if (m.story?.length > 0) chapters.push({
    id: 'story', label: 'History',
    cap: { title: 'How it started', line: 'In the owner’s own words.' },
    board: boardOf(x, [facts.since(x), facts.rating(x), facts.areas(x)]),
    content: (
      <>
        <h2 style={x.h2}>Our story</h2>
        <div className={m.story.length > 2 ? 'stg-cols' : undefined} style={{ ...x.body, marginTop: 24, maxWidth: m.story.length > 2 ? 'none' : '64ch' }}>
          {m.story.map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p}</p>)}
        </div>
      </>
    ),
  })

  if (m.approach) chapters.push({
    id: 'how', label: 'How we work',
    cap: { title: 'How we work', line: 'What to expect from the people who turn up.' },
    board: boardOf(x, [facts.warranty(x), facts.estimates(x), facts.credentials(x)]),
    content: (
      <>
        <h2 style={x.h2}>How we work</h2>
        <div style={{ marginTop: 24 }}><Prose x={x} text={m.approach} /></div>
      </>
    ),
  })

  const list = numbered(chapters, shots)
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots, toc: true, plate: shots.length ? null : plateFor(x, { kicker: 'About', title: name }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      {concept && !m.story?.length && !m.approach && (
        <section className="stg-chap">
          <ConceptNote T={T} minHeight={240} title="Your story">Who started the business and why, how you work, and what you want people to know before they call.</ConceptNote>
        </section>
      )}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- Contact --------------------------------------------------------------

export function StageContact({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const { C, F, name, phone, phoneDisplay, concept, biz, areas } = x
  const m = contactModel(x)

  const chapters = [{
    id: 'reach', label: 'Contact',
    cap: null,
    board: boardOf(x, [facts.phone(x), facts.email(x), facts.hours(x), facts.basedAt(x)]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} title={`Contact ${name}`}
          lede={phone ? 'Call and we will book a window with you, or send the form and we will come back with a time.' : 'Send the form and we will come back to you with a time.'} />
        <div className="stg-two" style={{ marginTop: 30, alignItems: 'start' }}>
          <div style={{ background: C.surface, border: `1px solid ${C.text}`, padding: 'clamp(22px, 2.6vw, 32px)' }}>
            <div style={{ ...x.label(C.text), marginBottom: 18 }}>Request a visit</div>
            <ContactForm
              slug={siteSlug}
              concept={concept}
              colors={formColors(C, C.bg)}
              fonts={{ body: F.body, display: F.display }}
              radius={2}
              submitLabel="Send"
            />
          </div>
          <div>
            {phone && <a href={`tel:${phone}`} style={{ ...btnAccent(x), width: '100%', marginBottom: 20 }}>Call {phoneDisplay}</a>}
            <dl style={{ margin: 0, borderTop: `1px solid ${C.border}` }}>
              {m.details.map(d => (
                <div key={d.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 38%) minmax(0, 1fr)', gap: 16, padding: '13px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'baseline' }}>
                  <dt style={{ ...x.label(C.textMuted), fontSize: 12.5 }}>{d.k}</dt>
                  <dd style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5 }}>
                    {d.href ? <a href={d.href} style={{ color: C.text, textDecoration: 'none', borderBottom: `1px solid ${C.accent}` }}>{d.v}</a> : d.v}
                  </dd>
                </div>
              ))}
              {areas.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 38%) minmax(0, 1fr)', gap: 16, padding: '13px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'baseline' }}>
                  <dt style={{ ...x.label(C.textMuted), fontSize: 12.5 }}>Areas</dt>
                  <dd style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5 }}>{areas.join(', ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </>
    ),
  }]

  const list = numbered(chapters, [])
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots: [], plate: plateFor(x, { kicker: 'Contact', title: name, line: biz.hours_display || null }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- FAQ ------------------------------------------------------------------

export function StageFAQ({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const { T, faqs, concept, tradeNoun } = x
  const m = faqModel(x)
  const shots = shotsFor(x)

  const chapters = [{
    id: 'questions', label: 'Questions',
    cap: { title: 'Before you call', line: 'Answered in this business’s own words.' },
    board: boardOf(x, [facts.phone(x), facts.hours(x), facts.emergency(x), facts.basedAt(x)]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} title={m.title} />
        <Actions x={x} />
        <div style={{ marginTop: 34 }}>
          {faqs.length > 0
            ? <Questions x={x} items={faqs} />
            : concept && <ConceptNote T={T} minHeight={240} title="The questions customers ask you">The questions people ask before they book, answered in your words.</ConceptNote>}
        </div>
      </>
    ),
  }]

  const list = numbered(chapters, shots)
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots, plate: shots.length ? null : plateFor(x, { kicker: 'Questions', title: tradeNoun }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- Blog -----------------------------------------------------------------

function chrome(x) {
  return function Chrome({ children }) {
    return (
      <StagePage x={x} chapters={[{ id: 'post', n: '01', label: 'Blog', cap: null, board: boardOf(x, [facts.phone(x), facts.hours(x)]) }]}
        showRail={false} head={{ shots: [], plate: plateFor(x, { kicker: 'Blog', title: x.name }) }}>
        <div className="stg-chap" data-stage-chap="post">{children}</div>
        <SiteFooter x={x} />
      </StagePage>
    )
  }
}

export function StageBlogIndex({ config: c, siteSlug, posts }) {
  const x = stageContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={chrome(x)} />
}

export function StageBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = stageContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={chrome(x)} />
}
