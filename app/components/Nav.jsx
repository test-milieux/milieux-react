'use client'
import { useState } from 'react'

const LINKS = [
  ['#directors-message', "Director's Message"],
  ['#cluster-highlights', 'Cluster Highlights'],
  ['#project-highlights', 'Project Highlights'],
  ['#milieuxbauhaus', 'MilieuXbauhaus'],
  ['#modernmeetspostmoderncrisis', 'Imagining New Possibilities Amid Crises'],
  ['#partners', 'Thanks to Our Partners and Collaborators'],
]

const LINK_CLASS = 'w-100 dib ph4 pv3 link black hover-bg-white'

export default function Nav() {
  const [open, setOpen] = useState(false)

  function goTo(e, hash) {
    e.preventDefault()
    const el = document.getElementById(hash.slice(1))
    if (el) window.scroll({ top: el.offsetTop, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    // nav.css usa la clase .menu-open en un ancestro para animar menu e icono
    <div className={open ? 'menu-open' : ''}>
      <a
        id="toggleMenu"
        href="#"
        aria-label="Menu"
        className="link fixed z-999 pv3 ph3 top-0 right-0 hover-bg-white"
        onClick={(e) => {
          e.preventDefault()
          setOpen(!open)
          e.currentTarget.blur()
        }}
      >
        <svg width="25px" height="18px" viewBox="0 3 25 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="menuIcon" stroke="none" strokeWidth="1" fill="none" transform="translate(0.000000, 3.000000)">
            <rect id="top" y="0" width="24" height="2" fill="#000" />
            <rect id="middle" y="8" width="24" height="2" fill="#000" />
            <rect id="bottom" y="16" width="24" height="2" fill="#000" />
          </g>
        </svg>
      </a>

      <nav
        id="menu"
        className="fixed vh-100 tc z-5 right-0 top-0 bg-azul-90 shadow-2 open pv4 flex flex-column justify-center"
      >
        <h2 className="pr5 ph3 pl4 f4">Milieux 2019-20 Annual Report Highlights</h2>
        <ul className="pr5 ph3 pl4 f4 list">
          {LINKS.map(([hash, label]) => (
            <li key={hash}>
              <a href={hash} className={LINK_CLASS} onClick={(e) => goTo(e, hash)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="https://milieux.concordia.ca/" target="_blank" rel="noreferrer" className={LINK_CLASS}>
              Milieux Institute Main Site
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}