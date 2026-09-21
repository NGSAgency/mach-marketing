import { centreContext, CentrePage, btnPrimary } from './CentreKit.js'
import { Header, FactBand, ActionRow, Closing, MobileBar } from './CentrePages.js'
import {
  areasIndexModel, areaModel, comboModel, aboutModel, contactModel, faqModel,
  paragraphs, formColors,
} from './family/data.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'

// The rest of CENTRE. Every page is built from the pieces the home and service
// pages established — a centred header, a trust bar, prose at a readable
// measure, tiles, an accordion — so the family stays one thing.

/** Prose at the family's measure, or nothing. */
function Prose({ x, text, max = 860 }) {
  const list = paragraphs(text)
  if (list.length === 0) return null
  return (
    <div style={{ maxWidth: max, margin: '0 auto', fontSize: 18.5, lineHeight: 1.78, color: x.C.text }}>
      {list.map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p}</p>)}
    </div>
  )
}

function Accordion({ x, items, heading = 'FAQs' }) {
  if (!items?.length) return null
  const { C, wrap, mid, sectionPad } = x
  return (
    <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
      <div style={wrap}>
        <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 26 }}>{heading}</h2></div>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {items.map((q, i) => (
            <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === items.length - 1 ? `1px solid ${C.border}` : undefined }}>
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
  )
}

/** A grid of linked tiles — towns, services, whatever is being pointed at. */
function Tiles({ x, items }) {
  const { C, F, T } = x
  return (
    <div className="ctr-tiles">
      {items.map(i => (
        <a key={i.href} href={i.href} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.md, padding: '22px 20px', textAlign: 'center', textDecoration: 'none' }}>
          {i.lead && <span style={{ display: 'block', fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted, marginBottom: 6 }}>{i.lead}</span>}
          <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 22, lineHeight: 1.15, color: C.text }}>{i.title}</b>
          <span style={{ display: 'block', marginTop: 8, fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.accent }}>See the page →</span>
        </a>
      ))}
    </div>
  )
}

// ---- Service areas --------------------------------------------------------

export function CentreAreas({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const { C, wrap, sectionPad, areas, href, tradeNoun, placeLabel, concept, T } = x
  const m = areasIndexModel(x)
  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow={placeLabel} title={m.title}
        lede={areas.length > 1 ? `${tradeNoun} across ${areas.length} communities. Each one has its own page.` : null} />
      <div style={{ ...wrap, marginBottom: 'clamp(28px, 3.5vw, 44px)' }}><ActionRow x={x} /></div>
      <FactBand x={x} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          {areas.length > 0
            ? <Tiles x={x} items={areas.map(a => ({ href: href.area(a), title: a }))} />
            : concept && <ConceptNote T={T} minHeight={220} title="The towns you cover">Every town you work in gets its own page here, with the calls you get there.</ConceptNote>}
        </div>
      </section>
      <Closing x={x} />
      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- One area -------------------------------------------------------------

export function CentreAreaDetail({ config: c, siteSlug, area }) {
  const x = centreContext(c, siteSlug)
  const { C, T, wrap, mid, sectionPad, services, href, concept, tradeNoun } = x
  const m = areaModel(x, area)
  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow={tradeNoun} title={m.title} lede={m.subhead} />
      <div style={{ ...wrap, marginBottom: 'clamp(28px, 3.5vw, 44px)' }}><ActionRow x={x} /></div>
      {m.image?.url && (
        <div style={{ maxWidth: 1400, margin: '0 auto clamp(36px, 4vw, 56px)', paddingInline: 'clamp(20px, 4vw, 44px)' }}>
          <img src={m.image.url} alt={m.image.alt || ''} style={{ width: '100%', height: 'clamp(240px, 32vw, 430px)', objectFit: 'cover', borderRadius: T.radius.lg, display: 'block' }} />
        </div>
      )}
      <FactBand x={x} />
      {m.intro && <section style={{ paddingBlock: sectionPad }}><div style={wrap}><Prose x={x} text={m.intro} /></div></section>}
      {(m.local || m.aroundTown.length > 0) && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={{ ...wrap, maxWidth: 1060 }}>
            {m.local && (
              <div className="ctr-aside" style={{ borderTop: `2px solid ${C.text}`, paddingTop: 26 }}>
                <div><h2 style={{ ...x.h3, fontSize: 'clamp(21px, 2.1vw, 27px)' }}>About {area}</h2></div>
                <Prose x={x} text={m.local} max={720} />
              </div>
            )}
            {m.aroundTown.length > 0 && (
              <div className="ctr-aside" style={{ borderTop: `2px solid ${C.text}`, paddingTop: 26, marginTop: m.local ? 44 : 0 }}>
                <div><h2 style={{ ...x.h3, fontSize: 'clamp(21px, 2.1vw, 27px)' }}>Where we work</h2></div>
                <Prose x={x} text={m.aroundTown.join('\n\n')} max={720} />
              </div>
            )}
          </div>
        </section>
      )}
      {services.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: 28 }}>What we do in {area}</h2></div>
            <Tiles x={x} items={services.map(s => ({ href: href.combo(s, area), title: s.name, lead: 'In ' + area }))} />
          </div>
        </section>
      )}
      <Accordion x={x} items={m.faqs} />
      {m.otherAreas.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginBottom: 26 }}>Nearby</h2></div>
            <Tiles x={x} items={m.otherAreas.map(a => ({ href: href.area(a), title: a }))} />
          </div>
        </section>
      )}
      {m.noCopy && concept && (
        <section style={{ paddingBottom: sectionPad }}><div style={wrap}><ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote></div></section>
      )}
      <Closing x={x} />
      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- One service in one area ---------------------------------------------

export function CentreCombo({ config: c, siteSlug, service, area }) {
  const x = centreContext(c, siteSlug)
  const { C, T, wrap, mid, sectionPad, href, concept } = x
  const m = comboModel(x, service, area)
  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow={m.badge ? `${service.name} · ${m.badge}` : service.name} title={m.title} lede={m.subhead} />
      <div style={{ ...wrap, marginBottom: 'clamp(28px, 3.5vw, 44px)' }}><ActionRow x={x} /></div>
      {m.image?.url && (
        <div style={{ maxWidth: 1400, margin: '0 auto clamp(36px, 4vw, 56px)', paddingInline: 'clamp(20px, 4vw, 44px)' }}>
          <img src={m.image.url} alt={m.image.alt || ''} style={{ width: '100%', height: 'clamp(240px, 32vw, 430px)', objectFit: 'cover', borderRadius: T.radius.lg, display: 'block' }} />
        </div>
      )}
      <FactBand x={x} />
      {m.intro && <section style={{ paddingBlock: sectionPad }}><div style={wrap}><Prose x={x} text={m.intro} /></div></section>}
      {m.local && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={{ ...wrap, maxWidth: 1060 }}>
            <div className="ctr-aside" style={{ borderTop: `2px solid ${C.text}`, paddingTop: 26 }}>
              <div><h2 style={{ ...x.h3, fontSize: 'clamp(21px, 2.1vw, 27px)' }}>Local to {area}</h2></div>
              <Prose x={x} text={m.local} max={720} />
            </div>
          </div>
        </section>
      )}
      <Accordion x={x} items={m.faqs} />
      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginBottom: 26 }}>More from here</h2></div>
          <Tiles x={x} items={[
            ...m.upLinks.map(l => ({ href: l.href, title: l.label })),
            ...m.otherAreas.slice(0, 6).map(a => ({ href: href.combo(service, a), title: a, lead: service.name + ' in' })),
          ]} />
        </div>
      </section>
      {m.noCopy && concept && (
        <section style={{ paddingBottom: sectionPad }}><div style={wrap}><ConceptNote T={T} minHeight={220} title={m.note.title}>{m.note.body}</ConceptNote></div></section>
      )}
      <Closing x={x} />
      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- About ----------------------------------------------------------------

export function CentreAbout({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const { C, F, T, wrap, mid, sectionPad, name, concept } = x
  const m = aboutModel(x)
  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow="About" title={name} />
      {m.image?.url && (
        <div style={{ maxWidth: 1400, margin: '0 auto clamp(36px, 4vw, 56px)', paddingInline: 'clamp(20px, 4vw, 44px)' }}>
          <img src={m.image.url} alt={m.image.alt || ''} style={{ width: '100%', height: 'clamp(240px, 34vw, 460px)', objectFit: 'cover', borderRadius: T.radius.lg, display: 'block' }} />
        </div>
      )}
      {m.facts.length > 0 && (
        <div style={{ background: C.inverseBgAlt, color: C.inverseText }}>
          <div style={wrap}>
            <div className="ctr-figures" style={{ ['--n']: Math.min(m.facts.length, 4), paddingBlock: 'clamp(26px, 3vw, 38px)' }}>
              {m.facts.slice(0, 4).map((f, i) => (
                <div key={i}>
                  <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(19px, 1.9vw, 24px)', lineHeight: 1.25 }}>{f.value}</b>
                  <span style={{ display: 'block', marginTop: 7, fontSize: 13.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: C.inverseTextDim }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {(m.story?.length > 0 || m.approach) && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            {Array.isArray(m.story) && m.story.length > 0 && (
              <div style={{ maxWidth: 860, margin: '0 auto', fontSize: 18.5, lineHeight: 1.78, color: C.text }}>
                {m.story.map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p}</p>)}
              </div>
            )}
            {m.approach && (
              <div style={{ marginTop: m.story?.length ? 'clamp(36px, 4vw, 56px)' : 0 }}>
                <div style={mid}><h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginBottom: 22 }}>How we work</h2></div>
                <Prose x={x} text={m.approach} />
              </div>
            )}
          </div>
        </section>
      )}
      {concept && !m.story?.length && !m.approach && (
        <section style={{ paddingBlock: sectionPad }}><div style={wrap}>
          <ConceptNote T={T} minHeight={240} title="Your story">Who started the business and why, how you work, and what you want people to know before they call.</ConceptNote>
        </div></section>
      )}
      <Closing x={x} />
      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- Contact --------------------------------------------------------------

export function CentreContact({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const { C, F, T, wrap, sectionPad, phone, phoneDisplay, concept, name } = x
  const m = contactModel(x)
  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow="Contact" title={`Talk to ${name}`}
        lede={phone ? 'Call and we will book a window with you, or send a message and we will come back to you.' : 'Send a message and we will come back to you.'} />
      <section style={{ paddingBottom: sectionPad }}>
        <div style={{ ...wrap, maxWidth: 1060 }}>
          <div className="ctr-cost">
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, padding: 'clamp(26px, 3vw, 44px)' }}>
              <ContactForm
                slug={siteSlug}
                concept={concept}
                colors={formColors(C, C.bg)}
                fonts={{ body: F.body, display: F.display }}
                radius={8}
                submitLabel="Send"
              />
            </div>
            <aside style={{ alignSelf: 'start' }}>
              {phone && (
                <a href={`tel:${phone}`} style={{ ...btnPrimary(x), width: '100%', marginBottom: 18 }}>Call {phoneDisplay}</a>
              )}
              {m.details.map(d => (
                <div key={d.k} style={{ padding: '14px 0', borderTop: `1px solid ${C.border}` }}>
                  <span style={{ display: 'block', fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: C.textMuted, marginBottom: 5 }}>{d.k}</span>
                  {d.href
                    ? <a href={d.href} style={{ color: C.text, fontSize: 17.5, textDecoration: 'none', borderBottom: `1px solid ${C.border}` }}>{d.v}</a>
                    : <span style={{ color: C.text, fontSize: 17.5, lineHeight: 1.5 }}>{d.v}</span>}
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>
      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- FAQ ------------------------------------------------------------------

export function CentreFAQ({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const { wrap, sectionPad, faqs, concept, T } = x
  const m = faqModel(x)
  return (
    <CentrePage x={x} schemas={m.schemas}>
      <Header x={x} crumbs={m.crumbs} eyebrow="FAQs" title={m.title} />
      {faqs.length > 0
        ? <Accordion x={x} items={faqs} heading="" />
        : concept && (
          <section style={{ paddingBlock: sectionPad }}><div style={wrap}>
            <ConceptNote T={T} minHeight={240} title="The questions customers ask you">The questions people ask before they book, answered in your words.</ConceptNote>
          </div></section>
        )}
      <Closing x={x} />
      <MobileBar x={x} />
    </CentrePage>
  )
}

// ---- Blog -----------------------------------------------------------------

function chrome(x) {
  return function Chrome({ children }) {
    return <CentrePage x={x}>{children}</CentrePage>
  }
}

export function CentreBlogIndex({ config: c, siteSlug, posts }) {
  const x = centreContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={chrome(x)} />
}

export function CentreBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = centreContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={chrome(x)} />
}
