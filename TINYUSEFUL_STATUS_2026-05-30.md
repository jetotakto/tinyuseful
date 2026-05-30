# TinyUseful — status & GSC baseline

**Date:** 2026-05-30
**Branch:** `main` (production) / work staged on `v2-rebuild`
**Live:** [tinyuseful.app](https://www.tinyuseful.app)

This snapshot closes the technical / indexation / discoverability phase that
followed the V2 hf rollout — including the canonical clean-URL cleanup, the
founder entity bridge, the Cloudflare AI-search-bot unblock, and brand
finalization, all completed 2026-05-30 — and records the baseline to compare
against in 30–60 days. Active policy
docs remain [CLAUDE.md](CLAUDE.md) and [docs/V2_NON_NEGOTIABLES.md](docs/V2_NON_NEGOTIABLES.md);
the prior state snapshot is [TINYUSEFUL_STATUS_2026-05-15.md](TINYUSEFUL_STATUS_2026-05-15.md).

## What shipped since 2026-05-15

| Batch | Merge | Effect |
|-------|-------|--------|
| Support pages → V2 hf shell, a11y `<label for>`, cache-bust unify, sitemap lastmod, Tip `.tool-form` | `4c14499` | V2 transition completed beyond calculators |
| Homepage featured tile → whole-card click target | `d3c998e` | UX fix |
| GSC-1 calculator FAQ refinements (compound JSON-LD, sales-tax add-tax FAQ, tip tax+tip/NYC FAQ, rent purpose) | `738a528` | query-driven content delta |
| Canonical + sitemap + internal links → Cloudflare clean URLs (support pages `.html` → extensionless) | `ef32f55` | indexation hygiene |
| README trust copy + cookies wording fix | `67ca321` | public asset hygiene |
| Founder Person entity on homepage Organization JSON-LD (`sameAs` → GitHub profile + room411) | `6f7f95f` | E-E-A-T / entity bridge |
| Favicon recolored legacy red → V2 yellow (all variants), Cloudflare cache purged | `f2824ca` | brand consistency |

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

## AI-search discoverability (verified 2026-05-30)

Cloudflare's edge "Block AI bots" was returning **403** to the AI search bots
that robots.txt explicitly allows — overriding robots.txt at the network layer
(robots.txt invited them; Cloudflare slammed the door before they read it). The
blanket block was turned off in the Cloudflare dashboard. Verified live via curl
(homepage + a tool page + robots.txt):

- OAI-SearchBot, ChatGPT-User, Claude-User, Claude-SearchBot, PerplexityBot → **200**
- Googlebot, Bingbot → **200**
- Training bots (GPTBot, ClaudeBot) → 200 at edge, but robots.txt still
  Disallows them (well-behaved training crawlers honor it).

TinyUseful is now readable by the AI-search ecosystem (ChatGPT Search,
Perplexity, Claude web search). This **removed a barrier**; it does not create
demand — AI citation follows the same authority/ranking curve as normal search,
so don't expect a jump.

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

**Off-page assets (status):**
1. GitHub: public repo + README + description + website field + 10 topics +
   pinned repo — **done**.
2. GitHub profile README (`jetotakto/jetotakto`) — **declined** (links would be
   nofollow; low value, identity-only).
3. **room411.cz → real dofollow backlink**, live and verified (`<a href>`, not
   plain text; `rel` has no `nofollow`). This is the one aged-domain authority
   signal and the single highest-impact off-page action taken.
4. Remaining (Lukáš, off-page, not code): one careful public post using the
   no-AI / privacy / "shows the math" angle. No accounts created, no spam.

**Measure:**
- New GSC export in **30–60 days** and compare against this baseline.
- Watch that AI-search bots keep getting **200** (Cloudflare regression guard).

## Explicitly not doing now

No further code sprint, no new tools, no redesign, no common-example tables,
no city/state pages, no cache experiments, no AdSense Auto Ads, no re-requesting
indexing for redirect/canonical-variant URLs, no chasing the ~11 non-indexed
noise URLs.
