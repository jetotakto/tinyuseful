# v2 public directory

**Status:** EMPTY (scaffold only, deploy target).

Tato složka je **finální deploy target** pro v2. Až bude Master Plan locked a Tip Calculator v2 reference page implementovaná, budou se sem generovat statické HTML soubory přes build script.

## Plánovaná struktura

```
public/
  index.html                    — homepage
  /percentage-calculator/
    index.html
  /tip-calculator/
    index.html
  /sales-tax-calculator/
    index.html
  ... (11 tool pages on flat root URLs)

  /methodology/index.html
  /about/index.html
  /privacy/index.html
  /changelog/index.html
  /contact/index.html

  /calculators/index.html       — all-tools index (navigation hub)
  /home-projects/index.html     — cluster hub (post-AdSense)

  style.css                     — shared stylesheet
  /assets/                      — images, fonts, icons
  /js/                          — compiled per-tool JS modules
  robots.txt
  sitemap.xml
  _headers
  ads.txt
  humans.txt
  site.webmanifest
  favicon.*
```

## Co tam NEPATŘÍ

- ❌ Source files (jdou do `src/`)
- ❌ Templates (jdou do `src/templates/`)
- ❌ Manifest data (jde do `src/data/`)
- ❌ Strategy docs (jdou do `docs/`)

## Cloudflare Pages config

- Build output directory: `public/`
- Build command: TBD (per Master Plan, esbuild + custom build.mjs)
- Production branch: `main` (after merge from v2-rebuild)
- Preview branch: `v2-rebuild` (CURRENT — preview URLs auto-generated)

## Preview safety (TBD)

⚠️ Preview deployments **MUSÍ být noindex** dokud nebude finalizována. Strategie:
- Cloudflare Access password protection (preferred)
- OR `<meta name="robots" content="noindex,nofollow">` v každé v2 page (added při implementation, removed AŽ při merge to main)
- NIKDY noindex v `_headers` v repu (forget-at-merge risk per GPT)
