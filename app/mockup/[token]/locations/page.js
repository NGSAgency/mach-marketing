import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltAreas from '../../../site/[slug]/renderers/BoltAreas.js'
import GroveAreas from '../../../site/[slug]/renderers/GroveAreas.js'
import AxisAreas from '../../../site/[slug]/renderers/AxisAreas.js'
import SereneAreas from '../../../site/[slug]/renderers/SereneAreas.js'
import CrewAreas from '../../../site/[slug]/renderers/CrewAreas.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = {
  bolt: BoltAreas,
  grove: GroveAreas,
  axis: AxisAreas,
  serene: SereneAreas,
  crew: CrewAreas,
}

// Served at /locations and, through a re-export, /service-areas: the place
// segment comes from the industry profile, so concepts link to either.
export default async function MockupAreasPage({ params }) {
  const { token } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const Renderer = RENDERERS[result.config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={{ ...result.config, chrome_offset: 44 }} siteSlug={token} />
      </div>
    </>
  )
}
