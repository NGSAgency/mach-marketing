import { crewTokens } from '../../../templates/crew/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildLocalBusinessSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import CrewMobileBar from './CrewMobileBar.js'

// CREW home page. Section order and the reasoning behind each one are in the
// trades family brief; CREW tokens carry the design principles.
//
// Every section renders from real data. On a concept, a section whose content
// the prospect hasn't given us shows a labelled ConceptNote; on a real site it
// hides. Nothing is invented: no ratings, credentials, prices or urgency that
// aren't in the data.

const TRADE_NOUN = {
  pest_control: 'Pest control',
  hvac: 'Heating and cooling',
  plumbing: 'Plumbing',
  roofing: 'Roofing',
  electrical: 'Electrical work',
  landscaping: 'Lawn and landscaping',
  general_contractor: 'Home improvement',
}

const slugify = (t) => String(t || '').toLowerCase().trim()
  .replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

function parseJson(raw) {
  if (!raw) return null
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(String(raw).replace(/```json/gi, '').replace(/```/g, '').trim()) } catch { return null }
}

function listAreas(areas) {
  if (areas.length <= 1) return areas[0] || ''
  if (areas.length === 2) return `${areas[0]} and ${areas[1]}`
  return `${areas[0]}, ${areas[1]} and nearby`
}

function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
      <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  )
}

function Star({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
      <path fill="currentColor" d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.1l-5.6 3 1.1-6.3L2.9 9.4l6.3-.9L12 2.8Z" />
    </svg>
  )
}

export default function CrewHome({ config: c, siteSlug }) {
  const T = applyBrand(crewTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  const concept = c.concept === true
  const base = c.base_path || `/site/${siteSlug}`
  const gen = c.generated || {}
  const imgs = c.images || {}
  const biz = c.business || {}
  const pos = c.positioning || {}
  const services = c.services || []
  const areas = (c.service_areas || []).filter(Boolean)
  const primaryArea = c.primary_service_area || areas[0] || ''
  const phone = (biz.phone || '').replace(/[^0-9+]/g, '')
  const phoneDisplay = biz.phone_display || biz.phone || ''
  const logo = c.brand?.logo_url
  const name = biz.display_name || ''

  // Concepts have no inner pages yet, so links stay on this page.
  const link = (path, anchor) => (concept ? `#${anchor}` : `${base}${path}`)
  const quoteHref = concept ? '#contact' : `${base}/contact`

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
  const reviews = c.reviews || {}
  const years = biz.years_in_business || (biz.established_year ? new Date().getFullYear() - biz.established_year : null)
  const proof = []
  if (reviews.google_rating) {
    proof.push({
      value: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{Number(reviews.google_rating).toFixed(1)}<Star size={26} /></span>,
      label: reviews.google_count ? `${reviews.google_count.toLocaleString()} Google reviews` : 'Google rating',
      short: `${Number(reviews.google_rating).toFixed(1)} rating${reviews.google_count ? ` · ${reviews.google_count.toLocaleString()} reviews` : ''}`,
    })
  }
  if (years && years > 1) {
    proof.push({ value: `${years}`, label: `Years in business${biz.established_year ? ` · since ${biz.established_year}` : ''}`, short: biz.established_year ? `Since ${biz.established_year}` : `${years} years` })
  }
  if (pos.licensed && pos.insured) {
    proof.push({ value: 'Licensed', label: `and insured${c.credentials?.license_number ? ` · Lic. ${c.credentials.license_number}` : ''}`, short: 'Licensed & insured' })
  }
  const guarantee = (pos.warranties || [])[0]
  if (guarantee) {
    const g = typeof guarantee === 'string' ? guarantee : guarantee.name || guarantee.description
    if (g) proof.push({ value: 'Guaranteed', label: g, short: null })
  }
  const statedOnTheirSite = concept && reviews.source === 'their_site'

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
  const featuredReviews = (reviews.featured || []).filter(r => r?.text).slice(0, 3)
  const hasPlans = Array.isArray(c.plans) && c.plans.length > 0

  const hero = imgs.home_hero
  const secondary = imgs.home_secondary

  // Shared styles
  const wrap = { maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(20px, 4vw, 40px)' }
  const eyebrow = (color) => ({ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color })
  const h2 = { fontFamily: F.display, fontWeight: 800, fontSize: T.type.display, lineHeight: 0.98, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: 0, textWrap: 'balance' }
  const btn = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: T.radius.md, padding: '16px 26px', fontSize: 17, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }

  return (
    <>
      <link rel="stylesheet" href={crewTokens.fontsHref} precedence="default" />
      <style>{`
        .crew a:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 3px; }
        .crew-nav { display: flex; }
        .crew-services { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .crew-proof { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 280px)); }
        .crew-split { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
        .crew-why { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 40px; }
        .crew-foot { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
        .crew-mobilebar { display: none !important; }
        .crew-herobtns { display: flex; flex-wrap: wrap; gap: 12px; }
        @media (max-width: 1000px) {
          .crew-services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .crew-split { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .crew-nav { display: none; }
          .crew-services, .crew-why, .crew-foot { grid-template-columns: 1fr; }
          .crew-proof { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .crew-proof > div { border-left: none !important; }
          .crew-mobilebar { display: grid !important; }
          .crew-headerquote { display: none !important; }
          .crew-herobtns a { flex: 1 1 100%; }
          .crew-utilphone { display: none !important; }
          .crew-utiltext { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
        }
      `}</style>
      {/* No structured data on concepts: a noindexed pitch shouldn't assert ratings or an address to search engines. */}
      {!concept && <JsonLd data={buildLocalBusinessSchema(c)} />}
      <TrackingScripts tracking={c.tracking} />

      <div className="crew" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: T.type.base, lineHeight: 1.6, minHeight: '100vh' }}>

        {/* UTILITY BAR: are you open, do you cover me */}
        <div style={{ background: C.inverseBg, color: C.inverseTextDim, fontSize: 14 }}>
          <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingBlock: 9, flexWrap: 'wrap' }}>
            <span className="crew-utiltext">
              {areas.length > 0 && <>Serving {listAreas(areas)}</>}
              {biz.hours_display && <> · {biz.hours_display}</>}
              {pos.emergency_service && <> · <span style={{ color: C.inverseText, fontWeight: 600 }}>24/7 emergency service</span></>}
            </span>
            {phone && (
              <a className="crew-utilphone" href={`tel:${phone}`} style={{ color: C.inverseText, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <PhoneIcon size={15} /> {phoneDisplay}
              </a>
            )}
          </div>
        </div>

        {/* HEADER: identity and the two routes to act */}
        <header style={{ position: 'sticky', top: c.chrome_offset || 0, zIndex: 50, background: C.bgTranslucent, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.borderLight}` }}>
          <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, paddingBlock: 14 }}>
            <a href={concept ? '#top' : base} style={{ textDecoration: 'none', color: C.text, display: 'flex', alignItems: 'center', minWidth: 0 }}>
              {logo ? (
                <span style={{ background: C.logoPlate, borderRadius: T.radius.sm, padding: '6px 10px', display: 'inline-flex' }}>
                  <img src={logo} alt={name} style={{ height: 40, width: 'auto', display: 'block' }} />
                </span>
              ) : (
                <span style={{ fontFamily: F.display, fontWeight: 800, fontSize: 26, letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
              )}
            </a>
            <nav className="crew-nav" style={{ gap: 28, fontSize: 16, fontWeight: 600 }} aria-label="Main">
              <a href={link('/services', 'services')} style={{ color: C.textDim, textDecoration: 'none' }}>Services</a>
              {whyUs.length > 0 && <a href="#why" style={{ color: C.textDim, textDecoration: 'none' }}>Why us</a>}
              {areas.length > 0 && <a href={link('/service-areas', 'areas')} style={{ color: C.textDim, textDecoration: 'none' }}>Areas</a>}
              {faqs.length > 0 && <a href={link('/faq', 'faq')} style={{ color: C.textDim, textDecoration: 'none' }}>FAQ</a>}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {phone && (
                <a href={`tel:${phone}`} aria-label={`Call ${phoneDisplay}`} style={{ ...btn, padding: '11px 16px', fontSize: 16, background: C.accent, color: C.onAccent }}>
                  <PhoneIcon size={17} /><span className="crew-headerquote">{phoneDisplay}</span>
                </a>
              )}
              <a className="crew-headerquote" href={quoteHref} style={{ ...btn, padding: '10px 16px', fontSize: 16, color: C.text, border: `2px solid ${C.text}` }}>Get a quote</a>
            </div>
          </div>
        </header>

        {/* HERO: what they do, where, why trust them, how to get them out */}
        <span id="top" />
        {hero ? (
          <section style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(520px, 74vh, 760px)', display: 'flex', alignItems: 'flex-end' }}>
            <img src={hero.url} alt={hero.alt || ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  Your team, your trucks, a job in progress. A real photo of the people who show up does more for trust than anything written on the page, and outperforms stock photography in testing.
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
                Your Google rating and review count, years in business, licence number and guarantee sit here. 47% of people won't hire a business with fewer than 20 reviews, so this strip does a lot of work.
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
              {!concept && services.length > shown.length && (
                <a href={`${base}/services`} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>All {services.length} services</a>
              )}
            </div>
            {grouped ? categories.map(cat => (
              <div key={cat} style={{ marginBottom: 44 }}>
                <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, textTransform: 'uppercase', margin: '0 0 16px', color: C.textDim }}>{cat}</h3>
                <div className="crew-services">
                  {shown.filter(s => s.category === cat).map(s => <ServiceCard key={s.slug} {...{ s, T, C, F, imgs, link }} />)}
                </div>
              </div>
            )) : (
              <div className="crew-services">
                {shown.map(s => <ServiceCard key={s.slug} {...{ s, T, C, F, imgs, link }} />)}
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
                  ? 'Recurring plans are how most homeowners buy pest control. Your plan tiers, what each one covers, and a starting price go here, so people can choose before they call.'
                  : 'Starting prices for your main services, and any fees you don’t charge. Most homeowners say they’re more likely to contact a company that shows prices, and most companies don’t.'}
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
                {featuredReviews.map((r, i) => (
                  <figure key={i} style={{ margin: 0, background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, padding: 28 }}>
                    <div style={{ display: 'flex', gap: 2, color: C.accent, marginBottom: 12 }} aria-label={`${r.rating || 5} stars`}>
                      {Array.from({ length: Math.round(r.rating || 5) }).map((_, k) => <Star key={k} />)}
                    </div>
                    <blockquote style={{ margin: 0, fontSize: 17 }}>{r.text}</blockquote>
                    <figcaption style={{ marginTop: 16, fontSize: 15, color: C.textDim }}>{r.author}{r.date ? ` · ${r.date}` : ''}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : concept ? (
          <section style={{ background: C.bgAlt, paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
            <div style={wrap}>
              <div style={eyebrow(C.textMuted)}>Reviews</div>
              <h2 style={{ ...h2, marginTop: 12, marginBottom: 32 }}>What customers say</h2>
              <ConceptNote T={T} title="Your latest Google reviews, automatically">
                Your three most recent reviews appear here with their dates, pulled from Google and updated as new ones arrive. Never selected or written by us: people look for reviews from the last few months, and recent real ones are what they trust.
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
                {primaryArea && <p style={{ color: C.textDim, margin: 0, maxWidth: '40ch' }}>Based in {primaryArea} and serving the surrounding area.</p>}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {areas.map(a => (
                  <li key={a}>
                    {concept ? (
                      <span style={{ display: 'inline-block', padding: '10px 18px', borderRadius: T.radius.full, background: C.surface, border: `1px solid ${C.border}`, fontWeight: 600 }}>{a}</span>
                    ) : (
                      <a href={`${base}/service-areas/${slugify(a)}`} style={{ display: 'inline-block', padding: '10px 18px', borderRadius: T.radius.full, background: C.surface, border: `1px solid ${C.border}`, fontWeight: 600, color: C.text, textDecoration: 'none' }}>{a}</a>
                    )}
                  </li>
                ))}
              </ul>
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

        {/* FINAL CALL TO ACTION */}
        <section id="contact" style={{ background: C.inverseBg, color: C.inverseText }}>
          <div style={{ ...wrap, paddingBlock: 'clamp(64px, 9vw, 112px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={eyebrow(C.inverseTextDim)}>{primaryArea ? `${name} · ${primaryArea}` : name}</div>
              <h2 style={{ ...h2, marginTop: 14, fontSize: 'clamp(40px, 6.4vw, 80px)' }}>Get it taken care of</h2>
              {biz.hours_display && <p style={{ margin: '16px 0 0', color: C.inverseTextDim }}>{biz.hours_display}</p>}
            </div>
            <div className="crew-herobtns">
              {phone && <a href={`tel:${phone}`} style={{ ...btn, fontSize: 19, padding: '18px 28px', background: C.accent, color: C.onAccent }}><PhoneIcon size={20} /> {phoneDisplay}</a>}
              <a href={quoteHref} style={{ ...btn, fontSize: 19, padding: '16px 26px', color: C.inverseText, border: `2px solid ${C.inverseText}` }}>Get a quote</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: C.inverseBgAlt, color: C.inverseTextDim, fontSize: 15 }}>
          <div className="crew-foot" style={{ ...wrap, paddingBlock: 56 }}>
            <div>
              <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 26, textTransform: 'uppercase', color: C.inverseText }}>{name}</div>
              {biz.address_line && <div style={{ marginTop: 10 }}>{biz.address_line}</div>}
              {phone && <div><a href={`tel:${phone}`} style={{ color: C.inverseText, textDecoration: 'none', fontWeight: 600 }}>{phoneDisplay}</a></div>}
              {c.credentials?.license_number && <div style={{ marginTop: 6 }}>License {c.credentials.license_number}</div>}
            </div>
            <div>
              <div style={{ ...eyebrow(C.inverseTextDim), fontSize: 12, marginBottom: 12 }}>Services</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 6 }}>
                {services.slice(0, 8).map(s => <li key={s.slug}><a href={link(`/services/${s.slug}`, 'services')} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>{s.name}</a></li>)}
              </ul>
            </div>
            <div>
              <div style={{ ...eyebrow(C.inverseTextDim), fontSize: 12, marginBottom: 12 }}>Areas</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 6 }}>
                {areas.slice(0, 8).map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
          <div style={{ ...wrap, paddingBlock: '18px 90px', borderTop: `1px solid ${C.inverseBorder}`, fontSize: 13 }}>
            © {new Date().getFullYear()} {biz.legal_name || name}
          </div>
        </footer>
      </div>

      <CrewMobileBar phone={phone} phoneDisplay={phoneDisplay} quoteHref={quoteHref} colors={C} fontFamily={F.body} />
    </>
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

function ServiceCard({ s, T, C, F, imgs, link }) {
  const img = imgs[`service_${s.slug}`]
  return (
    <a href={link(`/services/${s.slug}`, 'services')} style={{ display: 'flex', flexDirection: 'column', background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, overflow: 'hidden', color: C.text, textDecoration: 'none', height: '100%' }}>
      {img ? (
        <img src={img.url} alt={img.alt || s.name} style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }} />
      ) : (
        // No photo for this service: a quiet tile at the same size, so the grid
        // stays even. A tool mark, not text, since it carries no information.
        <div aria-hidden="true" style={{ aspectRatio: '16 / 10', background: C.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMuted }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
          </svg>
        </div>
      )}
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, lineHeight: 1.05, textTransform: 'uppercase', margin: 0 }}>{s.name}</h3>
        {s.short && <p style={{ margin: 0, color: C.textDim, fontSize: 16, lineHeight: 1.55 }}>{s.short}</p>}
        {s.price_from && <div style={{ fontWeight: 700, color: C.accent }}>From {s.price_from}</div>}
        <span style={{ marginTop: 'auto', paddingTop: 8, fontWeight: 700, fontSize: 15, color: C.text }}>Learn more →</span>
      </div>
    </a>
  )
}
