import { config } from '../../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as t } from '../../tokens.js'
import { ServiceIcon } from '../../../../../lib/templates/shared/icons.js'
import {
  buildServiceMetadata,
  buildServiceSchema,
  buildBreadcrumbSchema,
  JsonLd
} from '../../../../../lib/templates/shared/seo/index.js'
import { breadcrumbsForService } from '../../../../../lib/templates/shared/seo/urls.js'
import { BoltHeader, BoltFooter } from '../../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../../components/Blocks.js'
import { notFound } from 'next/navigation'
import { getBrandOverrides, applyBrand } from '../../../../../lib/templates/shared/brand.js'

export async function generateStaticParams() {
  return config.services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = config.services.find(s => s.slug === slug)
  if (!service) return {}
  return buildServiceMetadata(config, service, { isPreview: true })
}

export default async function ServicePage({ params, searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const { slug } = await params
  const c = config
  const service = c.services.find(s => s.slug === slug)
  if (!service) notFound()

  const relatedServices = c.services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3)
  const crumbs = breadcrumbsForService(service)

  return (
    <>
      <JsonLd data={buildServiceSchema(c, service)} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader config={c} logo={brand.logo} T={T} />

        {/* Hero with service info */}
        <section style={{ background: T.colors.bg, padding: '60px 24px 80px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            {/* Breadcrumbs */}
            <nav style={{ marginBottom: 24, fontSize: 12, color: T.colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>
              {crumbs.map((cr, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ margin: '0 8px', color: T.colors.border }}>/</span>}
                  {i < crumbs.length - 1
                    ? <a href={`/templates/bolt${cr.url}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>{cr.name}</a>
                    : <span style={{ color: T.colors.accent, fontWeight: 700 }}>{cr.name}</span>
                  }
                </span>
              ))}
            </nav>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ background: T.colors.surface, padding: 10, borderRadius: T.radius.sm, color: T.colors.accent }}>
                    <ServiceIcon name={service.icon} size={32} />
                  </div>
                  <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>{service.category}</div>
                  {service.emergency && (
                    <div style={{ background: T.colors.urgent, color: T.colors.text, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.sm }}>
                      24/7 Emergency
                    </div>
                  )}
                </div>
                <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6vw, 68px)", fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0, lineHeight: 0.95, color: T.colors.text }}>
                  {service.name} in {c.primary_service_area}
                </h1>
                <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", color: T.colors.textDim, lineHeight: 1.5, margin: '24px 0 32px 0', maxWidth: 700 }}>
                  {service.description || service.short}
                </p>
                <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.onAccent, textDecoration: 'none', padding: '20px 32px', fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.8vw, 24px)", fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: T.radius.sm, boxShadow: T.shadow.sharp, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>☎</span> Call {c.business.phone_display}
                </a>
              </div>
              {/* Sidebar with quick facts */}
              <aside style={{ background: T.colors.surface, minWidth: 0, width: '100%', border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm }}>
                <div style={{ fontFamily: T.fonts.display, fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.colors.textDim, marginBottom: 20 }}>Quick Facts</div>
                {[
                  { label: 'Response Time', value: service.emergency ? '2-4 Hours' : 'Same Day' },
                  { label: 'Service Areas', value: `${c.service_areas.length}+ Neighborhoods` },
                  { label: 'Rating', value: `${c.reviews.google_rating}★ (${c.reviews.google_count}+)` },
                  { label: 'Est. Year', value: c.business.established_year },
                ].map(f => (
                  <div key={f.label} style={{ padding: '12px 0', borderTop: `1px solid ${T.colors.border}`, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{f.label}</span>
                    <span style={{ fontSize: 14, color: T.colors.text, fontWeight: 700, textAlign: 'right' }}>{f.value}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section style={{ background: T.colors.bgAlt, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 24px 0' }}>Why Choose {c.business.display_name} for {service.name}</h2>
            <div style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>When you need reliable {service.name.toLowerCase()} in {c.primary_service_area}, {c.business.display_name} is the trusted choice. Our licensed and insured team has been serving the community since {c.business.established_year}, delivering fast, honest, and professional service to homeowners across {c.service_areas.length}+ neighborhoods.</p>
              <p>With {c.reviews.google_count}+ five-star Google reviews and NATE-certified technicians, we bring expertise and integrity to every job. Whether it's a routine service call or an emergency situation, we're ready to help.</p>
              <ul style={{ paddingLeft: 20, marginTop: 32 }}>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Same-day service available</strong> — most jobs completed on first visit</li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Upfront pricing</strong> — no surprises, all quotes provided before work begins</li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Licensed & insured</strong> — fully bonded for your peace of mind</li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>100% satisfaction guarantee</strong> — we stand behind every job</li>
                <li style={{ marginBottom: 12 }}><strong style={{ color: T.colors.text }}>Financing available</strong> — flexible payment options for larger projects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Service areas grid */}
        <section style={{ background: T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 24px 0' }}>{service.name} Near You</h2>
            <p style={{ fontSize: 16, color: T.colors.textDim, marginBottom: 32, maxWidth: 700 }}>
              We provide {service.name.toLowerCase()} services throughout the {c.primary_service_area} area:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
              {c.service_areas.map(area => (
                <a key={area} href={`/templates/bolt/${service.slug}-in-${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ padding: '14px 16px', background: T.colors.surface, border: `1px solid ${T.colors.border}`, fontSize: 14, fontWeight: 600, letterSpacing: 0.3, borderRadius: T.radius.sm, textAlign: 'center', textDecoration: 'none', color: T.colors.text, display: 'block' }}>
                  {service.name} in <span style={{ color: T.colors.accent }}>{area}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
            <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 32px 0' }}>Related {service.category} Services</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {relatedServices.map(svc => (
                  <a key={svc.slug} href={`/templates/bolt/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bg, border: `1px solid ${T.colors.border}`, padding: 24, display: 'block', borderRadius: T.radius.sm }}>
                    <div style={{ color: T.colors.accent, marginBottom: 12 }}><ServiceIcon name={svc.icon} size={28} /></div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>{svc.name}</div>
                    <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 6 }}>{svc.short}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <BoltCTA T={T} config={c} headline={`Need ${service.name}? Call Now.`} />
        <BoltFooter config={c} T={T} />
      </div>
    </>
  )
}
