import { fetchMockup } from '../../../../../lib/site/fetch.js'
import { notFound, redirect } from 'next/navigation'
import SereneConcern from '../../../../site/[slug]/renderers/SereneConcern.js'
import MockupBanner from '../../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = { serene: SereneConcern }

export default async function MockupConcernPage({ params }) {
  const { token, concernSlug } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const config = result.config
  const concern = (config.concerns || []).find(c => c.slug === concernSlug)
  if (!concern) notFound()

  // A concept generates copy for the first concern only. Others route home so a
  // click never lands on an empty page.
  const isGenerated = (config.concerns || [])[0]?.slug === concernSlug
  if (!isGenerated) redirect(`/mockup/${token}`)

  const Renderer = RENDERERS[config.template_slug]
  if (!Renderer) notFound()

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={config} siteSlug={token} concern={concern} />
      </div>
    </>
  )
}
