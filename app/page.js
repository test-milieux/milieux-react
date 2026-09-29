import Nav from './components/Nav'
import P5Background from './components/P5Background'
import DirectorsMessage from './components/DirectorsMessage'
import HighlightsSections from './components/HighlightsSections'
import Carousel from './components/Carousel'
import Partners from './components/Partners'
import Footer from './components/Footer'

const IMG = '/_annual-reports/2019/assets/img/'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="center">
        <P5Background>
          <div className="w-100 flex items-center justify-center vh-100 tc">
            <div className="bg-white-0 pa4">
              <img src={`${IMG}milieux_logo.png`} alt="Milieux" />
              <p className="mt3 mb0 lh-copy">
                Milieux Institute for Arts, Culture and Technology
                <br />
                2019-20 Annual Report Highlights
              </p>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w4 ma3">
            <img className="w-100" src={`${IMG}concordia-logo.png`} alt="Concordia" />
          </div>
        </P5Background>

        <DirectorsMessage />
        <HighlightsSections />

        <Carousel
          id="milieuxbauhaus"
          bgBase="milieux-bauhaus"
          heading="MilieuXbauhaus"
          leftTone="aqua-verde"
          rightTone="white"
          intro="From November 5 to 14, 2019, the Milieux Institute held the MilieuXBauhaus Festival. Milieux's graduate student researchers, much like the Bauhaus students of a century ago, are interested in the fundamental engagements between art, technology, culture, and design. The program featured an open house, two parties, two performances, nine workshops, 10 screenings, and 13 talks by Milieux members and visiting scholars. The Goethe Institute, SenseFactory, and the Canadian Embassy in Berlin were community partners in producing this cross-disciplinary event focused on critical reflection."
        />

        <Carousel
          id="modernmeetspostmoderncrisis"
          bgBase="research"
          heading="Imagining New Possibilities Amid Crises"
          leftTone="charcoal"
          rightTone="mauve"
          intro="Today’s challenges are driving urgent investigations into new and promising directions. From imperfectly reconfigured working spaces at home, we are discovering new modes of imagining and creating our way into a new future, together."
        />

        <Partners />
      </main>
      <Footer />
    </>
  )
}