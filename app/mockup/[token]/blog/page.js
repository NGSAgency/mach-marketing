import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import SereneBlogIndex from '../../../site/[slug]/renderers/SereneBlogIndex.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = { serene: SereneBlogIndex }

export default async function MockupBlogPage({ params }) {
  const { token } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const Renderer = RENDERERS[result.config.template_slug]
  if (!Renderer) notFound()

  // A concept shows the practice's existing post titles rather than an empty
  // shelf, so they can see their own content in the new structure.
  const posts = result.config.existing_posts || []

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={result.config} siteSlug={token} posts={posts} />
      </div>
    </>
  )
}
