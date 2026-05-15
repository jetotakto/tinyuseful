> **ARCHIVED 2026-05-15** — pre-rollout planning document, kept for context.
> Current state: v2 hf system deployed (homepage + 11/11 tools).
> See [TINYUSEFUL_STATUS_2026-05-15.md](../TINYUSEFUL_STATUS_2026-05-15.md).

# Rebuild plán otázky pro GPT — strukturovaný framework

**Pro Lukase:** Toto jsou otázky, na které potřebuješ od GPT dostat odpovědi pro comprehensive rebuild plán. Pošli GPT v dávkách (po 5-7 otázek), aby každá odpověď byla detailní.

---

## Background pro GPT (úvod do debate)

```
Lukasi, rozhodl jsem se přepsat TinyUseful od základu na základě
3-AI deep research konsenzu (GPT/Gemini/Claude). Současný web
zůstává live během rebuild, AdSense review pokračuje na současné
verzi. Rebuild deploy AŽ po AdSense approval.

Setup:
- Current live: E:\tinyuseful\ na branch main (NETKNOUT)
- Rebuild work: E:\tinyuseful-v2\ na branch v2-rebuild (Git worktree)
- Cloudflare Pages preview deployments z v2-rebuild branch
- Final merge v2-rebuild → main AŽ po AdSense approval

Nezávazný předpoklad: 50 nástrojů do 18 měsíců, flat URLs zachovat,
tiered methodology depth (300-500 simple / 800-1000 complex), no blog,
Home Projects vertikála jako Mediavine traffic driver.

Pojďme vytvořit comprehensive rebuild plán. Budu posílat otázky po
dávkách. Po každé dávce vrať detailní odpověď, navrhne další otázky,
nebo upravíme směr.
```

---

## DÁVKA 1: Architecture & file structure

### Otázka 1.1: Build setup
Co preferuješ pro greenfield setup TinyUseful v2?
- **A) Pure no-build:** raw HTML/CSS/JS, žádný esbuild, žádný node, statický deploy
- **B) Build-light:** esbuild minify pro JS, single Node script pro sitemap generation, manifest.json driven
- **C) Stredně:** Vite jako dev server (instant reload), build do statických souborů, žádná hydration

Jaký je tradeoff každé varianty pro solo dev + 50 tools target?

### Otázka 1.2: File structure
Mám 3 návrhy z research dokumentů:

**Claude:**
```
/index.html
/tools/index.html
/tools/tip/index.html (až 50)
/methodology/, /about/, /privacy/, /changelog/
/assets/css/{tokens, base, layout, components/}
/assets/js/{shared/, tools/}
/build/{manifest.json, sitemap.mjs}
```

**Gemini:**
```
/src/css/{tokens.css, base.css, components.css}
/src/js/{lib/, helpers/, calculators/}
/public/[tool-name]/index.html
```

**GPT:**
```
/assets/css/{tokens, base, layout, utilities, components/}
/assets/js/{core/, calculators/}
/data/{tools.json, clusters.json, related-tools.json}
/calculators/<cluster>/<tool>/index.html
/scripts/{build-related.mjs, build-sitemaps.mjs, build-jsonld.mjs}
```

Která struktura je nejlepší pro:
- Rychlou iteraci (developer)
- Long-term maintainability (50 tools, multiple methodology depths)
- Flat URL preservation (`/percentage-calculator/` ne `/calculators/math/percentage/`)
- Cloudflare Pages compatibility

Navrhni HYBRID strukturu, která bere best of all 3 a respektuje flat URLs.

### Otázka 1.3: Manifest-driven generation
Pro 50 tools je manuální duplikace HTML structure neudržitelná. Navrhni:
- **Manifest schema** (`tools.json`): co všechno per-tool definovat (id, slug, cluster, name, description, formula, methodology word count, FAQ items, related tools, schema.org type)
- **Build script logic:** jak z manifest generovat HTML pages s konzistentní strukturou
- **Hot reload pattern:** při development jak rychle vidět změny

---

## DÁVKA 2: Design system & visual identity

### Otázka 2.1: Brand identity audit
Současný TinyUseful má:
- Knife logo (red square s křížkem) `--red: #C8102E`
- "No. 1 — April 2026" issue badge (newspaper aesthetic)
- Newsreader serif (brand) + Inter sans (UI) + JetBrains Mono (technical)

Pro rebuild:
- **Zachovat?** Co z toho má brand recognition value, co je legacy noise?
- **Modernizovat?** Knife logo OK, ale newspaper aesthetic vs. "Calm Utility Soft Grid" Gemini doporučení
- **Nová identita?** Lukasovo architectural background — má knife logo legitimitu nebo by lepší byl něco architectural-themed?

Co by bylo nejvhodnější pro dlouhodobý brand build (50 tools, Mediavine, organic search)?

### Otázka 2.2: Color system
3 návrhy:
- Claude: `#FAF9F6` bg, `#B0312B` accent red, `#1F6E45` focus green
- Gemini: `#F9F9F8` bg, `#D32F2F` accent, `#FFBF47` focus yellow (GOV.UK)
- Current: `#FAF8F2` paper, `#C8102E` red

Která paleta je optimální pro:
- US market (warm vs. cool tones research)
- Calculator tool legibility (≥4.5:1 contrast)
- Dark mode support (auto via prefers-color-scheme)
- Print-friendly (Lukasovo "philosophical point — works on paper too")

Navrhni final palette s konkrétními hex codes a CSS custom properties.

### Otázka 2.3: Typography
- System fonts only (Claude) vs. system UI + serif heading (Gemini)
- Self-hosted (current) vs. system-only (smaller bundle)
- Newsreader vs. Georgia/Merriweather (Gemini) vs. system serif fallback

Při rebuild s focus na <2s LCP a system fonts performance — co je optimal?

### Otázka 2.4: Component inventory
Které UI komponenty potřebujem pre-built v design system?

Návrh per-tool requirements:
- Header (logo, nav)
- Breadcrumb
- H1 + lede
- Form: label, hint, input wrap, prefix/suffix, segmented control, native select, checkbox/radio
- Calculate button, Copy button, Reset button
- Result block (label, value, breakdown, status region)
- Quick examples chips
- Methodology details/summary
- FAQ accordion (`<details>`)
- Related tools list
- Ad slot (reserved height, label)
- Footer (links, theme toggle)

Co chybí? Jaký je optimální order vytvoření components first → tools second?

---

## DÁVKA 3: Tool template & content

### Otázka 3.1: Canonical tool page structure
Mám 3 verze ze research:

**Claude verze:**
```
[Breadcrumb]
[H1 + Purpose]
[Calculator workspace card: form + quick examples + result + actions]
[Methodology block]
[FAQ]
[Related tools]
[Ad slot]
[Footer]
```

**Gemini verze:**
```
[Breadcrumb]
[H1 + Subline]
[Calculator workspace]
[Quick examples]
[Ad slot 1: mid-content]
[Methodology + Formula 1000+ words]
[FAQ accordion]
[Related tools]
[Ad slot 2: lower-content]
[Footer]
```

**GPT verze:**
```
[Breadcrumb]
[H1]
[One-sentence purpose]
[Calculator workspace]
[Quick examples]
[Methodology / formula]
[FAQ]
[Related tools]
[Ad slot]
[Footer]
```

Která je optimal pro:
- AdSense Confirmed Click safety
- Mobile UX (input + result viewport bez scroll)
- Methodology depth bez ad nárazu
- Internal linking efficiency

Vytvoř HYBRID kanonickou strukturu jako reference.

### Otázka 3.2: Methodology template
Per-tool methodology block obsahuje:
- Formula
- Worked example (s user's actual numbers)
- Assumptions
- Rounding
- Limitations
- Privacy note
- Last updated
- Byline ("Built and maintained by Lukáš, an architect in Prague")
- Sources (kde relevantní)

Pro rebuild:
- Jak strukturovat methodology jako reusable HTML pattern?
- Worked example: server-side default vs. client-side dynamic update?
- Sources block: kdy uvádět (Mortgage = Bankrate, Paint = Sherwin-Williams)?
- "Reviewed by" pattern: má Lukasovo CKA 04891 být uveden? Pro Home Projects ano, pro Tip Calculator ne?

### Otázka 3.3: First-launch tool list (10-15 tools)
Pro rebuild dáme prioritní top tools:

**GPT navrhoval 12-15 launch:**
percentage, percentage change, tip, split bill, unit price, sales tax, discount, prorated rent, rent split, days between, add/subtract date, business days, paint, square footage, mulch

**Claude navrhoval 10 anchor:**
Tip, Percentage, Sales Tax, Discount, Bill Split, Date Difference, Age, Square Footage, Length Converter, Mortgage Payment

**Reality:** Současný web má 11 tools (Percentage, Sales Tax, Mortgage, Loan, Compound Interest, Rent Affordability, Tip, Discount, Unit Converter, Date Calculator, Time Zone). Z těch 11:
- Které **redesign** od základu v rebuild?
- Které **deprecate** (přesunout na Phase 2)?
- Které **rozšířit** (Discount → Discount + Bill Split kombinace)?

Daj final launch list (10-12 tools v0.1 rebuild).

### Otázka 3.4: Methodology depth implementation
Tiered approach (300-500 simple / 800-1000 complex):
- Simple tools (7): Tip, Discount, Percentage, Sales Tax, Date, Time Zone, Unit Converter
- Complex tools (3): Mortgage, Loan, Compound Interest

Otázka pro každý complex tool:
- **Mortgage:** APR explanation, PMI removal mechanics, escrow analysis, ARM exclusion, US property tax variability
- **Loan:** Amortization formula derivation, prepayment effect, fixed vs. variable rate
- **Compound Interest:** Frequency impact, inflation real vs. nominal, withdrawal scenarios

Vytvoř outline 800 slov methodology pro Mortgage jako template, který Lukas pak aplikuje na Loan + Compound Interest.

---

## DÁVKA 4: Performance, AdSense, accessibility

### Otázka 4.1: Performance budget targets
Konsenzus z 3-AI:
- LCP ≤ 2.0s (sweet spot per Gemini round 2)
- INP ≤ 150ms
- CLS ≤ 0.05
- Total CSS ≤ 25 KB gz
- JS per tool ≤ 10 KB gz
- 0 KB fonts (system only) — diskuse v Otázka 2.3

Pro rebuild:
- Critical CSS inline strategy (8 KB v `<head>`)?
- AdSense lazy load timing (3s idle vs. first interaction vs. visibility threshold)?
- Service worker — nikdy nebo až při 25+ tools?
- Image strategy: 0 raster, vše inline SVG (logo, icons)?

### Otázka 4.2: AdSense placement strategy (post-approval)
Rebuild bude bez AdSense kódu DO doby approval current site. Po approval:
- Single ad slot per tool page nebo dva (Gemini)?
- 50px (Claude/GPT) vs. 150px (Gemini original) clearance?
- Auto Ads NEVER (3-AI konsenzus)
- Sticky ads NEVER

Vytvoř detailed AdSense spec pro post-approval activation:
- Slot dimensions (320×250 mobile, 728×90 desktop)
- CSS reservation pattern (ID-based per Gemini Auto Ads strip-class warning)
- Lazy load script (po 3s idle nebo first interaction, requestIdleCallback fallback)
- Per-tool placement: simple tools (after quick examples) vs. complex (after methodology + FAQ)

### Otázka 4.3: Accessibility audit baseline
WCAG 2.2 AA target. Pro rebuild každá page musí:
- Skip link na `#main`
- `<main>` landmark
- Heading hierarchy h1 → h2 → h3
- Focus visible (2px outline, 2px offset, ≥3:1 contrast)
- Tab order logical
- All inputs labeled (visible labels above)
- Result region `role="status"` + `aria-live="polite"` + `aria-atomic="true"`
- Errors `aria-invalid` + `aria-describedby`
- Touch targets ≥44px (button min-height: 48px)
- 200% zoom: žádný horizontal scroll na portrait mobile
- `prefers-reduced-motion` respekt
- Žádný `user-scalable=no`
- Screen reader pass (VoiceOver iOS, NVDA Windows)

Co testovací stack? Lighthouse / axe DevTools / manual screen reader / WebPageTest?

### Otázka 4.4: SEO strategy
- URL: flat root (`/percentage-calculator/`)
- Title pattern: `[Tool] — [Promise] | TinyUseful`
- Meta description: 1 sentence ≤155 chars
- Canonical URL self-referential
- JSON-LD per page type (BreadcrumbList, SoftwareApplication, optional FAQPage)
- Sitemap.xml (auto-generated z manifest)
- robots.txt (allow all + sitemap reference)

Otázka:
- FAQPage schema worth implementing pokud Google omezuje rich result na .gov/.health?
- HowTo schema kde by se hodilo (Paint Calculator?)
- WebApplication schema vs. SoftwareApplication?
- Structured data testing workflow (Rich Results Test, Schema validator)?

---

## DÁVKA 5: Implementation workflow & timeline

### Otázka 5.1: Iterative build sequence
Pro rebuild navrhni order of operations:

**Návrh:**
1. Setup (manifest schema, tokens.css, base.css)
2. Design system page (demo všech components)
3. Build pure HTML skeleton homepage (no JS, validate semantic HTML)
4. Build first reference tool (Tip nebo Percentage) — full structure
5. Generalize template to second tool (extract patterns)
6. Build remaining 8-10 launch tools (manifest-driven generation)
7. Methodology content writing (parallel track Lukas)
8. Performance audit + accessibility audit
9. Cloudflare Pages preview deployment
10. AdSense readiness check (waiting for current site approval)
11. Final merge v2-rebuild → main (after AdSense approval)
12. Live deploy

Navrhni týdenní cadence pro Lukasovo 3-4 h/týden kapacitu (18 měsíců total project, ale rebuild má být ready za ~3 měsíce post-AdSense-approval).

### Otázka 5.2: Testing strategy
Co testovat per-tool před launch?
- Unit tests pro `compute(state)` (formula correctness)
- Visual regression (Playwright na 320/375/768/1024 px)
- Lighthouse CI (mobile, throttled): perf 95+, a11y 100, SEO 95+
- axe-core (0 critical issues)
- Manual screen reader (VoiceOver + NVDA monthly)
- Real device test (iPhone SE, Pixel 5)
- Cross-browser smoke (Chrome, Safari, Firefox, Edge)

Jaký je realistic test workflow pro solo dev?

### Otázka 5.3: Deployment workflow
Cloudflare Pages auto-deploy z `v2-rebuild` branch:
- Preview URLs pro každý push
- Production deploy AŽ po merge do `main`
- Branch deployments visible v Cloudflare dashboard

Otázky:
- Per-PR preview workflow (PR → branch → preview URL → review → merge)?
- Direct push to v2-rebuild OK pro solo dev nebo PR-based pro discipline?
- Rollback strategy (git revert, Cloudflare deploy history)?

### Otázka 5.4: Migration path (post-AdSense approval)
Až AdSense schválí current site, jak provést transition na v2:

**Option A:** Big bang — merge v2-rebuild → main, deploy completely new site
**Option B:** Gradual — deploy v2 na subdomain nejdřív (`v2.tinyuseful.app`), test 30 dní, pak swap
**Option C:** Per-page — některé v2 tools deploy první (na original URLs), v1 tools jako fallback

Risk/benefit každé varianty?

---

## DÁVKA 6: Risk management & open questions

### Otázka 6.1: AdSense kontinuitní risk
Pokud rebuild zásadně mění content, Google může considerovat "site changed significantly":
- AdSense Policy Center může vyžadovat re-review
- E-E-A-T signály musí být zachovány nebo silnější
- URL stability = clutch (proč zachováváme flat URLs)

Jak minimize re-review trigger?

### Otázka 6.2: GSC indexing continuity
17 současných URLs indexovaných:
- Při rebuild se obsah změní (methodology depth, structure)
- Google bude re-crawl, re-evaluate
- Existing ranking signals — jak zachovat?
- Internal links audit (sitemap regenerate, no broken links)

### Otázka 6.3: Lukasova kapacita reality check
3 h/týden × 12 týdnů (3 měsíce) = 36 hodin total na rebuild.
Realistic deliverables:
- 10 tools refactored on new template
- ~5000 slov methodology content
- Design system + components
- Build script
- Testing pass

Je 3 měsíce realistic timeline? Nebo 6 měsíců s buffer?

### Otázka 6.4: GPT vs. Claude vs. Lukas role
- Lukas: product owner, content reviewer, deployer
- GPT: strategic planner (this debate), content review pre-launch
- Claude: implementer (code, refactor, audit)
- Gemini: visual identity reviewer pre-launch

Jasné role-split? Co dělá Lukas vs. AI?

### Otázka 6.5: Otevřené decision points
Po této debatě s GPT, co zůstane otevřené pro Claude implementaci?

Mám podezření:
- Visual brand evolution (knife logo same? newspaper retire?)
- Specific font choices (system-only nebo Google Fonts)
- Cluster page design (`/home-projects/` cluster hub layout)
- Search bar timing (od day 1 nebo až 25 tools)

---

## ZÁVĚREČNÁ PROSBA NA GPT

Po projití těchto 6 dávek otázek (~30 questions total), vytvoř:

1. **Master rebuild plán** (markdown document, 2-4 stránky)
2. **Sequential implementation roadmap** (week-by-week, 12 weeks)
3. **Decision matrix** pro každý sporný bod
4. **Acceptance criteria** pro každou phase
5. **Final reference** pro mě (Claude) jak začít implementovat

Tento plán pak Claude prochází (questions, edits), poté začne building v `E:\tinyuseful-v2\` na branch `v2-rebuild`.
