import { bookingContext, BookingPage, RequestCard } from './BookingKit.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import {
  servicesIndexModel, serviceModel, pageFacts, paragraphs, oneLine, pricingModel, serviceCostRows, proofItems, lowerName
} from './family/data.js'

// BOOKING's inner pages. Every one of them is the same shape: the content on
// the left, the request card pinned beside it on the right. Someone who lands
// on a service page from a search can act without scrolling anywhere.

/** A left-aligned page header on the quiet ground. No centring: this family
 *  reads like a form, and forms are left-aligned. */
export function PageHead({ x, crumbs, eyebrow, title, lede }) {
  const { C, wrap, base } = x
  return (
    <section style={{ background: C.bgAlt, borderBottom: `1px solid ${C.border}`, paddingBlock: 'clamp(28px, 3.4vw, 48px)' }}>
      <div style={wrap}>
        {crumbs?.length > 1 && (
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: C.textMuted, marginBottom: 14 }}>
            {crumbs.map((b, i) => (
              <span key={b.url}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                {i < crumbs.length - 1
                  ? <a href={`${base}${b.url === '/' ? '' : b.url}`} style={{ color: 'inherit', textDecoration: 'none' }}>{b.name}</a>
                  : <span>{b.name}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span style={{ ...x.eyebrow(C.accent), display: 'block', marginBottom: 12 }}>{eyebrow}</span>}
        <h1 style={{ ...x.h1, fontSize: 'clamp(32px, 4vw, 56px)' }}>{title}</h1>
        {lede && <p style={{ fontSize: 'clamp(18px, 1.5vw, 21px)', color: C.textDim, margin: '16px 0 0', maxWidth: '54ch', lineHeight: 1.65 }}>{lede}</p>}
      </div>
    </section>
  )
}

/** The sticky column: the card, and the short facts under it. */
export function CardColumn({ x, facts = [], title }) {
  const { C } = x
  return (
    <div className="bk-card-col">
      {/* Only the card sticks. The facts sit under it and scroll away, because
          a sticky block taller than the window hides its own submit button. */}
      <div className="bk-card-stick">
        <RequestCard x={x} compact title={title} />
      </div>
      {facts.length > 0 && (
        <ul style={{ margin: '18px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
          {facts.slice(0, 4).map((f, i) => (
            <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 10, alignItems: 'start', fontSize: 15.5, color: C.textDim }}>
              <span aria-hidden="true" style={{ color: C.accent, fontWeight: 800, lineHeight: 1.55 }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** Prose at the family's measure, or nothing. */
export function Prose({ x, text, lead = false, columns = false }) {
  const list = paragraphs(text)
  if (list.length === 0) return null
  return (
    <div className={columns ? 'bk-cols' : undefined} style={{ fontSize: 18.5, lineHeight: 1.78, color: x.C.text }}>
      {list.map((p, i) => (
        <p key={i} style={i === 0 && lead
          ? { margin: '0 0 20px', fontSize: 'clamp(19px, 1.8vw, 23px)', lineHeight: 1.58, color: x.C.text }
          : { margin: '0 0 18px' }}>{p}</p>
      ))}
    </div>
  )
}

/**
 * The facts as figures across a dark band: the one part of these pages that
 * is not sentences. Everything in it comes from a field — a rating is never
 * rounded up, and a business with none simply has one figure fewer.
 */
export function factFigures(x, extra = []) {
  return [
    ...extra,
    ...proofItems(x).filter(p => p.kind === 'rating' || p.kind === 'since').map(p => ({ v: p.value, k: p.label })),
    // A licence number long enough to wrap the label is left to the footer,
    // where it already appears in full — a figure's label is one short line.
    x.credential && (() => {
      const lic = x.license && x.license.length <= 18 ? `Lic. ${x.license}` : null
      const both = x.credential === 'Licensed & insured'
      return { v: both ? 'Licensed' : x.credential, k: lic || (both ? 'and insured' : 'Credentials') }
    })(),
    x.emergency && { v: x.emergency, k: 'Availability' },
  ].filter(Boolean).slice(0, 4)
}

export function Figures({ x, items }) {
  const { C, F, wrap } = x
  if (!items?.length) return null
  return (
    <div style={{ background: C.inverseBg, color: C.inverseText }}>
      <div style={wrap}>
        <div className="bk-figs" style={{ ['--n']: items.length, paddingBlock: 'clamp(24px, 2.8vw, 36px)' }}>
          {items.map((i, n) => (
            <div key={n}>
              <b style={{ display: 'block', fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(24px, 2.6vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.035em' }}>{i.v}</b>
              <span style={{ display: 'block', marginTop: 8, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: C.inverseTextDim }}>{i.k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** The form as a band of its own, for a page whose content has no column to
 *  sit beside. The argument on the left, the card on the right. */
export function RequestBand({ x, title, lede }) {
  const { C, wrap } = x
  return (
    <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, paddingBlock: 'clamp(38px, 4.4vw, 64px)' }}>
      <div style={wrap}>
        <div className="bk-split">
          <div>
            <h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.5vw, 34px)' }}>{title}</h2>
            {lede && <p style={{ margin: '14px 0 0', color: C.textDim, fontSize: 17.5, lineHeight: 1.7, maxWidth: '38ch' }}>{lede}</p>}
            {x.phone && (
              <p style={{ margin: '18px 0 0', fontSize: 17 }}>
                Or call <a href={`tel:${x.phone}`} style={{ color: C.text, fontWeight: 700 }}>{x.phoneDisplay}</a>
                {x.biz.hours_display ? ` · ${x.biz.hours_display}` : ''}
              </p>
            )}
          </div>
          <RequestCard x={x} />
        </div>
      </div>
    </section>
  )
}

/** A heading that sits on a rule, so the page has joints without needing a
 *  new background colour for every section. */
export function Rule({ x, children }) {
  return (
    <h2 style={{ ...x.h3, fontSize: 'clamp(21px, 2.1vw, 27px)', borderTop: `2px solid ${x.C.text}`, paddingTop: 16, margin: '44px 0 18px' }}>
      {children}
    </h2>
  )
}

/** Questions, one open at a time. */
export function FAQs({ x, items }) {
  const { C, T } = x
  if (!items?.length) return null
  return (
    <div>
      {items.map((q, i) => (
        <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === items.length - 1 ? `1px solid ${C.border}` : undefined }}>
          <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '16px 0', fontSize: 18, fontWeight: 600 }}>
            {q.question}
            <span aria-hidden="true" style={{ flex: 'none', width: 24, height: 24, borderRadius: T.radius.sm, border: `1.5px solid ${C.border}`, display: 'grid', placeItems: 'center', fontSize: 16, lineHeight: 1, color: C.accent }}>+</span>
          </summary>
          <p style={{ margin: '0 0 18px', color: C.textDim, fontSize: 17, lineHeight: 1.72, maxWidth: '64ch' }}>{q.answer}</p>
        </details>
      ))}
    </div>
  )
}

/** Prices in the client's own numbers, as label/value rows.
 *
 * On a service page this leads with what that job costs. BOOKING's card
 * column carries no facts list, so this block is the only place the answer
 * could appear, and before it took a service it appeared nowhere.
 */
export function Cost({ x, service }) {
  const { C, F } = x
  const p = service ? serviceCostRows(x.c, service) : pricingModel(x.c)
  if (!p.has) return null
  return (
    <>
      <Rule x={x}>What it costs</Rule>
      {p.rows.map((r, i) => (
        <div key={r.k} style={{
          display: 'grid', gridTemplateColumns: 'minmax(110px, 30%) minmax(0, 1fr)', gap: 20, alignItems: 'baseline',
          padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.border}`,
        }}>
          <span style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted }}>{r.k}</span>
          <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(17px, 1.7vw, 21px)', lineHeight: 1.45, color: C.text }}>{r.v}</span>
        </div>
      ))}
      {p.notes.map((n, i) => (
        <p key={i} style={{ margin: i ? '12px 0 0' : '16px 0 0', color: C.textDim, fontSize: 17, lineHeight: 1.7 }}>{n}</p>
      ))}
    </>
  )
}

/**
 * Where we work. A band of its own, with the heading on the left and every
 * town as a chip on the right: it reads as a piece of the page rather than a
 * line of text, and it is still three lines deep with thirty towns in it.
 */
export function Coverage({ x, heading, lede, items, hrefFor, more = null }) {
  const { C, F, T, wrap } = x
  if (!items?.length) return null
  return (
    <section style={{ background: C.accentGlow, borderTop: `1px solid ${C.border}`, paddingBlock: 'clamp(34px, 4vw, 58px)' }}>
      <div style={wrap}>
        <div className="bk-cover">
          <div>
            <h2 style={{ ...x.h2, fontSize: 'clamp(23px, 2.3vw, 31px)' }}>{heading}</h2>
            {lede && <p style={{ margin: '10px 0 0', color: C.textDim, fontSize: 16.5, lineHeight: 1.6 }}>{lede}</p>}
            {more && <a href={more.href} style={{ display: 'inline-block', marginTop: 12, color: C.accentDim, fontWeight: 700, fontSize: 16 }}>{more.label} →</a>}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {items.map(a => (
              <a key={a} href={hrefFor(a)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, background: C.surface,
                border: `1px solid ${C.border}`, borderRadius: T.radius.sm, padding: '11px 15px',
                textDecoration: 'none', color: C.text, fontFamily: F.display, fontWeight: 600, fontSize: 16.5, lineHeight: 1.2,
              }}>
                {a}<span aria-hidden="true" style={{ color: C.accent, fontWeight: 800 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Services index -------------------------------------------------------

/**
 * The catalogue as numbered rows, not cards: a photograph where the client
 * gave us one and a numeral where they didn't, the name, one line, and the
 * link. The request card sits beside it, because on this page someone is
 * choosing what to ask for rather than reading.
 */
export function BookingServices({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, services, href, concept, offeringLabel, areas, imgs } = x
  const m = servicesIndexModel(x)
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const grouped = services.length > 6 && categories.length > 1

  const Row = ({ s, n }) => {
    const img = imgs[`service_${s.slug}`]
    return (
      <a href={href.service(s.slug)} style={{
        display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr) auto', gap: 'clamp(16px, 2vw, 24px)', alignItems: 'center',
        padding: '18px 0', borderTop: `1px solid ${C.border}`, textDecoration: 'none', color: 'inherit',
      }}>
        {img?.url
          ? <img src={img.url} alt={img.alt || ''} style={{ width: 84, height: 66, objectFit: 'cover', borderRadius: T.radius.sm, display: 'block' }} />
          : <span style={{
              width: 56, height: 56, display: 'grid', placeItems: 'center', borderRadius: T.radius.sm,
              background: C.accentGlow, color: C.accentDim, fontFamily: F.display, fontWeight: 800, fontSize: 17,
            }}>{String(n).padStart(2, '0')}</span>}
        <span>
          <b style={{ display: 'block', fontFamily: F.display, fontWeight: 700, fontSize: 21, letterSpacing: '-0.02em', color: C.text }}>{s.name}</b>
          {oneLine(s.short) && <span style={{ display: 'block', marginTop: 5, color: C.textDim, fontSize: 16.5, lineHeight: 1.6 }}>{oneLine(s.short)}</span>}
        </span>
        <span style={{ color: C.accentDim, fontWeight: 700, fontSize: 15.5, whiteSpace: 'nowrap' }}>Details →</span>
      </a>
    )
  }

  let n = 0
  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={offeringLabel} title={m.title}
        lede={services.length > 1 ? `${services.length} ${offeringLabel.toLowerCase()}. Each one has its own page, and the form goes to the same place whichever you need.` : null} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <div>
              {services.length === 0 && concept && (
                <ConceptNote T={T} minHeight={220} title="Your services">Every service you offer, each with its own page.</ConceptNote>
              )}
              {grouped
                ? categories.map(cat => (
                  <div key={cat} style={{ marginBottom: 34 }}>
                    <h2 style={{ ...x.eyebrow(C.textMuted), margin: '0 0 6px' }}>{cat}</h2>
                    {services.filter(s => s.category === cat).map(s => <Row key={s.slug} s={s} n={++n} />)}
                    <div style={{ borderTop: `1px solid ${C.border}` }} />
                  </div>
                ))
                : (
                  <>
                    {services.map(s => <Row key={s.slug} s={s} n={++n} />)}
                    {services.length > 0 && <div style={{ borderTop: `1px solid ${C.border}` }} />}
                  </>
                )}
            </div>
            <CardColumn x={x} facts={pageFacts(x)} />
          </div>
        </div>
      </section>
      <Coverage
        x={x}
        heading="Where we work"
        lede={areas.length > 1 ? `Every one of these ${areas.length} communities has its own page.` : null}
        items={areas}
        hrefFor={a => href.area(a)}
      />
    </BookingPage>
  )
}

// ---- One service ----------------------------------------------------------

/**
 * The page a search lands on, built as bands rather than one column of prose.
 * The opening — photograph, the paragraph that answers "is this my problem",
 * and what it costs — runs beside the request card. Everything after that
 * comes out from under the card and takes the full width on its own ground,
 * so the page changes shape five times on the way down instead of reading as
 * one long article.
 */
export function BookingServiceDetail({ config: c, siteSlug, service }) {
  const x = bookingContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, areas, href, concept } = x
  const m = serviceModel(x, service)
  const reviews = ((c.reviews || {}).featured || []).filter(r => r?.text).slice(0, 3)
  const paras = paragraphs(m.intro)

  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={m.badge ? `${m.eyebrow} · ${m.badge}` : m.eyebrow} title={service.name} lede={m.subhead} />

      <Figures x={x} items={factFigures(x)} />

      {/* THE OPENING — beside the card, and kept to the paragraph that answers
          "is this my problem", the photograph, and the price. */}
      <section style={{ paddingBlock: 'clamp(34px, 4vw, 56px)' }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <div>
              {paras[0] && (
                <p style={{ margin: 0, fontFamily: F.display, fontWeight: 500, fontSize: 'clamp(21px, 2.1vw, 28px)', lineHeight: 1.42, letterSpacing: '-0.015em', color: C.text }}>{paras[0]}</p>
              )}
              {m.image?.url && (
                <img
                  src={m.image.url}
                  alt={m.image.alt || ''}
                  style={{ width: '100%', height: 'clamp(220px, 28vw, 380px)', objectFit: 'cover', borderRadius: T.radius.md, display: 'block', margin: paras.length ? '28px 0 0' : '0 0 28px' }}
                />
              )}
              <Cost x={x} service={service} />
              {m.noCopy && concept && (
                <div style={{ marginTop: 34 }}>
                  <ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote>
                </div>
              )}
            </div>
            <CardColumn x={x} title={`Request ${service.name}`} />
          </div>
        </div>
      </section>

      {/* THE REST OF THE OPENING — out from under the card and set in two
          columns, which halves how long it looks without losing a word. */}
      {paras.length > 1 && (
        <section style={{ paddingBottom: sectionPad }}>
          <div style={wrap}>
            <div className="bk-cols" style={{ borderTop: `2px solid ${C.text}`, paddingTop: 24, fontSize: 17.5, lineHeight: 1.75, color: C.textDim }}>
              {paras.slice(1).map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </div>
        </section>
      )}

      {/* THE SIGNS — the reason someone is on this page. Booking's job is to
          get them to the form, so the section ends by pointing at it. */}
      {m.signs && (
        <section style={{ paddingBottom: sectionPad }}>
          <div style={wrap}>
            <h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.4vw, 33px)', marginBottom: 6 }}>Signs you need {lowerName(service.name)}</h2>
            <p style={{ margin: '0 0 22px', fontSize: 17, color: C.textDim }}>If any of these sound familiar, send the form and we will take it from there.</p>
            <ul className="bk-signs">
              {m.signs.map((sg, i) => (
                <li key={i} style={{ borderTop: `2px solid ${C.accentDim}`, paddingTop: 14 }}>
                  <h3 style={{ ...x.h3, fontSize: 18.5, marginBottom: 6 }}>{sg.sign}</h3>
                  {sg.detail && <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: C.textDim }}>{sg.detail}</p>}
                </li>
              ))}
            </ul>
            <style>{`
              .bk-signs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 32px; }
              @media (max-width: 760px) { .bk-signs { grid-template-columns: minmax(0, 1fr); } }
            `}</style>
          </div>
        </section>
      )}

      {/* THE VISIT — full width, two columns, on its own ground. The same
          steps down a single column read as four more paragraphs. */}
      {(m.steps?.length > 0 || m.stepsText) && (
        <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, paddingBlock: 'clamp(38px, 4.4vw, 64px)' }}>
          <div style={wrap}>
            <h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.4vw, 33px)', marginBottom: 28 }}>What happens on the visit</h2>
            {m.steps?.length > 0
              ? (
                <ol className="bk-steps" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {m.steps.map((s, i) => (
                    <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 16, alignItems: 'start' }}>
                      <span style={{
                        flex: 'none', width: 44, height: 44, borderRadius: T.radius.sm, background: C.surface, border: `1px solid ${C.border}`,
                        color: C.accentDim, display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 17,
                      }}>{i + 1}</span>
                      <div>
                        {s.title && <h3 style={{ ...x.h3, fontSize: 19.5, marginBottom: 5 }}>{s.title}</h3>}
                        {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 16.5, lineHeight: 1.7 }}>{s.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              )
              : <div style={{ maxWidth: '68ch' }}><Prose x={x} text={m.stepsText} /></div>}
          </div>
        </section>
      )}

      {/* WHAT WE USE — a specification with its heading in its own column, so
          it is plainly a different kind of writing from the paragraphs above. */}
      {m.methods && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div className="bk-cover">
              <div>
                <h2 style={{ ...x.h2, fontSize: 'clamp(23px, 2.3vw, 31px)' }}>What we use</h2>
                <p style={{ margin: '10px 0 0', color: C.textMuted, fontSize: 16, lineHeight: 1.6 }}>The parts we fit and the way we work.</p>
              </div>
              <div style={{ borderTop: `2px solid ${C.text}`, paddingTop: 20, maxWidth: '66ch' }}>
                <Prose x={x} text={m.methods} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THE REVIEWS — on the dark ground, which is the biggest break the page
          has and lands right where someone is deciding. */}
      {reviews.length > 0 && (
        <section style={{ background: C.inverseBg, color: C.inverseText, paddingBlock: 'clamp(38px, 4.4vw, 64px)' }}>
          <div style={wrap}>
            {reviews.length === 1
              ? (
                <figure style={{ margin: 0, maxWidth: '30ch' }}>
                  <p style={{ margin: 0, fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(23px, 2.8vw, 38px)', lineHeight: 1.26, letterSpacing: '-0.02em' }}>“{reviews[0].text}”</p>
                  {(reviews[0].author || reviews[0].name) && (
                    <figcaption style={{ marginTop: 18, fontSize: 13.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.inverseTextDim }}>{reviews[0].author || reviews[0].name}</figcaption>
                  )}
                </figure>
              )
              : (
                <>
                  <h2 style={{ ...x.h2, color: C.inverseText, fontSize: 'clamp(23px, 2.3vw, 31px)', marginBottom: 26 }}>What customers say</h2>
                  <div className="bk-three">
                    {reviews.map((r, i) => (
                      <figure key={i} style={{ margin: 0, borderTop: `2px solid ${C.accent}`, paddingTop: 18 }}>
                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.68, color: C.inverseText }}>“{r.text}”</p>
                        {(r.author || r.name) && (
                          <figcaption style={{ marginTop: 12, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.inverseTextDim }}>{r.author || r.name}</figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </>
              )}
          </div>
        </section>
      )}

      {m.faqs.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div className="bk-cover">
              <h2 style={{ ...x.h2, fontSize: 'clamp(23px, 2.3vw, 31px)' }}>Questions about {service.name}</h2>
              <FAQs x={x} items={m.faqs} />
            </div>
          </div>
        </section>
      )}

      {m.related.length > 0 && (
        <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, paddingBlock: 'clamp(30px, 3.4vw, 46px)' }}>
          <div style={wrap}>
            <h2 style={{ ...x.h2, fontSize: 'clamp(21px, 2.1vw, 27px)', marginBottom: 20 }}>Also ask us about</h2>
            <div className="bk-three">
              {m.related.map(s => (
                <a key={s.slug} href={href.service(s.slug)} style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.accent}`,
                  borderRadius: T.radius.sm, padding: '18px 18px 20px', textDecoration: 'none', color: 'inherit', display: 'block',
                }}>
                  <b style={{ display: 'block', fontFamily: F.display, fontWeight: 700, fontSize: 18.5, letterSpacing: '-0.015em', color: C.text }}>{s.name}</b>
                  {oneLine(s.short) && <span style={{ display: 'block', marginTop: 6, color: C.textDim, fontSize: 15.5, lineHeight: 1.55 }}>{oneLine(s.short)}</span>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Coverage
        x={x}
        heading={`${service.name} where you are`}
        lede={areas.length > 1 ? `${areas.length} communities, each with its own ${service.name} page.` : null}
        items={areas}
        hrefFor={a => href.combo(service, a)}
      />
    </BookingPage>
  )
}
