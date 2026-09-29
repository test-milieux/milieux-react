'use client'
import { useEffect, useRef } from 'react'

const PLAYERS = {
  youtube: {
    src: (id) => `https://www.youtube.com/embed/${id}`,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  },
  vimeo: {
    src: (id) => `https://player.vimeo.com/video/${id}`,
    allow: 'autoplay; fullscreen',
    height: 360,
  },
  facebook: {
    src: (id) =>
      `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        `https://www.facebook.com/CU4thSpace/videos/${id}/`
      )}&show_text=0&width=560`,
    height: 315,
    style: { border: 'none', overflow: 'hidden' },
    scrolling: 'no',
  },
}

let twitterPromise
function loadTwitter() {
  twitterPromise ??= new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = 'https://platform.twitter.com/widgets.js'
    s.async = true
    s.onload = () => resolve(window.twttr)
    document.body.appendChild(s)
  })
  return twitterPromise
}

// Imagen, video o tweet. Lo usan el modal y los carruseles.
// media: { type: 'image' | 'video' | 'twitter' | 'tweet', src, host, id, tweet }
// imgDir: carpeta de las imagenes. styled=false solo para la primera imagen de un carrusel (como el original).
export default function Media({ media, imgDir, alt, styled = true }) {
  const tweetRef = useRef(null)
  const isTweet = media?.type === 'twitter' || media?.type === 'tweet'

  useEffect(() => {
    if (isTweet) loadTwitter().then((t) => t?.widgets?.load(tweetRef.current))
  }, [isTweet, media])

  if (!media) return null

  if (isTweet) {
    return <div ref={tweetRef} dangerouslySetInnerHTML={{ __html: media.tweet }} />
  }

  if (media.type === 'video') {
    const player = PLAYERS[media.host]
    if (!player) return null
    return (
      <div className="aspect-ratio aspect-ratio--16x9 mb1">
        <iframe
          src={player.src(media.id)}
          title={alt}
          width="100%"
          height={player.height}
          className="aspect-ratio--object shadow-4"
          frameBorder="0"
          allow={player.allow}
          style={player.style}
          scrolling={player.scrolling}
          allowFullScreen
        />
      </div>
    )
  }

  if (media.src) {
    if (!styled) return <img src={imgDir + media.src} alt={alt} className="fit-cover" />
    return (
      <div className="mb1">
        <img src={imgDir + media.src} alt={alt} className="fit-cover fit-top shadow-4" />
      </div>
    )
  }

  return null
}