> **ARCHIVED 2026-05-15** — pre-rollout planning document, kept for context.
> Current state: v2 hf system deployed (homepage + 11/11 tools).
> See [TINYUSEFUL_STATUS_2026-05-15.md](../TINYUSEFUL_STATUS_2026-05-15.md).

# TinyUseful — Strategie Master Concept v2: diskusní podklad mezi GPT, Gemini a Claude

**Datum:** 2026-05-07 (čtvrtek), Praha CEST
**Autor syntézy:** Claude (Anthropic), na základě 3 deep research dokumentů GPT/Gemini/Claude
**Účel:** Strukturovaný podklad pro iterativní debatu napříč 3 AI a finální strategické rozhodnutí

---

## TL;DR

Všichni tři (GPT, Gemini, Claude) ve druhém kole research mění optiku z "úprava + doplnění" (Phase 56-61 incremental approach) na **strategicky širší master concept**: TinyUseful jako **kurátorovaná síť 50–65 deterministických utility kalkulaček** pro US trh, postavená na vanilla stack, s důrazem na methodology + accessibility + AdSense-safe monetizaci. Konsenzus existuje na ~80% pravidel; klíčové **rozdíly jsou v 4 oblastech**:

1. **Velikost portfolia:** Claude říká **50**, GPT říká **60–65**, Gemini říká **60–65**
2. **URL strategie:** Claude `/tools/<slug>/`, GPT `/calculators/<cluster>/<tool>/`, Gemini `/<cluster>/<tool>/`, **současný stav `/percentage-calculator/` (flat top-level)**
3. **Methodology depth:** Claude 250-700 slov, GPT střízlivý, Gemini explicitní 1000-1200 slov FLOOR
4. **Ad clearance:** Claude/GPT 50px, Gemini 150px

**Praktický důsledek pro nás:** Tato research **NEPŘEPISUJE** Phase 56b/57 práci, ale **REKONSTRUUJE** dlouhodobou roadmapu (Phase 58+).

---

## 1. Konsenzus napříč 3 AI (zafixovat)

Všichni tři se shodují na **15+ pravidlech**, která můžeme považovat za pevný core master concept:

### Architektura
1. **Vanilla HTML/CSS/JS, žádný framework** — frameworky přidávají 40-150 KB JS bez user benefit
2. **Static-first, progressively enhanced** — Google sice JS renderuje, ale simple HTML je nejspolehlivější
3. **Žádný build complexity** — max esbuild minify + sitemap generator (build-light), žádný bundler/router/hydration
4. **System fonts only** (alespoň pro UI) — 0 KB font payload, native feel
5. **No accounts ever** — frictionless task completion = brand promise
6. **No localStorage for inputs** — protect "we don't save your inputs" claim

### UX patterny
7. **`<input type="text" inputmode="decimal">`** pro currency/percentage/decimal (NE `type="number"`) — GOV.UK 2020 changeover, locale corruption issue
8. **Visible labels above inputs** — žádné placeholder-only
9. **Native `<select>`** — žádné custom comboboxy
10. **`<details>`/`<summary>`** pro advanced options — zero JS, plně accessible
11. **`role="status"` + `aria-live="polite"` + `aria-atomic="true"`** na result region — element musí existovat na page load, update text only (NE replace celého live region)
12. **`font-variant-numeric: tabular-nums`** na všech numerických outputs

### Methodology + trust
13. **Per-tool methodology block:** formula + worked example + assumptions + rounding + limitations + last updated + byline
14. **Civil byline** ("Built and maintained by Lukáš, an architect in Prague") — vyhnout overcredentialed claims
15. **Truthful copy:** "Calculations run in your browser" / "We do not require an account" / "Ads and analytics may use cookies where applicable" (NE "100% private", "No tracking", "Bank-grade")

### YMYL avoidance
16. **YMYL exclusion list je binding:** žádné medical/health (BMI, calorie, dosage), žádné tax-filing 1040, žádné child support / alimony, žádné investment prediction (crypto), žádné safety-critical
17. **YMYL screen test:** "If wrong by 10%, can someone get hurt or lose serious money?" → don't ship

### AdSense
18. **Žádný ad mezi input a result** — Confirmed Click penalty risk
19. **Žádné Auto Ads** — bypass clearance rules, sticky mobile risk
20. **Reserved min-height** pro ad slot — CLS prevention (CSS na ID, ne class — AdSense scripts strip classes)
21. **"Advertisement" label** (ne "Resources", "Helpful links", icons)
22. **AdSense apply až po 10+ anchor calculators live 14+ days**

### SEO
23. **Single canonical per tool** — NE per-state/per-city/per-currency variants (doorway risk)
24. **Anti-pSEO:** `1 inch to cm` + `2 inches to cm` jsou jeden canonical converter, ne 100 URLs
25. **One H1 per page** = task name (e.g., "Tip Calculator")
26. **JSON-LD:** BreadcrumbList + SoftwareApplication na každé tool page; FAQPage jen pokud reálně 3+ Qs visible

### Performance
27. **AdSense lazy-loaded** — defer until first interaction nebo 3s idle
28. **Critical CSS inline** v `<head>` (~8 KB)
29. **CLS reservation** pro každý ad slot

### Accessibility
30. **WCAG 2.2 AA target** (focus visible, no zoom block, ≥24px touch — Apple HIG ≥44px)
31. **Skip link** na main content
32. **Heading hierarchy:** h1 → h2 → h3 (žádný skip)
33. **Žádný keyboard trap, žádné `user-scalable=no`**

---

## 2. Kde se 3 AI LIŠÍ (kandidáti pro debatu)

### A. Velikost portfolio (50 vs 60-65)

| AI | Recommendation | Argument |
|---|---|---|
| **Claude** | **~50 tools at 24 months** | Splitwise mental model, methodology depth maintainable solo, recognizable brand within 12 months |
| **GPT** | **60-65 tools** | Best balance — dost na strong internal-link graph + cluster effect + home-projects vertikála + everyday-life současně |
| **Gemini** | **60-65 tools** | 25 příliš úzké pro domain authority, 100+ quality dilution, 60-65 = curated team může psát 1000-word E-E-A-T guides |

**Pro Lukase k rozhodnutí:** Pro solo operátora s architektonickým background:
- 50 tools = zvládne s prostředky
- 60-65 = stretch goal, ale Home Projects vertikála (Lukasova expertíza) zaslouží depth

**Návrh:** Cíl **50 do 18 měsíců, 60-65 jako optional 24-month stretch** pokud Home Projects roste rychle.

### B. URL strategie (3 různé patterny + náš current)

| Variant | Příklad | Současný stav |
|---|---|---|
| **Naše current (flat top-level)** | `/percentage-calculator/` | ✅ AKTUÁLNÍ, indexované, GSC-okované |
| **Claude `/tools/<slug>/`** | `/tools/tip/` | NE — vyžaduje migration |
| **GPT `/calculators/<cluster>/<tool>/`** | `/calculators/home-projects/paint-calculator/` | NE — vyžaduje migration |
| **Gemini `/<cluster>/<tool>/`** | `/home-projects/paint-calculator/` | NE — vyžaduje migration |

**KRITICKÉ:** Migration = ztráta GSC indexing kreditu. Lukasovo memory `tinyuseful_phase56b_phase59_decision_2026-05-07.md` říká explicitně: "URL pivot na /tool/{slug} ZRUŠENO natrvalo". 17 indexovaných stránek je už cenných.

**Návrh:** **Zachovat current `/percentage-calculator/` flat pattern**. Při růstu na 60-65 tools cluster pages přidat NAVÍC (např. `/calculators/` jako index, `/home-projects/` jako cluster hub) bez migrace existujících URLs.

### C. Methodology depth

| AI | Word floor | Argument |
|---|---|---|
| **Claude** | 250-700 slov per tool | Overload by hurt LCP/INP, 250 = floor |
| **GPT** | "Strict" without floor | Quality > word count |
| **Gemini** | **1000-1200 slov FLOOR** | Information Gain = SEO moat, AdSense rejection prevention |

**Pro Lukase:** Solo operátor 1000-1200 slov × 50 tools = 60 000+ slov original content. To je 6 měsíců full-time pisaní.

**Návrh:** **300-500 slov pro launch**, postupně rozšiřovat na 600-1000 pro top-CPC tools (Mortgage, Paint, Tile). Quality > forced word count.

### D. Ad clearance

| AI | Min buffer ad-to-button |
|---|---|
| Claude | **50px** (cituje AdSense docs) |
| GPT | 50px |
| Gemini | **150px** |

**Návrh:** **Použít 50-100px** (kompromis). Gemini 150px je conservative ale ztratí ad inventory; 50px je policy minimum.

### E. Velikost JS budget

| AI | Per-tool JS | Total |
|---|---|---|
| Claude | ≤15 KB gz | + ~6 KB shared |
| GPT | "small modules" | nereferuje |
| Gemini | **≤10 KB gz** | + 15 KB CSS |

**Návrh:** Aim **≤10 KB per tool** (Gemini target), shared helpers.js ~6-8 KB, total page JS ≤20 KB.

### F. Performance targets

| Metric | Claude | GPT | Gemini |
|---|---|---|---|
| LCP | ≤2.5s (aim 1.8s) | ≤1.8s | **<1.2s** |
| INP | ≤200ms (aim 100ms) | ≤150ms | **<50ms** |
| CLS | ≤0.1 (aim 0.02) | ≤0.02 | **0.00** |

**Reality check:** Naše current PSI mobile: LCP 2.3s, INP via TBT 90ms, CLS 0.002. Sedíme v Claude/GPT zóně, ne v Gemini ultra-strict. Gemini cíle vyžadují **bez AdSense** nebo s nulovým client overhead — nedosažitelné s ad slot.

**Návrh:** **Claude/GPT targets jako floor, Gemini jako aspiration:** LCP ≤2s, INP ≤150ms, CLS ≤0.05.

### G. Phased rollout sekvence

| Phase | Claude | GPT | Gemini |
|---|---|---|---|
| Anchor launch | 10 tools | 12-15 tools | 5 tools (pre-AdSense) |
| Post-AdSense pivot | Phase B (15 more) | First New Calculators | **Home Projects vertikála immediately** |
| Mature | ~50 tools at 24mo | 60-65 mature | 60+ tools |

**Konsenzus:** Po AdSense approval **Home Projects = #1 priority post-launch**. Lukas má architectural background = E-E-A-T fit.

### H. Cluster taxonomy

| AI | # clusters |
|---|---|
| Claude | **7** (Math, Shopping, Money, Date, Unit, Travel, Home) |
| GPT | **7** (stejné jako Claude) |
| Gemini | **5** (Math, Money/Rent/Work jako jeden, Date, Unit, Home — žádný Travel) |

**Návrh:** **7 clusters per Claude/GPT.** Travel je legitimní cluster (gas, MPG, road trip) i bez map data.

---

## 3. Co tato research **NEMĚNÍ** v aktuálním stavu

Phase 56-57 deploys (2026-05-06/07) jsou **kompletně kompatibilní** s tímto master conceptem:

- ✅ Methodology block (Phase 56) = exact pattern doporučený všemi 3 AI
- ✅ `<main>` landmark + heading hierarchy (Phase 56b) = mandatory
- ✅ Trust pages cleanup (Phase 57) = "civil byline + transparent limitations" konsenzus
- ✅ Privacy wording cleanup = wording rules zafixované všemi 3
- ✅ Auto Ads OFF = Claude/Gemini explicit recommendation

**Nic z toho, co Lukas dnes deployed, nemusí být revertováno.**

## 4. Co tato research **MĚNÍ** v dlouhodobé roadmapě

### Phase 58 (původně methodology rollout na 10 tools)

**Update:** Místo just rollout → **současně standardizovat methodology depth** (300-500 slov per tool, ne jen 5 řádků jak v Percentage Calc).

### Phase 59a (původně AdSense lazy load)

**Beze změny.** Defer until AdSense approval.

### Phase 60 (původně JSON-LD structured data)

**Update:** Konsensus říká **NEPRIORITIZOVAT FAQPage rich result chase** (Google omezuje na .gov/.health). Použít FAQ markup jen pro machine understanding, ne SERP feature lever.

### Phase 61+ (NEW based on research)

**62 — Cluster index pages** — vytvořit `/calculators/` (all-tools), `/home-projects/` (cluster hub) BEZ migrace existujících tool URLs.

**63 — Home Projects vertikála push** — paint, mulch, tile, square footage, drywall, concrete (LUKASOVO ARCHITEKTONICKÉ EXPERTÍZA = E-E-A-T fit, AdSense high CPC).

**64 — Search bar** — když překročíme 25 tools, přidat client-side search (Fuse.js nebo simple JS index).

**65 — Methodology depth pass** — postupně rozšiřovat top-CPC tools (Mortgage, Paint, Tile) na 600-1000 slov.

**66 — JS Proxy state pattern** — VOLITELNÉ, refactor helpers.js na Gemini Proxy pattern (méně procedural). NÍZKÁ priorita.

---

## 5. Konkrétní otázky pro 3-AI iterativní debatu

Lukas může poslat tyto otázky postupně GPT/Gemini/Claude pro round-robin review:

### Otázka 1: Portfolio target

> "Pro solo operátora s architectural background (room411.architects) — máme cílit 50 tools do 18 měsíců (Claude doporučení) nebo 60-65 (GPT/Gemini)? Specifický concern: methodology depth (300-1000 slov per tool) × Lukasův 5-9 person studio means TinyUseful = side project, ne full-time."

### Otázka 2: URL strategie

> "Současný stav: `tinyuseful.app/percentage-calculator/` (17 GSC-indexovaných stránek). Migration na `/calculators/<cluster>/<tool>/` (GPT) nebo `/<cluster>/<tool>/` (Gemini) by ztratil indexing credit. Jak přidat cluster pages pro discoverability bez migrace?"

### Otázka 3: Methodology depth

> "Gemini doporučuje 1000-1200 slov FLOOR per tool. Pro 50 tools = 60 000+ slov original content = 6 měsíců práce solo. Claude říká 250-700 slov stačí. Kde je realistický minimum pro AdSense approval + E-E-A-T signal?"

### Otázka 4: Phase prioritization

> "Po AdSense approval — pokračujeme s Phase 58 (methodology rollout na current 10 simple tools) nebo přímo Phase 63 (Home Projects vertikála: paint, mulch, tile, drywall) jako nejvyšší AdSense CPC?"

### Otázka 5: Performance targets

> "Naše current: LCP 2.3s, TBT 90ms, CLS 0.002. Claude/GPT říkají OK, Gemini target je LCP <1.2s, INP <50ms. Je rozdíl mezi 'good' (web.dev threshold) a 'excellent' (Gemini) worth pushing? Kde je cost/benefit rovnice?"

### Otázka 6: 12 článků pro Mediavine

> "Pro Mediavine threshold (50k sessions/month, $30-50 CPM vs AdSense $5-10) — máme cílit blog content (12 článků jak jsme dříve plánovali) nebo prioritizovat Home Projects calculators jako trafficover ramp?"

---

## 6. Aktualizovaný master plán (post-research v2)

```
┌──────────────────────────────────────────────────────────┐
│  TinyUseful Master Plan v2 (2026-05-07)                  │
│                                                           │
│  Cíl 18 měsíců: 50 tools, 50k sessions/month             │
│  Cíl 24 měsíců: 60-65 tools (volitelné), Mediavine       │
└──────────────────────────────────────────────────────────┘

PHASE 56 (DONE 2026-05-06): Methodology block — Percentage ✅
PHASE 56b (DONE 2026-05-07): a11y landmarks + headings ✅
PHASE 57 (DONE 2026-05-07): Changelog + trust wording ✅

──────────────── AdSense PENDING DECISION ─────────────────
PHASE 58 (NEXT): Methodology rollout + a11y batch na 10 tools
                + standardizovat 300-500 slov methodology per tool
                + footer cleanup (Changelog link na všech)

──────────────── AdSense APPROVAL HAPPENS ─────────────────
PHASE 59a: AdSense lazy load + min-height + clearance audit
PHASE 60: JSON-LD WebApplication + BreadcrumbList (no FAQPage rich result chase)
PHASE 61: Search bar (client-side, simple JS index)

──────────────── AdSense REVENUE FLOWS ────────────────────
PHASE 62: Cluster index pages (/calculators/, /home-projects/) BEZ URL migration
PHASE 63 ⭐: Home Projects vertikála push:
            - Paint Calculator (Lukasovo expertíza)
            - Tile Calculator
            - Square Footage Calculator
            - Drywall Calculator
            - Concrete Calculator
            - Mulch Calculator
            - Lumber/Board Feet
            (6-7 tools, 600-1000 slov methodology each — E-E-A-T fit)

PHASE 64-66: Phase B tools per Claude:
            Loan Payment · Compound Interest · Salary↔Hourly · Auto Loan
            · Working Days · Countdown · Time Zone · Weight/Temp/Volume
            Converters · MPG · Gas Cost · Price-per-Unit

PHASE 67+: Mature catalog rollout (50 tools by month 18)
           + 12 blog articles k Mediavine threshold
```

---

## 7. Otázky a kompromisy ke schválení Lukasem

### A. Cíl portfolia
- [ ] **50 tools do 18 měsíců** (Claude conservative, realistic solo)
- [ ] **60-65 tools do 24 měsíců** (GPT/Gemini stretch, vyžaduje víc času)
- [ ] **Hybrid:** 50 do 18 měsíců, evaluate at month 18 if 60-65 stretch je realistic

### B. URL strategie
- [ ] Zachovat `/percentage-calculator/` flat pattern, NIKDY migrovat
- [ ] Přidat cluster index pages NAVÍC (např. `/calculators/`, `/home-projects/`) jako navigation hubs

### C. Methodology depth
- [ ] **300-500 slov launch standard** (kompromis Claude/GPT/Gemini)
- [ ] 600-1000 slov pro top-CPC tools (Mortgage, Paint, Tile)
- [ ] Sledovat AdSense approval — pokud rejected for "thin content", push všech tools na 600+

### D. Phase 58 priority
- [ ] Methodology rollout na current 10 tools (Claude/GPT default)
- [ ] **NEBO** přímo Home Projects vertikála (Gemini explicit, AdSense CPC focus)
- [ ] **Hybrid:** Phase 58 = methodology rollout + Phase 63 hned po (overlapping)

### E. Performance targets
- [ ] LCP ≤2.5s (web.dev threshold) — minimum
- [ ] LCP ≤1.8s — Claude/GPT aim
- [ ] LCP <1.2s — Gemini aspiration (likely jen bez AdSense)

### F. Co odložit / vyloučit
- [x] **Žádné YMYL** (medical, tax-filing, child support, crypto-prediction, etc.)
- [x] **Žádný Auto Ads ever**
- [x] **Žádný framework migration**
- [x] **Žádný account system**
- [x] **Žádné programmatic city/state pages**
- [x] **Žádné live FX/data tools**

---

## 8. Memory references

Tato strategie je uložena do paměti:

```
/spaces/.../memory/
├── tinyuseful_master_concept_research_GPT_2026-05-07.md
├── tinyuseful_master_concept_research_Gemini_2026-05-07.md
├── tinyuseful_master_concept_research_Claude_2026-05-07.md
└── (TODO) tinyuseful_master_strategy_v2_2026-05-07.md (po debatě)
```

---

## 9. Doporučený workflow pro 3-AI debatu

1. **Lukas posílá tento dokument** GPT s otázkami #1-#3 (portfolio, URL, methodology)
2. **GPT odpoví, opraví, navrhne**
3. **Lukas posílá GPT odpověď + tento dokument** Geminimu
4. **Gemini reaguje na GPT, doplní, oponuje**
5. **Claude (já) syntetizuji round 1**
6. **Druhé kolo:** otázky #4-#6 (Phase priority, performance, Mediavine)
7. **Třetí kolo:** finální konsensus → master strategy v2 commit do paměti

**Po debatě:** Aktualizovat `MEMORY.md` index a `TINYUSEFUL_HANDOFF_2026-05-07.md` s novou roadmapou.

---

**Konec diskusního podkladu.**

Tento dokument je strukturován tak, aby:
- GPT viděl kde se shoduje s Geminim a Claudem (konsenzus 1-33)
- GPT/Gemini/Claude měli jasné rozdíly k debatě (sekce 2 A-H)
- Lukas viděl konkrétní rozhodovací body (sekce 7)
- Memory bylo aktualizovatelné po debatě (sekce 8)

**Status: připraveno k debatě.**
