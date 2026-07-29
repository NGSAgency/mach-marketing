import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltPageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'contact',
    title: 'Contact Us',
    description: `Contact ${config.business.display_name} for home service quotes and 24/7 emergency service. Serving ${config.primary_service_area}.`
  }, { isPreview: true })
}

export default function ContactPage() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader config={c} />
        <BoltPageHero
          eyebrow="Get In Touch"
          title="Contact Us"
          sub={c.positioning.emergency_service ? "24/7 emergency service. Same-day appointments. Free estimates on installs." : "Fast response. Free estimates. Family-owned service."}
        />

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {/* Contact info column */}
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 32px 0' }}>Reach Us Direct</h2>
              <div style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32, borderRadius: T.radius.sm, marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Call Now</div>
                <a href={`tel:${c.business.phone}`} style={{ fontFamily: T.fonts.display, fontSize: 42, fontWeight: 800, color: T.colors.accent, textDecoration: 'none', display: 'block', letterSpacing: 0.5 }}>
                  {c.business.phone_display}
                </a>
                <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 12 }}>{c.business.hours_display}</div>
              </div>
              <div style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm, marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Email</div>
                <a href={`mailto:${c.business.email}`} style={{ fontSize: 18, color: T.colors.text, textDecoration: 'none', fontWeight: 600 }}>{c.business.email}</a>
              </div>
              <div style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Office</div>
                <div style={{ fontSize: 15, color: T.colors.text, lineHeight: 1.5 }}>{c.business.address_line}</div>
              </div>
            </div>

            {/* Form column */}
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 32px 0' }}>Request Service</h2>
              <form style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32, borderRadius: T.radius.sm }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Name *</label>
                  <input required style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '12px 16px', fontSize: 15, fontFamily: T.fonts.body, borderRadius: T.radius.sm }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Phone *</label>
                  <input required type="tel" style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '12px 16px', fontSize: 15, fontFamily: T.fonts.body, borderRadius: T.radius.sm }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Service Needed</label>
                  <select style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '12px 16px', fontSize: 15, fontFamily: T.fonts.body, borderRadius: T.radius.sm }}>
                    <option value="">Select a service</option>
                    {c.services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Message</label>
                  <textarea rows={4} style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '12px 16px', fontSize: 15, fontFamily: T.fonts.body, borderRadius: T.radius.sm, resize: 'vertical' }} />
                </div>
                <button type="submit" style={{ width: '100%', background: T.colors.accent, color: T.colors.bg, border: 'none', padding: '18px 24px', fontFamily: T.fonts.display, fontSize: 20, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, cursor: 'pointer' }}>
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </section>

        <BoltFooter config={c} />
      </div>
    </>
  )
}
