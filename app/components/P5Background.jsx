'use client'
import { useEffect, useRef } from 'react'

const COLORS = { c: '#C2BCB0', c1: '#D4C6C4', c2: '#AAE5EE', w: '#FFFFFF' }
const MID = 'mid' // y = altura / 2

// s: escala, x: offset extra sobre el drift, y: posicion, rot: rota 35.5 deg,
// f: color, shape: 'wide' (teru) o 'slim' (teru1), a: [ruidoX, detalleX, ruidoS, detalleS]
const LAYERS = [
  { s: [0.7, 0.5], x: 0,   y: -100, rot: true,  f: 'c1', shape: 'wide', a: [1e-6, -3800, 1e-6, 3800] },
  { s: [0.5, 0.7], x: 0,   y: MID,  rot: false, f: 'w',  shape: 'wide', a: [1e-5, -3800, 1e-5, 3800] },
  { s: [0.7, 0.5], x: 0,   y: MID,  rot: true,  f: 'c2', shape: 'wide', a: [1e-6, -4800, 1e-5, 4800] },
  { s: [0.5, 0.7], x: 55,  y: MID,  rot: false, f: 'c',  shape: 'wide', a: [8.6e-5, -4800, 8.6e-5, 4800] },
  { s: [0.7, 0.5], x: 0,   y: 470,  rot: true,  f: 'w',  shape: 'wide', a: [8.6e-5, -4800, 8.6e-5, 4800] },
  { s: [0.7, 0.5], x: 340, y: 500,  rot: true,  f: 'c1', shape: 'wide', a: [1e-5, -2000, 1e-5, 2000] },
  { s: [0.5, 0.7], x: 140, y: MID,  rot: false, f: 'w',  shape: 'slim', a: [6e-5, -1000, 6e-5, 2000] },
  { s: [0.7, 0.5], x: 440, y: 550,  rot: true,  f: 'w',  shape: 'wide', a: [6e-6, -1400, 6e-6, 1900] },
  { s: [0.7, 0.5], x: 440, y: 500,  rot: true,  f: 'c1', shape: 'wide', a: [2.6e-5, -1200, 2.6e-5, 1200] },
  { s: [0.7, 0.5], x: 440, y: 800,  rot: true,  f: 'c2', shape: 'wide', a: [1e-5, -1800, 1e-5, 1800] },
  { s: [0.7, 0.5], x: 640, y: 1100, rot: true,  f: 'c1', shape: 'wide', a: [1e-4, -3800, -1e-4, 3800] },
  { s: [0.5, 0.7], x: 660, y: 600,  rot: false, f: 'w',  shape: 'slim', a: [8e-7, -4200, 8e-7, 4200] },
  { s: [0.5, 0.7], x: 720, y: 580,  rot: false, f: 'c',  shape: 'slim', a: [1e-4, -1800, 1e-4, 1200] },
  { s: [0.7, 0.5], x: 640, y: 700,  rot: true,  f: 'w',  shape: 'wide', a: [1e-5, -1800, 1e-5, 1200] },
]

function drawShape(p, kind, [r1, d1, r2, d2]) {
  const h = kind === 'wide' ? 150 : 100
  const nx = p.noise(p.millis() * r1) * d1
  const ns = p.noise(p.millis() * r2) * d2
  p.beginShape()
  p.vertex(80, ns)
  p.vertex(189, h + ns)
  p.vertex(189, nx)
  p.vertex(80, -h + nx)
  p.endShape()
}

export default function P5Background({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    let instance
    let cancelled = false

    // import dinamico: p5 necesita window y Next renderiza primero en servidor
    import('p5').then(({ default: P5 }) => {
      if (cancelled) return

      instance = new P5((p) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight)
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) p.noLoop()
        }

        p.draw = () => {
          p.background(COLORS.c)
          p.translate(p.width / 3.25, 0)
          p.angleMode(p.DEGREES)
          p.noStroke()

          const drift = p.noise(p.millis() * 0.00001) * 200

          for (const L of LAYERS) {
            p.push()
            p.scale(L.s[0], L.s[1])
            p.translate(drift + L.x, L.y === MID ? p.height / 2 : L.y)
            if (L.rot) p.rotate(35.5)
            p.fill(COLORS[L.f])
            drawShape(p, L.shape, L.a)
            p.pop()
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          p.redraw()
        }
      }, containerRef.current)
    })

    return () => {
      cancelled = true
      instance?.remove()
    }
  }, [])

  // el canvas se posiciona con el CSS de tu style.css (absolute, z-index -1)
  return (
    <div id="p5-container" ref={containerRef} className="relative">
      {children}
    </div>
  )
}