import { fetchMockup } from '../../../../../lib/site/fetch.js'
import { notFound, redirect } from 'next/navigation'
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

  // Only the first treatment has generated copy: a concept demonstrates the
  // pattern rather than building every page. Others route back to the index so
  // a click never lands on an empty page.
  const isGenerated = (config.services || [])[0]?.slug === itemSlug
  if (!isGenerated) redirect(`/mockup/${token}`)

  const Renderer = RENDERERS[config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={config} siteSlug={token} service={service} />
      </div>
    </>
  )
}
