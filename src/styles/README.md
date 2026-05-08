# v2 styles directory

**Status:** scaffold only, not implemented.

## Plánovaná struktura (per GPT Master Plan)

- `tokens.css` — CSS custom properties (colors, spacing, typography scale, radii)
- `base.css` — reset, body, typography baseline
- `layout.css` — containers, grid
- `components/` — per-component CSS (button, field, card, result, ad-slot, breadcrumb, segmented)

## Reference

Current `style.css` (from main, ~1100 lines) je v root jako reference. Při implementaci v2:
- Extrahovat tokens
- Refactorovat na separate component files
- Inline kritickou CSS (~8 KB) v `<head>` per page

## Pending decisions (čekají Master Plan)

- Color palette: current `#C8102E` red OR Claude `#B0312B` OR Gemini `#D32F2F`?
- Typography: system-only OR Newsreader serif heading (current)?
- Dark mode: auto via `prefers-color-scheme` only OR keep manual toggle (current)?
