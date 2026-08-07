import { boltTokens as t } from './tokens.js'
import { MobileMenu } from '../../../lib/templates/shared/MobileMenu.js'
import { ServiceIcon } from '../../../lib/templates/shared/icons.js'
import { config } from '../../../lib/templates/configs/example-multi-service.js'
import { buildHomeMetadata, buildLocalBusinessSchema, JsonLd } from '../../../lib/templates/shared/seo/index.js'

const T = t

// SEO metadata for this page - preview mode = noindex
export async function generateMetadata() {
  return buildHomeMetadata(config, { isPreview: true })
}

export default async function BoltHome({ searchParams }) {
  const params = await (searchParams || Promise.resolve({}))
  const accentOverride = params.accent
  const logoOverride = params.logo
  // Apply brand overrides to tokens
  const T = accentOverride ? { ...t, colors: { ...t.colors, accent: accentOverride } } : t
  const c = config

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(config)} />
    <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
      {/* Sticky top emergency bar */}
      {c.positioning.emergency_service && (
        <div style={{ background: T.colors.accent, color: T.colors.bg, padding: '8px 20px', textAlign: 'center', fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          <span style={{ animation: 'pulse 2s infinite' }}>●</span> 24/7 Emergency Service · Call <a href={`tel:${c.business.phone}`} style={{ color: T.colors.bg, textDecoration: 'underline', fontWeight: 700 }}>{c.business.phone_display}</a>
        </div>
      )}

      {/* Header */}
      <header style={{ background: T.colors.bg, borderBottom: `1px solid ${T.colors.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(16px, 4.5vw, 22px)", fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              {(() => {
                const words = c.business.display_name.split(' ')
                if (words.length <= 2) {
                  return <>
                    <span style={{ color: T.colors.accent }}>{words[0]}</span>{words.length > 1 && <span> {words.slice(1).join(' ')}</span>}
                  </>
                }
                const half = Math.ceil(words.length / 2)
                return (
                  <>
                    <div style={{ color: T.colors.accent }}>{words.slice(0, half).join(' ')}</div>
                    <div>{words.slice(half).join(' ')}</div>
                  </>
                )
              })()}
            </div>
          </div>
          <MobileMenu
            items={[
              { href: '/templates/bolt/services', label: 'Services' },
              { href: '/templates/bolt/service-areas', label: 'Areas' },
              { href: '/templates/bolt/about', label: 'About' },
              { href: '/templates/bolt/faq', label: 'FAQ' },
              { href: '/templates/bolt/contact', label: 'Contact' },
            ]}
            phoneNumber={c.business.phone}
            phoneDisplay={c.business.phone_display}
            accent={T.colors.accent}
            bg={T.colors.bg}
            text={T.colors.text}
            textDim={T.colors.textDim}
            borderColor={T.colors.border}
            fontFamily={T.fonts.display}
          />
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: T.colors.bg, padding: 'clamp(32px, 6vw, 60px) clamp(16px, 4vw, 24px) clamp(40px, 8vw, 80px)', borderBottom: `4px solid ${T.colors.accent}` }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'center' }}>
          <div>
            {/* Category strip */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              {[...new Set(c.services.map(s => s.category))].map(cat => (
                <div key={cat} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: '6px 12px', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: T.colors.accent }}>
                  {cat}
                </div>
              ))}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6vw, 68px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              {c.positioning.tagline.split(' ').slice(0, -3).join(' ')} <span style={{ color: T.colors.accent }}>{c.positioning.tagline.split(' ').slice(-3).join(' ')}</span>
            </h1>
            <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.5, margin: '0 0 32px 0' }}>
              {c.positioning.subtagline}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '20px 32px', fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, boxShadow: T.shadow.sharp, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>☎</span> Call {c.business.phone_display}
              </a>
              <a href="/templates/bolt/contact" style={{ background: 'transparent', color: T.colors.text, textDecoration: 'none', padding: '18px 30px', fontFamily: T.fonts.display, fontSize: 20, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', border: `2px solid ${T.colors.text}`, borderRadius: T.radius.sm }}>
                Book Online
              </a>
            </div>

            {/* Trust bar */}
            <div style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 32, borderTop: `1px solid ${T.colors.border}` }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ color: T.colors.accent, fontSize: 20, fontWeight: 700 }}>{c.reviews.google_rating}</span>
                  <span style={{ color: T.colors.accent, fontSize: 16 }}>★★★★★</span>
                </div>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{c.reviews.google_count}+ Google Reviews</div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: T.colors.accent, marginBottom: 4, fontFamily: T.fonts.display }}>{c.business.years_in_business}+</div>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Years Serving KC</div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: T.colors.accent, marginBottom: 4, fontFamily: T.fonts.display }}>24/7</div>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Emergency Response</div>
              </div>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${T.colors.accent} 0%, ${T.colors.accentDim} 100%)`, aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: T.radius.sm, overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontFamily: T.fonts.display, fontSize: 200, fontWeight: 900, color: T.colors.bg, opacity: 0.15, lineHeight: 1, letterSpacing: -8 }}>
                24/7
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 14, color: T.colors.bg, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
                [ HERO IMAGE PLACEHOLDER ]<br/>
                <span style={{ opacity: 0.6, fontSize: 12 }}>Real crew + truck photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar continued */}
      <section style={{ background: T.colors.bgAlt, padding: '32px 24px', borderBottom: `1px solid ${T.colors.border}` }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 3vw, 40px)', justifyContent: 'center', alignItems: 'center' }}>
          {c.certifications.slice(0, 6).map(cert => (
            <div key={cert.name} style={{ fontSize: 13, color: T.colors.textDim, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: T.colors.accent, fontSize: 18 }}>✓</span> {cert.name}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ background: T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>What We Do</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>
              Full-Service <span style={{ color: T.colors.accent }}>Home Services</span>
            </h2>
            <p style={{ fontSize: 18, color: T.colors.textDim, maxWidth: 700, marginTop: 20 }}>
              One call for all your home service needs. Licensed, insured, and family-owned since {c.business.established_year}.
            </p>
          </div>

          {/* Group services by category */}
          {[...new Set(c.services.map(s => s.category))].map(cat => {
            const catServices = c.services.filter(s => s.category === cat)
            return (
              <div key={cat} style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ height: 2, background: T.colors.accent, width: 40 }} />
                  <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{cat}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {catServices.map(svc => (
                    <a key={svc.slug} href={`/templates/bolt/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, transition: T.transition.normal, position: 'relative', display: 'block', borderRadius: T.radius.sm }}>
                      {svc.emergency && (
                        <div style={{ position: 'absolute', top: 12, right: 12, background: T.colors.urgent, color: T.colors.text, fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 8px', borderRadius: T.radius.sm }}>
                          24/7
                        </div>
                      )}
                      <div style={{ color: T.colors.accent, marginBottom: 16 }}>
                        <ServiceIcon name={svc.icon} size={36} />
                      </div>
                      <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 700, color: T.colors.text, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{svc.name}</div>
                      <div style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.5 }}>{svc.short}</div>
                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.colors.border}`, color: T.colors.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                        Learn More →
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ background: T.colors.bgAlt, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>What KC Says</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              {c.reviews.google_rating}<span style={{ color: T.colors.accent }}>★</span> · {c.reviews.google_count}+ Reviews
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 24 }}>
            {c.reviews.featured.map((r, i) => (
              <div key={i} style={{ background: T.colors.bg, border: `1px solid ${T.colors.border}`, padding: 32, borderRadius: T.radius.sm }}>
                <div style={{ color: T.colors.accent, fontSize: 20, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 16, color: T.colors.text, lineHeight: 1.5, margin: '0 0 20px 0' }}>"{r.text}"</p>
                <div style={{ paddingTop: 16, borderTop: `1px solid ${T.colors.border}` }}>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{r.author}</div>
                  <div style={{ fontSize: 12, color: T.colors.textMuted, marginTop: 2 }}>{r.service} · {r.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="areas" style={{ background: T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Where We Serve</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: '0 0 20px 0', lineHeight: 1 }}>
              {c.primary_service_area}
            </h2>
            <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.5, margin: 0 }}>
              Serving families across {c.service_areas.length}+ neighborhoods with same-day and 24/7 emergency response.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
            {c.service_areas.map(area => (
              <a key={area} href={`/templates/bolt/service-areas/${area.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} style={{ padding: '14px 16px', background: T.colors.surface, border: `1px solid ${T.colors.border}`, fontSize: 14, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, textAlign: 'center', color: T.colors.text, textDecoration: 'none', display: 'block' }}>
                {area}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: T.colors.accent, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 5.5vw, 64px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', color: T.colors.bg, margin: '0 0 20px 0', lineHeight: 1 }}>
            Need Service? Call Now.
          </h2>
          <p style={{ fontSize: 20, color: T.colors.bg, opacity: 0.85, marginBottom: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            24/7 emergency service. Free estimates on installs. Financing available.
          </p>
          <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bg, color: T.colors.accent, textDecoration: 'none', padding: '24px clamp(20px, 5vw, 48px)', fontFamily: T.fonts.display, fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, boxShadow: T.shadow.heavy, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36 }}>☎</span> {c.business.phone_display}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: T.colors.bgAlt, padding: '48px 24px 24px', borderTop: `1px solid ${T.colors.border}` }}>
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'clamp(16px, 3vw, 40px)', marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
                <span style={{ color: T.colors.accent }}>{c.business.display_name.split(' ')[0]}</span> {c.business.display_name.split(' ').slice(1).join(' ')}
              </div>
              <div style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.6 }}>
                Family-owned since {c.business.established_year}.<br/>
                Licensed · Bonded · Insured
              </div>
            </div>
            <div>
              <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, color: T.colors.textDim }}>Contact</div>
              <div style={{ fontSize: 14, color: T.colors.text, marginBottom: 8 }}>
                <a href={`tel:${c.business.phone}`} style={{ color: T.colors.accent, textDecoration: 'none', fontWeight: 700 }}>{c.business.phone_display}</a>
              </div>
              <div style={{ fontSize: 14, color: T.colors.textDim, marginBottom: 8 }}>{c.business.email}</div>
              <div style={{ fontSize: 14, color: T.colors.textDim }}>{c.business.hours_display}</div>
            </div>
            <div>
              <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, color: T.colors.textDim }}>Services</div>
              {[...new Set(c.services.map(s => s.category))].map(cat => (
                <div key={cat} style={{ fontSize: 14, color: T.colors.textDim, marginBottom: 6 }}>{cat}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: T.fonts.display, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, color: T.colors.textDim }}>Certifications</div>
              {c.certifications.slice(0, 4).map(cert => (
                <div key={cert.name} style={{ fontSize: 13, color: T.colors.textDim, marginBottom: 6 }}>{cert.name}</div>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: 24, borderTop: `1px solid ${T.colors.border}`, fontSize: 12, color: T.colors.textMuted, textAlign: 'center' }}>
            © {new Date().getFullYear()} {c.business.legal_name}. All rights reserved. Website by MACH Digital Solutions.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
    </>
  )
}
