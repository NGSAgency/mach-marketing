// JSON-LD schema.org generators for home services websites
// One function per schema type; templates compose these

import { slugify } from './metadata.js'

function buildAddress(config) {
  const b = config.business
  return {
    "@type": "PostalAddress",
    "streetAddress": b.address_line || '',
  }
}

function buildAreasServed(config) {
  return (config.service_areas || []).map(a => ({ "@type": "City", "name": a }))
}

/**
 * LocalBusiness schema - use on home page + include on all pages in footer
 */
/**
 * Schema.org type for the business, derived from the industry profile.
 *
 * Medical and aesthetic practices should declare MedicalBusiness rather than
 * the generic LocalBusiness, which is what Google expects for health services
 * and what competitors in those verticals use.
 */
function businessSchemaType(config) {
  const level = config?.profile?.compliance_level
  if (level === 'medical') return ['MedicalBusiness', 'HealthAndBeautyBusiness']

  const key = config?.profile?.key
  if (key === 'auto_detailing') return ['LocalBusiness', 'AutoWash']
  return 'LocalBusiness'
}

export function buildLocalBusinessSchema(config) {
  const b = config.business
  const p = config.positioning
  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')

  const schema = {
    "@context": "https://schema.org",
    "@type": businessSchemaType(config),
    "@id": `${canonical}#business`,
    "name": b.display_name,
    "legalName": b.legal_name,
    "url": canonical,
    "telephone": b.phone,
    "email": b.email,
    "address": buildAddress(config),
    "areaServed": buildAreasServed(config),
    "openingHours": p.emergency_service ? "Mo-Su 00:00-23:59" : "Mo-Fr 07:00-19:00",
    "foundingDate": b.established_year ? `${b.established_year}-01-01` : undefined,
    "priceRange": "$$",
  }

  if (config.reviews?.google_rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": config.reviews.google_rating,
      "reviewCount": config.reviews.google_count,
      "bestRating": 5,
      "worstRating": 1,
    }
  }

  if (config.services && config.services.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": config.services.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name,
          "description": s.description || s.short,
        },
      })),
    }
  }

  return schema
}

/**
 * Service schema - use on individual service pages
 */
export function buildServiceSchema(config, service) {
  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}/services/${service.slug}#service`,
    "name": service.name,
    "description": service.description || service.short,
    "provider": {
      "@type": "LocalBusiness",
      "name": config.business.display_name,
      "telephone": config.business.phone,
      "url": canonical,
    },
    "areaServed": buildAreasServed(config),
    "serviceType": service.category,
  }
}

/**
 * BreadcrumbList schema - use on all nested pages
 */
export function buildBreadcrumbSchema(config, crumbs) {
  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.url.startsWith('http') ? c.url : `${canonical}${c.url}`,
    })),
  }
}

/**
 * FAQPage schema - use on FAQ pages and pages with FAQ sections
 */
export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  }
}

/**
 * WebPage schema - generic wrapper for any page
 */
export function buildWebPageSchema(config, page) {
  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}${page.path}#webpage`,
    "url": `${canonical}${page.path}`,
    "name": page.title,
    "description": page.description,
    "isPartOf": { "@id": `${canonical}#website` },
    "about": { "@id": `${canonical}#business` },
  }
}

/**
 * Combined schema block - inject as one <script type="application/ld+json">
 */
export function buildSchemaBlock(schemas) {
  return schemas.filter(Boolean)
}

/**
 * Article schema for a blog post. Publisher is the client business, so posts
 * accrue authority to them rather than to MACH.
 */
export function buildArticleSchema(config, post) {
  if (!post) return null
  const name = config?.business?.display_name
  const base = config?.meta?.canonical || ''
  const url = base && post.slug ? `${base}/blog/${post.slug}` : undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: name ? { '@type': 'Organization', name } : undefined,
    publisher: name
      ? {
          '@type': 'Organization',
          name,
          logo: config?.brand?.logo_url
            ? { '@type': 'ImageObject', url: config.brand.logo_url }
            : undefined,
        }
      : undefined,
    mainEntityOfPage: url ? { '@type': 'WebPage', '@id': url } : undefined,
    url,
    wordCount: post.word_count || undefined,
  }

  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])
  return schema
}


/**
 * Person schema for a named provider or practitioner.
 *
 * Medical and aesthetic practices are expected to publish Person schema for
 * every named provider. It is also a genuine trust signal: for these buyers,
 * who performs the treatment matters more than the device used.
 *
 * Only emits fields that are actually present. A fabricated credential on a
 * medical practice's site is a regulatory problem, not a marketing shortcut.
 */
export function buildPersonSchema(config, provider) {
  if (!provider?.name) return null

  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')
  const businessName = config.business?.display_name

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": provider.name,
    "jobTitle": provider.title || undefined,
    "description": provider.bio || undefined,
    "image": provider.photo_url || undefined,
    "worksFor": businessName ? {
      "@type": "Organization",
      "name": businessName,
      "@id": canonical ? `${canonical}#business` : undefined,
    } : undefined,
  }

  // Credentials only when the practice actually confirmed them
  if (Array.isArray(provider.credentials) && provider.credentials.length > 0) {
    schema.hasCredential = provider.credentials.map(c => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": c,
    }))
  }

  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])
  return schema
}

/**
 * MedicalProcedure schema for a treatment page.
 *
 * Deliberately conservative: no outcome claims, no efficacy statements, no
 * duration or recovery figures unless the practice supplied them. Schema is
 * machine-readable and unsupported medical claims in it carry the same
 * exposure as unsupported claims in visible copy.
 */
export function buildMedicalProcedureSchema(config, treatment) {
  if (!treatment?.name) return null
  if (config?.profile?.compliance_level !== 'medical') return null

  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": treatment.name,
    "description": treatment.description || treatment.short || undefined,
    "url": canonical && treatment.slug ? `${canonical}/${config.profile.nouns.offering_url}/${treatment.slug}` : undefined,
    "provider": config.business?.display_name ? {
      "@type": "MedicalBusiness",
      "name": config.business.display_name,
      "@id": canonical ? `${canonical}#business` : undefined,
    } : undefined,
  }

  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])
  return schema
}
