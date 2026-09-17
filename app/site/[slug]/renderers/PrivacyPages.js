// The privacy notice, in each family's chrome.
//
// One set of words (lib/site/privacy.js) laid out as plain prose, so a legal
// page can't drift between families or quietly go missing when a new family is
// built: adding one here is a five-line wrapper.
import { privacyModel } from '../../../../lib/site/privacy.js'
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
import { JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneFooter } from './SereneServices.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

const crumbs = [{ name: 'Home', url: '/' }, { name: 'Privacy', url: '/privacy' }]

/** The notice itself: headings, paragraphs, the odd list. Colours come in. */
function Notice({ m, colors: C, fonts: F, maxWidth = '68ch' }) {
  if (m.override) {
    return (
      <div style={{ maxWidth, display: 'grid', gap: 18 }}>
        {String(m.override).split(/\n{2,}/).map((p, i) => (
          <p key={i} style={{ margin: 0, fontSize: 17.5, lineHeight: 1.75, color: C.textDim }}>{p.trim()}</p>
        ))}
      </div>
    )
  }
  return (
    <div style={{ maxWidth, display: 'grid', gap: 34 }}>
      {m.sections.map((s, i) => (
        <section key={i}>
          <h2 style={{ fontFamily: F.display, fontSize: 23, lineHeight: 1.2, margin: '0 0 12px', color: C.text, letterSpacing: '-0.01em' }}>
            {s.heading}
          </h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {(s.paragraphs || []).map((p, j) => (
              <p key={j} style={{ margin: 0, fontSize: 17.5, lineHeight: 1.75, color: C.textDim }}>{p}</p>
            ))}
            {s.items && (
              <ul style={{ margin: 0, paddingLeft: 22, display: 'grid', gap: 8 }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 17.5, lineHeight: 1.7, color: C.textDim }}>{it}</li>
                ))}
              </ul>
            )}
            {(s.after || []).map((p, j) => (
              <p key={j} style={{ margin: 0, fontSize: 17.5, lineHeight: 1.75, color: C.textDim }}>{p}</p>
            ))}
          </div>
        </section>
      ))}
      <p style={{ margin: 0, fontSize: 15, color: C.textMuted || C.textDim }}>Last updated {m.updated}</p>
    </div>
  )
}

export function CrewPrivacy({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <CrewPage x={x} current="privacy" schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <PageHero x={x} crumbs={crumbs} eyebrow="Legal" title={m.title} showProof={false} />
      <section style={{ paddingBlock: x.sectionPad }}>
        <div style={x.wrap}><Notice m={m} colors={x.C} fonts={x.F} /></div>
      </section>
    </CrewPage>
  )
}

export function HearthPrivacy({ config: c, siteSlug }) {
  const x = hearthContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <HearthPage x={x} current="privacy" schemas={[buildBreadcrumbSchema(c, crumbs)]} close={false}>
      <section style={{ paddingBlock: x.sectionPad || 64 }}>
        <div style={x.wrap}>
          <h1 style={{ fontFamily: x.F.display, fontSize: 'clamp(34px, 4vw, 52px)', margin: '0 0 8px', color: x.C.text }}>{m.title}</h1>
          <p style={{ margin: '0 0 36px', fontSize: 18, color: x.C.textDim }}>{m.intro}</p>
          <Notice m={m} colors={x.C} fonts={x.F} />
        </div>
      </section>
    </HearthPage>
  )
}

export function LevelPrivacy({ config: c, siteSlug }) {
  const x = levelContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <LevelPage x={x} current="privacy" schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <section style={{ paddingBlock: x.sectionPad || 64 }}>
        <div style={x.wrap}>
          <h1 style={{ fontFamily: x.F.display, fontSize: 'clamp(34px, 4vw, 52px)', margin: '0 0 8px', color: x.C.text }}>{m.title}</h1>
          <p style={{ margin: '0 0 36px', fontSize: 18, color: x.C.textDim }}>{m.intro}</p>
          <Notice m={m} colors={x.C} fonts={x.F} />
        </div>
      </section>
    </LevelPage>
  )
}

export function SerenePrivacy({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  const m = privacyModel(c)
  const C = { text: T.colors.text, textDim: T.colors.textDim, textMuted: T.colors.textMuted }
  const F = { display: T.fonts.display }
  return (
    <>
      <SereneResponsive border={T.colors.border} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />
        <main style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px, 7vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(34px, 4vw, 54px)', margin: '0 0 8px' }}>{m.title}</h1>
          <p style={{ margin: '0 0 40px', fontSize: 18, color: T.colors.textDim }}>{m.intro}</p>
          <Notice m={m} colors={C} fonts={F} />
        </main>
        <SereneFooter T={T} c={c} base={base} />
      </div>
    </>
  )
}

export function CentrePrivacy({ config: c, siteSlug }) {
  const x = centreContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <CentrePage x={x} schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <section style={{ paddingBlock: x.sectionPad }}>
        <div style={x.wrap}>
          <div style={x.mid}>
            <h1 style={{ ...x.h1, fontSize: 'clamp(34px, 4vw, 54px)', marginBottom: 10 }}>{m.title}</h1>
            <p style={{ margin: '0 auto 40px', fontSize: 18, color: x.C.textDim }}>{m.intro}</p>
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <Notice m={m} colors={x.C} fonts={x.F} maxWidth="none" />
          </div>
        </div>
      </section>
    </CentrePage>
  )
}

export function BookingPrivacy({ config: c, siteSlug }) {
  const x = bookingContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <BookingPage x={x} schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <section style={{ paddingBlock: x.sectionPad }}>
        <div style={x.wrap}>
          <h1 style={{ ...x.h1, fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 10 }}>{m.title}</h1>
          <p style={{ margin: '0 0 40px', fontSize: 18, color: x.C.textDim }}>{m.intro}</p>
          <Notice m={m} colors={x.C} fonts={x.F} />
        </div>
      </section>
    </BookingPage>
  )
}

export function StagePrivacy({ config: c, siteSlug }) {
  const x = stageContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <StagePage
      x={x}
      schemas={[buildBreadcrumbSchema(c, crumbs)]}
      chapters={[{ id: 'notice', n: '01', label: 'Legal', cap: null, board: null }]}
      showRail={false}
      head={{ shots: [], plate: { kicker: 'Legal', title: m.title, line: `Last updated ${m.updated}` } }}
    >
      <section className="stg-chap" id="notice" data-stage-chap="notice">
        <h1 style={{ ...x.h1, fontSize: 'clamp(30px, 3.6vw, 48px)', marginBottom: 10 }}>{m.title}</h1>
        <p style={{ margin: '0 0 36px', fontSize: 17.5, color: x.C.textDim }}>{m.intro}</p>
        <Notice m={m} colors={x.C} fonts={x.F} />
      </section>
    </StagePage>
  )
}

export function RailPrivacy({ config: c, siteSlug }) {
  const x = railContext(c, siteSlug)
  const m = privacyModel(c)
  return (
    <RailPage x={x} schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <Masthead x={x} crumbs={crumbs} where="Legal" title={m.title} lede={m.intro} />
      <Section x={x}>
        <Notice m={m} colors={x.C} fonts={x.F} />
      </Section>
    </RailPage>
  )
}
