import { buildBreadcrumbSchema, urlServices } from '../../../../lib/templates/shared/seo/index.js'
import { crewContext, CrewPage, PageHero, SectionHead, ServiceGrid, AreaChips, listAreas } from './CrewChrome.js'

/** Every service, each linking to its page; grouped by category past six. */
export default function CrewServices({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const { C, wrap, services, areas, href, tradeNoun, offeringLabel, sectionPad, phone, phoneDisplay } = x

  const crumbs = [{ name: 'Home', url: '/' }, { name: offeringLabel, url: urlServices(c) }]
  const title = /services?$/i.test(tradeNoun) ? tradeNoun : `${tradeNoun} services`

  return (
    <CrewPage x={x} current="services" schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <PageHero
        x={x}
        crumbs={crumbs}
        eyebrow={areas.length > 0 ? `Serving ${listAreas(areas)}` : null}
        title={title}
      />

      <section style={{ paddingBlock: sectionPad }}>
        <div style={wrap}>
          {services.length > 0 ? (
            <>
              <SectionHead x={x} eyebrow="Services" title="What we take care of" />
              <ServiceGrid x={x} services={services} hrefFor={s => href.service(s.slug)} />
            </>
          ) : (
            <p style={{ margin: 0, fontSize: 19, color: C.textDim, maxWidth: '52ch' }}>
              {phone ? <>Call <a href={`tel:${phone}`} style={{ color: C.text, fontWeight: 700 }}>{phoneDisplay}</a> to talk through what you need.</> : <a href={href.contact} style={{ color: C.text, fontWeight: 700 }}>Get in touch</a>}
            </p>
          )}
        </div>
      </section>

      {areas.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow="Service areas"
              title="Where we work"
              aside={<a href={href.areas} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>All service areas</a>}
            />
            <AreaChips x={x} areas={areas} />
          </div>
        </section>
      )}
    </CrewPage>
  )
}
