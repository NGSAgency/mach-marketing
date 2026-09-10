import { offeringIndexMetadata, offeringIndexPage } from '../_pages/offerings.js'

// Served at /services. See offerings.js.
export function generateMetadata(props) { return offeringIndexMetadata(props, 'services') }
export default function Page(props) { return offeringIndexPage(props, 'services') }
