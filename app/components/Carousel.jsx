'use client'
import { useState } from 'react'
import Media from './Media'
import data from './carousels.json'

const IMG = '/_annual-reports/2019/assets/img/'
const bg = (file) => ({ background: `url('${IMG}bg/${file}') no-repeat center center` })

// id: 'milieuxbauhaus' o 'modernmeetspostmoderncrisis' (tambien es la llave en carousels.json
// y el nombre de la carpeta de imagenes)
// leftTone / rightTone: color de las etiquetas, ej. 'aqua-verde', 'charcoal', 'white', 'mauve'
export default function Carousel({ id, bgBase, heading, intro, leftTone, rightTone }) {
  const items = data[id]
  const [index, setIndex] = useState(0)
  const [touched, setTouched] = useState(false)
  const item = items[index]

  function go(step) {
    if (window.innerWidth >= 960) window.scrollTo(0, document.getElementById(id).offsetTop)
    setIndex((i) => (i + step + items.length) % items.length)
    setTouched(true)
  }

  const arrow = { backgroundImage: `url('${IMG}arrow.svg')` }

  return (
    <div id={id} data-index={index} className="fixed-bg-wide cover min-vh-100" style={bg(`${bgBase}.png`)}>
      <div className="flex-l w-100 items-start justify-between">
        <div
          className="fixed-bg-left sticky-l vh-100 min-vh-100 items-center flex flex-auto w-100 ph4-ns ph2 cover"
          style={bg(`${bgBase}-left.png`)}
        >
          <div className="flex flex-column">
            <div className="w-100 pb5 ph3">
              <h2 className="mb0 pa0 measure-wide center f5">
                <span className={`dib lh-copy bg-${leftTone} pv2 ph3`}>{heading}</span>
              </h2>
            </div>
            <div className="measure-wide center ph3 lh-copy z-1">
              <p className={`bg-${leftTone}-ns pa3`}>{intro}</p>
            </div>
          </div>
        </div>

        <div
          className="fixed-bg-right flex items-center min-vh-100 flex-auto w-100 ph4-ns ph2 cover sticky"
          style={bg(`${bgBase}-right.png`)}
        >
          <a
            className="arrow-prev vh-50 mr3 mr4-l link dim contain bg-center w2 h2"
            href={`#${id}`}
            aria-label="Previous"
            style={arrow}
            onClick={(e) => {
              e.preventDefault()
              go(-1)
            }}
          />
          <div className="w-100 pv5">
            <div style={{ display: item.title ? '' : 'none' }}>
              <h2 className="tr-l mb5 pa0 f5 center">
                <span
                  className={`dib lh-copy bg-${rightTone} pv2 ph3`}
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </h2>
            </div>
            <div>
              <Media
                key={index}
                media={item.media}
                imgDir={`${IMG}${id}/`}
                alt={item.title}
                styled={touched}
              />
            </div>
            <div>
              <p
                className={`f7 center mt2 bg-${rightTone}-ns pa3 lh-copy`}
                style={{ display: item.text ? '' : 'none' }}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          </div>
          <a
            className="arrow-next vh-50 ml3 ml4-l link dim contain bg-center w2 h2"
            href={`#${id}`}
            aria-label="Next"
            style={{ ...arrow, transform: 'rotate(180deg)' }}
            onClick={(e) => {
              e.preventDefault()
              go(1)
            }}
          />
        </div>
      </div>
    </div>
  )
}
