import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import CrewServices from '../../../site/[slug]/renderers/CrewServices.js'
import SereneServices from '../../../site/[slug]/renderers/SereneServices.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

// Home-services concepts link to /services; med spa concepts use /treatments.
const RENDERERS = { crew: CrewServices, serene: SereneServices }

export default async function MockupServicesPage({ params }) {
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
