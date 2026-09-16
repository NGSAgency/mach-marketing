import { centreContext, CentrePage, btnPrimary, btnOutline } from './CentreKit.js'
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
          {lede && <p style={{ fontSize: 'clamp(18px, 1.5vw, 21px)', color: C.textDim, margin: '20px auto 0', maxWidth: '52ch' }}>{lede}</p>}
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
                    {line && <p style={{ margin: 0, color: C.textDim, fontSize: 17.5, maxWidth: '52ch' }}>{line}</p>}
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
  const body = { maxWidth: 720, margin: '0 auto', fontSize: 18, lineHeight: 1.75, color: C.textDim }

  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow={m.eyebrow} title={service.name} lede={m.subhead} />

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

      {m.hasBody && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            {m.intro && (
              <div style={body}>
                {paragraphs(m.intro).split(/\n{2,}/).filter(Boolean).map((p, i) => (
                  <p key={i} style={{ margin: i === 0 ? '0 0 18px' : '0 0 18px' }}>{p.trim()}</p>
                ))}
              </div>
            )}

            {m.steps?.length > 0 && (
              <div style={{ marginTop: m.intro ? 'clamp(40px, 5vw, 64px)' : 0 }}>
                <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 32 }}>What happens on the visit</h2></div>
                {m.steps.length === 3 ? (
                  <div className="ctr-timeline">
                    {m.steps.map((s, i) => (
                      <div key={i}>
                        <span style={{
                          position: 'relative', zIndex: 1, width: 38, height: 38, borderRadius: '50%', background: C.accent, color: C.onAccent,
                          display: 'grid', placeItems: 'center', margin: '0 auto 18px', fontWeight: 700, fontSize: 15, boxShadow: `0 0 0 8px ${C.bg}`,
                        }}>{i + 1}</span>
                        {s.title && <h3 style={{ ...x.h3, fontSize: 23, marginBottom: 6 }}>{s.title}</h3>}
                        {s.description && <p style={{ margin: 0, color: C.textMuted, fontSize: 16.5 }}>{s.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ol style={{ ...body, listStyle: 'none', padding: 0, counterReset: 'step', display: 'grid', gap: 18 }}>
                    {m.steps.map((s, i) => (
                      <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 16, alignItems: 'baseline' }}>
                        <span style={{ fontFamily: F.display, fontSize: 21, color: C.accent }}>{i + 1}</span>
                        <span>
                          {s.title && <strong style={{ display: 'block', color: C.text }}>{s.title}</strong>}
                          {s.description}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {m.stepsText && (
              <div style={{ ...body, marginTop: 'clamp(32px, 4vw, 56px)' }}>
                {paragraphs(m.stepsText).split(/\n{2,}/).filter(Boolean).map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p.trim()}</p>)}
              </div>
            )}

            {m.methods && (
              <div style={{ ...body, marginTop: 'clamp(32px, 4vw, 56px)' }}>
                <h2 style={{ ...x.h3, color: C.text, marginBottom: 14, textAlign: 'center' }}>What we use</h2>
                {paragraphs(m.methods).split(/\n{2,}/).filter(Boolean).map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p.trim()}</p>)}
              </div>
            )}

            {m.faqs.length > 0 && (
              <div style={{ marginTop: 'clamp(44px, 5vw, 72px)' }}>
                <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 26 }}>Questions</h2></div>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                  {m.faqs.map((q, i) => (
                    <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === m.faqs.length - 1 ? `1px solid ${C.border}` : undefined }}>
                      <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '18px 0', fontSize: 19, fontWeight: 600 }}>
                        {q.question}
                        <span aria-hidden="true" style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${C.border}`, display: 'grid', placeItems: 'center', fontSize: 17, lineHeight: 1, color: C.accent }}>+</span>
                      </summary>
                      <p style={{ margin: '0 0 20px', color: C.textDim, maxWidth: '62ch' }}>{q.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {m.noCopy && concept && (
              <div style={{ marginTop: 32 }}>
                <ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote>
              </div>
            )}
          </div>
        </section>
      )}

      {m.related.length > 0 && (
        <section style={{ paddingBottom: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginBottom: 26 }}>Also for your home</h2></div>
            <div className="ctr-tiles">
              {m.related.map(s => (
                <a key={s.slug} href={href.service(s.slug)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: '22px 20px', textAlign: 'center', textDecoration: 'none' }}>
                  <b style={{ display: 'block', fontFamily: F.display, fontWeight: 400, fontSize: 23, lineHeight: 1.15, color: C.text }}>{s.name}</b>
                  <span style={{ display: 'block', marginTop: 8, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.accent }}>See the page →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Closing x={x} />
    </CentrePage>
  )
}
