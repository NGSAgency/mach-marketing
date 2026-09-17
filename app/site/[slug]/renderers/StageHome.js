import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { stageContext, StagePage, Chapter, btnAccent, btnOutline } from './StageKit.js'
import {
  shotsFor, plateFor, facts, boardOf, priceRows, figuresFor, Figures, CoverageRows,
  Prose, ServiceGroups, Questions, Steps, Blocks, SiteFooter,
} from './StageShared.js'
import { homeModel, stepsFrom } from './family/data.js'

/**
 * STAGE's home page: six numbered chapters down the left, and the panel on the
 * right showing the facts that belong to whichever one is being read.
 *
 * Chapters are built from what the client actually has. A business with no
 * reviews has no reviews chapter and the numbering closes up behind it, so the
 * page is never padded to a shape it cannot fill.
 */
export default function StageHome({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const { C, F, T, concept, services, areas, name, phone, phoneDisplay, quoteHref, quoteLabel, href, biz, tradeNoun, offeringLabel } = x
  const m = homeModel(x)
  const steps = stepsFrom(c.generated?.['home|process']) || []
  const shots = shotsFor(x)

  const chapters = []
  const add = (ch) => { if (ch) chapters.push(ch) }

  add({
    id: 'who', label: 'Who we are',
    cap: { title: m.place ? `${tradeNoun} in ${m.place}` : tradeNoun, line: 'The details people ask for before they call.' },
    board: boardOf(x, [facts.credentials(x), facts.emergency(x), facts.basedAt(x)]),
    content: (
      <>
        {m.headline && <h1 style={x.h1}>{m.headline}</h1>}
        {m.support && <p style={{ margin: '18px 0 0', fontSize: 'clamp(17.5px, 1.35vw, 20px)', lineHeight: 1.6, color: C.textDim, maxWidth: '46ch' }}>{m.support}</p>}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
          {phone && <a href={`tel:${phone}`} style={btnAccent(x)}>Call {phoneDisplay}</a>}
          <a href={quoteHref} style={btnOutline(x)}>{quoteLabel}</a>
        </div>
        <div className="stg-foot-open">
          <CoverageRows x={x} rows={[
            areas.length > 0 && {
              k: areas.length === 1 ? 'Service area' : 'Service areas',
              v: <>{areas.map((a, i) => (
                <span key={a}>
                  <a href={href.area(a)} style={{ color: C.text, textDecoration: 'none', borderBottom: `1px solid ${C.accent}` }}>{a}</a>
                  {i < areas.length - 1 ? (i === areas.length - 2 ? ' and ' : ', ') : ''}
                </span>
              ))}</>,
            },
            biz.hours_display && { k: 'Hours', v: biz.hours_display },
          ]} />
          <Figures x={x} items={figuresFor(x, [
            areas.length > 1 && { v: String(areas.length), k: 'Communities served' },
            services.length > 1 && { v: String(services.length), k: `${offeringLabel} offered` },
          ].filter(Boolean))} />
        </div>
      </>
    ),
  })

  if (services.length > 0) add({
    id: 'services', label: 'What we do',
    cap: { title: 'What the work covers', line: `Every ${offeringLabel.toLowerCase().replace(/s$/, '')} here has a page of its own.` },
    board: boardOf(x, [facts.estimates(x), facts.warranty(x), facts.emergency(x)]),
    content: (
      <>
        <h2 style={x.h2}>{m.place ? `${offeringLabel} for ${m.place} homes` : `What ${name} does`}</h2>
        <ServiceGroups x={x} hrefFor={s => href.service(s.slug)} />
        <a href={href.services} style={{ display: 'inline-block', marginTop: 26, color: C.accentDim, fontWeight: 700, fontSize: 15.5, textDecoration: 'none' }}>
          All {services.length} {offeringLabel.toLowerCase()} →
        </a>
      </>
    ),
  })

  if (x.sections.steps && steps.length > 0) add({
    id: 'how', label: 'How it works',
    cap: { title: 'How a visit goes', line: `The steps ${name} follows, start to finish.` },
    board: boardOf(x, [...priceRows(x), facts.estimates(x)].slice(0, 4)),
    content: (
      <>
        <h2 style={x.h2}>What happens when we come out</h2>
        <div style={{ marginTop: 26 }}><Steps x={x} steps={steps} /></div>
      </>
    ),
  })

  if (areas.length > 0) add({
    id: 'areas', label: 'Where we work',
    cap: { title: areas.length > 1 ? `${areas.length} communities` : areas[0], line: 'Every town has its own page, and every service has a page in every town.' },
    board: boardOf(x, [facts.basedAt(x), facts.hours(x), facts.emergency(x)]),
    content: (
      <>
        <h2 style={x.h2}>{areas.length > 1 ? `${areas[0]} and ${areas.length - 1} ${areas.length === 2 ? 'town' : 'towns'} nearby` : `Working in ${areas[0]}`}</h2>
        <p style={{ margin: '16px 0 0', fontSize: 17.5, color: C.textDim, maxWidth: '46ch' }}>
          {services.length > 0 ? 'Every town has its own page, and every service has its own page in every town.' : 'Every town has its own page.'}
        </p>
        <div style={{ marginTop: 30 }}>
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

  if (x.sections.reviews && m.reviews.length > 0) add({
    id: 'reviews', label: 'What people say',
    cap: { title: 'What customers say', line: 'A rating is shown exactly as it stands — we never round one up.' },
    board: boardOf(x, [facts.warranty(x), facts.rating(x), facts.since(x)]),
    content: (
      <>
        <h2 style={x.h2}>{(() => {
          const r = x.c.reviews || {}
          return r.google_rating ? `${Number(r.google_rating).toFixed(1)} from ${r.google_count ? `${r.google_count.toLocaleString('en-US')} ` : ''}${r.source === 'their_site' ? 'reviews' : 'Google reviews'}` : 'What customers say'
        })()}</h2>
        <blockquote style={{ fontFamily: F.display, fontWeight: 700, letterSpacing: '-0.025em', fontSize: 'clamp(22px, 2.4vw, 34px)', lineHeight: 1.24, margin: '26px 0 0', maxWidth: '26ch' }}>
          “{m.reviews[0].text}”
        </blockquote>
        {(m.reviews[0].author || m.reviews[0].name) && (
          <div style={{ marginTop: 16, ...x.label(C.textMuted), fontSize: 13 }}>{m.reviews[0].author || m.reviews[0].name}</div>
        )}
        {m.reviews.length > 1 && (
          <div className="stg-two" style={{ marginTop: 36, paddingTop: 26, borderTop: `1px solid ${C.border}` }}>
            {m.reviews.slice(1).map((r, i) => (
              <figure key={i} style={{ margin: 0 }}>
                <blockquote style={{ margin: 0, fontSize: 16.5, lineHeight: 1.62 }}>“{r.text}”</blockquote>
                {(r.author || r.name) && <figcaption style={{ marginTop: 12, ...x.label(C.textMuted), fontSize: 12.5 }}>{r.author || r.name}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </>
    ),
  })

  if (x.sections.faq && m.faqs.length > 0) add({
    id: 'questions', label: 'Before you call',
    cap: { title: 'Before you call', line: 'The questions people ask most, answered in this business’s own words.' },
    board: boardOf(x, [facts.phone(x), facts.hours(x), facts.email(x), facts.basedAt(x)]),
    content: (
      <>
        <h2 style={x.h2}>The questions we get most</h2>
        <div style={{ marginTop: 24 }}><Questions x={x} items={m.faqs} /></div>
        <a href={href.faq} style={{ display: 'inline-block', marginTop: 22, color: C.accentDim, fontWeight: 700, fontSize: 15.5, textDecoration: 'none' }}>All questions →</a>
      </>
    ),
  })

  const list = chapters.map((ch, i) => ({ ...ch, n: String(i + 1).padStart(2, '0'), shot: shots.length ? i % shots.length : null }))

  return (
    <StagePage
      x={x}
      schemas={m.schemas}
      chapters={list}
      head={{ shots, plate: shots.length ? null : plateFor(x) }}
    >
      {list.map(ch => <Chapter key={ch.id} x={x} ch={ch}>{ch.content}</Chapter>)}
      {concept && services.length === 0 && (
        <section className="stg-chap">
          <ConceptNote T={T} minHeight={220} title="What you do">Every service you offer, each with its own page and the questions people ask about it.</ConceptNote>
        </section>
      )}
      <SiteFooter x={x} />
    </StagePage>
  )
}
