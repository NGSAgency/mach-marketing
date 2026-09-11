import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import FamilyFonts from '../../templates/FamilyFonts.js'
import PreviewBar from './PreviewBar.js'
import { familyKey } from './renderers/registry.js'

// Loads the site's typefaces for every page under it. The config request is
// shared with the page through fetchSiteConfig's cache.
//
// On a private preview (the visitor came in through the client's preview
// link), the preview bar goes above every page, where the client approves
// the site or suggests changes.
export default async function SiteLayout({ children, params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  const family = familyKey(result?.config?.template_slug)
  const preview = result?.meta?.preview === true
  return (
    <>
      <FamilyFonts families={[family]} />
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
