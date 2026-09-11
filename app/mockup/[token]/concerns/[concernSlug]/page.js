import { ConceptPage } from '../../concept.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupConcernPage({ params }) {
  const { token, concernSlug } = await params
  // A concept writes copy for the first concern only; the others go home so a
  // click never lands on an empty page.
  return <ConceptPage token={token} page="Concern" offset={false}
  resolve={config => {
    const concern = (config.concerns || []).find(c => c.slug === concernSlug)
    if (!concern) return null
    return (config.concerns || [])[0]?.slug === concernSlug ? { concern } : { redirectHome: true }
  }}
  />
}
