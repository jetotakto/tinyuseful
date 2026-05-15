# TinyUseful — current status

**Last updated:** 2026-05-15
**Branch:** `v2-rebuild` (worktree at `E:\tinyuseful-v2\`)
**Live:** [tinyuseful.app](https://www.tinyuseful.app)

## Rollout state

The v2 hf design system rollout is **complete** for the existing surface:

- **11/11 calculator pages** migrated to `body.ui-hifi` + `<main id="main" class="hf">`:
  Percentage, Sales Tax / VAT, Mortgage, Loan, Compound Interest,
  Rent Affordability, Tip, Discount, Unit Converter, Date Calculator,
  Time Zone Converter.
- **Homepage** running the `hf-home` variant.
- **Support pages** (About, Privacy, Terms, Changelog, 404) preserved on legacy
  layout — intentionally out of v2 scope.

## URL inventory

Root-level URLs preserved across the migration. `sitemap.xml` contains 16 entries:

| Type      | Count | Path pattern                                                       |
|-----------|------:|--------------------------------------------------------------------|
| Homepage  | 1     | `/`                                                                |
| Tools     | 11    | `/<tool-slug>/`                                                    |
| Support   | 4     | `/about.html`, `/privacy.html`, `/terms.html`, `/changelog.html`   |

No `/tools/<slug>/` or cluster-based URLs introduced. No pSEO city/state
variants introduced (per non-negotiable #16).

## Stack (unchanged from pre-rollout)

- Vanilla HTML, CSS, JavaScript. No framework, no build pipeline, no dependencies.
- `style.css` — single shared stylesheet, hf rules scoped via `body.ui-hifi`.
- `theme.js` — light/dark toggle, localStorage-persisted.
- `js/helpers.js` — `parseLocaleNumber`, `setOut`, `attachLiveCalc`,
  copy-result behavior, mobile keyboard `body.is-input-mode` handling.
- Self-hosted fonts (Archivo Variable + Montserrat / Inter / JetBrains Mono).
- Static deploy on Cloudflare Pages from `main` branch.

## AdSense state

- AdSense script loaded site-wide.
- `.hf-ad` placeholder reserved on tool pages (after methodology, before
  FAQ / related). No ad between input and result.
- **No `<ins class="adsbygoogle">` units rendered yet** — strategic decision
  pending (manual units vs. defer/remove script on pages without units).
- Auto Ads remain OFF (per non-negotiable #11).
- No sticky mobile ads (per non-negotiable #12).

## Active source-of-truth docs

| Document                                                       | Status     |
|----------------------------------------------------------------|------------|
| [CLAUDE.md](CLAUDE.md)                                         | **Active** — code rules and workflow for AI contributors |
| [docs/V2_NON_NEGOTIABLES.md](docs/V2_NON_NEGOTIABLES.md)       | **Active** — 18 binding principles                       |
| [README.md](README.md)                                         | **Active** — public-facing project description           |
| `TINYUSEFUL_STATUS_2026-05-15.md` (this file)                  | **Active** — current state                               |

## Archived docs

The following documents capture pre-rollout planning and are kept for
historical context only. Each carries an `ARCHIVED 2026-05-15` banner.

- [`V2_README.md`](V2_README.md) — pre-deploy branch description
- [`TINYUSEFUL_STATUS_2026-05-06.md`](TINYUSEFUL_STATUS_2026-05-06.md) — pre-rollout snapshot (left untouched)
- [`docs/V2_WORKFLOW_RULES.md`](docs/V2_WORKFLOW_RULES.md) — pre-rollout 10-step workflow (completed)
- [`docs/PHASE58_SPEC_2026-05-07.md`](docs/PHASE58_SPEC_2026-05-07.md)
- [`docs/TINYUSEFUL_HANDOFF_2026-05-07.md`](docs/TINYUSEFUL_HANDOFF_2026-05-07.md)
- [`docs/TINYUSEFUL_STRATEGY_DISCUSSION_2026-05-07.md`](docs/TINYUSEFUL_STRATEGY_DISCUSSION_2026-05-07.md)
- [`docs/GPT_REBUILD_PLAN_QUESTIONS_2026-05-07.md`](docs/GPT_REBUILD_PLAN_QUESTIONS_2026-05-07.md)
- [`docs/GPT_ROUND3_MESSAGE_2026-05-07.md`](docs/GPT_ROUND3_MESSAGE_2026-05-07.md)

## Known open items

Tracked for follow-up patches; **not changed in this docs patch**.

- **A11y semantics** — visible `.lbl` wrappers are `<div>` with `aria-label`
  on inputs, not real `<label for="id">`. Click-on-label-focuses-input does
  not work. Low-risk batch fix candidate.
- **Mobile keyboard compact mode** — `body.is-input-mode` toggling in
  `helpers.js` still fires when focus enters a `.tool-form` ancestor, but
  the matching CSS rules target legacy `.tool-form .row` / `.out` /
  `.section-head` / `.tool-meta` selectors, not new `.hf-*` selectors.
  Needs real-device testing before deciding whether to add scoped
  `body.ui-hifi.is-input-mode` rules or remove the legacy assumption.
- **FAQ JSON-LD typographic mismatches** — after recent reconciliation,
  some pages still differ between visible HTML and FAQ schema in curly
  quotes / phrasing (e.g. `%` vs `percent`). Not a functional Rich Results
  blocker.
- **AdSense manual units** — strategic decision: implement real
  `<ins class="adsbygoogle">` units in `.hf-ad .ad-slot`, or defer/remove
  the script on pages without ad units.
- **Homepage copy** — title/meta still say "everyday questions" while H1
  says "BIG ANSWERS". Cosmetic content patch, intentionally not bundled
  with this docs cleanup.

## How to use this file

Future Claude/GPT sessions should treat this document as the canonical
project status. Pre-rollout docs remain in the tree for historical
context; their banner explicitly redirects readers here.

Active **rules** still live in `CLAUDE.md` (workflow / code style) and
`docs/V2_NON_NEGOTIABLES.md` (18 principles). This file does not duplicate
those — it describes the deployed state, not the policy.
