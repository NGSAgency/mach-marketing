const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://machdigitalsolutions.com'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/concepts/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
