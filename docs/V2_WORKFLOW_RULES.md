# v2 rebuild workflow rules

**Locked:** 2026-05-08 (per GPT round 5 controlled-scaffold guidance)

## Co Claude (a future contributor) MŮŽE dělat v této branch

✅ Vytvářet nové soubory v `src/`, `public/`, `docs/`
✅ Editovat `V2_README.md`, `V2_WORKFLOW_RULES.md`
✅ Aktualizovat `src/data/tools.json` manifest
✅ Vytvářet placeholder/scaffold soubory pro discussion
✅ Cherry-pick z legacy reference (`git checkout main -- <file>`) když potřebuje pattern reference

## Co Claude NESMÍ dělat (yet)

❌ Mazat existující legacy files (tool dirs, helpers.js, style.css, fonts, images)
❌ Modifikovat live `main` worktree (`E:\tinyuseful\`)
❌ Push do production (production = main branch)
❌ Přidat `_headers` noindex v root (forget-at-merge risk)
❌ Začít code migration bez Master Plan locked
❌ Přejmenovat existing legacy soubory bez explicit Lukas approval

## Order of operations

```
1. ✅ Setup git worktree + scaffold (DONE 2026-05-08)
2. ⏳ GPT Master Plan locked (pending Lukas + GPT debate)
3. ⏳ /tip-calculator/ v2 reference implementation
4. ⏳ Validate (Lighthouse mobile, screen reader, real device)
5. ⏳ Roll out template na 9 dalších current tools
6. ⏳ Methodology depth pass (300-1000 slov tiered)
7. ⏳ AdSense lazy load preparation
8. ⏳ AdSense approval na live main (gating)
9. ⏳ Final review + acceptance gate
10. ⏳ Merge v2-rebuild → main, production deploy
```

## Decision gating

### Gate 1: Master Plan
**Před start implementation:** Lukas + GPT mají comprehensive Master Plan.
- File structure
- Color palette decision
- Typography decision
- Tool page anatomy
- Methodology structure
- AdSense placement strategy
- Performance budget

### Gate 2: Tip Calculator validation
**Před rollout na 9 dalších tools:**
- Lighthouse mobile: Performance ≥95, A11y 100, BP 100, SEO 95+
- LCP ≤2.0s, INP ≤150ms, CLS ≤0.05
- Real device test (iPhone SE, Pixel 5)
- Screen reader pass (VoiceOver, NVDA)
- Keyboard navigation full pass
- 200% zoom validation

### Gate 3: Production deploy
**Před merge v2-rebuild → main:**
- AdSense schválený na live main
- Všech 11 tools v2 implementováno
- Sitemap regenerated
- All internal links work
- 301 redirects (pokud needed) configured
- Backup current main commit hash documented

## Co dělat pokud GPT navrhne porušit pravidlo

1. **STOP** — nepokračuj s změnou
2. **Pojmenuj konflikt** v Lukasově messagi
3. **Cituj relevantní pravidlo** (V2 non-negotiables nebo tento workflow)
4. **Counsel:** Lukas decides override OR upravit GPT návrh

## Co dělat při AdSense approval

1. **Daily ritual** kontroluje status (Lukas)
2. Pokud "Příprava" → "Připraveno":
   - Otevři AdSense lazy load implementation
   - Spusť Gate 3 acceptance review
   - Poté merge

## Memory references

- `tinyuseful_REBUILD_MODE_2026-05-07.md` — kontext rebuild rozhodnutí
- `tinyuseful_v2_non_negotiables.md` — 18 binding rules
- `tinyuseful_master_strategy_v2_2026-05-07.md` — 2-AI consensus draft
- `tinyuseful_master_concept_research_*` — 3 deep research dokumenty
