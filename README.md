# TinyUseful

> Tiny calculators for everyday decisions. No account. Inputs stay in your browser. No AI.

**Live:** [tinyuseful.app](https://www.tinyuseful.app)

## What this is

Eleven small browser-based calculators on their own pages — money, units, dates,
time zones. That's it. Built as a quiet alternative to the bloated, ad-heavy,
AI-everywhere calculator websites that dominate Google search results in 2026.

For when you don't need a chat — just the answer.

## The eleven tools

**Money** — Percentage · Sales Tax / VAT · Mortgage · Loan · Compound Interest ·
Rent Affordability · Tip · Discount

**Conversions** — Unit Converter (length, weight, temperature) · Date Calculator ·
Time Zone Converter

## Stack

- Vanilla HTML, CSS, and JavaScript
- No framework, no build step, no bundler
- Self-hosted fonts (Montserrat, Inter, JetBrains Mono — all SIL OFL)
- Static deploy on Cloudflare Pages from `main` branch
- One declared advertising slot per page (Google AdSense)
- No tracking pixels, no analytics with personal identifiers, no cookies

## Why no AI

AI is great at writing emails. It is a wasteful, unverifiable tool for arithmetic.
A mortgage payment, a sales tax, a tip on a $42 dinner — these have one correct
answer each. No probability, no hallucination, no "let me try that again."

The math runs locally in your browser using standard textbook formulas. You can
verify any result with a pencil. That is the whole point.

## How to read the source

Each tool lives at its own URL: `/<tool-slug>/index.html`. The shared stylesheet
is `/style.css`. Theme toggle (light/dark) is in `/theme.js`. Schema markup,
Open Graph, and meta tags are in each page's `<head>`.

There is no JavaScript framework. There is no build artifact. What you see in
the source is what runs in the browser.

## License

The site source code is published for transparency, not as a template to fork.
If you want to build something similar, please don't copy — build your own
small useful site. The world has room for more of those.

Fonts are SIL Open Font License. Site copy and design are © TinyUseful 2026.

## Contact

bug reports, ideas, feedback — `contact@tinyuseful.app`
