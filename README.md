# Milieux Annual Report 2019–20 (Next.js)

Rebuild of the Milieux annual report site, originally vanilla JS + Webpack + D3 + p5, migrated to Next.js and React.

Live: https://test-milieux.github.io/
Original version: branch `original-vanilla` of test-milieux/test-milieux.github.io

## What changed
- Each repeated piece is one component: `Carousel`, `HighlightsGraph` (D3 owns the SVG, React owns the state), `Media`.
- Graph and carousel content is driven by JSON, not HTML copied by hand.
- Original CSS, fonts and data were reused on purpose, so visual parity with the original could be checked in the browser.
- Static export (`output: 'export'`) deployed to GitHub Pages.

## Run it
    npm install
    npm run dev

## Build
    npm run build   # generates out/

## Workflow
Migrated step by step with an AI assistant: I set the goal (visual parity) and constraints (reuse CSS and assets), ran each step and verified it against the live original.
