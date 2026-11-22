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

async function readAmountLayout(result) {
  return result.evaluate(el => {
    const lines = [];
    const text = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let right = 0;
    let lastTop = null;
    while (text.nextNode()) {
      const node = text.currentNode;
      for (let i = 0; i < node.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (lastTop === null || Math.abs(rect.top - lastTop) > 1) lines.push('');
        lines[lines.length - 1] += node.data[i];
        lastTop = rect.top;
        right = Math.max(right, rect.right);
      }
    }
    return {
      lines,
      right,
      fontSize: parseFloat(getComputedStyle(el).fontSize),
      rowRight: el.parentElement.getBoundingClientRect().right
    };
  });
}

async function checkSingleLineAmount(result) {
  const bounds = await readAmountLayout(result);
  expect(bounds.lines).toHaveLength(1);
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
    if (width === 390 || width === 1280) {
      expect((await readAmountLayout(result)).fontSize).toBe(80);
    }

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

for (const fallback of [false, true]) {
  test('results keep digit groups and regain their size after resizing, fallback=' + fallback, async ({ page }) => {
    if (fallback) await page.route('**/*.woff2', route => route.abort());
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto(origin + '/compound-interest-calculator/');
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const result = page.locator('#ci-val');
    if (!fallback) expect((await readAmountLayout(result)).fontSize).toBe(80);
    await page.locator('#ci-apr').fill('0');
    await page.locator('#ci-monthly').fill('0');
    for (const digits of ['202197406', '123456789012345']) {
      await page.locator('#ci-start').fill(digits);
      const formatted = Number(digits).toLocaleString('en-US');
      await expect(result).toHaveText(formatted);
      for (const width of [320, 360, 390, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        await expect(async () => {
          const layout = await readAmountLayout(result);
          expect(layout.lines.join('')).toBe(formatted);
          expect(layout.lines.slice(0, -1).every(line => line.endsWith(','))).toBe(true);
          expect(layout.right).toBeLessThanOrEqual(layout.rowRight + 1);
          expect(layout.fontSize).toBeGreaterThanOrEqual(34);
        }).toPass({ timeout: 2000 });
      }
    }
    await page.locator('#ci-start').fill('10');
    await expect(result).toHaveText('10');
    await page.setViewportSize({ width: 390, height: 800 });
    await expect(result).toHaveCSS('font-size', '80px');
  });
}

test('the main balance exposes one accessible amount and copies the full wrapped value', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.route('**/*.woff2', route => route.abort());
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: async text => { window.copiedText = text; } }
  }));
  await page.goto(origin + '/compound-interest-calculator/');
  const status = page.getByRole('status');
  const headline = status.locator('.r-num');
  const start = page.locator('#ci-start');
  await expect(headline).toMatchAriaSnapshot('- text: $300,851');
  await start.fill('123456789012345');
  await expect(headline).toMatchAriaSnapshot('- text: $498,609,730,215,218');
  const layout = await readAmountLayout(page.locator('#ci-val'));
  expect(layout.lines.length).toBeGreaterThan(1);
  await page.getByRole('button', { name: 'Copy result to clipboard' }).click();
  expect(await page.evaluate(() => window.copiedText)).toBe('Future value: $498,609,730,215,218');
  await start.fill('');
  await expect(headline).toMatchAriaSnapshot('- text: —');
  await start.fill('10000');
  await expect(headline).toMatchAriaSnapshot('- text: $300,851');
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
