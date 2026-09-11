import { crewTokens } from '../../../templates/crew/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import {
  JsonLd,
  urlServices,
  urlService,
  urlServiceAreas,
  urlArea,
  urlCombo,
  urlAbout,
  urlFAQ,
  urlContact,
} from '../../../../lib/templates/shared/seo/index.js'
import {
  emergencyLabel,
  faqsFrom,
  sinceLabel,
  whyUsItems,
  aboutBody,
} from '../../../../lib/templates/shared/claims.js'
import CrewMobileBar from './CrewMobileBar.js'

// The pieces every CREW page shares: tokens and links (crewContext), the
// scoped styles, utility bar, header, final call band, footer and the phone
// call bar (CrewPage), plus the page header and building blocks the inner
// pages use. The home page renders through the same pieces, so a change here
// changes every page at once.

export const TRADE_NOUN = {
  pest_control: 'Pest control',
  hvac: 'Heating and cooling',
  plumbing: 'Plumbing',
  roofing: 'Roofing',
  electrical: 'Electrical work',
  landscaping: 'Lawn and landscaping',
  general_contractor: 'Home improvement',
}

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())

export function listAreas(areas) {
  if (areas.length <= 1) return areas[0] || ''
  if (areas.length === 2) return `${areas[0]} and ${areas[1]}`
  return `${areas[0]}, ${areas[1]} and nearby`
}

/** Paragraphs from copy with blank lines between them. */
export const paragraphs = (text) => (typeof text === 'string' ? text : '')
  .split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

/** Text that is a JSON blob (steps, FAQs) rather than prose. */
export const looksLikeJson = (v) => typeof v === 'string' && /^\s*[\[{]/.test(v)

/**
 * The config with each service's description cleared when it holds a JSON
 * blob (client data can carry page copy there), so structured data never
 * publishes raw JSON as a description.
 */
export const schemaConfig = (c) => ({
  ...c,
  services: (c.services || []).map(s => (looksLikeJson(s.description) ? { ...s, description: '' } : s)),
})

// ---- Icons -------------------------------------------------------------------

export function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
      <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  )
}

export function Star({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
      <path fill="currentColor" d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.1l-5.6 3 1.1-6.3L2.9 9.4l6.3-.9L12 2.8Z" />
    </svg>
  )
}

export function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function PinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

function WrenchIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
    </svg>
  )
}

// ---- Context -----------------------------------------------------------------

/**
 * Tokens, facts and links for one CREW page. Every link goes to a real page,
 * on a client site and on a concept (whose routes live under c.base_path).
 */
export function crewContext(c, siteSlug) {
  const T = applyBrand(crewTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  const concept = c.concept === true
  const base = c.base_path || `/site/${siteSlug}`
  const biz = c.business || {}
  const pos = c.positioning || {}
  const services = c.services || []
  const areas = (c.service_areas || []).filter(Boolean)
  const primaryArea = c.primary_service_area || areas[0] || ''
  const phone = (biz.phone || '').replace(/[^0-9+]/g, '')
  const phoneDisplay = biz.phone_display || biz.phone || ''
  const name = biz.display_name || ''
  const nouns = c.profile?.nouns || {}

  const href = {
    home: base,
    services: `${base}${urlServices(c)}`,
    service: (slug) => `${base}${urlService(slug, c)}`,
    areas: `${base}${urlServiceAreas(c)}`,
    area: (a) => `${base}${urlArea(a, c)}`,
    combo: (s, a) => `${base}${urlCombo(s, a)}`,
    about: `${base}${urlAbout()}`,
    faq: `${base}${urlFAQ()}`,
    contact: `${base}${urlContact()}`,
  }

  // The trade in a few words, for page headings ("Pest control in Olathe").
  // A concept knows its industry; a client site falls back to the first
  // service's category, the same noun the home page title uses.
  const tradeNoun = TRADE_NOUN[c.industry_key] || services[0]?.category || titleCase(nouns.offering?.plural || 'services')

  const faqs = faqsFrom(c)
  const hasAbout = concept || !!(aboutBody(c) || c.generated?.['about|our_approach'] || biz.established_year || c.credentials?.license_number)

  return {
    c, T, C, F, concept, base, biz, pos, services, areas, primaryArea, phone, phoneDisplay, name,
    logo: c.brand?.logo_url, imgs: c.images || {}, href, quoteHref: href.contact, tradeNoun, faqs, hasAbout,
    offeringLabel: titleCase(nouns.offering?.plural || 'services'),
    placeLabel: titleCase(nouns.place?.plural || 'service areas'),
    emergency: emergencyLabel(c),
    wrap: { maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(20px, 4vw, 40px)' },
    eyebrow: (color) => ({ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color }),
    h2: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.display, lineHeight: 0.98, letterSpacing: '-0.005em', textTransform: 'uppercase', margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 42px)', lineHeight: 1, textTransform: 'uppercase', margin: 0, textWrap: 'balance' },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: T.radius.md, padding: '16px 26px', fontSize: 17, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' },
    sectionPad: 'clamp(64px, 9vw, 112px)',
  }
}

/**
 * Proof facts from the data only: rating, years, licence, warranty. On a
 * concept a rating stated on their own site is marked as such.
 */
export function crewProof(x) {
  const { c, biz, pos, concept } = x
  const reviews = c.reviews || {}
  const years = biz.years_in_business || (biz.established_year ? new Date().getFullYear() - biz.established_year : null)
  const proof = []
  // A rating stated on their own website is not a Google rating, so it isn't called one.
  const fromGoogle = reviews.source !== 'their_site'
  if (reviews.google_rating) {
    proof.push({
      value: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{Number(reviews.google_rating).toFixed(1)}<Star size={26} /></span>,
      label: reviews.google_count
        ? `${reviews.google_count.toLocaleString()} ${fromGoogle ? 'Google reviews' : 'reviews'}`
        : (fromGoogle ? 'Google rating' : 'Rating'),
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
    if (g) proof.push({ value: 'Warranty', label: g, short: null })
  }
  return { proof, statedOnTheirSite: concept && reviews.source === 'their_site' }
}

/**
 * The checklist beside the quote buttons on inner pages: a Google rating,
 * founding year, licence, emergency service, financing and warranty, each
 * only when the data holds it.
 */
export function crewFacts(x, service) {
  const { c } = x
  const reviews = c.reviews || {}
  const items = []
  if (reviews.source !== 'their_site' && reviews.google_rating) {
    items.push(`${Number(reviews.google_rating).toFixed(1)} Google rating${reviews.google_count ? ` · ${reviews.google_count.toLocaleString()} reviews` : ''}`)
  }
  const since = sinceLabel(c)
  if (since) items.push(since)
  return [...items, ...whyUsItems(c, service)]
}

// ---- Styles ------------------------------------------------------------------

export function CrewStyles({ x }) {
  const { C } = x
  return (
    <>
      <link rel="stylesheet" href={crewTokens.fontsHref} precedence="default" />
      <style>{`
        .crew a:focus-visible, .crew summary:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 3px; }
        .crew-nav { display: flex; }
        .crew-menu { display: none; }
        .crew-menu > summary { list-style: none; }
        .crew-menu > summary::-webkit-details-marker { display: none; }
        .crew-menu[open] .crew-menu-open { display: none; }
        .crew-menu:not([open]) .crew-menu-close { display: none; }
        .crew-services { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .crew-proof { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 280px)); }
        .crew-split { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
        .crew-why { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 40px; }
        .crew-foot { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
        .crew-mobilebar { display: none !important; }
        .crew-herobtns { display: flex; flex-wrap: wrap; gap: 12px; }
        .crew-detail { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 380px); gap: clamp(40px, 6vw, 88px); align-items: start; }
        .crew-aside { position: sticky; }
        .crew-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr)); gap: 12px; }
        .crew-contact { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
        .crew-tile:hover, .crew-card:hover { border-color: ${C.text} !important; }
        .crew-prose p { margin: 0 0 18px; }
        .crew-prose p:last-child { margin-bottom: 0; }
        @media (max-width: 1000px) {
          .crew-services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .crew-split, .crew-detail, .crew-contact { grid-template-columns: 1fr; }
          .crew-aside { position: static; }
          .crew-nav { display: none; }
          .crew-menu { display: block; }
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
          .crew-headbar { gap: 12px !important; }
          .crew-logotext { font-size: 22px !important; }
        }
      `}</style>
    </>
  )
}

// ---- Chrome ------------------------------------------------------------------

function UtilityBar({ x }) {
  const { C, wrap, areas, biz, emergency, phone, phoneDisplay } = x
  return (
    <div style={{ background: C.inverseBg, color: C.inverseTextDim, fontSize: 14 }}>
      <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingBlock: 9, flexWrap: 'wrap' }}>
        <span className="crew-utiltext">
          {areas.length > 0 && <>Serving {listAreas(areas)}</>}
          {biz.hours_display && <> · {biz.hours_display}</>}
          {emergency && <> · <span style={{ color: C.inverseText, fontWeight: 600 }}>{emergency}</span></>}
        </span>
        {phone && (
          <a className="crew-utilphone" href={`tel:${phone}`} style={{ color: C.inverseText, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <PhoneIcon size={15} /> {phoneDisplay}
          </a>
        )}
      </div>
    </div>
  )
}

function navItems(x) {
  const { href, services, areas, faqs, hasAbout } = x
  return [
    services.length > 0 && { key: 'services', label: 'Services', href: href.services },
    areas.length > 0 && { key: 'areas', label: 'Areas', href: href.areas },
    hasAbout && { key: 'about', label: 'About', href: href.about },
    faqs.length > 0 && { key: 'faq', label: 'FAQ', href: href.faq },
  ].filter(Boolean)
}

function Header({ x, current }) {
  const { c, T, C, F, wrap, btn, href, logo, name, phone, phoneDisplay, quoteHref } = x
  const items = navItems(x)
  return (
    <header style={{ position: 'sticky', top: c.chrome_offset || 0, zIndex: 50, background: C.bgTranslucent, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.borderLight}` }}>
      <div className="crew-headbar" style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, paddingBlock: 14, position: 'relative' }}>
        <a href={href.home} style={{ textDecoration: 'none', color: C.text, display: 'flex', alignItems: 'center', minWidth: 0 }}>
          {logo ? (
            <span style={{ background: C.logoPlate, borderRadius: T.radius.sm, padding: '6px 10px', display: 'inline-flex' }}>
              <img src={logo} alt={name} style={{ height: 40, width: 'auto', display: 'block' }} />
            </span>
          ) : (
            <span className="crew-logotext" style={{ fontFamily: F.display, fontWeight: 800, fontSize: 26, letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          )}
        </a>
        <nav className="crew-nav" style={{ gap: 28, fontSize: 16, fontWeight: 600 }} aria-label="Main">
          {items.map(it => (
            <a key={it.key} href={it.href} aria-current={current === it.key ? 'page' : undefined} style={{ color: current === it.key ? C.text : C.textDim, textDecoration: 'none', boxShadow: current === it.key ? `inset 0 -2px 0 ${C.text}` : 'none', paddingBlock: 4 }}>{it.label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {phone && (
            <a href={`tel:${phone}`} aria-label={`Call ${phoneDisplay}`} style={{ ...btn, padding: '11px 16px', fontSize: 16, background: C.accent, color: C.onAccent }}>
              <PhoneIcon size={17} /><span className="crew-headerquote">{phoneDisplay}</span>
            </a>
          )}
          <a className="crew-headerquote" href={quoteHref} style={{ ...btn, padding: '10px 16px', fontSize: 16, color: C.text, border: `2px solid ${C.text}` }}>Get a quote</a>
          {/* Phones and tablets: the same links in a menu. */}
          <details className="crew-menu">
            <summary aria-label="Menu" style={{ cursor: 'pointer', width: 48, height: 48, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.text}`, borderRadius: T.radius.md, color: C.text }}>
              <svg className="crew-menu-open" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              <svg className="crew-menu-close" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </summary>
            <nav aria-label="Menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 'clamp(20px, 4vw, 40px)', width: 'min(340px, calc(100vw - 40px))', background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, boxShadow: '0 18px 40px rgba(0,0,0,0.16)', padding: 8, display: 'grid' }}>
              <a href={href.home} style={{ padding: '14px 16px', fontSize: 18, fontWeight: 600, color: C.text, textDecoration: 'none', borderBottom: `1px solid ${C.borderLight}` }}>Home</a>
              {items.map(it => (
                <a key={it.key} href={it.href} aria-current={current === it.key ? 'page' : undefined} style={{ padding: '14px 16px', fontSize: 18, fontWeight: 600, color: C.text, textDecoration: 'none', borderBottom: `1px solid ${C.borderLight}` }}>{it.label}</a>
              ))}
              <a href={quoteHref} style={{ ...btn, margin: 8, background: C.inverseBg, color: C.inverseText }}>Get a quote</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

function CallBand({ x }) {
  const { C, wrap, eyebrow, h2, btn, name, primaryArea, biz, phone, phoneDisplay, quoteHref } = x
  return (
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
  )
}

function Footer({ x }) {
  const { c, C, F, wrap, eyebrow, name, biz, phone, phoneDisplay, services, areas, href } = x
  return (
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
            {services.slice(0, 8).map(s => <li key={s.slug}><a href={href.service(s.slug)} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>{s.name}</a></li>)}
          </ul>
        </div>
        <div>
          <div style={{ ...eyebrow(C.inverseTextDim), fontSize: 12, marginBottom: 12 }}>Areas</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 6 }}>
            {areas.slice(0, 8).map(a => <li key={a}><a href={href.area(a)} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>{a}</a></li>)}
          </ul>
        </div>
      </div>
      <div style={{ ...wrap, paddingBlock: '18px 90px', borderTop: `1px solid ${C.inverseBorder}`, fontSize: 13 }}>
        © {new Date().getFullYear()} {biz.legal_name || name}
      </div>
    </footer>
  )
}

/**
 * One CREW page: styles, structured data (never on a concept), utility bar,
 * header, the page's own sections, the final call band, footer and the
 * phone call bar.
 */
export function CrewPage({ x, current, schemas = [], children }) {
  const { c, C, F, T, concept, phone, phoneDisplay, quoteHref } = x
  return (
    <>
      <CrewStyles x={x} />
      {/* No structured data on concepts: a noindexed pitch shouldn't assert ratings or an address to search engines. */}
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />

      <div className="crew" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: T.type.base, lineHeight: 1.6, minHeight: '100vh' }}>
        <UtilityBar x={x} />
        <Header x={x} current={current} />
        {children}
        <CallBand x={x} />
        <Footer x={x} />
      </div>

      <CrewMobileBar phone={phone} phoneDisplay={phoneDisplay} quoteHref={quoteHref} colors={C} fontFamily={F.body} />
    </>
  )
}

// ---- Page building blocks ------------------------------------------------------

/** Visible breadcrumbs. Crumb urls are site-relative (from the seo helpers). */
export function Breadcrumbs({ x, crumbs, tone = 'light' }) {
  const { C, base } = x
  const dim = tone === 'image' ? C.textOnImageDim : tone === 'inverse' ? C.inverseTextDim : C.textMuted
  const strong = tone === 'image' ? C.textOnImage : tone === 'inverse' ? C.inverseText : C.text
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 14, fontWeight: 600 }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px' }}>
        {crumbs.map((cr, i) => {
          const last = i === crumbs.length - 1
          const url = cr.url === '/' ? base : `${base}${cr.url}`
          return (
            <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: dim }}>
              {last
                ? <span aria-current="page" style={{ color: strong }}>{cr.name}</span>
                : <a href={url} style={{ color: dim, textDecoration: 'none' }}>{cr.name}</a>}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * The header of an inner page: breadcrumbs, H1, a line of support, both
 * routes to act and the proof facts. On a photo when there is one, otherwise
 * on the dark band.
 */
export function PageHero({ x, image, crumbs, eyebrow: eyebrowText, title, support, badge, actions = 'both', showProof = true, children }) {
  const { T, C, F, wrap, eyebrow, btn, phone, phoneDisplay, quoteHref } = x
  const onImage = !!image
  const strong = onImage ? C.textOnImage : C.inverseText
  const dim = onImage ? C.textOnImageDim : C.inverseTextDim
  const { proof, statedOnTheirSite } = crewProof(x)
  const shortProof = showProof ? proof.map(p => p.short).filter(Boolean).slice(0, 3) : []

  const copy = (
    <div style={{ maxWidth: 820 }}>
      {crumbs && <Breadcrumbs x={x} crumbs={crumbs} tone={onImage ? 'image' : 'inverse'} />}
      {(eyebrowText || badge) && (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: crumbs ? 'clamp(28px, 4vw, 44px)' : 0 }}>
          {eyebrowText && <span style={eyebrow(dim)}>{eyebrowText}</span>}
          {badge && <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.full, border: `1.5px solid ${strong}`, color: strong }}>{badge}</span>}
        </div>
      )}
      <h1 style={{ fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(42px, 6.4vw, 84px)', lineHeight: 0.94, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '14px 0 0', color: strong, textWrap: 'balance' }}>
        {title}
      </h1>
      {support && <p style={{ fontSize: 'clamp(18px, 1.6vw, 21px)', lineHeight: 1.5, color: dim, margin: '20px 0 0', maxWidth: '46ch' }}>{support}</p>}
      {actions !== 'none' && (
        <div className="crew-herobtns" style={{ marginTop: 30 }}>
          {phone && (
            <a href={`tel:${phone}`} style={{ ...btn, background: C.accent, color: C.onAccent }}>
              <PhoneIcon /> Call {phoneDisplay}
            </a>
          )}
          {actions === 'both' && <a href={quoteHref} style={{ ...btn, color: strong, border: `2px solid ${strong}` }}>Get a quote</a>}
        </div>
      )}
      {shortProof.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginTop: 24, fontSize: 15, fontWeight: 600, color: dim }}>
          {shortProof.map((p, i) => <span key={i}>{p}</span>)}
          {statedOnTheirSite && <span style={{ fontWeight: 400 }}>(from your current site)</span>}
        </div>
      )}
      {children}
    </div>
  )

  if (onImage) {
    return (
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(460px, 62vh, 640px)', display: 'flex', alignItems: 'flex-end' }}>
        <img src={image.url} alt={image.alt || ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${C.overlayStrong} 0%, ${C.overlayStrong} 34%, ${C.overlayLight} 82%), linear-gradient(0deg, ${C.overlayStrong} 0%, ${C.overlayFaint} 60%)` }} />
        <div data-on-image="" style={{ '--on-image': C.textOnImage, '--on-image-dim': C.textOnImageDim, color: C.textOnImage, position: 'relative', width: '100%' }}>
          <div style={{ ...wrap, paddingBlock: 'clamp(40px, 6vw, 72px) clamp(40px, 6vw, 72px)' }}>{copy}</div>
        </div>
      </section>
    )
  }
  return (
    <section style={{ background: C.inverseBg, color: C.inverseText }}>
      <div style={{ ...wrap, paddingBlock: 'clamp(40px, 6vw, 72px) clamp(56px, 8vw, 96px)' }}>{copy}</div>
    </section>
  )
}

/** Eyebrow and heading for a section. */
export function SectionHead({ x, eyebrow: eyebrowText, title, small = false, as = 'h2', aside, style = {} }) {
  const { C, eyebrow, h2, h3 } = x
  const H = as
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: small ? 24 : 32, ...style }}>
      <div>
        {eyebrowText && <div style={{ ...eyebrow(C.textMuted), marginBottom: 12 }}>{eyebrowText}</div>}
        <H style={small ? h3 : h2}>{title}</H>
      </div>
      {aside}
    </div>
  )
}

/** Paragraph copy. */
export function Prose({ x, text, style = {} }) {
  const paras = paragraphs(text)
  if (paras.length === 0) return null
  return (
    <div className="crew-prose" style={{ fontSize: 18, lineHeight: 1.7, color: x.C.textDim, maxWidth: '66ch', ...style }}>
      {paras.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

/** Numbered steps from what_to_expect JSON; prose when it isn't a list. */
export function Steps({ x, steps }) {
  const { C, F } = x
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 24 }}>
      {steps.map((s, i) => (
        <li key={i} style={{ display: 'grid', gridTemplateColumns: '48px minmax(0, 1fr)', gap: 20, alignItems: 'start' }}>
          <span aria-hidden="true" style={{ width: 48, height: 48, borderRadius: '50%', background: C.inverseBg, color: C.inverseText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 22 }}>{i + 1}</span>
          <div style={{ paddingTop: 6 }}>
            {s.title && <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, lineHeight: 1.05, textTransform: 'uppercase', margin: '0 0 6px' }}>{s.title}</h3>}
            {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 17, lineHeight: 1.65 }}>{s.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Question list, as on the home page. */
export function FaqList({ x, faqs, open = false }) {
  const { C } = x
  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      {faqs.map((f, i) => (
        <details key={i} open={open || undefined} style={{ borderBottom: `1px solid ${C.border}`, paddingBlock: 18 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: 19, listStyle: 'revert' }}>{f.question}</summary>
          <p style={{ margin: '12px 0 0', color: C.textDim, maxWidth: '64ch' }}>{f.answer}</p>
        </details>
      ))}
    </div>
  )
}

/**
 * The quote card beside an inner page's copy: both routes to act, opening
 * hours and the facts the data holds. Optional links underneath.
 */
export function QuoteCard({ x, context, facts = [], links = [] }) {
  const { c, T, C, F, btn, biz, phone, phoneDisplay, quoteHref, eyebrow } = x
  return (
    <aside className="crew-aside" style={{ top: (c.chrome_offset || 0) + 100, background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, padding: 'clamp(24px, 3vw, 32px)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
      {context && <div style={eyebrow(C.textMuted)}>{context}</div>}
      <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 36, lineHeight: 1, textTransform: 'uppercase', margin: context ? '10px 0 0' : 0 }}>Get a quote</div>
      <div style={{ display: 'grid', gap: 10, marginTop: 22 }}>
        {phone && <a href={`tel:${phone}`} style={{ ...btn, background: C.accent, color: C.onAccent }}><PhoneIcon /> Call {phoneDisplay}</a>}
        <a href={quoteHref} style={{ ...btn, color: C.text, border: `2px solid ${C.text}` }}>Request a quote online</a>
      </div>
      {biz.hours_display && <p style={{ margin: '16px 0 0', fontSize: 15, color: C.textDim }}>{biz.hours_display}</p>}
      {facts.length > 0 && (
        <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: '22px 0 0', borderTop: `1px solid ${C.borderLight}`, display: 'grid', gap: 12 }}>
          {facts.map((f, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>
              <span style={{ color: C.text, marginTop: 1 }}><CheckIcon /></span><span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      {links.length > 0 && (
        <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: '22px 0 0', borderTop: `1px solid ${C.borderLight}`, display: 'grid', gap: 12 }}>
          {links.map((l, i) => (
            <li key={i}>
              <a href={l.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, color: C.text, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
                <span>{l.label}</span><ArrowIcon size={16} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

/**
 * The facts on their own, under the page header, for a page with no written
 * copy (the header already carries both routes to act). Nothing when there
 * are no facts.
 */
export function FactStrip({ x, facts = [], links = [] }) {
  const { C, wrap } = x
  if (facts.length === 0 && links.length === 0) return null
  return (
    <section style={{ background: C.surface, borderBottom: `1px solid ${C.borderLight}` }}>
      <ul style={{ ...wrap, listStyle: 'none', marginBlock: 0, paddingBlock: 24, display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
        {facts.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>
            <span style={{ color: C.text, marginTop: 1 }}><CheckIcon /></span><span>{f}</span>
          </li>
        ))}
        {links.map((l, i) => (
          <li key={`l${i}`}>
            <a href={l.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: C.text, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>{l.label} <ArrowIcon size={16} /></a>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** A service card, with its photo or a quiet tool tile at the same size. */
export function ServiceCard({ x, s, href, title, cta = 'Learn more →', summary = true }) {
  const { T, C, F, imgs } = x
  const img = imgs[`service_${s.slug}`]
  return (
    <a className="crew-card" href={href} style={{ display: 'flex', flexDirection: 'column', background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, overflow: 'hidden', color: C.text, textDecoration: 'none', height: '100%' }}>
      {img ? (
        <img src={img.url} alt={img.alt || s.name} style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }} />
      ) : (
        // No photo for this service: a quiet tile at the same size, so the grid
        // stays even. A tool mark, not text, since it carries no information.
        <div aria-hidden="true" style={{ aspectRatio: '16 / 10', background: C.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMuted }}>
          <WrenchIcon />
        </div>
      )}
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, lineHeight: 1.05, textTransform: 'uppercase', margin: 0 }}>{title || s.name}</h3>
        {summary && s.short && <p style={{ margin: 0, color: C.textDim, fontSize: 16, lineHeight: 1.55 }}>{s.short}</p>}
        {s.price_from && <div style={{ fontWeight: 700, color: C.accent }}>From {s.price_from}</div>}
        <span style={{ marginTop: 'auto', paddingTop: 8, fontWeight: 700, fontSize: 15, color: C.text }}>{cta}</span>
      </div>
    </a>
  )
}

/**
 * A text tile linking to a service-in-area or area page. The whole tile is
 * the link, so its anchor text reads "Termite Treatment in Olathe".
 */
export function LinkTile({ x, href, lead, title }) {
  const { T, C, F } = x
  return (
    <a className="crew-tile" href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 20px', background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, color: C.text, textDecoration: 'none', height: '100%', boxSizing: 'border-box' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        <span style={{ width: 40, height: 40, flex: 'none', borderRadius: '50%', background: C.surfaceAlt, color: C.textDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PinIcon /></span>
        <span style={{ minWidth: 0 }}>
          {lead && <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.textMuted, lineHeight: 1.3 }}>{lead} </span>}
          <span style={{ display: 'block', fontFamily: F.display, fontWeight: 700, fontSize: 24, lineHeight: 1.05, textTransform: 'uppercase' }}>{title}</span>
        </span>
      </span>
      <span style={{ color: C.textDim }}><ArrowIcon /></span>
    </a>
  )
}

/** Area chips, as on the home page, each linking to its area page. */
export function AreaChips({ x, areas, hrefFor }) {
  const { T, C } = x
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {areas.map(a => (
        <li key={a}>
          <a href={hrefFor ? hrefFor(a) : x.href.area(a)} style={{ display: 'inline-block', padding: '10px 18px', borderRadius: T.radius.full, background: C.surface, border: `1px solid ${C.border}`, fontWeight: 600, color: C.text, textDecoration: 'none' }}>{a}</a>
        </li>
      ))}
    </ul>
  )
}

/** Services grouped by category when there are more than six. */
export function ServiceGrid({ x, services, hrefFor, titleFor, cta, summary = true }) {
  const { F, C } = x
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const grouped = services.length > 6 && categories.length > 1
  const card = (s) => <ServiceCard key={s.slug} x={x} s={s} href={hrefFor(s)} title={titleFor ? titleFor(s) : undefined} cta={cta} summary={summary} />
  if (!grouped) return <div className="crew-services">{services.map(card)}</div>
  const uncategorised = services.filter(s => !s.category)
  return (
    <>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: 44 }}>
          <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, textTransform: 'uppercase', margin: '0 0 16px', color: C.textDim }}>{cat}</h3>
          <div className="crew-services">{services.filter(s => s.category === cat).map(card)}</div>
        </div>
      ))}
      {uncategorised.length > 0 && <div className="crew-services">{uncategorised.map(card)}</div>}
    </>
  )
}
