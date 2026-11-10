import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import FamilyFonts from '../../templates/FamilyFonts.js'
import PreviewBar from './PreviewBar.js'
import { familyKey } from './renderers/registry.js'
import { TrackingScripts } from '../../../lib/site/tracking.js'
import LeadEvents from '../../../lib/site/events.js'
import { JsonLd, buildBusinessNode } from '../../../lib/templates/shared/seo/index.js'
import { cookies } from 'next/headers'

// Loads the site's typefaces for every page under it, and the client's
// analytics tags. The config request is shared with the page through
// fetchSiteConfig's cache.
//
// The tags live here rather than in each family's chrome so that a page type
// or a family added later measures from its first visit without anyone having
// to remember. A private preview is the client looking at their own
// unpublished site, so it is deliberately not counted.
//
// On a private preview (the visitor came in through the client's preview
// link), the preview bar goes above every page, where the client approves
// the site or suggests changes.
export default async function SiteLayout({ children, params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  const family = familyKey(result?.config?.template_slug)
  const preview = result?.meta?.preview === true
  // Our own browsers (marked by a Command Center staff link) are tagged as
  // internal traffic so the client's analytics leaves them out
  let staff = false
  try { staff = !!(await cookies()).get('mach_staff')?.value } catch {}
  const bookingUrl = result?.config?.business?.booking_url || null
  return (
    <>
      <FamilyFonts families={[family]} />
      {/* Whose site this is, on every page: the same @id as the home page's
          full business record (lib/templates/shared/seo/schema.js). */}
      {result?.config && buildBusinessNode(result.config) && <JsonLd data={buildBusinessNode(result.config)} />}
      {!preview && <TrackingScripts tracking={result?.config?.tracking} internal={staff} />}
      {!preview && <LeadEvents bookingUrl={bookingUrl} />}
      {preview && (
        <PreviewBar
          slug={slug}
          businessName={result.config?.business?.display_name}
          approvedAt={result.meta.approved_at || null}
          approvedBy={result.meta.approved_by || null}
        />
      )}
      {children}
    </>
  )
}
