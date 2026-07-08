import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Growth marketing<br />that actually grows things.
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl">
            {'[[EDIT: hero paragraph here]]'} We build websites, run campaigns, and rank businesses that don't have time to figure out the marketing side.
            Partners in Kansas City and Boston.
          </p>
          <div className="flex gap-3">
            <Link href="/contact" className="bg-neutral-900 text-white px-6 py-3 rounded-md font-medium hover:bg-neutral-700 transition-colors">
              Get in touch
            </Link>
            <Link href="/services" className="bg-white text-neutral-900 border border-neutral-200 px-6 py-3 rounded-md font-medium hover:border-neutral-400 transition-colors">
              Our services
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">What we do</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Three ways we help businesses grow.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-lg font-semibold mb-2">Search &amp; SEO</div>
              <p className="text-sm text-neutral-600">
                {'[[EDIT: SEO description]]'} Get found by people already searching for what you offer. Technical SEO, content strategy, and local rankings.
              </p>
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">Paid Media</div>
              <p className="text-sm text-neutral-600">
                {'[[EDIT: Paid media description]]'} Targeted Google, Meta, and LinkedIn campaigns that convert. We manage strategy, creative, and optimization.
              </p>
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">Websites &amp; Automation</div>
              <p className="text-sm text-neutral-600">
                {'[[EDIT: Websites description]]'} Fast, modern websites paired with automated lead capture, CRM integration, and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Who we are</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            A hands-on team of three.
          </h2>
          <p className="text-neutral-600 max-w-2xl mb-6">
            {'[[EDIT: Founder blurb here]]'} MACH Digital Solutions was founded by Chris Nothnick, Sawyer Smith, and Mark Gorman.
            Between Kansas City and Boston we bring hands-on execution to every account.
          </p>
          <Link href="/about" className="inline-block text-sm font-medium text-neutral-900 hover:text-neutral-600">
            Learn more about us →
          </Link>
        </div>
      </section>
    </div>
  )
}
