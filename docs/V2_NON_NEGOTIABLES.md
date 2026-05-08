# TinyUseful v2 — 18 non-negotiable principles

**Locked:** 2026-05-07 (Lukas + GPT round 4)
**Source:** 3-AI consensus (GPT/Gemini/Claude master concept research)

## 18 V2 non-negotiables

Tato pravidla jsou **non-negotiable** pro v2 rebuild. Pokud Claude nebo GPT návrh porušuje cokoliv z těchto 18, je to **blocker** a Lukas musí explicitně override.

### URL & architecture

1. **Preserve current root-level tool URLs**
   - `/percentage-calculator/`, `/tip-calculator/`, atd. zachovat
   - NIKDY migrovat na `/tools/...` nebo `/calculators/<cluster>/<tool>/`
   - GSC indexing kredit > architectural purity

2. **No framework, no SPA, no hydration**
   - Žádný React/Vue/Svelte/Next/Nuxt
   - Žádný runtime hydration
   - Žádný client-side router

3. **Vanilla HTML/CSS/JS, build-light maximálně**
   - esbuild minify OK
   - manifest-driven HTML generation OK
   - žádný bundler/transpiler/CSS-in-JS

### User & privacy

4. **No accounts**
   - Žádný login, žádný signup, žádný "save my calculations"
   - Brand promise = frictionless

5. **No AI interaction model**
   - Žádný chatbot
   - Žádné "AI helper"
   - Žádné LLM API calls
   - Anti-AI je core positioning

6. **Deterministic browser-side calculations**
   - Math běží v JavaScript v browseru
   - Žádné server roundtripy pro calculations
   - Privacy claim "calculations run in your browser" musí zůstat pravdivý

### UX patterns

7. **Input and result in one workspace**
   - Single card s inputs + result
   - Žádný scroll mezi formulářem a výsledkem

8. **Result is the product**
   - Big tabular-num value
   - `role="status"` + `aria-live="polite"` + `aria-atomic="true"`
   - Reserved min-height proti CLS
   - Copy result button always
   - Žádné count-up animace

9. **Methodology below calculator**
   - Formula + worked example + assumptions + rounding + limitations + byline
   - Pod result block, NE nad ním
   - Tiered depth: 300-500 simple / 800-1000 complex

### AdSense safety

10. **No ad between input and result**
    - AdSense Confirmed Click penalty risk
    - Ads jen pod methodology + FAQ + related (simple) nebo po FAQ (complex)

11. **Auto Ads OFF / manual ads only**
    - Auto Ads bypass clearance rules
    - Sticky/anchor/vignette formats forbidden

12. **No sticky mobile ads**
    - Better Ads Standards explicit prohibition
    - Cover focus indicators (WCAG violation)

### Form UX

13. **No custom selects**
    - Native `<select>` only
    - Custom dropdowns fail keyboard, VoiceOver, add weight

14. **No placeholder-only labels**
    - Visible `<label>` above every input
    - Placeholder describes format, label describes purpose

15. **No `type="number"` for money/decimal inputs**
    - GOV.UK 2020 changeover (decimal corruption, scroll bugs)
    - Použít `<input type="text" inputmode="decimal">` + custom parser

### SEO & content

16. **No pSEO city/state/holiday doorway pages**
    - Žádné `/tip-calculator-new-york/` variants
    - Žádné `/sales-tax-calculator-california/`
    - State as input, ne URL variant
    - One canonical per intent

17. **No YMYL tools**
    - Žádné medical/health (BMI, calorie, dosage, blood-alcohol, fertility, mental-health)
    - Žádné legal-binding (tax-filing, child support, alimony, government benefits)
    - Žádné investment prediction (crypto, stock target)
    - Žádné safety-critical (structural load, dosage, electrical wiring)
    - YMYL screen test: "If wrong by 10%, can someone get hurt or lose serious money?" → don't ship

### Deployment safety

18. **Preview branch must not be indexed**
    - `<meta name="robots" content="noindex,nofollow">` na všech v2-rebuild pages (added při implementation, removed při merge to main)
    - **NIKDY** noindex v `_headers` v repu (forget-at-merge risk per GPT)
    - Optional: Cloudflare Access password protection (preferred)

## Aplikace v debate s GPT

Když GPT navrhne cokoliv, co porušuje 1-18: **STOP**. Discuss, refine, get explicit override z Lukase.

### Příklad porušení

| Návrh | Porušuje |
|---|---|
| URL pivot na `/tools/<slug>/` | #1 |
| Use Vue 3 Composition API | #2 |
| Add 'Save my calculation to account' feature | #4 |
| AI assistant for math help | #5 |
| Send inputs to /api/calculate | #6 |
| Place ad immediately after Calculate button | #10 |
| Use `<input type="number">` for the tip percentage | #15 |
| Generate /tip-calculator-NYC/ pages from city data | #16 |
| Add BMI calculator | #17 |
| Add `X-Robots-Tag: noindex` to `_headers` | #18 |

## Aplikace v Claude implementaci

Před každým code commit do v2-rebuild branch, Claude self-check:
- Mění tato change cokoli z 18 pravidel? Pokud ano: STOP, ask Lukas.
- Pokud Lukas říká "udělej X" a X porušuje pravidlo → flag conflict, get explicit decision.

## Why
Bez explicit non-negotiables se v 12-week rebuild project mohou pravidla zerodovat (scope creep, kompromisy, "jen tahle malá výjimka"). 18 pravidel = pevné mantinely.
