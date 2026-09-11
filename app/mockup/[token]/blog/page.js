import { ConceptPage } from '../concept.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

export default async function MockupBlogPage({ params }) {
  const { token } = await params
  // A concept shows the practice's existing post titles rather than an empty
  // shelf, so they can see their own content in the new structure.
  return <ConceptPage token={token} page="BlogIndex" offset={false}
  resolve={config => ({ posts: config.existing_posts || [] })}
  />
}
