import { test, expect } from '@playwright/test'

test.use({ hasTouch: true, deviceScaleFactor: 2, viewport: { width: 390, height: 844 } })

async function mount(page) {
  await page.goto('/tests/fixture.html')
  await page.waitForFunction(() => window.testReady)
  await page.evaluate(async () => {
    document.querySelector('#app').hidden = true
    window.pointerTypes = []
    window.actionClicks = 0
    window.quantityChanges = []
    document.addEventListener('pointerdown', event => window.pointerTypes.push(event.pointerType))
    window.instance = await window.Zircle.createZircle({
      mount: '#host', initialView: 'home', theme: 'white',
      // Keep the library defaults: these tests exercise the actual transition policy.
      views: {
        home: `<z-view image-path="/earth.png">
          <z-spot slot="extension" id="open-child" to-view="child" angle="0" distance="115" label="Open Moon">+</z-spot>
        </z-view>`,
        child: () => {
          const view = document.createElement('z-view')
          view.imagePath = '/moon.png'
          const button = document.createElement('button')
          button.id = 'child-action'
          button.textContent = 'Action'
          button.addEventListener('click', () => window.actionClicks++)
          const spot = document.createElement('z-spot')
          spot.id = 'child-knob'
          spot.slot = 'extension'
          spot.knob = true
          spot.size = 'large'
          spot.angle = 90
          spot.distance = 130
          spot.qty = 0
          spot.min = 0
          spot.max = 100
          spot.label = 'Value'
          spot.addEventListener('change', event => window.quantityChanges.push(event.detail.qty))
          view.append(button, spot)
          return view
        }
      }
    })
  })
}

async function current(page, name) {
  await expect.poll(() => page.evaluate(() => ({
    name: window.instance.getCurrentViewName(), busy: window.instance.app.blockEvents
  }))).toEqual({ name, busy: false })
}

async function centeredViewAndImage(page) {
  await expect.poll(() => page.evaluate(() => {
    const canvas = window.instance.canvas.getBoundingClientRect()
    const node = window.instance.canvas.querySelector('.is-current-view')
    const image = node?.querySelector('img.z-image-source')
    if (!image?.complete || image.naturalWidth === 0) return Number.MAX_SAFE_INTEGER
    const view = node.getBoundingClientRect()
    const picture = image.getBoundingClientRect()
    return Math.max(
      Math.abs(canvas.x + canvas.width / 2 - view.x - view.width / 2),
      Math.abs(canvas.y + canvas.height / 2 - view.y - view.height / 2),
      Math.abs(view.x + view.width / 2 - picture.x - picture.width / 2),
      Math.abs(view.y + view.height / 2 - picture.y - picture.height / 2)
    )
  })).toBeLessThan(1.5)
}

test('real touch navigation and mixed control input retain state at double pixel density', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await mount(page)
  expect(await page.evaluate(() => window.devicePixelRatio)).toBe(2)
  await current(page, 'home')
  await centeredViewAndImage(page)
  await page.locator('#open-child').tap()
  await current(page, 'child')
  await centeredViewAndImage(page)

  // A real touch at the bottom of the ring is 90 degrees: 25% of its range.
  const knob = page.locator('#child-knob > z-knob')
  await expect(knob).toBeVisible()
  const ring = await knob.boundingBox()
  expect(ring).not.toBeNull()
  const receivesPointer = await page.evaluate(({ x, y }) =>
    document.elementFromPoint(x, y)?.closest('z-knob') === document.querySelector('#child-knob > z-knob'),
  { x: ring.x + ring.width / 2, y: ring.y + ring.height - 4 })
  expect(receivesPointer, 'The knob ring must receive pointer input above the spot surface').toBe(true)
  await page.touchscreen.tap(ring.x + ring.width / 2, ring.y + ring.height - 4)
  await expect(knob).toHaveAttribute('aria-valuenow', '25')
  await expect(page.locator('#child-knob')).toHaveAttribute('qty', '25')
  expect(await page.evaluate(() => window.quantityChanges)).toEqual([25])
  await current(page, 'child')

  // Switching input methods must not activate background back navigation.
  await page.locator('#child-action').click()
  await page.locator('#child-action').tap()
  await knob.press('ArrowRight')
  await expect(knob).toHaveAttribute('aria-valuenow', '26')
  expect(await page.evaluate(() => ({
    clicks: window.actionClicks, changes: window.quantityChanges, history: window.instance.getHistory()
  }))).toEqual({ clicks: 2, changes: [25, 26], history: ['home', 'child'] })
  await current(page, 'child')
  await page.getByRole('button', { name: 'Go back', exact: true }).tap()
  await current(page, 'home')
  await centeredViewAndImage(page)
  await expect(page.locator('#host .z-back')).toBeHidden()
  expect(await page.evaluate(() => window.pointerTypes)).toContain('touch')
  // Firefox's touch emulation can classify compatibility pointers as touch;
  // the click/tap counts above verify both activation paths without assuming it.
  expect(errors).toEqual([])
})

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('default depth and back complete without motion or a pending navigation lock', async ({ page }) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await mount(page)
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
    const result = await page.evaluate(async () => {
      const start = performance.now()
      await window.instance.setView('child')
      const entered = performance.now()
      const current = window.instance.canvas.querySelector('.is-current-view')
      const forward = {
        name: window.instance.getCurrentViewName(), busy: window.instance.app.blockEvents,
        duration: getComputedStyle(current).transitionDuration,
        filteredViews: window.instance.canvas.querySelectorAll('.has-effect').length
      }
      await window.instance.back()
      return {
        forward,
        back: { name: window.instance.getCurrentViewName(), busy: window.instance.app.blockEvents },
        enterMs: entered - start,
        backMs: performance.now() - entered,
        history: window.instance.getHistory()
      }
    })
    expect(result.forward).toEqual({ name: 'child', busy: false, duration: '0s', filteredViews: 0 })
    expect(result.back).toEqual({ name: 'home', busy: false })
    expect(result.history).toEqual(['home'])
    // Generous scheduling allowance, still distinctly below the normal 700 ms transition.
    expect(result.enterMs).toBeLessThan(500)
    expect(result.backMs).toBeLessThan(500)
    await centeredViewAndImage(page)
    await expect(page.locator('#host .z-back')).toBeHidden()
    expect(errors).toEqual([])
  })
})
