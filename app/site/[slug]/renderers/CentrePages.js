import { centreContext, CentrePage, btnPrimary, btnOutline } from './CentreKit.js'
import CrewMobileBar from './CrewMobileBar.js'
import { servicesIndexModel, serviceModel, paragraphs, oneLine } from './family/data.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'

// CENTRE's inner pages. The shapes come from the home page — a centred header,
// one thing at a time, facts across a band — so a visitor who lands on a
// service page from a search sees the same business as someone who came
// through the front door.

/** A centred page header, on the ground colour. Inner pages don't take the
 *  full-height photographic treatment: that belongs to the home page. */
function Header({ x, crumbs, eyebrow, title, lede }) {
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
function FactBand({ x, items }) {
  const short = (items || []).filter(t => typeof t === 'string' && t.length <= 44).slice(0, 4)
  if (short.length === 0) return null
  const { C, wrap } = x
  return (
    <div style={{ background: C.inverseBgAlt, color: C.inverseText }}>
      <div style={wrap}>
        <div className="ctr-figures" style={{ ['--n']: short.length, paddingBlock: 'clamp(26px, 3vw, 40px)' }}>
          {short.map((t, i) => (
            <div key={i} style={{ fontSize: 15.5, lineHeight: 1.5, color: C.inverseTextDim }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Call or quote, inline. The research is consistent that one action repeated
 *  after each explanation beats a single button at the bottom of the page. */
function ActionRow({ x, align = 'center' }) {
  const { C, phone, phoneDisplay, quoteHref, quoteLabel } = x
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: align, flexWrap: 'wrap' }}>
      {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}>Call {phoneDisplay}</a>}
      <a href={quoteHref} style={btnOutline(x, C.text)}>{quoteLabel}</a>
    </div>
  )
}

/** What the work costs, in the client's own numbers. Nothing here is ours. */
function Cost({ x, service }) {
  const { C, F, T, wrap, mid, sectionPad } = x
  const p = x.c.pricing || {}
  const items = [
    p.diagnostic_fee && { k: 'Diagnostic', v: p.diagnostic_fee },
    p.service_call_fee && { k: 'Service call', v: p.service_call_fee },
    p.price_range_general && { k: 'Typical range', v: p.price_range_general },
    p.free_estimates && { k: 'Estimates', v: 'Free' },
  ].filter(Boolean)
  const notes = [p.approach, !p.free_estimates && p.estimate_policy, p.financing && (p.financing_partners?.length
    ? `Financing available through ${p.financing_partners.join(', ')}.`
    : 'Financing available.')].filter(Boolean)
  if (items.length === 0 && notes.length === 0) return null
  return (
    <section style={{ paddingBlock: sectionPad }}>
      <div style={wrap}>
        <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 28 }}>What it costs</h2></div>
        {items.length > 0 && (
          <div className="ctr-tiles" style={{ marginBottom: notes.length ? 26 : 0 }}>
            {items.map(i => (
              <div key={i.k} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: '24px 22px', textAlign: 'center' }}>
                <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 27, color: C.text, lineHeight: 1.1 }}>{i.v}</b>
                <span style={{ display: 'block', marginTop: 8, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted }}>{i.k}</span>
              </div>
            ))}
          </div>
        )}
        {notes.map((n, i) => (
          <p key={i} style={{ maxWidth: '62ch', margin: '0 auto 12px', textAlign: 'center', color: C.text, fontSize: 17.5, lineHeight: 1.7 }}>{n}</p>
        ))}
        <div style={{ marginTop: 26 }}><ActionRow x={x} /></div>
      </div>
    </section>
  )
}

/** The towns, linked to the page for this service in each one. The combo pages
 *  exist and nothing was linking to them from here. */
function Towns({ x, service }) {
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
function Closing({ x }) {
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

      <CrewMobileBar
        phone={x.phone}
        phoneDisplay={x.phoneDisplay}
        quoteHref={quoteHref}
        colors={C}
        fontFamily={F.body}
      />
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
  const body = { maxWidth: 720, margin: '0 auto', fontSize: 18.5, lineHeight: 1.78, color: C.text }
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

      <FactBand x={x} items={m.facts} />

      {/* THE OPENING — one paragraph set large, the rest at reading size.
          Never more prose than that before something changes shape. */}
      {m.intro && (
        <section style={{ paddingBlock: 'clamp(40px, 5vw, 68px)' }}>
          <div style={wrap}>
            {(() => {
              const paras = paragraphs(m.intro)
              return (
                <>
                  <p style={{ fontFamily: F.display, fontWeight: 500, fontSize: 'clamp(21px, 2.2vw, 29px)', lineHeight: 1.36, color: C.text, maxWidth: '34ch', margin: '0 auto', textAlign: 'center' }}>
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

      {/* WHAT HAPPENS — on its own ground, so the page changes colour before
          it changes subject. */}
      {(m.steps?.length > 0 || m.stepsText) && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 34 }}>What happens on the visit</h2></div>
            {m.steps?.length === 3 ? (
              <div className="ctr-timeline">
                {m.steps.map((s, i) => (
                  <div key={i}>
                    <span style={{
                      position: 'relative', zIndex: 1, width: 38, height: 38, borderRadius: '50%', background: C.accent, color: C.onAccent,
                      display: 'grid', placeItems: 'center', margin: '0 auto 18px', fontWeight: 700, fontSize: 15, boxShadow: `0 0 0 8px ${C.bgAlt}`,
                    }}>{i + 1}</span>
                    {s.title && <h3 style={{ ...x.h3, fontSize: 23, marginBottom: 6 }}>{s.title}</h3>}
                    {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 17, lineHeight: 1.65 }}>{s.description}</p>}
                  </div>
                ))}
              </div>
            ) : m.steps?.length > 0 ? (
              <div className="ctr-tiles">
                {m.steps.map((s, i) => (
                  <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: '24px 22px' }}>
                    <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 20, color: C.accent }}>{String(i + 1).padStart(2, '0')}</span>
                    {s.title && <h3 style={{ ...x.h3, fontSize: 21, margin: '8px 0 6px' }}>{s.title}</h3>}
                    {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 16.5, lineHeight: 1.6 }}>{s.description}</p>}
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
        <section style={{ paddingBottom: sectionPad, paddingTop: reviews.length ? 0 : sectionPad }}>
          <div style={wrap}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, padding: 'clamp(28px, 3.4vw, 52px)', maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ ...x.h3, fontSize: 'clamp(22px, 2.2vw, 28px)', marginBottom: 16, textAlign: 'center' }}>What we use</h2>
              <div style={{ ...body, maxWidth: '66ch' }}>
                {paragraphs(m.methods).map((t, i) => <p key={i} style={{ margin: '0 0 16px' }}>{t}</p>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QUESTIONS */}
      {m.faqs.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 26 }}>Questions</h2></div>
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

      <CrewMobileBar
        phone={x.phone}
        phoneDisplay={x.phoneDisplay}
        quoteHref={quoteHref}
        colors={C}
        fontFamily={F.body}
      />
    </CentrePage>
  )
}
