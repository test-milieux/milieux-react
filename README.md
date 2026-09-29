# Milieux Annual Report 2019–20

Web version of the Milieux Institute for Arts, Culture and Technology annual report. I directed the visual identity and design of both the website and the printed book, and delivered the p5.js and d3.js implementations used as visual resources across the site.

Live: https://test-milieux.github.io/
Design mockup: https://rua.studio/pdf/mockup_milieux.pdf
Original vanilla JS version: branch `original-vanilla` of test-milieux/test-milieux.github.io

## Design approach

The report uses generative design and data visualization as an alternative to predictable, template-driven interfaces. Instead of illustrating the content, the visual system is built from it:

- **p5.js** drives the animated cover: a layered generative background.
- **d3.js** draws two interactive graphs (clusters and projects) where each node opens the project's detail.
- The mockup defined the structure (sections, navigation, graph and carousel formats). The identity and the generative visuals were developed on top of it.

## This repository: Next.js + React rebuild

The original site was vanilla JS with Webpack. This version rebuilds it in Next.js and React so each repeated piece is a component and the content lives in data:

- `Carousel`, `HighlightsGraph` (D3 owns the SVG, React owns the state) and `Media` are shared components.
- Graph and carousel content comes from JSON, not HTML copied by hand.
- The original CSS, fonts and data were reused on purpose, so visual parity with the original could be checked in the browser.
- Static export (`output: 'export'`) deployed to GitHub Pages.

The migration was done step by step with an AI assistant: I set the goal (visual parity) and the constraints (reuse CSS and assets), ran each step and checked it against the live original.

## Run it

    npm install
    npm run dev

## Build

    npm run build   # generates out/
