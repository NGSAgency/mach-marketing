// Grove blog skin.
// All structure and SEO live in the shared BlogCore. This file supplies only
// this family's tokens and chrome, so a new template family needs a file this
// size rather than a full renderer.
import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { GroveHeader, GroveFooter } from './GroveServices.js'

function makeChrome(T, c, logo, base) {
  return function Chrome({ children }) {
    return (
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <TrackingScripts tracking={c.tracking} />
        <GroveHeader T={T} c={c} logo={logo} base={base} />
        {children}
        <GroveFooter T={T} c={c} />
      </div>
    )
  }
}

export function GroveBlogIndex({ config: c, siteSlug, posts }) {
  const T = applyBrand(groveTokens, {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  })
  const base = `/site/${siteSlug}`
  return <BlogIndexCore T={T} config={c} posts={posts} base={base} Chrome={makeChrome(T, c, c.brand?.logo_url, base)} />
}

export function GroveBlogPost({ config: c, siteSlug, post, prev, next }) {
  const T = applyBrand(groveTokens, {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  })
  const base = `/site/${siteSlug}`
  return <BlogPostCore T={T} config={c} post={post} prev={prev} next={next} base={base} Chrome={makeChrome(T, c, c.brand?.logo_url, base)} />
}
