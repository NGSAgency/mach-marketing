import { permanentRedirect } from 'next/navigation'

// The Team page was taken down on 2026-11-04. Its address sends visitors and
// search engines to the home page (308, permanent) rather than to an error.
export default function Team() {
  permanentRedirect('/')
}
