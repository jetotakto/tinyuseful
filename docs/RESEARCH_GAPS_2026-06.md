# Research: overlooked calculator demand gaps — June 2026

**Created:** 2026-06-11
**Type:** research report (input to tool-roadmap decisions). Feeds §9 (new tool
policy) of [GROWTH_CONTINGENCY_2026-09.md](GROWTH_CONTINGENCY_2026-09.md).

## Provenance & verification status

Produced by a fan-out deep-research run (5 search angles → 44 fetched sources →
claim extraction → adversarial verification), salvaged from the run journal
after the run hit a plan rate limit. **68 of ~190 extracted claims received a
verification verdict (43 survived, 25 refuted); the verified subset covers the
load-bearing market data.** Synthesis was done by the main assistant from the
cached results, not by the workflow's synthesis agent. Claims below are marked
**[verified]** (verdict survived adversarial re-check against the primary
source) or **[unverified]** (extracted but never verified, or survey-based).
Refuted claims are listed in the Graveyard — several refutations are
load-bearing findings in their own right.

## Executive summary

1. **AI absorbs single-fact answers, not calculators.** Presence of a Google AI
   Overview correlates with −58% CTR for the top organic result, and position-1
   CTR on informational queries halved 2023→2025 even without an AIO (Ahrefs,
   300k keywords, Feb 2026) [verified]. Yet calculator.net held 53–70M
   visits/month through spring 2026 with no collapse, and AI assistants refer
   it <0.1% of traffic (Semrush, April 2026) [verified]. Single-fact lookups
   are the dying class (Dictionary.com −37% — blog figure [unverified]);
   multi-input adjustable tools are the durable class. Build only the latter.
2. **Best-evidenced concrete gap: unit price / shrinkflation calculator.**
   Only 19 US states have unit-pricing laws and only 9 mandate shelf display
   (NPR citing NIST, 2024) [verified]; NIST runs a consumer-tools program on
   exactly this topic and offers no calculator [verified]; the recommended
   consumer defense is literally "divide price by quantity on your phone"
   [verified]. Survey stats (75% noticed shrinkflation, 78–82% use unit
   prices) are self-reported [unverified — verifiers struck "measured" framing].
3. **Seasonal lead times were wrong in our planning assumption.** Competitive
   seasonal terms need 3–6 months of lead time, not 4–8 weeks (Search Engine
   Land, updated Apr 2026) [verified]. The 4–8 week build-by only works for
   low-competition terms — which is where the domain already ranks fast.
4. **calculator.net's moat is habit + authority, not product:** Authority
   Score 91, ~29.7k referring domains, 37.5% direct traffic, 3.12 pages/visit
   [verified]. Head terms are permanently out of reach; the goal is to become
   the *bookmark* for a few narrow jobs. Cross-linking chips are a real
   multiplier (multi-tool sessions are normal behavior).

## Top opportunities (constraint-checked)

| # | Gap | Evidence | Why incumbents won't fill it | Effort | ≤2-week falsifiable test |
|---|-----|----------|------------------------------|--------|--------------------------|
| 1 | **Unit price / shrinkflation comparator** (price per unit, two-package comparison, hidden per-unit increase) | NIST 19/9 states [verified]; NPR: defense = DIY division [verified]; ~30% of goods downsized 2019–23 (BLS via NIST) [verified]; usage surveys [unverified] | NIST publishes documents, not tools; retailers won't (NJ fined Walmart $1.5M for 2,000+ wrong unit-price labels [verified]); no federal rule coming [verified] | S | build one page; watch GSC for "price per ounce/unit calculator" impressions; kill if 0 impressions in 6 weeks |
| 2 | **Percent vs. percentage points** | Harvard/Shorenstein: pervasive recurring error among journalists; magnitude example: 1%→5% = 4 pp but +400%; SERP held by micro-sites only; paid courses exist ($29.95 Poynter) | audience (journalists/analysts) is citation-prone — exactly who lead-gen sites can't monetize | S | page + one post to a journalism community; success = a citation/backlink, not volume |
| 3 | **Multi-sport pace converter** (min/km ↔ min/mile ↔ min/100m swim ↔ min/500m row) | HN commenter explicitly requested it with stated repeat-use intent [unverified, forum] | too niche for template farms; needs sport-convention knowledge, not just a formula | S | page + one post to running/rowing community; success = returning direct visits |
| 4 | **Mixed-unit output in existing Unit Converter** (X inches → miles + yards + feet + inches) | HN: standard converters fail the intent via output format [unverified, forum] | template converters have one output slot; nobody rewrites an engine for formatting | S, no new URL | feature patch; watch engagement |
| 5 | **"Shows its work" as explicit positioning** | Quora question unserved by humans for ~a decade [verified-ish via page data]; Mathway/Symbolab/Photomath/Wolfram paywall exactly the steps (checkable on pricing pages); answer space is spam → weak competition | incumbents monetize the steps; giving them away breaks their model | S | add the phrase to existing meta/copy; watch GSC for "shows work" queries |
| 6 | **Small upgrades from documented complaints**: continuous compounding (missing even at rivals), date-difference framing ("difference between two dates" > "age calculator"), keyboard-only accessibility | HN calcverse thread (191 pts): named gaps incl. a11y gap from an assistive-tech specialist [unverified, forum] | ad-heavy sites structurally neglect a11y | S | content/feature patches on existing URLs |
| 7 | **Wedding budget-split / cost-per-guest** | Google first-party: "how to budget for wedding" tops its query category [verified]; summer peak + "fall wedding" most-searched season in most states [verified]; "micro wedding" all-time high 2025 [unverified] | The Knot/NerdWallet route to vendor lead-gen, not neutral arithmetic | M | seasonal: build by December or April windows, not now |

## Seasonal calendar (build-by per verified 3–6-month rule for competitive terms; 4–8 weeks only for low-competition)

| Demand month | Need | Competition | Build-by |
|---|---|---|---|
| January | resolutions: debt/savings arithmetic; wedding-planning kickoff | medium | Oct–Nov |
| Jan–mid-Apr | tax-adjacent non-YMYL arithmetic (paycheck/withholding) | high | October |
| Mar–Jun | moving research ramp (prorated rent, sq ft) — **post-2021 spring shift** (arXiv 2605.21358 [verified for prices/sales; search-timing inference partial]) | low–med | **Feb–Mar** |
| May–Jun | wedding peak (+ "fall wedding" tail into autumn) | medium | Mar–Apr |
| June | AC/cooling cost | low | April |
| late Jul–Sep | back-to-school | medium | Apr–Jun |
| October | furnace/heating; **build holiday tipping** | low | August |
| November | Black Friday stacking — short window, collapses day-after [verified] | high | September |
| December | holiday tipping peak (AARP refreshes Dec 9; per-recipient rules, not %) | medium | October |
| **monthly** | "pay rent" searches peak on the 1st — sub-annual cycle for rent tools [unverified, blog] | — | — |

## Misunderstood-numbers shortlist

- **Strong:** unit price / shrinkflation (= opportunity #1); percent vs
  percentage points (= #2).
- **Real but risky:** "70% chance of rain" — 35–73.8% of respondents (incl.
  meteorologists) misdefine PoP; deterministic formula PoP = confidence ×
  coverage (NWS); The Weather Channel's historical "wet bias" (forecast 20% →
  rained ~5%) [all per McGill OSS, secondary]. Risk: intent is informational,
  not computational — an explainer with a mini-tool, not a calculator page.
- **Weak:** median vs average — head term held by authority text pages
  (SmartAsset, lead-gen, no tool on page [verified]); "calculate" variant
  volume unverified.
- **Not covered by the cache:** margin of error, survivorship bias, and the
  rest of the planned ~20 — unresearched, not rejected.

## Lens report (which analogy survived contact with data)

- **Corner store (retail):** won. Ad-interruption rage is the single
  best-documented complaint: Google Play reviews show ads over the keypad
  mid-calculation, $14.99/week to remove ads, users reverting to the stock
  calculator (= abandoning the category). "Speed beats selection" is our fight.
- **Moneyball:** won. #2 and #3 are precisely undervalued high-intent queries
  with weak SERPs.
- **Epidemiology / transmissibility:** partial. The "a calculator app is
  deceptively hard" HN thread hit 1,821 points / 430 comments [verified via
  Algolia API] — *correctness itself is viral content* → ready-made founder-post
  angle. Login walls kill sharing (first comment of the thread).
- **Ecology (specialist vs generalist):** survived in amended form — see
  Graveyard (Omni).
- **Weather / leading indicators:** survived. Moving research leads physical
  moves by 1–3 months (booking 8–12 weeks ahead) [unverified, industry blog].

## Graveyard (killed loudly)

- **"Omni ignores niches" — REFUTED** (11 verdicts): Omni runs 3,600+
  calculators, solicits paid B2B custom work, and is funded "predominantly"
  (not "entirely") by ads. Topic obscurity is NOT our differentiation. What
  remains is what their model forbids: embeds, shareable state, ad placement
  discipline, formula transparency.
- **"Wedding budgeting = top query of all time" — misquote**: it is top only
  within the "how to budget for…" category.
- **"75% of Americans noticed shrinkflation" as demand proof — struck**:
  secondary aggregator recast surveys; cite NPR/NIST facts instead.
- **Generic % holiday-tip calculator**: USPS bars cash tips; FedEx caps gifts
  at $75 — without per-recipient rules the tool is not credible (validates the
  planned rule-based approach, kills the naive % variant).
- **PercentMaster as trend evidence**: founder marketing with zero data
  (2 verdicts) — but watch it as a competitive entry (Apr 2026).
- **Classroom channel via Common Sense Education**: review program paused
  Jan 2026; evidence dates to 2014. Watch, not act.
- **Single-fact answer pages of any kind**: first in line for AI absorption.

## Weird signals

"Pay rent" monthly pulse on the 1st; Reddit +68% vs Quora −28% in 2025 (where
to mine complaints next); AI referrals <0.1% today — the AI-citation channel is
a future bet, not present traffic; Canada's forecast standards forbid ever
publishing a 50% PoP.

## Recommendation (within the contingency playbook)

Build nothing now. At the July window, bundle the cheap no-new-URL patches
(#4–6). After the September diagnostic, open **#1 unit-price** as the first new
tool (S effort, NIST citable in methodology, evergreen + news-spike profile);
pair **#2 percentage-points** with the founder post. Re-run the unfinished
verification tail only if a specific [unverified] claim becomes load-bearing
for a build decision.

## Key sources

- Ahrefs, "AI Overviews Reduce Clicks by 58%" (2026-02-04): https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/
- Semrush, calculator.net overview (April 2026 data): https://www.semrush.com/website/calculator.net/overview/
- NPR Planet Money, unit pricing vs shrinkflation (2024-07-09): https://www.npr.org/sections/planet-money/2024/07/09/g-s1-8534/shrinkflation-inflation-price-consumers-law
- NIST, Uniform Unit Pricing program: https://www.nist.gov/programs-projects/uniform-unit-pricing-tools-consumers-fight-shrinkflation
- Search Engine Land, SEO seasonality guide (upd. 2026-04-22): https://searchengineland.com/guide/seo-seasonality
- Hu & Selcuk, "From Summer to Spring" (arXiv 2605.21358, 2026-05-20): https://arxiv.org/abs/2605.21358
- Google Trends, US Wedding Season 2025: https://trends.withgoogle.com/trends/us/wedding-season-2025/
- The Journalist's Resource (Harvard Shorenstein), percent vs percentage points: https://journalistsresource.org/home/percent-change-math-for-journalists/
- McGill OSS, probability of precipitation: https://www.mcgill.ca/oss/article/environment/problematic-perceptions-probability-precipitation
- Ask HN, "What calculator do you wish existed?": https://news.ycombinator.com/item?id=43729831
- Show HN, calcverse.live thread (2025-02-22): https://news.ycombinator.com/item?id=43137248
- HN, "calculator app is deceptively hard" (canonical item 43066953)
- Quora, "Is there a calculator that shows its work?": https://www.quora.com/Is-there-a-calculator-that-shows-its-work
- AARP holiday tipping guide (upd. 2025-12-09): https://www.aarp.org/money/personal-finance/holiday-tipping-guide/
- moveBuddha, peak moving season: https://www.movebuddha.com/blog/peak-moving-season/
- Google Play reviews, "Calculator" (Prometheus Interactive): https://play.google.com/store/apps/details?id=apps.r.calculator
