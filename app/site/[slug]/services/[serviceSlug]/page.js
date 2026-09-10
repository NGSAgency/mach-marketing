import { offeringDetailMetadata, offeringDetailPage } from '../../_pages/offerings.js'

// Served at /services. See offerings.js.
export function generateMetadata(props) { return offeringDetailMetadata(props, 'services') }
export default function Page(props) { return offeringDetailPage(props, 'services') }
