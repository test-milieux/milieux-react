const IMG = '/_annual-reports/2019/assets/img/'
const M = 'https://milieux.concordia.ca/'

const MILIEUX_LINKS = [
  ['Contact', 'contact/'],
  ['Milieux Annual Reports', 'annual-reports/'],
  ['Privacy', 'privacy/'],
]

const CLUSTERS_LEFT = [
  ['Indigenous Futures', 'indigenous-futures/'],
  ['Media History', 'media-history/'],
  ['Participatory Media', 'participatory-media/'],
  ['Performing Arts (LePARC)', 'leparc-the-performing-arts-research-cluster/'],
]

const CLUSTERS_RIGHT = [
  ['Post Image', 'post-image-2/'],
  ['Speculative Life', 'speculative-life/'],
  ['Technoculture, Art & Games', 'technoculture-arts-and-games/'],
  ['Textiles & Materiality', 'textiles-and-materiality/'],
]

function LinkList({ links }) {
  return (
    <ul className="list pa0 ma0 pr3">
      {links.map(([label, path]) => (
        <li key={path} className="pv1">
          <a className="link black underline-hover" href={M + path}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white black pt5 pa4 min-vh-100">
      <div className="ph3">
        <h2 className="lh-copy mb0 pa0">The Story Doesn’t End Here...</h2>
        <p className="lh-copy measure pt3">
          A full report of the Milieux Institute’s activities for 2019-20 is coming soon. In the meantime, learn more
          about Milieux’s journey by exploring our website.
        </p>
        <a className="f6 link dim ph3 pv2 mb5 mt1 dib white bg-black" href={M} target="_blank" rel="noreferrer">
          Milieux Institute Main Site
        </a>
      </div>
      <div className="flex-ns f6">
        <div className="w-100 ph3 mb4">
          <h4>Contact</h4>
          <p className="f6 ma0 pa0 lh-copy">
            Milieux Institute for Arts, Culture and Technology at Concordia University
            <br />
            1515 Rue Sainte-Catherine W.
            <br />
            EV Building, 11.455
            <br />
            Montréal, Quebec, Canada
            <br />
            H3G 2W1
          </p>
        </div>
        <div className="w-100 ph3 mb4">
          <h4>Milieux</h4>
          <LinkList links={MILIEUX_LINKS} />
        </div>
        <div className="w-100 ph3 mb4">
          <h4>Clusters</h4>
          <div className="flex-l">
            <LinkList links={CLUSTERS_LEFT} />
            <LinkList links={CLUSTERS_RIGHT} />
          </div>
        </div>
      </div>
      <div className="w-100 pb4">
        <div className="ma3 w4">
          <img className="w-100" src={`${IMG}concordia-logo.png`} alt="Concordia" />
        </div>
        <div className="ma3 w4">
          <img className="w-100" src={`${IMG}milieux-logo.png`} alt="Milieux" />
        </div>
      </div>
      <p className="mt0 ma3 f7">© Copyright 2020 | Milieux | All rights reserved.</p>
    </footer>
  )
}