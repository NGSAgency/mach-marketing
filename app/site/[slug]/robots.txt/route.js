import { fetchSiteConfig } from '../../../../lib/site/fetch.js'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  const result = await fetchSiteConfig({ slug })

  // Unpublished or missing: keep crawlers out rather than pointing them at a dead page
  if (!result) {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const config = result.config
  const baseUrl = (config?.meta?.canonical || `https://machdigitalsolutions.com/site/${slug}`).replace(/\/$/, '')

  const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
