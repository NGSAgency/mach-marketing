import { stageContext, StagePage, Chapter, btnAccent, btnOutline } from './StageKit.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  shotsFor, plateFor, facts, boardOf, priceRows, figuresFor, Figures, CoverageRows,
  Prose, ServiceGroups, Questions, Blocks, LinkRow, SiteFooter,
} from './StageShared.js'
import { servicesIndexModel, serviceModel, pricingModel, oneLine } from './family/data.js'

// STAGE's services index and service pages. Inner pages swap the chapter rail
// for a contents list in the panel — an inner page is read rather than
// browsed, so knowing what is on it and where you are earns the space.

/** The head of an inner page: breadcrumb, badge, heading, lede. */
export function PageHead({ x, crumbs, badge, title, lede }) {
  const { C, base } = x
  return (
    <>
      {crumbs?.length > 1 && (
        <nav aria-label="Breadcrumb" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline', marginBottom: 18, fontSize: 14, color: C.textMuted }}>
          {crumbs.map((b, i) => (
            <span key={b.url}>
              {i > 0 && <span style={{ opacity: 0.5 }}>/ </span>}
              {i < crumbs.length - 1
                ? <a href={`${base}${b.url === '/' ? '' : b.url}`} style={{ color: 'inherit', textDecoration: 'none', borderBottom: `1px solid ${C.border}` }}>{b.name}</a>
                : <span>{b.name}</span>}
            </span>
          ))}
        </nav>
      )}
      {badge && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.accent, color: C.onAccent,
                       padding: '7px 12px', marginBottom: 18, ...x.label(C.onAccent), fontSize: 12.5 }}>{badge}</span>
      )}
      <h1 style={{ ...x.h1, fontSize: 'clamp(32px, 4.2vw, 58px)' }}>{title}</h1>
      {lede && <p style={{ margin: '18px 0 0', fontSize: 'clamp(17.5px, 1.5vw, 21px)', lineHeight: 1.6, color: C.textDim, maxWidth: '46ch' }}>{lede}</p>}
    </>
  )
}

/** Call and quote, under the heading. */
export function Actions({ x, second }) {
  const { phone, phoneDisplay, quoteHref, quoteLabel } = x
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
      {phone && <a href={`tel:${phone}`} style={btnAccent(x)}>Call {phoneDisplay}</a>}
      <a href={second?.href || quoteHref} style={btnOutline(x)}>{second?.label || quoteLabel}</a>
    </div>
  )
}

// ---- Services index -------------------------------------------------------

export function StageServices({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const { C, T, services, areas, href, concept, offeringLabel, tradeNoun, biz } = x
  const m = servicesIndexModel(x)
  const shots = shotsFor(x)

  const chapters = []
  chapters.push({
    id: 'all', label: offeringLabel,
    cap: { title: `Everything ${x.name} does`, line: 'Each one has a page of its own with what it covers.' },
    board: boardOf(x, [facts.estimates(x), facts.warranty(x), facts.credentials(x)]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} title={m.title}
          lede={services.length > 1 ? `${services.length} ${offeringLabel.toLowerCase()}, each with its own page and the questions people ask about it.` : null} />
        <Actions x={x} />
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[
            areas.length > 0 && { k: areas.length === 1 ? 'Service area' : 'Service areas', v: areas.join(', ') },
            biz.hours_display && { k: 'Hours', v: biz.hours_display },
          ]} />
          <Figures x={x} items={figuresFor(x, [
            services.length > 1 && { v: String(services.length), k: `${offeringLabel} offered` },
            areas.length > 1 && { v: String(areas.length), k: 'Communities served' },
          ].filter(Boolean))} />
        </div>
      </>
    ),
  })

  if (services.length > 0) chapters.push({
    id: 'list', label: 'The list',
    cap: { title: 'What each one covers', line: 'Pick the one that matches what is happening.' },
    board: boardOf(x, [facts.emergency(x), facts.hours(x), facts.phone(x)]),
    content: (
      <>
        <h2 style={x.h2}>{tradeNoun}</h2>
        <ServiceGroups x={x} hrefFor={s => href.service(s.slug)} />
      </>
    ),
  })
  else if (concept) chapters.push({
    id: 'list', label: 'The list', cap: null, board: null,
    content: <ConceptNote T={T} minHeight={220} title="Your services">Every service you offer, listed here with what it covers.</ConceptNote>,
  })

  if (areas.length > 0) chapters.push({
    id: 'where', label: 'Where we work',
    cap: { title: areas.length > 1 ? `${areas.length} communities` : areas[0], line: 'Every service has its own page in every town.' },
    board: boardOf(x, [facts.basedAt(x), facts.areas(x), facts.emergency(x)]),
    content: (
      <>
        <h2 style={x.h2}>Where we do it</h2>
        <div style={{ marginTop: 26 }}>
          <LinkRow x={x} items={areas.map(a => ({ href: href.area(a), title: a }))} />
        </div>
      </>
    ),
  })

  const list = chapters.map((ch, i) => ({ ...ch, n: String(i + 1).padStart(2, '0'), shot: shots.length ? i % shots.length : null }))
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots, toc: true, plate: shots.length ? null : plateFor(x, { kicker: offeringLabel, title: x.name }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      <SiteFooter x={x} />
    </StagePage>
  )
}

// ---- One service ----------------------------------------------------------

/**
 * The page a search lands on. Its H1 is the service alone — the service-in-a-
 * town pages carry the town, and two pages headed the same thing compete with
 * each other for one query.
 */
export function StageServiceDetail({ config: c, siteSlug, service }) {
  const x = stageContext(c, siteSlug)
  const { C, F, T, areas, href, concept, biz, name } = x
  const m = serviceModel(x, service)
  const p = pricingModel(c)
  const shots = shotsFor(x, [x.imgs[`service_${service.slug}`]])
  const reviews = ((c.reviews || {}).featured || []).filter(r => r?.text).slice(0, 3)

  const chapters = []
  chapters.push({
    id: 'what', label: 'What it covers',
    cap: { title: 'Before you book', line: 'What this job involves and what it costs to find out.' },
    board: boardOf(x, [
      service.category && { k: 'Category', v: service.category },
      m.badge && { k: 'Availability', v: m.badge },
      facts.credentials(x),
    ]),
    content: (
      <>
        <PageHead x={x} crumbs={m.crumbs} badge={m.badge} title={service.name} lede={m.subhead} />
        <Actions x={x} second={p.has ? { href: '#cost', label: 'See what it costs' } : null} />
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[
            areas.length > 0 && { k: 'Available in', v: areas.join(', ') },
            biz.hours_display && { k: 'Hours', v: biz.hours_display },
          ]} />
          <Figures x={x} items={figuresFor(x, [
            p.rows.find(r => r.k === 'Diagnostic') && { v: p.rows.find(r => r.k === 'Diagnostic').v, k: 'Diagnostic' },
            areas.length > 1 && { v: String(areas.length), k: 'Communities served' },
          ].filter(Boolean))} />
        </div>
      </>
    ),
  })

  if (m.intro) chapters.push({
    id: 'job', label: 'The job',
    cap: { title: `What ${service.name.toLowerCase()} involves`, line: 'Written for this business, not lifted from a brochure.' },
    board: boardOf(x, [facts.warranty(x), facts.estimates(x), facts.emergency(x)]),
    content: (
      <>
        <h2 style={x.h2}>What {service.name.toLowerCase()} involves</h2>
        <div style={{ marginTop: 24 }}><Prose x={x} text={m.intro} /></div>
      </>
    ),
  })

  if (m.steps?.length > 0 || m.stepsText) chapters.push({
    id: 'visit', label: 'On the visit',
    cap: { title: 'How a visit goes', line: `The steps ${name} follows once you have called.` },
    board: boardOf(x, [...priceRows(x)].slice(0, 3)),
    content: (
      <>
        <h2 style={x.h2}>What happens when we arrive</h2>
        {m.steps?.length > 0
          ? (
            <div className="stg-bleed" style={{ background: C.inverseBg, color: C.inverseText, padding: 'clamp(28px, 3.4vw, 44px) clamp(28px, 4vw, 72px)', marginTop: 30 }}>
              <h3 style={{ margin: '0 0 22px', ...x.label('rgba(255,255,255,0.55)'), fontSize: 12.5 }}>The visit, start to finish</h3>
              <div className="stg-track">
                {m.steps.map((s, i) => (
                  <div key={i} style={{ borderTop: `3px solid ${C.accent}`, paddingTop: 16 }}>
                    <b style={{ display: 'block', fontFamily: F.display, fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', color: C.accentLight, marginBottom: 8 }}>
                      STEP {String(i + 1).padStart(2, '0')}
                    </b>
                    {s.title && <h4 style={{ margin: '0 0 7px', fontFamily: F.display, fontWeight: 700, letterSpacing: '-0.02em', fontSize: 17.5, lineHeight: 1.2, color: C.inverseText }}>{s.title}</h4>}
                    {s.description && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: C.inverseTextDim }}>{s.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )
          : <div style={{ marginTop: 24 }}><Prose x={x} text={m.stepsText} /></div>}
      </>
    ),
  })

  if (m.methods) chapters.push({
    id: 'use', label: 'What we use',
    cap: { title: 'Parts and methods', line: 'What goes into the job, in this business’s own words.' },
    board: boardOf(x, [facts.warranty(x), facts.credentials(x)]),
    content: (
      <>
        <h2 style={x.h2}>What we use</h2>
        <div style={{ marginTop: 24 }}><Prose x={x} text={m.methods} /></div>
      </>
    ),
  })

  if (p.has) chapters.push({
    id: 'cost', label: 'What it costs',
    cap: { title: 'What you pay', line: 'Published here rather than held back until you call.' },
    board: boardOf(x, [facts.warranty(x), facts.estimates(x), facts.phone(x)]),
    content: (
      <>
        <h2 style={x.h2}>What {service.name.toLowerCase()} costs</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24, border: `1px solid ${C.border}`, background: C.surface }}>
          <caption style={{ captionSide: 'top', textAlign: 'left', paddingBottom: 10, ...x.label(C.textMuted), fontSize: 12.5 }}>
            {service.name} — what you pay
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: 'left', background: C.bgAlt, padding: '12px 18px', borderBottom: `1px solid ${C.border}`, ...x.label(C.textMuted), fontSize: 12.5, width: '34%' }}>Item</th>
              <th scope="col" style={{ textAlign: 'left', background: C.bgAlt, padding: '12px 18px', borderBottom: `1px solid ${C.border}`, ...x.label(C.textMuted), fontSize: 12.5 }}>What you pay</th>
            </tr>
          </thead>
          <tbody>
            {p.rows.map((r, i) => (
              <tr key={r.k}>
                <td style={{ padding: '14px 18px', borderBottom: i === p.rows.length - 1 ? 'none' : `1px solid ${C.border}`, fontWeight: 700, fontSize: 17 }}>{r.k}</td>
                <td style={{ padding: '14px 18px', borderBottom: i === p.rows.length - 1 ? 'none' : `1px solid ${C.border}`, fontSize: 17 }}>{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {p.notes.map((n, i) => (
          <p key={i} style={{ margin: '18px 0 0', color: C.textDim, fontSize: 16.5, lineHeight: 1.7, maxWidth: '56ch' }}>{n}</p>
        ))}
      </>
    ),
  })

  if (m.faqs.length > 0) chapters.push({
    id: 'questions', label: 'Questions',
    cap: { title: 'Still deciding?', line: 'The questions people ask about this job.' },
    board: boardOf(x, [facts.phone(x), facts.hours(x), facts.basedAt(x)]),
    content: (
      <>
        <h2 style={x.h2}>Questions about {service.name.toLowerCase()}</h2>
        <div style={{ marginTop: 24 }}><Questions x={x} items={m.faqs} /></div>
      </>
    ),
  })

  if (reviews.length > 0) chapters.push({
    id: 'said', label: 'What people say',
    cap: { title: 'What customers say', line: 'A rating is shown exactly as it stands — we never round one up.' },
    board: boardOf(x, [facts.rating(x), facts.warranty(x), facts.since(x)]),
    content: (
      <>
        <h2 style={x.h2}>What customers say</h2>
        <div className="stg-two" style={{ marginTop: 26 }}>
          {reviews.map((r, i) => (
            <figure key={i} style={{ margin: 0, borderTop: `2px solid ${C.text}`, paddingTop: 16 }}>
              <blockquote style={{ margin: 0, fontSize: 16.5, lineHeight: 1.62 }}>“{r.text}”</blockquote>
              {(r.author || r.name) && <figcaption style={{ marginTop: 12, ...x.label(C.textMuted), fontSize: 12.5 }}>{r.author || r.name}</figcaption>}
            </figure>
          ))}
        </div>
      </>
    ),
  })

  if (areas.length > 0 || m.related.length > 0) chapters.push({
    id: 'where', label: 'Where we do it',
    cap: { title: 'Just outside the list?', line: 'Ask — we will say so on the phone rather than book you and cancel.' },
    board: boardOf(x, [facts.basedAt(x), facts.areas(x)]),
    content: (
      <>
        {areas.length > 0 && (
          <>
            <h2 style={x.h2}>{service.name} where you are</h2>
            <p style={{ margin: '16px 0 0', fontSize: 17.5, color: C.textDim, maxWidth: '46ch' }}>
              {areas.length > 1 ? `${areas.length} communities, each with its own page for this service.` : `Serving ${areas[0]}.`}
            </p>
            <div style={{ marginTop: 26 }}>
              <LinkRow x={x} items={areas.map(a => ({ href: href.combo(service, a), title: `${service.name} in ${a}` }))} />
            </div>
          </>
        )}
        {m.related.length > 0 && (
          <div style={{ marginTop: areas.length > 0 ? 40 : 0 }}>
            <h2 style={{ ...x.h2, fontSize: 'clamp(21px, 2.1vw, 28px)' }}>Also ask us about</h2>
            <div style={{ marginTop: 20 }}>
              <LinkRow x={x} items={m.related.map(s => ({ href: href.service(s.slug), title: s.name }))} />
            </div>
          </div>
        )}
      </>
    ),
  })

  const list = chapters.map((ch, i) => ({ ...ch, n: String(i + 1).padStart(2, '0'), shot: shots.length ? i % shots.length : null }))
  return (
    <StagePage x={x} schemas={m.schemas} chapters={list} showRail={false}
      head={{ shots, toc: true, plate: shots.length ? null : plateFor(x, { kicker: m.eyebrow, title: service.name, line: areas.length ? `Across ${areas.length} ${areas.length === 1 ? 'community' : 'communities'}` : null }) }}>
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      {m.noCopy && concept && (
        <section className="stg-chap">
          <ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote>
        </section>
      )}
      <SiteFooter x={x} />
    </StagePage>
  )
}
