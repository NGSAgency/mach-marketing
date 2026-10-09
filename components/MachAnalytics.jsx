'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

// Google Analytics for MACH's own public pages only (property "machdigitalsolutions.com").
//
// This app also serves client websites (on their own domains and subdomains) and private pages
// whose addresses hold access codes (proposals, reports, onboarding, previews). Those must never
// reach MACH's Analytics, so tracking only loads on machdigitalsolutions.com, only sends page
// views for the public pages listed here, and is switched off entirely on any other page.
const GA_ID = 'G-2S1C8Y4GRL'
const HOSTS = ['machdigitalsolutions.com', 'www.machdigitalsolutions.com']
const PUBLIC_PAGES = ['/', '/about', '/contact', '/industries', '/privacy']

const isPublic = (path) => PUBLIC_PAGES.some((p) => (p === '/' ? path === '/' : path === p || path.startsWith(p + '/')))

// Runs before anything else: loads Google's tag only on our domain and a public first page.
const loader = `(function(){
  var h = location.hostname, p = location.pathname.replace(/\\/+$/, '') || '/';
  if (${JSON.stringify(HOSTS)}.indexOf(h) < 0) return;
  if (!${JSON.stringify(PUBLIC_PAGES)}.some(function(x){ return x === '/' ? p === '/' : p === x || p.indexOf(x + '/') === 0 })) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments) };
  gtag('js', new Date());
  gtag('config', '${GA_ID}', { send_page_view: false });
  var s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
  document.head.appendChild(s);
})();`

export default function MachAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    const path = pathname.replace(/\/+$/, '') || '/'
    const allowed = isPublic(path)
    // Google's official off switch: nothing at all is sent while it's true.
    window[`ga-disable-${GA_ID}`] = !allowed
    if (!allowed) return
    // Keep campaign tags (utm_*) so ads and emails are credited; drop any other query values.
    const utm = new URLSearchParams([...new URLSearchParams(location.search)].filter(([k]) => k.startsWith('utm_')))
    window.gtag('event', 'page_view', {
      page_location: location.origin + path + (utm.toString() ? '?' + utm : ''),
      page_title: document.title,
    })
  }, [pathname])

  return (
    <Script id="mach-analytics" strategy="afterInteractive">
      {loader}
    </Script>
  )
}
