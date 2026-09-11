import { fetchMockup } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltServiceDetail from '../../../../site/[slug]/renderers/BoltServiceDetail.js'
import GroveServiceDetail from '../../../../site/[slug]/renderers/GroveServiceDetail.js'
import AxisServiceDetail from '../../../../site/[slug]/renderers/AxisServiceDetail.js'
import SereneServiceDetail from '../../../../site/[slug]/renderers/SereneServiceDetail.js'
import CrewServiceDetail from '../../../../site/[slug]/renderers/CrewServiceDetail.js'
import MockupBanner from '../../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = {
  bolt: BoltServiceDetail,
  grove: GroveServiceDetail,
  axis: AxisServiceDetail,
  serene: SereneServiceDetail,
  crew: CrewServiceDetail,
}

// Home-services concepts link to /services/<service>. Every service renders:
// the one the concept's copy was written for shows it, and the others show
// their real image and structure with an honest note where the copy goes
// (CREW works that out from config.generated_for; the other families take
// conceptOnly, as on /treatments/<item>).
export default async function MockupServicePage({ params }) {
  const { token, itemSlug } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const config = result.config
  const service = (config.services || []).find(s => s.slug === itemSlug)
  if (!service) notFound()

  const generatedSlug = config.generated_for?.service || (config.services || [])[0]?.slug
  const isGenerated = generatedSlug === itemSlug

  const Renderer = RENDERERS[config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={{ ...config, chrome_offset: 44 }} siteSlug={token} service={service} conceptOnly={!isGenerated} />
      </div>
    </>
  )
}
