import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const origin = 'https://tinyuseful.test';
const build = new URL('../dist/', import.meta.url);
const types = { html: 'text/html', css: 'text/css', js: 'text/javascript', woff2: 'font/woff2' };

test.use({ channel: 'chrome', serviceWorkers: 'block' });

// Exercise the packaged public site with its real fonts and no third-party requests.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    const file = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
    try {
      const body = await readFile(new URL('.' + file, build));
      await route.fulfill({ body, contentType: types[file.split('.').pop()] || 'application/octet-stream' });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await route.fulfill({ status: 404, body: '' });
    }
  });
});

async function checkSingleLineAmount(result) {
  const bounds = await result.evaluate(el => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return {
      lines: range.getClientRects().length,
      right: range.getBoundingClientRect().right,
      rowRight: el.parentElement.getBoundingClientRect().right
    };
  });
  expect(bounds.lines).toBe(1);
  expect(bounds.right).toBeLessThanOrEqual(bounds.rowRight + 1);
}

for (const width of [320, 360, 390, 1280]) {
  test('compound interest fits at ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(origin + '/compound-interest-calculator/');
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const result = page.locator('#ci-val');
    const apr = page.getByRole('textbox', { name: 'Annual percentage rate' });
    await apr.fill('0');
    await expect(result).toHaveText('130,000');
    await checkSingleLineAmount(result);

    await page.locator('#ci-start').fill('123456789012345');
    await expect(result).toHaveText('123,456,789,132,345');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('320 px fallback font keeps the default amount on one line', async ({ page }) => {
  await page.route('**/*.woff2', route => route.abort());
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(origin + '/compound-interest-calculator/');
  await page.evaluate(() => document.fonts.ready.then(() => true));
  await checkSingleLineAmount(page.locator('#ci-val'));
});

test('100 dollars split equally among three people preserves every cent', async ({ page }) => {
  await page.goto(origin + '/bill-split-calculator/');
  await page.locator('#bs-people').selectOption('3');
  await page.locator('#bs-shared').fill('100');
  for (const id of ['bs-p-1', 'bs-p-2', 'bs-p-3', 'bs-tax', 'bs-tip']) {
    await page.locator('#' + id).fill('0');
  }
  await expect(page.locator('#bs-break .v')).toHaveText([
    '$33.34', '$33.33', '$33.33', '$100.00 = bill total ✓'
  ]);
});
