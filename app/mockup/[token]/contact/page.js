import { fetchMockup } from '../../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltContact from '../../../site/[slug]/renderers/BoltContact.js'
import GroveContact from '../../../site/[slug]/renderers/GroveContact.js'
import AxisContact from '../../../site/[slug]/renderers/AxisContact.js'
import SereneContact from '../../../site/[slug]/renderers/SereneContact.js'
import MockupBanner from '../MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }

const RENDERERS = {
  bolt: BoltContact,
  grove: GroveContact,
  axis: AxisContact,
  serene: SereneContact,
}

export default async function MockupContactPage({ params }) {
  const { token } = await params
  const result = await fetchMockup(token)
  if (!result || result.error || !result.config) notFound()

  const Renderer = RENDERERS[result.config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={result.config} siteSlug={token} />
      </div>
    </>
  )
}
