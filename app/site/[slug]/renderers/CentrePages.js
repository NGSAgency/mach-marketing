import { centreContext, CentrePage, btnPrimary, btnOutline } from './CentreKit.js'
import CrewMobileBar from './CrewMobileBar.js'
import { servicesIndexModel, serviceModel, proofItems, paragraphs, oneLine, lowerName} from './family/data.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'

// CENTRE's inner pages. The shapes come from the home page — a centred header,
// one thing at a time, facts across a band — so a visitor who lands on a
// service page from a search sees the same business as someone who came
// through the front door.

/** A centred page header, on the ground colour. Inner pages don't take the
 *  full-height photographic treatment: that belongs to the home page. */
export function Header({ x, crumbs, eyebrow, title, lede }) {
  const { C, F, wrap, mid } = x
  return (
    <section style={{ paddingTop: 'clamp(40px, 5vw, 72px)', paddingBottom: 'clamp(28px, 3.5vw, 48px)' }}>
      <div style={wrap}>
        {crumbs?.length > 1 && (
          <nav aria-label="Breadcrumb" style={{ ...mid, fontSize: 14, color: C.textMuted, marginBottom: 18 }}>
            {crumbs.map((b, i) => (
              <span key={b.url}>
                {i > 0 && <span style={{ opacity: 0.5 }}> / </span>}
                {i < crumbs.length - 1
                  ? <a href={`${x.base}${b.url === '/' ? '' : b.url}`} style={{ color: 'inherit', textDecoration: 'none' }}>{b.name}</a>
                  : <span>{b.name}</span>}
              </span>
            ))}
          </nav>
        )}
        <div style={mid}>
          {eyebrow && <span style={{ ...x.eyebrow(C.textMuted), display: 'block', marginBottom: 16 }}>{eyebrow}</span>}
          <h1 style={x.h1}>{title}</h1>
          {lede && <p style={{ fontSize: 'clamp(18px, 1.5vw, 21px)', color: C.textDim, margin: '20px auto 0', maxWidth: '52ch', lineHeight: 1.65 }}>{lede}</p>}
        </div>
      </div>
    </section>
  )
}

/** The facts, across a dark band. Short items only — anything longer belongs
 *  in the body, not in a row of figures. */
export function FactBand({ x }) {
  const { C, F, wrap } = x
  // Value and label, not a sentence: a trust bar has to be readable at a
  // glance, which the old one — 15.5px of dim grey — was not.
  const items = [
    ...proofItems(x).filter(p => p.kind === 'rating' || p.kind === 'since').map(p => ({ v: p.value, k: p.label })),
    x.credential && { v: x.credential, k: x.license ? `Lic. ${x.license}` : 'On file' },
    x.emergency && { v: x.emergency, k: 'Availability' },
    x.biz.hours_display && { v: x.biz.hours_display, k: 'Hours' },
  ].filter(Boolean).slice(0, 4)
  if (items.length === 0) return null
  return (
    <div style={{ background: C.inverseBgAlt, color: C.inverseText }}>
      <div style={wrap}>
        <div className="ctr-figures" style={{ ['--n']: items.length, paddingBlock: 'clamp(26px, 3vw, 38px)' }}>
          {items.map((i, n) => (
            <div key={n}>
              <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(19px, 1.9vw, 24px)', lineHeight: 1.25, color: C.inverseText }}>{i.v}</b>
              <span style={{ display: 'block', marginTop: 7, fontSize: 13.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: C.inverseTextDim }}>{i.k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Call or quote, inline. The research is consistent that one action repeated
 *  after each explanation beats a single button at the bottom of the page. */
export function ActionRow({ x, align = 'center' }) {
  const { C, phone, phoneDisplay, quoteHref, quoteLabel } = x
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: align, flexWrap: 'wrap' }}>
      {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}>Call {phoneDisplay}</a>}
      <a href={quoteHref} style={btnOutline(x, C.text)}>{quoteLabel}</a>
    </div>
  )
}

/** What the work costs, in the client's own numbers and words.
 *
 * The first version put a paragraph of price ranges inside a tile sized for a
 * figure, and printed pricing_approach raw — the page carried the words
 * "transparent_flat_rate". Values now sit in rows that can hold a sentence,
 * and anything that still looks like a database value is not shown at all.
 */
const APPROACH = {
  transparent_flat_rate: 'We quote a flat rate up front, so the price you are told is the price you pay.',
  flat_rate: 'We quote a flat rate up front, so the price you are told is the price you pay.',
  hourly: 'We charge by the hour, plus parts.',
  time_and_materials: 'We charge for the time on the job plus the parts fitted.',
  quote_per_job: 'Every job is quoted on its own before any work starts.',
}
const looksLikeAValue = (t) => typeof t === 'string' && /^[a-z0-9]+(_[a-z0-9]+)+$/.test(t.trim())

export function Cost({ x, service }) {
  const { C, F, T, wrap, mid, sectionPad } = x
  const p = x.c.pricing || {}
  const rows = [
    p.diagnostic_fee && { k: 'Diagnostic', v: p.diagnostic_fee },
    p.service_call_fee && { k: 'Service call', v: p.service_call_fee },
    p.price_range_general && { k: 'Typical range', v: p.price_range_general },
    p.free_estimates && { k: 'Estimates', v: 'Free' },
    p.financing && { k: 'Financing', v: p.financing_partners?.length ? `Available through ${p.financing_partners.join(', ')}` : 'Available' },
  ].filter(Boolean)

  const approach = APPROACH[String(p.approach || '').trim()] || (looksLikeAValue(p.approach) ? null : p.approach)
  const policy = !p.free_estimates && !looksLikeAValue(p.estimate_policy) ? p.estimate_policy : null
  const notes = [approach, policy].filter(Boolean)
  if (rows.length === 0 && notes.length === 0) return null

  return (
    <section style={{ paddingBlock: sectionPad }}>
      <div style={{ ...wrap, maxWidth: 1060 }}>
        <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 30 }}>What it costs</h2></div>
        <div className="ctr-cost">
          <div>
            {rows.map((r, i) => (
              <div key={r.k} style={{
                display: 'grid', gridTemplateColumns: 'minmax(120px, 34%) minmax(0, 1fr)', gap: 20, alignItems: 'baseline',
                padding: '16px 0', borderTop: i === 0 ? `2px solid ${C.text}` : `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 13.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted }}>{r.k}</span>
                <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.45, color: C.text }}>{r.v}</span>
              </div>
            ))}
            {rows.length > 0 && <div style={{ borderTop: `1px solid ${C.border}` }} />}
          </div>
          <aside style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: 'clamp(22px, 2.4vw, 32px)', alignSelf: 'start' }}>
            {notes.map((n, i) => (
              <p key={i} style={{ margin: i ? '14px 0 0' : 0, color: C.text, fontSize: 17, lineHeight: 1.68 }}>{n}</p>
            ))}
            <div style={{ marginTop: notes.length ? 20 : 0 }}><ActionRow x={x} align="flex-start" /></div>
          </aside>
        </div>
      </div>
    </section>
  )
}

/** The towns, linked to the page for this service in each one. The combo pages
 *  exist and nothing was linking to them from here. */
export function Towns({ x, service }) {
  const { C, F, T, wrap, mid, sectionPad, areas, href } = x
  if (areas.length === 0) return null
  return (
    <section style={{ background: C.accent, color: C.onAccent, paddingBlock: sectionPad, textAlign: 'center' }}>
      <div style={wrap}>
        <div style={mid}>
          <h2 style={{ ...x.h2, color: C.onAccent, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 10 }}>{service.name} where you are</h2>
          <p style={{ color: C.onAccent, opacity: 0.85, margin: '0 auto 30px', maxWidth: '52ch' }}>
            {areas.length > 1 ? `We cover ${areas.length} communities. Here's this service in each of them.` : `Serving ${areas[0]}.`}
          </p>
        </div>
        <div className="ctr-tiles">
          {areas.map(a => (
            <a key={a} href={href.combo(service, a)} style={{ background: C.surface, borderRadius: T.radius.md, padding: '20px 16px', textDecoration: 'none', textAlign: 'center' }}>
              <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 21, lineHeight: 1.15, color: C.text }}>{a}</b>
              <span style={{ display: 'block', marginTop: 7, fontSize: 12.5, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: C.accent }}>{service.name} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/** The same closing as the home page, without the photograph. */
export function Closing({ x }) {
  const { C, wrap, phone, phoneDisplay, quoteHref, quoteLabel, biz } = x
  return (
    <section style={{ background: C.bgAlt, textAlign: 'center', paddingBlock: 'clamp(52px, 6vw, 88px)' }}>
      <div style={wrap}>
        <h2 style={x.h2}>Get in touch</h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}>Call {phoneDisplay}</a>}
          <a href={quoteHref} style={btnOutline(x, C.text)}>{quoteLabel}</a>
        </div>
        {biz.hours_display && <span style={{ display: 'block', marginTop: 18, color: C.textMuted, fontSize: 16 }}>{biz.hours_display}</span>}
      </div>
    </section>
  )
}

// ---- Services index -------------------------------------------------------

/**
 * Every service, one panel each rather than a grid of cards: the same object
 * the home page switches between, stacked. A client with two services gets two
 * panels and it still looks deliberate.
 */
/** CREW's pinned call bar, given Centre's colours. Its show/hide rules are in
 *  CentreKit's stylesheet. */
export function MobileBar({ x }) {
  return (
    <CrewMobileBar
      phone={x.phone}
      phoneDisplay={x.phoneDisplay}
      quoteHref={x.quoteHref}
      colors={x.C}
      fontFamily={x.F.body}
    />
  )
}

export function CentreServices({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, services, href, quoteHref, quoteLabel, concept, offeringLabel } = x
  const m = servicesIndexModel(x)

  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header
        x={x}
        crumbs={m.crumbs}
        eyebrow={offeringLabel}
        title={m.title}
        lede={services.length > 1 ? `${services.length} ${services.length === 1 ? 'service' : 'services'} for homeowners across the area we cover.` : null}
      />

      <section style={{ paddingBottom: sectionPad }}>
        <div style={{ ...wrap, display: 'grid', gap: 18 }}>
          {services.map((s, i) => {
            const img = (c.images || {})[`service_${s.slug}`]
            const line = oneLine(s.short) || oneLine(s.description)
            return (
              <article key={s.slug} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, overflow: 'hidden' }}>
                <div className="ctr-panel-in">
                  {img?.url
                    ? <img src={img.url} alt={img.alt || ''} style={{ width: '100%', height: '100%', minHeight: 260, objectFit: 'cover' }} />
                    : <div style={{ background: C.surfaceAlt, minHeight: 8 }} />}
                  <div style={{ padding: 'clamp(26px, 3vw, 48px)', display: 'flex', flexDirection: 'column', gap: 13, justifyContent: 'center' }}>
                    {s.category && s.category !== s.name && (
                      <span style={{ ...x.eyebrow(C.textMuted) }}>{s.category}</span>
                    )}
                    <h2 style={{ ...x.h3, fontSize: 'clamp(24px, 2.4vw, 34px)' }}>{s.name}</h2>
                    {line && <p style={{ margin: 0, color: C.text, fontSize: 18.5, lineHeight: 1.7, maxWidth: '52ch' }}>{line}</p>}
                    <span style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
                      <a href={href.service(s.slug)} style={{ ...btnPrimary(x), padding: '13px 24px', fontSize: 16 }}>See {s.name}</a>
                      <a href={quoteHref} style={{ ...btnOutline(x, C.text), padding: '13px 24px', fontSize: 16 }}>{quoteLabel}</a>
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
          {services.length === 0 && concept && (
            <ConceptNote T={T} minHeight={240} title="Your services, one panel each">
              Every service you offer gets its own panel here, with its photograph and its own page behind it.
            </ConceptNote>
          )}
        </div>
      </section>

      <Closing x={x} />

      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- One service ----------------------------------------------------------

/**
 * The page a search lands on. The photograph runs full width under a centred
 * header, the copy reads down the middle at a comfortable measure, and what
 * happens on a visit is the same timeline the home page uses.
 */
export function CentreServiceDetail({ config: c, siteSlug, service }) {
  const x = centreContext(c, siteSlug)
  const { C, F, T, wrap, mid, sectionPad, href, quoteHref, quoteLabel, services, concept } = x
  const m = serviceModel(x, service)
  const body = { maxWidth: 860, margin: '0 auto', fontSize: 18.5, lineHeight: 1.78, color: C.text }
  const reviews = ((c.reviews || {}).featured || []).filter(r => r?.text).slice(0, 3)

  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header
        x={x}
        crumbs={m.crumbs}
        eyebrow={m.badge ? `${m.eyebrow} · ${m.badge}` : m.eyebrow}
        title={service.name}
        lede={m.subhead}
      />
      <div style={{ ...wrap, marginBottom: 'clamp(28px, 3.5vw, 44px)' }}><ActionRow x={x} /></div>

      {m.image?.url && (
        <div style={{ maxWidth: 1400, margin: '0 auto clamp(36px, 4vw, 56px)', paddingInline: 'clamp(20px, 4vw, 44px)' }}>
          <img
            src={m.image.url}
            alt={m.image.alt || ''}
            style={{ width: '100%', height: 'clamp(240px, 34vw, 460px)', objectFit: 'cover', borderRadius: T.radius.lg, display: 'block' }}
          />
        </div>
      )}

      <FactBand x={x} />

      {/* THE OPENING — one paragraph set large, the rest at reading size.
          Never more prose than that before something changes shape. */}
      {m.intro && (
        <section style={{ paddingBlock: 'clamp(40px, 5vw, 68px)' }}>
          <div style={wrap}>
            {(() => {
              const paras = paragraphs(m.intro)
              return (
                <>
                  <p style={{ fontFamily: F.display, fontWeight: 500, fontSize: 'clamp(21px, 2.2vw, 30px)', lineHeight: 1.42, color: C.text, maxWidth: '52ch', margin: '0 auto', textAlign: 'center' }}>
                    {paras[0]}
                  </p>
                  {paras.length > 1 && (
                    <div style={{ ...body, marginTop: 30 }}>
                      {paras.slice(1).map((t, i) => <p key={i} style={{ margin: '0 0 18px' }}>{t}</p>)}
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </section>
      )}

      {/* THE SIGNS — one composed panel rather than a row of cards: Centre
          keeps a section to a single object, and these are read together. */}
      {m.signs && (
        <section style={{ paddingBlock: 'clamp(30px, 4vw, 56px)' }}>
          {/* The panel is sized to the line length, not to the page: a
              1060px box holding 62 characters of text is mostly empty. */}
          <div style={{ ...wrap, maxWidth: 880 }}>
            <div style={{ ...mid, textAlign: 'center' }}>
              <h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 30 }}>Signs you need {lowerName(service.name)}</h2>
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, padding: 'clamp(6px, 1vw, 12px) clamp(20px, 3vw, 40px)' }}>
              {m.signs.map((sg, i) => (
                <div key={i} className="ctr-sign" style={{ paddingBlock: 'clamp(20px, 2.2vw, 28px)', borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                  <h3 style={{ ...x.h3, fontSize: 'clamp(20px, 2.1vw, 26px)', marginBottom: 8 }}>{sg.sign}</h3>
                  {sg.detail && <p style={{ margin: 0, color: C.text, fontSize: 17.5, lineHeight: 1.72 }}>{sg.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT HAPPENS — on its own ground, so the page changes colour before
          it changes subject. */}
      {(m.steps?.length > 0 || m.stepsText) && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 34 }}>What happens on the visit</h2></div>
            {m.steps?.length > 0 ? (
              /* Across the width, one step per row. Three columns turned every
                 step into a skinny tower of words. */
              <div style={{ maxWidth: 940, margin: '0 auto', display: 'grid' }}>
                {m.steps.map((s, i) => (
                  <div key={i} className="ctr-step">
                    <span style={{
                      flex: 'none', width: 52, height: 52, borderRadius: '50%', background: C.accent, color: C.onAccent,
                      display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 600, fontSize: 21,
                    }}>{i + 1}</span>
                    <div>
                      {s.title && <h3 style={{ ...x.h3, fontSize: 'clamp(20px, 2vw, 25px)', marginBottom: 6 }}>{s.title}</h3>}
                      {s.description && <p style={{ margin: 0, color: C.text, fontSize: 17.5, lineHeight: 1.7 }}>{s.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={body}>
                {paragraphs(m.stepsText).map((t, i) => <p key={i} style={{ margin: '0 0 18px' }}>{t}</p>)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* THE REVIEW — the same pull quote the home page uses, here to break the
          page rather than to persuade twice. */}
      {reviews.length === 1 && (
        <section style={{ paddingBlock: sectionPad }}>
          <figure style={{ ...wrap, margin: 0, textAlign: 'center' }}>
            <p style={{ fontFamily: F.display, fontWeight: 500, fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.28, margin: '0 auto', maxWidth: '28ch' }}>
              “{reviews[0].text}”
            </p>
            {(reviews[0].author || reviews[0].name) && (
              <figcaption style={{ marginTop: 20, color: C.textMuted, fontSize: 14.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {reviews[0].author || reviews[0].name}
              </figcaption>
            )}
          </figure>
        </section>
      )}

      {/* Two or three reviews read better as cards with a name on each than as
          one quote: a name and a date are what make them believable. */}
      {reviews.length > 1 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginBottom: 28 }}>What customers say</h2></div>
            <div className="ctr-tiles">
              {reviews.map((r, i) => (
                <figure key={i} style={{ margin: 0, background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: '24px 22px' }}>
                  <p style={{ margin: 0, color: C.text, fontSize: 17, lineHeight: 1.65 }}>“{r.text}”</p>
                  {(r.author || r.name) && (
                    <figcaption style={{ marginTop: 14, color: C.textMuted, fontSize: 13.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {r.author || r.name}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE USE — in a panel, so it reads as a specification rather than
          as three more paragraphs of the same article. */}
      {m.methods && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={{ ...wrap, maxWidth: 1060 }}>
            <div className="ctr-aside" style={{ borderTop: `2px solid ${C.text}`, paddingTop: 26 }}>
              <div>
                <h2 style={{ ...x.h3, fontSize: 'clamp(21px, 2.1vw, 27px)' }}>Equipment and methods</h2>
                <p style={{ margin: '10px 0 0', color: C.textMuted, fontSize: 15.5, lineHeight: 1.6 }}>
                  What we fit and work on for {lowerName(service.name)}.
                </p>
              </div>
              <div style={{ fontSize: 18.5, lineHeight: 1.78, color: C.text }}>
                {paragraphs(m.methods).map((t, i) => <p key={i} style={{ margin: i ? '0 0 16px' : '0 0 16px' }}>{t}</p>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QUESTIONS */}
      {m.faqs.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 26 }}>FAQs</h2></div>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {m.faqs.map((q, i) => (
                <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === m.faqs.length - 1 ? `1px solid ${C.border}` : undefined }}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '18px 0', fontSize: 19, fontWeight: 600 }}>
                    {q.question}
                    <span aria-hidden="true" style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${C.border}`, display: 'grid', placeItems: 'center', fontSize: 17, lineHeight: 1, color: C.accent }}>+</span>
                  </summary>
                  <p style={{ margin: '0 0 20px', color: C.text, fontSize: 18, lineHeight: 1.72, maxWidth: '62ch' }}>{q.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {m.noCopy && concept && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote>
          </div>
        </section>
      )}

      <Cost x={x} service={service} />

      <Towns x={x} service={service} />

      {m.related.length > 0 && (
        <section style={{ paddingBottom: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginBottom: 26 }}>Also for your home</h2></div>
            <div className="ctr-tiles">
              {m.related.map(s => (
                <a key={s.slug} href={href.service(s.slug)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: '22px 20px', textAlign: 'center', textDecoration: 'none' }}>
                  <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 23, lineHeight: 1.15, color: C.text }}>{s.name}</b>
                  <span style={{ display: 'block', marginTop: 8, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.accent }}>See the page →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Closing x={x} />

      <MobileBar x={x} />
    </CentrePage>
  )
}
