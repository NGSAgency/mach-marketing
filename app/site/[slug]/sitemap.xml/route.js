import { fetchSiteConfig, fetchBlogIndex } from '../../../../lib/site/fetch.js'
import { generateSitemap } from '../../../../lib/templates/shared/seo/index.js'

export const dynamic = 'force-dynamic'

function escapeXml(s) {
  return String(s || '').replace(/[<>&'"]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]))
}

export async function GET(request, { params }) {
  const { slug } = await params

  const [siteResult, blogResult] = await Promise.all([
    fetchSiteConfig({ slug }),
    fetchBlogIndex(slug),
  ])

  if (!siteResult) {
    return new Response('Not found', { status: 404 })
  }

  const config = siteResult.config
  const baseUrl = config?.meta?.canonical || `https://machdigitalsolutions.com/site/${slug}`
  const urls = generateSitemap(config, baseUrl, blogResult?.posts || [])

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${escapeXml(u.url)}</loc>
    <lastmod>${escapeXml(String(u.lastModified).split('T')[0])}</lastmod>
    <changefreq>${escapeXml(u.changeFrequency)}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
