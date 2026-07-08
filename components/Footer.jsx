import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-base font-semibold tracking-tight mb-2">MACH Digital Solutions</div>
            <p className="text-sm text-neutral-600 max-w-md">
              Growth marketing agency serving businesses across industries.
              Based in Kansas City and Boston.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-neutral-600">About</Link></li>
              <li><Link href="/services" className="hover:text-neutral-600">Services</Link></li>
              <li><Link href="/industries" className="hover:text-neutral-600">Industries</Link></li>
              <li><Link href="/contact" className="hover:text-neutral-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Legal</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-neutral-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-neutral-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <div>&copy; {new Date().getFullYear()} MACH Digital Solutions. All rights reserved.</div>
          <div>Kansas City &middot; Boston</div>
        </div>
      </div>
    </footer>
  )
}
