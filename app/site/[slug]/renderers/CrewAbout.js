import { buildBreadcrumbSchema, urlAbout } from '../../../../lib/templates/shared/seo/index.js'
import { aboutBody, credentialLabel } from '../../../../lib/templates/shared/claims.js'
import { asText } from '../../../../lib/templates/shared/pageCopy.js'
import { ConceptNote } from '../../../../lib/templates/shared/components/ConceptNote.js'
import { crewContext, CrewPage, PageHero, SectionHead, Prose, AreaChips, ServiceCard } from './CrewChrome.js'

/**
 * The company: their story and how they work in their words, the facts the
 * data holds (founding year, licence, coverage), and what they do where.
 */
export default function CrewAbout({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const { T, C, F, wrap, concept, services, areas, href, imgs, name, biz, sectionPad } = x
  const gen = c.generated || {}

  const story = aboutBody(c)
  const approach = asText(gen['about|our_approach'])
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: urlAbout() }]

  // Facts, each from a field in the data.
  const lic = c.credentials?.license_number
  const cred = credentialLabel(c)
  const facts = [
    biz.established_year && { value: String(biz.established_year), label: 'Founded' },
    cred && { value: cred === 'Licensed & insured' ? 'Licensed' : cred, label: cred === 'Licensed & insured' ? `and insured${lic ? ` · Lic. ${lic}` : ''}` : (lic ? `Lic. ${lic}` : 'Credentials') },
    !cred && lic && { value: 'Licence', label: lic },
    services.length > 0 && { value: String(services.length), label: services.length === 1 ? 'Service offered' : 'Services offered' },
    areas.length > 0 && { value: String(areas.length), label: areas.length === 1 ? 'Area served' : 'Areas served' },
  ].filter(Boolean)

  return (
    <CrewPage x={x} current="about" schemas={[buildBreadcrumbSchema(c, crumbs)]}>
      <PageHero
        x={x}
        image={imgs.about_hero}
        crumbs={crumbs}
        eyebrow="About us"
        title={`About ${name}`}
      />

      {facts.length > 0 && (
        <section style={{ background: C.surface, borderBottom: `1px solid ${C.borderLight}` }}>
          <div className="crew-proof" style={{ ...wrap, '--n': facts.length, paddingBlock: 28 }}>
            {facts.map((f, i) => (
              <div key={i} style={{ padding: '6px 24px', borderLeft: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 40, lineHeight: 1, textTransform: 'uppercase', color: C.text }}>{f.value}</div>
                <div style={{ fontSize: 15, color: C.textDim, marginTop: 6 }}>{f.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(story || concept) && (
        <section style={{ paddingBlock: sectionPad }}>
          <div className="crew-split" style={wrap}>
            <SectionHead x={x} eyebrow={`About ${name}`} title="Our story" style={{ marginBottom: 0 }} />
            {story ? <Prose x={x} text={story.join('\n\n')} /> : (
              <ConceptNote T={T} minHeight={220} title="Your story, in your words">
                Who started the company and when, what you do and where, and the people who show up at the door. Written from what you tell us and checked by you before it goes live.
              </ConceptNote>
            )}
          </div>
        </section>
      )}

      {(approach || concept) && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div className="crew-split" style={wrap}>
            <SectionHead x={x} eyebrow="How we work" title="Our approach" style={{ marginBottom: 0 }} />
            {approach ? <Prose x={x} text={approach} /> : (
              <ConceptNote T={T} minHeight={200} title="How you do the job">
                How a visit goes from the first call to the follow-up: how you inspect, how you explain what you found, and what you do if a problem comes back.
              </ConceptNote>
            )}
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section style={{ paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead
              x={x}
              eyebrow="Services"
              title="What we take care of"
              aside={<a href={href.services} style={{ color: C.text, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>All services</a>}
            />
            <div className="crew-services">
              {services.slice(0, 3).map(s => <ServiceCard key={s.slug} x={x} s={s} href={href.service(s.slug)} />)}
            </div>
          </div>
        </section>
      )}

      {areas.length > 0 && (
        <section style={{ background: C.bgAlt, paddingBlock: sectionPad }}>
          <div style={wrap}>
            <SectionHead x={x} eyebrow="Service areas" title="Where we work" />
            <AreaChips x={x} areas={areas} />
          </div>
        </section>
      )}
    </CrewPage>
  )
}
