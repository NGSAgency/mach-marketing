/**
 * The hero's background: the business's own video when they have one,
 * otherwise the photo. Video is only ever the business's own footage (their
 * site or what they send us), never stock.
 *
 * The video is muted, loops, plays inline on phones, and loads only its
 * metadata until it can play. Its poster is the first frame they supplied, or
 * the hero photo. People who have asked their device to reduce motion get
 * the still image instead.
 */
export default function HeroMedia({ image, video, alt = '', style = {} }) {
  const fill = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
  const poster = video?.poster || image?.url || undefined
  return (
    <>
      {(image?.url || poster) && <img src={image?.url || poster} alt={image?.alt || alt} style={fill} />}
      {video?.url && (
        <>
          <video
            className="hero-media-video"
            src={video.url}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={fill}
          />
          <style>{`@media (prefers-reduced-motion: reduce) { .hero-media-video { display: none; } }`}</style>
        </>
      )}
    </>
  )
}
