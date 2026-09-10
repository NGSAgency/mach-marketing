import { fetchSiteConfig } from '../../../lib/site/fetch.js'
import FamilyFonts from '../../templates/FamilyFonts.js'

// Loads the site's typefaces for every page under it. The config request is
// shared with the page through fetchSiteConfig's cache.
export default async function SiteLayout({ children, params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })
  const family = result?.config?.template_slug || 'bolt'
  return (
    <>
      <FamilyFonts families={[family]} />
      {children}
    </>
  )
}
