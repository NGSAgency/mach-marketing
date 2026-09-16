import { centreTokens } from '../../../templates/centre/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { siteData, navItems } from './family/data.js'

// CENTRE's chrome: the floating nav, the footer, and the wrapper every page
// shares. Sections live here too, because the inner pages are built from the
// same pieces as the home page — a service page is the same panel with one
// service in it, an area page the same tiles with one town emphasised.

export function centreContext(c, siteSlug) {
  const d = siteData(c, siteSlug)
  const T = applyBrand(centreTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  return {
    ...d, T, C, F,
    wrap: { maxWidth: 1200, margin: '0 auto', paddingInline: 'clamp(20px, 4vw, 44px)', boxSizing: 'border-box', width: '100%' },
    mid: { maxWidth: 860, marginInline: 'auto', textAlign: 'center' },
    sectionPad: 'clamp(56px, 6.5vw, 96px)',
    eyebrow: (color) => ({ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color }),
    h1: { fontFamily: F.display, fontWeight: 400, fontSize: T.type.hero, lineHeight: 1.0, margin: 0, textWrap: 'balance' },
    h2: { fontFamily: F.display, fontWeight: 400, fontSize: T.type.display, lineHeight: 1.04, margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 500, fontSize: 'clamp(21px, 2.1vw, 27px)', lineHeight: 1.18, margin: 0, textWrap: 'balance' },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: T.radius.full, padding: '15px 28px', fontSize: 16.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1.2, boxSizing: 'border-box' },
  }
}

export const btnPrimary = (x) => ({ ...x.btn, background: x.C.accent, color: x.C.onAccent, border: `2px solid ${x.C.accent}` })
export const btnOnPhoto = (x) => ({ ...x.btn, background: '#fff', color: x.C.text, border: '2px solid #fff' })
export const btnOutline = (x, color) => ({ ...x.btn, background: 'transparent', color, border: `1.5px solid ${color}` })

// ---- Styles ---------------------------------------------------------------

function CentreStyles({ x }) {
  const { C, c } = x
  const top = c.chrome_offset || 0
  return (
    <>
      <link rel="stylesheet" href={centreTokens.fontsHref} precedence="default" />
      <style>{`
        .ctr a:focus-visible, .ctr summary:focus-visible, .ctr label:focus-within { outline: 3px solid ${C.accent}; outline-offset: 3px; }
        .ctr img { max-width: 100%; }
        .ctr { overflow-x: clip; }
        /* The nav rides over the hero rather than sitting above the page. */
        .ctr-nav { position: sticky; top: ${top + 14}px; z-index: 50; }
        /* A full-bleed photograph slides under the floating nav; every
           other page keeps the nav above the content in the normal way. */
        .ctr-under-nav { margin-top: -76px; padding-top: 76px; }
        .ctr-nav-menu { display: flex; }
        .ctr-tel { display: inline; }
        /* One service at a time. The radios are the state; no JavaScript, so it
           works on the first paint and on a phone with a slow connection. */
        .ctr-tabs input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
        .ctr-panel { display: none; }
        .ctr-strip label { cursor: pointer; }
        ${(x.services || []).map((s, i) => `
          #ctr-s${i}:checked ~ .ctr-strip label[for="ctr-s${i}"] { background: ${C.accent}; border-color: ${C.accent}; color: ${C.onAccent}; }
          #ctr-s${i}:checked ~ .ctr-panels .ctr-panel:nth-child(${i + 1}) { display: block; }
        `).join('')}
        .ctr-panel-in { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: stretch; }
        .ctr-timeline { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(20px, 3vw, 44px); text-align: center; }
        .ctr-timeline::before { content: ""; position: absolute; top: 19px; left: 16%; right: 16%; height: 1.5px; background: ${C.border}; }
        .ctr-figures { display: grid; grid-template-columns: repeat(var(--n, 4), minmax(0, 1fr)); text-align: center; }
        .ctr-figures > div { padding-inline: 18px; border-left: 1px solid ${C.inverseBorder}; }
        .ctr-figures > div:first-child { border-left: 0; }
        .ctr-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        @media (max-width: 1000px) {
          .ctr-nav-menu { display: none; }
          .ctr-panel-in { grid-template-columns: 1fr; }
          .ctr-figures { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px 0; }
          .ctr-figures > div:nth-child(3) { border-left: 0; }
          .ctr-timeline { grid-template-columns: 1fr; gap: 30px; }
          .ctr-timeline::before { display: none; }
        }
        @media (max-width: 560px) {
          .ctr-tel { display: none; }
          /* The pill stays one row on a phone: a long trading name wrapped it
             onto two lines and pushed it over the top of the hero. */
          .ctr-logo { font-size: 18px; max-width: 46vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .ctr-nav > nav { padding: 8px 8px 8px 18px; }
          .ctr-nav-cta { padding: 11px 16px; font-size: 14.5px; }
          .ctr-under-nav { margin-top: -80px; padding-top: 104px; }
          .ctr-figures { grid-template-columns: 1fr; }
          .ctr-figures > div { border-left: 0; }
        }
      `}</style>
    </>
  )
}

// ---- Chrome ---------------------------------------------------------------

function Nav({ x }) {
  const { C, F, name, logo, phone, phoneDisplay, quoteHref, quoteLabel, href } = x
  const items = navItems(x).slice(0, 4)
  return (
    <div className="ctr-nav" style={{ paddingInline: 'clamp(12px, 2vw, 20px)' }}>
      <nav
        aria-label="Main"
        style={{
          maxWidth: 1160, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, padding: '10px 12px 10px 26px', borderRadius: 999,
          background: 'rgba(255,255,255,0.93)', border: `1px solid ${C.borderLight}`,
          boxShadow: '0 18px 40px -34px rgba(20,16,14,0.8)', backdropFilter: 'blur(10px)',
        }}
      >
        <a href={href.home} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.text }}>
          {logo
            ? <img src={logo} alt={name} style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
            : <span className="ctr-logo" style={{ fontFamily: F.display, fontSize: 21, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{name}</span>}
        </a>
        <span className="ctr-nav-menu" style={{ gap: 26, fontWeight: 600, fontSize: 15.5, color: C.textDim }}>
          {items.map(i => (
            <a key={i.key} href={i.href} style={{ textDecoration: 'none', color: 'inherit' }}>{i.label}</a>
          ))}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {phone && <a className="ctr-tel" href={`tel:${phone}`} style={{ fontWeight: 700, color: C.text, textDecoration: 'none' }}>{phoneDisplay}</a>}
          <a className="ctr-nav-cta" href={quoteHref} style={{ ...btnPrimary(x), padding: '12px 22px', fontSize: 15.5 }}>{quoteLabel}</a>
        </span>
      </nav>
    </div>
  )
}

function Footer({ x }) {
  const { C, F, name, biz, phone, phoneDisplay, href, c } = x
  const items = navItems(x)
  return (
    <footer style={{ background: C.inverseBg, color: C.inverseTextDim, textAlign: 'center', paddingBlock: '44px 46px' }}>
      <div style={x.wrap}>
        <a href={href.home} style={{ fontFamily: F.display, fontSize: 24, color: C.inverseText, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>{name}</a>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', justifyContent: 'center', marginBottom: 20, fontSize: 15.5, fontWeight: 600 }}>
          {items.map(i => <a key={i.key} href={i.href} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>{i.label}</a>)}
          <a href={href.contact} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>Contact</a>
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.8 }}>
          {biz.address_line && <div>{biz.address_line}</div>}
          <div>
            {phone && <a href={`tel:${phone}`} style={{ color: C.inverseText, textDecoration: 'none', fontWeight: 600 }}>{phoneDisplay}</a>}
            {biz.email && <> · <a href={`mailto:${biz.email}`} style={{ color: C.inverseTextDim, textDecoration: 'none' }}>{biz.email}</a></>}
          </div>
          {c.credentials?.license_number && <div>License {c.credentials.license_number}</div>}
        </div>
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.inverseBorder}`, fontSize: 13.5 }}>
          © {new Date().getFullYear()} {biz.legal_name || name}
          {' · '}
          <a href={href.privacy} style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy</a>
        </div>
      </div>
    </footer>
  )
}

/** One CENTRE page: styles, structured data (never on a concept), nav, the
 *  page's own sections, then the footer. */
export function CentrePage({ x, schemas = [], children }) {
  const { C, F, concept } = x
  return (
    <>
      <CentreStyles x={x} />
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <div className="ctr" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: x.T.type.base, lineHeight: 1.62, minHeight: '100vh' }}>
        <Nav x={x} />
        <main>{children}</main>
        <Footer x={x} />
      </div>
    </>
  )
}
