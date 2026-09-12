import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'
import HeroMedia from '../../../../lib/templates/shared/components/HeroMedia.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import {
  homeModel, serviceModel, areaModel, comboModel, aboutModel, contactModel,
  servicesIndexModel, areasIndexModel, faqModel, proofItems, pageFacts, formColors, stepsFrom,
} from './family/data.js'
import {
  levelContext, LevelPage, Breadcrumbs, SectionHead, Prose, StepRail, Tiles, Chips, areaChips,
  FaqCards, QuoteBand, OnPage, Band, RatingCard, Picker, Note, textLink, btnPrimary, btnQuiet,
} from './LevelKit.js'
import { PhoneIcon, Star } from './CrewChrome.js'
import { joinList } from '../../../../lib/templates/shared/claims.js'

// Level pages. What each page says comes from family/data.js (the same content
// every family renders); the layout here is Level's own: a centred hero with
// the picker under it and the photo below, tiles, a step rail across the page,
// and a quote band between sections instead of a sidebar.

// ---- Home ------------------------------------------------------------------------

export function LevelHome({ config: c, siteSlug, process: proc = null }) {
  const x = levelContext(c, siteSlug)
  const m = homeModel(x)
  const { C, F, T, wrap, concept, href, services, areas, name, phone, phoneDisplay, second, sectionPad, eyebrow } = x
  const proof = proofItems(x)
  const rating = proof.find(p => p.kind === 'rating')
  const chips = proof.filter(p => p.kind !== 'rating').slice(0, 3)
  const media = m.hero || m.video

  // How a visit goes, in their own words: the steps written for one of their
  // services, named so it is never read as a general promise. Concepts carry
  // the copy for the service they were written for; client sites pass it in.
  const steps = proc?.steps || stepsFrom(c.generated?.['service_detail|what_to_expect'])
  const stepService = proc?.service || (concept ? services.find(s => s.slug === (c.generated_for?.service || services[0]?.slug)) : null)

  return (
    <LevelPage x={x} current="home" schemas={m.schemas}>

      {/* HERO: the heading centred, one tap to the service they came for, and
          their photo as a band under it. */}
      <section data-hero="" style={{ paddingBlock: 'clamp(40px, 6vw, 76px) clamp(28px, 4vw, 44px)' }}>
        <div className="lv-center" style={wrap}>
          {name && <div style={eyebrow(C.textDim)}>{name}</div>}
          <h1 style={{ ...x.h1, marginTop: 14, maxWidth: '17ch' }}>{m.headline}</h1>
          {m.support && <p style={{ fontSize: 'clamp(18px, 1.7vw, 21px)', lineHeight: 1.55, color: C.textDim, margin: '18px 0 0', maxWidth: '54ch' }}>{m.support}</p>}
          <div className="lv-btns" style={{ marginTop: 28, justifyContent: 'center' }}>
            {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call {phoneDisplay}</a>}
            <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnQuiet(x)}>{second.label}</a>
          </div>
          {(rating || chips.length > 0) && (
            <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 20px', justifyContent: 'center', fontSize: 16, color: C.textDim }}>
              {rating && (
                <li style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: C.text, fontWeight: 700 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{rating.value}<Star size={17} /></span>
                  <span style={{ fontWeight: 500, color: C.textDim }}>{rating.label}{x.statedOnTheirSite ? ' (from your current site)' : ''}</span>
                </li>
              )}
              {chips.map((p, i) => <li key={i} style={{ fontWeight: 600 }}>{p.kind === 'since' ? `${p.label} ${p.value}` : `${p.value} ${p.label}`}</li>)}
            </ul>
          )}
          {services.length > 0 && (
            <div style={{ marginTop: 'clamp(28px, 4vw, 40px)', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Picker x={x} services={services.slice(0, 6)} />
            </div>
          )}
          {services.length > 6 && (
            <p style={{ margin: '14px 0 0' }}><a href={href.services} style={textLink(x)}>All {services.length} {x.offeringLabel.toLowerCase()}</a></p>
          )}
        </div>
      </section>

      <section>
        <div style={wrap}>
          {media ? (
            m.video ? (
              <div style={{ position: 'relative', borderRadius: T.radius.lg, overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '21 / 9' }}><HeroMedia image={m.hero} video={m.video} /></div>
                <RatingCard x={x} />
              </div>
            ) : (
              <Band x={x} image={m.hero} priority><RatingCard x={x} /></Band>
            )
          ) : concept ? (
            <Note x={x} minHeight={220} title="Your photo goes here, full width">
              Your crew, your van, a job finished. One wide photo under the heading, with your rating on a card over the corner.
            </Note>
          ) : null}
        </div>
      </section>

      {/* HOW IT WORKS: their own steps, attributed to the service they describe. */}
      {steps ? (
        <section id="how" style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="How it works" title={stepService ? `How a ${stepService.name.toLowerCase()} visit goes` : 'How it works'} />
            <StepRail x={x} steps={steps} />
          </div>
        </section>
      ) : concept ? (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="How it works" title="How a visit goes" />
            <Note x={x} title="Your three steps">What happens from the first call to the end of the visit, in your words. Written for each of your services and shown here.</Note>
          </div>
        </section>
      ) : null}

      {/* SERVICES: mixed-size tiles. */}
      {services.length > 0 && (
        <section id="services" style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow={x.offeringLabel}
              title="What we do"
              aside={services.length > 7 ? <a href={href.services} style={textLink(x)}>All {services.length} {x.offeringLabel.toLowerCase()}</a> : null}
            />
            <Tiles x={x} services={services.slice(0, 7)} hrefFor={s => href.service(s.slug)} />
          </div>
        </section>
      )}

      {/* PRICES: their plans, or on a concept what goes here. */}
      {m.plans.length > 0 ? (
        <section id="prices" style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Pricing" title="Plans" />
            <div className="lv-plans">
              {m.plans.map((p, i) => (
                <div key={i} style={{ ...x.card, padding: 'clamp(22px, 2.6vw, 30px)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h3 style={{ ...x.h3, fontSize: 22 }}>{p.name}</h3>
                  {p.price && <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 30, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{p.price}</div>}
                  {p.description && <p style={{ margin: 0, color: C.textDim, fontSize: 16.5 }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : concept ? (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Pricing" title="What it costs" />
            <Note x={x} title="Your starting prices">Starting prices for your main services, or your plan tiers, so people can see what to expect before they call.</Note>
          </div>
        </section>
      ) : null}

      {/* REVIEWS: the rating beside what people said. */}
      {m.reviews.length > 0 ? (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Reviews" title="What customers say" />
            <div className="lv-reviews">
              {rating ? (
                <div style={{ background: C.accentGlow, borderRadius: T.radius.lg, padding: 'clamp(24px, 3vw, 34px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                  <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(44px, 5vw, 64px)', lineHeight: 1, letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', gap: 8 }}>{rating.value}<Star size={34} /></div>
                  <div style={{ color: C.textDim, fontSize: 17 }}>{rating.label}</div>
                </div>
              ) : <div />}
              <div className="lv-revcards">
                {m.reviews.map((r, i) => {
                  const stars = Number(r.rating)
                  return (
                    <figure key={i} style={{ ...x.card, margin: 0, padding: 'clamp(20px, 2.2vw, 26px)' }}>
                      {Number.isFinite(stars) && stars > 0 && (
                        <div role="img" aria-label={`${stars} out of 5 stars`} style={{ display: 'flex', gap: 2, color: C.accent, marginBottom: 10 }}>
                          {Array.from({ length: Math.min(5, Math.round(stars)) }).map((_, k) => <Star key={k} size={15} />)}
                        </div>
                      )}
                      <blockquote style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6 }}>{r.text}</blockquote>
                      <figcaption style={{ marginTop: 12, fontSize: 15, color: C.textDim }}>{r.author}{r.date ? ` · ${r.date}` : ''}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      ) : concept ? (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Reviews" title="What customers say" />
            <Note x={x} title="Your latest Google reviews, automatically">Your three most recent reviews with their dates, pulled from Google and updated as new ones arrive. Never selected or written by us.</Note>
          </div>
        </section>
      ) : null}

      {/* AREAS */}
      {areas.length > 0 && (
        <section id="areas" style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" aside={<a href={href.areas} style={textLink(x)}>All {x.placeLabel.toLowerCase()}</a>} />
            <Chips x={x} items={areaChips(x, areas)} />
          </div>
        </section>
      )}

      {/* FAQ: answers in the open. */}
      {m.faqs.length > 0 && (
        <section id="faq" style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Questions" title="Good to know" aside={x.faqs.length > m.faqs.length ? <a href={href.faq} style={textLink(x)}>All questions</a> : null} />
            <FaqCards x={x} faqs={m.faqs.slice(0, 4)} />
          </div>
        </section>
      )}
    </LevelPage>
  )
}

// ---- Inner pages -------------------------------------------------------------------

/** The header of an inner page: heading, then the photo as a band under it. */
function PageHead({ x, crumbs, eyebrow: text, title, support, badge, image, actions = true, showProof = true }) {
  const { C, T, wrap, eyebrow, phone, phoneDisplay, second } = x
  const proof = showProof ? proofItems(x).slice(0, 3) : []
  return (
    <section data-hero="" style={{ paddingBlock: 'clamp(28px, 4vw, 48px) clamp(24px, 3vw, 36px)' }}>
      <div style={wrap}>
        {crumbs && <Breadcrumbs x={x} crumbs={crumbs} />}
        <div style={{ marginTop: crumbs ? 'clamp(20px, 3vw, 32px)' : 0, maxWidth: 820 }}>
          {(text || badge) && (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              {text && <span style={eyebrow(C.textDim)}>{text}</span>}
              {badge && <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: T.radius.full, background: C.accentGlow, color: C.text }}>{badge}</span>}
            </div>
          )}
          <h1 style={{ ...x.h1, fontSize: 'clamp(34px, 4.6vw, 56px)', marginTop: 12 }}>{title}</h1>
          {support && <p style={{ fontSize: 'clamp(18px, 1.6vw, 20px)', lineHeight: 1.55, color: C.textDim, margin: '16px 0 0', maxWidth: '54ch' }}>{support}</p>}
          {actions && (
            <div className="lv-btns" style={{ marginTop: 24 }}>
              {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call {phoneDisplay}</a>}
              <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnQuiet(x)}>{second.label}</a>
            </div>
          )}
          {proof.length > 0 && (
            <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '6px 20px', fontSize: 15.5, fontWeight: 600, color: C.textDim }}>
              {proof.map((p, i) => <li key={i}>{p.kind === 'rating' ? `${p.value} ★ · ${p.label}` : p.kind === 'since' ? `${p.label} ${p.value}` : `${p.value} ${p.label}`}</li>)}
            </ul>
          )}
        </div>
        {image && <div style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}><Band x={x} image={image} ratio="21 / 9" priority /></div>}
      </div>
    </section>
  )
}

/** Copy with the "on this page" rail beside it. */
function Body({ x, sections }) {
  const shown = sections.filter(Boolean)
  if (shown.length === 0) return null
  return (
    <section style={{ paddingBlock: 'clamp(24px, 3vw, 40px)' }}>
      <div className="lv-body" style={x.wrap}>
        <OnPage x={x} sections={shown} />
        <div style={{ display: 'grid', gap: 48 }}>
          {shown.map(s => (
            <div key={s.id} id={s.id} style={{ scrollMarginTop: (x.c.chrome_offset || 0) + 90 }}>
              <SectionHead x={x} eyebrow={s.eyebrow} title={s.title} small />
              {s.body}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Wide({ x, alt = false, children }) {
  return (
    <section style={{ background: alt ? x.C.bgAlt : x.C.bg, paddingBlock: x.sectionPad }}>
      <div style={x.wrap}>{children}</div>
    </section>
  )
}

export function LevelServices({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = servicesIndexModel(x)
  const { C, services, areas, href, phone, phoneDisplay } = x
  return (
    <LevelPage x={x} current="services" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={areas.length > 0 ? `Serving ${joinList(areas.slice(0, 3))}${areas.length > 3 ? ' and nearby' : ''}` : null} title={m.title} />
      <Wide x={x}>
        {services.length > 0 ? (
          <Tiles x={x} services={services} hrefFor={s => href.service(s.slug)} />
        ) : (
          <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
            {phone ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> to talk through what you need.</> : <a href={href.contact} style={textLink(x)}>Get in touch</a>}
          </p>
        )}
      </Wide>
      <QuoteBand x={x} facts={pageFacts(x)} />
      {areas.length > 0 && (
        <Wide x={x} alt>
          <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" aside={<a href={href.areas} style={textLink(x)}>All {x.placeLabel.toLowerCase()}</a>} />
          <Chips x={x} items={areaChips(x, areas)} />
        </Wide>
      )}
    </LevelPage>
  )
}

export function LevelServiceDetail({ config: c, siteSlug, service }) {
  const x = levelContext(c, siteSlug)
  const m = serviceModel(x, service)
  const { C, areas, href, name } = x
  const sections = [
    m.noCopy && { id: 'about', eyebrow: 'Overview', title: `About ${service.name}`, body: <Note x={x} minHeight={220} title={m.note.title}>{m.note.body}</Note>, label: 'Overview' },
    m.intro && { id: 'about', eyebrow: 'Overview', title: `About ${service.name}`, body: <Prose x={x} text={m.intro} />, label: 'Overview' },
    (m.steps || m.stepsText) && { id: 'how', eyebrow: 'How it works', title: 'What to expect', body: m.steps ? <StepRail x={x} steps={m.steps} /> : <Prose x={x} text={m.stepsText} />, label: 'What to expect' },
    m.methods && { id: 'methods', eyebrow: 'Methods', title: 'Products and methods', body: <Prose x={x} text={m.methods} />, label: 'Products and methods' },
    m.faqs.length > 0 && { id: 'faq', eyebrow: 'Questions', title: `${service.name} questions`, body: <FaqCards x={x} faqs={m.faqs} />, label: 'Questions' },
  ]
  return (
    <LevelPage x={x} current="services" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={m.eyebrow} badge={m.badge} title={service.name} support={m.subhead} image={m.image} />
      <Body x={x} sections={sections} />
      <QuoteBand x={x} context={service.name} facts={m.facts} />
      {areas.length > 0 && (
        <Wide x={x} alt>
          <SectionHead x={x} eyebrow={x.placeLabel} title={`${service.name} near you`} />
          <Chips x={x} items={areaChips(x, areas, a => href.combo(service, a), `${service.name} in `)} />
        </Wide>
      )}
      {m.related.length > 0 && (
        <Wide x={x}>
          <SectionHead x={x} eyebrow={`More from ${name}`} title={`Other ${x.offeringLabel.toLowerCase()}`} aside={<a href={href.services} style={textLink(x)}>All {x.offeringLabel.toLowerCase()}</a>} />
          <Tiles x={x} services={m.related} hrefFor={s => href.service(s.slug)} flat />
        </Wide>
      )}
    </LevelPage>
  )
}

export function LevelAreas({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = areasIndexModel(x)
  const { C, F, T, services, areas, href, tradeNoun, phone, phoneDisplay } = x
  return (
    <LevelPage x={x} current="areas" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={x.placeLabel} title={m.title} support={areas.length > 0 ? `Serving ${joinList(areas)}.` : null} />
      <Wide x={x}>
        {areas.length > 0 ? (
          <div className="lv-bento lv-bento-flat">
            {areas.map(a => (
              <div key={a} style={{ ...x.card, padding: 'clamp(20px, 2.4vw, 26px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={href.area(a)} style={{ color: C.text, textDecoration: 'none' }}>
                  <h2 style={{ ...x.h3, fontSize: 24 }}>{a}</h2>
                  <span style={{ display: 'block', marginTop: 4, fontSize: 15.5, color: C.text, fontWeight: 700 }}>{tradeNoun} in {a} →</span>
                </a>
                {services.length > 0 && (
                  <ul style={{ listStyle: 'none', margin: 0, padding: '12px 0 0', borderTop: `1px solid ${C.borderLight}`, display: 'grid', gap: 7, fontSize: 15.5 }}>
                    {services.slice(0, 4).map(s => <li key={s.slug}><a href={href.combo(s, a)} style={{ color: C.textDim, textDecorationColor: C.border, textUnderlineOffset: 3 }}>{s.name} in {a}</a></li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
            {phone ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> to ask whether we cover your address.</> : <>Ask whether we cover your address: <a href={href.contact} style={textLink(x)}>get in touch</a>.</>}
          </p>
        )}
      </Wide>
      <QuoteBand x={x} facts={pageFacts(x)} />
    </LevelPage>
  )
}

export function LevelAreaDetail({ config: c, siteSlug, area }) {
  const x = levelContext(c, siteSlug)
  const m = areaModel(x, area)
  const { services, areas, href } = x
  const sections = [
    m.noCopy && { id: 'about', eyebrow: 'Overview', title: m.overviewTitle, body: <Note x={x} minHeight={220} title={m.note.title}>{m.note.body}</Note>, label: 'Overview' },
    m.intro && { id: 'about', eyebrow: 'Overview', title: m.overviewTitle, body: <Prose x={x} text={m.intro} />, label: 'Overview' },
    m.local && { id: 'local', eyebrow: 'Local knowledge', title: `Around ${area}`, body: <Prose x={x} text={m.local} />, label: `Around ${area}` },
    m.faqs.length > 0 && { id: 'faq', eyebrow: 'Questions', title: `Questions from ${area}`, body: <FaqCards x={x} faqs={m.faqs} />, label: 'Questions' },
  ]
  return (
    <LevelPage x={x} current="areas" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow="Service area" title={m.title} support={m.subhead} image={m.image} />
      <Body x={x} sections={sections} />
      <QuoteBand x={x} context={`Serving ${area}`} facts={m.facts} />
      {services.length > 0 && (
        <Wide x={x} alt>
          <SectionHead x={x} eyebrow={area} title={`${x.offeringLabel} in ${area}`} />
          <Tiles x={x} services={services} hrefFor={s => href.combo(s, area)} titleFor={s => `${s.name} in ${area}`} summary={false} flat />
        </Wide>
      )}
      {m.otherAreas.length > 0 && (
        <Wide x={x}>
          <SectionHead x={x} eyebrow={x.placeLabel} title="Other areas we serve" aside={<a href={href.areas} style={textLink(x)}>All {x.placeLabel.toLowerCase()}</a>} />
          <Chips x={x} items={areaChips(x, m.otherAreas)} />
        </Wide>
      )}
    </LevelPage>
  )
}

export function LevelCombo({ config: c, siteSlug, service, area }) {
  const x = levelContext(c, siteSlug)
  const m = comboModel(x, service, area)
  const { href, tradeNoun } = x
  const sections = [
    m.noCopy && { id: 'about', eyebrow: 'Overview', title: m.title, body: <Note x={x} minHeight={220} title={m.note.title}>{m.note.body}</Note>, label: 'Overview' },
    m.intro && { id: 'about', eyebrow: 'Overview', title: `${service.name} for ${area} homes`, body: <Prose x={x} text={m.intro} />, label: 'Overview' },
    m.local && { id: 'local', eyebrow: 'Local knowledge', title: `What’s different in ${area}`, body: <Prose x={x} text={m.local} />, label: `In ${area}` },
    m.faqs.length > 0 && { id: 'faq', eyebrow: 'Questions', title: `${service.name} in ${area}: questions`, body: <FaqCards x={x} faqs={m.faqs} />, label: 'Questions' },
  ]
  return (
    <LevelPage x={x} current="services" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow={area} badge={m.badge} title={m.title} support={m.subhead} image={m.image} />
      <Body x={x} sections={sections} />
      <QuoteBand x={x} context={m.title} facts={m.facts} links={m.upLinks} />
      {m.otherAreas.length > 0 && (
        <Wide x={x} alt>
          <SectionHead x={x} eyebrow={service.name} title={`${service.name} in nearby areas`} />
          <Chips x={x} items={areaChips(x, m.otherAreas, a => href.combo(service, a), `${service.name} in `)} />
        </Wide>
      )}
      {m.otherServices.length > 0 && (
        <Wide x={x}>
          <SectionHead x={x} eyebrow={area} title={`Other ${x.offeringLabel.toLowerCase()} in ${area}`} aside={<a href={href.area(area)} style={textLink(x)}>{tradeNoun} in {area}</a>} />
          <Tiles x={x} services={m.otherServices} hrefFor={s => href.combo(s, area)} titleFor={s => `${s.name} in ${area}`} summary={false} flat />
        </Wide>
      )}
    </LevelPage>
  )
}

export function LevelAbout({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = aboutModel(x)
  const { C, F, T, concept, services, areas, href, name } = x
  const sections = [
    (m.story || concept) && { id: 'story', eyebrow: `About ${name}`, title: 'Our story', label: 'Our story', body: m.story ? <Prose x={x} text={m.story} /> : <Note x={x} minHeight={200} title="Your story, in your words">Who started the company and when, what you do and where, and the people who show up at the door. Written from what you tell us and checked by you before it goes live.</Note> },
    (m.approach || concept) && { id: 'approach', eyebrow: 'How we work', title: 'Our approach', label: 'Our approach', body: m.approach ? <Prose x={x} text={m.approach} /> : <Note x={x} minHeight={180} title="How you do the job">How a visit goes from the first call to the follow-up, and what you do if a problem comes back.</Note> },
  ]
  return (
    <LevelPage x={x} current="about" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow="About us" title={`About ${name}`} image={m.image} showProof={false} />
      {m.facts.length > 0 && (
        <section style={{ paddingBottom: 'clamp(12px, 2vw, 24px)' }}>
          <div style={x.wrap}>
            <div className="lv-rail" style={{ '--n': Math.min(4, m.facts.length) }}>
              {m.facts.slice(0, 4).map((f, i) => (
                <div key={i} style={{ ...x.card, padding: '20px 22px' }}>
                  <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.03em', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{f.value}</div>
                  <div style={{ fontSize: 15.5, color: C.textDim, marginTop: 6 }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Body x={x} sections={sections} />
      <QuoteBand x={x} facts={pageFacts(x)} />
      {services.length > 0 && (
        <Wide x={x} alt>
          <SectionHead x={x} eyebrow={x.offeringLabel} title="What we do" aside={<a href={href.services} style={textLink(x)}>All {x.offeringLabel.toLowerCase()}</a>} />
          <Tiles x={x} services={services.slice(0, 6)} hrefFor={s => href.service(s.slug)} flat />
        </Wide>
      )}
      {areas.length > 0 && (
        <Wide x={x}>
          <SectionHead x={x} eyebrow={x.placeLabel} title="Where we work" />
          <Chips x={x} items={areaChips(x, areas)} />
        </Wide>
      )}
    </LevelPage>
  )
}

export function LevelContact({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = contactModel(x)
  const { C, F, T, concept, name, phone, phoneDisplay, areas, eyebrow } = x
  return (
    <LevelPage x={x} current="contact" schemas={m.schemas}>
      <PageHead
        x={x}
        crumbs={m.crumbs}
        eyebrow="Contact"
        title={`Contact ${name}`}
        support={phone ? 'Call us, or tell us what you need below and we’ll get back to you.' : 'Tell us what you need below and we’ll get back to you.'}
        actions={false}
        showProof={false}
      />
      <Wide x={x}>
        <div className="lv-reviews" style={{ alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            {phone && (
              <div style={{ ...x.card, padding: 'clamp(22px, 2.6vw, 30px)' }}>
                <div style={eyebrow(C.textDim)}>Phone</div>
                <a href={`tel:${phone}`} style={{ display: 'inline-block', marginTop: 8, fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 40px)', letterSpacing: '-0.035em', lineHeight: 1.1, color: C.text, textDecoration: 'none' }}>{phoneDisplay}</a>
                <div style={{ marginTop: 16 }}><a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call now</a></div>
              </div>
            )}
            {m.details.length > 0 && (
              <dl style={{ ...x.card, margin: 0, padding: 'clamp(20px, 2.4vw, 26px)', display: 'grid', gap: 14 }}>
                {m.details.map(d => (
                  <div key={d.k}>
                    <dt style={eyebrow(C.textDim)}>{d.k}</dt>
                    <dd style={{ margin: '5px 0 0', fontSize: 17.5, fontWeight: 600, overflowWrap: 'anywhere' }}>{d.href ? <a href={d.href} style={{ color: C.text }}>{d.v}</a> : d.v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {areas.length > 0 && <p style={{ margin: 0, color: C.textDim }}>Serving {joinList(areas)}.</p>}
          </div>
          <div id="quote" style={{ ...x.card, padding: 'clamp(24px, 3.4vw, 40px)' }}>
            <SectionHead x={x} eyebrow="Online" title="Ask for a quote" small style={{ marginBottom: 10 }} />
            <p style={{ margin: '0 0 24px', color: C.textDim, fontSize: 17 }}>Tell us what you need help with and where the property is.</p>
            <ContactForm slug={siteSlug} concept={concept} colors={formColors(C, C.bg)} fonts={x.T.fonts} radius={T.radius.md} submitLabel="Send request" />
          </div>
        </div>
      </Wide>
    </LevelPage>
  )
}

export function LevelFAQ({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = faqModel(x)
  const { C, concept, faqs, href, name, phone, phoneDisplay } = x
  return (
    <LevelPage x={x} current="faq" schemas={m.schemas}>
      <PageHead x={x} crumbs={m.crumbs} eyebrow="Questions" title={m.title} showProof={false} />
      <Wide x={x}>
        {faqs.length > 0 ? <FaqCards x={x} faqs={faqs} /> : concept ? (
          <Note x={x} minHeight={220} title="The questions customers ask you">The questions people ask before they book, answered in your words: how visits work, what to do beforehand, how you charge.</Note>
        ) : (
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: C.textDim, maxWidth: '48ch' }}>
            Have a question for {name}?{' '}
            {phone ? <>Call <a href={`tel:${phone}`} style={textLink(x)}>{phoneDisplay}</a> or <a href={href.contact} style={textLink(x)}>send us a message</a>.</> : <a href={href.contact} style={textLink(x)}>Send us a message</a>}
          </p>
        )}
      </Wide>
      <QuoteBand x={x} facts={pageFacts(x)} />
    </LevelPage>
  )
}

// ---- Blog --------------------------------------------------------------------------

function blogChrome(x) {
  return function Chrome({ children }) {
    return <LevelPage x={x} current="blog">{children}</LevelPage>
  }
}

export function LevelBlogIndex({ config: c, siteSlug, posts }) {
  const x = levelContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={blogChrome(x)} />
}

export function LevelBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = levelContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={blogChrome(x)} />
}
