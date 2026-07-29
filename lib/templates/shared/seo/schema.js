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
export function buildLocalBusinessSchema(config) {
  const b = config.business
  const p = config.positioning
  const canonical = (config.meta?.canonical || '').replace(/\/$/, '')

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
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
