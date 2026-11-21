import { copyFileSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
const publicFiles = new Set([
  'index.html', 'about.html', 'changelog.html', 'privacy.html', 'terms.html', '404.html',
  '_headers', '.well-known/security.txt', 'ads.txt', 'humans.txt', 'robots.txt', 'sitemap.xml',
  'style.css', 'theme.js', 'js/helpers.js', 'site.webmanifest',
  'favicon.ico', 'favicon.svg', 'favicon-96x96.png', 'apple-touch-icon.png',
  'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png', 'og-image04.png', 'og-image05.jpg'
]);

// Only public tool routes in the sitemap and fonts used by the stylesheet are shipped.
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
for (const [, slug] of sitemap.matchAll(/<loc>https:\/\/www\.tinyuseful\.app\/([a-z0-9-]+)\/<\/loc>/g)) {
  publicFiles.add(slug + '/index.html');
}
const stylesheet = readFileSync(join(root, 'style.css'), 'utf8');
for (const [, font] of stylesheet.matchAll(/url\(['"]?\/(fonts\/[\w-]+\/[\w.-]+\.woff2)['"]?\)/g)) {
  publicFiles.add(font);
}

// Always rebuild this fixed output directory so removed files cannot survive a later build.
rmSync(output, { recursive: true, force: true });
for (const file of publicFiles) {
  const destination = join(output, file);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(join(root, file), destination);
}
console.log('Prepared ' + publicFiles.size + ' public files in dist/');
