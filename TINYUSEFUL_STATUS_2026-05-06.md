# TinyUseful — stav projektu k 6. května 2026

> Briefing pro GPT projekt. Všechno co potřebuješ vědět, abys mi dokázal pomoci.

---

## 1. Co je TinyUseful

**Doména:** https://www.tinyuseful.app
**Tagline:** _"For when you don't need AI — just the answer."_
**Owner:** Lukas Bures, architekt (room411.architects, Praha, Karlín)
**Kontaktní mail:** contact@tinyuseful.app (Cloudflare Email Routing)
**Repo:** github.com/jetotakto/tinyuseful (public)
**Hosting:** Cloudflare Pages (auto-deploy z `main` branch)
**Stack:** vanilla HTML/CSS/JS, žádný framework, žádný build step
**Verze:** v0.7+ (16+ phase commitů, deploy 2026-05-06 = Phase 56)

### Pozicování
- Anti-AI, kontra-trend
- Deterministické kalkulačky, ověřitelné, browser-based
- "Calculations run in your browser. Inputs are not sent to a server."
- Žádné účty, žádný tracking pixel, žádné cookies bez nutnosti, žádné popupy
- Audience: 25–55 let, USA-first, AI-skeptici a digitálně unavení uživatelé

### Monetizace (postupné vrstvy)
1. **Google AdSense** (1 in-content slot) — pending review, ads.txt "Autorizovaný"
2. **Affiliate** (Mortgage/Loan/Compound Interest → lender partnerství) — později
3. **API** (calculation API pro embed jiných webů) — po 25+ tools
4. **Donation** (BuyMeACoffee) — vždy možná
- Cíl: 100k pageviews/měsíc do měsíce 18–24
- Threshold pro Mediavine ($30–50 CPM vs. AdSense $5–10): 50k sessions/month

---

## 2. Co je live (k 2026-05-06)

### 11 nástrojů, každý na vlastní URL

#### §01 Money (8)
| URL | Tool | Pozn. |
|---|---|---|
| `/percentage-calculator/` | Percentage Calculator | **Phase 56 reference** — methodology block live |
| `/sales-tax-calculator/` | Sales Tax Calculator | priority 0.9 |
| `/mortgage-calculator/` | Mortgage Calculator | priority 0.9, FAQPage schema, AdSense focus |
| `/loan-calculator/` | Loan Calculator | |
| `/compound-interest-calculator/` | Compound Interest | |
| `/rent-affordability-calculator/` | Rent Affordability | |
| `/tip-calculator/` | Tip Calculator | |
| `/discount-calculator/` | Discount Calculator | |

#### §02 Conversions (3)
| URL | Tool |
|---|---|
| `/unit-converter/` | length/weight/temperature, 17 jednotek |
| `/date-calculator/` | days between / days from today |
| `/time-zone-converter/` | 8 zón, DST handling |

#### Legal + supporting
- `/privacy.html`
- `/terms.html`
- `/about.html`
- `/404.html` (custom, newspaper-styled)
- `/humans.txt` (anti-AI manifesto)
- `/sitemap.xml` (14 URLs)
- `/robots.txt` (10 AI training crawlers blocked, OAI-SearchBot/Claude-User/PerplexityBot allowed)

### Architektura souborů
```
E:\tinyuseful\
├── index.html              ← homepage (rozcestník)
├── style.css               ← shared stylesheet
├── theme.js                ← dark/light mode toggle
├── /js/helpers.js          ← shared utility (parseLocaleNumber, setOut, attachLiveCalc)
├── /fonts/                 ← Newsreader 5 weights + JetBrains Mono 2 weights (self-hosted)
├── /percentage-calculator/index.html
├── /sales-tax-calculator/index.html
├── ... (další tools)
├── about.html, privacy.html, terms.html, 404.html
├── _headers                ← Cloudflare cache + 4 security headers
├── site.webmanifest        ← PWA manifest
├── og-image04.png          ← Open Graph 1200×630
├── favicon.svg, favicon.ico, apple-touch-icon.png
├── ads.txt                 ← AdSense ownership
└── humans.txt
```

### Design tokeny
- Brand color: red `#C8102E` (knife logo, accent)
- Paper: `#FAF8F2` (light), dark mode auto via `prefers-color-scheme` + manual toggle
- Typografie:
  - **Newsreader serif** = brand (hero h1, card numbers, result big, FAQ summary, masthead wordmark)
  - **Inter sans** = UI text
  - **JetBrains Mono** = labels, breadcrumbs, technical (mono 11px uppercase letterspacing 0.18em)

### Klíčové UX patterny už implementované
- Mobile-first, `body.is-input-mode` compact mode (Phase 54b)
- VisualViewport API pro keyboard-aware mobile
- `<input type="text" inputmode="decimal">` (NE `type="number"` — locale corruption)
- Locale-aware parsing (přijímá `15,5` i `15.5`, prostor jako tisíc-separátor)
- `font-variant-numeric: tabular-nums` na všech result outputs
- `role="status"` + `aria-live="polite"` + `aria-atomic="true"` na `.out`
- `inputmode="decimal"` / `numeric` + `enterkeyhint="next"/"done"`
- Live calc + debounce 80ms (helpers.js `attachLiveCalc`)
- Copy result button na všech 11 tools (`window.copyResultFromButton`)
- Skip link, focus-visible outline, 44+ touch targets
- 16 px font min (iOS no-zoom)
- Cache busting via query strings (`?v=20260506a`)
- 4 security headers (`_headers`): X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- JSON-LD per tool: SoftwareApplication + BreadcrumbList (Mortgage navíc FAQPage)
- ItemList schema na homepage

### Co NEděláme (anti-mission)
- Žádný framework (React/Vue/Svelte), žádný SPA, žádný build step
- Žádné AI nástroje (chat, summarize, rewrite, email writer)
- Žádné account creation
- Žádný tracking pixel (GA, FB Pixel, Hotjar, atd.)
- Žádné popupy, exit intent, cookie modal blocking calculator
- Žádné placeholder-only labels
- Žádné `<input type="number">` pro currency
- Žádné thin programmatic pages ("Tip Calculator pro [město]")
- Žádné sticky mobile ads
- Žádné `maximum-scale=1` v viewport meta
- Žádné externí JS knihovny (Google Fonts CDN výjimka — self-hosted)

---

## 3. Co se udělalo (chronologicky)

### Phase 1–11 (2026-04-25 → 2026-05-02): Foundation
- Phase 1: homepage rozcestník + extract `/style.css`
- Phase 2–3: split tools do per-tool URLs (8 Money + 3 Conversions)
- Phase 4: `sitemap.xml` se 14 URLs
- Phase 5–6: OG image (newspaper masthead, 1200×630), titles 50–60 char
- Phase 7: favicon (red knife SVG), `/humans.txt`, custom `/404.html`
- Phase 8: nuanced AI bot policy v `robots.txt`
- Phase 9: a11y fixes (h2→h1, role="status", :focus-visible)
- Phase 10: brand claim cleanup (drop "no tracking" absolute claim)
- Phase 11: self-host fonts, žádný Google Fonts CDN

### Phase 12–16 (2026-05-02 → 2026-05-03): Polish
- Phase 12: SEO polish, ItemList schema, kontrast WCAG AA
- Phase 13: hybrid typography (Newsreader/Inter/JetBrains Mono), dark mode + manual toggle
- Phase 14: design polish, contact email zaslepený
- Phase 15: hero h1 zmenšen, Unicode symboly per tool
- Phase 16: borders cleanup, full-width Calculate button

### Phase 50–55 (2026-05-04): Production sprint
- Phase 50: `parseLocaleNumber(raw)` helpers.js — accepts decimal comma + spaces
- Phase 52: `setOut(id, label, big, breakdown)` DOM API based, Copy button auto-append
- Phase 53a: Copy result clipboard pattern
- Phase 51: `attachLiveCalc(selector, fn, wait=80)` debounced
- Phase 51b: NaN guard
- Phase manifest: site.webmanifest brand colors

### Phase 54b (2026-05-04): Mobile keyboard sprint
- Numeric keyboard: 24 inputs converted from `type="number"` to `type="text" inputmode="decimal"`
- VisualViewport API: focusin handler scrolls `.out` into view 300ms after focus
- Compact mode: `body.is-input-mode` triggers mobile-only CSS (hides `.tool-meta`, `.section-head .desc`)

### Phase 55 (2026-05-04): Cache + manifest
- Cache busting infrastruktura
- `_headers` 4 security headers
- 4xx investigation: 22.38% rate → diagnosis Romania bot spike → Bot Fight Mode enabled

### Apex redirect fix (2026-05-05)
- Cloudflare Page Rule: `tinyuseful.app/*` → `https://www.tinyuseful.app/$1` 301
- GSC HTTPS coverage validation pending

### Cloudflare Bot Fight Mode (2026-05-05)
- Enabled po browser audit (0 broken assets confirmed via Claude in Chrome MCP)
- 24h validation pending

### Phase 56 (2026-05-06) ← NEJNOVĚJŠÍ
- **Methodology trust block na Percentage Calculator**
- Native `<details class="methodology">` mezi explainer a FAQ
- Obsah: Assumptions / Rounding / Privacy / Byline ("Built and maintained by Lukáš, an architect in Prague. Last updated May 2026.")
- Privacy wording: "This calculation runs in your browser. The numbers you enter here are not sent to a server."
- Reusable `.methodology` CSS class pro Phase 58 batch rollout
- Commit `9d683f0`, +93/-1
- Žádný JS, žádná změna calc logic, žádný URL change

---

## 4. Co tomu předcházelo: 4 kola UX/UI iterace (2026-05-06)

Lukas si nechal 3 deep research dokumenty od různých AI:
- **GPT** UX/UI blueprint (633 řádků)
- **Gemini** UI/UX blueprint (453 řádků)
- **Claude** UX/UI Build Manual (1175 řádků, ~13.5k slov)

Pak jsme provedli 4 iterativní kola syntézy mezi GPT, Gemini a Claude.

### Verdikt po 4 kolech: **ÚPRAVA + DOPLNĚNÍ. NE rebuild. NE start od nuly.**

### Konsenzus všech 3 zdrojů
1. Žádný framework
2. `<input type="text" inputmode="decimal">` (ne `type="number"`)
3. Native `<select>`, `<details>`
4. Static top-aligned labels (ne floating)
5. `role="status"` + `aria-live="polite"` na result region
6. Methodology block: formula + worked example + assumptions + byline
7. Locale-aware parsing
8. AdSense: 1 slot lazy load, ≥50px od buttons, min-height reserved
9. Performance: LCP <2s, INP <200ms, CLS <0.05
10. WCAG 2.2 AA

### Co odmítnuto
- Kompletní rebuild
- URL pivot na `/tool/{slug}` (ZRUŠENO natrvalo — zachováme `/percentage-calculator/` atd.)
- Service worker brzy
- Search bar nyní (<10 tools)
- Categories nyní (flat list správná IA pro 11 tools)
- AI chatbot, account creation, sticky mobile ads, floating labels

---

## 5. Phase 56–61 roadmap

| Phase | Co | Status | Effort |
|---|---|---|---|
| **56** | Methodology block na Percentage Calc (reference) | ✅ DONE 2026-05-06 | 1 commit |
| **57** | About + Changelog + Privacy wording cleanup + verify contact email | pending | 1–2 commity |
| **58** | Methodology rollout: Tip, Discount, Sales Tax, Rent Affordability, Date Calculator | pending | 2 commity |
| **59** | Methodology na finance tools (Mortgage, Loan, Compound Interest, Unit Converter, Time Zone) | pending | 1–2 commity |
| **60** | AdSense lazy load + reserved min-height + ad placement audit (≥50px od buttons) | pending | 1 commit |
| **61** | JSON-LD structured data (WebApplication, FAQPage where real, BreadcrumbList) | pending | 1 commit |

### Phase 57 spec (next)
- **About page:** civil byline ("Built by Lukáš, an architect in Prague, after watching friends jump between slow, cluttered calculator sites."), real contact email, no big credentials
- **Changelog page:** `/changelog.html`, public history v0.1 → v0.7, datovaný, version-tagged
- **Privacy wording:** vyhnout se "no tracking" / "100% private"; použít přesné formulace ("We do not require an account. We do not save your inputs. Ads and analytics may use cookies where applicable.")
- **Footer trust links:** verify About/Privacy/Terms/Changelog viditelné

### Phase 58 spec (per-tool methodology variace)
- Tip: "Tip is calculated on pre-tax bill total. If your locale tips on tax-included totals, multiply your bill before entering."
- Sales Tax: "Tax rate is applied to the net amount. Reverse calculation: net = gross ÷ (1 + rate)."
- Discount: "Discount is applied to the original price. Reverse: original = final ÷ (1 − rate)."
- Date Calculator: "Days are calculated as inclusive/exclusive of start/end. Leap years handled automatically."

### Po Phase 61 (rozhodovací bod)
- Pokud GSC traffic >300/day při 30 dnech → pokračovat single-page
- Pokud AdSense rejected → reread research, redesign trust
- Pokud 12+ tools potřeba → zvážit search bar (NE URL pivot)

### Defer post-AdSense (FUTURE)
- Dark mode toggle UI (aktuálně už máme `theme.js` toggle, ale auto-only via `prefers-color-scheme` by bylo cleaner)
- Recently-used localStorage (opt-in, "Clear" button, disclose v privacy)
- Service worker (po 25+ tools, 6+ months stable URLs)
- Categories block (po 25+ tools)
- Long-form `/methodology/{slug}` URLs (po 15+ tools)

---

## 6. Aktuální blokátory / pending items

### Externí
- **AdSense review** — pending od konce dubna 2026, ads.txt "Autorizovaný" verified, čekáme na rozhodnutí
- **GSC HTTPS apex redirect re-validation** — 1–3 dny po Page Rule deploy
- **Bot Fight Mode 24h validation** — screenshot tomorrow morning

### Interní pravidelné checkpointy
- **Day 7 GSC checkpoint:** 2026-05-13, target 50+ impressions
- **Day 30 GSC decision point:** 2026-06-06, threshold:
  - <300 impr/day = problém, redesign trust
  - 300–1k impr/day = healthy growth
  - 1k–5k impr/day = strong, accelerate content
  - 5k+ impr/day = AdSense Mediavine prep

### Forecast v1 (LOCKED)
GSC > Cloudflare pro forecasting (Cloudflare zahrnuje boty).
Konzervativní prognóza po GPT calibration:
- Měsíc 1: 300–800 reálných návštěv/den
- Měsíc 6: 1k–5k/den (realistic)
- 1M/týden NENÍ achievable z TinyUseful samotného (vyžaduje horizontální expanzi)

---

## 7. Klíčové principy pro budoucí rozhodování

### Co je flexibilní (může se měnit)
- Design (barvy, typografie, layout, spacing)
- Obsah (copy v hero, descriptions)
- Které nástroje a v jakém pořadí
- Struktura sekcí

### Co je STÁLÉ (neměnit bez explicitního schválení)
1. **Anti-AI pozicování** — nepřidávat AI nástroje (rewrite, email writer, summarize)
2. **AdSense-friendly architektura** — žádné cookies, popupy, email gates, tracking pixely
3. **Single-page → tool URLs** — nikdy nemigrovat na `/tool/{slug}` (GSC kredit by se ztratil)
4. **Vanilla JS** — žádné frameworky
5. **Privacy-first claims** — "Calculations run in your browser" je deterministicky pravdivé
6. **Per-commit explicit approval** — žádný blanket consent, Lukas schvaluje každý commit

### Workflow s asistentem
1. Pochop zadání (zeptat se, pokud nejasné)
2. Přečíst relevantní soubory
3. Připravit řešení
4. Ukázat diff / preview
5. **POČKAT** na explicitní souhlas ("ok", "commitni", "pojď na to")
6. Teprve potom git commit + push
7. Po pushi: 30–60s na Cloudflare deploy, verify přes GET https://www.tinyuseful.app
8. Vrátit shrnutí s linkem na live verzi

---

## 8. Mimořádně důležité technické fakty

### Helpers.js shared utility
```javascript
window.parseLocaleNumber(raw)              // decimal comma + space-thousand
window.setOut(id, label, big, breakdown)   // DOM-based result render + Copy button
window.copyResultFromButton(btn)            // clipboard API
window.attachLiveCalc(selector, fn, wait=80) // debounced live calc
// + focusin/focusout listeners pro body.is-input-mode
// + click event delegation pro [data-copy-result]
```

### CSS struktura
- CSS custom properties na `:root` a `:root[data-theme="dark"]`
- `--ink`, `--paper`, `--rule`, `--rule-soft`, `--red`, `--font-brand`, `--font-ui`, `--font-mono`
- Component patterns: `.tool-form`, `.out`, `.section-head`, `.tool-meta`, `.explainer`, `.faq`, `.methodology` (nový), `.related`, `.ad-block`, `.placeholder`
- Utility: `.visually-hidden` (skip link)

### Per-tool kontext k Phase 58 rolloutu
Při přidávání methodology na další tool:
1. Cache bust jen `style.css?v=20260506a` (CSS class už v style.css existuje)
2. helpers.js NETKNOUT
3. Vložit `<section class="methodology">` MEZI explainer a FAQ
4. Per-tool přizpůsobit JEN obsah `<h4>Assumptions</h4>` — zbytek univerzální
5. ŽÁDNÝ JS, ŽÁDNÝ URL change, ŽÁDNÁ změna calc logic

---

## 9. Co očekávám od GPT projektu

### Pro co se obracím na GPT
- Druhá oponentní řada na můj asistent návrh
- SEO copy review (titles ≤60, descriptions ≤160)
- Methodology obsah per-tool (assumptions wording, edge cases)
- Roadmap critique (co jsem zapomněl, co je redundant)
- Forecast calibration (GSC trends interpretation)
- Article drafts pro `/blog/` (cíl: 12 článků k Mediavine)

### Pro co GPT NEpotřebuju
- Code generation (asistent dělá přímou práci)
- File editing (jen text návrhy, asistent edituje)
- AdSense policy interpretation (Google docs jsou autoritativní)

---

## 10. Quick reference: kde co je

| Co | Kde |
|---|---|
| Repo | github.com/jetotakto/tinyuseful |
| Live | https://www.tinyuseful.app |
| Apex redirect | tinyuseful.app → www.tinyuseful.app (Cloudflare Page Rule) |
| Hosting | Cloudflare Pages, auto-deploy z `main` |
| Doména registrátor | Porkbun |
| DNS | Cloudflare (free plan) |
| Email | Cloudflare Email Routing → contact@tinyuseful.app |
| Lokální složka | `E:\tinyuseful` (Windows) |
| Tokens | `E:\tokeny.txt` (mimo repo) |
| GSC property | "Doména" (apex + www + subdomény), DNS TXT verification |
| AdSense Publisher ID | ca-pub-5316081427597729 |
| Forecast LOCKED | GSC > Cloudflare; konzervativně 300–800/day month 1 |

---

**Konec briefingu. Datum: 2026-05-06. Verze v0.7+ (Phase 56 LIVE).**

Pokud máš otázku, postupuj podle workflow (zeptat se → návrh → diff → commit po souhlasu).
