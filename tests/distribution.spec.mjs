import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const vendorFiles = {
  '/tests/vendor/orbit.mjs': new URL('../node_modules/@zumer/orbit/dist/orbit.mjs', import.meta.url),
  '/tests/vendor/zumly.mjs': new URL('../node_modules/zumly/dist/zumly.mjs', import.meta.url)
}

function fixture(distribution) {
  const scripts = distribution === 'iife'
    ? '<script defer src="/dist/zircle.iife.js"></script>'
    : `<script type="importmap">${JSON.stringify({ imports: {
      '@zumer/orbit': '/tests/vendor/orbit.mjs',
      zumly: '/tests/vendor/zumly.mjs'
    } })}</script>
    <script type="module">import * as Zircle from '/dist/zircle.js'; window.Zircle = Zircle;</script>`
  return `<!doctype html><html lang="en"><head>
    <meta charset="utf-8"><title>Zircle ${distribution} distribution</title>
    <link rel="stylesheet" href="/dist/zircle.css">
    <style>body{margin:0;font:16px system-ui}z-canvas{display:block;width:720px;height:640px}</style>
    ${scripts}
  </head><body>
    <z-canvas id="canvas" initial-view="home" theme="blue" mode="light" aria-label="Distribution example">
      <template data-view="home"><z-view>
        <h1>Browser distribution</h1>
        <z-spot slot="extension" to-view="next" angle="0" distance="100" label="Open next view">+</z-spot>
      </z-view></template>
      <template data-view="next"><z-view><h1>Next view</h1></z-view></template>
    </z-canvas>
    <script>
      const canvas = document.querySelector('z-canvas');
      canvas.options = { transitions: { duration: '60ms' } };
      window.distributionErrors = [];
      canvas.addEventListener('zircle:error', event => window.distributionErrors.push(event.detail.error.message));
      customElements.whenDefined('z-canvas').then(async () => {
        window.distributionInstance = await canvas.ready;
        window.distributionReady = true;
      });
    </script>
  </body></html>`
}

for (const distribution of ['iife', 'external-esm']) {
  test(`${distribution} distribution initializes plain HTML and performs pointer zoom/back`, async ({ page }) => {
    // Playwright gives each case a fresh page/context: custom-element registries never mix bundles.
    const pageErrors = []
    const vendorRequests = []
    page.on('pageerror', error => pageErrors.push(error.message))
    page.on('request', request => {
      const pathname = new URL(request.url()).pathname
      if (pathname.startsWith('/tests/vendor/')) vendorRequests.push(pathname)
    })
    await page.route('**/tests/distribution.html', route => route.fulfill({
      status: 200, contentType: 'text/html', body: fixture(distribution)
    }))
    // Serve installed, pinned dependencies verbatim. The dev server stays read-only
    // and does not need to expose node_modules or broaden its public directories.
    for (const [pathname, file] of Object.entries(vendorFiles)) {
      await page.route(`**${pathname}`, async route => route.fulfill({
        status: 200, contentType: 'text/javascript', body: await readFile(file, 'utf8')
      }))
    }
    await page.goto('/tests/distribution.html')
    await page.waitForFunction(() => window.distributionReady)
    expect(await page.evaluate(() => ({
      global: typeof window.Zircle.createZircle,
      orbit: typeof window.Zircle.Orbit.refresh,
      zumly: typeof window.Zircle.Zumly,
      elements: ['z-canvas', 'z-view', 'z-spot', 'o-progress'].every(name => Boolean(customElements.get(name))),
      history: window.distributionInstance.getHistory()
    }))).toEqual({ global: 'function', orbit: 'function', zumly: 'function', elements: true, history: ['home'] })
    await expect(page.locator('#canvas .is-current-view h1')).toHaveText('Browser distribution')
    await expect(page.locator('#canvas .z-back')).toBeHidden()
    const spot = page.locator('#canvas .is-current-view z-spot[to-view="next"]')
    await expect(spot).toHaveCSS('border-radius', '50%')
    const geometry = await spot.evaluate(element => {
      const parent = element.closest('z-view').getBoundingClientRect()
      const bounds = element.getBoundingClientRect()
      return { width: bounds.width, dx: bounds.x + bounds.width / 2 - parent.x - parent.width / 2 }
    })
    expect(geometry.width).toBeGreaterThan(30)
    expect(geometry.dx).toBeGreaterThan(100)
    await spot.click()
    await expect.poll(() => page.evaluate(() => window.distributionInstance.getCurrentViewName())).toBe('next')
    await expect(page.locator('#canvas .is-current-view h1')).toHaveText('Next view')
    await page.getByRole('button', { name: 'Go back', exact: true }).click()
    await expect.poll(() => page.evaluate(() => window.distributionInstance.getCurrentViewName())).toBe('home')
    await expect(page.locator('#canvas .is-current-view h1')).toHaveText('Browser distribution')
    await expect(page.locator('#canvas .z-back')).toBeHidden()
    if (distribution === 'iife') {
      await expect(page.locator('script[type="module"], script[type="importmap"]')).toHaveCount(0)
      expect(vendorRequests).toEqual([])
    } else {
      expect(vendorRequests.sort()).toEqual(Object.keys(vendorFiles).sort())
    }
    expect(await page.evaluate(() => window.distributionErrors)).toEqual([])
    expect(pageErrors).toEqual([])
  })
}
