/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      // beforeFiles runs before the filesystem is checked, so these map an
      // industry's URL segment onto the existing route without adding a
      // dynamic sibling that could shadow the combo page catch-all.
      //
      // A med spa's pages live at /treatments/botox while an HVAC company's
      // live at /services/ac-repair. Both are served by the same route.
      // URL keywords are a weak ranking signal, but changing URLs after launch
      // is harmful, so the segment is fixed correctly at build time.
      beforeFiles: [
        // /concept reads better than /mockup when sending a link to a prospect
        { source: '/concept/:token', destination: '/mockup/:token' },
        { source: '/concept/:token/:path*', destination: '/mockup/:token/:path*' },
        // Offering segments
        { source: '/site/:slug/treatments', destination: '/site/:slug/services' },
        { source: '/site/:slug/treatments/:item', destination: '/site/:slug/services/:item' },
        { source: '/site/:slug/packages', destination: '/site/:slug/services' },
        { source: '/site/:slug/packages/:item', destination: '/site/:slug/services/:item' },

        // Place segments
        { source: '/site/:slug/locations', destination: '/site/:slug/service-areas' },
        { source: '/site/:slug/locations/:item', destination: '/site/:slug/service-areas/:item' },

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
