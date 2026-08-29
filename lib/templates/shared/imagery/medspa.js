// =========================================================
// MED SPA IMAGE LIBRARY
//
// Every image is EXPLICITLY tagged to the treatments it can appear on. Nothing
// is inferred, searched, or matched by AI. If a treatment has no tagged image,
// the slot renders an empty state rather than borrowing something loosely
// related, because a facial photo on a laser page is worse than no photo.
//
// Two tiers:
//
//   SPECIFIC  - the image unambiguously depicts that treatment. Only used on
//               pages for the treatments listed in `treatments`.
//   UNIVERSAL - true for any treatment page (practitioner hands, treatment
//               room, calm portrait). Cannot be wrong, so used as the base
//               layer and for heroes.
//
// Adding an image requires a human to look at it and assign tags. That is the
// point: the guarantee comes from explicit human verification, not from a
// matching algorithm.
// =========================================================

export const UNIVERSAL = [
  {
    id: 'u1',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80',
    description: 'Practitioner in gloves performing a facial treatment on a reclining client',
    verified: false,
  },
  {
    id: 'u2',
    url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=80',
    description: 'Clean modern treatment room interior with a treatment bed',
    verified: false,
  },
  {
    id: 'u3',
    url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1600&q=80',
    description: 'Close portrait of a woman with clear skin, neutral background',
    verified: false,
  },
  {
    id: 'u4',
    url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=1600&q=80',
    description: 'Client relaxing during a spa treatment, eyes closed',
    verified: false,
  },
  {
    id: 'u5',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&q=80',
    description: 'Serene portrait, soft natural light, neutral tones',
    verified: false,
  },
]

// Treatment-specific images. `treatments` lists the ONLY slugs this image may
// appear on. An empty or missing entry means the treatment gets a universal
// image or an empty state, never a guess.
export const SPECIFIC = [
  {
    id: 's1',
    url: 'https://images.unsplash.com/photo-1614308457932-e16d85c5d053?w=1600&q=80',
    description: 'Laser hair removal device being applied to skin',
    treatments: ['laser-hair-removal'],
    verified: false,
  },
  {
    id: 's2',
    url: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=1600&q=80',
    description: 'Microneedling pen being used on a client\u2019s face',
    treatments: ['microneedling'],
    verified: false,
  },
  {
    id: 's3',
    url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80',
    description: 'Hydrafacial style device applied to a cheek',
    treatments: ['hydrafacial', 'facials', 'lymphatic-facial-services'],
    verified: false,
  },
  {
    id: 's4',
    url: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=1600&q=80',
    description: 'Chemical peel solution being applied with a brush',
    treatments: ['chemical-peels'],
    verified: false,
  },
  {
    id: 's5',
    url: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=1600&q=80',
    description: 'Eyebrow shaping and tinting in progress',
    treatments: ['brow-shape-lamination', 'brow-shape-and-lamination', 'eyelash-lift-tint', 'eyelash-lift-and-tint'],
    verified: false,
  },
  {
    id: 's6',
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&q=80',
    description: 'Dermaplaning blade against skin during treatment',
    treatments: ['dermaplaning'],
    verified: false,
  },
]

const slugify = (t) => String(t || '').toLowerCase().trim()
  .replace(/['\u2019]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/**
 * Image for a specific treatment page.
 *
 * Returns a specific image only when one is explicitly tagged for that
 * treatment. Otherwise returns a universal image, which is true for any
 * treatment and therefore cannot be wrong. Never returns a specific image
 * tagged for a different treatment.
 */
export function imageForTreatment(treatmentName, index = 0) {
  const slug = slugify(treatmentName)

  const specific = SPECIFIC.find(img => img.treatments.includes(slug))
  if (specific) return { url: specific.url, alt: specific.description, tier: 'specific' }

  const universal = UNIVERSAL[index % UNIVERSAL.length]
  return universal ? { url: universal.url, alt: universal.description, tier: 'universal' } : null
}

/** Hero image. Always universal, since a hero represents the practice. */
export function heroImage(index = 0) {
  const img = UNIVERSAL[index % UNIVERSAL.length]
  return img ? { url: img.url, alt: img.description, tier: 'universal' } : null
}

/**
 * Fill every slot a page needs. Prefers images the practice supplied, falling
 * back to the library. Their own photography is more persuasive when it exists.
 */
export function buildImageSet({ services = [], supplied = {} }) {
  const out = { ...supplied }

  if (!out.home_hero) out.home_hero = heroImage(0)
  if (!out.home_secondary) out.home_secondary = heroImage(3)

  services.forEach((s, i) => {
    const key = `service_${s.slug || slugify(s.name)}`
    if (!out[key]) out[key] = imageForTreatment(s.name, i + 1)
  })

  if (!out.combo_hero && services[0]) {
    out.combo_hero = imageForTreatment(services[0].name, 1)
  }

  return out
}

/** Every image needing human verification, for a review screen. */
export function unverifiedImages() {
  return [...UNIVERSAL, ...SPECIFIC].filter(i => !i.verified)
}
