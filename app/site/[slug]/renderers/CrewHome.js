import { buildLocalBusinessSchema } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { crewContext, crewProof, schemaConfig, CrewPage, ServiceCard, AreaChips, PhoneIcon, Star, listAreas, TRADE_NOUN } from './CrewChrome.js'
import HeroMedia from '../../../../lib/templates/shared/components/HeroMedia.js'

// CREW home page. Section order and the reasoning behind each one are in the
// trades family brief; CREW tokens carry the design principles. The utility
// bar, header, final call band, footer and phone bar are shared with every
// CREW page (CrewChrome.js).
//
// Every section renders from real data. On a concept, a section whose content
// the prospect hasn't given us shows a labelled ConceptNote; on a real site it
// hides. Nothing is invented: no ratings, credentials, prices or urgency that
// aren't in the data.

function parseJson(raw) {
  if (!raw) return null
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(String(raw).replace(/```json/gi, '').replace(/```/g, '').trim()) } catch { return null }
}

export default function CrewHome({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const { T, C, F, concept, href, biz, pos, services, areas, primaryArea, phone, phoneDisplay, name, wrap, eyebrow, h2, btn, quoteHref } = x
  const gen = c.generated || {}
  const imgs = x.imgs

  // ---- Hero headline -------------------------------------------------------
  // An outcome headline of 8 words or fewer, never the business name. Order:
  // the generated H1, their own short tagline, then a plain statement of what
  // they do and where, which is always true.
  const ownTagline = pos.own_tagline || null
  const tradeNoun = TRADE_NOUN[c.industry_key] || null
  const fallbackHeadline = tradeNoun && primaryArea
    ? `${tradeNoun} in ${primaryArea}`
    : (services[0]?.name && primaryArea ? `${services[0].name} in ${primaryArea}` : (tradeNoun || name))
  const headline = pos.headline
    || (ownTagline && ownTagline.length <= 60 ? ownTagline : null)
    || fallbackHeadline
  const support = gen['home|hero_subheadline'] || (pos.tagline && pos.tagline !== headline && !pos.tagline.includes(' — ') ? pos.tagline : null)

  // ---- Proof -----------------------------------------------------------------
  // Only facts in the data. On a concept, a rating comes from their current
  // site and says so.
  const { proof, statedOnTheirSite } = crewProof(x)

  // ---- Services --------------------------------------------------------------
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const grouped = services.length > 6 && categories.length > 1
  const shown = services.slice(0, 12)

  // ---- Generated sections ----------------------------------------------------
  const whyUs = (parseJson(gen['home|why_us']) || []).filter(p => p?.title && p?.description).slice(0, 4)
  const faqs = (parseJson(gen['faq|questions']) || c.faq || [])
    .map(q => ({ q: q.question || q.q, a: q.answer || q.a }))
    .filter(q => q.q && q.a)
    .slice(0, 6)
  const reviews = c.reviews || {}
  const featuredReviews = (reviews.featured || []).filter(r => r?.text).slice(0, 3)
  const hasPlans = Array.isArray(c.plans) && c.plans.length > 0

  // The business's own video, when they have one, plays behind the headline.
  const video = imgs.home_video?.url ? imgs.home_video : null
  const hero = imgs.home_hero || (video ? { url: video.poster || null, alt: '' } : null)
  const secondary = imgs.home_secondary

  return (
    <CrewPage x={x} current="home" schemas={[buildLocalBusinessSchema(schemaConfig(c))]}>

        {/* HERO: what they do, where, why trust them, how to get them out */}
        <span id="top" />
        {hero ? (
          <section style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(520px, 74vh, 760px)', display: 'flex', alignItems: 'flex-end' }}>
            <HeroMedia image={hero.url ? hero : null} video={video} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${C.overlayStrong} 0%, ${C.overlayStrong} 30%, ${C.overlayLight} 78%), linear-gradient(0deg, ${C.overlayStrong} 0%, ${C.overlayFaint} 55%)` }} />
            <div data-on-image="" style={{ '--on-image': C.textOnImage, '--on-image-dim': C.textOnImageDim, color: C.textOnImage, position: 'relative', width: '100%' }}>
              <div style={{ ...wrap, paddingBlock: 'clamp(56px, 9vw, 104px) clamp(40px, 6vw, 72px)' }}>
                <HeroCopy {...{ T, C, F, btn, eyebrow, headline, support, primaryArea, phone, phoneDisplay, quoteHref, proof, onImage: true, statedOnTheirSite }} />
              </div>
            </div>
          </section>
        ) : (
          <section style={{ background: C.inverseBg, color: C.inverseText }}>
            <div style={{ ...wrap, paddingBlock: 'clamp(56px, 9vw, 104px)', display: 'grid', gridTemplateColumns: concept ? 'minmax(0, 7fr) minmax(0, 5fr)' : '1fr', gap: 40, alignItems: 'center' }} className={concept ? 'crew-split' : ''}>
              <div>
                <HeroCopy {...{ T, C, F, btn, eyebrow, headline, support, primaryArea, phone, phoneDisplay, quoteHref, proof, onImage: false, statedOnTheirSite }} />
              </div>
              {concept && (
                <ConceptNote T={T} inverse minHeight={320} title="Your crew photo goes here">
                  Your team, your trucks, a job in progress: a real photo of the people who show up, not stock photography.
                </ConceptNote>
              )}
            </div>
          </section>
        )}

        {/* PROOF STRIP: numbers and credentials, not adjectives. The hero already
            carries the first facts, so the strip appears when there are more
            than it can hold, rather than repeating them. */}
        {proof.length >= 3 ? (
          <section style={{ background: C.surface, borderBottom: `1px solid ${C.borderLight}` }}>
            <div className="crew-proof" style={{ ...wrap, '--n': proof.length, paddingBlock: 28 }}>
              {proof.map((p, i) => (
                <div key={i} style={{ padding: '6px 24px', borderLeft: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 40, lineHeight: 1, textTransform: 'uppercase', color: C.text }}>{p.value}</div>
                  <div style={{ fontSize: 15, color: C.textDim, marginTop: 6 }}>{p.label}</div>
                </div>
              ))}
            </div>
            {statedOnTheirSite && (
              <div style={{ ...wrap, paddingBottom: 16, fontSize: 13, color: C.textMuted }}>Rating as shown on your current website. On your new site it updates live from Google.</div>
            )}
          </section>
        ) : concept && proof.length === 0 ? (
          <section style={{ background: C.surface, borderBottom: `1px solid ${C.borderLight}` }}>
            <div style={{ ...wrap, paddingBlock: 28 }}>
              <ConceptNote T={T} title="Your proof, next to the call button">
                Your Google rating and review count, years in business, licence number and guarantee sit here, next to the call button.
              </ConceptNote>
            </div>
          </section>
        ) : null}

        {/* SERVICES: find the problem in seconds */}
        <section id="services" style={{ paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
              <div>
                <div style={eyebrow(C.textMuted)}>Services</div>
                <h2 style={{ ...h2, marginTop: 12 }}>What we take care of</h2>
              </div>
              {services.length > shown.length && (
                <a href={href.services} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>All {services.length} services</a>
              )}
            </div>
            {grouped ? categories.map(cat => (
              <div key={cat} style={{ marginBottom: 44 }}>
                <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, textTransform: 'uppercase', margin: '0 0 16px', color: C.textDim }}>{cat}</h3>
                <div className="crew-services">
                  {shown.filter(s => s.category === cat).map(s => <ServiceCard key={s.slug} x={x} s={s} href={href.service(s.slug)} />)}
                </div>
              </div>
            )) : (
              <div className="crew-services">
                {shown.map(s => <ServiceCard key={s.slug} x={x} s={s} href={href.service(s.slug)} />)}
              </div>
            )}
          </div>
        </section>

        {/* PLANS AND PRICES: what will this cost, before they call */}
        {concept && !hasPlans && (
          <section style={{ background: C.bgAlt, paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
            <div className="crew-split" style={wrap}>
              <div>
                <div style={eyebrow(C.textMuted)}>Plans and pricing</div>
                <h2 style={{ ...h2, marginTop: 12 }}>{c.industry_key === 'pest_control' ? 'Year-round protection plans' : 'Straightforward pricing'}</h2>
              </div>
              <ConceptNote T={T} title={c.industry_key === 'pest_control' ? 'Your plans and what each covers' : 'Your starting prices'}>
                {c.industry_key === 'pest_control'
                  ? 'Your plan tiers, what each one covers, and a starting price go here, so people can choose before they call.'
                  : 'Starting prices for your main services, and any fees you don’t charge, so people can see what to expect before they call.'}
              </ConceptNote>
            </div>
          </section>
        )}

        {/* WHY US: three or four reasons, each tied to a fact */}
        {whyUs.length > 0 && (
          <section id="why" style={{ paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
            <div className="crew-split" style={wrap}>
              <div>
                <div style={eyebrow(C.textMuted)}>Why {name}</div>
                <h2 style={{ ...h2, marginTop: 12, marginBottom: 28 }}>Why neighbors call us</h2>
                {secondary ? (
                  <img src={secondary.url} alt={secondary.alt || ''} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: T.radius.lg, display: 'block' }} />
                ) : concept ? (
                  <ConceptNote T={T} minHeight={220} title="A photo of your team at work">
                    Real people from your company, not a stock handshake.
                  </ConceptNote>
                ) : null}
              </div>
              <div className="crew-why" style={{ alignSelf: 'center' }}>
                {whyUs.map((p, i) => (
                  <div key={i}>
                    <div style={{ width: 36, height: 4, background: C.accent, borderRadius: 2, marginBottom: 16 }} />
                    <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 28, lineHeight: 1.05, textTransform: 'uppercase', margin: '0 0 10px' }}>{p.title}</h3>
                    <p style={{ margin: 0, color: C.textDim, fontSize: 17 }}>{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* REVIEWS: recent, dated, real */}
        {featuredReviews.length > 0 ? (
          <section style={{ background: C.bgAlt, paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
            <div style={wrap}>
              <div style={eyebrow(C.textMuted)}>Reviews</div>
              <h2 style={{ ...h2, marginTop: 12, marginBottom: 36 }}>What customers say</h2>
              <div className="crew-services">
                {featuredReviews.map((r, i) => {
                  // Stars only from a rating the review actually carries.
                  const rating = Number(r.rating)
                  const hasRating = Number.isFinite(rating) && rating > 0
                  return (
                  <figure key={i} style={{ margin: 0, background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, padding: 28 }}>
                    {hasRating && (
                      <div role="img" style={{ display: 'flex', gap: 2, color: C.accent, marginBottom: 12 }} aria-label={`${rating} out of 5 stars`}>
                        {Array.from({ length: Math.min(5, Math.round(rating)) }).map((_, k) => <Star key={k} />)}
                      </div>
                    )}
                    <blockquote style={{ margin: 0, fontSize: 17 }}>{r.text}</blockquote>
                    <figcaption style={{ marginTop: 16, fontSize: 15, color: C.textDim }}>{r.author}{r.date ? ` · ${r.date}` : ''}</figcaption>
                  </figure>
                  )
                })}
              </div>
            </div>
          </section>
        ) : concept ? (
          <section style={{ background: C.bgAlt, paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
            <div style={wrap}>
              <div style={eyebrow(C.textMuted)}>Reviews</div>
              <h2 style={{ ...h2, marginTop: 12, marginBottom: 32 }}>What customers say</h2>
              <ConceptNote T={T} title="Your latest Google reviews, automatically">
                Your three most recent reviews appear here with their dates, pulled from Google and updated as new ones arrive. Never selected or written by us.
              </ConceptNote>
            </div>
          </section>
        ) : null}

        {/* SERVICE AREAS: coverage, and a link to every area page */}
        {areas.length > 0 && (
          <section id="areas" style={{ paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
            <div style={wrap}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                <div>
                  <div style={eyebrow(C.textMuted)}>Service areas</div>
                  <h2 style={{ ...h2, marginTop: 12 }}>Where we work</h2>
                </div>
                <p style={{ color: C.textDim, margin: 0, maxWidth: '40ch' }}>Serving {listAreas(areas)}.</p>
              </div>
              <AreaChips x={x} areas={areas} />
            </div>
          </section>
        )}

        {/* FAQ: the questions that stop a call */}
        {faqs.length > 0 && (
          <section id="faq" style={{ background: C.bgAlt, paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
            <div className="crew-split" style={wrap}>
              <div>
                <div style={eyebrow(C.textMuted)}>Questions</div>
                <h2 style={{ ...h2, marginTop: 12 }}>Before you call</h2>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                {faqs.map((f, i) => (
                  <details key={i} style={{ borderBottom: `1px solid ${C.border}`, paddingBlock: 18 }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: 19, listStyle: 'revert' }}>{f.q}</summary>
                    <p style={{ margin: '12px 0 0', color: C.textDim, maxWidth: '64ch' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

    </CrewPage>
  )
}

function HeroCopy({ T, C, F, btn, eyebrow, headline, support, primaryArea, phone, phoneDisplay, quoteHref, proof, onImage, statedOnTheirSite }) {
  const strong = onImage ? C.textOnImage : C.inverseText
  const dim = onImage ? C.textOnImageDim : C.inverseTextDim
  const shortProof = proof.map(p => p.short).filter(Boolean).slice(0, 3)
  return (
    <div style={{ maxWidth: 760 }}>
      {primaryArea && <div style={eyebrow(dim)}>{primaryArea}</div>}
      <h1 style={{ fontFamily: F.display, fontWeight: 800, fontSize: T.type.hero, lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '14px 0 0', color: strong, textWrap: 'balance' }}>
        {headline}
      </h1>
      {support && <p style={{ fontSize: 'clamp(18px, 1.6vw, 21px)', lineHeight: 1.5, color: dim, margin: '20px 0 0', maxWidth: '44ch' }}>{support}</p>}
      <div className="crew-herobtns" style={{ marginTop: 32 }}>
        {phone && (
          <a href={`tel:${phone}`} style={{ ...btn, background: C.accent, color: C.onAccent }}>
            <PhoneIcon /> Call {phoneDisplay}
          </a>
        )}
        <a href={quoteHref} style={{ ...btn, color: strong, border: `2px solid ${strong}` }}>Get a quote</a>
      </div>
      {shortProof.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginTop: 26, fontSize: 15, fontWeight: 600, color: dim }}>
          {shortProof.map((p, i) => <span key={i}>{p}</span>)}
          {statedOnTheirSite && <span style={{ fontWeight: 400 }}>(from your current site)</span>}
        </div>
      )}
    </div>
  )
}
