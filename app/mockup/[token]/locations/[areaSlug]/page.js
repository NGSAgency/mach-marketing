import { fetchMockup } from '../../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import { slugify } from '../../../../../lib/templates/shared/seo/urls.js'
import BoltAreaDetail from '../../../../site/[slug]/renderers/BoltAreaDetail.js'
import GroveAreaDetail from '../../../../site/[slug]/renderers/GroveAreaDetail.js'
import AxisAreaDetail from '../../../../site/[slug]/renderers/AxisAreaDetail.js'
import SereneAreaDetail from '../../../../site/[slug]/renderers/SereneAreaDetail.js'
import MockupBanner from '../../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = {
  bolt: BoltAreaDetail,
  grove: GroveAreaDetail,
  axis: AxisAreaDetail,
  serene: SereneAreaDetail,
}

// Served at /locations/<area> and, through a re-export, /service-areas/<area>.
export default async function MockupAreaDetailPage({ params }) {
  const { token, areaSlug } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const config = result.config
  const area = (config.service_areas || []).find(a => a && slugify(a) === areaSlug)
  if (!area) notFound()

  const Renderer = RENDERERS[config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={config} siteSlug={token} area={area} />
      </div>
    </>
  )
}
