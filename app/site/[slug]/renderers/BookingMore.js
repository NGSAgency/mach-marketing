import { bookingContext, BookingPage, RequestCard, btnPrimary } from './BookingKit.js'
import { PageHead, CardColumn, Prose, Rule, FAQs, Coverage, Figures, factFigures, RequestBand } from './BookingPages.js'
import {
  areasIndexModel, areaModel, comboModel, aboutModel, contactModel, faqModel,
  pageFacts, oneLine,
} from './family/data.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'

// The rest of BOOKING. Same shape everywhere: content left, the request card
// pinned right, a rule between subjects instead of a new background colour.

/** Linked rows in two columns — towns, or services within a town. */
function Rows({ x, items }) {
  const { C, F } = x
  if (!items.length) return null
  return (
    <div className="bk-two">
      {items.map(i => (
        <a key={i.href} href={i.href} style={{
          display: 'grid', gap: 4, padding: '17px 0', borderTop: `1px solid ${C.border}`, textDecoration: 'none', color: 'inherit',
        }}>
          <b style={{ fontFamily: F.display, fontWeight: 700, fontSize: 19, letterSpacing: '-0.015em', color: C.text }}>{i.title}</b>
          {i.note && <span style={{ color: C.textDim, fontSize: 15.5, lineHeight: 1.55 }}>{i.note}</span>}
        </a>
      ))}
    </div>
  )
}

// ---- Service areas --------------------------------------------------------

/**
 * A town at a time, as a card with what we do there inside it, under a band of
 * figures. Two earlier versions failed in opposite directions: a wall of chips
 * that looked frantic, then plain text links that looked like nothing. A card
 * with a name, a list and one way out of it is the shape that holds.
 */
export function BookingAreas({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, areas, services, href, concept, placeLabel, tradeNoun, offeringLabel } = x
  const m = areasIndexModel(x)
  const figures = factFigures(x, [
    areas.length > 1 && { v: String(areas.length), k: 'Communities' },
    services.length > 1 && { v: String(services.length), k: offeringLabel },
  ].filter(Boolean))

  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={placeLabel} title={m.title}
        lede={areas.length > 1
          ? `${tradeNoun} in ${areas.length} communities. Every one has its own page, and every service has its own page in every one.`
          : null} />
      <Figures x={x} items={figures} />

      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          {areas.length === 0 && concept && (
            <ConceptNote T={T} minHeight={220} title="The towns you cover">Every town you work in gets its own page here.</ConceptNote>
          )}
          <div className="bk-three">
            {areas.map(a => (
              <div key={a} style={{
                background: C.surface, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.accent}`,
                borderRadius: T.radius.md, padding: 'clamp(20px, 2.2vw, 26px)', display: 'flex', flexDirection: 'column',
              }}>
                <h2 style={{ fontFamily: F.display, fontWeight: 800, fontSize: 23, letterSpacing: '-0.03em', margin: '0 0 12px', color: C.text }}>
                  <a href={href.area(a)} style={{ color: 'inherit', textDecoration: 'none' }}>{a}</a>
                </h2>
                {services.length > 0 && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 7, flex: 1 }}>
                    {services.map(s => (
                      <li key={s.slug} style={{ fontSize: 16, lineHeight: 1.5 }}>
                        <a href={href.combo(s, a)} style={{ color: C.textDim, textDecoration: 'none' }}>{s.name} in {a}</a>
                      </li>
                    ))}
                  </ul>
                )}
                <a href={href.area(a)} style={{
                  marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.border}`,
                  color: C.accentDim, fontWeight: 700, fontSize: 15.5, textDecoration: 'none',
                }}>Everything in {a} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequestBand
        x={x}
        title="Tell us where you are"
        lede="Send the form with your address and what is wrong, and we will come back to you with a time."
      />
    </BookingPage>
  )
}

// ---- One area -------------------------------------------------------------

export function BookingAreaDetail({ config: c, siteSlug, area }) {
  const x = bookingContext(c, siteSlug)
  const { C, T, wrap, sectionPad, services, href, concept, tradeNoun } = x
  const m = areaModel(x, area)
  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={tradeNoun} title={m.title} lede={m.subhead} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <div>
              {m.image?.url && (
                <img src={m.image.url} alt={m.image.alt || ''} style={{ width: '100%', height: 'clamp(200px, 26vw, 340px)', objectFit: 'cover', borderRadius: T.radius.md, display: 'block', marginBottom: 30 }} />
              )}
              <Prose x={x} text={m.intro} lead />
              {m.local && (<><Rule x={x}>About {area}</Rule><Prose x={x} text={m.local} /></>)}
              {services.length > 0 && (
                <>
                  <Rule x={x}>What we do in {area}</Rule>
                  <Rows x={x} items={services.map(s => ({ href: href.combo(s, area), title: s.name, note: oneLine(s.short) }))} />
                  <div style={{ borderTop: `1px solid ${C.border}` }} />
                </>
              )}
              {m.faqs.length > 0 && (<><Rule x={x}>Questions from {area}</Rule><FAQs x={x} items={m.faqs} /></>)}
              {m.noCopy && concept && (
                <div style={{ marginTop: 34 }}><ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote></div>
              )}
            </div>
            <CardColumn x={x} facts={m.facts} title={`Request a visit in ${area}`} />
          </div>
        </div>
      </section>
      <Coverage x={x} heading="Nearby" items={m.otherAreas} hrefFor={a => href.area(a)} />
    </BookingPage>
  )
}

// ---- One service in one area ---------------------------------------------

export function BookingCombo({ config: c, siteSlug, service, area }) {
  const x = bookingContext(c, siteSlug)
  const { C, T, wrap, sectionPad, href, concept } = x
  const m = comboModel(x, service, area)
  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={m.badge ? `${service.name} · ${m.badge}` : service.name} title={m.title} lede={m.subhead} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <div>
              {m.image?.url && (
                <img src={m.image.url} alt={m.image.alt || ''} style={{ width: '100%', height: 'clamp(200px, 26vw, 340px)', objectFit: 'cover', borderRadius: T.radius.md, display: 'block', marginBottom: 30 }} />
              )}
              <Prose x={x} text={m.intro} lead />
              {m.local && (<><Rule x={x}>Local to {area}</Rule><Prose x={x} text={m.local} /></>)}
              {m.faqs.length > 0 && (<><Rule x={x}>Questions</Rule><FAQs x={x} items={m.faqs} /></>)}
              {m.noCopy && concept && (
                <div style={{ marginTop: 34 }}><ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote></div>
              )}
              <Rule x={x}>More from here</Rule>
              <Rows x={x} items={m.upLinks.map(l => ({ href: l.href, title: l.label }))} />
              <div style={{ borderTop: `1px solid ${C.border}` }} />
            </div>
            <CardColumn x={x} facts={m.facts} title={`Request ${service.name} in ${area}`} />
          </div>
        </div>
      </section>
      <Coverage x={x} heading={`${service.name} in other towns`} items={m.otherAreas} hrefFor={a => href.combo(service, a)} />
    </BookingPage>
  )
}

// ---- About ----------------------------------------------------------------

export function BookingAbout({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, name, concept } = x
  const m = aboutModel(x)
  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow="About" title={name} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <div>
              {m.image?.url && (
                <img src={m.image.url} alt={m.image.alt || ''} style={{ width: '100%', height: 'clamp(200px, 28vw, 380px)', objectFit: 'cover', borderRadius: T.radius.md, display: 'block', marginBottom: 30 }} />
              )}
              {m.facts.length > 0 && (
                <div className="bk-three" style={{ marginBottom: 34 }}>
                  {m.facts.slice(0, 3).map((f, i) => (
                    <div key={i} style={{ borderTop: `2px solid ${C.text}`, paddingTop: 14 }}>
                      <b style={{ display: 'block', fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: C.text }}>{f.value}</b>
                      <span style={{ display: 'block', marginTop: 7, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {Array.isArray(m.story) && m.story.length > 0 && (
                <div style={{ fontSize: 18.5, lineHeight: 1.78, color: C.text }}>
                  {m.story.map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p}</p>)}
                </div>
              )}
              {m.approach && (<><Rule x={x}>How we work</Rule><Prose x={x} text={m.approach} /></>)}
              {concept && !m.story?.length && !m.approach && (
                <ConceptNote T={T} minHeight={240} title="Your story">Who started the business and why, how you work, and what you want people to know before they call.</ConceptNote>
              )}
            </div>
            <CardColumn x={x} facts={pageFacts(x)} />
          </div>
        </div>
      </section>
    </BookingPage>
  )
}

// ---- Contact --------------------------------------------------------------

/** The one page where the card is the page: it takes the wide column, and the
 *  details sit beside it. */
export function BookingContact({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const { C, T, wrap, sectionPad, phone, phoneDisplay, name } = x
  const m = contactModel(x)
  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow="Contact" title={`Book ${name}`}
        lede={phone ? 'Send the form and we will come back with a time, or call and we will book a window with you now.' : 'Send the form and we will come back to you with a time.'} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <RequestCard x={x} />
            <aside style={{ alignSelf: 'start' }}>
              {phone && <a href={`tel:${phone}`} style={{ ...btnPrimary(x), width: '100%', marginBottom: 18 }}>Call {phoneDisplay}</a>}
              {m.details.map(d => (
                <div key={d.k} style={{ padding: '14px 0', borderTop: `1px solid ${C.border}` }}>
                  <span style={{ display: 'block', fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted, marginBottom: 5 }}>{d.k}</span>
                  {d.href
                    ? <a href={d.href} style={{ color: C.text, fontSize: 17, textDecoration: 'none', borderBottom: `1px solid ${C.border}` }}>{d.v}</a>
                    : <span style={{ color: C.text, fontSize: 17, lineHeight: 1.5 }}>{d.v}</span>}
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>
    </BookingPage>
  )
}

// ---- FAQ ------------------------------------------------------------------

export function BookingFAQ({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const { wrap, sectionPad, faqs, concept, T } = x
  const m = faqModel(x)
  return (
    <BookingPage x={x} schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow="FAQs" title={m.title} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div className="bk-with-card">
            <div>
              {faqs.length > 0
                ? <FAQs x={x} items={faqs} />
                : concept && <ConceptNote T={T} minHeight={240} title="The questions customers ask you">The questions people ask before they book, answered in your words.</ConceptNote>}
            </div>
            <CardColumn x={x} facts={pageFacts(x)} title="Still not sure? Ask us" />
          </div>
        </div>
      </section>
    </BookingPage>
  )
}

// ---- Blog -----------------------------------------------------------------

function chrome(x) {
  return function Chrome({ children }) {
    return <BookingPage x={x}>{children}</BookingPage>
  }
}

export function BookingBlogIndex({ config: c, siteSlug, posts }) {
  const x = bookingContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={chrome(x)} />
}

export function BookingBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = bookingContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={chrome(x)} />
}
