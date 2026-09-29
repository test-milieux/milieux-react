'use client'
import { useEffect } from 'react'
import Media from './Media'

const IMG_DIR = '/_annual-reports/2019/assets/img/highlights-modal/'

// item: { parent, parentUrl, event, description, media } o null si esta cerrado
// variant: 'cluster' (azul) o 'project' (mauve)
export default function HighlightsModal({ item, variant, onClose }) {
  useEffect(() => {
    if (!item) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = 'auto'
      document.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div id="highlights-modal" className="modal micromodal-slide is-open" aria-hidden="false">
      <div
        id="highlights-modal-outer"
        tabIndex={-1}
        className="z-999 fixed left-0 top-0 right-0 bottom-0 bg-black-60 flex justify-center items-baseline pv4-ns overflow-scroll"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          id="highlights-modal-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="highlights-modal-title"
          className={`modal__container z-9999 ${
            variant === 'project' ? 'bg-mauve-90' : 'bg-azul-90'
          } mh2-ns black measure-wide shadow-5 pa4 min-h-0 min-vh-100-ns h-auto-ns`}
        >
          <header className="flex justify-space items-center relative">
            <div>
              <h3>
                <a className="link underline dim black" href={item.parentUrl} target="_blank" rel="noreferrer">
                  <span dangerouslySetInnerHTML={{ __html: item.parent }} />
                </a>
              </h3>
              <h3 id="highlights-modal-title" dangerouslySetInnerHTML={{ __html: item.event }} />
            </div>
            <button
              className="close inline-flex items-center pa2 bn bg-transparent dim bg-animate absolute right-0 top-0 b"
              aria-label="Close modal"
              onClick={onClose}
            >
              ✕
            </button>
          </header>
          <div id="highlights-modal-content">
            <Media media={item.media} imgDir={IMG_DIR} alt={item.event} />
            {/* el HTML viene de tu propio JSON, por eso es seguro inyectarlo */}
            <p className="pb2 f6 lh-copy" dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        </div>
      </div>
    </div>
  )
}