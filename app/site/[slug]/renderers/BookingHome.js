import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { bookingContext, BookingPage, RequestCard, btnQuiet } from './BookingKit.js'
import { Coverage } from './BookingPages.js'
import { homeModel, proofItems, oneLine, paragraphs } from './family/data.js'
import { BookingGallery } from './Galleries.js'
import { galleryItems } from './family/data.js'

/**
 * BOOKING's home page. The order is the argument: ask for the visit first,
 * prove it second, explain third, and leave the catalogue until last, because
 * someone who is still reading at that point has already decided to call.
 *
 * There is no closing band. The form at the top is the closing band.
 */
export default function BookingHome({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, eyebrow, concept, services, areas, name, phone, phoneDisplay, href, biz, tradeNoun, offeringLabel } = x
  const m = homeModel(x)

  const rating = proofItems(x).find(p => p.kind === 'rating')
  // With no introduction and no reasons written, the photograph has nothing to
  // sit beside up the page, so it goes next to the list of services instead.
  const photoHere = !m.intro && m.whyUs.length === 0 && !!m.hero?.url
  const review = m.reviews[0] || null

  return (
    <BookingPage x={x} schemas={m.schemas}>

      {/* THE HERO — the argument on the left, a real form on the right. No
          photograph behind it: a form has to be the brightest thing on screen,
          and a picture under it makes the fields hard to read. */}
      <section style={{ borderBottom: `1px solid ${C.border}`, paddingBlock: 'clamp(38px, 4.5vw, 62px) clamp(44px, 5vw, 70px)' }}>
        <div style={wrap}>
          <div className="bk-top">
            <div>
              {m.place && <div style={{ ...eyebrow(C.accent), marginBottom: 14 }}>{tradeNoun} · {m.place}</div>}
              <h1 style={x.h1}>{m.headline}</h1>
              {m.support && (
                <p style={{ margin: '20px 0 0', fontSize: 'clamp(18px, 1.7vw, 21px)', lineHeight: 1.6, color: C.textDim, maxWidth: '38ch' }}>
                  {m.support}
                </p>
              )}
              {m.trust.length > 0 && (
                <ul style={{ margin: '26px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 11 }}>
                  {m.trust.map((t, i) => (
                    <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 11, alignItems: 'start', fontSize: 17, color: C.text }}>
                      <span aria-hidden="true" style={{ color: C.accent, fontWeight: 800, lineHeight: 1.6 }}>✓</span>
                      <span>{t.text}</span>
                    </li>
                  ))}
                </ul>
              )}
              {phone && (
                <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <a href={`tel:${phone}`} style={btnQuiet(x)}>Call {phoneDisplay}</a>
                  {biz.hours_display && <span style={{ color: C.textMuted, fontSize: 15.5 }}>{biz.hours_display}</span>}
                </div>
              )}
            </div>
            <div><RequestCard x={x} /></div>
          </div>
        </div>
      </section>

      {/* THE PROOF — immediately under the fold, where the doubt is, not in the
          usual strip above the footer. The rating and one review, nothing else. */}
      {x.sections.reviews && (rating || review) && (
        <section style={{ background: C.inverseBg, color: C.inverseText, paddingBlock: 'clamp(32px, 3.6vw, 48px)' }}>
          <div style={wrap}>
            <div className="bk-proof">
              {rating && (
                <div style={{ flex: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                    <b style={{ fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(40px, 4.6vw, 60px)', lineHeight: 1, letterSpacing: '-0.04em' }}>{rating.value}</b>
                    <span aria-hidden="true" style={{ color: C.accentLight, fontSize: 20, letterSpacing: '2px' }}>★★★★★</span>
                  </div>
                  <span style={{ display: 'block', marginTop: 9, fontSize: 14.5, color: C.inverseTextDim }}>{rating.label}</span>
                </div>
              )}
              {review && (
                <figure style={{ margin: 0, borderLeft: rating ? `2px solid ${C.inverseBorder}` : 'none', paddingLeft: rating ? 'clamp(20px, 3vw, 40px)' : 0 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.6, color: C.inverseText }}>“{review.text}”</p>
                  {(review.author || review.name) && (
                    <figcaption style={{ marginTop: 12, fontSize: 13.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.inverseTextDim }}>
                      {review.author || review.name}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WHY THEM — with the photograph as the left half of the block. On its
          own, full width, it sat in the middle of the page doing nothing. */}
      {(m.intro || m.whyUs.length > 0) && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div className="bk-split">
              <div>
                {m.hero?.url && (
                  <img
                    src={m.hero.url}
                    alt={m.hero.alt || ''}
                    style={{ width: '100%', height: 'clamp(260px, 32vw, 440px)', objectFit: 'cover', borderRadius: T.radius.lg, display: 'block', marginBottom: m.intro ? 26 : 0 }}
                  />
                )}
                {m.intro && (
                  <>
                    <h2 style={{ ...x.h2, fontSize: 'clamp(26px, 2.8vw, 38px)', marginBottom: 18 }}>Why {name}</h2>
                    <div style={x.body}>
                      {paragraphs(m.intro).map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p}</p>)}
                    </div>
                  </>
                )}
              </div>
              {m.whyUs.length > 0 && (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 20 }}>
                  {m.whyUs.map((w, i) => (
                    <li key={i} style={{ borderTop: `2px solid ${C.text}`, paddingTop: 14 }}>
                      <h3 style={{ ...x.h3, fontSize: 19.5, marginBottom: 6 }}>{w.title}</h3>
                      <p style={{ margin: 0, color: C.textDim, fontSize: 16.5, lineHeight: 1.66 }}>{w.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* THE CATALOGUE — last, and deliberately quiet: names and one line
          each, not a grid of cards competing with the form. A client with no
          introduction and no reasons written yet has their photograph here,
          beside the list, rather than stranded in the middle of the page. */}
      {services.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 8 }}>
              <h2 style={{ ...x.h2, fontSize: 'clamp(26px, 2.8vw, 38px)' }}>What we {offeringLabel === 'Services' ? 'do' : 'offer'}</h2>
              <a href={href.services} style={{ color: C.accentDim, fontWeight: 700, fontSize: 16.5 }}>All {offeringLabel.toLowerCase()} →</a>
            </div>
            <div className={photoHere ? 'bk-split' : undefined}>
              <div className={photoHere ? undefined : 'bk-two'}>
                {services.map(s => (
                  <a key={s.slug} href={href.service(s.slug)} style={{
                    display: 'grid', gap: 4, padding: '20px 0', borderTop: `1px solid ${C.border}`, textDecoration: 'none', color: 'inherit',
                  }}>
                    <b style={{ fontFamily: F.display, fontWeight: 700, fontSize: 19.5, letterSpacing: '-0.015em', color: C.text }}>{s.name}</b>
                    {oneLine(s.short) && <span style={{ color: C.textDim, fontSize: 16, lineHeight: 1.55 }}>{oneLine(s.short)}</span>}
                  </a>
                ))}
              </div>
              {photoHere && (
                <img
                  src={m.hero.url}
                  alt={m.hero.alt || ''}
                  style={{ width: '100%', height: '100%', maxHeight: 460, minHeight: 260, objectFit: 'cover', borderRadius: T.radius.lg, display: 'block' }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* THE TOWNS — a band of chips. Three lines with five towns and three
          with thirty, and it reads as a section rather than a sentence. */}
      <Coverage
        x={x}
        heading="Where we work"
        lede={areas.length > 1 ? `${tradeNoun} across ${areas.length} communities, each with its own page.` : null}
        items={areas}
        hrefFor={a => href.area(a)}
        more={areas.length > 1 ? { href: href.areas, label: 'See every area' } : null}
      />

      {/* THE PHOTOGRAPHS — one row, below the proof rather than in its place:
          the rating and the review stay directly under the fold. */}
      {x.sections.gallery && <BookingGallery x={x} items={galleryItems(c, x.services)} />}

      {/* THE QUESTIONS — open one at a time, straight above the footer, so the
          last thing before the details is an answer rather than another ask. */}
      {x.sections.faq && m.faqs.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={{ ...wrap, maxWidth: 900 }}>
            <h2 style={{ ...x.h2, fontSize: 'clamp(26px, 2.8vw, 38px)', marginBottom: 22 }}>Questions</h2>
            {m.faqs.map((q, i) => (
              <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === m.faqs.length - 1 ? `1px solid ${C.border}` : undefined }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '17px 0', fontSize: 18.5, fontWeight: 600 }}>
                  {q.question}
                  <span aria-hidden="true" style={{ flex: 'none', width: 24, height: 24, borderRadius: T.radius.sm, border: `1.5px solid ${C.border}`, display: 'grid', placeItems: 'center', fontSize: 16, lineHeight: 1, color: C.accent }}>+</span>
                </summary>
                <p style={{ margin: '0 0 20px', color: C.textDim, fontSize: 17.5, lineHeight: 1.72, maxWidth: '64ch' }}>{q.answer}</p>
              </details>
            ))}
            {m.faqs.length > 0 && <a href={href.faq} style={{ display: 'inline-block', marginTop: 20, color: C.accentDim, fontWeight: 700 }}>All questions →</a>}
          </div>
        </section>
      )}

      {concept && services.length === 0 && (
        <section style={{ paddingBlock: sectionPad }}><div style={wrap}>
          <ConceptNote T={T} minHeight={220} title="What you do">Every service you offer, each with its own page and the questions people ask about it.</ConceptNote>
        </div></section>
      )}
    </BookingPage>
  )
}
