import { fetchMockup } from '../../../lib/site/fetch.js'
import FamilyFonts from '../../templates/FamilyFonts.js'
import StockLabels from '../../../lib/templates/shared/imagery/StockLabels.js'

// Typefaces for the concept's own family and every layout tab it offers, so
// switching tabs never shows fallback fonts. Shares the page's request.
export default async function MockupLayout({ children, params }) {
  const { token } = await params
  const result = await fetchMockup(token)
  const config = result?.config
  const families = config ? [config.template_slug || 'bolt', ...(config.profile?.families || [])] : []
  return (
    <>
      <FamilyFonts families={families} />
      {/* Stock photos on a concept are tagged "Sample photo". */}
      <StockLabels />
      {children}
    </>
  )
}
