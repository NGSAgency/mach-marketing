import { levelTokens } from '../../../templates/level/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { siteData, navItems, proofItems, paragraphs } from './family/data.js'
import { PhoneIcon, Star, ArrowIcon, CheckIcon } from './CrewChrome.js'
import CrewMobileBar from './CrewMobileBar.js'

// The pieces every Level page shares: context, the slim header, the section
// rail and quote band inner pages are built from, the closing panel that sits
// in the top of the footer, and the tiles. Page content comes from
// family/data.js; this file only decides how it looks. Structure notes are in
// level/tokens.js.

/** Tokens, colours and links for one Level page. */
export function levelContext(c, siteSlug) {
  const d = siteData(c, siteSlug)
  const T = applyBrand(levelTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  return {
    ...d, T, C, F,
    wrap: { maxWidth: 1320, margin: '0 auto', paddingInline: 'clamp(20px, 4vw, 40px)', boxSizing: 'border-box', width: '100%' },
    sectionPad: 'clamp(56px, 8vw, 104px)',
    eyebrow: (color) => ({ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color }),
    h1: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.hero, maxWidth: '15ch', lineHeight: 1.02, letterSpacing: '-0.035em', margin: 0, textWrap: 'balance' },
    h2: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.display, lineHeight: 1.06, letterSpacing: '-0.03em', margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(21px, 2.1vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0, textWrap: 'balance' },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: T.radius.full, padding: '15px 26px', fontSize: 17, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1.2, boxSizing: 'border-box' },
    card: { background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, boxSizing: 'border-box' },
  }
}

export const btnPrimary = (x) => ({ ...x.btn, background: x.C.accent, color: x.C.onAccent, border: `2px solid ${x.C.accent}` })
export const btnQuiet = (x) => ({ ...x.btn, background: x.C.surface, color: x.C.text, border: `2px solid ${x.C.border}` })

// ---- Styles --------------------------------------------------------------------

function LevelStyles({ x }) {
  const { C, c } = x
  const top = c.chrome_offset || 0
  return (
    <>
      <link rel="stylesheet" href={levelTokens.fontsHref} precedence="default" />
      <style>{`
        .level a:focus-visible, .level summary:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 3px; }
        .level img { max-width: 100%; }
        /* Photography that runs past the page edges must never make the page
           scroll sideways. clip, not hidden, so sticky still works. */
        .level { overflow-x: clip; }
        .lv-head { position: sticky; top: ${top}px; z-index: 50; }
        .lv-nav { display: flex; }
        .lv-menu { display: none; }
        .lv-menu > summary { list-style: none; }
        .lv-menu > summary::-webkit-details-marker { display: none; }
        .lv-menu[open] .lv-menu-open { display: none; }
        .lv-menu:not([open]) .lv-menu-close { display: none; }
        .lv-btns { display: flex; flex-wrap: wrap; gap: 12px; }
        /* The top row uses the width: headline left, the line that supports it
           and both buttons right, rather than a narrow centred stack. */
        .lv-top { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 64px); align-items: end; }
        .lv-picker { display: flex; flex-wrap: wrap; gap: 10px; }
        /* Photography runs to both edges of the screen. */
        .lv-bleed { width: 100vw; margin-inline: calc(50% - 50vw); }
        .lv-rail { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 20px; position: relative; }
        .lv-bento { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .lv-bento > :first-child { grid-column: span 2; grid-row: span 2; }
        .lv-bento.lv-bento-flat > :first-child { grid-column: auto; grid-row: auto; }
        .lv-reviews { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 16px; align-items: stretch; }
        .lv-revcards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(230px, 100%), 1fr)); gap: 16px; }
        .lv-faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .lv-body { display: grid; grid-template-columns: minmax(0, 210px) minmax(0, 1fr); gap: clamp(32px, 5vw, 64px); align-items: start; }
        .lv-onpage { position: sticky; top: ${top + 92}px; }
        .lv-plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 16px; }
        .lv-foot { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr); gap: 40px; }
        .lv-quote { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; }
        .lv-prose p { margin: 0 0 18px; }
        .lv-prose p:last-child { margin-bottom: 0; }
        .lv-tile:hover { border-color: ${C.accent} !important; }
        .crew-mobilebar { display: none !important; }
        @media (max-width: 1000px) {
          .lv-nav { display: none; }
          .lv-menu { display: block; }
          .lv-body { grid-template-columns: minmax(0, 1fr); }
          .lv-onpage { display: none; }
          .lv-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .lv-reviews { grid-template-columns: minmax(0, 1fr); }
          .lv-top { grid-template-columns: minmax(0, 1fr); align-items: start; }
        }
        @media (max-width: 720px) {
          .lv-bento, .lv-faq { grid-template-columns: minmax(0, 1fr); }
          .lv-bento > :first-child { grid-column: auto; grid-row: auto; }
          .lv-rail { grid-template-columns: minmax(0, 1fr); }
          .lv-foot { grid-template-columns: minmax(0, 1fr); gap: 28px; }
          .lv-btns a { flex: 1 1 100%; }
          .crew-mobilebar { display: grid !important; }
          .lv-headbtn { display: none !important; }
          .lv-logotext { font-size: 21px !important; }
        }
        @media (prefers-reduced-motion: reduce) { .level * { transition: none !important; } }
      `}</style>
    </>
  )
}

// ---- Chrome --------------------------------------------------------------------

function Header({ x, current }) {
  const { T, C, F, wrap, href, logo, name, phone, phoneDisplay, second } = x
  const items = navItems(x)
  return (
    <header className="lv-head" style={{ background: C.bgTranslucent, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, paddingBlock: 14, position: 'relative' }}>
        <a href={href.home} style={{ display: 'flex', alignItems: 'center', minWidth: 0, textDecoration: 'none', color: C.text }}>
          {logo ? (
            <span style={{ background: C.logoPlate, borderRadius: T.radius.sm, padding: '5px 9px', display: 'inline-flex' }}>
              <img src={logo} alt={name} style={{ height: 38, width: 'auto', display: 'block' }} />
            </span>
          ) : (
            <span className="lv-logotext" style={{ fontFamily: F.display, fontWeight: 800, fontSize: 24, letterSpacing: '-0.035em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          )}
        </a>
        <nav className="lv-nav" aria-label="Main" style={{ gap: 6, alignItems: 'center' }}>
          {items.map(it => (
            <a key={it.key} href={it.href} aria-current={current === it.key ? 'page' : undefined}
              style={{ padding: '9px 14px', borderRadius: T.radius.full, fontSize: 16, fontWeight: 600, textDecoration: 'none', color: current === it.key ? C.text : C.textDim, background: current === it.key ? C.surfaceAlt : 'transparent' }}>{it.label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {phone && (
            <a href={`tel:${phone}`} style={{ ...btnQuiet(x), padding: '11px 18px', fontSize: 16 }}>
              <PhoneIcon size={17} /><span className="lv-headbtn">{phoneDisplay}</span>
            </a>
          )}
          <a className="lv-headbtn" href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={{ ...btnPrimary(x), padding: '11px 20px', fontSize: 16 }}>{second.label}</a>
          <details className="lv-menu">
            <summary aria-label="Menu" style={{ cursor: 'pointer', width: 46, height: 46, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.border}`, borderRadius: T.radius.full, color: C.text }}>
              <svg className="lv-menu-open" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              <svg className="lv-menu-close" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </summary>
            <nav aria-label="Menu" style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 'clamp(20px, 4vw, 40px)', width: 'min(330px, calc(100vw - 40px))', background: C.surface, border: `1px solid ${C.border}`, borderRadius: T.radius.lg, boxShadow: '0 20px 48px rgba(0,0,0,0.16)', padding: 10, display: 'grid', gap: 2 }}>
              <a href={href.home} style={{ padding: '13px 14px', borderRadius: T.radius.md, fontSize: 17, fontWeight: 600, color: C.text, textDecoration: 'none' }}>Home</a>
              {items.map(it => <a key={it.key} href={it.href} style={{ padding: '13px 14px', borderRadius: T.radius.md, fontSize: 17, fontWeight: 600, color: C.text, textDecoration: 'none' }}>{it.label}</a>)}
              <a href={href.contact} style={{ padding: '13px 14px', borderRadius: T.radius.md, fontSize: 17, fontWeight: 600, color: C.text, textDecoration: 'none' }}>Contact</a>
              <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={{ ...btnPrimary(x), marginTop: 8 }}>{second.label}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

/**
 * The closing panel, set into the top of the footer: the two ways to act and
 * the hours, on the client's colour.
 */
function Footer({ x }) {
  const { T, C, F, wrap, name, biz, phone, phoneDisplay, second, services, areas, href, license, since, quoteLabel, quoteHref } = x
  const head = { fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.inverseTextDim, marginBottom: 14 }
  const link = { color: C.inverseText, textDecoration: 'none' }
  return (
    <footer id="contact" style={{ background: C.inverseBg, color: C.inverseText, marginTop: 'clamp(56px, 8vw, 104px)' }}>
      <div style={{ ...wrap, transform: 'translateY(-44px)', marginBottom: -20 }}>
        <div style={{ background: C.accent, color: C.onAccent, borderRadius: T.radius.lg, padding: 'clamp(26px, 4vw, 44px)' }}>
          <div className="lv-quote">
            <div>
              <h2 style={{ ...x.h2, fontSize: 'clamp(26px, 3vw, 38px)' }}>{phone ? 'Call, or ask for a quote' : 'Ask for a quote'}</h2>
              {biz.hours_display && <p style={{ margin: '10px 0 0' }}>{biz.hours_display}</p>}
            </div>
            <div className="lv-btns">
              {phone && <a href={`tel:${phone}`} style={{ ...x.btn, background: C.surface, color: C.text }}><PhoneIcon /> {phoneDisplay}</a>}
              <a href={second.external ? quoteHref : second.href} style={{ ...x.btn, background: 'transparent', color: C.onAccent, border: `2px solid ${C.onAccent}` }}>{second.external ? quoteLabel : second.label}</a>
              {second.external && <a href={second.href} rel="noopener" style={{ ...x.btn, background: 'transparent', color: C.onAccent, border: `2px solid ${C.onAccent}` }}>{second.label}</a>}
            </div>
          </div>
        </div>
      </div>
      <div className="lv-foot" style={{ ...wrap, paddingBlock: '8px 48px' }}>
        <div>
          <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 24, letterSpacing: '-0.03em' }}>{name}</div>
          {since && <div style={{ marginTop: 6, color: C.inverseTextDim, fontSize: 15 }}>{since}</div>}
          <div style={{ marginTop: 16, display: 'grid', gap: 4, color: C.inverseTextDim, fontSize: 16 }}>
            {biz.address_line && <div>{biz.address_line}</div>}
            {phone && <div><a href={`tel:${phone}`} style={{ ...link, fontWeight: 700 }}>{phoneDisplay}</a></div>}
            {biz.email && <div><a href={`mailto:${biz.email}`} style={link}>{biz.email}</a></div>}
            {license && <div>License {license}</div>}
          </div>
        </div>
        {services.length > 0 && (
          <div>
            <div style={head}>{x.offeringLabel}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8, fontSize: 16 }}>
              {services.slice(0, 8).map(s => <li key={s.slug}><a href={href.service(s.slug)} style={link}>{s.name}</a></li>)}
            </ul>
          </div>
        )}
        {areas.length > 0 && (
          <div>
            <div style={head}>Areas</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8, fontSize: 16 }}>
              {areas.slice(0, 8).map(a => <li key={a}><a href={href.area(a)} style={link}>{a}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div style={{ ...wrap, paddingBlock: '18px 96px', borderTop: `1px solid ${C.inverseBorder}`, fontSize: 14, color: C.inverseTextDim }}>
        © {new Date().getFullYear()} {biz.legal_name || name}
      </div>
    </footer>
  )
}

/** One Level page: styles, structured data (never on a concept), header, the
 *  page's sections, the closing panel in the footer, and the phone call bar. */
export function LevelPage({ x, current, schemas = [], children }) {
  const { c, C, F, T, concept, phone, phoneDisplay, quoteHref } = x
  return (
    <>
      <LevelStyles x={x} />
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />
      <div className="level" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: T.type.base, lineHeight: 1.6, minHeight: '100vh' }}>
        <Header x={x} current={current} />
        <main>{children}</main>
        <Footer x={x} />
      </div>
      <CrewMobileBar phone={phone} phoneDisplay={phoneDisplay} quoteHref={quoteHref} colors={C} fontFamily={F.body} />
    </>
  )
}

// ---- Blocks --------------------------------------------------------------------

export function Breadcrumbs({ x, crumbs }) {
  const { C, base } = x
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 14, fontWeight: 600 }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px' }}>
        {crumbs.map((cr, i) => {
          const last = i === crumbs.length - 1
          const url = cr.url === '/' ? base : `${base}${cr.url}`
          return (
            <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: C.textDim }}>
              {last ? <span aria-current="page" style={{ color: C.text }}>{cr.name}</span> : <a href={url} style={{ color: C.textDim }}>{cr.name}</a>}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function SectionHead({ x, eyebrow: text, title, as = 'h2', small = false, aside, center = false, style = {} }) {
  const { C, eyebrow } = x
  const H = as
  return (
    <div style={{ display: 'flex', justifyContent: center ? 'center' : 'space-between', alignItems: center ? 'center' : 'flex-end', textAlign: center ? 'center' : 'left', gap: 20, flexWrap: 'wrap', marginBottom: small ? 20 : 30, flexDirection: center ? 'column' : 'row', ...style }}>
      <div style={{ minWidth: 0 }}>
        {text && <div style={{ ...eyebrow(C.textDim), marginBottom: 10 }}>{text}</div>}
        <H style={small ? x.h3 : x.h2}>{title}</H>
      </div>
      {aside}
    </div>
  )
}

export const textLink = (x) => ({ color: x.C.accent, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 })

export function Prose({ x, text, style = {} }) {
  const paras = Array.isArray(text) ? text : paragraphs(text)
  if (paras.length === 0) return null
  return (
    <div className="lv-prose" style={{ fontSize: 18, lineHeight: 1.72, color: x.C.textDim, maxWidth: '66ch', ...style }}>
      {paras.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

/** A photo in a rounded frame, the width of the page. */
export function Band({ x, image, ratio = '21 / 9', priority = false, children }) {
  const { T, C } = x
  return (
    <div style={{ position: 'relative', borderRadius: T.radius.lg, overflow: 'hidden', background: C.surfaceAlt }}>
      <img src={image.url} alt={image.alt || ''} {...(priority ? { fetchPriority: 'high', loading: 'eager' } : { loading: 'lazy' })} decoding="async"
        style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block' }} />
      {children}
    </div>
  )
}

/** The rating card that sits over the corner of the photo. Real data only. */
export function RatingCard({ x, style = {} }) {
  const { T, C, F } = x
  const rating = proofItems(x).find(p => p.kind === 'rating')
  if (!rating) return null
  return (
    <div style={{ position: 'absolute', left: 20, bottom: 20, background: C.surface, borderRadius: T.radius.md, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.18)', maxWidth: 'calc(100% - 40px)', ...style }}>
      <span style={{ fontFamily: F.display, fontWeight: 800, fontSize: 26, letterSpacing: '-0.03em', color: C.text, display: 'inline-flex', alignItems: 'center', gap: 5 }}>{rating.value}<Star size={19} /></span>
      <span style={{ fontSize: 14, color: C.textDim, lineHeight: 1.3 }}>{rating.label}{x.statedOnTheirSite ? <><br />(from your current site)</> : null}</span>
    </div>
  )
}

/** The picker under the hero: one tap to the service they came for. */
export function Picker({ x, services, label = 'What do you need?' }) {
  const { T, C, href, eyebrow } = x
  if (services.length === 0) return null
  return (
    <div style={{ ...x.card, padding: 'clamp(20px, 2.6vw, 30px)', boxShadow: '0 12px 34px -22px rgba(0,0,0,0.4)', width: '100%' }}>
      <div style={{ ...eyebrow(C.textDim), marginBottom: 16 }}>{label}</div>
      <ul className="lv-picker" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {services.map(s => (
          <li key={s.slug}>
            <a className="lv-tile" href={href.service(s.slug)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', borderRadius: T.radius.full, border: `1.5px solid ${C.border}`, background: C.bg, color: C.text, fontWeight: 600, textDecoration: 'none' }}>
              {s.name}<ArrowIcon size={15} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Numbered steps running across the page. */
export function StepRail({ x, steps }) {
  const { T, C, F } = x
  return (
    <ol className="lv-rail" style={{ listStyle: 'none', margin: 0, padding: 0, '--n': Math.min(4, steps.length) }}>
      {steps.slice(0, 4).map((s, i) => (
        <li key={i} style={{ ...x.card, padding: 'clamp(20px, 2.4vw, 28px)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: '50%', background: C.accentGlow, color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
          {s.title && <h3 style={{ ...x.h3, fontSize: 21 }}>{s.title}</h3>}
          {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 16.5, lineHeight: 1.6 }}>{s.description}</p>}
        </li>
      ))}
    </ol>
  )
}

/** Services as mixed-size tiles: the first one large. */
export function Tiles({ x, services, hrefFor, titleFor, summary = true, flat = false }) {
  const { T, C, F, imgs } = x
  const tile = (s, big) => {
    const img = imgs[`service_${s.slug}`]
    return (
      <a key={s.slug} className="lv-tile" href={hrefFor(s)} style={{ ...x.card, overflow: 'hidden', display: 'flex', flexDirection: 'column', color: C.text, textDecoration: 'none', minHeight: big ? 260 : 0 }}>
        {img && <img src={img.url} alt={img.alt || ''} loading="lazy" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block', flex: big ? '1 1 auto' : 'none', minHeight: big ? 200 : 0 }} />}
        <div style={{ padding: big ? 'clamp(20px, 2.4vw, 28px)' : '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <h3 style={{ ...x.h3, fontSize: big ? 'clamp(22px, 2.2vw, 28px)' : 20 }}>{titleFor ? titleFor(s) : s.name}</h3>
          {summary && s.short && <p style={{ margin: 0, color: C.textDim, fontSize: 16, lineHeight: 1.55 }}>{s.short}</p>}
          <span style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            {s.price_from
              ? <span style={{ fontWeight: 700, fontSize: 15, padding: '5px 11px', borderRadius: T.radius.full, background: C.accentGlow, color: C.text, fontVariantNumeric: 'tabular-nums' }}>From {s.price_from}</span>
              : <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>See details</span>}
            <span style={{ color: C.text }}><ArrowIcon size={17} /></span>
          </span>
        </div>
      </a>
    )
  }
  return (
    <div className={`lv-bento${flat || services.length < 3 ? ' lv-bento-flat' : ''}`}>
      {services.map((s, i) => tile(s, !flat && i === 0 && services.length >= 3))}
    </div>
  )
}

/** Area (or any link) chips. */
export function Chips({ x, items }) {
  const { T, C } = x
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {items.map(it => (
        <li key={it.key || it.href}>
          <a className="lv-tile" href={it.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', borderRadius: T.radius.full, background: C.surface, border: `1.5px solid ${C.border}`, color: C.text, fontWeight: 600, textDecoration: 'none' }}>
            {it.lead && <span style={{ color: C.textDim, fontWeight: 500 }}>{it.lead}</span>}{it.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export const areaChips = (x, areas, hrefFor, lead) => areas.map(a => ({ key: a, href: hrefFor ? hrefFor(a) : x.href.area(a), label: a, lead }))

/** Questions answered in the open, two to a row. */
export function FaqCards({ x, faqs }) {
  const { C } = x
  return (
    <div className="lv-faq">
      {faqs.map((f, i) => (
        <div key={i} style={{ ...x.card, padding: 'clamp(20px, 2.2vw, 26px)' }}>
          <h3 style={{ ...x.h3, fontSize: 20, marginBottom: 10 }}>{f.question}</h3>
          <p style={{ margin: 0, color: C.textDim, fontSize: 16.5, lineHeight: 1.65 }}>{f.answer}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * The full-width quote band between an inner page's sections: both ways to act
 * and the facts the data holds. Level's answer to a sidebar card.
 */
export function QuoteBand({ x, context, facts = [], links = [] }) {
  const { T, C, wrap, phone, phoneDisplay, second, eyebrow, biz } = x
  return (
    <section style={{ paddingBlock: 'clamp(28px, 4vw, 48px)' }}>
      <div style={wrap}>
        <div style={{ background: C.accentGlow, borderRadius: T.radius.lg, padding: 'clamp(24px, 3.4vw, 40px)' }}>
          <div className="lv-quote">
            <div style={{ minWidth: 0 }}>
              {context && <div style={eyebrow(C.textDim)}>{context}</div>}
              <h2 style={{ ...x.h2, fontSize: 'clamp(24px, 2.6vw, 34px)', marginTop: context ? 8 : 0 }}>Get a price for your place</h2>
              {biz.hours_display && <p style={{ margin: '10px 0 0', color: C.textDim }}>{biz.hours_display}</p>}
            </div>
            <div className="lv-btns">
              {phone && <a href={`tel:${phone}`} style={btnPrimary(x)}><PhoneIcon /> Call {phoneDisplay}</a>}
              <a href={second.href} {...(second.external ? { rel: 'noopener' } : {})} style={btnQuiet(x)}>{second.label}</a>
            </div>
          </div>
          {(facts.length > 0 || links.length > 0) && (
            <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: '20px 0 0', borderTop: `1px solid ${C.border}`, display: 'flex', flexWrap: 'wrap', gap: '10px 28px' }}>
              {facts.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 16, fontWeight: 600 }}>
                  <span style={{ color: C.accent, marginTop: 1 }}><CheckIcon size={17} /></span><span>{f}</span>
                </li>
              ))}
              {links.map((l, i) => (
                <li key={`l${i}`}><a href={l.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, ...textLink(x) }}>{l.label} <ArrowIcon size={15} /></a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/** The sticky "on this page" rail beside an inner page's copy. */
export function OnPage({ x, sections }) {
  const { C, eyebrow } = x
  const shown = sections.filter(Boolean)
  if (shown.length < 2) return <div />
  return (
    <nav className="lv-onpage" aria-label="On this page">
      <div style={{ ...eyebrow(C.textDim), marginBottom: 14 }}>On this page</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10, borderLeft: `2px solid ${C.border}` }}>
        {shown.map(s => (
          <li key={s.id}><a href={`#${s.id}`} style={{ display: 'block', paddingLeft: 14, marginLeft: -2, color: C.textDim, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>{s.label}</a></li>
        ))}
      </ul>
    </nav>
  )
}

/** A concept note in Level's shape. */
export function Note({ x, title, children, minHeight }) {
  return <ConceptNote T={x.T} title={title} minHeight={minHeight} style={{ background: x.C.surface, borderRadius: x.T.radius.lg }}>{children}</ConceptNote>
}

export { proofItems }
