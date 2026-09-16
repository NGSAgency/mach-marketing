import { bookingTokens } from '../../../templates/booking/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { siteData, navItems, stepsFrom, formColors } from './family/data.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'
import CrewMobileBar from './CrewMobileBar.js'

// BOOKING's chrome and its one big idea: the request card. It sits in the hero
// on the home page and in a sticky column beside the content everywhere else,
// so any page can be acted on without scrolling back to the top.

export function bookingContext(c, siteSlug) {
  const d = siteData(c, siteSlug)
  const T = applyBrand(bookingTokens, brandFrom(c))
  const C = T.colors
  const F = T.fonts
  return {
    ...d, T, C, F,
    wrap: { maxWidth: 1260, margin: '0 auto', paddingInline: 'clamp(20px, 4vw, 48px)', boxSizing: 'border-box', width: '100%' },
    sectionPad: 'clamp(48px, 5.5vw, 78px)',
    eyebrow: (color) => ({ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color }),
    h1: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.hero, lineHeight: 0.99, letterSpacing: '-0.035em', margin: 0, textWrap: 'balance' },
    h2: { fontFamily: F.display, fontWeight: 800, fontSize: T.type.display, lineHeight: 1.04, letterSpacing: '-0.03em', margin: 0, textWrap: 'balance' },
    h3: { fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(20px, 2vw, 25px)', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: T.radius.sm, padding: '15px 26px', fontSize: 16.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1.2, boxSizing: 'border-box' },
    body: { maxWidth: 860, fontSize: 18.5, lineHeight: 1.78, color: C.text },
  }
}

export const btnPrimary = (x) => ({ ...x.btn, background: x.C.accent, color: x.C.onAccent, border: `2px solid ${x.C.accent}` })
export const btnQuiet = (x) => ({ ...x.btn, background: 'transparent', color: x.C.text, border: `2px solid ${x.C.border}` })

function BookingStyles({ x }) {
  const { C, c } = x
  const top = c.chrome_offset || 0
  return (
    <>
      <link rel="stylesheet" href={bookingTokens.fontsHref} precedence="default" />
      <style>{`
        .bk a:focus-visible, .bk summary:focus-visible, .bk button:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 3px; }
        .bk img { max-width: 100%; }
        .bk { overflow-x: clip; }
        .bk-head { position: sticky; top: ${top}px; z-index: 50; background: ${C.bg}; border-bottom: 1px solid ${C.border}; }
        .bk-nav { display: flex; gap: 26px; }
        /* The hero: the argument and the card, side by side. */
        .bk-top { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: clamp(28px, 4vw, 64px); align-items: start; }
        /* Inner pages: content with the card pinned beside it. */
        /* No align-items here: the card column must stretch to the row's full height
   or position: sticky has nothing to travel inside and the card scrolls away
   halfway down a long page. */
        .bk-with-card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 380px); gap: clamp(32px, 4vw, 64px); }
/* The column stretches to the row's full height and the card sticks inside
           it. Sticking the column itself gives it zero travel, because a sticky
           box as tall as its containing block never has anywhere to go. */
        .bk-card-stick { position: sticky; top: ${top + 88}px; }
        /* A sticky box taller than the window would pin its top and put its
           own submit button out of reach, so on a short window it doesn't
           stick at all. */
        @media (max-height: 739px) { .bk-card-stick { position: static; } }
        /* Two unequal columns: an explanation and the list that supports it. */
        .bk-split { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 64px); align-items: start; }
        /* A heading column and a wide field beside it: the coverage band, the
           questions, anywhere a short label introduces a lot of small things. */
        .bk-cover { display: grid; grid-template-columns: minmax(0, 290px) minmax(0, 1fr); gap: clamp(22px, 3.5vw, 56px); align-items: start; }
/* Long prose set in two columns: half the height on screen, and it reads
           as a spread rather than as a page that will not end. */
        .bk-cols { column-count: 2; column-gap: clamp(30px, 4vw, 64px); }
        .bk-cols p { margin: 0 0 18px; break-inside: avoid; }
        .bk-figs { display: grid; grid-template-columns: repeat(var(--n, 4), minmax(0, auto)); justify-content: start; gap: clamp(30px, 6vw, 96px); }
        .bk-steps { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px clamp(30px, 4vw, 64px); }
        .bk-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 clamp(28px, 4vw, 56px); }
        .bk-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(20px, 3vw, 40px); }
        .bk-proof { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; }
        .bk-foot { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
        .crew-mobilebar { display: none !important; }
        @media (max-width: 1000px) {
          .bk-nav { display: none; }
          .bk-top, .bk-with-card, .bk-split, .bk-cover, .bk-steps, .bk-two, .bk-three, .bk-proof, .bk-foot { grid-template-columns: 1fr; gap: 26px; }
          .bk-cols { column-count: 1; }
          .bk-figs { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
          .bk-card-stick { position: static; }
          .crew-mobilebar { display: grid !important; }
          .bk { padding-bottom: 76px; }
        }
        /* On a phone the pinned call bar carries the number, so the top bar
           keeps only the name and one button, both on one line. */
        @media (max-width: 700px) {
          .bk-phone { display: none; }
          .bk-brand span { display: block; max-width: 48vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 18px !important; }
          .bk-brand img { height: 26px !important; }
          .bk-cta { padding: 10px 14px !important; font-size: 14.5px !important; }
        }
      `}</style>
    </>
  )
}

/** The request card: the family's one idea, used in the hero and beside the
 *  content on every inner page. What happens next lives inside it, because
 *  that is the question someone has as they fill it in. */
export function RequestCard({ x, title = 'Request a visit', compact = false }) {
  const { C, F, T, c, concept, biz, phone, phoneDisplay, siteSlug } = x
  const steps = stepsFrom(c.generated?.['home|process']) || []
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`, borderTop: `5px solid ${C.accent}`,
      borderRadius: T.radius.md, padding: compact ? 'clamp(20px, 2.2vw, 26px)' : 'clamp(24px, 2.6vw, 34px)',
      boxShadow: '0 30px 60px -50px rgba(16, 40, 30, 0.7)',
    }}>
      <h2 style={{ fontFamily: F.display, fontWeight: 800, fontSize: compact ? 21 : 25, letterSpacing: '-0.03em', margin: compact ? '0 0 16px' : '0 0 4px', color: C.text }}>{title}</h2>
      {!compact && (
        <p style={{ margin: '0 0 20px', color: C.textMuted, fontSize: 15.5 }}>
          Tell us what's happening and when suits{biz.hours_display ? `. We answer ${biz.hours_display}` : ''}.
        </p>
      )}
      <ContactForm
        slug={siteSlug}
        concept={concept}
        colors={formColors(C, C.bg)}
        fonts={{ body: F.body, display: F.display }}
        radius={6}
        rows={compact ? 3 : 5}
        submitLabel="Request a visit"
      />
      {phone && !compact && (
        <p style={{ margin: '14px 0 0', fontSize: 14.5, color: C.textMuted }}>
          Or call <a href={`tel:${phone}`} style={{ color: C.text, fontWeight: 700 }}>{phoneDisplay}</a>
          {biz.hours_display ? ` · ${biz.hours_display}` : ''}
        </p>
      )}
      {!compact && steps.length > 0 && (
        <div style={{ marginTop: 22, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <h3 style={{ ...x.eyebrow(C.textMuted), margin: '0 0 12px' }}>What happens next</h3>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
            {steps.map((s, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 12, fontSize: 16, color: C.textDim }}>
                <span style={{ fontWeight: 800, color: C.accent, fontSize: 13, paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{s.title && <b style={{ color: C.text }}>{s.title}. </b>}{s.description}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function Header({ x }) {
  const { C, F, name, logo, phone, phoneDisplay, quoteHref, quoteLabel, href } = x
  const items = navItems(x)
  return (
    <header className="bk-head">
      <div style={{ ...x.wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, paddingBlock: 14 }}>
        <a href={href.home} className="bk-brand" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.text, minWidth: 0 }}>
          {logo
            ? <img src={logo} alt={name} style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
            : <span style={{ fontFamily: F.display, fontWeight: 800, fontSize: 21, letterSpacing: '-0.03em' }}>{name}</span>}
        </a>
        <nav className="bk-nav" aria-label="Main" style={{ fontWeight: 600, fontSize: 15.5, color: C.textDim }}>
          {items.map(i => <a key={i.key} href={i.href} style={{ textDecoration: 'none', color: 'inherit' }}>{i.label}</a>)}
        </nav>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {phone && <a href={`tel:${phone}`} className="bk-phone" style={{ fontWeight: 700, color: C.text, textDecoration: 'none', whiteSpace: 'nowrap' }}>{phoneDisplay}</a>}
          <a href={quoteHref} className="bk-cta" style={{ ...btnPrimary(x), padding: '12px 20px', fontSize: 15.5 }}>{quoteLabel}</a>
        </span>
      </div>
    </header>
  )
}

function Footer({ x }) {
  const { C, F, name, biz, phone, phoneDisplay, services, areas, href, c } = x
  return (
    <footer style={{ background: C.inverseBg, color: C.inverseTextDim, paddingBlock: 'clamp(40px, 5vw, 64px) 44px' }}>
      <div style={x.wrap}>
        <div className="bk-foot">
          <div>
            <span style={{ fontFamily: F.display, fontWeight: 800, fontSize: 23, color: C.inverseText, letterSpacing: '-0.03em' }}>{name}</span>
            <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.7 }}>
              {biz.address_line && <>{biz.address_line}<br /></>}
              {phone && <a href={`tel:${phone}`} style={{ color: C.inverseText, fontWeight: 700, textDecoration: 'none' }}>{phoneDisplay}</a>}
              {biz.hours_display && <><br />{biz.hours_display}</>}
              {c.credentials?.license_number && <><br />License {c.credentials.license_number}</>}
            </p>
          </div>
          <div>
            <h4 style={{ ...x.eyebrow('#8fa79b'), margin: '0 0 10px' }}>Services</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 7, fontSize: 16 }}>
              {services.slice(0, 6).map(s => <li key={s.slug}><a href={href.service(s.slug)} style={{ color: 'inherit', textDecoration: 'none' }}>{s.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ ...x.eyebrow('#8fa79b'), margin: '0 0 10px' }}>Areas</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 7, fontSize: 16 }}>
              {areas.slice(0, 6).map(a => <li key={a}><a href={href.area(a)} style={{ color: 'inherit', textDecoration: 'none' }}>{a}</a></li>)}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 30, paddingTop: 18, borderTop: `1px solid ${C.inverseBorder}`, fontSize: 13.5 }}>
          © {new Date().getFullYear()} {biz.legal_name || name}
          {' · '}
          <a href={href.privacy} style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy</a>
        </div>
      </div>
    </footer>
  )
}

export function MobileBar({ x }) {
  return <CrewMobileBar phone={x.phone} phoneDisplay={x.phoneDisplay} quoteHref={x.quoteHref} colors={x.C} fontFamily={x.F.body} />
}

export function BookingPage({ x, schemas = [], children }) {
  const { C, F, concept } = x
  return (
    <>
      <BookingStyles x={x} />
      {!concept && schemas.filter(Boolean).map((s, i) => <JsonLd key={i} data={s} />)}
      <div className="bk" style={{ background: C.bg, color: C.text, fontFamily: F.body, fontSize: x.T.type.base, lineHeight: 1.62, minHeight: '100vh' }}>
        <Header x={x} />
        <main>{children}</main>
        <Footer x={x} />
        <MobileBar x={x} />
      </div>
    </>
  )
}
