import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltFooter } from './BoltServices.js'

export default function BoltContact({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: T.fonts.display, fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 64, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              Get in <span style={{ color: T.colors.accent }}>touch</span>
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Reach us</h2>
              <div style={{ background: T.colors.surface, borderLeft: `4px solid ${T.colors.accent}`, padding: 32, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Call now</div>
                <a href={`tel:${c.business.phone}`} style={{ fontFamily: T.fonts.display, fontSize: 42, fontWeight: 800, color: T.colors.accent, textDecoration: 'none', display: 'block' }}>{c.business.phone_display}</a>
                <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{c.business.hours_display}</div>
              </div>
              <div style={{ background: T.colors.surface, padding: 24, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>Email</div>
                <a href={`mailto:${c.business.email}`} style={{ fontSize: 17, color: T.colors.text, textDecoration: 'none', fontWeight: 600 }}>{c.business.email}</a>
              </div>
              <div style={{ background: T.colors.surface, padding: 24 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>Office</div>
                <div style={{ fontSize: 15, color: T.colors.text }}>{c.business.address_line}</div>
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Request service</h2>
              <form style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>Name</label>
                  <input required style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: 12, fontSize: 15 }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>Phone</label>
                  <input required type="tel" style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: 12, fontSize: 15 }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, color: T.colors.textDim, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>Message</label>
                  <textarea rows={4} style={{ width: '100%', background: T.colors.bg, border: `1px solid ${T.colors.border}`, color: T.colors.text, padding: 12, fontSize: 15, resize: 'vertical' }} />
                </div>
                <button type="submit" style={{ width: '100%', background: T.colors.accent, color: T.colors.bg, border: 'none', padding: '16px 24px', fontFamily: T.fonts.display, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, cursor: 'pointer' }}>Send</button>
              </form>
            </div>
          </div>
        </section>

        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
