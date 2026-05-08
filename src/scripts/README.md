# v2 scripts directory

**Status:** scaffold only, not implemented.

## Plánovaná struktura

- `core/`
  - `parse.js` — `parseLocaleNumber()` (heuristics for `1,234.56` and `1.234,56`)
  - `format.js` — `formatCurrency()`, `formatPercent()` (Intl.NumberFormat)
  - `debounce.js`
  - `validate.js`
  - `status.js` — `aria-live` polite announcement helpers
  - `share.js` — copy result, URL state
- `calculators/`
  - `tip.js`, `percentage.js`, etc. (per-tool modules)
  - Each exports pure `compute(state)` function

## Reference

Current `js/helpers.js` (existing) implements:
- `window.parseLocaleNumber(raw)` — locale-aware parsing
- `window.setOut(id, label, big, breakdown)` — DOM-based result render
- `window.copyResultFromButton(btn)` — clipboard API
- `window.attachLiveCalc(selector, fn, wait=80)` — debounced live calc
- focusin/focusout handlers for `body.is-input-mode`
- click delegation for `[data-copy-result]`

These are validated patterns from Phase 50-57. Do NOT discard during v2 — extract, refine, modularize.

## Pending decisions

- Module pattern: ES modules vs IIFE (current)?
- Bundling: per-tool standalone JS vs shared core + per-tool delta?
- `defer` attribute: experimentally added in Phase 56b — known to break inline scripts dependent on helpers. Phase 56b reverted, do NOT add `defer` without ESM refactor.
