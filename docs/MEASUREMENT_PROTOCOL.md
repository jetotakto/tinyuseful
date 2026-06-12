# Measurement protocol — monthly ritual

**Created:** 2026-06-12
**Type:** operating procedure. Companion to
[GROWTH_CONTINGENCY_2026-09.md](GROWTH_CONTINGENCY_2026-09.md) (which owns the
decision thresholds); this file owns *what gets measured, where, and when* so
no monthly review is ever done from memory or gut feeling.

## The ritual (first week of every month, ~30 minutes)

1. **GSC export, last 28 days** (Performance → Export): chart, Pages, Queries.
   File the export folder by date next to the previous ones.
2. **GSC Page indexing report**: count of indexed final URLs vs expected
   (currently 18 sitemap URLs). Any new "Excluded" final URL = investigate.
3. **Cloudflare, last 30 days**: unique visitors/day, requests/day,
   data served, % cached. Note: visitors are mostly non-organic at this stage;
   the trend matters, not the level.
4. **Share-link signal**: Cloudflare requests containing `?s=1` (if query
   strings are visible in the plan's analytics; otherwise note "not visible"
   and rely on direct-traffic trend of the share-enabled pages).
5. **AI/alt-search referrers** (side watch, no expectations): google, bing,
   duckduckgo, chatgpt.com, perplexity.ai.
6. Update the scorecard below and write one paragraph: what changed, what it
   means, what (if anything) it triggers per the contingency playbook.

## Per-tool scorecard

| Tool | Live since | Primary metric | Kill criterion | Status |
|---|---|---|---|---|
| /unit-price-calculator/ | 2026-06-12 | GSC impressions on "unit price / price per oz / shrinkflation" queries | 0 impressions by ~2026-07-24 (6 weeks) | watching |
| /bill-split-calculator/ | 2026-06-12 | GSC impressions on "split bill / uneven" queries + share-link opens | 0 impressions AND 0 share opens by ~2026-07-24 | watching |
| Tip share-links pilot | 2026-06-10 | `?s=1` opens; direct-visit trend on /tip-calculator/ | informational — no kill (cost was ~0) | watching |
| 11 original tools | 2026-05 | positions of money pages (sales-tax, discount, tip, rent) vs 2026-05-30 baseline; page-1 cluster (time-zone, date, mortgage, loan) clicks | per playbook §5 thresholds (September) | baseline set |

## What each change type is judged by

- **New tools** → GSC impressions/queries within 6 weeks (kill criteria above),
  then clicks and position trend. Verdicts only against exported numbers.
- **SEO/content patches** → query coverage and position deltas at the next
  monthly export; never judged sooner than 4 weeks (indexing lag).
- **UX fixes** → *defect verification, not traffic.* We have no event
  analytics (analytics setup is frozen), so UX changes are validated by
  measured before/after facts at ship time (tap-target px, clipping,
  viewport math — as in the 2026-06-12 mobile audit) plus any indirect
  signal in returning-direct traffic. Do not promise traffic effects from
  UX patches; promise removed defects.
- **Distribution actions** (founder post, directories) → referrer spikes in
  Cloudflare within days, backlinks within weeks (check via GSC Links report).

## Honest limits of this setup

- No event analytics → no funnels, no completion rates, no A/B. Accepted
  trade-off (privacy positioning + frozen analytics config). If a future
  decision *requires* event data, that is a separate explicit proposal, not
  a silent addition.
- Cloudflare free analytics may not expose query strings; if `?s=1` is not
  visible there, the share signal is approximated by direct-traffic trend on
  share-enabled pages — weaker, say so in the monthly note.
- GSC impressions at positions 50+ are noisy; week-to-week swings are not
  signals. Compare 28-day windows only.

## Calendar anchors

- **~2026-07-15** — Checkpoint 1 (playbook §4): stabilization check + this
  ritual + new-tool 5-week readout.
- **~2026-07-24** — 6-week kill/keep verdicts for unit-price and bill-split.
- **Early September 2026** — Checkpoint 2 (playbook §5–6): scenario decision.
- **Mid-September 2026** — build-by deadline for deal comparator if Black
  Friday window is to be used (playbook + research doc).
