import { config } from '../../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as t } from '../../tokens.js'
import { ServiceIcon } from '../../../../../lib/templates/shared/icons.js'
import { buildAreaMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForArea, slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import { GroveHeader, GroveFooter } from '../../components/Chrome.js'
import { GroveCTA } from '../../components/Blocks.js'
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
        <GroveHeader config={c} logo={brand.logo} T={T} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 96px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <nav style={{ marginBottom: 24, fontSize: 13, color: T.colors.textMuted }}>
              {crumbs.map((cr, i) => (<span key={i}>{i > 0 && <span style={{ margin: '0 8px' }}>/</span>}{i < crumbs.length - 1 ? <a href={`/templates/grove${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a> : <span style={{ color: T.colors.accent, fontWeight: 600 }}>{cr.name}</span>}</span>))}
            </nav>
            <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Serving {area}</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 76, fontWeight: 500, letterSpacing: -2.5, margin: '0 0 28px 0', lineHeight: 1.02, color: T.colors.text, maxWidth: 900 }}>
              {c.business.display_name} <em style={{ fontStyle: 'italic', color: T.colors.accent }}>in {area}</em>.
            </h1>
            <p style={{ fontSize: 22, color: T.colors.textDim, lineHeight: 1.55, margin: '0 0 40px 0', maxWidth: 700 }}>
              {c.services.length}+ home services. Same-day response. Serving {area} homeowners since {c.business.established_year}.
            </p>
            <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: '20px 40px', fontFamily: T.fonts.body, fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.warm, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
            </a>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 48px 0', color: T.colors.text }}>Services available in {area}</h2>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 48 }}>
                <h3 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 500, letterSpacing: -0.5, color: T.colors.accent, marginBottom: 20 }}>{cat} in {area}</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {c.services.filter(s => s.category === cat).map(svc => (
                    <a key={svc.slug} href={`/templates/grove/${svc.slug}-in-${slugify(area)}`} style={{ textDecoration: 'none', background: T.colors.bgLight, border: `1px solid ${T.colors.border}`, padding: '18px 24px', borderRadius: T.radius.sm, display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ color: T.colors.accent }}><ServiceIcon name={svc.icon} size={24} /></div>
                      <div style={{ flex: 1, fontSize: 16, color: T.colors.text, fontWeight: 500 }}>{svc.name} in {area}</div>
                      <div style={{ color: T.colors.accent }}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <GroveCTA T={T} config={c} headline={`Serving ${area}`} sub="Give us a call. We're probably already on your street." />
        <GroveFooter config={c} T={T} />
      </div>
    </>
  )
}
