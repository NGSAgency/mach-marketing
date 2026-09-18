import { railTokens } from '../../../templates/rail/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { siteData, navItems, proofItems, paragraphs } from './family/data.js'
import CrewMobileBar from './CrewMobileBar.js'

// RAIL's chrome: the page on the left, the rail pinned down the right edge.
// The rail is the family — the identity, the menu, the phone number, both
// buttons, and on an inner page a contents list, on screen for the whole
// visit. The content column comes first in the markup, so a crawler and a
// screen reader meet the page before the menu.

export function railContext(c, siteSlug) {
  const d = siteData(c, siteSlug, 'rail')
  const T = applyBrand(railTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  return {
    ...d, siteSlug, T, C, F,
    sectionPad: 'clamp(46px, 5.5vw, 78px)',
    gutter: 'clamp(26px, 4vw, 60px)',
    wrap: { paddingInline: 'clamp(26px, 4vw, 60px)' },
    label: (color) => ({ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color }),
    h1: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.hero, lineHeight: 1.02, letterSpacing: '-0.035em', margin: 0, textWrap: 'balance' },
    h2: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.display, lineHeight: 1.08, letterSpacing: '-0.03em', margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(17px, 1.7vw, 19.5px)', lineHeight: 1.25, letterSpacing: '-0.02em', margin: 0 },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: T.radius.md, padding: '14px 20px', fontSize: 16, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1.2, boxSizing: 'border-box', border: '1.5px solid transparent', textAlign: 'center' },
  }
}

export const btnAccent = (x) => ({ ...x.btn, background: x.C.accent, color: x.C.onAccent, borderColor: x.C.accent })
export const btnOutline = (x) => ({ ...x.btn, background: 'transparent', color: x.C.text, borderColor: x.C.border })
export const btnOnPlate = (x) => ({ ...x.btn, background: x.C.onAccent, color: x.C.accent, borderColor: x.C.onAccent })
export const textLink = (x) => ({ color: x.C.accent, textDecoration: 'underline', textUnderlineOffset: 4 })

function RailStyles({ x }) {
  const { C, c } = x
  const top = c.chrome_offset || 0
  return (
    <>
      <link rel="stylesheet" href={railTokens.fontsHref} precedence="default" />
      <style>{`
        .rl a:focus-visible, .rl summary:focus-visible, .rl button:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 3px; }

        /* The skip link is in the layout and in the accessibility tree the
           whole time; only its paint is switched. Clipping it does not work:
           clip leaves the text's layout box where it was, so a contrast audit
           still measures the link's colour against whatever pixel sits behind
           it — on a page opening on the accent plate, 2.7:1. Transparent, it
           paints nothing and measures nothing, a screen reader still reads it,
           and pointer-events keeps it from catching a stray click. */
        .rl-skip { position: absolute; top: 0; left: 0; z-index: 99; padding: 12px 20px;
                   font-weight: 700; background: ${C.accent}; color: ${C.onAccent};
                   opacity: 0; pointer-events: none; }
        .rl-skip:focus { opacity: 1; pointer-events: auto; }
        .rl img { max-width: 100%; display: block; }
        .rl { overflow-x: clip; }

        /* The two columns. The gradient paints the rail's ground for the whole
           document, so it never runs out under a long page. */
        .rl-shell { display: grid; grid-template-columns: minmax(0, 1fr) 300px;
                    background: linear-gradient(270deg, ${C.surface} 0 300px, transparent 300px); }
        .rl-main { min-width: 0; }
        .rl-rail { position: sticky; top: ${top}px; align-self: start; height: calc(100vh - ${top}px);
                   border-left: 1px solid ${C.border}; padding: 30px 26px 26px;
                   display: flex; flex-direction: column; gap: 22px; }

        /* Prose beside a card of facts. Set at a reading measure down the left
           of a 1100px column and two thirds of the page is empty. */
        .rl-two { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: clamp(26px, 3vw, 52px); align-items: start; }
        .rl-card { position: sticky; top: ${top + 26}px; }
        .rl-cols { column-count: 2; column-gap: clamp(28px, 3.4vw, 56px); }
        .rl-cols p { margin: 0 0 16px; break-inside: avoid; }

        .rl-svc { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .rl-crew { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .rl-work { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .rl-qa { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .rl-signs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(24px, 3vw, 44px); }
        .rl-track { display: grid; grid-template-columns: repeat(var(--n, 4), minmax(0, 1fr)); gap: clamp(14px, 1.6vw, 22px); }
        .rl-figs { display: grid; grid-template-columns: repeat(var(--n, 4), minmax(0, 1fr)); border-block: 1px solid ${C.border}; }
        .rl-rate { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: clamp(24px, 3vw, 48px); align-items: center; }
        .rl-faces { display: flex; flex-wrap: wrap; gap: 26px; }

        .crew-mobilebar { display: none !important; }

        /* Under 1040 the rail becomes an ordinary bar at the top: a 300px
           column and a readable measure do not both fit. */
        @media (max-width: 1040px) {
          .rl-shell { grid-template-columns: minmax(0, 1fr); background: ${C.bg}; }
          .rl-rail { order: -1; position: sticky; top: ${top}px; height: auto; z-index: 30;
                     background: ${C.surface}; border-left: 0; border-bottom: 1px solid ${C.border};
                     flex-direction: row; align-items: center; justify-content: space-between;
                     flex-wrap: wrap; gap: 12px; padding: 13px 22px; }
          .rl-menu, .rl-toc, .rl-hours, .rl-since { display: none !important; }
          .rl-act { margin: 0 !important; grid-auto-flow: column; align-items: center; gap: 10px; }
          .rl-act .rl-quiet { display: none; }
          .rl-two { grid-template-columns: minmax(0, 1fr); }
          .rl-card { position: static; }
          .rl-cols { column-count: 1; }
          .rl-crew, .rl-work { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .rl-svc, .rl-qa, .rl-signs { grid-template-columns: minmax(0, 1fr); }
          .rl-track, .rl-figs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .rl-rate { grid-template-columns: minmax(0, 1fr); gap: 20px; }
          .crew-mobilebar { display: flex !important; }
        }
        @media (max-width: 620px) {
          .rl-crew, .rl-work, .rl-track, .rl-figs { grid-template-columns: minmax(0, 1fr); }
          .rl-figs > div { border-right: 0 !important; border-bottom: 1px solid ${C.border}; padding-inline: 0 !important; }
          .rl-figs > div:last-child { border-bottom: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .rl * { transition: none !important; } }
      `}</style>
    </>
  )
}

/** The rail itself. A real nav, with a skip link ahead of it in the page. */
function Rail({ x, current, toc }) {
  const { C, F, name, since, href, phone, phoneDisplay, biz, second, logo } = x
  const items = navItems(x)
  return (
    <nav className="rl-rail" aria-label="Main">
      <a href={href.home} style={{ display: 'block', textDecoration: 'none', color: C.text }}>
        {logo
          ? <img src={logo} alt={name} style={{ maxHeight: 44, width: 'auto', background: C.logoPlate, borderRadius: 6, padding: 6 }} />
          : <span style={{ display: 'block', fontFamily: F.display, fontWeight: 800, fontSize: 22, letterSpacing: '-0.035em', lineHeight: 1.14 }}>{name}</span>}
        {since && <span className="rl-since" style={{ display: 'block', marginTop: 7, ...x.label(C.textMuted) }}>{since}</span>}
      </a>

      {items.length > 0 && (
        <div className="rl-menu" style={{ display: 'grid', gap: 2 }}>
          {items.map(i => (
            <a key={i.key} href={i.href} aria-current={i.key === current ? 'page' : undefined}
              style={{ padding: '9px 12px', borderRadius: x.T.radius.sm, fontWeight: 600, fontSize: 16, textDecoration: 'none',
                       color: i.key === current ? C.text : C.textDim, background: i.key === current ? C.surfaceAlt : 'transparent' }}>
              {i.label}
            </a>
          ))}
        </div>
      )}

      {/* An inner page is read rather than browsed, so knowing what is on it
          earns the space. The home page is browsed, and gets no list. */}
      {toc?.length > 1 && (
        <div className="rl-toc" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18 }}>
          <h2 style={{ ...x.label(C.textMuted), margin: '0 0 11px' }}>On this page</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid' }}>
            {toc.map((t, i) => (
              <li key={t.id}>
                <a href={`#${t.id}`} style={{ display: 'grid', gridTemplateColumns: '26px minmax(0, 1fr)', gap: 8, padding: '6px 0', fontSize: 15, color: C.textDim, textDecoration: 'none' }}>
                  <i style={{ fontStyle: 'normal', color: C.accent, fontWeight: 700, fontSize: 12.5, paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</i>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="rl-act" style={{ marginTop: 'auto', display: 'grid', gap: 11 }}>
        {biz.hours_display && <div className="rl-hours" style={{ fontSize: 13.5, color: C.textDim }}>{biz.hours_display}</div>}
        {phone && (
          <a href={`tel:${phone}`} style={{ fontFamily: F.display, fontSize: 23, fontWeight: 800, letterSpacing: '-0.03em', color: C.text, textDecoration: 'none' }}>
            {phoneDisplay}
          </a>
        )}
        <a href={second.href} style={btnAccent(x)} {...(second.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{second.label}</a>
        <a className="rl-quiet" href={x.quoteHref} style={btnOutline(x)}>Contact us</a>
      </div>
    </nav>
  )
}

/** The whole page: skip link, content column, rail, footer inside the column. */
export function RailPage({ x, schemas = [], current, toc, children }) {
  const { C, F, concept, phone, phoneDisplay, quoteHref } = x
  return (
    <>
      <RailStyles x={x} />
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <div className="rl" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: x.T.type.base, lineHeight: 1.62, minHeight: '100vh' }}>
        <a className="rl-skip" href="#rl-main">Skip to the page</a>
        <div className="rl-shell">
          <main className="rl-main" id="rl-main">
            {children}
            <SiteFooter x={x} />
          </main>
          <Rail x={x} current={current} toc={toc} />
        </div>
        <CrewMobileBar phone={phone} phoneDisplay={phoneDisplay} quoteHref={quoteHref} colors={C} fontFamily={F.body} />
      </div>
    </>
  )
}

// ---- openings ---------------------------------------------------------------

/** A photograph the width of the column with the heading over its foot. */
export function Opening({ x, image, crumbs, eyebrow, title, lede, badge }) {
  const { C, F } = x
  if (!image?.url) return <Masthead x={x} crumbs={crumbs} where={eyebrow} title={title} lede={lede} badge={badge} />
  return (
    <div data-hero="" style={{ position: 'relative' }}>
      <img src={image.url} alt={image.alt || ''} style={{ width: '100%', height: 'clamp(360px, 50vh, 540px)', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
                    background: `linear-gradient(90deg, ${C.overlayStrong} 0%, ${C.overlayStrong} 55%, ${C.overlayLight} 92%), linear-gradient(0deg, ${C.overlayStrong} 0%, ${C.overlayFaint} 60%)` }}>
        <div data-on-image="" style={{ '--on-image': C.textOnImage, '--on-image-dim': C.textOnImageDim, color: C.textOnImage, width: '100%', padding: `0 ${x.gutter} clamp(26px, 3.4vw, 44px)` }}>
          {crumbs?.length > 1 && <Crumbs x={x} crumbs={crumbs} onImage />}
          {badge && (
            <span style={{ display: 'inline-block', marginBottom: 12, padding: '5px 12px', borderRadius: x.T.radius.full,
                           border: `1px solid ${C.textOnImageDim}`, ...x.label(C.textOnImage) }}>{badge}</span>
          )}
          <h1 style={{ ...x.h1, maxWidth: '17ch', marginBottom: 14, color: C.textOnImage }}>{title}</h1>
          {lede && <p style={{ margin: 0, fontSize: 19, maxWidth: '52ch', color: C.textOnImageDim }}>{lede}</p>}
        </div>
      </div>
    </div>
  )
}

/**
 * The area page's opening: the place set as large as the page will carry it.
 * No photograph — nothing in the data is a picture of a town, and one job
 * photo repeated across eight area pages reads as a mistake.
 */
export function Masthead({ x, crumbs, where, title, place, lede, badge }) {
  const { C, F } = x
  return (
    <div data-hero="" style={{ padding: `clamp(38px, 4.6vw, 74px) ${x.gutter} 0` }}>
      {crumbs?.length > 1 && <Crumbs x={x} crumbs={crumbs} />}
      {(where || badge) && (
        <div style={{ ...x.label(C.accent), marginBottom: 18 }}>{[where, badge].filter(Boolean).join(' · ')}</div>
      )}
      <h1 style={{ ...x.h1, fontSize: place ? 'clamp(40px, 6.2vw, 88px)' : x.T.type.hero, lineHeight: 0.98, letterSpacing: '-0.042em', maxWidth: '15ch' }}>
        {/* The space matters: the line break is visual, and without it the
            heading reads "Heating and cooling inOverland Park" to a crawler
            and to a screen reader. */}
        {title}{place ? ' ' : ''}
        {place && <span style={{ display: 'block', color: C.accent }}>{place}</span>}
      </h1>
      {lede && <p style={{ margin: '20px 0 0', fontSize: 19, color: C.textDim, maxWidth: '54ch' }}>{lede}</p>}
      <div style={{ height: 4, width: 92, background: C.accent, marginTop: 30 }} />
    </div>
  )
}

/**
 * A solid plate of the brand colour. The combo page opens on it, so that the
 * three page types that carry a place never open the same way.
 */
export function Plate({ x, crumbs, parents, where, title, lede }) {
  const { C } = x
  // accent/onAccent, not the inverse roles: a concept or any site with a
  // derived palette redefines "inverse" as the opposite lightness band, and
  // this plate came out near-white. Everything on it takes the one text
  // colour that is guaranteed to read on the brand colour — hierarchy is
  // size and weight, because a colour at half opacity is half the contrast.
  return (
    <div data-hero="" style={{ background: C.accent, color: C.onAccent, padding: `clamp(34px, 4.4vw, 62px) ${x.gutter}` }}>
      {crumbs?.length > 1 && <Crumbs x={x} crumbs={crumbs} onPlate />}
      {parents?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {parents.map(p => (
            <a key={p.href} href={p.href}
              style={{ border: `1px solid ${C.onAccent}`, borderRadius: x.T.radius.full, padding: '6px 14px', fontSize: 14, fontWeight: 700, color: C.onAccent, textDecoration: 'none' }}>
              ← {p.label}
            </a>
          ))}
        </div>
      )}
      {where && <div style={{ ...x.label(C.onAccent), marginBottom: 14 }}>{where}</div>}
      <h1 style={{ ...x.h1, maxWidth: '18ch', marginBottom: 12, color: C.onAccent }}>{title}</h1>
      {lede && <p style={{ margin: 0, fontSize: 19, maxWidth: '52ch', color: C.onAccent }}>{lede}</p>}
    </div>
  )
}

export function Crumbs({ x, crumbs, onImage = false, onPlate = false }) {
  const { C, base } = x
  const color = onPlate ? C.onAccent : onImage ? C.textOnImageDim : C.textDim
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 14, color, marginBottom: 14 }}>
      {crumbs.map((b, i) => (
        <span key={b.url}>
          {i > 0 && <span aria-hidden="true" style={{ paddingInline: 5 }}>/</span>}
          {i < crumbs.length - 1
            ? <a href={`${base}${b.url === '/' ? '' : b.url}`} style={{ color, textDecoration: 'none' }}>{b.name}</a>
            : <span>{b.name}</span>}
        </span>
      ))}
    </nav>
  )
}

// ---- the pieces a page is built from ----------------------------------------

/** A band of the second ground. The page runs in three of them — the work,
 *  the people, the answers — so it changes colour before it changes subject. */
export function Band({ x, id, children }) {
  return (
    <div id={id} style={{ background: x.C.bgAlt, borderBlock: `1px solid ${x.C.border}` }}>{children}</div>
  )
}

/** One section of a band. `tight` joins it to the section above rather than
 *  paying the full gap twice. */
export function Section({ x, id, tight = false, children }) {
  return (
    <section id={id} style={{ ...x.wrap, paddingTop: tight ? 0 : x.sectionPad, paddingBottom: x.sectionPad }}>
      {children}
    </section>
  )
}

export function Head({ x, eyebrow, title, line, aside }) {
  const { C } = x
  return (
    <div style={{ marginBottom: 26, display: 'flex', gap: 20, alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div style={{ maxWidth: '44ch' }}>
        {eyebrow && <div style={{ ...x.label(C.accent), marginBottom: 11 }}>{eyebrow}</div>}
        <h2 style={x.h2}>{title}</h2>
        {line && <p style={{ margin: '12px 0 0', color: C.textDim, maxWidth: '54ch' }}>{line}</p>}
      </div>
      {aside}
    </div>
  )
}

export function Prose({ x, text, lead = false }) {
  const paras = paragraphs(text)
  if (!paras.length) return null
  return (
    <div>
      {paras.map((p, i) => (
        <p key={i} style={i === 0 && lead
          ? { margin: '0 0 16px', fontSize: 'clamp(20px, 1.9vw, 25px)', lineHeight: 1.42, letterSpacing: '-0.02em', color: x.C.text, maxWidth: '42ch' }
          : { margin: i === 0 ? 0 : '16px 0 0', fontSize: 17.5, lineHeight: 1.68, color: x.C.textDim, maxWidth: '60ch' }}>
          {p}
        </p>
      ))}
    </div>
  )
}

/** The sticky card of facts beside the prose on an inner page. */
export function FactCard({ x, title, rows, action }) {
  const { C } = x
  const list = (rows || []).filter(r => r && r.v)
  if (list.length === 0 && !action) return null
  return (
    <aside className="rl-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: x.T.radius.lg, padding: '22px 22px 24px' }}>
      {title && <h3 style={{ ...x.label(C.textMuted), margin: '0 0 14px' }}>{title}</h3>}
      {list.length > 0 && (
        <dl style={{ margin: 0 }}>
          {list.map((r, i) => (
            <div key={r.k} style={i === 0 ? undefined : { marginTop: 15, paddingTop: 15, borderTop: `1px solid ${C.border}` }}>
              <dt style={{ ...x.label(C.textMuted), fontSize: 12.5 }}>{r.k}</dt>
              <dd style={{ margin: '3px 0 0', fontSize: 16, color: C.text, lineHeight: 1.5 }}>{r.v}</dd>
            </div>
          ))}
        </dl>
      )}
      {action && <a href={action.href} style={{ ...btnAccent(x), display: 'flex', marginTop: 20 }}>{action.label}</a>}
    </aside>
  )
}

/** Label/value rows across the page: a specification, not more prose. */
export function Rows({ x, rows }) {
  const { C } = x
  const list = (rows || []).filter(r => r && r.v)
  if (list.length === 0) return null
  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      {list.map(r => (
        <div key={r.k} className="rl-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2.6fr)', gap: '8px 28px', paddingBlock: 15, borderBottom: `1px solid ${C.border}` }}>
          <span style={{ ...x.label(C.textMuted), fontSize: 12.5, paddingTop: 3 }}>{r.k}</span>
          <span style={{ fontSize: 16.5, color: C.textDim, lineHeight: 1.6 }}>{r.v}</span>
        </div>
      ))}
      <style>{`@media (max-width: 760px) { .rl-row { grid-template-columns: minmax(0, 1fr) !important; } }`}</style>
    </div>
  )
}

/** Figures across the page. Each cell padded on both sides, so a value never
 *  sits against the rule dividing it from the one before. */
export function Figures({ x, items }) {
  const { C, F } = x
  const list = (items || []).filter(Boolean).slice(0, 4)
  if (list.length === 0) return null
  return (
    <div style={x.wrap}>
      <div className="rl-figs" style={{ '--n': list.length }}>
        {list.map((f, i) => (
          <div key={f.label} style={{
            padding: '22px clamp(18px, 2vw, 30px) 24px',
            paddingLeft: i === 0 ? 0 : undefined,
            paddingRight: i === list.length - 1 ? 0 : undefined,
            borderRight: i === list.length - 1 ? 'none' : `1px solid ${C.border}`,
          }}>
            <b style={{ display: 'block', fontFamily: F.display, fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: C.accent }}>{f.value}</b>
            <span style={{ display: 'block', marginTop: 9, ...x.label(C.textMuted), fontSize: 12.5 }}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Pills. One wrapping row per group: a second container starts a new line
 *  whether or not the one above is full. */
export function Chips({ x, items }) {
  const { C } = x
  const list = (items || []).filter(Boolean)
  if (list.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
      {list.map(i => (
        i.href
          ? <a key={i.href + i.label} href={i.href} style={chip(x)}>{i.label}</a>
          : <span key={i.label} style={chip(x)}>{i.label}</span>
      ))}
    </div>
  )
}
const chip = (x) => ({ border: `1px solid ${x.C.border}`, background: x.C.surface, borderRadius: x.T.radius.full, padding: '9px 17px', fontWeight: 600, fontSize: 15, color: x.C.text, textDecoration: 'none' })

/** Service cards: the home page's shape. */
export function ServiceCards({ x, services, hrefFor }) {
  const { C, F, imgs } = x
  if (!services.length) return null
  return (
    <div className="rl-svc">
      {services.map(s => {
        const img = imgs[`service_${s.slug}`]
        return (
          <a key={s.slug} href={hrefFor(s)} style={{ display: 'grid', gridTemplateColumns: img?.url ? '74px minmax(0, 1fr) auto' : 'minmax(0, 1fr) auto', gap: 15, alignItems: 'center', background: C.surface, border: `1px solid ${C.border}`, borderRadius: x.T.radius.lg, padding: 14, textDecoration: 'none', color: C.text }}>
            {img?.url && <img src={img.url} alt="" style={{ width: 74, height: 58, objectFit: 'cover', borderRadius: x.T.radius.sm }} />}
            <span>
              <h3 style={x.h3}>{s.name}</h3>
              {s.short && <p style={{ margin: '3px 0 0', color: C.textDim, fontSize: 15, lineHeight: 1.5 }}>{s.short}</p>}
            </span>
            <span aria-hidden="true" style={{ color: C.accent, fontWeight: 800, fontSize: 19 }}>→</span>
          </a>
        )
      })}
    </div>
  )
}

/** A numbered directory. The area page's shape, so it is not the home page
 *  twice with different words. */
export function Directory({ x, items }) {
  const { C } = x
  if (!items.length) return null
  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      {items.map((i, n) => (
        <a key={i.href + i.title} href={i.href} className="rl-dir"
          style={{ display: 'grid', gridTemplateColumns: '30px minmax(0, 1fr) minmax(0, 1.3fr) auto', gap: '10px 24px', alignItems: 'baseline', paddingBlock: 17, borderBottom: `1px solid ${C.border}`, textDecoration: 'none', color: C.text }}>
          <i style={{ fontStyle: 'normal', fontSize: 12.5, fontWeight: 800, color: C.accent }}>{String(n + 1).padStart(2, '0')}</i>
          <h3 style={{ ...x.h3, fontSize: 'clamp(19px, 2vw, 23px)' }}>{i.title}</h3>
          <p style={{ margin: 0, color: C.textDim, fontSize: 15.5, lineHeight: 1.55 }}>{i.line}</p>
          <span aria-hidden="true" style={{ color: C.accent, fontWeight: 800, fontSize: 19 }}>→</span>
        </a>
      ))}
      <style>{`@media (max-width: 1040px) {
        .rl-dir { grid-template-columns: 24px minmax(0, 1fr) auto !important; }
        .rl-dir p { grid-column: 2 / -1; }
      }`}</style>
    </div>
  )
}

/** RAIL's own section: the people who turn up, with their names. */
export function Crew({ x, people }) {
  const { C, F } = x
  if (!people.length) return null
  return (
    <div className="rl-crew">
      {people.map(p => (
        <figure key={p.slug || p.name} style={{ margin: 0, background: C.surface, border: `1px solid ${C.border}`, borderRadius: x.T.radius.lg, overflow: 'hidden' }}>
          {p.photo_url && <img src={p.photo_url} alt={p.name} style={{ width: '100%', height: 230, objectFit: 'cover' }} />}
          <figcaption style={{ padding: '17px 18px 19px' }}>
            <h3 style={{ ...x.h3, fontSize: 19 }}>{p.name}</h3>
            {p.title && <span style={{ display: 'block', marginTop: 4, ...x.label(C.accent), fontSize: 12.5 }}>{p.title}</span>}
            {p.bio && <p style={{ margin: '10px 0 0', color: C.textDim, fontSize: 15.5, lineHeight: 1.6 }}>{p.bio}</p>}
            {(p.credentials || []).length > 0 && (
              <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.credentials.map(cr => (
                  <li key={cr} style={{ border: `1px solid ${C.border}`, borderRadius: x.T.radius.full, padding: '4px 11px', fontSize: 12.5, fontWeight: 600, color: C.textDim }}>{cr}</li>
                ))}
              </ul>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/** The same people, compact: an inner page has already been introduced. */
export function Faces({ x, people }) {
  const { C } = x
  if (!people.length) return null
  return (
    <div className="rl-faces">
      {people.map(p => (
        <figure key={p.slug || p.name} style={{ margin: 0, display: 'grid', gridTemplateColumns: p.photo_url ? '62px minmax(0, 1fr)' : 'minmax(0, 1fr)', gap: 14, alignItems: 'center', maxWidth: 330 }}>
          {p.photo_url && <img src={p.photo_url} alt={p.name} style={{ width: 62, height: 62, borderRadius: '50%', objectFit: 'cover' }} />}
          <figcaption>
            <h3 style={{ ...x.h3, fontSize: 17.5 }}>{p.name}</h3>
            {p.title && <span style={{ display: 'block', marginTop: 3, ...x.label(C.accent), fontSize: 12.5 }}>{p.title}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/** Photographs of finished work, with a caption that says what it was. */
export function Work({ x, items }) {
  const { C } = x
  if (!items.length) return null
  return (
    <div className="rl-work">
      {items.map(i => (
        <figure key={i.url} style={{ margin: 0 }}>
          <img src={i.url} alt={i.alt || ''} style={{ width: '100%', height: 190, objectFit: 'cover', borderRadius: x.T.radius.md }} />
          {i.caption && <figcaption style={{ marginTop: 9, fontSize: 14, color: C.textDim }}>{i.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

/**
 * Photographs of finished work: the client's own pictures only. Every empty
 * slot is filled from the stock library before a renderer sees the config, so
 * a stock photo under a heading promising their own work would be a lie. A
 * picture attached to a service is captioned with that service's name.
 */
export function workItems(x) {
  const { imgs, services, c } = x
  const named = new Map(services.map(s => [s.slug, s.name]))

  // Their own photographs, newest first, when the config carries them: a
  // caption the client wrote beats one we derive from a slot name.
  const gallery = (c.gallery || []).filter(g => g?.url)
  if (gallery.length > 0) {
    return gallery.slice(0, 4).map(g => ({
      url: g.url,
      alt: g.alt || '',
      caption: g.caption || (g.service ? named.get(g.service) || null : null),
    }))
  }

  const skip = new Set(['home_hero', 'home_video', 'home_secondary', 'about_hero', 'combo_hero'])
  const out = []
  for (const [key, img] of Object.entries(imgs || {})) {
    if (!img?.url || img.stock || skip.has(key)) continue
    const m = /^service_(.+)$/.exec(key)
    out.push({ url: img.url, alt: img.alt || '', caption: m ? named.get(m[1]) || null : null })
  }
  return out.slice(0, 4)
}

/** The rating beside the review it came with. */
export function Rating({ x, proof, review }) {
  const { C, F } = x
  const rating = (proof || []).find(p => p.kind === 'rating')
  if (!rating && !review) return null
  return (
    <div className="rl-rate">
      {rating && (
        <div>
          <div style={{ fontFamily: F.display, fontSize: 'clamp(54px, 6vw, 82px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 1, color: C.accent }}>
            {rating.value}
            <span style={{ display: 'block', marginTop: 8, ...x.label(C.textDim), fontSize: 12.5 }}>{rating.label}</span>
          </div>
        </div>
      )}
      {review && (
        <figure style={{ margin: 0 }}>
          <blockquote style={{ margin: 0, fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(20px, 2.1vw, 28px)', lineHeight: 1.34, letterSpacing: '-0.02em', color: C.text }}>
            “{review.text}”
          </blockquote>
          {(review.author || review.name) && (
            <figcaption style={{ marginTop: 12, ...x.label(C.textMuted) }}>{review.author || review.name}</figcaption>
          )}
        </figure>
      )}
    </div>
  )
}

/** Steps as cards down the page (the home page) or across it (an inner page). */
export function Steps({ x, steps, across = false }) {
  const { C, F } = x
  if (!steps?.length) return null
  if (across) {
    // The number of columns comes from the number of steps, so the last row
    // is never one step on its own: five run three and two, not four and one.
    const n = steps.length
    const cols = n <= 4 ? n : (n % 4 === 0 ? 4 : n % 3 === 0 ? 3 : n <= 6 ? 3 : 4)
    return (
      <div className="rl-track" style={{ '--n': cols }}>
        {steps.map((s, i) => (
          <div key={i} style={{ borderTop: `3px solid ${C.accent}`, paddingTop: 15 }}>
            <b style={{ display: 'block', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: C.accent, marginBottom: 8 }}>STEP {String(i + 1).padStart(2, '0')}</b>
            {s.title && <h3 style={x.h3}>{s.title}</h3>}
            {s.description && <p style={{ margin: '6px 0 0', color: C.textDim, fontSize: 15, lineHeight: 1.58 }}>{s.description}</p>}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gap: 11 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '34px minmax(0, 1fr)', gap: 15, background: C.surface, border: `1px solid ${C.border}`, borderRadius: x.T.radius.lg, padding: '17px 19px' }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: C.accent, color: C.onAccent, display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 15 }}>{i + 1}</span>
          <div>
            {s.title && <h3 style={x.h3}>{s.title}</h3>}
            {s.description && <p style={{ margin: '4px 0 0', color: C.textDim, fontSize: 15.5, lineHeight: 1.6 }}>{s.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

/** "Signs you need this", two columns: each is two or three lines, and one
 *  column of six of them is a wall. */
export function Signs({ x, signs }) {
  const { C } = x
  if (!signs?.length) return null
  return (
    <ul className="rl-signs" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {signs.map((s, i) => (
        <li key={i} style={{ borderTop: `1px solid ${C.border}`, paddingBlock: 18 }}>
          <h3 style={{ ...x.h3, fontSize: 'clamp(18.5px, 1.9vw, 22px)' }}>{s.sign}</h3>
          {s.detail && <p style={{ margin: '6px 0 0', color: C.textDim, fontSize: 16.5, lineHeight: 1.65 }}>{s.detail}</p>}
        </li>
      ))}
    </ul>
  )
}

export function Questions({ x, faqs }) {
  const { C } = x
  if (!faqs?.length) return null
  return (
    <div className="rl-qa">
      {faqs.map((f, i) => (
        <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: x.T.radius.lg, padding: '20px 21px' }}>
          <h3 style={x.h3}>{f.question}</h3>
          <p style={{ margin: '7px 0 0', color: C.textDim, fontSize: 15.5, lineHeight: 1.62 }}>{f.answer}</p>
        </div>
      ))}
    </div>
  )
}

/** A photograph set into the page, used where a full-bleed band would collide
 *  with the accent plate above it. */
export function Inset({ x, image, caption }) {
  const { C } = x
  if (!image?.url) return null
  return (
    <div style={{ ...x.wrap, paddingBottom: x.sectionPad }}>
      <figure style={{ margin: 0, position: 'relative', borderRadius: x.T.radius.lg, overflow: 'hidden' }}>
        <img src={image.url} alt={image.alt || ''} style={{ width: '100%', height: 'clamp(230px, 24vw, 340px)', objectFit: 'cover' }} />
        {caption && (
          <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '30px 24px 16px', fontSize: 14.5, color: C.textOnImage,
                               background: `linear-gradient(0deg, ${C.overlayStrong}, transparent)` }}>
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}

/**
 * The closing band: the plate again, with the phone number in it. `context` is
 * the job, `place` the town, and the sentence is built from whichever of them
 * the page has rather than from one string the caller has to get right.
 */
export function Closing({ x, context, place }) {
  const { C, F, phone, phoneDisplay, biz, second } = x
  return (
    <section style={{ ...x.wrap, paddingBottom: x.sectionPad }}>
      <div style={{ background: C.accent, color: C.onAccent, borderRadius: x.T.radius.lg, padding: 'clamp(26px, 3.2vw, 42px)', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ ...x.h2, color: C.onAccent, maxWidth: '18ch' }}>
            {context && place ? `Get ${context} booked in ${place}`
              : context ? `Get ${context} booked`
              : place ? `Book a visit in ${place}`
              : 'Get it booked'}
          </h2>
          {biz.hours_display && <p style={{ margin: '8px 0 0', fontWeight: 600 }}>{biz.hours_display}</p>}
        </div>
        {phone
          ? <a href={`tel:${phone}`} style={{ fontFamily: F.display, fontSize: 'clamp(27px, 3.2vw, 42px)', fontWeight: 800, letterSpacing: '-0.035em', color: C.onAccent, textDecoration: 'none' }}>{phoneDisplay}</a>
          : <a href={second.href} style={btnOnPlate(x)}>{second.label}</a>}
      </div>
    </section>
  )
}

export function SiteFooter({ x }) {
  const { C, F, name, biz, services, areas, href, license, credential } = x
  return (
    <footer style={{ ...x.wrap, borderTop: `1px solid ${C.border}`, paddingBlock: '34px 44px', color: C.textDim, fontSize: 15 }}>
      <div className="rl-foot" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 34 }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', color: C.text, marginBottom: 8 }}>{name}</div>
          {biz.address_line && <div>{biz.address_line}</div>}
          {x.phoneDisplay && <div><a href={`tel:${x.phone}`} style={{ color: C.text, textDecoration: 'none' }}>{x.phoneDisplay}</a></div>}
          {(license || credential) && <div style={{ marginTop: 10 }}>{license ? `License ${license}` : credential}</div>}
        </div>
        {services.length > 0 && (
          <div>
            <h3 style={{ ...x.label(C.textMuted), margin: '0 0 10px' }}>{x.offeringLabel}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              {services.slice(0, 6).map(s => <li key={s.slug}><a href={href.service(s.slug)} style={{ color: C.textDim, textDecoration: 'none' }}>{s.name}</a></li>)}
            </ul>
          </div>
        )}
        {areas.length > 0 && (
          <div>
            <h3 style={{ ...x.label(C.textMuted), margin: '0 0 10px' }}>{x.placeLabel}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              {areas.slice(0, 6).map(a => <li key={a}><a href={href.area(a)} style={{ color: C.textDim, textDecoration: 'none' }}>{a}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div style={{ marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.borderLight}`, display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14, color: C.textMuted }}>
        <span>© {new Date().getFullYear()} {name}</span>
        <a href={href.privacy} style={{ color: C.textMuted, textDecoration: 'none' }}>Privacy</a>
        {x.social.map(s => (
          <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer me" style={{ color: C.textMuted, textDecoration: 'none' }}>{s.label}</a>
        ))}
      </div>
      <style>{`@media (max-width: 1040px) { .rl-foot { grid-template-columns: minmax(0, 1fr) !important; } }`}</style>
    </footer>
  )
}
