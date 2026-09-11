import { ConceptPage } from '../concept.js'
import { slugify } from '../../../../lib/templates/shared/seo/urls.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupComboPage({ params }) {
  const { token, comboSlug } = await params
  // Combo slugs are "<service>-in-<area>". Families that write every pair's
  // page from config.generated_for (CREW, Hearth) render any pair; Serene
  // shows only the pair its copy was written for.
  return <ConceptPage token={token} page="Combo"
  resolve={(config, family) => {
    let matched = null
    for (const svc of config.services || []) {
      const prefix = `${svc.slug}-in-`
      if (comboSlug.startsWith(prefix)) {
        const area = (config.service_areas || []).find(a => slugify(a) === comboSlug.substring(prefix.length))
        if (area) { matched = { service: svc, area }; break }
      }
    }
    if (!matched) return null
    if (family === 'serene') {
      const firstService = (config.services || [])[0]
      const firstArea = (config.service_areas || [])[0]
      if (matched.service.slug !== firstService?.slug || matched.area !== firstArea) return { redirectHome: true }
    }
    return matched
  }}
  />
}
