import { ConceptPage } from '../../concept.js'
import { slugify } from '../../../../../lib/templates/shared/seo/urls.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupAreaDetailPage({ params }) {
  const { token, areaSlug } = await params
  // Served at /locations/<area> and, through a re-export, /service-areas/<area>.
  return <ConceptPage token={token} page="AreaDetail"
  resolve={config => {
    const area = (config.service_areas || []).find(a => a && slugify(a) === areaSlug)
    return area ? { area } : null
  }}
  />
}
