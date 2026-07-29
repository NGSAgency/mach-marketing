import { axisTokens as T } from './tokens.js'
import { ServiceIcon } from '../../../lib/templates/shared/icons.js'
import { config } from '../../../lib/templates/configs/example-multi-service.js'
import { buildHomeMetadata, buildLocalBusinessSchema, JsonLd } from '../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from './components/Chrome.js'
import { AxisCTA } from './components/Blocks.js'

export async function generateMetadata() {
  return buildHomeMetadata(config, { isPreview: true })
}

export default function AxisHome() {
  const c = config
  const categories = [...new Set(c.services.map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} />

        {/* HERO - full-viewport editorial */}
        <section style={{ background: T.colors.bg, padding: '160px 40px 128px', borderBottom: `1px solid ${T.colors.border}` }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ fontSize: 11, color: T.colors.textDim, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 40 }}>
              Home Services · Est. {c.business.established_year}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 144, fontWeight: 400, letterSpacing: -6, lineHeight: 0.9, margin: 0, color: T.colors.text }}>
              A better way<br/>to <em style={{ fontStyle: 'italic' }}>maintain</em><br/>your home.
            </h1>
            <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
              <p style={{ fontSize: 24, color: T.colors.textDim, lineHeight: 1.4, margin: 0, maxWidth: 600 }}>
                Premium HVAC, plumbing, and electrical care from a single trusted team. Same-day service. Transparent pricing. Financing available.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <a href="/templates/axis/contact" style={{ background: T.colors.text, color: T.colors.bg, textDecoration: 'none', padding: '18px 32px', fontFamily: T.fonts.body, fontSize: 15, fontWeight: 500 }}>
                  Request quote →
                </a>
                <a href={`tel:${c.business.phone}`} style={{ background: 'transparent', color: T.colors.text, textDecoration: 'none', padding: '18px 32px', fontFamily: T.fonts.body, fontSize: 15, fontWeight: 500, border: `1px solid ${T.colors.text}` }}>
                  {c.business.phone_display}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF STRIP - horizontal minimal */}
        <section style={{ background: T.colors.bg, padding: '48px 40px', borderBottom: `1px solid ${T.colors.border}` }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
            {[
              { big: c.reviews.google_rating, small: 'Google rating', huge: '★' },
              { big: `${c.reviews.google_count}+`, small: 'Verified reviews' },
              { big: c.business.years_in_business, small: 'Years in business' },
              { big: c.service_areas.length, small: 'Areas served' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingRight: 40, borderRight: i < 3 ? `1px solid ${T.colors.border}` : 'none' }}>
                <div style={{ fontFamily: T.fonts.display, fontSize: 44, fontWeight: 400, color: T.colors.text, letterSpacing: -2 }}>{s.big}{s.huge && <span style={{ color: T.colors.accent, marginLeft: 4 }}>{s.huge}</span>}</div>
                <div style={{ fontSize: 13, color: T.colors.textDim }}>{s.small}</div>
              </div>
            ))}
          </div>
        </section>

        {/* NUMBERED SERVICES - editorial magazine style */}
        <section style={{ background: T.colors.bg, padding: '160px 40px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 80, marginBottom: 96 }}>
              <div style={{ fontSize: 11, color: T.colors.textDim, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', paddingTop: 12 }}>
                01 — Services
              </div>
              <div>
                <h2 style={{ fontFamily: T.fonts.display, fontSize: 80, fontWeight: 400, letterSpacing: -3, lineHeight: 0.95, margin: 0, maxWidth: 900 }}>
                  A single team for <em style={{ fontStyle: 'italic' }}>every</em> part of your home.
                </h2>
              </div>
            </div>

            {categories.map((cat, idx) => (
              <div key={cat} style={{ paddingTop: 64, paddingBottom: 64, borderTop: `1px solid ${T.colors.border}`, display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 80, alignItems: 'start' }}>
                <div style={{ fontSize: 11, color: T.colors.textDim, fontWeight: 600, letterSpacing: 3 }}>
                  {String(idx + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 400, letterSpacing: -2, lineHeight: 1, margin: 0, color: T.colors.text }}>{cat}</h3>
                  <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.6, margin: '20px 0 0 0', maxWidth: 400 }}>
                    Licensed {cat.toLowerCase()} services for residential customers throughout {c.primary_service_area}.
                  </p>
                </div>
                <div style={{ display: 'grid', gap: 4 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`/templates/axis/services/${svc.slug}`} style={{ textDecoration: 'none', padding: '20px 0', borderBottom: `1px solid ${T.colors.border}`, display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 20, color: T.colors.text, fontWeight: 500, letterSpacing: -0.3 }}>{svc.name}</div>
                        <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 4 }}>{svc.short}</div>
                      </div>
                      {svc.emergency && (<div style={{ fontSize: 10, color: T.colors.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>24/7</div>)}
                      <div style={{ color: T.colors.text, fontSize: 18 }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL - full-bleed editorial */}
        <section style={{ background: T.colors.bgTertiary, padding: '160px 40px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 80 }}>
              <div style={{ fontSize: 11, color: T.colors.textDim, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
                02 — Case
              </div>
              <div>
                <p style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 400, fontStyle: 'italic', color: T.colors.text, lineHeight: 1.15, margin: 0, letterSpacing: -1.5, maxWidth: 1100 }}>
                  "{c.reviews.featured[0].text}"
                </p>
                <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 48, height: 48, background: T.colors.text, color: T.colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontFamily: T.fonts.display }}>
                    {c.reviews.featured[0].author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.colors.text }}>{c.reviews.featured[0].author}</div>
                    <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 2 }}>{c.reviews.featured[0].service} · {c.reviews.featured[0].location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE AREAS - editorial columns */}
        <section style={{ background: T.colors.bg, padding: '160px 40px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 80, marginBottom: 80 }}>
              <div style={{ fontSize: 11, color: T.colors.textDim, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
                03 — Coverage
              </div>
              <div>
                <h2 style={{ fontFamily: T.fonts.display, fontSize: 80, fontWeight: 400, letterSpacing: -3, lineHeight: 0.95, margin: 0 }}>
                  Serving the <em style={{ fontStyle: 'italic' }}>{c.primary_service_area}</em>.
                </h2>
                <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.6, margin: '32px 0 0 0', maxWidth: 600 }}>
                  {c.service_areas.length}+ neighborhoods, one licensed team.
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${T.colors.border}` }}>
              {c.service_areas.map((area, i) => (
                <div key={area} style={{ padding: '24px 32px', borderRight: (i + 1) % 4 !== 0 ? `1px solid ${T.colors.border}` : 'none', borderBottom: `1px solid ${T.colors.border}`, fontSize: 17, fontFamily: T.fonts.display, fontWeight: 400, color: T.colors.text, letterSpacing: -0.3 }}>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        <AxisCTA config={c} />
        <AxisFooter config={c} />
      </div>
    </>
  )
}
