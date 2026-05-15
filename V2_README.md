> **ARCHIVED 2026-05-15** — pre-rollout branch description. Claims in this
> document ("v2 NOT YET DEPLOYED", "Tip Calculator v2: not started",
> "Master Plan pending") are historical and no longer accurate. Current state:
> v2 hf system fully deployed (homepage + 11/11 tools).
> See [TINYUSEFUL_STATUS_2026-05-15.md](TINYUSEFUL_STATUS_2026-05-15.md).

# TinyUseful v2 — rebuild branch

> **Status:** v2-rebuild branch, NOT YET DEPLOYED. Live verze běží z `main` branch.

## Co je v této branch

Toto je `v2-rebuild` git worktree pro kontrolovaný redesign TinyUseful. Současný code (zděděný z `main`) zde **zatím zůstává jako reference**, dokud nebude:

1. ✅ GPT Master Plan locked
2. ✅ Tip Calculator v2 reference page implementována
3. ✅ Validovány klíčové patterns (Lighthouse, mobile, screen reader)
4. ✅ AdSense schválen na live `main` verzi

Po splnění všech 4 → controlled migration / merge.

## Adresářová struktura

### v2 scaffold (nová struktura, zatím skeleton)

```
src/
  data/tools.json         — manifest skeleton (per-tool metadata)
  styles/                 — tokens.css, base.css, components.css (TBD)
  scripts/                — core.js, calculators/ (TBD)
  templates/              — tool-page.html, homepage.html (TBD)

public/                   — finalní deploy target (zatím prázdné)
  index.html
  calculators/
  methodology/
  about/
  privacy/
  changelog/
  contact/

docs/                     — strategy & design docs
  GPT_REBUILD_PLAN_QUESTIONS_2026-05-07.md
  GPT_ROUND3_MESSAGE_2026-05-07.md
  PHASE58_SPEC_2026-05-07.md
  TINYUSEFUL_HANDOFF_2026-05-07.md
  TINYUSEFUL_STRATEGY_DISCUSSION_2026-05-07.md
```

### Legacy reference (current main code, ZACHOVÁNO jako referenční)

```
index.html, about.html, privacy.html, terms.html, changelog.html, 404.html
{tool}-calculator/index.html  (11 tools)
style.css, theme.js, js/helpers.js
fonts/  (Montserrat, Inter, JetBrains Mono)
favicon.*, og-image*, *.png  (brand assets)
robots.txt, sitemap.xml, ads.txt, humans.txt, _headers, site.webmanifest
.well-known/security.txt
README.md  (zachovaný, source pro main)
TINYUSEFUL_STATUS_2026-05-06.md  (reference)
```

## Pravidla pro v2 work

### 18 non-negotiables
Viz `docs/V2_NON_NEGOTIABLES.md` (zatím v Claude memory, příští commit).

### Klíčové
1. **Preserve current root-level URLs** — `/percentage-calculator/`, `/tip-calculator/`, atd.
   - **NIKDY** migrace na `/tools/<slug>/` nebo `/calculators/<cluster>/<tool>/`
2. **Vanilla HTML/CSS/JS** — žádný framework, build-light max
3. **No accounts, no AI, no YMYL**
4. **AdSense-safe** — žádný ad mezi input a result, no Auto Ads, no sticky
5. **Preview NOT INDEXED** — řešit přes Cloudflare Access, ne `_headers` v repu

### Workflow

```
1. GPT Master Plan locked (čeká)
2. /tip-calculator/ v2 reference implementation
3. Validate (Lighthouse, mobile, screen reader)
4. Roll out template na zbývajících 10 tools (per-cluster batches)
5. AdSense lazy load preparation
6. Merge → main AŽ po AdSense approval na live
```

## Aktuální status

- **Branch:** `v2-rebuild`
- **Worktree:** `E:\tinyuseful-v2\`
- **Started:** 2026-05-07 čtvrtek
- **Setup completed:** 2026-05-08 pátek
- **Master Plan:** pending GPT debate
- **Tip Calculator v2:** not started
- **Live deploy gate:** AdSense approval na `main`

## Co NEDĚLAT v této branch

- ❌ Push do production (deploy AŽ po AdSense approval)
- ❌ Mazat legacy reference soubory (zatím)
- ❌ Modifikovat live `main` worktree (`E:\tinyuseful\`)
- ❌ Začínat code migration bez Master Plan locked
- ❌ Přidávat noindex do `_headers` (forget-at-merge risk)

## Reference: live verze

`https://www.tinyuseful.app` běží z `main` branch beze změny během rebuild work. AdSense review pokračuje na live verzi. Auto Ads OFF (od 2026-05-07 ~10:00 CEST).
