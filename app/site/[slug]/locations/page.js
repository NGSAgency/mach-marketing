import { placeIndexMetadata, placeIndexPage } from '../_pages/places.js'

// Served at /locations. See places.js.
export function generateMetadata(props) { return placeIndexMetadata(props, 'locations') }
export default function Page(props) { return placeIndexPage(props, 'locations') }
