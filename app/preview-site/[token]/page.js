import { fetchPreviewConfig } from '../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltHomeRender from '../../site/[slug]/renderers/BoltHome.js'
import GroveHomeRender from '../../site/[slug]/renderers/GroveHome.js'
import AxisHomeRender from '../../site/[slug]/renderers/AxisHome.js'
import PreviewBanner from './PreviewBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Site Preview',
  robots: { index: false, follow: false, nocache: true },
}

const RENDERERS = {
  bolt: BoltHomeRender,
  grove: GroveHomeRender,
  axis: AxisHomeRender,
}

export default async function SitePreviewPage({ params }) {
  const { token } = await params
  const result = await fetchPreviewConfig(token)
  if (!result) notFound()

  const config = result.config
  const templateSlug = config.template_slug || 'bolt'
  const Renderer = RENDERERS[templateSlug] || RENDERERS.bolt

  return (
    <>
      <PreviewBanner businessName={result.meta?.client_name || config.business?.display_name} />
      <div style={{ paddingTop: 52 }}>
        <Renderer config={config} />
      </div>
    </>
  )
}
