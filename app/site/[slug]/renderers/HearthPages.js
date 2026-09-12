import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'
import HeroMedia from '../../../../lib/templates/shared/components/HeroMedia.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import {
  homeModel, serviceModel, areaModel, comboModel, aboutModel, contactModel,
  servicesIndexModel, areasIndexModel, faqModel, proofItems, pageFacts, formColors, listAreas,
} from './family/data.js'
import {
  hearthContext, HearthPage, PageHero, SectionHead, Prose, Steps, FaqList, Ticket, FactStrip, Ledger,
  ServiceIndex, Directory, areaItems, Framed, Seal, Note, textLink, btnPrimary, btnOutline,
} from './HearthKit.js'
import { PhoneIcon, Star } from './CrewChrome.js'
import { joinList } from '../../../../lib/templates/shared/claims.js'

// Hearth pages. What each page says comes from family/data.js (the same
// content every family renders); the layout here is Hearth's own. On a real
// site a section without data hides; on a concept it shows a labelled note.

// ---- Home ----------------------------------------------------------------------

export function HearthHome({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = homeModel(x)
  const { C, F, T, wrap, concept, href, services, areas, name, phone, phoneDisplay, second, sectionPad, eyebrow, year } = x
  const proof = proofItems(x)
  const rating = m.trust.find(t => t.kind === 'rating')
  const shown = services.slice(0, 12)
  const nearby = areas.filter(a => a !== m.place)
  const heroAreas = [m.place, ...nearby].filter(Boolean).slice(0, 4)
  const moreAreas = areas.length - heroAreas.length
  const media = m.hero || m.video

  return (
    <HearthPage x={x} current="home" schemas={m.schemas}>

      {/* HERO: what they do and where, on the paper ground; their own photo
          framed beside it with the founding-year seal. No text on the photo. */}
      <section data-hero="" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className={`h-hero${media || concept || proof.length ? '' : ' h-hero-solo'}`} style={{ ...wrap, paddingBlock: 'clamp(36px, 6vw, 80px)' }}>
          <div style={{ maxWidth: 720 }}>
            {name && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span aria-hidden="true" style={{ width: 28, height: 2, background: C.secondary, flex: 'none' }} />
                <span style={eyebrow(C.textDim)}>{name}</span>
              </div>
            )}
            <h1 style={{ ...x.h1, marginTop: 16 }}>{m.headline}</h1>
            {m.support && <p style={{ fontSize: 'clamp(18px, 1.7vw, 21px)', lineHeight: 1.55, color: C.textDim, margin: '20px 0 0', maxWidth: '46ch' }}>{m.support}</p>}
            <div className="h-btns" style={{ marginTop: 30 }}>
              {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call {phoneDisplay}</a>}
              <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnOutline(x)}>{second.label}</a>
            </div>
            {rating ? (
              <p style={{ margin: '22px 0 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px', fontSize: 16, color: C.textDim }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: F.display, fontWeight: 700, fontSize: 22, color: C.text }}>{rating.rating}<Star size={18} /></span>
                <span>{rating.count ? `${rating.count.toLocaleString('en-US')} ${x.statedOnTheirSite ? 'reviews' : 'Google reviews'}` : 'rating'}{x.statedOnTheirSite ? ' (from your current site)' : ''}</span>
              </p>
            ) : concept ? (
              <div style={{ marginTop: 22, display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, border: `1.5px dashed ${C.border}`, padding: '10px 14px', fontSize: 15, color: C.text }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textDim }}>Concept note</span>
                Your Google rating and review count go here.
              </div>
            ) : null}
            {heroAreas.length > 0 && (
              <p style={{ margin: '14px 0 0', fontSize: 15, color: C.textDim }}>
                Serving {moreAreas > 0 ? heroAreas.join(', ') : joinList(heroAreas)}
                {moreAreas > 0 && <> and <a href={href.areas} style={{ color: C.text, textUnderlineOffset: 3 }}>{moreAreas} more</a></>}
              </p>
            )}
          </div>

          {media ? (
            <div className="h-heroart" style={{ position: 'relative' }}>
              {m.video ? (
                <div style={{ position: 'relative', aspectRatio: '5 / 4', minHeight: 340, maxHeight: 620, overflow: 'hidden' }}><HeroMedia image={m.hero} video={m.video} /></div>
              ) : (
                <img src={m.hero.url} alt={m.hero.alt || ''} fetchPriority="high" loading="eager" decoding="async"
                  style={{ width: '100%', aspectRatio: '5 / 4', minHeight: 340, maxHeight: 620, objectFit: 'cover', display: 'block' }} />
              )}
              <Seal x={x} style={{ position: 'absolute', left: -34, bottom: 28 }} />
            </div>
          ) : concept ? (
            <Note x={x} minHeight={380} title="Your team photo goes here">
              The people who show up, the van, a job in progress. Framed like a print, beside your founding year.
            </Note>
          ) : proof.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
              <Seal x={x} />
            </div>
          ) : null}
        </div>
      </section>

      {/* PROOF LEDGER: the facts that make an established firm, in a ruled band. */}
      <Ledger
        x={x}
        items={proof.slice(0, 4)}
        note={concept && !proof.some(p => p.kind === 'rating') ? <Note x={x} title="Your rating">Google rating and review count, updated as reviews arrive.</Note> : null}
      />

      {/* SERVICES: a ruled index, quick to scan for the problem. */}
      {services.length > 0 && (
        <section id="services" style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow={x.offeringLabel}
              title="What we take care of"
              aside={services.length > shown.length ? <a href={href.services} style={textLink(x)}>All {services.length} {x.offeringLabel.toLowerCase()}</a> : null}
            />
            <ServiceIndex x={x} services={shown} hrefFor={s => href.service(s.slug)} />
          </div>
        </section>
      )}

      {/* PLANS AND PRICES: on a concept without them, what goes here. */}
      {concept && m.plans.length === 0 && (
        <section style={{ paddingBottom: sectionPad }}>
          <div style={wrap}>
            <Note x={x} title={c.industry_key === 'pest_control' ? 'Your plans and what each covers' : 'Your starting prices'}>
              {c.industry_key === 'pest_control'
                ? 'Your plan tiers, what each one covers, and a starting price, so people can choose before they call.'
                : 'Starting prices for your main services, and any fees you don’t charge, so people know what to expect before they call.'}
            </Note>
          </div>
        </section>
      )}

      {/* THE COMPANY: who they are, near the top, because that is Hearth's
          reason to exist. */}
      {(m.intro || m.secondary || concept) && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div className="h-story" style={wrap}>
            {m.secondary ? <div className="h-sticky"><Framed x={x} image={m.secondary} ratio="5 / 4" /></div> : concept ? (
              <Note x={x} minHeight={300} title="A photo of your team at work">Real people from your company, not a stock handshake.</Note>
            ) : <div />}
            <div>
              <SectionHead
                x={x}
                eyebrow={`About ${name}`}
                title={year && m.place ? `Serving ${m.place} since ${year}` : year ? `In business since ${year}` : `The people behind ${name}`}
              />
              {m.intro ? <Prose x={x} text={m.intro} /> : concept ? (
                <Note x={x} title="Your story, in a paragraph">Who started the company and when, and who does the work. Written from what you tell us.</Note>
              ) : null}
              {x.hasAbout && <p style={{ margin: '24px 0 0' }}><a href={href.about} style={textLink(x)}>More about {name}</a></p>}
            </div>
          </div>
        </section>
      )}

      {/* WHY US: reasons, each from their own copy. */}
      {m.whyUs.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow={`Why ${name}`} title="Why people choose us" />
            <div className="h-reasons">
              {m.whyUs.map((p, i) => (
                <div key={i} style={{ borderTop: `1px solid ${C.text}`, paddingBlock: '22px 30px' }}>
                  <h3 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 25, lineHeight: 1.15, margin: '0 0 10px' }}>{p.title}</h3>
                  <p style={{ margin: 0, color: C.textDim, fontSize: 17, lineHeight: 1.65, maxWidth: '56ch' }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS: the first one set large across a band in their own colour,
          the others underneath it. */}
      {m.reviews.length > 0 ? (
        <section style={{ paddingTop: sectionPad }}>
          <div className="h-bleed" style={{ background: x.livery, color: x.liveryText, paddingBlock: 'clamp(48px, 6vw, 88px)' }}>
            <div style={{ ...wrap, maxWidth: 1100 }}>
              <div style={{ ...eyebrow(x.liveryDim), marginBottom: 22 }}>Reviews</div>
              <figure style={{ margin: 0 }}>
                <blockquote style={{ margin: 0, fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 46px)', lineHeight: 1.22, letterSpacing: '-0.01em' }}>
                  “{m.reviews[0].text}”
                </blockquote>
                <figcaption style={{ marginTop: 22, fontSize: 16, color: x.liveryDim, fontWeight: 600 }}>{m.reviews[0].author}{m.reviews[0].date ? ` · ${m.reviews[0].date}` : ''}</figcaption>
              </figure>
            </div>
          </div>
          {m.reviews.length > 1 && (
            <div style={{ ...wrap, paddingTop: 'clamp(32px, 4vw, 56px)' }}>
              <div className="h-reasons">
                {m.reviews.slice(1).map((r, i) => <Review key={i} x={x} r={r} />)}
              </div>
            </div>
          )}
        </section>
      ) : concept ? (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Reviews" title="What customers say" />
            <Note x={x} title="Your latest Google reviews, automatically">
              Your three most recent reviews with their dates, pulled from Google and updated as new ones arrive. Never selected or written by us.
            </Note>
          </div>
        </section>
      ) : null}

      {/* AREAS: a directory, each linking to its page. */}
      {areas.length > 0 && (
        <section id="areas" style={{ paddingBlock: sectionPad, borderTop: `1px solid ${C.border}` }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" aside={<p style={{ margin: 0, color: C.textDim, maxWidth: '40ch' }}>Serving {listAreas(areas)}.</p>} />
            <Directory x={x} items={areaItems(x, areas)} />
          </div>
        </section>
      )}

      {/* FAQ: full width. */}
      {m.faqs.length > 0 && (
        <section id="faq" style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={{ ...wrap, maxWidth: 960 }}>
            <SectionHead x={x} eyebrow="Questions" title="Before you call" aside={x.faqs.length > m.faqs.length ? <a href={href.faq} style={textLink(x)}>All questions</a> : null} />
            <FaqList x={x} faqs={m.faqs} />
          </div>
        </section>
      )}
    </HearthPage>
  )
}

function Review({ x, r, big = false }) {
  const { C, F } = x
  const rating = Number(r.rating)
  const hasRating = Number.isFinite(rating) && rating > 0
  return (
    <figure style={{ margin: 0, padding: big ? 0 : '20px 0', borderBottom: big ? 'none' : `1px solid ${C.border}` }}>
      {big && <div aria-hidden="true" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 88, lineHeight: 0.6, color: C.secondary, height: 40 }}>“</div>}
      {hasRating && (
        <div role="img" aria-label={`${rating} out of 5 stars`} style={{ display: 'flex', gap: 2, color: C.text, marginBottom: 10 }}>
          {Array.from({ length: Math.min(5, Math.round(rating)) }).map((_, k) => <Star key={k} size={big ? 18 : 15} />)}
        </div>
      )}
      <blockquote style={{ margin: 0, fontFamily: big ? F.display : F.body, fontWeight: big ? 500 : 400, fontSize: big ? 'clamp(22px, 2.3vw, 28px)' : 17, lineHeight: big ? 1.4 : 1.6, color: C.text }}>{r.text}</blockquote>
      <figcaption style={{ marginTop: 14, fontSize: 15, color: C.textDim, fontWeight: 600 }}>{r.author}{r.date ? ` · ${r.date}` : ''}</figcaption>
    </figure>
  )
}

// ---- Inner pages -----------------------------------------------------------------

/** Body copy beside the ticket, or the facts alone when there is no copy. */
function DetailBody({ x, m, context, facts, links, children }) {
  const { wrap, sectionPad } = x
  if (!m.hasBody) return <FactStrip x={x} facts={facts} links={links} />
  return (
    <section style={{ paddingBlock: sectionPad }}>
      <div className="h-detail" style={wrap}>
        <div style={{ display: 'grid', gap: 56 }}>{children}</div>
        <Ticket x={x} context={context} facts={facts} links={links} />
      </div>
    </section>
  )
}

function Band({ x, alt = false, children }) {
  return (
    <section style={{ background: alt ? x.C.bgAlt : x.C.bg, paddingBlock: x.sectionPad, borderTop: alt ? 'none' : `1px solid ${x.C.border}` }}>
      <div style={x.wrap}>{children}</div>
    </section>
  )
}

export function HearthServices({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = servicesIndexModel(x)
  const { C, services, areas, href, phone, phoneDisplay } = x
  return (
    <HearthPage x={x} current="services" schemas={m.schemas}>
      <PageHero x={x} crumbs={m.crumbs} eyebrow={areas.length > 0 ? `Serving ${listAreas(areas)}` : null} title={m.title} />
      <Band x={x}>
        {services.length > 0 ? (
          <>
            <SectionHead x={x} eyebrow={x.offeringLabel} title="What we take care of" />
            <ServiceIndex x={x} services={services} hrefFor={s => href.service(s.slug)} />
          </>
        ) : (
          <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
            {phone ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> to talk through what you need.</> : <a href={href.contact} style={textLink(x)}>Get in touch</a>}
          </p>
        )}
      </Band>
      {areas.length > 0 && (
        <Band x={x} alt>
          <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" aside={<a href={href.areas} style={textLink(x)}>All service areas</a>} />
          <Directory x={x} items={areaItems(x, areas)} />
        </Band>
      )}
    </HearthPage>
  )
}

export function HearthServiceDetail({ config: c, siteSlug, service }) {
  const x = hearthContext(c, siteSlug)
  const m = serviceModel(x, service)
  const { areas, href, name } = x
  return (
    <HearthPage x={x} current="services" schemas={m.schemas}>
      <PageHero x={x} image={m.image} crumbs={m.crumbs} eyebrow={m.eyebrow} badge={m.badge} title={service.name} support={m.subhead} />
      <DetailBody x={x} m={m} context={service.name} facts={m.facts}>
        {m.noCopy ? (
          <div>
            <SectionHead x={x} eyebrow="Overview" title={`About ${service.name}`} small />
            <Note x={x} minHeight={240} title={m.note.title}>{m.note.body}</Note>
          </div>
        ) : (
          <>
            {m.intro && <div><SectionHead x={x} eyebrow="Overview" title={`About ${service.name}`} small /><Prose x={x} text={m.intro} /></div>}
            {(m.steps || m.stepsText) && <div><SectionHead x={x} eyebrow="How it works" title="What to expect" small />{m.steps ? <Steps x={x} steps={m.steps} /> : <Prose x={x} text={m.stepsText} />}</div>}
            {m.methods && <div><SectionHead x={x} eyebrow="Methods" title="Products and methods" small /><Prose x={x} text={m.methods} /></div>}
            {m.faqs.length > 0 && <div><SectionHead x={x} eyebrow="Questions" title={`${service.name} questions`} small /><FaqList x={x} faqs={m.faqs} open={m.faqs.length <= 3} /></div>}
          </>
        )}
      </DetailBody>
      {areas.length > 0 && (
        <Band x={x} alt>
          <SectionHead x={x} eyebrow={x.placeLabel} title={`${service.name} near you`} />
          <Directory x={x} items={areaItems(x, areas, a => href.combo(service, a), `${service.name} in`)} />
        </Band>
      )}
      {m.related.length > 0 && (
        <Band x={x}>
          <SectionHead x={x} eyebrow={`More from ${name}`} title={`Other ${x.offeringLabel.toLowerCase()}`} aside={<a href={href.services} style={textLink(x)}>All {x.offeringLabel.toLowerCase()}</a>} />
          <ServiceIndex x={x} services={m.related} hrefFor={s => href.service(s.slug)} />
        </Band>
      )}
    </HearthPage>
  )
}

export function HearthAreas({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = areasIndexModel(x)
  const { C, F, services, areas, href, tradeNoun, phone, phoneDisplay } = x
  const first = services.slice(0, 4)
  return (
    <HearthPage x={x} current="areas" schemas={m.schemas}>
      <PageHero x={x} crumbs={m.crumbs} eyebrow={x.placeLabel} title={m.title} support={areas.length > 0 ? `Serving ${joinList(areas)}.` : null} />
      <Band x={x}>
        {areas.length > 0 ? (
          <>
            <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `2px solid ${C.text}` }}>
              {areas.map(a => (
                <li key={a} className="h-arearow" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)', gap: '10px 32px', paddingBlock: 22, borderBottom: `1px solid ${C.border}` }}>
                  <a href={href.area(a)} style={{ color: C.text, textDecoration: 'none' }}>
                    <span style={{ display: 'block', fontFamily: F.display, fontWeight: 700, fontSize: 30, lineHeight: 1.1 }}>{a}</span>
                    <span style={{ display: 'block', fontSize: 15, color: C.textDim, marginTop: 4, textDecoration: 'underline', textUnderlineOffset: 4 }}>{tradeNoun} in {a}</span>
                  </a>
                  {first.length > 0 && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignContent: 'center', fontSize: 16 }}>
                      {first.map(s => <li key={s.slug}><a href={href.combo(s, a)} style={{ color: C.textDim, textDecorationColor: C.border, textUnderlineOffset: 4 }}>{s.name} in {a}</a></li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <style>{`@media (max-width: 720px) { .h-arearow { grid-template-columns: minmax(0, 1fr) !important; } }`}</style>
          </>
        ) : (
          <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
            {phone ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> to ask whether we cover your address.</> : <>Ask us whether we cover your address: <a href={href.contact} style={textLink(x)}>get in touch</a>.</>}
          </p>
        )}
      </Band>
    </HearthPage>
  )
}

export function HearthAreaDetail({ config: c, siteSlug, area }) {
  const x = hearthContext(c, siteSlug)
  const m = areaModel(x, area)
  const { services, href } = x
  return (
    <HearthPage x={x} current="areas" schemas={m.schemas}>
      <PageHero x={x} image={m.image} crumbs={m.crumbs} eyebrow="Service area" title={m.title} support={m.subhead} />
      <DetailBody x={x} m={m} context={`Serving ${area}`} facts={m.facts}>
        {m.noCopy ? (
          <div><SectionHead x={x} eyebrow="Overview" title={m.overviewTitle} small /><Note x={x} minHeight={240} title={m.note.title}>{m.note.body}</Note></div>
        ) : (
          <>
            {m.intro && <div><SectionHead x={x} eyebrow="Overview" title={m.overviewTitle} small /><Prose x={x} text={m.intro} /></div>}
            {m.local && <div><SectionHead x={x} eyebrow="Local knowledge" title={`Around ${area}`} small /><Prose x={x} text={m.local} /></div>}
            {m.faqs.length > 0 && <div><SectionHead x={x} eyebrow="Questions" title={`Questions from ${area}`} small /><FaqList x={x} faqs={m.faqs} open={m.faqs.length <= 3} /></div>}
          </>
        )}
      </DetailBody>
      {services.length > 0 && (
        <Band x={x} alt>
          <SectionHead x={x} eyebrow={area} title={`${x.offeringLabel} in ${area}`} />
          <ServiceIndex x={x} services={services} hrefFor={s => href.combo(s, area)} titleFor={s => `${s.name} in ${area}`} summary={false} />
        </Band>
      )}
      {m.otherAreas.length > 0 && (
        <Band x={x}>
          <SectionHead x={x} eyebrow={x.placeLabel} title="Other areas we serve" aside={<a href={href.areas} style={textLink(x)}>All service areas</a>} />
          <Directory x={x} items={areaItems(x, m.otherAreas)} />
        </Band>
      )}
    </HearthPage>
  )
}

export function HearthCombo({ config: c, siteSlug, service, area }) {
  const x = hearthContext(c, siteSlug)
  const m = comboModel(x, service, area)
  const { href, tradeNoun } = x
  return (
    <HearthPage x={x} current="services" schemas={m.schemas}>
      <PageHero x={x} image={m.image} crumbs={m.crumbs} eyebrow={area} badge={m.badge} title={m.title} support={m.subhead} />
      <DetailBody x={x} m={m} context={m.title} facts={m.facts} links={m.upLinks}>
        {m.noCopy ? (
          <div><SectionHead x={x} eyebrow="Overview" title={m.title} small /><Note x={x} minHeight={240} title={m.note.title}>{m.note.body}</Note></div>
        ) : (
          <>
            {m.intro && <div><SectionHead x={x} eyebrow="Overview" title={`${service.name} for ${area} homes`} small /><Prose x={x} text={m.intro} /></div>}
            {m.local && <div><SectionHead x={x} eyebrow="Local knowledge" title={`What’s different in ${area}`} small /><Prose x={x} text={m.local} /></div>}
            {m.faqs.length > 0 && <div><SectionHead x={x} eyebrow="Questions" title={`${service.name} in ${area}: questions`} small /><FaqList x={x} faqs={m.faqs} open={m.faqs.length <= 3} /></div>}
          </>
        )}
      </DetailBody>
      {m.otherAreas.length > 0 && (
        <Band x={x} alt>
          <SectionHead x={x} eyebrow={service.name} title={`${service.name} in nearby areas`} />
          <Directory x={x} items={areaItems(x, m.otherAreas, a => href.combo(service, a), `${service.name} in`)} />
        </Band>
      )}
      {m.otherServices.length > 0 && (
        <Band x={x}>
          <SectionHead x={x} eyebrow={area} title={`Other ${x.offeringLabel.toLowerCase()} in ${area}`} aside={<a href={href.area(area)} style={textLink(x)}>{tradeNoun} in {area}</a>} />
          <ServiceIndex x={x} services={m.otherServices} hrefFor={s => href.combo(s, area)} titleFor={s => `${s.name} in ${area}`} summary={false} />
        </Band>
      )}
    </HearthPage>
  )
}

export function HearthAbout({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = aboutModel(x)
  const { C, F, concept, services, areas, href, name, year } = x
  return (
    <HearthPage x={x} current="about" schemas={m.schemas}>
      <PageHero x={x} image={m.image} crumbs={m.crumbs} eyebrow="About us" title={`About ${name}`} showProof={false} />
      {m.facts.length > 0 && <Ledger x={x} items={m.facts} />}
      {(m.story || concept) && (
        <Band x={x}>
          <div className="h-story">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
              <SectionHead x={x} eyebrow={`About ${name}`} title="Our story" style={{ marginBottom: 0 }} />
              <Seal x={x} />
            </div>
            {m.story ? <Prose x={x} text={m.story} /> : (
              <Note x={x} minHeight={220} title="Your story, in your words">
                Who started the company and when, what you do and where, and the people who show up at the door. Written from what you tell us and checked by you before it goes live.
              </Note>
            )}
          </div>
        </Band>
      )}
      {(m.approach || concept) && (
        <Band x={x} alt>
          <div className="h-story">
            <SectionHead x={x} eyebrow="How we work" title="Our approach" style={{ marginBottom: 0 }} />
            {m.approach ? <Prose x={x} text={m.approach} /> : (
              <Note x={x} minHeight={200} title="How you do the job">How a visit goes from the first call to the follow-up, and what you do if a problem comes back.</Note>
            )}
          </div>
        </Band>
      )}
      {services.length > 0 && (
        <Band x={x}>
          <SectionHead x={x} eyebrow={x.offeringLabel} title="What we take care of" aside={<a href={href.services} style={textLink(x)}>All {x.offeringLabel.toLowerCase()}</a>} />
          <ServiceIndex x={x} services={services.slice(0, 6)} hrefFor={s => href.service(s.slug)} />
        </Band>
      )}
      {areas.length > 0 && (
        <Band x={x} alt>
          <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" />
          <Directory x={x} items={areaItems(x, areas)} />
        </Band>
      )}
    </HearthPage>
  )
}

export function HearthContact({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = contactModel(x)
  const { C, F, T, concept, name, phone, phoneDisplay, areas, eyebrow } = x
  return (
    <HearthPage x={x} current="contact" schemas={m.schemas} close={false}>
      <PageHero
        x={x}
        crumbs={m.crumbs}
        eyebrow="Contact"
        title={`Contact ${name}`}
        support={phone ? 'Call us, or tell us what you need below and we’ll get back to you.' : 'Tell us what you need below and we’ll get back to you.'}
        actions="none"
        showProof={false}
      />
      <Band x={x}>
        <div className="h-contact">
          <div>
            {phone && (
              <div style={{ paddingBottom: 28, borderBottom: `2px solid ${C.text}` }}>
                <div style={eyebrow(C.textDim)}>Phone</div>
                <a href={`tel:${phone}`} style={{ display: 'inline-block', marginTop: 8, fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(36px, 4.4vw, 52px)', lineHeight: 1, color: C.text, textDecoration: 'none' }}>{phoneDisplay}</a>
                <div style={{ marginTop: 18 }}><a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call now</a></div>
              </div>
            )}
            {m.details.length > 0 && (
              <dl style={{ margin: 0 }}>
                {m.details.map(dd => (
                  <div key={dd.k} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: 16, paddingBlock: 16, borderBottom: `1px solid ${C.border}` }}>
                    <dt style={{ ...eyebrow(C.textDim), paddingTop: 3 }}>{dd.k}</dt>
                    <dd style={{ margin: 0, fontSize: 18, fontWeight: 600, color: C.text, overflowWrap: 'anywhere' }}>{dd.href ? <a href={dd.href} style={{ color: C.text }}>{dd.v}</a> : dd.v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {areas.length > 0 && (
              <p style={{ margin: '22px 0 0', color: C.textDim }}>Serving {joinList(areas)}.</p>
            )}
          </div>
          <div id="quote" style={{ background: C.surface, border: `2px solid ${C.text}`, padding: 'clamp(24px, 4vw, 44px)' }}>
            <SectionHead x={x} eyebrow="Online" title="Request a visit" small style={{ marginBottom: 12 }} />
            <p style={{ margin: '0 0 28px', color: C.textDim, fontSize: 17 }}>Tell us what you need help with and where the property is.</p>
            <ContactForm slug={siteSlug} concept={concept} colors={formColors(C, C.bg)} fonts={T.fonts} radius={T.radius.md} submitLabel="Send request" />
          </div>
        </div>
      </Band>
    </HearthPage>
  )
}

export function HearthFAQ({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = faqModel(x)
  const { C, concept, faqs, href, name, phone, phoneDisplay } = x
  return (
    <HearthPage x={x} current="faq" schemas={m.schemas}>
      <PageHero x={x} crumbs={m.crumbs} eyebrow="Questions" title={m.title} showProof={false} />
      <section style={{ paddingBlock: x.sectionPad }}>
        <div className="h-detail" style={x.wrap}>
          <div>
            {faqs.length > 0 ? <FaqList x={x} faqs={faqs} open /> : concept ? (
              <Note x={x} minHeight={240} title="The questions customers ask you">The questions people ask before they book, answered in your words: how visits work, what to do beforehand, how you charge.</Note>
            ) : (
              <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: C.textDim, maxWidth: '48ch' }}>
                Have a question for {name}?{' '}
                {phone ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> or <a href={href.contact} style={textLink(x)}>send us a message</a>.</> : <a href={href.contact} style={textLink(x)}>Send us a message</a>}
              </p>
            )}
          </div>
          <Ticket x={x} context="Still have a question?" facts={pageFacts(x)} />
        </div>
      </section>
    </HearthPage>
  )
}

// ---- Blog ----------------------------------------------------------------------

function blogChrome(x) {
  return function Chrome({ children }) {
    return <HearthPage x={x} current="blog">{children}</HearthPage>
  }
}

export function HearthBlogIndex({ config: c, siteSlug, posts }) {
  const x = hearthContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={blogChrome(x)} />
}

export function HearthBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = hearthContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={blogChrome(x)} />
}
