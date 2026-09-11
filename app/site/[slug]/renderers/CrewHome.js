import { buildLocalBusinessSchema } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { crewContext, schemaConfig, CrewPage, ServiceCard, AreaChips, PhoneIcon, Star, listAreas, TRADE_NOUN } from './CrewChrome.js'
import { heroTrust } from '../../../../lib/templates/shared/claims.js'
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

// The same scrim colour at another opacity: rgba(r, g, b, a) -> rgba(r, g, b, alpha).
function withAlpha(rgba, alpha) {
  const m = String(rgba).match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/)
  return m ? `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})` : rgba
}

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

  // ---- Hero ----------------------------------------------------------------
  // Hero Research Brief (2026-09-11). The H1 says what they do and where, in
  // plain words ("Pest control in Olathe"): people scanning take in the first
  // couple of words, and plain beats clever. The business name sits above it.
  // Without a place or a trade the generated headline stands in, then their
  // own short tagline, then the name.
  const place = primaryArea && primaryArea !== 'your area' ? primaryArea : null
  const trade = TRADE_NOUN[c.industry_key] || services[0]?.category || null
  const whatWhere = place && (trade || services[0]?.name) ? `${trade || services[0].name} in ${place}` : null
  const ownTagline = pos.own_tagline && pos.own_tagline.length <= 60 ? pos.own_tagline : null
  const headline = whatWhere || pos.headline || ownTagline || trade || name
  const support = gen['home|hero_subheadline']
    || (pos.headline && pos.headline !== headline ? pos.headline : null)
    || (pos.tagline && pos.tagline !== headline && !pos.tagline.includes(' — ') ? pos.tagline : null)

  // Trust row inside the hero, next to the buttons: rating and count first.
  const trust = heroTrust(c)
  const statedOnTheirSite = concept && c.reviews?.source === 'their_site'

  // The second button: online booking when they take it, else a quote. "Free"
  // only when they told us estimates are free.
  const bookingUrl = /^https?:\/\//i.test(biz.booking_url || '') ? biz.booking_url : null
  const second = bookingUrl
    ? { href: bookingUrl, label: 'Book online', external: true }
    : { href: quoteHref, label: pos.free_estimates ? 'Get a free quote' : 'Get a quote' }

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

        {/* HERO: what they do, where, why trust them, how to get them out.
            Shorter than the screen so the next section shows beneath it
            (full-screen heroes read as the whole page). */}
        <span id="top" />
        {hero ? (
          <section data-hero="" style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(460px, 66svh, 700px)', display: 'flex', alignItems: 'flex-end' }}>
            <HeroMedia image={hero.url ? hero : null} video={video} />
            {/* Scrim: at least 80% over the whole text column, whatever photo
                or video frame is behind it, so hero text keeps 4.5:1 even on a
                white wall. The photo shows on the right. On phones the text
                spans the width, so the whole hero is scrimmed. */}
            <div className="crew-scrim" style={{ position: 'absolute', inset: 0, '--s-strong': C.overlayStrong, '--s-mid': withAlpha(C.overlayStrong, 0.8), '--s-light': C.overlayLight, '--s-faint': C.overlayFaint }} />
            <style>{`
              .crew-scrim { background: linear-gradient(90deg, var(--s-strong) 0%, var(--s-strong) 40%, var(--s-mid) 62%, var(--s-light) 92%), linear-gradient(0deg, var(--s-strong) 0%, var(--s-faint) 55%); }
              @media (max-width: 1000px) { .crew-scrim { background: linear-gradient(0deg, var(--s-strong) 0%, var(--s-mid) 100%); } }
            `}</style>
            <div data-on-image="" style={{ '--on-image': C.textOnImage, '--on-image-dim': C.textOnImageDim, color: C.textOnImage, position: 'relative', width: '100%' }}>
              <div className="crew-heropad" style={{ ...wrap, paddingBlock: 'clamp(48px, 7vw, 88px) clamp(36px, 5vw, 64px)' }}>
                <HeroCopy {...{ x, name, headline, support, trust, second, place, onImage: true, statedOnTheirSite }} />
              </div>
            </div>
          </section>
        ) : (
          <section data-hero="" style={{ background: C.inverseBg, color: C.inverseText }}>
            <div className={concept ? 'crew-split crew-heropad' : 'crew-heropad'} style={{ ...wrap, paddingBlock: 'clamp(48px, 7vw, 88px)', display: 'grid', gridTemplateColumns: concept ? 'minmax(0, 7fr) minmax(0, 5fr)' : '1fr', gap: 40, alignItems: 'center' }}>
              <div>
                <HeroCopy {...{ x, name, headline, support, trust, second, place, onImage: false, statedOnTheirSite }} />
              </div>
              {concept && (
                <ConceptNote T={T} inverse minHeight={320} title="Your crew photo goes here">
                  Your team, your trucks, a job in progress. Real photos of the people who show up get more calls than stock photography.
                </ConceptNote>
              )}
            </div>
          </section>
        )}

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

function HeroCopy({ x, name, headline, support, trust, second, place, onImage, statedOnTheirSite }) {
  const { T, C, F, btn, eyebrow, phone, phoneDisplay, areas, href, concept } = x
  const strong = onImage ? C.textOnImage : C.inverseText
  const dim = onImage ? C.textOnImageDim : C.inverseTextDim
  const rating = trust.find(t => t.kind === 'rating')
  const rest = trust.filter(t => t.kind !== 'rating')
  const nearby = areas.filter(a => a !== place)
  const shownAreas = [place, ...nearby].filter(Boolean).slice(0, 4)
  const more = areas.length - shownAreas.length
  return (
    <div style={{ maxWidth: 780 }}>
      {name && <div style={eyebrow(dim)}>{name}</div>}
      <h1 style={{ fontFamily: F.display, fontWeight: 800, fontSize: T.type.hero, lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '14px 0 0', color: strong, textWrap: 'balance' }}>
        {headline}
      </h1>
      {support && <p className="crew-herosupport" style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.5, color: dim, margin: '18px 0 0', maxWidth: '46ch' }}>{support}</p>}

      <div className="crew-herobtns" style={{ marginTop: 28 }}>
        {phone && (
          <a href={`tel:${phone}`} style={{ ...btn, background: C.accent, color: C.onAccent }}>
            <PhoneIcon /> Call {phoneDisplay}
          </a>
        )}
        <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={{ ...btn, color: strong, border: `2px solid ${strong}` }}>{second.label}</a>
      </div>

      {(rating || rest.length > 0) && (
        <ul className="crew-herotrust" style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexWrap: 'wrap', gap: '8px 22px', fontSize: 16, fontWeight: 600, color: strong }}>
          {rating && (
            <li style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: F.display, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{rating.rating}<Star size={18} /></span>
              <span style={{ color: dim, fontWeight: 500 }}>{rating.count ? `${rating.count.toLocaleString('en-US')} ${statedOnTheirSite ? 'reviews' : 'Google reviews'}` : 'rating'}{statedOnTheirSite ? ' (from your current site)' : ''}</span>
            </li>
          )}
          {rest.map((t, i) => (
            <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ flex: 'none' }}><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {t.text}
            </li>
          ))}
        </ul>
      )}
      {concept && !rating && (
        <div style={{ marginTop: 22, display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, border: `1.5px dashed ${dim}`, borderRadius: T.radius.md, padding: '10px 14px', fontSize: 15, color: strong }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dim }}>Concept note</span>
          Your Google rating and review count go here, next to the call button.
        </div>
      )}

      {shownAreas.length > 0 && (
        <p style={{ margin: '18px 0 0', fontSize: 15, color: dim }}>
          Serving {more > 0 ? shownAreas.join(', ') : shownAreas.length > 1 ? `${shownAreas.slice(0, -1).join(', ')} and ${shownAreas[shownAreas.length - 1]}` : shownAreas[0]}
          {more > 0 && <> and <a href={href.areas} style={{ color: strong, textDecoration: 'underline', textUnderlineOffset: 3 }}>{more} more</a></>}
        </p>
      )}
    </div>
  )
}
