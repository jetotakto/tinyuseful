# TinyUseful Code Rules

TinyUseful is a fast, static, browser-based calculator website.

## Non-negotiables

- Preserve existing root-level URLs.
- No framework, no SPA, no hydration.
- Vanilla HTML/CSS/JS.
- Build-light is allowed only for tiny utilities such as sitemap generation, minification, QA checks, or dead-link checks.
- No accounts.
- No AI interaction model.
- Deterministic browser-side calculations only.
- Use native HTML controls.
- No custom selects.
- No placeholder-only labels.
- Do not use `input type="number"` for money, percentages, or decimal inputs.
- Use `input type="text"` with `inputmode="decimal"` for money/decimal fields.
- Input and result must stay in one workspace.
- The result block is the primary product of the page.
- Never visually demote the result below ads, long text, or decorative elements.
- Methodology goes below the calculator.
- No ad between input and result.
- Ads must be visually and interactionally separated from inputs, buttons, and result areas.
- Auto Ads remain off.
- No sticky mobile ads.
- No pSEO city/state/holiday doorway pages.
- No YMYL tools.

## Protect existing infrastructure

Never remove without explicit approval:
- locale-aware parsing
- NaN guards
- `parseLocaleNumber`
- `setOut`
- `attachLiveCalc`
- copy-result behavior
- `role="status"`
- `aria-live="polite"`
- `aria-atomic="true"`
- tabular number rendering
- mobile keyboard / `body.is-input-mode` behavior
- VisualViewport-related keyboard behavior

## Freeze rules

Never modify without explicit approval:
- URL structure
- robots.txt policy
- ads.txt
- analytics setup
- Cloudflare config
- security headers
- sitemap URL patterns
- existing indexed root-level tool URLs
- AdSense configuration

## UX rules

- First input should be visible on small mobile viewports.
- Labels must stay visible after typing.
- Result must have a clear label, dominant number, unit/currency, short breakdown, and copy action.
- Avoid layout shift.
- Avoid count-up animations.
- Avoid sticky result unless specifically approved and tested on mobile keyboard.
- Use native `<details>` for methodology or advanced options where appropriate.
- Use native `<fieldset>` and `<legend>` where inputs are logically grouped.
- Do not create custom dropdowns, custom sliders, or app-like navigation.

## Content rules

Use truthful trust copy only:
- “Calculations run in your browser.”
- “We do not require an account.”
- “We do not save your inputs.”
- “Ads and analytics may use cookies where applicable.”
- “Built and maintained by Lukáš, an architect in Prague.”

Avoid:
- “100% private”
- “No tracking”
- “bank-grade security”
- “expert reviewed” without a real review process

## Workflow

Before coding:
1. Read relevant files.
2. Summarize current architecture.
3. Identify risks.
4. Propose a short plan.
5. For multi-file changes, wait for approval.

During coding:
- Prefer small incremental changes.
- Avoid large multi-page redesigns in a single task.
- Do not opportunistically refactor unrelated code.
- Do not “clean up” working guards or helpers unless explicitly asked.
- Do not add dependencies unless the task explicitly requires dev tooling.
- Do not change visual design while implementing methodology or accessibility unless required for correctness.

After coding:
1. Summarize changed files.
2. List any risks.
3. Check accessibility basics.
4. Check mobile layout assumptions.
5. Check calculation edge cases.
6. Provide manual test steps.
7. Suggest one commit message.