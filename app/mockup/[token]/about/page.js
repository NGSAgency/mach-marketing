import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import SereneAbout from '../../../site/[slug]/renderers/SereneAbout.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = { serene: SereneAbout }

export default async function MockupAboutPage({ params }) {
  const { token } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const Renderer = RENDERERS[result.config.template_slug]
  if (!Renderer) notFound()

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={result.config} siteSlug={token} />
      </div>
    </>
  )
}
