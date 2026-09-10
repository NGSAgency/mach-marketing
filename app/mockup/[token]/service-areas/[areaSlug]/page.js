// Home-services concepts link to /service-areas/<area>; same page as
// /locations/<area>. Segment config is declared here rather than re-exported
// so Next.js can read it statically.
export { default } from '../../locations/[areaSlug]/page.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Website Concept', robots: { index: false, follow: false, nocache: true } }
