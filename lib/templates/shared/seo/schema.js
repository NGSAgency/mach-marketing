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
