TinyUseful — self-hosted fonts
==============================

This folder contains the .woff2 font files used by the site.
Self-hosting them removes the dependency on Google's CDN, which
is consistent with our "no third-party tracking" positioning.

Required files (must be named exactly):

  newsreader-300.woff2       Newsreader Light
  newsreader-400.woff2       Newsreader Regular
  newsreader-500.woff2       Newsreader Medium
  newsreader-700.woff2       Newsreader Bold
  jetbrains-mono-400.woff2   JetBrains Mono Regular
  jetbrains-mono-500.woff2   JetBrains Mono Medium

Source: google-webfonts-helper (https://gwfh.mranftl.com/)
   - Newsreader:    latin subset, weights 300/400/500/700
   - JetBrains Mono: latin subset, weights 400/500

Both fonts are licensed under the SIL Open Font License (OFL),
which permits self-hosting and redistribution for any use.

Loaded via @font-face in /style.css.
