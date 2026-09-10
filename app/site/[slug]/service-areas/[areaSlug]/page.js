import { placeDetailMetadata, placeDetailPage } from '../../_pages/places.js'

// Served at /service-areas. See places.js.
export function generateMetadata(props) { return placeDetailMetadata(props, 'service-areas') }
export default function Page(props) { return placeDetailPage(props, 'service-areas') }
