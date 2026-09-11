import { ConceptPage } from '../../concept.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupServicePage({ params }) {
  const { token, itemSlug } = await params
  // Every service renders: the one the concept's copy was written for shows
  // it, the others their real image and structure with a note where the copy
  // goes (families work that out from config.generated_for; Serene also takes
  // conceptOnly).
  return <ConceptPage token={token} page="ServiceDetail"
  resolve={config => {
    const service = (config.services || []).find(s => s.slug === itemSlug)
    if (!service) return null
    const generatedSlug = config.generated_for?.service || (config.services || [])[0]?.slug
    return { service, conceptOnly: generatedSlug !== itemSlug }
  }}
  />
}
