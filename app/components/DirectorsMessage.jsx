const IMG = '/_annual-reports/2019/assets/img/'
const bg = (file) => ({ background: `url('${IMG}bg/${file}') no-repeat center center` })

const PARAGRAPHS = [
  "Between worldwide climate strikes, panic over COVID-19 and the urgent call of Black Lives Matter, the Milieux Institute was challenged in 2019-20 to rethink the meaning of our work and mandate. As an interdisciplinary practice-based research unit, we rely heavily on working together in our labs and studios. The anti-climax of a campus lockdown in the Spring of 2020 came as quite a blow. Nonetheless, there are new grant proposals underway, a major renovation to our spaces is in the works and a Milieux PhD program is taking shape.",
  "We also had the 100th anniversary of Bauhaus — the famous Weimar-era art school credited with innovations in art, design and education that survive today. We explored Bauhaus legacies with a weeklong festival of talks, performances, workshops and installations in November 2019. Faculty and students from across our eight clusters gathered for what was less a celebration of Bauhaus, than an intensive, critical interrogation of its legacy. We took stock of prominent eurocentrism in art and design pedagogy, and played with ideas for shaping the future of the Milieux — carrying forward inspiration without the need for genuflection.",
  "The Bauhaus question led to further exploration of the role of research-creation in training students, producing new knowledge and technology, and supporting social and cultural change. We carried out Bauhausian style experiments through collaborative process-based work on virtual reality, artificial intelligence, bioplastics, Montreal's waterways, embodied performance and even pandemic mask design. In Spring 2020, the Hexagram network, of which we are founding partners, received seven years of renewed funding from the Quebec government. This will allow us to collaborate on rigorously documenting and examining research-creation methodology in Quebec and beyond, with colleagues across Quebec and indeed the world.",
  "Spring also brought the thrilling news that our Indigenous Futures cluster won formal research centre status at Concordia. This is a critical development. We look forward to welcoming more indigenous faculty and students to what is sure to be one of the most vibrant new research centres in Canada. In addition, we committed ourselves to recognizing that Black Lives Matter by expanding access and attention for people of colour at the Institute, and addressing the range of injustices and inequalities that persist in art, culture and technology.",
  "Moving forward, the challenge of a world in crisis remains, but our faculty, staff and students continue working hard with collaborators around the world. There is still a great deal of work to do and we look forwarding to doing it, together.",
  "—Bart Simon, Director of the Milieux Institute",
]

export default function DirectorsMessage() {
  return (
    <div id="directors-message" className="fixed-bg-wide cover min-vh-100" style={bg('message.png')}>
      <div className="w-50-l w-100 pt5-ns pt4 ph4-ns ph2 absolute">
        <h2 className="mb0 pa0 measure-wide center f5">
          <span className="bg-mauve pv2 ph3">Director&apos;s Message</span>
        </h2>
      </div>

      <div className="flex-l w-100 justify-between">
        <div
          className="fixed-bg-left pt5-ns pt4 min-vh-100 items-center flex flex-auto w-100 ph4-ns ph2 cover"
          style={bg('message-left.png')}
        >
          <div className="measure-wide center lh-copy mv5-ns mv3">
            <div className="pv3">
              {PARAGRAPHS.map((text, i) => (
                <p key={i} className="bg-mauve-ns pa3">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className="fixed-bg-right flex items-center vh-100 flex-auto w-100 pv5-ns pv4 ph4-ns ph2 cover sticky"
          style={bg('message-right.png')}
        >
          <div className="w-100 ph4-ns ph2">
            <div className="aspect-ratio aspect-ratio--16x9 mb3">
              <iframe
                src="https://player.vimeo.com/video/389834420"
                width="100%"
                className="aspect-ratio--object"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div>
              <p className="f7 center mt2 bg-amarillo-ns pa3 lh-copy">
                An experimental documentary about Milieux research - creation directed by Vjosana Shkurti and Agustina Isidori.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}