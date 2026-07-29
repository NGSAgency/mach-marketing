import { groveTokens as T } from './tokens.js'
import { ServiceIcon } from '../../../lib/templates/shared/icons.js'
import { config } from '../../../lib/templates/configs/example-multi-service.js'
import { buildHomeMetadata, buildLocalBusinessSchema, JsonLd } from '../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from './components/Chrome.js'
import { GroveCTA } from './components/Blocks.js'

export async function generateMetadata() {
  return buildHomeMetadata(config, { isPreview: true })
}

export default function GroveHome() {
  const c = config
  const categories = [...new Set(c.services.map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader config={c} />

        {/* Hero */}
        <section style={{ background: T.colors.bg, padding: '96px 32px 120px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>
                Serving {c.primary_service_area} since {c.business.established_year}
              </div>
              <h1 style={{ fontFamily: T.fonts.display, fontSize: 76, fontWeight: 500, letterSpacing: -2.5, margin: '0 0 24px 0', lineHeight: 1.02, color: T.colors.text }}>
                Home services <em style={{ fontStyle: 'italic', color: T.colors.accent, fontWeight: 500 }}>your neighbors trust</em>.
              </h1>
              <p style={{ fontSize: 20, color: T.colors.textDim, lineHeight: 1.6, margin: '0 0 40px 0', maxWidth: 550 }}>
                {c.positioning.subtagline}
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '18px 32px', fontFamily: T.fonts.body, fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.soft, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>☎</span> Call {c.business.phone_display}
                </a>
                <a href="#services" style={{ background: 'transparent', color: T.colors.text, textDecoration: 'none', padding: '18px 32px', fontFamily: T.fonts.body, fontSize: 18, fontWeight: 600, border: `1.5px solid ${T.colors.border}`, borderRadius: T.radius.full }}>
                  Browse services →
                </a>
              </div>

              {/* Trust bar */}
              <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 40, borderTop: `1px solid ${T.colors.border}` }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <span style={{ color: T.colors.secondary, fontSize: 24 }}>★</span>
                    <span style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 600, color: T.colors.text }}>{c.reviews.google_rating}</span>
                  </div>
                  <div style={{ fontSize: 13, color: T.colors.textMuted }}>{c.reviews.google_count}+ Google reviews</div>
                </div>
                <div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 600, color: T.colors.text, marginBottom: 2 }}>{c.business.years_in_business}<span style={{ fontSize: 18 }}>yrs</span></div>
                  <div style={{ fontSize: 13, color: T.colors.textMuted }}>Serving {c.primary_service_area}</div>
                </div>
                <div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 600, color: T.colors.text, marginBottom: 2 }}>24/7</div>
                  <div style={{ fontSize: 13, color: T.colors.textMuted }}>Emergency service</div>
                </div>
              </div>
            </div>

            {/* Image placeholder */}
            <div style={{ background: T.colors.accentGlow, aspectRatio: '3/4', borderRadius: T.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.colors.border}`, position: 'relative', boxShadow: T.shadow.warm }}>
              <div style={{ textAlign: 'center', color: T.colors.accent, fontSize: 14, fontWeight: 500, letterSpacing: 1 }}>
                [ Team photo ]<br/>
                <span style={{ fontSize: 12, color: T.colors.textMuted, marginTop: 8, display: 'block' }}>Real family + crew</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values / story */}
        <section style={{ background: T.colors.bgAlt, padding: '120px 32px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Our Story</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 24px 0', lineHeight: 1.15, color: T.colors.text }}>
              A neighborhood name for {c.business.years_in_business}+ years.
            </h2>
            <p style={{ fontSize: 19, color: T.colors.textDim, lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
              {c.business.display_name} started in {c.business.established_year} with a simple promise: treat every home like our own. Today, we serve {c.service_areas.length}+ neighborhoods with the same personal care we did on day one.
            </p>
          </div>
        </section>

        {/* Services grouped by category */}
        <section id="services" style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>What We Do</div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: -1.5, margin: 0, lineHeight: 1.1, color: T.colors.text }}>
                Everything you need for your home.
              </h2>
            </div>

            {categories.map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 72 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 32, paddingBottom: 20, borderBottom: `1px solid ${T.colors.border}` }}>
                    <h3 style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 500, letterSpacing: -0.5, margin: 0, color: T.colors.text }}>{cat}</h3>
                    <div style={{ fontSize: 14, color: T.colors.textMuted }}>{catServices.length} service{catServices.length === 1 ? '' : 's'}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`/templates/grove/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32, borderRadius: T.radius.md, boxShadow: T.shadow.soft, display: 'block', position: 'relative' }}>
                        {svc.emergency && (
                          <div style={{ position: 'absolute', top: 20, right: 20, background: T.colors.accentGlow, color: T.colors.accent, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.full }}>24/7</div>
                        )}
                        <div style={{ color: T.colors.accent, marginBottom: 20 }}>
                          <ServiceIcon name={svc.icon} size={32} />
                        </div>
                        <div style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 500, color: T.colors.text, marginBottom: 8, letterSpacing: -0.5 }}>{svc.name}</div>
                        <div style={{ fontSize: 15, color: T.colors.textDim, lineHeight: 1.5 }}>{svc.short}</div>
                        <div style={{ marginTop: 24, color: T.colors.accent, fontSize: 14, fontWeight: 600 }}>Learn more →</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Reviews - editorial style */}
        <section style={{ background: T.colors.bgAlt, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>What Neighbors Say</div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 20px 0', lineHeight: 1.1, color: T.colors.text }}>
                <span style={{ color: T.colors.secondary }}>★</span> {c.reviews.google_rating} across {c.reviews.google_count}+ reviews
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {c.reviews.featured.map((r, i) => (
                <div key={i} style={{ background: T.colors.bgLight, padding: 40, borderRadius: T.radius.md, boxShadow: T.shadow.soft, border: `1px solid ${T.colors.borderLight}` }}>
                  <div style={{ color: T.colors.secondary, fontSize: 20, marginBottom: 20, letterSpacing: 2 }}>★★★★★</div>
                  <p style={{ fontFamily: T.fonts.display, fontSize: 18, fontStyle: 'italic', color: T.colors.text, lineHeight: 1.55, margin: '0 0 24px 0' }}>"{r.text}"</p>
                  <div style={{ paddingTop: 20, borderTop: `1px solid ${T.colors.borderLight}` }}>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 17, fontWeight: 600, color: T.colors.text }}>{r.author}</div>
                    <div style={{ fontSize: 13, color: T.colors.textMuted, marginTop: 4 }}>{r.service} · {r.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Where We Serve</div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 24px 0', lineHeight: 1.1, color: T.colors.text }}>
                Your {c.primary_service_area} neighborhood, served.
              </h2>
              <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.6 }}>
                Serving {c.service_areas.length}+ communities with same-day and 24/7 emergency response.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {c.service_areas.map(area => (
                <div key={area} style={{ padding: '16px 20px', background: T.colors.surfaceAlt, border: `1px solid ${T.colors.border}`, fontSize: 15, fontWeight: 500, borderRadius: T.radius.sm, color: T.colors.text }}>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        <GroveCTA config={c} />
        <GroveFooter config={c} />
      </div>
    </>
  )
}
