import { buildBreadcrumbSchema } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { centreContext, CentrePage, btnPrimary, btnOnPhoto, btnOutline } from './CentreKit.js'
import { homeModel, proofItems, stepsFrom, oneLine } from './family/data.js'

/**
 * CENTRE's home page: everything on one centre line. Each section disappears
 * when the data behind it isn't there — a client with no photograph gets a
 * typographic opening rather than a grey box, one with no review gets no
 * quote, and one town is a sentence rather than a grid.
 */
export default function CentreHome({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const { C, F, T, wrap, mid, sectionPad, eyebrow, concept, services, areas, name, phone, phoneDisplay, quoteHref, quoteLabel, href, biz, tradeNoun } = x
  const m = homeModel(x)
  const steps = stepsFrom(c.generated?.['home|process']) || []

  const heroImg = m.hero
  // Short facts only. proofItems also carries the licence and any warranty,
  // whose labels are sentences — true, and already in the hero's trust line,
  // but far too long for a slot sized for a number.
  const figures = [
    ...proofItems(x).filter(p => p.kind === 'rating' || p.kind === 'since').map(p => ({ v: p.value, k: p.label })),
    areas.length > 1 && { v: String(areas.length), k: 'Communities' },
  ].filter(Boolean).slice(0, 4)

  return (
    <CentrePage x={x} schemas={m.schemas}>

      {/* HERO — the photograph fills the screen and the words sit on the centre
          line. With no photograph the same words sit on the ground colour, so
          the page still opens with a statement rather than an empty frame. */}
      <section
        className="ctr-under-nav"
        data-hero=""
        style={{
          position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center', textAlign: 'center',
          minHeight: heroImg ? 'min(92vh, 860px)' : 'auto',
          paddingBottom: heroImg ? 'clamp(48px, 7vw, 96px)' : sectionPad,
          color: heroImg ? '#fff' : C.text,
          background: heroImg ? C.inverseBg : 'transparent',
        }}
      >
        {heroImg && (
          <>
            <img src={heroImg.url} alt={heroImg.alt || ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,12,10,0.78), rgba(16,12,10,0.62) 45%, rgba(16,12,10,0.92))' }} />
          </>
        )}
        <div style={{ ...wrap, position: 'relative', maxWidth: 920 }}>
          <span style={{ ...eyebrow(heroImg ? 'rgba(255,255,255,0.85)' : C.textMuted), display: 'block', marginBottom: 20 }}>
            {[name, m.place].filter(Boolean).join(' · ')}
          </span>
          <h1 style={x.h1}>{m.headline}</h1>
          {m.support && (
            <p style={{ fontSize: 'clamp(18px, 1.5vw, 21px)', margin: '20px auto 0', maxWidth: '46ch', opacity: heroImg ? 0.94 : 1, color: heroImg ? '#fff' : C.textDim }}>
              {m.support}
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
            {phone && <a href={`tel:${phone}`} style={heroImg ? btnOnPhoto(x) : btnPrimary(x)}>Call {phoneDisplay}</a>}
            <a href={quoteHref} style={heroImg ? btnOutline(x, '#fff') : btnOutline(x, C.text)}>{quoteLabel}</a>
          </div>
          {m.trust.length > 0 && (
            <div style={{
              display: 'flex', gap: '8px 22px', justifyContent: 'center', flexWrap: 'wrap',
              marginTop: 28, paddingTop: 22, fontSize: 15,
              borderTop: `1px solid ${heroImg ? 'rgba(255,255,255,0.22)' : C.border}`,
              color: heroImg ? 'rgba(255,255,255,0.9)' : C.textDim,
            }}>
              {m.trust.map((t, i) => <span key={i}>{t.text}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* SERVICES — one at a time. The names switch the panel; no list. */}
      {services.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}>
              <h2 style={x.h2}>What we take care of</h2>
              <p style={{ color: C.textMuted, margin: '12px auto 34px', maxWidth: '52ch' }}>
                Choose the one you need and we'll show you what it covers.
              </p>
            </div>
            <div className="ctr-tabs">
              {services.map((s, i) => (
                <input key={s.slug} type="radio" name="ctr-svc" id={`ctr-s${i}`} defaultChecked={i === 0} />
              ))}
              <div className="ctr-strip" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 30 }}>
                {services.map((s, i) => (
                  <label
                    key={s.slug}
                    htmlFor={`ctr-s${i}`}
                    style={{ border: `1.5px solid ${C.border}`, background: C.surface, borderRadius: 999, padding: '11px 20px', fontWeight: 600, fontSize: 16, color: C.text }}
                  >
                    {s.name}
                  </label>
                ))}
              </div>
              <div className="ctr-panels">
                {services.map((s, i) => {
                  const img = (c.images || {})[`service_${s.slug}`] || (i === 0 ? m.secondary : null)
                  return (
                    <div key={s.slug} className="ctr-panel" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, overflow: 'hidden' }}>
                      <div className="ctr-panel-in">
                        {img?.url
                          ? <img src={img.url} alt={img.alt || ''} style={{ width: '100%', height: '100%', minHeight: 300, objectFit: 'cover' }} />
                          : <div style={{ background: C.surfaceAlt, minHeight: 120 }} />}
                        <div style={{ padding: 'clamp(28px, 3.4vw, 56px)', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', textAlign: 'left' }}>
                          <h3 style={{ ...x.h3, fontSize: 'clamp(26px, 2.6vw, 38px)' }}>{s.name}</h3>
                          {oneLine(s.short) || oneLine(s.description)
                            ? <p style={{ margin: 0, color: C.textDim, fontSize: 17.5, maxWidth: '48ch' }}>{oneLine(s.short) || oneLine(s.description)}</p>
                            : null}
                          <span style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                            <a href={quoteHref} style={{ ...btnPrimary(x), padding: '13px 24px', fontSize: 16 }}>{quoteLabel}</a>
                            <a href={href.service(s.slug)} style={{ ...btnOutline(x, C.text), padding: '13px 24px', fontSize: 16 }}>See the page</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FIGURES — the facts, across the width, on a dark band. */}
      {figures.length > 0 && (
        <div style={{ background: C.inverseBgAlt, color: C.inverseText }}>
          <div style={wrap}>
            <div className="ctr-figures" style={{ ['--n']: figures.length, paddingBlock: 'clamp(38px, 4vw, 60px)' }}>
              {figures.map((f, i) => (
                <div key={i}>
                  <b style={{ fontFamily: F.display, fontWeight: 400, fontSize: 'clamp(34px, 4vw, 58px)', display: 'block', lineHeight: 1 }}>{f.v}</b>
                  <span style={{ display: 'block', marginTop: 10, fontSize: 13.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.inverseTextDim }}>{f.k}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* THE REVIEW — alone, large, with no score beside it. */}
      {m.reviews.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <figure style={{ ...wrap, margin: 0, textAlign: 'center' }}>
            <p style={{ fontFamily: F.display, fontSize: 'clamp(23px, 2.9vw, 42px)', lineHeight: 1.24, margin: '0 auto', maxWidth: '30ch', fontWeight: 400 }}>
              “{m.reviews[0].text}”
            </p>
            {(m.reviews[0].author || m.reviews[0].name) && (
              <figcaption style={{ marginTop: 24, color: C.textMuted, fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {m.reviews[0].author || m.reviews[0].name}
              </figcaption>
            )}
          </figure>
        </section>
      )}

      {/* HOW IT WORKS — a timeline, with the line drawn through the markers. */}
      {steps.length === 3 && (
        <section style={{ paddingBlock: sectionPad, paddingTop: 0 }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, marginBottom: 34 }}>How a visit goes</h2></div>
            <div className="ctr-timeline">
              {steps.map((s, i) => (
                <div key={i}>
                  <span style={{
                    position: 'relative', zIndex: 1, width: 38, height: 38, borderRadius: '50%', background: C.accent, color: C.onAccent,
                    display: 'grid', placeItems: 'center', margin: '0 auto 20px', fontWeight: 700, fontSize: 15,
                    boxShadow: `0 0 0 8px ${C.bg}`,
                  }}>{i + 1}</span>
                  <h3 style={{ ...x.h3, fontSize: 24, marginBottom: 6 }}>{s.title}</h3>
                  {s.description && <p style={{ margin: 0, color: C.textMuted, fontSize: 16.5 }}>{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AREAS — tiles on the accent band, the only place it runs at full
          strength. One town is a sentence instead. */}
      {areas.length > 0 && (
        <section style={{ background: C.accent, color: C.onAccent, paddingBlock: sectionPad, textAlign: 'center' }}>
          <div style={wrap}>
            <div style={mid}>
              <span style={{ ...eyebrow(C.onAccent), display: 'block', opacity: 0.75, marginBottom: 22 }}>Service areas</span>
              <h2 style={{ ...x.h2, color: C.onAccent, marginBottom: 10 }}>Where we work</h2>
              <p style={{ color: C.onAccent, opacity: 0.85, margin: '0 auto 34px', maxWidth: '52ch' }}>
                {areas.length > 1
                  ? `${areas.length} communities around ${m.place || areas[0]}. Every one has its own page.`
                  : `${tradeNoun} in ${areas[0]}.`}
              </p>
            </div>
            <div className="ctr-tiles">
              {areas.map(a => (
                <a key={a} href={href.area(a)} style={{ background: C.surface, borderRadius: T.radius.md, padding: '22px 18px 20px', textAlign: 'center', textDecoration: 'none' }}>
                  <b style={{ display: 'block', fontFamily: F.display, fontWeight: 400, fontSize: 25, lineHeight: 1.1, color: C.text }}>{a}</b>
                  <span style={{ display: 'block', marginTop: 8, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.accent }}>See the page →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUESTIONS — they open and close. */}
      {m.faqs.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, marginBottom: 30 }}>Questions</h2></div>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {m.faqs.map((q, i) => (
                <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === m.faqs.length - 1 ? `1px solid ${C.border}` : undefined }}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '20px 0', fontSize: 20, fontWeight: 600 }}>
                    {q.question}
                    <span aria-hidden="true" style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${C.border}`, display: 'grid', placeItems: 'center', fontSize: 17, lineHeight: 1, color: C.accent }}>+</span>
                  </summary>
                  <p style={{ margin: '0 0 22px', color: C.textDim, maxWidth: '62ch' }}>{q.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {concept && services.length === 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <ConceptNote T={T} minHeight={240} title="Your services, one at a time">
              Each service gets the panel to itself — the photograph, what it covers, and what it starts at.
            </ConceptNote>
          </div>
        </section>
      )}

      {/* CLOSING — centred over a photograph when there is one. */}
      <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', paddingBlock: 'clamp(60px, 7vw, 108px)', background: m.secondary?.url ? C.inverseBg : C.bgAlt, color: m.secondary?.url ? '#fff' : C.text }}>
        {m.secondary?.url && (
          <>
            <img src={m.secondary.url} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18,14,12,0.76), rgba(18,14,12,0.88))' }} />
          </>
        )}
        <div style={{ ...wrap, position: 'relative' }}>
          <h2 style={{ ...x.h2, color: 'inherit' }}>Get in touch</h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
            {phone && <a href={`tel:${phone}`} style={m.secondary?.url ? btnOnPhoto(x) : btnPrimary(x)}>Call {phoneDisplay}</a>}
            <a href={quoteHref} style={btnOutline(x, m.secondary?.url ? '#fff' : C.text)}>{quoteLabel}</a>
          </div>
          {biz.hours_display && <span style={{ display: 'block', marginTop: 18, opacity: 0.86, fontSize: 16 }}>{biz.hours_display}</span>}
        </div>
      </section>
    </CentrePage>
  )
}
