// Schema.org LocalBusiness generator for home services companies
export function generateBusinessSchema(config) {
  const b = config.business
  const p = config.positioning
  const primary_type = "LocalBusiness"

  return {
    "@context": "https://schema.org",
    "@type": primary_type,
    "name": b.display_name,
    "legalName": b.legal_name,
    "telephone": b.phone,
    "email": b.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": b.address_line,
    },
    "areaServed": (config.service_areas || []).map(a => ({ "@type": "City", "name": a })),
    "openingHours": p.emergency_service ? "Mo-Su 00:00-23:59" : "Mo-Fr 07:00-19:00",
    "foundingDate": b.established_year ? `${b.established_year}-01-01` : undefined,
    "aggregateRating": config.reviews?.google_rating ? {
      "@type": "AggregateRating",
      "ratingValue": config.reviews.google_rating,
      "reviewCount": config.reviews.google_count,
    } : undefined,
    "makesOffer": (config.services || []).map(s => ({
      "@type": "Offer",
      "name": s.name,
      "description": s.description,
    })),
  }
}
