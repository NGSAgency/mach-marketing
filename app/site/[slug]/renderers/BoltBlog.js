// Bolt blog skin.
// All structure and SEO live in the shared BlogCore. This file supplies only
// this family's tokens and chrome, so a new template family needs a file this
// size rather than a full renderer.
import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { BoltHeader, BoltFooter } from './BoltServices.js'

function makeChrome(T, c, logo, base) {
  return function Chrome({ children }) {
    return (
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <TrackingScripts tracking={c.tracking} />
        <BoltHeader T={T} c={c} logo={logo} base={base} />
        {children}
        <BoltFooter T={T} c={c} />
      </div>
    )
  }
}

export function BoltBlogIndex({ config: c, siteSlug, posts }) {
  const T = applyBrand(boltTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  return <BlogIndexCore T={T} config={c} posts={posts} base={base} Chrome={makeChrome(T, c, c.brand?.logo_url, base)} />
}

export function BoltBlogPost({ config: c, siteSlug, post, prev, next }) {
  const T = applyBrand(boltTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  return <BlogPostCore T={T} config={c} post={post} prev={prev} next={next} base={base} Chrome={makeChrome(T, c, c.brand?.logo_url, base)} />
}
