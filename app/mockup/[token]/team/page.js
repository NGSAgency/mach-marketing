import { ConceptPage } from '../concept.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupTeamPage({ params }) {
  const { token } = await params
  return <ConceptPage token={token} page="Team" offset={false}
  />
}
