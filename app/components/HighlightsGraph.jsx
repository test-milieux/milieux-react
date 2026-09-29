'use client'
import { useEffect, useRef } from 'react'

const DATA_DIR = '/_annual-reports/2019/assets/data/'
const IMG_DIR = '/_annual-reports/2019/assets/img/highlights-modal/'
const MAX_NODE_SIZE = 30

// Aplana el arbol del JSON en una lista de nodos con id
function flatten(root) {
  const nodes = []
  let i = 0
  function recurse(node) {
    if (node.children) node.children.forEach(recurse)
    if (!node.id) node.id = ++i
    nodes.push(node)
  }
  recurse(root)
  return nodes
}

// El mismo grafo de fuerzas de D3 v3 del sitio original, envuelto en un componente.
// D3 dibuja dentro del div; React se entera por callbacks (onHover, onSelect).
export default function HighlightsGraph({ dataFile, labelKey, onHover, onSelect }) {
  const hostRef = useRef(null)
  const callbacks = useRef({})
  callbacks.current = { onHover, onSelect }

  useEffect(() => {
    const host = hostRef.current
    let cancelled = false
    let force
    let onResize

    async function init() {
      // imports dinamicos: d3 v3 necesita window y Next renderiza primero en servidor
      const [d3mod, textwrapMod] = await Promise.all([import('d3'), import('d3-textwrap')])
      const json = await fetch(DATA_DIR + dataFile).then((r) => r.json())
      if (cancelled) return

      const d3 = d3mod.default ?? d3mod
      d3.textwrap = textwrapMod.textwrap

      let x = window.innerWidth
      let y = window.innerHeight

      const vis = d3.select(host).append('svg').attr('width', x).attr('height', y)
      force = d3.layout.force()
      const wrap = d3.textwrap().bounds({ height: 480, width: 150 }).method('tspans')

      onResize = () => {
        x = window.innerWidth
        y = window.innerHeight
        vis.attr('width', x).attr('height', y)
      }
      window.addEventListener('resize', onResize)

      const root = json
      root.fixed = true
      root.x = x / 2
      root.y = y / 2

      const nodes = flatten(root)
      const links = d3.layout.tree().links(nodes)

      force
        .nodes(nodes)
        .links(links)
        .gravity(0.05)
        .charge(-1800)
        .linkDistance(70)
        .friction(0.45)
        .linkStrength(() => 1)
        .size([x, y])
        .on('tick', tick)
        .start()

      // lineas
      let path = vis.selectAll('path.link').data(links, (d) => d.target.id)
      path.enter().insert('svg:path').attr('class', 'link').style('stroke', '#fff')
      path.exit().remove()

      // nodos
      let node = vis.selectAll('g.node').data(nodes, (d) => d.id)
      const nodeEnter = node
        .enter()
        .append('svg:g')
        .attr('class', 'node')
        .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
        .call(force.drag)

      nodeEnter
        .append('svg:circle')
        .attr('r', (d) => Math.sqrt(d.size) / 21 || 4.5)
        .attr('fill', '#fff')

      // imagen clickeable: abre el modal solo si el nodo tiene evento
      const anchors = nodeEnter.append('a').on('click', function (d) {
        if (!d.event) return
        callbacks.current.onSelect({
          parent: d.parent,
          parentUrl: d.parentUrl,
          event: d.event,
          description: d.description || '',
          media: d.media,
        })
      })

      const images = anchors
        .append('svg:image')
        .attr('xlink:href', (d) => (d.img ? IMG_DIR + d.img.replace('.jpg', '_circle.png') : null))
        .attr('x', -25)
        .attr('y', -25)
        .attr('height', 50)
        .attr('width', 50)

      // nombre del cluster o proyecto (nodos centrales)
      nodeEnter
        .append('text')
        .text((d) => d[labelKey])
        .style('text-anchor', 'middle')
        .style('font-size', '1rem')
        .style('font-weight', 'bold')
        .attr('fill', '#130C0E')
        .on('click', function (d) {
          if (d.url) window.open(d.url, '_blank')
        })

      // la imagen crece un poco al pasar el mouse
      images
        .on('mouseenter', function (d) {
          if (!d.event) return
          d3.select(this).transition().attr('x', -50).attr('y', -50).attr('height', 100).attr('width', 100)
          callbacks.current.onHover({ event: d.event, parent: d.parent })
        })
        .on('mouseleave', function () {
          d3.select(this).transition().attr('x', -25).attr('y', -25).attr('height', 50).attr('width', 50)
          callbacks.current.onHover(null)
        })

      // texto del evento junto al nodo (el CSS original lo oculta con .hidden)
      nodeEnter
        .append('text')
        .attr('class', 'hidden')
        .attr('x', 30)
        .attr('y', 45)
        .style('font-size', '1rem')
        .style('font-weight', 'bold')
        .attr('fill', '#130C0E')
        .text((d) => d.event)
        .call(wrap)

      node.exit().remove()

      path = vis.selectAll('path.link')
      node = vis.selectAll('g.node')
      vis.selectAll('text').call(wrap)

      // mantiene los nodos dentro del marco
      function nodeTransform(d) {
        d.x = Math.max(MAX_NODE_SIZE, Math.min(x - (d.imgwidth / 2 || 16), d.x))
        d.y = Math.max(MAX_NODE_SIZE, Math.min(y - (d.imgheight / 2 || 16), d.y))
        return 'translate(' + d.x + ',' + d.y + ')'
      }

      function tick() {
        path.attr('d', function (d) {
          const dx = d.target.x - d.source.x
          const dy = d.target.y - d.source.y
          const dr = Math.sqrt(dx * dx + dy * dy)
          return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y
        })
        node.attr('transform', nodeTransform)
      }
    }

    init().catch(console.error)

    return () => {
      cancelled = true
      force?.stop()
      if (onResize) window.removeEventListener('resize', onResize)
      host.textContent = ''
    }
  }, [dataFile, labelKey])

  // display: contents hace que el svg se acomode como hijo directo de la seccion
  return <div ref={hostRef} style={{ display: 'contents' }} />
}