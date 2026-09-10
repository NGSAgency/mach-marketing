import { offeringDetailMetadata, offeringDetailPage } from '../../_pages/offerings.js'

// Served at /treatments. See offerings.js.
export function generateMetadata(props) { return offeringDetailMetadata(props, 'treatments') }
export default function Page(props) { return offeringDetailPage(props, 'treatments') }
