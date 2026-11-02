// The specials page, in each family's chrome.
//
// Command Center sends config.specials (only the offers running today) when
// the page is on. Every word on it is the client's: name, price, usual price,
// description, small print. Nothing is filled in when a field is empty. With
// no offers running, the page still answers at its address and says so, and
// the menu and sitemap leave it out (family/data.js, seo/sitemap.js).
import { buildBreadcrumbSchema } from '../../../../lib/templates/shared/seo/index.js'
import { crewContext, CrewPage, PageHero } from './CrewChrome.js'
import { hearthContext, HearthPage } from './HearthKit.js'
import { levelContext, LevelPage } from './LevelKit.js'
import { centreContext, CentrePage } from './CentreKit.js'
import { bookingContext, BookingPage } from './BookingKit.js'
import { stageContext, StagePage } from './StageKit.js'
import { railContext, RailPage, Masthead, Section } from './RailKit.js'
import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { JsonLd, urlServices } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneFooter } from './SereneServices.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

const cap = (s) => String(s || '').replace(/^\w/, ch => ch.toUpperCase())

/** "2026-11-30" -> "Nov 30" */
function shortDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

/** The page's words and links, the same for every family. */
export function specialsModel(c, siteSlug) {
  const s = c.specials || {}
  const base = c.base_path || `/site/${siteSlug}`
  const booking = /^https?:\/\//i.test(c.business?.booking_url || '') ? c.business.booking_url : null
  const conversion = cap(c.profile?.nouns?.conversion || 'get in touch')
  const offeringPlural = c.profile?.nouns?.offering?.plural || 'services'
  return {
    title: s.title || 'Specials',
    intro: s.intro || null,
    note: s.note || null,
    path: s.path || `/${s.slug || 'specials'}`,
    items: (s.items || []).map(it => {
      const url = it.book_url || booking
      return {
        ...it,
        ends: shortDate(it.ends_on),
        action: url ? { href: url, label: 'Book now', external: true } : { href: `${base}/contact`, label: conversion },
      }
    }),
    empty: {
      line: 'There are no specials running right now.',
      links: [
        { href: `${base}${urlServices(c)}`, label: `See all ${offeringPlural}` },
        booking ? { href: booking, label: 'Book an appointment', external: true } : { href: `${base}/contact`, label: conversion },
      ],
    },
  }
}

const crumbsFor = (m) => [{ name: 'Home', url: '/' }, { name: m.title, url: m.path }]

/**
 * The offers. Price is the thing a visitor scans for, so it sits level with
 * the name in the accent; a usual price, when the client gave one, is struck
 * through beside it. Colours, fonts and corner radius come from the family.
 */
function Offers({ m, C, F, radius = '10px', align = 'left' }) {
  const accent = C.accent || C.text
  const onAccent = C.onAccent || '#fff'
  if (!m.items.length) {
    return (
      <div style={{ display: 'grid', gap: 18, justifyItems: align === 'center' ? 'center' : 'start' }}>
        <p style={{ margin: 0, fontSize: 18, color: C.textDim }}>{m.empty.line}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {m.empty.links.map(l => (
            <a key={l.href} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
              style={{ color: accent, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4 }}>{l.label}</a>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <ul className="mach-offers" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 20 }}>
        {m.items.map(it => (
          <li key={it.id || it.name} style={{
            display: 'flex', flexDirection: 'column', gap: 14, padding: 'clamp(20px, 3vw, 28px)',
            background: C.surface || 'transparent', border: `1px solid ${C.border || C.borderLight || 'rgba(0,0,0,0.12)'}`, borderRadius: radius,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: F.display, fontSize: 22, lineHeight: 1.25, margin: 0, color: C.text, flex: '1 1 200px', textWrap: 'balance' }}>{it.name}</h2>
              {(it.price || it.regular_price) && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                  {it.regular_price && (
                    <s style={{ fontSize: 16, color: C.textMuted || C.textDim }} aria-label={`Usually ${it.regular_price}`}>{it.regular_price}</s>
                  )}
                  {it.price && <span style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: accent }}>{it.price}</span>}
                </div>
              )}
            </div>
            {it.description && (
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: C.textDim, whiteSpace: 'pre-line' }}>{it.description}</p>
            )}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', paddingTop: 4 }}>
              <a href={it.action.href} {...(it.action.external ? { target: '_blank', rel: 'noopener' } : {})}
                style={{ display: 'inline-block', background: accent, color: onAccent, padding: '11px 20px', borderRadius: radius, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                {it.action.label}
              </a>
              {it.ends && <span style={{ fontSize: 14, color: C.textMuted || C.textDim }}>Ends {it.ends}</span>}
            </div>
          </li>
        ))}
      </ul>
      {m.note && <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: C.textMuted || C.textDim, maxWidth: '75ch', whiteSpace: 'pre-line' }}>{m.note}</p>}
    </div>
  )
}

export function CrewSpecials({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  const crumbs = crumbsFor(m)
  return (
    <CrewPage x={x} current="specials" schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <PageHero x={x} crumbs={crumbs} eyebrow={x.name} title={m.title} support={m.intro} showProof={false} />
      <section style={{ paddingBlock: x.sectionPad }}>
        <div style={x.wrap}><Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} /></div>
      </section>
    </CrewPage>
  )
}

/** The plain heading most families use: the title, then the intro. */
function Head({ m, x, center = false }) {
  return (
    <div style={{ marginBottom: 40, textAlign: center ? 'center' : 'left' }}>
      <h1 style={{ ...(x.h1 || {}), fontFamily: x.F.display, fontSize: 'clamp(34px, 4vw, 54px)', margin: '0 0 10px', color: x.C.text }}>{m.title}</h1>
      {m.intro && <p style={{ margin: center ? '0 auto' : 0, fontSize: 18, lineHeight: 1.6, color: x.C.textDim, maxWidth: '62ch', whiteSpace: 'pre-line' }}>{m.intro}</p>}
    </div>
  )
}

export function HearthSpecials({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  return (
    <HearthPage x={x} current="specials" schemas={[buildBreadcrumbSchema(c, crumbsFor(m))]} close={false}>
      <section style={{ paddingBlock: x.sectionPad || 64 }}>
        <div style={x.wrap}>
          <Head m={m} x={x} />
          <Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} />
        </div>
      </section>
    </HearthPage>
  )
}

export function LevelSpecials({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  return (
    <LevelPage x={x} current="specials" schemas={[buildBreadcrumbSchema(c, crumbsFor(m))]}>
      <section style={{ paddingBlock: x.sectionPad || 64 }}>
        <div style={x.wrap}>
          <Head m={m} x={x} />
          <Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} />
        </div>
      </section>
    </LevelPage>
  )
}

export function SereneSpecials({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  const m = specialsModel(c, siteSlug)
  const C = {
    text: T.colors.text, textDim: T.colors.textDim, textMuted: T.colors.textMuted,
    accent: T.colors.accent, onAccent: T.colors.onAccent, border: T.colors.border, surface: T.colors.surface,
  }
  const F = { display: T.fonts.display }
  return (
    <>
      <SereneResponsive border={T.colors.border} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbsFor(m))} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />
        <main style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px, 7vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <div style={{ marginBottom: 44 }}>
            <h1 style={{ fontFamily: T.fonts.display, fontWeight: 400, fontSize: 'clamp(36px, 4.4vw, 58px)', lineHeight: 1.08, margin: '0 0 12px' }}>{m.title}</h1>
            {m.intro && <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: T.colors.textDim, maxWidth: '62ch', whiteSpace: 'pre-line' }}>{m.intro}</p>}
          </div>
          <Offers m={m} C={C} F={F} radius={(T.radius && (T.radius.md || T.radius.sm)) || '4px'} />
        </main>
        <SereneFooter T={T} c={c} base={base} />
      </div>
    </>
  )
}

export function CentreSpecials({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  return (
    <CentrePage x={x} schemas={[buildBreadcrumbSchema(c, crumbsFor(m))]}>
      <section style={{ paddingBlock: x.sectionPad }}>
        <div style={x.wrap}>
          <div style={x.mid}><Head m={m} x={x} center /></div>
          <Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} align="center" />
        </div>
      </section>
    </CentrePage>
  )
}

export function BookingSpecials({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  return (
    <BookingPage x={x} schemas={[buildBreadcrumbSchema(c, crumbsFor(m))]}>
      <section style={{ paddingBlock: x.sectionPad }}>
        <div style={x.wrap}>
          <Head m={m} x={x} />
          <Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} />
        </div>
      </section>
    </BookingPage>
  )
}

export function StageSpecials({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  return (
    <StagePage
      x={x}
      schemas={[buildBreadcrumbSchema(c, crumbsFor(m))]}
      chapters={[{ id: 'offers', n: '01', label: m.title, cap: null, board: null }]}
      showRail={false}
      head={{ shots: [], plate: { kicker: x.name, title: m.title, line: m.items.length ? `${m.items.length} on now` : null } }}
    >
      <section className="stg-chap" id="offers" data-stage-chap="offers">
        <Head m={m} x={x} />
        <Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} />
      </section>
    </StagePage>
  )
}

export function RailSpecials({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = specialsModel(c, siteSlug)
  return (
    <RailPage x={x} schemas={[buildBreadcrumbSchema(c, crumbsFor(m))]}>
      <Masthead x={x} crumbs={crumbsFor(m)} where={x.name} title={m.title} lede={m.intro} />
      <Section x={x}>
        <Offers m={m} C={x.C} F={x.F} radius={x.T.radius.md} />
      </Section>
    </RailPage>
  )
}
