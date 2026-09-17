import { stageTokens } from '../../../templates/stage/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { siteData, navItems, proofItems, pricingModel } from './family/data.js'
import CrewMobileBar from './CrewMobileBar.js'
import StageSpy from './StageSpy.js'

// STAGE's chrome: the scrolling column on the left and the fixed panel on the
// right. The panel is the family — it holds the menu, the identity, a board of
// facts that follows whichever chapter you are reading, and the two ways to
// act, for the whole visit.

export function stageContext(c, siteSlug) {
  const d = siteData(c, siteSlug)
  const T = applyBrand(stageTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  return {
    ...d, siteSlug, T, C, F,
    sectionPad: 'clamp(76px, 11vh, 136px)',
    gutter: 'clamp(28px, 4vw, 72px)',
    label: (color) => ({ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color }),
    h1: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.hero, lineHeight: 1.03, letterSpacing: '-0.035em', margin: 0, textWrap: 'balance' },
    h2: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.display, lineHeight: 1.05, letterSpacing: '-0.035em', margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: T.radius.sm, padding: '15px 24px', fontSize: 16.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1.15, boxSizing: 'border-box', border: '1.5px solid transparent' },
    body: { fontSize: 17.5, lineHeight: 1.78, color: C.text },
  }
}

export const btnAccent = (x) => ({ ...x.btn, background: x.C.accent, color: x.C.onAccent, borderColor: x.C.accent })
export const btnOutline = (x) => ({ ...x.btn, background: 'transparent', color: x.C.text, borderColor: x.C.text })
export const btnOnDark = (x) => ({ ...x.btn, background: '#fff', color: x.C.text, borderColor: '#fff' })
export const btnOnDarkQuiet = (x) => ({ ...x.btn, background: 'transparent', color: x.C.inverseText, borderColor: 'rgba(255,255,255,0.5)' })

function StageStyles({ x }) {
  const { C, F, c } = x
  const top = c.chrome_offset || 0
  return (
    <>
      <link rel="stylesheet" href={stageTokens.fontsHref} precedence="default" />
      <style>{`
        .stg a:focus-visible, .stg summary:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 3px; }
        .stg img { max-width: 100%; display: block; }
        .stg { overflow-x: clip; }
        /* The two halves. */
        .stg-feed { margin-right: 42vw; width: 58%; }
        .stg-panel { position: fixed; inset: ${top}px 0 0 auto; width: 42vw; height: calc(100vh - ${top}px);
                     background: ${C.inverseBg}; color: ${C.inverseText}; z-index: 40;
                     display: grid; grid-template-rows: auto minmax(0, 1fr) auto auto; }
        .stg-panel.has-toc { grid-template-rows: auto minmax(0, 1fr) auto auto auto; }
        .stg-panel.has-plate { grid-template-rows: auto auto auto minmax(0, 1fr) auto; }
        .stg-panel.has-plate .stg-board { overflow: auto; }
        /* A chapter: its own ground, a heavy rule, and room to breathe. */
        .stg-chap { padding: clamp(76px, 11vh, 136px) clamp(28px, 4vw, 72px); border-top: 2px solid ${C.text}; }
        .stg-chap:nth-of-type(even) { background: ${C.bgAlt}; }
        .stg-chap:first-of-type { border-top: 0; padding-top: clamp(32px, 4vh, 52px); min-height: calc(100vh - ${top}px);
                                  display: flex; flex-direction: column; }
        .stg-foot-open { margin-top: auto; padding-top: clamp(28px, 4vh, 48px); }
        .stg-figs { display: grid; grid-template-columns: repeat(var(--n, 4), minmax(0, 1fr)); gap: clamp(16px, 2.5vw, 36px);
                    padding-top: 20px; border-top: 1px solid ${C.border}; }
        .stg-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(14px, 1.6vw, 22px); }
        .stg-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 24px); }
        .stg-cols { column-count: 2; column-gap: clamp(28px, 3.4vw, 52px); }
        .stg-cols p { margin: 0 0 16px; break-inside: avoid; }
        .stg-track { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px clamp(20px, 2vw, 32px); }
        .stg-rail { position: fixed; left: 0; top: 0; bottom: 0; width: 34px; display: flex; flex-direction: column;
                    justify-content: center; align-items: center; gap: 12px; z-index: 41; }
        .stg-rail a { width: 7px; height: 7px; background: ${C.border}; border-radius: 50%; text-decoration: none; }
        .stg-rail a.on { background: ${C.accent}; height: 26px; border-radius: 3px; }
        .stg-bleed { margin-inline: calc(-1 * clamp(28px, 4vw, 72px)); }
        .crew-mobilebar { display: none !important; }
        @media (min-width: 1500px) { .stg-track { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        @media (max-width: 1040px) {
          .stg { display: flex; flex-direction: column; }
          .stg-panel { position: relative; inset: auto; width: 100%; height: auto; order: -1;
                       grid-template-rows: none !important; }
          .stg-feed { margin-right: 0; width: 100%; }
          .stg-chap { padding: 56px clamp(20px, 5vw, 32px); }
          .stg-chap:first-of-type { min-height: 0; padding-top: 40px; }
          .stg-rail { display: none; }
          .stg-figs, .stg-two, .stg-three, .stg-track { grid-template-columns: 1fr; gap: 20px; }
          .stg-cols { column-count: 1; }
          .crew-mobilebar { display: grid !important; }
          .stg { padding-bottom: 76px; }
        }
      `}</style>
    </>
  )
}

/** The menu and the identity, at the head of the panel. It never scrolls, so
 *  the menu is reachable from anywhere on the page. */
function IdBar({ x }) {
  const { C, F, name, logo, href } = x
  const items = navItems(x)
  const r = proofItems(x).find(p => p.kind === 'rating')
  return (
    <div style={{ padding: '16px clamp(20px, 2.1vw, 30px) 18px', borderBottom: `1px solid ${C.inverseBorder}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
        <a href={href.home} style={{ textDecoration: 'none', color: C.inverseText, minWidth: 0 }}>
          {logo
            ? <span style={{ background: C.logoPlate, padding: '7px 10px', display: 'inline-flex' }}>
                <img src={logo} alt={name} style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
              </span>
            : <span style={{ fontFamily: F.display, fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em' }}>{name}</span>}
        </a>
        {r && <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>★ {r.value} · {r.label}</span>}
      </div>
      {items.length > 0 && (
        <nav aria-label="Main" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 2.1vw, 34px)', marginTop: 16, fontSize: 19, fontWeight: 600 }}>
          {items.map(i => <a key={i.key} href={i.href} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>{i.label}</a>)}
          <a href={x.href.contact} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>Contact</a>
        </nav>
      )}
    </div>
  )
}

/** The panel's head: the photographs when the client has them, a plate of
 *  their colour when they do not. Plenty of clients have no photography, so
 *  the plate is a real state of this family, not a fallback that looks like a
 *  hole where a picture should be.
 *
 *  Every chapter's caption is rendered here and all but the first are hidden.
 *  Nothing is built from strings at run time: the script only moves one
 *  attribute, so a page whose script never runs still shows chapter one. */
function PanelHead({ x, chapters, shots, plate, stamp }) {
  const { C, F } = x
  if (plate) {
    return (
      <div style={{ background: C.accent, color: C.onAccent, display: 'flex', flexDirection: 'column',
                    padding: 'clamp(16px, 1.8vw, 24px) clamp(18px, 2vw, 28px) clamp(18px, 2vw, 26px)' }}>
        <span style={x.label('rgba(255,255,255,0.78)')}>{plate.kicker}</span>
        <span style={{ fontFamily: F.display, fontWeight: 800, letterSpacing: '-0.04em', fontSize: 'clamp(27px, 3.1vw, 44px)', lineHeight: 1, margin: '7px 0 0' }}>
          {plate.title}
        </span>
        {plate.line && (
          <span style={{ margin: '12px 0 0', paddingTop: 11, borderTop: '1px solid rgba(255,255,255,0.3)', fontSize: 14.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.9)' }}>
            {plate.line}
          </span>
        )}
      </div>
    )
  }
  const captioned = !stamp && chapters.some(ch => ch.cap)
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(150px, 20vh, 260px)', background: C.inverseBgAlt }}>
      {shots.map((s, i) => (
        <img key={i} src={s.url} alt={s.alt || ''} data-stage-shot={String(i)} data-on={i === 0 ? '' : undefined}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                   opacity: i === 0 ? 1 : 0, transition: 'opacity .45s ease' }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.78) 100%)' }} />
      {stamp && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(18px, 2vw, 26px)', color: '#fff' }}>
          <b style={{ display: 'block', fontFamily: F.display, fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(20px, 2vw, 27px)', lineHeight: 1.05 }}>{stamp.a}</b>
          <span style={{ display: 'inline-block', margin: '6px 0', width: 22, height: 2, background: C.accentLight }} />
          <b style={{ display: 'block', fontFamily: F.display, fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(20px, 2vw, 27px)', lineHeight: 1.05 }}>{stamp.b}</b>
          {stamp.note && <span style={{ display: 'block', marginTop: 6, ...x.label('rgba(255,255,255,0.72)') }}>{stamp.note}</span>}
        </div>
      )}
      {captioned && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(18px, 2vw, 26px)' }}>
          {chapters.map((ch, i) => (
            <div key={ch.id} data-stage-cap={ch.id} data-on={i === 0 ? '' : undefined}
              style={{ display: i === 0 ? 'block' : 'none', color: '#fff' }}>
              <span style={{ ...x.label('rgba(255,255,255,0.72)'), display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11.5, marginBottom: 10 }}>
                <i style={{ fontStyle: 'normal', width: 20, height: 20, background: C.accent, color: C.onAccent, display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 11 }}>{ch.n}</i>
                {ch.label}
              </span>
              {ch.cap && (
                <>
                  <b style={{ display: 'block', fontFamily: F.display, fontWeight: 700, letterSpacing: '-0.02em', fontSize: 'clamp(19px, 1.7vw, 25px)', marginBottom: 5 }}>{ch.cap.title}</b>
                  <span style={{ display: 'block', color: 'rgba(255,255,255,0.82)', fontSize: 15.5, maxWidth: '40ch' }}>{ch.cap.line}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** The board of facts, one per chapter, all rendered and all but the first
 *  hidden. Label/value rows unless a chapter supplies its own node. */
export function Board({ x, rows }) {
  const { C } = x
  const list = (rows || []).filter(r => r && r.v)
  if (list.length === 0) return null
  return (
    <dl style={{ margin: 0 }}>
      {list.map((r, i) => (
        <div key={r.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 42%) minmax(0, 1fr)', gap: 16, padding: '9px 0',
                                borderTop: i === 0 ? 'none' : `1px solid ${C.inverseBorder}` }}>
          <dt style={{ ...x.label('rgba(255,255,255,0.55)'), fontSize: 12, paddingTop: 2 }}>{r.k}</dt>
          <dd style={{ margin: 0, fontSize: 15.5, fontWeight: 600, lineHeight: 1.4 }}>{r.v}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * One chapter of the left column. The panel reads the id off this element, so
 * a chapter that renders nothing simply is not in the list and the numbering
 * closes up behind it.
 */
export function Chapter({ x, ch, children }) {
  return (
    <section className="stg-chap" id={ch.id} data-stage-chap={ch.id} data-shot={ch.shot != null ? String(ch.shot) : undefined}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <span style={{ fontFamily: x.F.display, fontWeight: 800, fontSize: 15, letterSpacing: '0.06em', color: x.C.onAccent,
                       background: x.C.accent, width: 38, height: 38, display: 'grid', placeItems: 'center' }}>{ch.n}</span>
        <span style={x.label(x.C.accentDim)}>{ch.label}</span>
      </div>
      {children}
    </section>
  )
}

/** The whole page. Chapters are declared as data so the panel can follow them
 *  without the renderer repeating itself. */
export function StagePage({ x, schemas = [], chapters, head = {}, showRail = true, children }) {
  const { C, F, concept, phone, phoneDisplay, quoteHref, quoteLabel, biz, license } = x
  const withToc = !!head.toc
  const cls = ['stg-panel', withToc ? 'has-toc' : '', head.plate ? 'has-plate' : ''].filter(Boolean).join(' ')
  return (
    <>
      <StageStyles x={x} />
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <div className="stg" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: x.T.type.base, lineHeight: 1.65, minHeight: '100vh' }}>
        {showRail && chapters.length > 1 && (
          <nav className="stg-rail" aria-label="Sections">
            {chapters.map((ch, i) => (
              <a key={ch.id} href={`#${ch.id}`} data-stage-dot={ch.id} className={i === 0 ? 'on' : undefined}>
                <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{ch.label}</span>
              </a>
            ))}
          </nav>
        )}
        <main className="stg-feed">{children}</main>
        <aside className={cls}>
          <IdBar x={x} />
          <PanelHead x={x} chapters={chapters} shots={head.shots || []} plate={head.plate} stamp={head.stamp} />
          {withToc && (
            <div style={{ padding: 'clamp(14px, 1.6vw, 20px) clamp(20px, 2.1vw, 30px)', borderTop: `1px solid ${C.inverseBorder}` }}>
              <div style={{ ...x.label('rgba(255,255,255,0.5)'), fontSize: 11.5, marginBottom: 10 }}>On this page</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 clamp(12px, 1.4vw, 22px)' }}>
                {chapters.map((ch, i) => (
                  <li key={ch.id}>
                    <a href={`#${ch.id}`} data-stage-toc={ch.id} className={i === 0 ? 'on' : undefined}
                      style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 10, alignItems: 'baseline', padding: '6px 0',
                               textDecoration: 'none', color: C.inverseTextDim, fontSize: 15, borderTop: i > 1 ? `1px solid ${C.inverseBorder}` : 'none' }}>
                      <i style={{ fontStyle: 'normal', fontFamily: F.display, fontWeight: 800, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{ch.n}</i>
                      {ch.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div style={{ padding: 'clamp(16px, 1.8vw, 24px) clamp(20px, 2.1vw, 30px)', borderTop: `1px solid ${C.inverseBorder}` }}>
            {chapters.map((ch, i) => (
              <div key={ch.id} data-stage-board={ch.id} data-on={i === 0 ? '' : undefined} style={{ display: i === 0 ? 'block' : 'none' }}>
                {ch.board}
              </div>
            ))}
          </div>
          <div style={{ padding: 'clamp(14px, 1.6vw, 20px) clamp(20px, 2.1vw, 30px) clamp(16px, 1.8vw, 24px)', background: C.inverseBgAlt }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {phone && <a href={`tel:${phone}`} style={{ ...btnOnDark(x), flex: 1 }}>Call {phoneDisplay}</a>}
              <a href={quoteHref} style={{ ...btnOnDarkQuiet(x), flex: 1 }}>{quoteLabel}</a>
            </div>
            {/* A licence number long enough to wrap this line is left to the
                board above and the footer, where both have room for it. */}
            <p style={{ margin: '11px 0 0', fontSize: 14, color: C.inverseTextDim }}>
              {[biz.hours_display, license && license.length <= 18 ? `Licensed ${license}` : null].filter(Boolean).join(' · ')}
            </p>
          </div>
        </aside>
        <StageSpy />
        <CrewMobileBar phone={phone} phoneDisplay={phoneDisplay} quoteHref={quoteHref} colors={C} fontFamily={F.body} />
      </div>
    </>
  )
}
