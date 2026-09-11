// Shared by every concept page: load the concept, work out which layout to
// render (the tab the prospect picked, remembered across the concept's pages
// by the middleware's mach_layout cookie), and wrap the page in the concept
// banner.
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { fetchMockup } from '../../../lib/site/fetch.js'
import { familyMode } from '../../../lib/templates/shared/brand.js'
import { FAMILIES, familyKey, conceptFamily, rendererFor } from '../../site/[slug]/renderers/registry.js'
import MockupBanner from './MockupBanner.js'

export const LAYOUT_COOKIE = 'mach_layout'

/**
 * The concept, the family to render it in, and its config for that family.
 * Every layout renders at the lightness of the concept's own family, so
 * switching tabs changes the layout and nothing else.
 */
export async function loadConcept(token, requested) {
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) return { result }
  const config = result.config
  const own = familyKey(config.template_slug)
  const picked = requested || (await cookies()).get(LAYOUT_COOKIE)?.value || null
  const family = conceptFamily(config, picked)
  const brand = config.brand?.derive && !config.brand?.mode && family !== own
    ? { ...config.brand, mode: familyMode(FAMILIES[own].tokens) }
    : config.brand
  return { result, config: { ...config, brand, template_slug: family }, family, own }
}

/**
 * One concept page. `resolve(config)` returns the page's extra props (the
 * service, the area), or null for a page that doesn't exist.
 */
export async function ConceptPage({ token, page, resolve = () => ({}), offset = true }) {
  const { result, config, family } = await loadConcept(token)
  if (!config) notFound()
  const Renderer = rendererFor(family, page)
  if (!Renderer) notFound()
  const props = resolve(config, family)
  if (props === null) notFound()
  if (props?.redirectHome) redirect(`/mockup/${token}`)
  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={offset ? { ...config, chrome_offset: 44 } : config} siteSlug={token} {...props} />
      </div>
    </>
  )
}
