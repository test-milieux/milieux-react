const IMG = '/_annual-reports/2019/assets/img/'

// left: posicion horizontal en % (el CSS los acomoda en diagonal)
const PARTNERS = [
  ['CQAM', 'https://www.cqam.org/', 95],
  ['Hexagram', 'https://hexagram.ca/', 85],
  ['ZU-UK', 'https://zu-uk.com/', 75],
  ['Banff Centre', 'https://www.banffcentre.ca/', 65],
  ['Goethe Institut Montreal', 'https://www.goethe.de/ins/ca/en/sta/mon.html', 55],
  ['ImagineNATIVE', 'https://imaginenative.org/', 45],
  ['LUCA School of Arts', 'https://www.luca-arts.be/nl', 35],
  ['EngAGE', 'https://www.concordia.ca/research/aging.html', 25],
  ['Perform', 'https://www.concordia.ca/research/perform.html', 15],
  ['ZKM', 'https://zkm.de/en', 5],
]

export default function Partners() {
  return (
    <div
      id="partners"
      data-index="0"
      className="relative pt5 pt0-ns flex items-center flex-none-ns fixed-bg cover min-vh-100"
      style={{ background: `url('${IMG}bg/partners.png') no-repeat center center` }}
    >
      <h2 className="absolute mb0 pa0 pl4 top-0 left-1">
        <span className="dib lh-copy mt5 pv2 ph3 bg-white">Thanks to Our Partners and Collaborators</span>
      </h2>
      <div className="flex-ns flex-column-ns pa5-ns pa4 vh-100-ns w-75-ns w-100 center items-center justify-between">
        {PARTNERS.map(([name, url, left]) => (
          <div key={name} className="relative w-100 pv3 pv0-ns tc">
            <a href={url} target="_blank" rel="noreferrer" className="absolute-ns link black b dim" style={{ left: `${left}%` }}>
              {name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}