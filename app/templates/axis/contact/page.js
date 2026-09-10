import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from '../components/Chrome.js'
import { AxisPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'contact', title: 'Contact', description: `Contact ${config.business.display_name} for home services in ${config.primary_service_area}.` }, { isPreview: true })
}

export default async function ContactPage({ searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} logo={brand.logo} T={T} />
        <AxisPageHero T={T} eyebrow="Contact" title={<>Get <span style={{ color: T.colors.accent }}>started</span>.</>} sub={c.positioning.emergency_service ? "Call for immediate service or request a free quote below." : "Call or request a free quote below."} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64 }}>
            <div>
              <div style={{ background: T.colors.inverseBg, color: T.colors.inverseText, padding: 40, borderRadius: T.radius.lg, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: T.colors.inverseTextDim, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600, marginBottom: 12 }}>Direct line</div>
                <a href={`tel:${c.business.phone}`} style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 800, color: T.colors.inverseText, textDecoration: 'none', display: 'block', letterSpacing: -1.5 }}>
                  {c.business.phone_display}
                </a>
                <div style={{ fontSize: 15, color: T.colors.inverseTextDim, marginTop: 12 }}>{c.business.hours_display}</div>
              </div>
              <div style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.lg, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Email</div>
                <a href={`mailto:${c.business.email}`} style={{ fontSize: "clamp(15px, 1.6vw, 20px)", color: T.colors.text, textDecoration: 'none', fontWeight: 600 }}>{c.business.email}</a>
              </div>
              <div style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.lg }}>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Office</div>
                <div style={{ fontSize: 17, color: T.colors.text, lineHeight: 1.5 }}>{c.business.address_line}</div>
              </div>
            </div>

            <div>
              <form style={{ background: T.colors.surface, padding: 40, borderRadius: T.radius.lg }}>
                <h2 style={{ fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: -1, margin: '0 0 24px 0', lineHeight: 1.2 }}>Request a free quote.</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Name</label>
                  <input required style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 18px', fontSize: 16, borderRadius: T.radius.md }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Phone</label>
                  <input required type="tel" style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 18px', fontSize: 16, borderRadius: T.radius.md }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Service</label>
                  <select style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 18px', fontSize: 16, borderRadius: T.radius.md }}>
                    <option value="">Select a service</option>
                    {c.services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Message</label>
                  <textarea rows={4} style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 18px', fontSize: 16, borderRadius: T.radius.md, resize: 'vertical' }} />
                </div>
                <button type="submit" style={{ width: '100%', background: T.colors.accent, color: T.colors.onAccent, border: 'none', padding: '18px 24px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, cursor: 'pointer', boxShadow: T.shadow.glow }}>
                  Request quote →
                </button>
              </form>
            </div>
          </div>
        </section>

        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
