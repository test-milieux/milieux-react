'use client'
import { useCallback, useState } from 'react'
import HighlightsGraph from './HighlightsGraph'
import HighlightsModal from './HighlightsModal'

const IMG = '/_annual-reports/2019/assets/img/'
const bg = (file) => ({ background: `url('${IMG}bg/${file}') no-repeat center center` })

function HighlightSection({ id, bgFile, heading, tone, blurb, dataFile, labelKey, variant, modal, onSelect }) {
  const [hovering, setHovering] = useState(false)
  const [shown, setShown] = useState(null) // ultimo item con hover, se queda visible con el modal abierto

  const active = hovering || modal?.variant === variant

  const onHover = useCallback((item) => {
    setHovering(!!item)
    if (item) setShown(item)
  }, [])

  const box = `dn db-ns mt4 mb0 pa0 ml4 pt2 pb3 ml4 w5 bg-${tone}`

  return (
    <div id={id} data-index="0" className="relative fixed-bg cover vh-100-ns min-vh-100" style={bg(bgFile)}>
      <div className="absolute-ns top-0-ns left-1-ns">
        <h2 className=" mb0 pa0 pl4 w-100">
          <span className={`dib lh-copy mt5 pv2 ph3 bg-${tone}`}>{heading}</span>
        </h2>
        <aside id={`${id}-info`} className={box + (active ? ' hide' : '')}>
          <span className="dib lh-copy mt0 ph3 pv2">{blurb}</span>
        </aside>
        <aside id={`${id}-sidebar`} className={box + (active ? ' show' : '')}>
          <span className="dib lh-solid mt0 ph3 pv2 b">{shown?.parent}</span>
          <span className="dib lh-solid mt0 ph3 pv2 b">{shown?.event}</span>
          <span className="dib lh-copy mt0 ph3 pv2">Click the image for more info.</span>
        </aside>
      </div>
      <HighlightsGraph dataFile={dataFile} labelKey={labelKey} onHover={onHover} onSelect={onSelect} />
    </div>
  )
}

export default function HighlightsSections() {
  const [modal, setModal] = useState(null) // { item, variant }
  const close = useCallback(() => setModal(null), [])

  return (
    <>
      <HighlightSection
        id="cluster-highlights"
        bgFile="cluster-highlights.png"
        heading="Cluster Highlights"
        tone="azul"
        blurb="At the Milieux Institute, eight research-creation clusters are home to member students whose ambitions match their unique mandates."
        dataFile="cluster-highlights.json"
        labelKey="cluster"
        variant="cluster"
        modal={modal}
        onSelect={(item) => setModal({ item, variant: 'cluster' })}
      />
      <HighlightSection
        id="project-highlights"
        bgFile="project-highlights.png"
        heading="Project Highlights"
        tone="mauve"
        blurb="In addition to clusters, the Milieux Institute also supports several projects that emerge from collaborations across clusters. This year, they included Machine Agencies, BioLab, Education Makers and the Immersive Realities Lab."
        dataFile="project-highlights.json"
        labelKey="project"
        variant="project"
        modal={modal}
        onSelect={(item) => setModal({ item, variant: 'project' })}
      />
      <HighlightsModal item={modal?.item} variant={modal?.variant} onClose={close} />
    </>
  )
}