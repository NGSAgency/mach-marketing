import './globals.css'
import './mach-responsive.css'

export const metadata = {
  metadataBase: new URL('https://machdigitalsolutions.com'),
  title: {
    default: 'MACH Digital Solutions | Growth Marketing for Service Businesses',
    template: '%s | MACH Digital Solutions',
  },
  description: 'A digital marketing agency for service-based businesses. Websites, SEO, paid media, and content \u2014 engineered as one growth system.',
  openGraph: {
    title: 'MACH Digital Solutions',
    description: 'Growth marketing for service-based businesses. Websites, SEO, paid media, and content \u2014 engineered as one growth system.',
    url: 'https://machdigitalsolutions.com',
    siteName: 'MACH Digital Solutions',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/mach-logo-mark.png',
    shortcut: '/mach-logo-mark.png',
    apple: '/mach-logo-mark.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#050508', color: '#f5f5f7', margin: 0, padding: 0 }} className="antialiased">
        {children}
      </body>
    </html>
  )
}
