import { permanentRedirect } from 'next/navigation'

// The About page was an unfinished draft (placeholder text, founders' names)
// and was taken down on 2026-11-04. Its address sends visitors and search
// engines to the home page (308, permanent) until a finished page replaces it.
export default function About() {
  permanentRedirect('/')
}
