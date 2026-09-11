import { buildBreadcrumbSchema, urlServiceAreas } from '../../../../lib/templates/shared/seo/index.js'
import { joinList } from '../../../../lib/templates/shared/claims.js'
import { crewContext, CrewPage, PageHero, SectionHead, PinIcon, ArrowIcon } from './CrewChrome.js'

/**
 * Every area, each linking to its page, with its first few services linking
 * to the service-in-area pages.
 */
export default function CrewAreas({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const { T, C, F, wrap, services, areas, href, tradeNoun, placeLabel, sectionPad, phone, phoneDisplay } = x

  const crumbs = [{ name: 'Home', url: '/' }, { name: placeLabel, url: urlServiceAreas(c) }]
  const shownServices = services.slice(0, 4)

  return (
    <CrewPage x={x} current="areas" schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <PageHero
        x={x}
        crumbs={crumbs}
        eyebrow={placeLabel}
        title={`${tradeNoun} service areas`}
        support={areas.length > 0 ? `Serving ${joinList(areas)}.` : null}
      />

      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          {areas.length > 0 ? (
            <>
              <SectionHead x={x} eyebrow="Service areas" title="Where we work" />
              <div className="crew-services">
                {areas.map(a => (
                  <div key={a} style={{ background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, padding: 'clamp(22px, 2.6vw, 28px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <a className="crew-areahead" href={href.area(a)} style={{ color: C.text, textDecoration: 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                        <span style={{ width: 44, height: 44, flex: 'none', borderRadius: '50%', background: C.inverseBg, color: C.inverseText, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PinIcon size={20} /></span>
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', fontFamily: F.display, fontWeight: 800, fontSize: 32, lineHeight: 1, textTransform: 'uppercase' }}>{a}</span>
                          <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: C.textDim, marginTop: 6 }}>{tradeNoun} in {a}</span>
                        </span>
                      </span>
                      <span style={{ color: C.textDim, paddingTop: 10 }}><ArrowIcon /></span>
                    </a>
                    {shownServices.length > 0 && (
                      <ul style={{ listStyle: 'none', margin: 0, padding: '16px 0 0', borderTop: `1px solid ${C.borderLight}`, display: 'grid', gap: 8, fontSize: 15 }}>
                        {shownServices.map(s => (
                          <li key={s.slug}>
                            <a href={href.combo(s, a)} style={{ color: C.textDim, textDecoration: 'underline', textDecorationColor: C.border, textUnderlineOffset: 4 }}>{s.name} in {a}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
              {phone ? <>Call <a href={`tel:${phone}`} style={{ color: C.text, fontWeight: 700 }}>{phoneDisplay}</a> to ask whether we cover your address.</> : <>Ask us whether we cover your address: <a href={href.contact} style={{ color: C.text, fontWeight: 700 }}>get in touch</a>.</>}
            </p>
          )}
        </div>
      </section>
    </CrewPage>
  )
}
