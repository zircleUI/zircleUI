import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/tests/fixture.html')
  await page.waitForFunction(() => window.testReady)
  await page.locator('#app').evaluate(node => { node.hidden = true })
})

const sources = {
  home: '<z-view><h1>Home</h1><input aria-label="Saved text" value="initial"><z-spot data-next to-view="one" angle="0" distance="100">One</z-spot></z-view>',
  one: '<z-view><h1>One</h1><z-spot data-next to-view="two" angle="90" distance="100">Two</z-spot></z-view>',
  two: '<z-view><h1>Two</h1><z-spot size="large" angle="0" distance="90">Group<z-spot data-next to-view="three" angle="-90" size="small" distance="100">Three</z-spot></z-spot></z-view>',
  three: '<z-view><h1>Three</h1><z-spot data-next to-view="four" angle="180" distance="100">Four</z-spot></z-view>',
  four: '<z-view><h1>Four</h1></z-view>'
}

async function mount (page, options = {}) {
  await page.evaluate(async ({ views, options }) => {
    window.navigationEvents = []
    window.instance = await window.Zircle.createZircle({
      mount: '#host', initialView: 'home', views, transitions: { driver: 'none' }, ...options
    })
    window.instance.on('viewchange', event => window.navigationEvents.push(event.detail))
  }, { views: sources, options })
}

async function current (page, name) {
  await expect.poll(() => page.evaluate(() => ({
    name: window.instance.getCurrentViewName(), busy: window.instance.app.blockEvents
  }))).toEqual({ name, busy: false })
}

async function next (page, name, keyboard = false) {
  const trigger = page.locator('#host .is-current-view z-spot[data-next]')
  if (keyboard) { await trigger.focus(); await trigger.press('Enter') }
  else await trigger.click()
  await current(page, name)
}

async function centered (page, expectedSize) {
  await expect.poll(() => page.evaluate(() => {
    const canvas = window.instance.canvas.getBoundingClientRect()
    const current = window.instance.canvas.querySelector('.is-current-view')
    if (!current) return Number.MAX_SAFE_INTEGER
    const view = current.getBoundingClientRect()
    return Math.max(Math.abs(canvas.x + canvas.width / 2 - view.x - view.width / 2),
      Math.abs(canvas.y + canvas.height / 2 - view.y - view.height / 2))
  })).toBeLessThan(1.5)
  if (expectedSize !== undefined) {
    await expect.poll(() => page.evaluate(() => window.instance.canvas.querySelector('.is-current-view').getBoundingClientRect().width)).toBeCloseTo(expectedSize, 0)
  }
}

test('square canvas and original root surface start centered in an arbitrary host', async ({ page }) => {
  await page.locator('#host').evaluate(node => { node.style.cssText = 'width:1100px;height:500px;margin-left:20px;position:relative' })
  await mount(page)
  const scene = await page.evaluate(() => {
    const canvas = window.instance.canvas.getBoundingClientRect()
    const host = window.instance.mount.getBoundingClientRect()
    return { width: canvas.width, height: canvas.height, dx: canvas.x - host.x, dy: canvas.y - host.y, history: window.instance.getHistory() }
  })
  expect(scene).toEqual({ width: 500, height: 500, dx: 300, dy: 0, history: ['home'] })
  await centered(page, 250)
  await expect(page.locator('#host .z-back')).toBeHidden()
})

test('pointer and keyboard depth navigation retain DOM state through deep back', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await mount(page, { transitions: { driver: 'css', duration: '60ms' } })
  await page.getByRole('textbox', { name: 'Saved text' }).fill('Remember me')
  await page.evaluate(() => {
    window.rootNode = window.instance.canvas.querySelector('.is-current-view')
    window.inputNode = window.rootNode.querySelector('input')
  })
  await next(page, 'one')
  await next(page, 'two', true)
  await next(page, 'three')
  await next(page, 'four', true)
  expect(await page.evaluate(() => window.instance.getHistory())).toEqual(['home', 'one', 'two', 'three', 'four'])
  expect(await page.evaluate(() => window.rootNode.isConnected)).toBe(false)
  await centered(page)
  for (const name of ['three', 'two', 'one', 'home']) {
    await page.locator('#host .z-back').click()
    await current(page, name)
    await centered(page)
  }
  await expect(page.getByRole('textbox', { name: 'Saved text' })).toHaveValue('Remember me')
  expect(await page.evaluate(() => window.instance.canvas.querySelector('.is-current-view') === window.rootNode && window.rootNode.querySelector('input') === window.inputNode)).toBe(true)
  expect(await page.evaluate(() => window.navigationEvents.map(event => event.depth))).toEqual([1, 2, 3, 4, 3, 2, 1, 0])
  await expect(page.locator('#host .z-back')).toBeHidden()
  expect(errors).toEqual([])
})

test('recursive views with the same registered name keep separate depth instances', async ({ page }) => {
  await page.evaluate(async () => {
    window.created = 0
    window.instance = await window.Zircle.createZircle({
      mount: '#host', initialView: 'item', transitions: { driver: 'none' },
      views: { item: () => `<z-view data-instance="${++window.created}"><h1>Item ${window.created}</h1><z-spot data-next to-view="item">Next</z-spot></z-view>` }
    })
  })
  for (let depth = 2; depth <= 4; depth++) {
    await page.locator('#host .is-current-view z-spot[data-next]').click()
    await expect(page.locator('#host .is-current-view')).toHaveAttribute('data-instance', String(depth))
  }
  expect(await page.evaluate(() => window.instance.getHistory())).toEqual(['item', 'item', 'item', 'item'])
  for (let depth = 3; depth >= 1; depth--) {
    await page.evaluate(() => window.instance.back())
    await expect(page.locator('#host .is-current-view')).toHaveAttribute('data-instance', String(depth))
  }
  expect(await page.evaluate(() => window.created)).toBe(4)
})

test('independent instances isolate theme, current view, history and teardown', async ({ page }) => {
  await page.evaluate(async views => {
    const host = document.querySelector('#host')
    host.style.display = 'flex'
    for (const id of ['left', 'right']) {
      const node = document.createElement('div')
      node.id = id
      node.style.cssText = 'position:relative;width:50%;height:480px'
      host.append(node)
    }
    window.left = await window.Zircle.createZircle({ mount: '#left', initialView: 'home', views, theme: 'white', transitions: { driver: 'none' } })
    window.right = await window.Zircle.createZircle({ mount: '#right', initialView: 'home', views, theme: 'blue', transitions: { driver: 'none' } })
  }, sources)
  await page.locator('#left .is-current-view z-spot[data-next]').click()
  await expect.poll(() => page.evaluate(() => window.left.getCurrentViewName())).toBe('one')
  expect(await page.evaluate(() => ({ view: window.right.getCurrentViewName(), history: window.right.getHistory(), theme: window.right.getTheme() }))).toEqual({ view: 'home', history: ['home'], theme: 'blue' })
  await page.evaluate(() => { window.left.setTheme('orange'); window.left.destroy() })
  await expect(page.locator('#left .zumly-canvas')).toHaveCount(0)
  await page.locator('#right .is-current-view z-spot[data-next]').click()
  await expect.poll(() => page.evaluate(() => window.right.getCurrentViewName())).toBe('one')
  expect(await page.evaluate(() => window.right.getTheme())).toBe('blue')
})

test('element mounts preserve authored host children and styles across destroy/remount', async ({ page }) => {
  const result = await page.evaluate(async views => {
    const host = document.querySelector('#host')
    host.style.position = 'static'
    const marker = document.createElement('button')
    marker.textContent = 'Host content'
    let clicks = 0
    marker.addEventListener('click', () => clicks++)
    host.append(marker)
    const instance = await window.Zircle.createZircle({ mount: host, views, transitions: { driver: 'none' } })
    const during = host.style.position
    let duplicate = ''
    try { await window.Zircle.createZircle({ mount: host, views }) } catch (error) { duplicate = error.message }
    instance.destroy()
    instance.destroy()
    marker.click()
    const after = { sameNode: host.firstElementChild === marker, children: host.children.length, position: host.style.position, clicks }
    const next = await window.Zircle.createZircle({ mount: host, views, transitions: { driver: 'none' } })
    next.destroy()
    return { during, duplicate, after, remounted: host.children.length === 1 }
  }, sources)
  expect(result.during).toBe('relative')
  expect(result.duplicate).toContain('already has an instance')
  expect(result.after).toEqual({ sameNode: true, children: 1, position: 'static', clicks: 1 })
  expect(result.remounted).toBe(true)
})

test('invalid inputs and failed renderers reject without leaving partial instances', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const errors = []
    const views = { home: '<z-view>Home</z-view>' }
    for (const options of [
      { mount: '#absent', views },
      { mount: document.createElement('div'), views },
      { mount: '#host', views: {} },
      { mount: '#host', views, initialView: 'absent' },
      { mount: '#host', views, theme: 'absent' }
    ]) {
      try { await window.Zircle.createZircle(options) } catch (error) { errors.push(error.message) }
    }
    let cleanup = 0
    try {
      await window.Zircle.createZircle({ mount: '#host', views: { broken: ({ onCleanup }) => { onCleanup(() => cleanup++); throw new Error('render failed') } } })
    } catch (error) { errors.push(error.message) }
    const leaked = document.querySelectorAll('#host .z-stage').length
    const instance = await window.Zircle.createZircle({ mount: '#host', views, transitions: { driver: 'none' } })
    let missingTarget = ''
    try { await instance.goTo('missing') } catch (error) { missingTarget = error.message }
    instance.destroy()
    return { errors, cleanup, leaked, missingTarget }
  })
  expect(result.errors).toHaveLength(6)
  expect(result.cleanup).toBe(1)
  expect(result.leaked).toBe(0)
  expect(result.missingTarget).toContain('not registered')
})

test('factory contexts retain mount identity and cleanup runs exactly once per discarded view', async ({ page }) => {
  await page.evaluate(async () => {
    window.cleanupCalls = []
    window.contexts = []
    const factory = name => ({ target, onCleanup, props, context }) => {
      target.className = 'framework-view'
      target.style.cssText = 'width:300px;height:300px'
      target.innerHTML = `<h1>${name}</h1><input value="${name}">`
      onCleanup(() => window.cleanupCalls.push(name))
      window.contexts.push({ name, props, context, target })
      // Return void: the engine must preserve a framework's actual mount.
    }
    window.instance = await window.Zircle.createZircle({
      mount: '#host', initialView: 'home', context: { app: 'example' }, transitions: { driver: 'none' },
      views: { home: factory('home'), child: factory('child') }
    })
    await window.instance.setView({ name: 'child', params: { id: 42 } })
  })
  expect(await page.evaluate(() => window.contexts[1].target === window.instance.canvas.querySelector('.is-current-view'))).toBe(true)
  expect(await page.evaluate(() => ({ props: window.contexts[1].props, context: window.contexts[1].context }))).toEqual({ props: { id: 42 }, context: { app: 'example' } })
  expect(await page.evaluate(() => window.cleanupCalls)).toEqual([])
  await page.evaluate(() => window.instance.back())
  expect(await page.evaluate(() => window.cleanupCalls)).toEqual(['child'])
  await page.evaluate(() => { window.instance.destroy(); window.instance.destroy() })
  expect(await page.evaluate(() => window.cleanupCalls)).toEqual(['child', 'home'])
})

test('container and aspect resize preserve centered depth navigation and deep back', async ({ page }) => {
  await page.locator('#host').evaluate(node => { node.style.cssText = 'position:relative;width:1100px;height:700px' })
  await mount(page)
  await next(page, 'one')
  await next(page, 'two')
  await next(page, 'three')
  await next(page, 'four')
  for (const [width, height] of [[480, 360], [300, 680], [1000, 920]]) {
    await page.locator('#host').evaluate((node, [width, height]) => {
      node.style.width = `${width}px`
      node.style.height = `${height}px`
    }, [width, height])
    await centered(page, Math.min(840, width, height) / 2)
  }
  for (const name of ['three', 'two', 'one', 'home']) {
    await page.evaluate(() => window.instance.back())
    await current(page, name)
    await centered(page, 420)
  }
})
