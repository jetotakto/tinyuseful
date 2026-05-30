# TinyUseful — status & GSC baseline

**Date:** 2026-05-30
**Branch:** `main` (production) / work staged on `v2-rebuild`
**Live:** [tinyuseful.app](https://www.tinyuseful.app)

This snapshot closes the technical/indexation phase that followed the V2 hf
rollout and records a baseline to compare against in 30–60 days. Active policy
docs remain [CLAUDE.md](CLAUDE.md) and [docs/V2_NON_NEGOTIABLES.md](docs/V2_NON_NEGOTIABLES.md);
the prior state snapshot is [TINYUSEFUL_STATUS_2026-05-15.md](TINYUSEFUL_STATUS_2026-05-15.md).

## What shipped since 2026-05-15

| Batch | Merge | Effect |
|-------|-------|--------|
| Support pages → V2 hf shell, a11y `<label for>`, cache-bust unify, sitemap lastmod, Tip `.tool-form` | `4c14499` | V2 transition completed beyond calculators |
| Homepage featured tile → whole-card click target | `d3c998e` | UX fix |
| GSC-1 calculator FAQ refinements (compound JSON-LD, sales-tax add-tax FAQ, tip tax+tip/NYC FAQ, rent purpose) | `738a528` | query-driven content delta |
| Canonical + sitemap + internal links → Cloudflare clean URLs (support pages `.html` → extensionless) | `ef32f55` | indexation hygiene |

No changes to calculator math, helpers.js parsing, aria-live result behavior,
ad placement, robots, or URL structure of tool pages.

## GSC indexation baseline (after canonical cleanup)

- **Important final URLs indexed: 15 / 16.**
- **Missing final URL:** `/changelog` — Request Indexing submitted.
- **Sitemap:** submitted successfully, 16 discovered URLs, 0 `.html` entries remaining.
- **Technical fixes needed: 0.** No important final 200 URL has a wrong canonical,
  a redirect, a noindex, or a crawl block.
- **Non-indexed URLs (~11) are expected noise:** `.html` → extensionless 308
  redirects, canonical alternatives, non-www / http variants, and robots-handled
  paths. Not a problem; this is what GSC should look like after a canonical cleanup.

## Search performance baseline (GSC, ~1 May – 28 May 2026)

- Impressions: ~330 · Clicks: 0 · CTR: 0% · weighted avg position: ~59.8
- Strong-position pages (page 1): time-zone (~7.3), date (~7.6), compound (~10.6)
- High-impression but deep: sales-tax (112 impr, ~74), discount (89, ~56),
  tip (44, ~73), rent (24, ~73)
- ~87% US, ~83% desktop impressions

## Traffic baseline (Cloudflare, May 2026)

- ~727 requests/day · ~104 unique visitors/day (flat, day-1 launch spike 180)
- ~125 MB served/month · cache hit ~36% (cold-cache artifact at this volume;
  HTML intentionally `max-age=0, must-revalidate` — not a bug, not chased)
- Current traffic is largely non-organic (direct, bots, crawlers); organic
  clicks still 0 — normal for a ~4-week-old domain.

## Read of the data

On-page is effectively done (V2 + GSC-1). The growth bottleneck is **domain
authority and age**, not content: money pages sit deep because the domain is
young and has near-zero external signals, not because a FAQ is missing.

## Next steps

**Watch:**
- `/changelog` indexation in 3–7 days (URL Inspection → "URL is on Google").
  If not indexed by ~10 days, likely just low crawl priority for a support page,
  not a technical fault.

**Growth (off-page, highest leverage — not code):**
1. GitHub README as a public trust asset (done — see README.md).
2. One real link from a personal/profile site (e.g. room411).
3. One careful public post using the no-AI / privacy / "shows the math" angle.

**Measure:**
- New GSC export in **30–60 days** and compare against this baseline.

## Explicitly not doing now

No further code sprint, no new tools, no redesign, no common-example tables,
no city/state pages, no cache experiments, no AdSense Auto Ads, no re-requesting
indexing for redirect/canonical-variant URLs, no chasing the ~11 non-indexed
noise URLs.
