import { placeIndexMetadata, placeIndexPage } from '../_pages/places.js'

// Served at /service-areas. See places.js.
export function generateMetadata(props) { return placeIndexMetadata(props, 'service-areas') }
export default function Page(props) { return placeIndexPage(props, 'service-areas') }
