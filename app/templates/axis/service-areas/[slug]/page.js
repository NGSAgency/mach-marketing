import { config } from '../../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../../tokens.js'
import { ServiceIcon } from '../../../../../lib/templates/shared/icons.js'
import { buildAreaMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForArea, slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import { AxisHeader, AxisFooter } from '../../components/Chrome.js'
import { AxisCTA } from '../../components/Blocks.js'
import { notFound } from 'next/navigation'
import { getBrandOverrides, applyBrand } from '../../../../../lib/templates/shared/brand.js'

export async function generateStaticParams() { return config.service_areas.map(a => ({ slug: slugify(a) })) }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const area = config.service_areas.find(a => slugify(a) === slug)
  if (!area) return {}
  return buildAreaMetadata(config, area, { isPreview: true })
}

export default async function AreaPage({ params, searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const { slug } = await params
  const c = config
  const area = c.service_areas.find(a => slugify(a) === slug)
  if (!area) notFound()
  const crumbs = breadcrumbsForArea(area)
  const categories = [...new Set(c.services.map(s => s.category))]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} logo={brand.logo} T={T} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', textAlign: 'center' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
            <nav style={{ marginBottom: 32, fontSize: 13, color: T.colors.textDim }}>
              {crumbs.map((cr, i) => (<span key={i}>{i > 0 && <span style={{ margin: '0 8px' }}>/</span>}{i < crumbs.length - 1 ? <a href={`/templates/axis${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a> : <span style={{ color: T.colors.text, fontWeight: 600 }}>{cr.name}</span>}</span>))}
            </nav>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full, marginBottom: 24 }}>Service Area</div>
            <h1 style={{ fontSize: "clamp(32px, 8vw, 88px)", fontWeight: 800, letterSpacing: -3, lineHeight: 1, margin: '0 0 32px 0', color: T.colors.text }}>
              Home service<br /><span style={{ color: T.colors.accent }}>in {area}</span>.
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 720 }}>
              {c.services.length}+ services · Same-day response · Serving {area} homeowners since {c.business.established_year}.
            </p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.glow, display: 'inline-flex', alignItems: 'center', gap: 8 }}>Call {c.business.phone_display}</a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, margin: '0 0 48px 0', lineHeight: 1.05 }}>Services in {area}.</h2>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 48 }}>
                <h3 style={{ fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 20, color: T.colors.text }}>{cat}</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`/templates/axis/${svc.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.bg, padding: '20px 24px', borderRadius: T.radius.md, display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${T.colors.borderLight}`, boxShadow: T.shadow.subtle }}>
                      <div style={{ color: T.colors.accent }}><ServiceIcon name={svc.icon} size={24} /></div>
                      <div style={{ flex: 1, fontSize: 16, color: T.colors.text, fontWeight: 600 }}>{svc.name} in {area}</div>
                      <div style={{ color: T.colors.text }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AxisCTA T={T} config={c} headline={`Serving ${area}.`} />
        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
