> **ARCHIVED 2026-05-15** — pre-rollout planning document, kept for context.
> Current state: v2 hf system deployed (homepage + 11/11 tools).
> See [TINYUSEFUL_STATUS_2026-05-15.md](../TINYUSEFUL_STATUS_2026-05-15.md).

# Message pro GPT — Round 3 verification

**Kontext pro Lukase:** Toto je hotový text pro GPT. Zkopíruj a pošli, nebo uprav.

---

GPT, díky za druhé kolo master concept research. Měl jsem 6 původních otázek k debatě, které jsi v round 2 nezodpověděl explicitně. Po tvém master concept research jsem je poslal Geminimu. Gemini odpověděl pragmaticky — posunul se z původních ambiciózních pozic na realistic compromise pro solo operátora.

Potřebuju tvůj round 3 review těchto 6 odpovědí. **Souhlasíš, opravil bys, nebo zásadně oponuješ?**

## Gemini's 6 verdikty (round 2 final)

### 1. Portfolio target: **50 tools do 18 měsíců**, 60-65 stretch goal Year 2

Gemini posun: z 60-65 na 50, "při solo kapacitě by 65 nástrojů vedlo k ředění kvality. 50 hlubokých, perfektně odladěných je obhajitelný silný small business."

**Otázka pro tebe:** Souhlasíš s 50 jako primary target? Tvůj round 1 byl 60-65; reaguj na Gemini argument o quality dilution.

### 2. URL strategie: **flat root + cluster pages jako navigation hubs**

Gemini posun: z `/calculators/<cluster>/<tool>/` na "no migration, root-level zachovat, clustery jen jako navigation hubs odkazující přes `<a href>` na existující flat URLs".

**Důvod:** 17 GSC-indexovaných stránek, ztráta indexing kreditu = nepřijatelné riziko.

**Otázka pro tebe:** Souhlasíš s flat URLs (zachovat `/percentage-calculator/`, ne `/calculators/math-basics/percentage-calculator/`)? Cluster hubs jen jako navigation, ne URL hierarchy.

### 3. Methodology depth: **tiered 300-500 simple / 800-1000 complex**

Gemini posun: z "1000-1200 slov FLOOR plošně" na tiered podle commercial value:
- **Simple tools** (Percentage, Tip, Discount, Sales Tax, Date, Time Zone, Unit Converter, Rent Affordability): 300-500 slov
- **Complex E-E-A-T tools** (Mortgage, Loan, Compound Interest, Paint, Tile, Drywall, Mortgage): 800-1000 slov (Lukasovo architectural CKA 04891 expertise = legitimní depth)

**Math:** 50 tools × průměr 500 slov = 25k slov original = ~100 hodin = 6 měsíců při 4 h/týden. Realistic pro solo.

**Otázka pro tebe:** Souhlasíš s tiered approach místo univerzálního floor? Kde by se ti líbil cutoff pro "simple" vs "complex"?

### 4. Phase priority: **Phase 58 (rollout) PŘED Phase 63 (Home Projects)**

Gemini argument: "Nemůžeš nechat současných 10 nástrojů obsahově 'tenkých' a vrhnout se na stavbu dalších. Google tě teď hodnotí."

Locked sequence:
```
Phase 58 (methodology rollout na 10 současných tools)
  → AdSense approval
  → Phase 59a (AdSense lazy load)
  → Phase 60 (JSON-LD WebApplication)
  → Phase 61 (Search bar — defer until 25+ tools)
  → Phase 62 (Cluster hubs)
  → Phase 63 ⭐ Home Projects vertikála (Paint, Tile, Square Footage, Drywall, atd.)
  → Phase 64+ NEW tools (Salary to Hourly, Prorated Rent, atd.)
```

**Otázka pro tebe:** Souhlasíš s touto sekvencí? Tvoje original navrhuje "First New Calculators" před Home Projects — má to ještě smysl při 50 tool target a Lukasovo architektonickém pozadí?

### 5. Performance targets: **LCP ≤ 2.0s, INP ≤ 150ms, CLS ≤ 0.05**

Gemini posun: z <1.2s LCP / <50ms INP na "sweet spot" 2.0s / 150ms.

**Naše current PSI mobile (Percentage Calc post-Auto Ads OFF):** LCP 2.3s, INP via TBT 90ms, CLS 0.002.

Gemini quote: "Netrav desítky hodin honěním milisekund, cost/benefit se láme. Udrž si Web Vitals v 'zelené' zóně a raději věnuj čas psaní kvalitních metodik."

**Otázka pro tebe:** Souhlasíš s LCP ≤2.0s jako floor (ne aspiration <1.5s)? Po AdSense lazy load (Phase 59a) klesne pod 2.0s naturally.

### 6. Mediavine path: **NO BLOG, Home Projects calculators ARE the content** ⭐

Gemini KRITICKÝ STRATEGIC SHIFT: smazat plán "12 blog článků k Mediavine threshold". Místo toho deep methodology na Home Projects calculators.

Argument: "Lidé sem nechodí číst eseje. Výborně zpracovaná kalkulačka na spotřebu barvy s 1000 slovy architektonických tipů funguje organicky lépe než separátní článek 'Jak vymalovat pokoj'."

Lukasovo competitive moat:
- CKA 04891 (Czech architectural authorization)
- room411.architects studio
- Real construction expertise (NEfakeable AI-spinned content)
- E-E-A-T signal pro Paint/Tile/Drywall calculators je legitimní

**Otázka pro tebe:** Souhlasíš s "no blog" strategy? Tvoje original zmiňoval "blog content" jako signal for AdSense; Gemini říká calculator methodology depth je better.

## Co potřebuju od tebe

Pro každou ze 6 otázek:
- **AGREE** — souhlasíš, můžeme uzamknout
- **AMEND** — souhlasíš v principu, ale tady je tvoje úprava
- **DISAGREE** — fundamental opposition, tady je tvůj argument

Po tvé odpovědi commit Master Strategy v2 do paměti jako final konsenzus 3-AI a začneme Phase 58.

**Side note:** Phase 58 spec budu psát paralelně s tvojí review (Path C). Pokud zásadně neoponuješ čemu, revize bude minimální. Pokud ano, počkám.

---

**Konec message.**
