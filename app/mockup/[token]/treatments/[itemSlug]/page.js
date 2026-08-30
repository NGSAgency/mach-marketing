import { fetchMockup } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltServiceDetail from '../../../../site/[slug]/renderers/BoltServiceDetail.js'
import GroveServiceDetail from '../../../../site/[slug]/renderers/GroveServiceDetail.js'
import AxisServiceDetail from '../../../../site/[slug]/renderers/AxisServiceDetail.js'
import SereneServiceDetail from '../../../../site/[slug]/renderers/SereneServiceDetail.js'
import MockupBanner from '../../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = {
  bolt: BoltServiceDetail,
  grove: GroveServiceDetail,
  axis: AxisServiceDetail,
  serene: SereneServiceDetail,
}

export default async function MockupTreatmentPage({ params }) {
  const { token, itemSlug } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const config = result.config
  const service = (config.services || []).find(s => s.slug === itemSlug)
  if (!service) notFound()

  // A concept generates copy for one treatment rather than all of them.
  // Redirecting the others sends someone who clicked a specific treatment
  // somewhere they did not ask to go, which reads as broken. Instead the page
  // renders with its real image and structure, and the renderer shows an honest
  // note where the written copy would be.
  const generatedSlug = config.generated_for?.service || (config.services || [])[0]?.slug
  const isGenerated = generatedSlug === itemSlug

  const Renderer = RENDERERS[config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={config} siteSlug={token} service={service} conceptOnly={!isGenerated} />
      </div>
    </>
  )
}
