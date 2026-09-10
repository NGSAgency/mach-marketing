import { placeDetailMetadata, placeDetailPage } from '../../_pages/places.js'

// Served at /locations. See places.js.
export function generateMetadata(props) { return placeDetailMetadata(props, 'locations') }
export default function Page(props) { return placeDetailPage(props, 'locations') }
