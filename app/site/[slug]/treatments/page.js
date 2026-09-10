import { offeringIndexMetadata, offeringIndexPage } from '../_pages/offerings.js'

// Served at /treatments. See offerings.js.
export function generateMetadata(props) { return offeringIndexMetadata(props, 'treatments') }
export default function Page(props) { return offeringIndexPage(props, 'treatments') }
