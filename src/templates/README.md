# v2 templates directory

**Status:** scaffold only, not implemented.

## Plánovaná struktura

- `tool-page.html` — kanonická šablona pro tool page (slot-based)
  - `[Breadcrumb]` slot
  - `[H1 + purpose]` slot
  - `[Calculator workspace]` slot (form + result)
  - `[Quick examples]` slot
  - `[Methodology]` slot (with `<details>` block)
  - `[FAQ]` slot
  - `[Related tools]` slot
  - `[Ad slot]` (post-AdSense, NEVER between input/result)
  - `[Footer]` slot

- `homepage.html` — homepage šablona (rozcestník)
  - Hero (claim 1 sentence)
  - Popular tools grid (4-8 cards)
  - Cluster sections (with named hub links)
  - Trust strip (byline, methodology link, contact)
  - All tools index link

- `methodology.html` — long-form methodology (post-15-tools)
- `cluster-hub.html` — `/home-projects/`, `/calculators/` navigation pages

## Implementation strategy

Per GPT Master Plan: build-light approach.

1. Templates jsou pure HTML s explicit slot markers
2. Build script (`scripts/build.mjs`?) reads `tools.json` + template, generates `public/<slug>/index.html`
3. Each generated page:
   - Inherits canonical structure
   - Per-tool: methodology content, FAQ, related tools (from manifest)
   - Per-tool: tool-specific CSS class on `<body>` for tool-specific styling

## Pending decisions

- Templating engine: pure string replace OR mustache OR EJS?
- HTML minification: yes/no for production?
- Critical CSS extraction: per-page automatic OR manual per template?
