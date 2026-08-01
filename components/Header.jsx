"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname() || ''
  
  // Hide on template previews and client sites - they have their own headers
  if (pathname.startsWith('/templates/') || pathname.startsWith('/site/')) return null

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          MACH Digital Solutions
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/services" className="hover:text-neutral-600 transition-colors">Services</Link>
          <Link href="/industries" className="hover:text-neutral-600 transition-colors">Industries</Link>
          <Link href="/about" className="hover:text-neutral-600 transition-colors">About</Link>
          <Link href="/contact" className="bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-700 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
