> **ARCHIVED 2026-05-15** — pre-rollout planning document, kept for context.
> Current state: v2 hf system deployed (homepage + 11/11 tools).
> See [TINYUSEFUL_STATUS_2026-05-15.md](../TINYUSEFUL_STATUS_2026-05-15.md).

# TinyUseful — kompletní stav projektu pro Claude Cowork handoff

**Datum:** 2026-05-07 (čtvrtek), ~10:30 CEST
**Verze:** v0.7+ (Phase 57 LIVE)
**Audience:** Claude Cowork (a budoucí AI/lidský spolupracovník)

> Tento dokument popisuje **celou cestu** projektu TinyUseful, **co je hotovo**, **co se vymyslelo**, **co se opravilo**, a **plán dalších kroků**. Po jeho přečtení by Claude Cowork měl být schopný plynule pokračovat tam, kde jsme skončili.

---

## 1. Základní fakta

### Projekt
- **Doména:** https://www.tinyuseful.app
- **Tagline:** _"For when you don't need AI — just the answer."_
- **Owner:** Lukas Bures, architekt (CKA 04891), room411.architects, Praha-Karlín
- **Repo:** github.com/jetotakto/tinyuseful (public)
- **Hosting:** Cloudflare Pages (auto-deploy z `main` branch)
- **Doména registrátor:** Porkbun
- **DNS:** Cloudflare (free plan)
- **Email:** Cloudflare Email Routing → `contact@tinyuseful.app`
- **Lokální složka (Windows):** `E:\tinyuseful`
- **Tokens (mimo repo):** `E:\tokeny.txt`

### Stack
- **Frontend:** vanilla HTML / CSS / JS (žádný framework, žádný build step)
- **Fonts:** self-hosted (Newsreader serif + Inter sans + JetBrains Mono)
- **Hosting:** Cloudflare Pages s Bot Fight Mode aktivním
- **Analytics:** Cloudflare Web Analytics (cookieless)
- **Search Console:** Google Search Console (Doména property, ověřeno DNS TXT)

### Pozicování
- **Anti-AI**, kontra-trend
- **Deterministické kalkulačky**, ověřitelné, browser-based
- **Žádné účty**, žádné popupy, žádné email gates
- **Audience:** 25–55 let, USA-first, AI-skeptici a digitálně unavení uživatelé

### Monetizace (v pořadí podle časové osy)
1. **Google AdSense** (1 in-content slot) — pending review (Auto Ads OFF od 2026-05-07)
2. **Affiliate** (Mortgage/Loan/Compound Interest → lender partnerství) — později
3. **API** (calculation API pro embed) — po 25+ tools
4. **Donation** (BuyMeACoffee) — vždy možná
- **Cíl:** 100k pageviews/měsíc do měsíce 18–24, threshold pro Mediavine ($30–50 CPM)

### AdSense status (2026-05-07 ráno)
| Co | Stav |
|---|---|
| Site | tinyuseful.app |
| Stav schválení | **Příprava** (PENDING review, 5 dní) |
| ads.txt | Autorizovaný ✅ |
| Auto Ads | **OFF** (změněno 2026-05-07 ~10:00 CEST) |
| Publisher ID | ca-pub-5316081427597729 |

---

## 2. Co je live — kompletní inventář

### 11 nástrojů (každý na vlastní URL)

#### §01 Money (8 tools)
| URL | Tool | Pozn. |
|---|---|---|
| `/percentage-calculator/` | Percentage Calculator | **Phase 56 reference**, methodology block live |
| `/sales-tax-calculator/` | Sales Tax Calculator | priority 0.9 |
| `/mortgage-calculator/` | Mortgage Calculator | priority 0.9, FAQPage schema, AdSense focus |
| `/loan-calculator/` | Loan Calculator | |
| `/compound-interest-calculator/` | Compound Interest | |
| `/rent-affordability-calculator/` | Rent Affordability | |
| `/tip-calculator/` | Tip Calculator | |
| `/discount-calculator/` | Discount Calculator | |

#### §02 Conversions (3 tools)
| URL | Tool |
|---|---|
| `/unit-converter/` | length/weight/temperature, 17 jednotek |
| `/date-calculator/` | days between / days from today |
| `/time-zone-converter/` | 8 zón, DST handling |

#### Trust + supporting pages
- `/about.html` — civil byline, contact, GitHub link, JSON-LD AboutPage+Organization
- `/changelog.html` — **NOVÝ Phase 57**, public history, 6 user-facing entries
- `/privacy.html` — privacy policy
- `/terms.html` — terms of service
- `/404.html` — custom newspaper-styled
- `/humans.txt` — anti-AI manifesto

### Repo file struktura
```
E:\tinyuseful\
├── index.html              ← homepage (rozcestník)
├── style.css               ← shared stylesheet
├── theme.js                ← dark/light mode toggle
├── /js/helpers.js          ← shared utility (parseLocaleNumber, setOut, attachLiveCalc)
├── /fonts/                 ← Newsreader 5 weights + JetBrains Mono 2 weights + Inter
├── /percentage-calculator/index.html
├── /sales-tax-calculator/index.html
├── ... (celkem 11 tool indexů)
├── about.html, changelog.html, privacy.html, terms.html, 404.html
├── _headers                ← Cloudflare cache + 4 security headers
├── _run_commit.bat         ← commit helper (Lukas tier "click")
├── _commit.ps1             ← PS commit script
├── site.webmanifest        ← PWA manifest
├── og-image04.png          ← Open Graph 1200×630
├── favicon.svg, favicon.ico, apple-touch-icon.png
├── ads.txt                 ← AdSense ownership
├── humans.txt
├── robots.txt
└── sitemap.xml
```

### Sdílená helpers.js API
```javascript
window.parseLocaleNumber(raw)              // decimal comma + space-thousand parse
window.setOut(id, label, big, breakdown)   // DOM-based result render + auto-Copy button + NaN guard
window.copyResultFromButton(btn)            // clipboard API
window.attachLiveCalc(selector, fn, wait=80) // debounced live calc
// + focusin/focusout listeners pro body.is-input-mode (mobile keyboard compact)
// + click event delegation pro [data-copy-result]
```

### Design tokeny
- **Brand color:** red `#C8102E` (knife logo, accent)
- **Paper:** `#FAF8F2` (light), dark mode auto via `prefers-color-scheme` + manual toggle
- **Typografie:**
  - **Newsreader serif** = brand (hero h1, card numbers, result big, FAQ summary, masthead wordmark)
  - **Inter sans** = UI text
  - **JetBrains Mono** = labels, breadcrumbs, technical (mono 11px uppercase letterspacing 0.18em)

### Klíčové UX patterny implementované
- Mobile-first, `body.is-input-mode` compact mode (Phase 54b)
- VisualViewport API pro keyboard-aware mobile
- `<input type="text" inputmode="decimal">` (NE `type="number"` — locale corruption)
- Locale-aware parsing (přijímá `15,5` i `15.5`, prostor jako tisíc-separátor)
- `font-variant-numeric: tabular-nums` na všech result outputs
- `role="status"` + `aria-live="polite"` + `aria-atomic="true"` na `.out`
- `inputmode="decimal"` / `numeric` + `enterkeyhint="next"/"done"`
- Live calc + debounce 80ms (helpers.js `attachLiveCalc`)
- Copy result button na všech 11 tools
- `<main id="main">` landmark + skip link (Percentage Calc + about + privacy + changelog)
- Heading hierarchy h1 → h2 → h3 (Percentage Calc)
- Methodology `<details>` block (Percentage Calc)
- 16 px font min (iOS no-zoom)
- Cache busting via query strings (`?v=20260507a`)
- 4 security headers (`_headers`): X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- JSON-LD per tool: SoftwareApplication + BreadcrumbList (Mortgage navíc FAQPage)
- ItemList schema na homepage

### Co NEděláme (anti-mission)
- Žádný framework (React/Vue/Svelte), žádný SPA, žádný build step
- Žádné AI nástroje (chat, summarize, rewrite, email writer)
- Žádné account creation
- Žádný tracking pixel (GA, FB Pixel, Hotjar)
- Žádné popupy, exit intent, cookie modal blocking calculator
- Žádné placeholder-only labels
- Žádné `<input type="number">` pro currency
- Žádné thin programmatic pages ("Tip Calculator pro [město]")
- Žádné sticky mobile ads
- Žádné `maximum-scale=1` v viewport meta
- Žádné externí JS knihovny (Google Fonts CDN výjimka — vše self-hosted)
- Žádné claims "no tracking" / "100% private" (vyhnout overclaim)

---

## 3. Celá cesta — chronologický přehled

### Fáze 0: Foundation (duben 2026)
- Projekt založen Lukášem
- Single-page web s 11 tools
- Vanilla HTML/CSS/JS
- AdSense pending od 2. května 2026
- GSC verified 2026-05-02

### Phase 1–11 (2026-04-25 → 2026-05-02): SEO refactor sprint
- **Phase 1:** homepage refactor na rozcestník + extract `/style.css`
- **Phase 2–3:** split tools do per-tool URLs (8 Money + 3 Conversions)
- **Phase 4:** `sitemap.xml` se 14 URLs
- **Phase 5–6:** OG image (newspaper masthead, 1200×630), titles 50–60 char
- **Phase 7:** favicon (red knife SVG), `/humans.txt`, custom `/404.html`
- **Phase 8:** nuanced AI bot policy v `robots.txt` (allow OAI-SearchBot/Claude-User/PerplexityBot, block GPTBot/ClaudeBot/Google-Extended)
- **Phase 9:** a11y fixes (h2→h1, role="status", :focus-visible)
- **Phase 10:** brand claim cleanup (drop "no tracking" absolute claim)
- **Phase 11:** self-host fonts, žádný Google Fonts CDN

### Phase 12–16 (2026-05-02 → 2026-05-03): Polish sprint
- **Phase 12:** SEO polish, ItemList schema, kontrast WCAG AA
- **Phase 13:** hybrid typography (Newsreader/Inter/JetBrains Mono), dark mode + manual toggle
- **Phase 14:** design polish, contact email zaslepený (Cloudflare Email Routing)
- **Phase 15:** hero h1 zmenšen, Unicode symboly per tool
- **Phase 16:** borders cleanup, full-width Calculate button

### Phase 50–55 (2026-05-04): Production sprint (helpers.js architektura)
- **Phase 50:** `parseLocaleNumber(raw)` helpers.js — accepts decimal comma + spaces
- **Phase 52:** `setOut(id, label, big, breakdown)` DOM API based, Copy button auto-append
- **Phase 53a:** Copy result clipboard pattern
- **Phase 51:** `attachLiveCalc(selector, fn, wait=80)` debounced
- **Phase 51b:** NaN guard
- **Phase manifest:** site.webmanifest brand colors

### Phase 54b (2026-05-04): Mobile keyboard sprint
- Numeric keyboard: 24 inputs converted from `type="number"` to `type="text" inputmode="decimal"`
- VisualViewport API: focusin handler scrolls `.out` into view 300ms after focus
- Compact mode: `body.is-input-mode` triggers mobile-only CSS

### Phase 55 (2026-05-04): Cache + manifest hardening
- Cache busting infrastruktura
- `_headers` 4 security headers
- 4xx investigation: 22.38% rate → diagnóza Romania bot spike

### Apex redirect fix (2026-05-05)
- Cloudflare Page Rule: `tinyuseful.app/*` → `https://www.tinyuseful.app/$1` 301
- GSC HTTPS coverage validation

### Cloudflare Bot Fight Mode (2026-05-05)
- Enabled po browser audit (0 broken assets confirmed)
- 4xx rate 22% → ~5% (Romania bot blocked)

### UX/UI deep research (2026-05-06)
Lukas si nechal vypracovat 3 deep research dokumenty:
- **GPT** UX/UI blueprint (633 řádků)
- **Gemini** UI/UX blueprint (453 řádků)
- **Claude** UX/UI Build Manual (1175 řádků, ~13.5k slov)

Pak proběhly **4 iterativní kola syntézy** mezi GPT, Gemini a Claude.

**Verdikt po 4 kolech: ÚPRAVA + DOPLNĚNÍ. NE rebuild. NE start od nuly.**

#### Konsenzus všech 3 zdrojů
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

#### Co odmítnuto
- Kompletní rebuild
- URL pivot na `/tool/{slug}` (zachováme `/percentage-calculator/` atd. — GSC kredit by se ztratil)
- Service worker brzy
- Search bar nyní (<10 tools)
- Categories nyní (flat list správná IA pro 11 tools)
- AI chatbot, account creation, sticky mobile ads, floating labels

### Phase 56 (2026-05-06): Methodology trust block
- **Reference tool:** Percentage Calculator
- Native `<details class="methodology">` mezi explainer a FAQ
- Obsah: Assumptions / Rounding / Privacy / Byline
- Privacy wording: _"This calculation runs in your browser. The numbers you enter here are not sent to a server."_
- Byline: _"Built and maintained by Lukáš, an architect in Prague. Last updated May 2026."_
- Reusable `.methodology` CSS class pro Phase 58 batch rollout
- Commit `9d683f0`

### Phase 56b (2026-05-07 ~09:30 CEST): a11y + heading + robots
- `<main id="main">` landmark + skip link na Percentage Calc
- Heading hierarchy: 8× page-level `<h3>` → `<h2>`, 3× methodology `<h4>` → `<h3>`
- CSS dual selectors (`h2, h3`) na `.explainer/.faq/.related/.methodology/.tool-meta` — visual styling identický, prep pro Phase 58 batch
- robots.txt: odstraněn duplicate `User-agent: *` block (Cloudflare AI Audit už injektuje vlastní)
- Cache bust → `style.css?v=20260506b`
- helpers.js NETKNUT (žádný defer)

### Phase 57 (2026-05-07 ~09:50 CEST): Trust pages cleanup
- **Nový soubor:** `/changelog.html` — public history, 6 user-facing entries (May 2026 × 5 + April 2026 launch)
- Homepage manifest "What we sell" wording: _"No fingerprinting, no email gates, no popups"_ + _"Ads and related services may use cookies where applicable"_ (vyhnutí "no tracking" overclaim)
- Percentage Calc lede: _"no account, no tracking"_ → _"no account required"_
- About: cache bust, `<main>` + skip link, wording soften
- Privacy: cache bust, `<main>` + skip link
- Footer Changelog link na homepage, About, Privacy, Percentage Calc
- Sitemap update (přidán changelog)

### Auto Ads OFF (2026-05-07 ~10:00 CEST)
- Lukas vypnul Auto Ads v AdSense dashboardu
- Důvod: Performance regrese (PSI 62, TBT 3 610 ms) způsobená AdSense + FundingChoices CMP overhead bez real ads
- Riziko: low (Auto Ads ON/OFF je standardní publisher setting, ne kódová změna)

---

## 4. Co se vymyslelo / opravilo / naučilo

### Klíčové insighty cesty

#### 1. Vanilla JS funguje
Žádný framework. 11 nástrojů, každý ~3 KB minified JS. Helpers.js shared utility eliminuje duplicate code. Dotek `defer` atributu na helpers.js je RISK — inline page scripty závisí na `parseLocaleNumber`, `setOut`, `attachLiveCalc`. Phase 56b záměrně NEDEFEROVAL.

#### 2. Locale-aware parsing je nutnost
`<input type="number">` korumpuje decimal comma na non-US locales. **Vždy** `<input type="text" inputmode="decimal">` + custom parser.

#### 3. Methodology jako trust feature
Explicit formulas + worked examples + assumptions + byline = E-E-A-T signal pro Google + důvěra pro uživatele. Nesmí být _duplicate_ existujícího content (anti-pattern).

#### 4. AdSense Auto Ads bez schválení = pure overhead
PSI 96 → 62 regrese způsobená Auto Ads + FundingChoices CMP, **i bez real ad fill**. Po Auto Ads OFF: PSI 98, TBT 3 610 → 90 ms. **Lekce:** během PENDING review nemít Auto Ads ON, pokud nezískáme přínos.

#### 5. Cloudflare AI Audit injektuje robots.txt content
Cloudflare při delivery prependuje vlastní block s `Content-Signal` directive (nestandardní, Lighthouse flag). My to nemůžeme ovlivnit ze repo. SEO 92 cap je odsud.

#### 6. URL strategy: NIKDY pivot
`tinyuseful.app/percentage-calculator/` je už indexované. Pivot na `/tool/{slug}` by zahodil GSC kredit. **Zachováme současné URLs natrvalo.**

#### 7. Privacy wording opatrnost
- ❌ "No tracking" / "100% private" / "Nothing is ever sent" / "We collect no data" (overclaim při běžícím AdSense)
- ✅ "No fingerprinting" / "No email gates" / "We do not require an account" / "Calculator inputs are not saved by TinyUseful" / "Ads and related services may use cookies where applicable"

#### 8. Forecast v1 (LOCKED)
GSC > Cloudflare pro forecasting (Cloudflare zahrnuje boty). Konzervativní:
- Měsíc 1: 300–800 reálných návštěv/den
- Měsíc 6: 1k–5k/den (realistic)
- 1M/týden NENÍ achievable z TinyUseful samotného

#### 9. Phase scoping disciplína
- **Phase 56:** 1 tool (Percentage), 1 commit, methodology only
- **Phase 56b:** 1 tool (Percentage), 1 commit, a11y only
- **Phase 57:** 5 souborů + 1 nový, 1 commit, trust only
- **Phase 58 (TODO):** 10 tools batch
- Žádný "all 11 tools at once" risky commit

#### 10. Time zone awareness
Lukas v Praze (Europe/Prague CEST/CET). Před tvrzením o čase **vždy** ověřit přes bash: `TZ='Europe/Prague' date '+%Y-%m-%d %H:%M:%S %Z (%A)'`. Sandbox bash defaultně UTC.

### Opravy bugů v cestě
- **Cache stale CSS:** Phase 54+55 vyžadoval cache bust query strings (b → c → d → e), pak 20260506a/b, pak 20260507a
- **scrollIntoView overshoot:** Phase 54b první verze s `block: 'center'` skryla inputy; final fix: žádný scrollIntoView, native browser auto-scroll
- **Forecast over-optimism:** Lukas správně rejekt mé 5–15k/den prognózy, GPT calibration accepted (300–800/day reálné)
- **Audit folder confusion:** PowerShell `_make_audit` skript měl encoding issues (`!` a `→`); rewrote bez problematických znaků
- **Bot Fight Mode timing:** sequencing — nejdřív verify no broken assets via Claude in Chrome, pak enable
- **`/privacy` vs `/privacy.html` confusion:** Cloudflare Pages servuje obě URLs; canonical tag ukazuje na `.html`; Google to chápe (proto je `/privacy` v "Crawled – currently not indexed" status, ne v "Alternate page" — to je různá kategorie)
- **Robots.txt duplicate `User-agent: *`:** Cloudflare AI Audit injektuje vlastní block; my odstranili náš duplikát v Phase 56b

### Externí service integrations
- **AdSense:** ca-pub-5316081427597729, ads.txt autorizovaný, Auto Ads OFF od 2026-05-07
- **Google Search Console:** Doména property, DNS TXT verified
- **Cloudflare:** Pages auto-deploy, Bot Fight Mode ON, Email Routing, AI Audit injekce robots
- **GitHub:** jetotakto/tinyuseful (public repo)
- **Cloudflare Web Analytics:** cookieless, real-user data

---

## 5. Současný stav metrik (2026-05-07 10:15 CEST)

### PSI mobile Percentage Calculator (po Phase 57 + Auto Ads OFF)
| Metrika | Hodnota | Verdikt |
|---|---|---|
| **Performance** | **98** | ✅ best ever |
| **Accessibility** | 96 | ⚠️ −4 (Phase 57 footer touch targets) |
| **Best Practices** | 100 | ✅ |
| **SEO** | 92 | ⚠️ Cloudflare Content-Signal (uncontrollable) |
| LCP | 2,3 s | ✅ |
| FCP | 1,7 s | ✅ |
| **TBT** | **90 ms** | ✅ z 3 610 ms = 98% snížení |
| CLS | 0,002 | ✅ |
| Speed Index | 1,8 s | ✅ |

### GSC (2026-05-04 latest)
- **17 indexovaných** stránek (zelená)
- **6 neindexováno** (apex variants → správně canonical k www; privacy variant → expected)
- 38 impressions / 0 clicks za 3 měsíce
- Average position 34.1 (z 50+ trend nahoru)
- Top dotazy: discount calculator, restaurant tip calculator, 60 off calculator, percentage queries

### Cloudflare HTTP Traffic (24h před Auto Ads OFF)
- 898 requests, 113 cached / 785 uncached
- 118 unique visitors (peak 14/h)
- Top countries: USA 175, Netherlands 152, CZ 89, Romania 44, Singapore 28
- 4xx rate stable po Bot Fight Mode

---

## 6. Plán dalších kroků

### Phase 56–61 roadmap (post-Phase 57)

| Phase | Co | Status | Effort |
|---|---|---|---|
| 56 | Methodology block na Percentage Calc | ✅ DONE 2026-05-06 | 1 commit |
| 56b | a11y main+skip+heading hierarchy + robots cleanup | ✅ DONE 2026-05-07 | 1 commit |
| 57 | Changelog + trust wording cleanup | ✅ DONE 2026-05-07 | 1 commit |
| **58** | **Methodology + a11y batch rollout na 10 tools** | ⏳ NEXT | 1–2 commity |
| 59a | AdSense lazy load | ⏸ DEFERRED čeká AdSense approval | 1 commit |
| 60 | JSON-LD structured data (FAQPage, BreadcrumbList) | pending | 1 commit |
| 61 | Performance + accessibility polish | pending | 1 commit |
| ~~URL pivot na /tool/{slug}~~ | **ZRUŠENO natrvalo** | — | — |

### Phase 58 spec (next priority)

**Cíl:** rollout Phase 56 (methodology) + Phase 56b (a11y) + Phase 57 (footer Changelog link) na zbývajících 10 tools.

**Files affected (10 tool indexů):**
- tip-calculator, discount-calculator, sales-tax-calculator, loan-calculator, mortgage-calculator
- compound-interest-calculator, rent-affordability-calculator
- unit-converter, date-calculator, time-zone-converter

**Per-tool changes:**
1. Cache bust `style.css?v=20260507a` (nebo nová verze)
2. `<div class="page">` → `<main id="main" class="page">`
3. Add skip link `<a class="skip-link" href="#main">Skip to main content</a>`
4. Heading hierarchy: 8× page-level `<h3>` → `<h2>`, methodology `<h4>` → `<h3>`
5. Add `<section class="methodology">` block (per-tool přizpůsobit jen `<h3>Assumptions</h3>` content; Privacy + Byline univerzální)
6. Footer add Changelog link
7. Lede wording check: pokud "no tracking" → "no account required"
8. helpers.js NETKNOUT

**Bonus a11y fix v Phase 58:**
- CSS úprava `.colophon a, .colophon button` touch target padding/spacing
- Vrátit a11y na 100 (regrese po Phase 57 Changelog link)

**Per-tool methodology Assumptions text (drafty):**
- **Tip:** "Tip is calculated on pre-tax bill total. If your locale tips on tax-included totals, multiply your bill before entering."
- **Sales Tax:** "Tax rate is applied to the net amount. Reverse calculation: net = gross ÷ (1 + rate)."
- **Discount:** "Discount is applied to the original price. Reverse: original = final ÷ (1 − rate)."
- **Date Calculator:** "Days are calculated as inclusive/exclusive of start/end. Leap years handled automatically."
- **Mortgage:** "Standard amortization formula. APR not included; check with lender for full APR including fees."
- **Loan:** podobně
- **Compound Interest:** "Compounding frequency must match contribution frequency for accurate result."
- **Rent Affordability:** "30%-rule baseline; adjust for personal debts."
- **Unit Converter:** "All conversions use SI standard reference values."
- **Time Zone Converter:** "Daylight saving rules from IANA tzdata."

### Phase 59a (DEFERRED — čeká AdSense approval)

**Trigger pro znovu-otevření:**
- AdSense status: Příprava → Připraveno (APPROVED)
- nebo: Příprava → Vyžaduje vaši pozornost (něco potřeba opravit)
- 14 dní v Příprava bez změny = support contact

**Plánovaný scope po approval:**
- Lazy-load `<script async src="...adsbygoogle.js">` z `<head>` na konec `<body>` nebo trigger po user interaction
- Min-height reservation `.ad-block` proti CLS
- Ad placement audit (≥50 px od primary buttons)
- Reserved height ad slots na všech tool indexech

### Phase 60 (JSON-LD structured data)
- WebApplication schema na všech tools
- FAQPage schema kde má tool reálné FAQ
- BreadcrumbList připravený na multi-page navigation
- Validate v Google Rich Results Test

### Phase 61 (final polish)
- Manual VoiceOver/NVDA test
- Per-tool SEO audit (titles ≤60, descriptions ≤160)
- Internal linking pass (≥3 related per tool)
- Sitemap refresh

### Daily ritual (Lukas check)
**Každé ráno 30 sekund:**
1. AdSense → Stránky → tinyuseful.app status check
2. Pokud změna **Příprava → Připraveno**: AdSense approved, otevřít Phase 59a
3. Pokud změna **Příprava → Vyžaduje vaši pozornost**: kontaktovat, zjistit důvod
4. PSI mobile re-test pokud cokoli významného deployed v posledních 24h

### Pondělní rituál (Lukas, 15 min)
**Každé pondělí ráno (Praha čas):**
- GSC quick check: impressions trend, top queries, indexing changes
- Cloudflare Web Analytics: traffic patterns, country distribution, 4xx rate
- Sledovat checkpoint cíle:
  - **Day 7 (2026-05-13):** 50+ impressions
  - **Day 30 (2026-06-06):** 300+ impr/day = healthy, 1k+ = strong, 5k+ = AdSense Mediavine prep

### Měsíční rituál (Lukas, první neděle, 60 min)
- Performance & competitive monitoring
- PSI re-test všech 11 tools
- Competitor analysis (Calc.net, Omni, RapidTables ranking changes)
- Roadmap review

---

## 7. Klíčové principy pro budoucí rozhodování

### Co je flexibilní (může se měnit kdykoli)
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
7. **Per-tool URLs natrvalo** — `/percentage-calculator/`, ne `/percentage`

### Workflow s Claude/asistentem
1. **Pochop zadání** (zeptat se, pokud nejasné)
2. **Přečíst relevantní soubory** (ne celé 1500 řádků pokud měníš jen jednu funkci)
3. **Připravit řešení**
4. **Ukázat diff / preview** (před commit)
5. **POČKAT** na explicitní souhlas ("ok", "commitni", "pojď na to")
6. **Teprve potom git commit + push**
7. **Po pushi:** 30–60s na Cloudflare deploy, verify přes GET https://www.tinyuseful.app
8. **Vrátit shrnutí** s linkem na live verzi

### Komunikační pravidla
- Lukas mluví česky, odpovídat česky
- Stručně, věcně, žádné excuses ani omluvy
- Když máš návrh, řekni ho přímo — neschovávej ho za "možná by bylo dobré..."
- Pokud něco nejde, řekni proč konkrétně, ne "vyskytl se problém"

### Iterativní review pattern
Lukas často používá GPT a Gemini jako oponenty Claude návrhů (a naopak). Tento **3-AI iterativní review** se osvědčil:
1. Claude navrhne řešení
2. Lukas pošle GPT/Gemini pro oponentní pohled
3. Lukas synthesizuje, vrátí Claude s úpravami
4. Claude implementuje finální verzi

**Best practice:** psát návrhy v markdown s explicit acceptance criteria, aby šlo lehko peer-review.

---

## 8. Aktuální blokátory + pending

### Externí (čekáme na něco)
- **AdSense review** — pending od 2026-05-02, Auto Ads OFF od 2026-05-07
- **GSC HTTPS apex redirect re-validation** — 1–3 dny po Page Rule deploy
- **Cloudflare RUM data** se Auto Ads OFF — 24–48h pro stabilní vzorek

### Interní pravidelné checkpointy
- **Day 7 GSC checkpoint:** 2026-05-13, target 50+ impressions
- **Day 30 GSC decision point:** 2026-06-06
  - <300 impr/day = problém, redesign trust
  - 300–1k impr/day = healthy growth
  - 1k–5k impr/day = strong, accelerate content
  - 5k+ impr/day = Mediavine prep

### Otevřené technické otázky
- robots.txt SEO 92 cap (Cloudflare Content-Signal directive flag) — možná akce: zkontrolovat AI Crawl Control settings v Cloudflare dashboard
- Render-blocking 1570 ms (CSS + helpers.js) — micro issue, vyřešit v Phase 61 polish
- Footer touch targets a11y 96 → 100 — vyřešit v Phase 58 batch (CSS `.colophon a, .colophon button` padding)

---

## 9. Memory files pro Claude (kde co najít)

Tato složka v Claude memory obsahuje detailní per-fáze záznamy:

```
/spaces/.../memory/
├── MEMORY.md (index)
├── timezone_lukas.md (Europe/Prague pravidla)
├── tinyuseful_project.md (project overview)
├── tinyuseful_positioning_v4.md (positioning)
├── tinyuseful_post_adsense_plan.md (master plan)
├── tinyuseful_audit_synthesis_2026-05-04_v2.md (GPT+Gemini audit)
├── tinyuseful_session_2026-05-04_summary.md (production sprint)
├── tinyuseful_metrics_2026-05-05.md (Cloudflare baseline)
├── tinyuseful_pwa_00_audit.md (PWA feasibility)
├── tinyuseful_uxui_research_GPT_2026-05-06.md
├── tinyuseful_uxui_research_Gemini_2026-05-06.md
├── tinyuseful_uxui_research_Claude_2026-05-06.md
├── tinyuseful_uxui_synthesis_2026-05-06.md (verdikt 4 kola)
├── tinyuseful_phase56_methodology_2026-05-06.md (Phase 56 details)
├── tinyuseful_phase56b_phase59_decision_2026-05-07.md (Phase 56b + 59 deferral)
├── tinyuseful_phase57_trust_2026-05-07.md (Phase 57 details)
├── connectors_inventory.md (MCP inventory)
├── tinyuseful_stack.md (tech stack & deploy)
├── tinyuseful_workflow.md (Cowork drafts, manual approval per commit)
├── tinyuseful_commit_helper.md (PowerShell tier "click" → _run_commit.bat)
├── tinyuseful_rules.md (do/don't rules)
├── tinyuseful_strategy.md (content & SEO)
├── tinyuseful_roadmap.md (months 1–24)
└── tinyuseful_accounts.md (externí účty reference)
```

---

## 10. Quick reference

| Co | Kde |
|---|---|
| Live web | https://www.tinyuseful.app |
| Repo | github.com/jetotakto/tinyuseful |
| Hosting | Cloudflare Pages, auto-deploy z `main` |
| Apex redirect | tinyuseful.app → www.tinyuseful.app (Cloudflare Page Rule) |
| Doména registrátor | Porkbun |
| DNS | Cloudflare (free plan) |
| Email | Cloudflare Email Routing → contact@tinyuseful.app |
| Lokální složka | `E:\tinyuseful` (Windows) |
| Tokens | `E:\tokeny.txt` (mimo repo) |
| GSC property | "Doména" (apex + www + subdomény), DNS TXT verification |
| AdSense Publisher ID | ca-pub-5316081427597729 |
| Forecast LOCKED | GSC > Cloudflare; konzervativně 300–800/day month 1 |
| Verze | v0.7+ (Phase 57 LIVE 2026-05-07) |

---

## 11. Co tě teď nejbližší den čeká

**Krátkodobě (dnes/zítra):**
1. Sledovat AdSense status (denně 30s)
2. Sledovat PSI re-test (zítra ráno pro ověření stability)
3. Cloudflare RUM data za 24-48h (Auto Ads OFF impact)

**Střednědobě (tento týden):**
4. Phase 58 batch — methodology + a11y rollout na 10 tools (rozhodnout kdy)
5. Day 7 GSC checkpoint (2026-05-13): 50+ impressions

**Dlouhodobě (tento měsíc):**
6. Day 30 GSC decision point (2026-06-06)
7. AdSense approval (pravděpodobně 1–14 dní)
8. Phase 59a po approval (AdSense lazy load)

**Co Lukas chce po Claude Cowork:**
- **Pomoct s text content** (about, blog articles k AdSense Mediavine threshold)
- **SEO copy review** (titles ≤60, descriptions ≤160)
- **Methodology obsah per-tool** (assumptions wording, edge cases)
- **Roadmap critique** (co je redundant, co chybí)
- **Forecast calibration** (GSC trends interpretation)
- **Article drafts pro `/blog/`** (cíl: 12 článků k Mediavine)

**Co Lukas NECHCE po Claude Cowork:**
- Code generation (Claude přímý dělá)
- File editing (jen text návrhy)
- AdSense policy interpretation (Google docs jsou autoritativní)

---

**Konec handoff dokumentu.**

Pokud máš otázku, postupuj podle workflow (zeptat se → návrh → diff → commit po souhlasu Lukase). Pokud potřebuješ kontext nějaké konkrétní fáze, otevři odpovídající memory file.

Datum: 2026-05-07 (čtvrtek), 10:30 CEST.
Verze webu: v0.7+ (Phase 57 LIVE).
Performance: PSI mobile 98 / 96 / 100 / 92.
Status: AdSense Příprava, Auto Ads OFF, čekáme na approval.
