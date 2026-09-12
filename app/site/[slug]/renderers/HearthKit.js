import { hearthTokens } from '../../../templates/hearth/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { shiftLightnessUntil, pushUntil, mix } from '../../../../lib/templates/shared/palette.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { siteData, navItems, proofItems, paragraphs, listAreas } from './family/data.js'
import { PhoneIcon, Star, ArrowIcon, CheckIcon } from './CrewChrome.js'
import CrewMobileBar from './CrewMobileBar.js'

// The pieces every Hearth page shares: context (tokens, colours, links), the
// letterhead header, the closing "ticket", the livery footer, and the blocks
// inner pages are built from. Page content comes from family/data.js; this
// file only decides how it looks. Structure notes are in hearth/tokens.js.

const valid = (hex) => /^#[0-9a-f]{6}$/i.test(hex || '')

/** Tokens, colours and links for one Hearth page. */
export function hearthContext(c, siteSlug) {
  const d = siteData(c, siteSlug)
  const T = applyBrand(hearthTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  // The footer is the client's colour, deepened (same hue) until white text
  // on it reaches 8:1, so any brand colour gives a legible livery.
  const livery = valid(C.accent) ? shiftLightnessUntil(C.accent, true, ['#ffffff'], 8) : C.inverseBg
  const liveryText = '#ffffff'
  const liveryDim = pushUntil(mix(livery, '#ffffff', 0.72), '#ffffff', [livery], 5)
  const liveryRule = mix(livery, '#ffffff', 0.22)
  return {
    ...d, T, C, F, livery, liveryText, liveryDim, liveryRule,
    wrap: { maxWidth: 1320, margin: '0 auto', paddingInline: 'clamp(20px, 4vw, 40px)', boxSizing: 'border-box', width: '100%' },
    sectionPad: 'clamp(56px, 8vw, 104px)',
    eyebrow: (color) => ({ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }),
    h1: { fontFamily: F.display, fontWeight: 700, fontSize: T.type.hero, lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0, textWrap: 'balance' },
    h2: { fontFamily: F.display, fontWeight: 700, fontSize: T.type.display, lineHeight: 1.05, letterSpacing: '-0.005em', margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(24px, 2.4vw, 30px)', lineHeight: 1.12, margin: 0, textWrap: 'balance' },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: T.radius.md, padding: '15px 24px', fontSize: 17, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1.2, boxSizing: 'border-box' },
  }
}

export const btnPrimary = (x) => ({ ...x.btn, background: x.C.accent, color: x.C.onAccent, border: `2px solid ${x.C.accent}` })
export const btnOutline = (x, color) => ({ ...x.btn, background: 'transparent', color: color || x.C.text, border: `2px solid ${color || x.C.text}` })

// ---- Styles ------------------------------------------------------------------

function HearthStyles({ x }) {
  const { C, c } = x
  const top = c.chrome_offset || 0
  return (
    <>
      <link rel="stylesheet" href={hearthTokens.fontsHref} precedence="default" />
      <style>{`
        .hearth a:focus-visible, .hearth summary:focus-visible, .hearth button:focus-visible { outline: 3px solid ${C.text}; outline-offset: 3px; }
        .hearth img { max-width: 100%; }
        /* Photography that runs past the page edges must never make the page
           scroll sideways. clip, not hidden, so sticky still works. */
        .hearth { overflow-x: clip; }
        .h-letter { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 28px; }
        .h-navbar { position: sticky; top: ${top}px; z-index: 50; }
        .h-mobilecall, .h-menu { display: none; }
        .h-mobilecall { align-items: center; justify-content: center; }
        .h-menu > summary { list-style: none; }
        .h-menu > summary::-webkit-details-marker { display: none; }
        .h-menu[open] .h-menu-open { display: none; }
        .h-menu:not([open]) .h-menu-close { display: none; }
        .h-hero { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: clamp(32px, 5vw, 72px); align-items: center; }
        /* The hero photograph runs off the right edge of the screen: the page
           is a letterhead, and the picture is pasted across its edge. */
        .h-heroart { margin-right: calc((min(100vw, 1320px) - 100vw) / 2 - clamp(20px, 4vw, 40px)); }
        /* A band that spans the screen, for the featured review. */
        .h-bleed { width: 100vw; margin-inline: calc(50% - 50vw); }
        /* The story photograph holds still while the story scrolls past it. */
        .h-sticky { position: sticky; top: 96px; }
        .h-hero-solo { grid-template-columns: minmax(0, 1fr); }
        .h-btns { display: flex; flex-wrap: wrap; gap: 12px; }
        .h-ledger { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); }
        .h-ledger > div + div { border-left: 1px solid ${C.border}; }
        .h-index { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 0; }
        .h-index > li:nth-child(odd) { padding-right: clamp(24px, 3vw, 44px); border-right: 1px solid ${C.border}; }
        .h-index > li:nth-child(even) { padding-left: clamp(24px, 3vw, 44px); }
        .h-row { transition: background 120ms ease; }
        .h-row:hover { background: ${C.surface}; }
        .h-row:hover .h-row-arrow { transform: translateX(3px); }
        .h-row-arrow { transition: transform 120ms ease; }
        .h-story { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(36px, 6vw, 88px); align-items: center; }
        .h-reasons { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 clamp(32px, 5vw, 64px); }
        .h-reviews { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(32px, 5vw, 64px); align-items: start; }
        .h-dir { columns: 3 220px; column-gap: clamp(28px, 4vw, 56px); }
        .h-dir li { break-inside: avoid; }
        .h-detail { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 360px); gap: clamp(40px, 6vw, 88px); align-items: start; }
        .h-ticket { position: sticky; top: ${top + 76}px; }
        .h-foot { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr); gap: 40px; }
        .h-contact { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
        .h-close { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 32px; align-items: end; }
        .h-prose p { margin: 0 0 18px; }
        .h-prose p:last-child { margin-bottom: 0; }
        .h-faq summary { list-style: none; cursor: pointer; }
        .h-faq summary::-webkit-details-marker { display: none; }
        .h-faq[open] .h-plus-v { transform: scaleY(0); }
        .h-plus-v { transition: transform 150ms ease; transform-origin: center; }
        .crew-mobilebar { display: none !important; }
        @media (max-width: 1000px) {
          .h-hero, .h-story, .h-reviews, .h-detail, .h-contact { grid-template-columns: minmax(0, 1fr); }
          .h-heroart { margin-right: 0; }
          .h-sticky { position: static; }
          .h-ticket { position: static; }
          .h-navlinks { display: none !important; }
          .h-menu { display: block; }
        }
        @media (max-width: 860px) {
          .h-letter { grid-template-columns: minmax(0, 1fr) auto; gap: 12px; }
          .h-lettercontact, .h-letterbtn { display: none !important; }
          .h-mobilecall { display: inline-flex; }
          .h-letterwrap { position: sticky; top: ${top}px; z-index: 50; }
          .h-navbar { display: none; }
          .h-index { grid-template-columns: minmax(0, 1fr); }
          .h-index > li:nth-child(odd) { padding-right: 0; border-right: none; }
          .h-index > li:nth-child(even) { padding-left: 0; }
          .h-reasons { grid-template-columns: minmax(0, 1fr); }
          .h-foot { grid-template-columns: minmax(0, 1fr); gap: 28px; }
          .h-close { grid-template-columns: minmax(0, 1fr); }
        }
        @media (max-width: 720px) {
          .h-ledger { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .h-ledger > div + div { border-left: none; }
          .h-ledger > div:nth-child(even) { border-left: 1px solid ${C.border}; }
          .h-ledger > div:nth-child(n+3) { border-top: 1px solid ${C.border}; }
          .h-btns a { flex: 1 1 100%; }
          .crew-mobilebar { display: grid !important; }
          .h-logo img { height: 38px !important; }
          .h-logotext { font-size: 22px !important; }
        }
        @media (prefers-reduced-motion: reduce) { .hearth * { transition: none !important; } }
      `}</style>
    </>
  )
}

// ---- Chrome ------------------------------------------------------------------

function Logo({ x }) {
  const { T, C, F, logo, name, href } = x
  return (
    <a className="h-logo" href={href.home} style={{ textDecoration: 'none', color: C.text, display: 'flex', alignItems: 'center', minWidth: 0 }}>
      {logo ? (
        <span style={{ background: C.logoPlate, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.sm, padding: '6px 10px', display: 'inline-flex' }}>
          <img src={logo} alt={name} style={{ height: 48, width: 'auto', display: 'block' }} />
        </span>
      ) : (
        <span className="h-logotext" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 28, lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
      )}
    </a>
  )
}

function Menu({ x, items, current }) {
  const { T, C, href, quoteHref, quoteLabel } = x
  const link = { padding: '14px 16px', fontSize: 18, fontWeight: 600, color: C.text, textDecoration: 'none', borderBottom: `1px solid ${C.borderLight}` }
  return (
    <details className="h-menu" style={{ position: 'static' }}>
      <summary aria-label="Menu" style={{ cursor: 'pointer', width: 48, height: 48, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.text}`, borderRadius: T.radius.md, color: C.text }}>
        <svg className="h-menu-open" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg className="h-menu-close" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </summary>
      <nav aria-label="Menu" style={{ position: 'absolute', top: 'calc(100% + 1px)', left: 0, right: 0, background: C.surface, borderTop: `1px solid ${C.text}`, borderBottom: `3px double ${C.text}`, boxShadow: '0 18px 40px rgba(0,0,0,0.14)', padding: '6px clamp(20px, 4vw, 40px) 16px', display: 'grid' }}>
        <a href={href.home} style={link}>Home</a>
        {items.map(it => <a key={it.key} href={it.href} aria-current={current === it.key ? 'page' : undefined} style={link}>{it.label}</a>)}
        <a href={href.contact} style={link}>Contact</a>
        <a href={quoteHref} style={{ ...btnPrimary(x), marginTop: 14 }}>{quoteLabel}</a>
      </nav>
    </details>
  )
}

/**
 * Letterhead: logo, the phone number set large with the hours under it, and
 * the main button; the ruled menu bar beneath stays at the top on scroll. On
 * phones the letterhead itself sticks, with a call button and the menu.
 */
function Header({ x, current }) {
  const { C, F, wrap, biz, phone, phoneDisplay, second, emergency } = x
  const items = navItems(x)
  const sub = [biz.hours_display, emergency].filter(Boolean).join(' · ')
  return (
    <>
      <div className="h-letterwrap" style={{ background: C.bg }}>
        <div className="h-letter" style={{ ...wrap, paddingBlock: 18, position: 'relative' }}>
          <Logo x={x} />
          {phone ? (
            <a className="h-lettercontact" href={`tel:${phone}`} style={{ textDecoration: 'none', color: C.text, textAlign: 'right', display: 'block' }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textDim }}>Call us</span>
              <span style={{ display: 'block', fontFamily: F.display, fontWeight: 700, fontSize: 30, lineHeight: 1.1 }}>{phoneDisplay}</span>
              {sub && <span style={{ display: 'block', fontSize: 14, color: C.textDim, marginTop: 2 }}>{sub}</span>}
            </a>
          ) : <span />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a className="h-letterbtn" href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnPrimary(x)}>{second.label}</a>
            {phone && (
              <a className="h-mobilecall" href={`tel:${phone}`} aria-label={`Call ${phoneDisplay}`} style={{ ...btnPrimary(x), display: undefined, width: 48, height: 48, padding: 0 }}>
                <PhoneIcon size={20} />
              </a>
            )}
            <Menu x={x} items={items} current={current} />
          </div>
        </div>
      </div>
      <div className="h-navbar" style={{ background: C.bg, borderTop: `1px solid ${C.text}`, borderBottom: `3px double ${C.text}` }}>
        <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, minHeight: 52 }}>
          <nav className="h-navlinks" aria-label="Main" style={{ display: 'flex', gap: 'clamp(18px, 3vw, 36px)', alignItems: 'stretch', alignSelf: 'stretch' }}>
            <a href={x.href.home} aria-current={current === 'home' ? 'page' : undefined} style={navLink(x, current === 'home')}>Home</a>
            {items.map(it => <a key={it.key} href={it.href} aria-current={current === it.key ? 'page' : undefined} style={navLink(x, current === it.key)}>{it.label}</a>)}
            <a href={x.href.contact} aria-current={current === 'contact' ? 'page' : undefined} style={navLink(x, current === 'contact')}>Contact</a>
          </nav>
          {phone && (
            <a href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: C.text, fontWeight: 700, fontSize: 16, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              <PhoneIcon size={16} /> {phoneDisplay}
            </a>
          )}
        </div>
      </div>
    </>
  )
}

const navLink = (x, active) => ({
  display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: active ? x.C.text : x.C.textDim, textDecoration: 'none', boxShadow: active ? `inset 0 -3px 0 ${x.C.accent}` : 'none', paddingBlock: 12,
})

/**
 * The closing ticket: a ruled card with the phone number, the main button
 * and the hours, on the alternate ground. Every page ends here.
 */
function CloseTicket({ x }) {
  const { C, F, wrap, eyebrow, name, primaryArea, biz, phone, phoneDisplay, second, quoteHref, quoteLabel } = x
  return (
    <section id="contact" style={{ background: C.bgAlt, paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
      <div style={wrap}>
        <div className="h-close" style={{ background: C.surface, border: `2px solid ${C.text}`, outline: `1px solid ${C.text}`, outlineOffset: -9, padding: 'clamp(28px, 5vw, 56px)' }}>
          <div>
            <div style={eyebrow(C.textDim)}>{primaryArea ? `${name} · ${primaryArea}` : name}</div>
            <h2 style={{ ...x.h2, marginTop: 12 }}>{phone ? 'Give us a call' : 'Get in touch'}</h2>
            {phone && (
              <a href={`tel:${phone}`} style={{ display: 'inline-block', marginTop: 14, fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(34px, 4.6vw, 56px)', lineHeight: 1, color: C.text, textDecoration: 'none' }}>{phoneDisplay}</a>
            )}
            {biz.hours_display && <p style={{ margin: '14px 0 0', color: C.textDim }}>{biz.hours_display}</p>}
          </div>
          <div className="h-btns">
            {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call now</a>}
            <a href={second.external ? quoteHref : second.href} style={btnOutline(x)}>{second.external ? quoteLabel : second.label}</a>
            {second.external && <a href={second.href} rel="noopener" style={btnOutline(x)}>{second.label}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ x }) {
  const { c, F, wrap, name, biz, phone, phoneDisplay, services, areas, href, license, since, livery, liveryText, liveryDim, liveryRule } = x
  const head = { fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: liveryDim, marginBottom: 14 }
  const link = { color: liveryText, textDecoration: 'none' }
  return (
    <footer style={{ background: livery, color: liveryText, fontSize: 16 }}>
      <div className="h-foot" style={{ ...wrap, paddingBlock: 56 }}>
        <div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 28, lineHeight: 1.1 }}>{name}</div>
          {since && <div style={{ marginTop: 6, color: liveryDim, fontSize: 15 }}>{since}</div>}
          <div style={{ marginTop: 18, display: 'grid', gap: 4, color: liveryDim }}>
            {biz.address_line && <div>{biz.address_line}</div>}
            {phone && <div><a href={`tel:${phone}`} style={{ ...link, fontWeight: 700 }}>{phoneDisplay}</a></div>}
            {biz.email && <div><a href={`mailto:${biz.email}`} style={link}>{biz.email}</a></div>}
            {license && <div>License {license}</div>}
          </div>
        </div>
        {services.length > 0 && (
          <div>
            <div style={head}>{x.offeringLabel}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
              {services.slice(0, 8).map(s => <li key={s.slug}><a href={href.service(s.slug)} style={link}>{s.name}</a></li>)}
            </ul>
          </div>
        )}
        {areas.length > 0 && (
          <div>
            <div style={head}>Areas</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
              {areas.slice(0, 8).map(a => <li key={a}><a href={href.area(a)} style={link}>{a}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div style={{ ...wrap, paddingBlock: '18px 96px', borderTop: `1px solid ${liveryRule}`, fontSize: 14, color: liveryDim }}>
        © {new Date().getFullYear()} {biz.legal_name || name}
      </div>
    </footer>
  )
}

/**
 * One Hearth page: styles, structured data (never on a concept), letterhead,
 * the page's sections, the closing ticket, footer and the phone call bar.
 */
export function HearthPage({ x, current, schemas = [], children, close = true }) {
  const { c, C, F, T, concept, phone, phoneDisplay, quoteHref } = x
  return (
    <>
      <HearthStyles x={x} />
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />
      <div className="hearth" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: T.type.base, lineHeight: 1.6, minHeight: '100vh' }}>
        <Header x={x} current={current} />
        <main>{children}</main>
        {close && <CloseTicket x={x} />}
        <Footer x={x} />
      </div>
      <CrewMobileBar phone={phone} phoneDisplay={phoneDisplay} quoteHref={quoteHref} colors={C} fontFamily={F.body} />
    </>
  )
}

// ---- Blocks ------------------------------------------------------------------

/** A photo in a paper mat with a hairline, like a framed print. */
export function Framed({ x, image, ratio = '4 / 5', priority = false, children }) {
  const { C } = x
  return (
    <figure style={{ margin: 0, position: 'relative', background: C.surface, padding: 'clamp(8px, 1.2vw, 12px)', border: `1px solid ${C.border}`, boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 18px 40px -24px rgba(0,0,0,0.35)' }}>
      <img src={image.url} alt={image.alt || ''} {...(priority ? { fetchPriority: 'high', loading: 'eager' } : { loading: 'lazy' })} decoding="async" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block' }} />
      {children}
    </figure>
  )
}

/** The founding-year seal. Only with a year from the data. */
export function Seal({ x, style = {} }) {
  const { C, F, year, c } = x
  if (!year) return null
  const family = c.business?.family_owned === true
  return (
    <div aria-label={`${family ? 'Family-owned since' : 'Established'} ${year}`} role="img" style={{ width: 128, height: 128, borderRadius: '50%', background: C.surface, border: `2px solid ${C.secondary}`, boxShadow: `0 0 0 5px ${C.surface}, 0 0 0 6px ${C.secondary}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: C.text, ...style }}>
      <span aria-hidden="true" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.textDim }}>{family ? 'Family-owned' : 'Established'}</span>
      <span aria-hidden="true" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 36, lineHeight: 1, marginTop: 4 }}>{year}</span>
    </div>
  )
}

/** Visible breadcrumbs. Crumb urls are site-relative (from the seo helpers). */
export function Breadcrumbs({ x, crumbs }) {
  const { C, base } = x
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 14, fontWeight: 600 }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px' }}>
        {crumbs.map((cr, i) => {
          const last = i === crumbs.length - 1
          const url = cr.url === '/' ? base : `${base}${cr.url}`
          return (
            <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: C.textDim }}>
              {last ? <span aria-current="page" style={{ color: C.text }}>{cr.name}</span> : <a href={url} style={{ color: C.textDim }}>{cr.name}</a>}
              {!last && <span aria-hidden="true">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Eyebrow with a short brass rule, then the heading. */
export function SectionHead({ x, eyebrow: text, title, as = 'h2', small = false, aside, style = {} }) {
  const { C, eyebrow } = x
  const H = as
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: small ? 22 : 32, ...style }}>
      <div style={{ minWidth: 0 }}>
        {text && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span aria-hidden="true" style={{ width: 28, height: 2, background: C.secondary, flex: 'none' }} />
            <span style={eyebrow(C.textDim)}>{text}</span>
          </div>
        )}
        <H style={small ? x.h3 : x.h2}>{title}</H>
      </div>
      {aside}
    </div>
  )
}

export const textLink = (x) => ({ color: x.C.text, fontWeight: 700, textDecoration: 'underline', textDecorationColor: x.C.secondary, textDecorationThickness: 2, textUnderlineOffset: 5 })

/** Paragraph copy. */
export function Prose({ x, text, style = {} }) {
  const paras = Array.isArray(text) ? text : paragraphs(text)
  if (paras.length === 0) return null
  return (
    <div className="h-prose" style={{ fontSize: 18, lineHeight: 1.72, color: x.C.textDim, maxWidth: '64ch', ...style }}>
      {paras.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

/** The page header of an inner page: text on the paper ground, photo framed beside it. */
export function PageHero({ x, image, crumbs, eyebrow: text, title, support, badge, actions = 'both', showProof = true, children }) {
  const { C, wrap, eyebrow, phone, phoneDisplay, second } = x
  const proof = showProof ? proofItems(x).slice(0, 3) : []
  return (
    <section data-hero="" style={{ borderBottom: `1px solid ${C.border}` }}>
      <div className={`h-hero${image ? '' : ' h-hero-solo'}`} style={{ ...wrap, paddingBlock: 'clamp(32px, 5vw, 64px) clamp(40px, 6vw, 72px)' }}>
        <div style={{ maxWidth: 760 }}>
          {crumbs && <Breadcrumbs x={x} crumbs={crumbs} />}
          {(text || badge) && (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: crumbs ? 'clamp(24px, 4vw, 40px)' : 0 }}>
              {text && <span style={eyebrow(C.textDim)}>{text}</span>}
              {badge && <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', border: `1.5px solid ${C.text}`, color: C.text }}>{badge}</span>}
            </div>
          )}
          <h1 style={{ ...x.h1, fontSize: 'clamp(36px, 5vw, 62px)', marginTop: 12 }}>{title}</h1>
          {support && <p style={{ fontSize: 'clamp(18px, 1.6vw, 20px)', lineHeight: 1.55, color: C.textDim, margin: '18px 0 0', maxWidth: '50ch' }}>{support}</p>}
          {actions !== 'none' && (
            <div className="h-btns" style={{ marginTop: 28 }}>
              {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call {phoneDisplay}</a>}
              {actions === 'both' && <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnOutline(x)}>{second.label}</a>}
            </div>
          )}
          {proof.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexWrap: 'wrap', gap: '6px 22px', fontSize: 15, fontWeight: 600, color: C.textDim }}>
              {proof.map((p, i) => <li key={i}>{p.kind === 'rating' ? `${p.value} ★ · ${p.label}` : p.kind === 'since' ? `${p.label} ${p.value}` : `${p.value} ${p.label}`}</li>)}
              {x.statedOnTheirSite && <li style={{ fontWeight: 400 }}>(rating from your current site)</li>}
            </ul>
          )}
          {children}
        </div>
        {image && <Framed x={x} image={image} ratio="4 / 3" priority />}
      </div>
    </section>
  )
}

/** Numbered steps on a vertical rule, like entries in a ledger. */
export function Steps({ x, steps }) {
  const { C, F } = x
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
      {steps.map((s, i) => (
        <li key={i} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: 20, paddingBottom: i === steps.length - 1 ? 0 : 28, position: 'relative' }}>
          {i < steps.length - 1 && <span aria-hidden="true" style={{ position: 'absolute', left: 21, top: 44, bottom: 0, width: 2, background: C.border }} />}
          <span aria-hidden="true" style={{ width: 44, height: 44, borderRadius: '50%', border: `2px solid ${C.text}`, background: C.surface, color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 700, fontSize: 20, position: 'relative' }}>{i + 1}</span>
          <div style={{ paddingTop: 7 }}>
            {s.title && <h3 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 23, lineHeight: 1.15, margin: '0 0 6px' }}>{s.title}</h3>}
            {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 17, lineHeight: 1.65, maxWidth: '62ch' }}>{s.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Questions as a ruled list with plus marks. */
export function FaqList({ x, faqs, open = false }) {
  const { C, F } = x
  return (
    <div style={{ borderTop: `2px solid ${C.text}` }}>
      {faqs.map((f, i) => (
        <details key={i} className="h-faq" open={open || undefined} style={{ borderBottom: `1px solid ${C.border}` }}>
          <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, paddingBlock: 20 }}>
            <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, lineHeight: 1.25 }}>{f.question}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: 5 }}>
              <rect x="2" y="9" width="16" height="2" fill="currentColor" />
              <rect className="h-plus-v" x="9" y="2" width="2" height="16" fill="currentColor" />
            </svg>
          </summary>
          <p style={{ margin: '0 0 22px', color: C.textDim, maxWidth: '64ch', fontSize: 17, lineHeight: 1.7 }}>{f.answer}</p>
        </details>
      ))}
    </div>
  )
}

/**
 * The service ticket beside an inner page's copy: a header strip in the
 * client's colour, both ways to act, the hours and the facts the data holds.
 */
export function Ticket({ x, context, facts = [], links = [] }) {
  const { C, F, biz, phone, phoneDisplay, second, livery, liveryText, liveryDim } = x
  return (
    <aside className="h-ticket" style={{ background: C.surface, border: `2px solid ${C.text}` }}>
      <div style={{ background: livery, color: liveryText, padding: '18px 24px' }}>
        {context && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: liveryDim }}>{context}</div>}
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 28, lineHeight: 1.1, marginTop: context ? 6 : 0 }}>Book a visit</div>
      </div>
      <div style={{ padding: '22px 24px 24px' }}>
        <div style={{ display: 'grid', gap: 10 }}>
          {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call {phoneDisplay}</a>}
          <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnOutline(x)}>{second.external ? second.label : 'Request a visit online'}</a>
        </div>
        {biz.hours_display && <p style={{ margin: '16px 0 0', fontSize: 15, color: C.textDim }}>{biz.hours_display}</p>}
        {facts.length > 0 && (
          <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: 0, borderTop: `1px dashed ${C.border}` }}>
            {facts.map((f, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, fontWeight: 600, lineHeight: 1.45, paddingBlock: 11, borderBottom: `1px dashed ${C.border}` }}>
                <span style={{ color: C.text, marginTop: 1 }}><CheckIcon size={17} /></span><span>{f}</span>
              </li>
            ))}
          </ul>
        )}
        {links.length > 0 && (
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: 12 }}>
            {links.map((l, i) => (
              <li key={i}><a href={l.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, color: C.text, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}><span>{l.label}</span><ArrowIcon size={16} /></a></li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}

/** The facts on their own, as a ruled strip, for a page with no written copy. */
export function FactStrip({ x, facts = [], links = [] }) {
  const { C, wrap } = x
  if (facts.length === 0 && links.length === 0) return null
  return (
    <section style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
      <ul style={{ ...wrap, listStyle: 'none', marginBlock: 0, paddingBlock: 24, display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
        {facts.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>
            <span style={{ color: C.text, marginTop: 1 }}><CheckIcon /></span><span>{f}</span>
          </li>
        ))}
        {links.map((l, i) => (
          <li key={`l${i}`}><a href={l.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: C.text, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>{l.label} <ArrowIcon size={16} /></a></li>
        ))}
      </ul>
    </section>
  )
}

/** The proof ledger: up to four facts across a ruled band. */
export function Ledger({ x, items, note }) {
  const { C, F, wrap } = x
  if (!items.length && !note) return null
  return (
    <section style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ ...wrap, paddingBlock: 8 }}>
        <div className="h-ledger" style={{ '--n': Math.max(1, items.length + (note ? 1 : 0)) }}>
          {items.map((p, i) => (
            <div key={i} style={{ padding: '20px clamp(16px, 2.4vw, 28px)' }}>
              <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                {p.value}{p.kind === 'rating' && <Star size={24} />}
              </div>
              <div style={{ fontSize: 15, color: C.textDim, marginTop: 8, lineHeight: 1.4 }}>{p.label}</div>
            </div>
          ))}
          {note && <div style={{ padding: '14px clamp(16px, 2.4vw, 28px)' }}>{note}</div>}
        </div>
      </div>
    </section>
  )
}

/**
 * Services as a ruled index, like a price board: name, a line about it, a
 * starting price when the data has one, and a thumbnail only when there is a
 * real photo (no placeholder art).
 */
export function ServiceIndex({ x, services, hrefFor, titleFor, summary = true }) {
  const { C, F, imgs } = x
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const grouped = services.length > 6 && categories.length > 1
  const row = (s) => {
    // Their own photo only: a stock thumbnail this small can't carry the
    // concept's "Sample photo" tag, so it would pass as theirs.
    const own = imgs[`service_${s.slug}`]
    const img = own && !/images\.unsplash\.com\//.test(own.url || '') ? own : null
    return (
      <li key={s.slug} style={{ borderBottom: `1px solid ${C.border}` }}>
        <a className="h-row" href={hrefFor(s)} style={{ display: 'grid', gridTemplateColumns: img ? '64px minmax(0, 1fr) auto' : 'minmax(0, 1fr) auto', gap: 18, alignItems: 'center', padding: '18px 8px', color: C.text, textDecoration: 'none' }}>
          {img && <img src={img.url} alt="" loading="lazy" style={{ width: 64, height: 64, objectFit: 'cover', display: 'block', border: `1px solid ${C.border}` }} />}
          <span style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 23, lineHeight: 1.2 }}>{titleFor ? titleFor(s) : s.name}</span>
            {summary && s.short && <span style={{ display: 'block', fontSize: 16, color: C.textDim, lineHeight: 1.5, marginTop: 4 }}>{s.short}</span>}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 14, whiteSpace: 'nowrap' }}>
            {s.price_from && <span style={{ fontWeight: 700, fontSize: 16 }}>From {s.price_from}</span>}
            <span className="h-row-arrow" style={{ color: C.text, display: 'inline-flex' }}><ArrowIcon /></span>
          </span>
        </a>
      </li>
    )
  }
  const list = (items) => <ul className="h-index" style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `2px solid ${C.text}` }}>{items.map(row)}</ul>
  if (!grouped) return list(services)
  const uncategorised = services.filter(s => !s.category)
  return (
    <div style={{ display: 'grid', gap: 44 }}>
      {categories.map(cat => (
        <div key={cat}>
          <h3 style={{ ...x.eyebrow(C.textDim), margin: '0 0 12px' }}>{cat}</h3>
          {list(services.filter(s => s.category === cat))}
        </div>
      ))}
      {uncategorised.length > 0 && list(uncategorised)}
    </div>
  )
}

/** Areas (or any list of links) as a directory in columns. */
export function Directory({ x, items }) {
  const { C, F } = x
  return (
    <ul className="h-dir" style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `2px solid ${C.text}` }}>
      {items.map(it => (
        <li key={it.key || it.href} style={{ borderBottom: `1px solid ${C.border}` }}>
          <a className="h-row" href={it.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 6px', color: C.text, textDecoration: 'none' }}>
            <span style={{ minWidth: 0 }}>
              {it.lead && <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.textDim, lineHeight: 1.3 }}>{it.lead}</span>}
              <span style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 21, lineHeight: 1.2 }}>{it.label}</span>
            </span>
            <span className="h-row-arrow" style={{ display: 'inline-flex', flex: 'none' }}><ArrowIcon size={16} /></span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export const areaItems = (x, areas, hrefFor, lead) => areas.map(a => ({ key: a, href: hrefFor ? hrefFor(a) : x.href.area(a), label: a, lead }))

export { ConceptNote, listAreas }

/** A concept note in Hearth's shape. */
export function Note({ x, title, children, minHeight }) {
  return <ConceptNote T={x.T} title={title} minHeight={minHeight} style={{ borderRadius: 0, background: x.C.surface }}>{children}</ConceptNote>
}
