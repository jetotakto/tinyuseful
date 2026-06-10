# Growth contingency playbook — September 2026

**Created:** 2026-06-10
**Type:** decision log / checkpoint plan — not a new roadmap.
**Companion docs:** technical + search baseline in
[TINYUSEFUL_STATUS_2026-05-30.md](../TINYUSEFUL_STATUS_2026-05-30.md);
policy in [CLAUDE.md](../CLAUDE.md) and [V2_NON_NEGOTIABLES.md](V2_NON_NEGOTIABLES.md).

## 1. Purpose

Make the September 2026 growth decision against a written plan instead of
memory or frustration. This file fixes thresholds, scenarios, and allowed
actions in advance, so a weak summer cannot trigger an impulsive bad move.

## 2. September is a diagnostic checkpoint, not go/no-go

By early September the domain is ~4.5 months old. For a new domain with
near-zero external signals, the realistic organic inflection window is
6–12 months; 2–3 flat months are normal, not proof of failure. The September
question is not "what do we rebuild on the site" but:

> Is the limiting factor technique, authority, query battlefield selection,
> or simply the age of the domain?

If technique stays clean and content intent coverage holds, the next lever is
not more on-page text. It is distribution + authority + picking less
competitive battlefields.

## 3. Baseline assumptions (state as of 2026-06-10)

- V2 hf rollout complete across calculators and support pages.
- Technical/indexation baseline audited 2026-05-30: 15/16 final URLs indexed,
  0 technical fixes needed, sitemap clean, AI-search bots unblocked (200).
- GSC-1 content/trust pass complete (2026-05-30). Read-only audit 2026-06-10
  confirmed ~95% coverage of external content recommendations; the remaining
  deltas (Tip next-task chips, 2× FAQ JSON-LD parity) merged to main as
  `495fb53`.
- New-domain / low-authority reality: 0 clicks, ~240 impressions/28 d and
  decaying (fresh-domain sampling decay from ~22 May, not deploy-correlated);
  money pages at positions ~56–85; low-competition pages reach page 1 fast
  (time-zone ~9.6, date ~8.8, mortgage 7, loan 9).
- One real dofollow backlink (room411.cz). The founder post is not yet
  published — the single biggest untested lever.

## 4. Checkpoint 1 — mid-July 2026 (~15 Jul)

Purpose: verify the site behaves normally. No strategy decision.

- Export GSC last 28 d (chart, pages, queries) + Page indexing report.
- Did impressions stabilize after the 30 May / 10 Jun deploys?
- `/changelog` indexed; AI-search bots still return 200 (Cloudflare
  regression guard).
- Cloudflare referrer side-watch, no expectations: google.com, bing.com,
  duckduckgo.com, chatgpt.com, perplexity.ai.
- No major changes unless a technical issue appears.

## 5. September thresholds (working metrics, not law)

**Improvement — any of:**

- 500–700+ impressions / 28 d, or
- 5+ organic clicks / month, or
- 2–3 money pages under average position ~50, or
- page-1 / near-page-1 tools start collecting clicks.

**Stagnation — all of:**

- under ~300 impressions / 28 d,
- 0–2 clicks / month,
- Sales Tax / Discount / Tip / Rent still ~60–85,
- no growth in query coverage.

**Warning signs (act regardless of the above):**

- indexation/coverage errors or canonical regressions,
- position drops correlated with a specific deploy,
- AI-search bots blocked again at the edge.

## 6. Scenario tree

| Scenario | Signal | Action |
|----------|--------|--------|
| A. Improving slowly | impressions up, positions drifting down (70 → 45), clicks ~0 | hold course; small trust/internal-linking patches only; next review +2 months |
| B. CTR / snippet issue | URLs with average position better than ~30 collect impressions but no clicks | title/meta work only on those URLs; query-specific examples only where justified |
| C. Authority / external signals | impressions flat, money pages stuck 60–85, technique clean | run section 7; no further on-page copy by default |
| D. Technical regression | indexing/coverage errors | fix first; pause all SEO/content changes |
| E. Post-change ranking drop | drop correlated with a deploy | compare deploy log vs GSC timeline; revert the offending patch (atomic commits keep this cheap); no new changes until the cause is clear |

## 7. If stagnation persists (scenario C)

1. **Delta audit only** — compare against the 2026-05-30 technical baseline:
   indexation, canonical, sitemap, robots, 404/soft-404, redirect chains.
   Timebox: hours, not a week.
2. **SERP comparison** — top 6 pages (discount, sales-tax, tip, rent, date,
   time-zone) vs live competitors. Classify each gap: authority, intent
   mismatch, snippet, or raw competition.
3. **External signal push, in this order:**
   - founder post on owned/safe surfaces first: room411 article
     ("why I built small calculators without AI"), GitHub README, LinkedIn;
   - then community: Show HN / Indie Hackers / carefully Reddit — honest,
     technical, small; angle: "no-AI, no-account calculators that show the
     math and run in the browser"; no growth-hacking tone;
   - Bing Webmaster Tools via GSC verification import — no DNS or site
     changes;
   - 2–3 legitimate one-off directory/community submissions; Product Hunt
     deferred.
4. **Referral monitoring** — Cloudflare/GSC: google, bing, duckduckgo,
   chatgpt.com, perplexity.ai, plus HN/IH referrers if used.

## 8. Content policy

Default in September: **no content patch.** Patch only when new GSC query
data shows a clear, relevant, currently uncovered intent. No SEO text for
SEO text's sake.

## 9. New tool policy

- Eligible only **after** the September diagnostic review.
- Max 1–2 tools per batch, then measure. Never a multi-URL series.
- Rule: a new URL only for a clearly different task / formula / input model /
  search intent. Microvariations belong on existing pages.
- Preferred candidates (distinct tasks, adjacent to proven page-1 clusters or
  real founder authority):
  1. **Salary to Hourly** — distinct task and input model, evergreen intent,
     low implementation complexity.
  2. **Prorated Rent** — different rent intent than affordability ("what do I
     pay for a partial month", not "what can I afford").
  3. **Business Days** — extends the date cluster where Google already ranks
     the site well.
  4. **Square Footage** — Home/architect bridge backed by real founder
     expertise; after stabilization, not as panic expansion.
- **Avoid near-duplicates:** Percent Off / Sale Price only if GSC proves
  separate demand that Discount cannot cover. Split Bill only if scoped as a
  materially different input model than Tip Calculator (uneven splits,
  per-person items, tax/service-charge handling).

## 10. Guardrails (apply regardless of frustration)

No redesign panic · no URL migration · no framework · no Auto Ads · no
city/state doorway pages · no pSEO · no bought links · no AI content farm ·
no YMYL pivot (health, tax-filing, legal, investment advice). Root-level URLs
and the existing architecture stay unchanged.

## 11. Hold mode

If still flat after the external-signal push and 1–2 clean new tools: pause
active development. Running costs are ~0; the domain and backlink age on
their own. Quarterly GSC review, occasional small patch. Hold is a legitimate
outcome, not a loss.
