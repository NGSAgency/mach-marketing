/** @type {import('next').NextConfig} */
const nextConfig = {
  // The middleware removes trailing slashes itself, so an old address with
  // one (/botox/, common on WordPress sites) gets a single redirect straight
  // to its new page instead of two hops.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      // beforeFiles runs before the filesystem is checked.
      beforeFiles: [
        // /concept reads better than /mockup when sending a link to a prospect
        { source: '/concept/:token', destination: '/mockup/:token' },
        { source: '/concept/:token/:path*', destination: '/mockup/:token/:path*' },
        // Offering and place segments (/treatments, /locations) are real
        // routes under app/site/[slug], each answering only for the industry
        // whose profile uses it. They used to be rewritten onto /services and
        // /service-areas, which served the wrong family's pages and let every
        // site answer at both URLs.

        // Mockups previously rendered as a single scrolling page, so treatment
        // URLs were rewritten back to it. They are real routes now, and leaving
        // these in place sent every treatment click to the home page.
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
