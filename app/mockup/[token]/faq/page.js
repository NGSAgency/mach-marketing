import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import SereneFAQ from '../../../site/[slug]/renderers/SereneFAQ.js'
import CrewFAQ from '../../../site/[slug]/renderers/CrewFAQ.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = { serene: SereneFAQ, crew: CrewFAQ }

export default async function MockupFAQPage({ params }) {
  const { token } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const Renderer = RENDERERS[result.config.template_slug]
  if (!Renderer) notFound()

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={{ ...result.config, chrome_offset: 44 }} siteSlug={token} />
      </div>
    </>
  )
}
