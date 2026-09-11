import { buildBreadcrumbSchema, buildLocalBusinessSchema, urlContact } from '../../../../lib/templates/shared/seo/index.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'
import { crewContext, schemaConfig, CrewPage, PageHero, SectionHead, AreaChips, PhoneIcon } from './CrewChrome.js'

/** Contact details from the data, beside the quote form. */
export default function CrewContact({ config: c, siteSlug }) {
  const x = crewContext(c, siteSlug)
  const { T, C, F, wrap, concept, biz, areas, name, emergency, sectionPad, phone, phoneDisplay, eyebrow, btn } = x
  const lic = c.credentials?.license_number

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: urlContact() }]
  const details = [
    biz.email && { k: 'Email', v: biz.email, href: `mailto:${biz.email}` },
    biz.address_line && { k: 'Address', v: biz.address_line },
    biz.hours_display && { k: 'Hours', v: biz.hours_display },
    emergency && { k: 'Emergencies', v: emergency },
    lic && { k: 'License', v: lic },
  ].filter(Boolean)

  return (
    <CrewPage x={x} current="contact" schemas={[buildLocalBusinessSchema(schemaConfig(c)), buildBreadcrumbSchema(c, crumbs)]}>
      <PageHero
        x={x}
        crumbs={crumbs}
        eyebrow="Get a quote"
        title={`Contact ${name}`}
        support={phone ? 'Call us, or tell us what you need below and we’ll get back to you.' : 'Tell us what you need below and we’ll get back to you.'}
        actions="call"
        showProof={false}
      />

      <section style={{ paddingBlock: sectionPad }}>
        <div className="crew-contact" style={wrap}>
          <div>
            {phone && (
              <div style={{ paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
                <div style={eyebrow(C.textMuted)}>Phone</div>
                <a href={`tel:${phone}`} style={{ display: 'inline-block', marginTop: 8, fontFamily: F.display, fontWeight: 800, fontSize: 'clamp(38px, 4.4vw, 52px)', lineHeight: 1, color: C.text, textDecoration: 'none' }}>{phoneDisplay}</a>
                <div style={{ marginTop: 18 }}>
                  <a href={`tel:${phone}`} style={{ ...btn, background: C.accent, color: C.onAccent }}><PhoneIcon /> Call now</a>
                </div>
              </div>
            )}
            {details.length > 0 && (
              <dl style={{ margin: 0, display: 'grid' }}>
                {details.map(d => (
                  <div key={d.k} style={{ paddingBlock: 20, borderBottom: `1px solid ${C.border}` }}>
                    <dt style={eyebrow(C.textMuted)}>{d.k}</dt>
                    <dd style={{ margin: '6px 0 0', fontSize: 19, fontWeight: 600, color: C.text, overflowWrap: 'anywhere' }}>
                      {d.href ? <a href={d.href} style={{ color: C.text }}>{d.v}</a> : d.v}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {areas.length > 0 && (
              <div style={{ paddingTop: 24 }}>
                <div style={{ ...eyebrow(C.textMuted), marginBottom: 14 }}>Areas we serve</div>
                <AreaChips x={x} areas={areas} />
              </div>
            )}
          </div>

          <div id="quote" style={{ background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: T.radius.lg, padding: 'clamp(24px, 4vw, 44px)' }}>
            <SectionHead x={x} eyebrow="Online" title="Request a quote" small style={{ marginBottom: 12 }} />
            <p style={{ margin: '0 0 28px', color: C.textDim, fontSize: 17 }}>Tell us what you need help with and where the property is.</p>
            <ContactForm
              slug={siteSlug}
              concept={concept}
              colors={{
                text: C.text,
                textDim: C.textDim,
                textMuted: C.textMuted,
                border: C.border,
                field: C.bg,
                fieldText: C.text,
                accent: C.accent,
                onAccent: C.onAccent,
                success: C.success,
                urgent: C.urgent,
              }}
              fonts={T.fonts}
              radius={T.radius.md}
              submitLabel="Send request"
            />
          </div>
        </div>
      </section>
    </CrewPage>
  )
}
