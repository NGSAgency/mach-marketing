import './globals.css'
import './mach-responsive.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://machdigitalsolutions.com'),
  title: {
    default: 'MACH Digital Solutions | Growth Marketing Agency',
    template: '%s | MACH Digital Solutions',
  },
  description: 'MACH Digital Solutions helps businesses grow through SEO, paid media, and website development. Based in Kansas City and Boston.',
  openGraph: {
    title: 'MACH Digital Solutions',
    description: 'Growth marketing agency serving businesses across industries.',
    url: 'https://machdigitalsolutions.com',
    siteName: 'MACH Digital Solutions',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
