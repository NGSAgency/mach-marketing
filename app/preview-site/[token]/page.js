import { fetchPreviewConfig } from '../../../lib/site/fetch.js'
import { notFound } from 'next/navigation'
import BoltHomeRender from '../../site/[slug]/renderers/BoltHome.js'
import GroveHomeRender from '../../site/[slug]/renderers/GroveHome.js'
import AxisHomeRender from '../../site/[slug]/renderers/AxisHome.js'
import SereneHomeRender from '../../site/[slug]/renderers/SereneHome.js'
import CrewHomeRender from '../../site/[slug]/renderers/CrewHome.js'
import FamilyFonts from '../../templates/FamilyFonts.js'
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
  // Serene and CREW were missing, so a Serene client's preview link showed
  // the BOLT layout instead of the design they approved.
  serene: SereneHomeRender,
  crew: CrewHomeRender,
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
      <FamilyFonts families={[templateSlug]} />
      <PreviewBanner businessName={result.meta?.client_name || config.business?.display_name} />
      <div style={{ paddingTop: 52 }}>
        <Renderer config={{ ...config, chrome_offset: 52 }} />
      </div>
    </>
  )
}
