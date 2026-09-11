import { ConceptPage } from '../../concept.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupTreatmentPage({ params }) {
  const { token, itemSlug } = await params
  // Every treatment renders with its real image and structure; the renderer
  // shows a note where copy for the others would be.
  return <ConceptPage token={token} page="ServiceDetail" offset={false}
  resolve={config => {
    const service = (config.services || []).find(s => s.slug === itemSlug)
    if (!service) return null
    const generatedSlug = config.generated_for?.service || (config.services || [])[0]?.slug
    return { service, conceptOnly: generatedSlug !== itemSlug }
  }}
  />
}
