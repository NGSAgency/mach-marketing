export const metadata = { title: 'About' }

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">About</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Who we are and how we work.</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-neutral-700 mb-6">
          {'[[EDIT: Company story — how MACH was founded, why, the origin of the name]]'}
          MACH Digital Solutions was founded in 2026 by Chris Nothnick, Sawyer Smith, and Mark Gorman.
          We saw an opportunity to bring modern marketing infrastructure to businesses that had been underserved
          by traditional agencies.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Our founders</h2>

        <div className="mb-6">
          <div className="font-semibold">Chris Nothnick</div>
          <div className="text-sm text-neutral-500 mb-2">Co-founder · Kansas City</div>
          <p className="text-neutral-700">
            {'[[EDIT: Chris bio]]'} Background in [x], focused on platform infrastructure and technical strategy.
          </p>
        </div>

        <div className="mb-6">
          <div className="font-semibold">Sawyer Smith</div>
          <div className="text-sm text-neutral-500 mb-2">Co-founder · Boston</div>
          <p className="text-neutral-700">
            {'[[EDIT: Sawyer bio]]'}
          </p>
        </div>

        <div className="mb-6">
          <div className="font-semibold">Mark Gorman</div>
          <div className="text-sm text-neutral-500 mb-2">Co-founder</div>
          <p className="text-neutral-700">
            {'[[EDIT: Mark bio]]'}
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">How we work</h2>
        <p className="text-neutral-700 mb-6">
          {'[[EDIT: How we work with clients — process, values, approach]]'}
        </p>
      </div>
    </div>
  )
}
