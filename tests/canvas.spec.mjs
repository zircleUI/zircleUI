import { test, expect } from '@playwright/test'

async function fixture(page) {
  await page.goto('/tests/fixture.html')
  await page.waitForFunction(() => window.testReady)
  await page.locator('#app').evaluate(node => { node.hidden = true })
}

test('declarative templates initialize once, expose ready, and navigate with canvas methods', async ({ page }) => {
  await fixture(page)
  await page.evaluate(async () => {
    const canvas = document.createElement('z-canvas')
    canvas.id = 'declarative'
    canvas.setAttribute('initial-view', 'home')
    canvas.setAttribute('aria-label', 'Declarative example')
    canvas.options = { transitions: { driver: 'none' } }
    canvas.innerHTML = `
      <template data-view="home"><z-view><h1>Home template</h1>
        <z-spot slot="extension" to-view="details" label="Explore">+</z-spot>
      </z-view></template>
      <template data-view="details"><z-view><h1>Detail template</h1></z-view></template>`
    window.readyEvents = []
    canvas.addEventListener('zircle:ready', event => window.readyEvents.push(event.detail.instance))
    document.querySelector('#host').append(canvas)
    window.canvas = canvas
    const ready = canvas.ready
    window.readyIdentity = ready === canvas.ready && ready === canvas.init()
    window.instance = await ready
  })
  await expect(page.locator('#declarative')).toHaveAttribute('data-ready', '')
  await expect(page.locator('#declarative .zumly-canvas')).toHaveAttribute('aria-label', 'Declarative example')
  await expect(page.locator('#declarative > template')).toHaveCount(2)
  await expect(page.locator('#declarative .is-current-view h1')).toHaveText('Home template')
  expect(await page.evaluate(() => ({
    readyIdentity: window.readyIdentity,
    sameInstance: window.canvas.instance === window.instance && window.readyEvents[0] === window.instance,
    events: window.readyEvents.length,
    history: window.instance.getHistory()
  }))).toEqual({ readyIdentity: true, sameInstance: true, events: 1, history: ['home'] })
  await page.locator('#declarative z-spot[to-view]').click()
  await expect(page.locator('#declarative .is-current-view h1')).toHaveText('Detail template')
  await page.evaluate(() => window.canvas.back())
  await expect(page.locator('#declarative .is-current-view h1')).toHaveText('Home template')
  await page.evaluate(() => window.canvas.setView('details'))
  await expect(page.locator('#declarative .is-current-view h1')).toHaveText('Detail template')
  expect(await page.evaluate(() => window.readyEvents.length)).toBe(1)
})

test('views and options assigned before registration survive custom element upgrade', async ({ page }) => {
  let releaseModule
  const gate = new Promise(resolve => { releaseModule = resolve })
  await page.route('**/dist/zircle.standalone.js', async route => {
    await gate
    await route.continue()
  })
  try {
    await page.goto('/tests/fixture.html', { waitUntil: 'commit' })
    await expect(page.locator('#host')).toHaveCount(1)
    const before = await page.evaluate(() => {
      const canvas = document.createElement('z-canvas')
      canvas.id = 'upgraded'
      canvas.views = {
        home: '<z-view>First view</z-view>',
        details: '<z-view>Configured initial view</z-view>'
      }
      canvas.options = {
        initialView: 'details', theme: 'blue', mode: 'light-filled', shape: 'square',
        transitions: { driver: 'none' }
      }
      const ownProperties = Object.hasOwn(canvas, 'views') && Object.hasOwn(canvas, 'options')
      document.querySelector('#host').append(canvas)
      window.canvas = canvas
      return { registered: Boolean(customElements.get('z-canvas')), ownProperties }
    })
    expect(before).toEqual({ registered: false, ownProperties: true })
  } finally {
    releaseModule()
  }
  await page.waitForFunction(() => window.testReady)
  const after = await page.evaluate(async () => {
    const instance = await window.canvas.ready
    return {
      upgraded: window.canvas instanceof window.Zircle.ZCanvas,
      ownProperties: Object.hasOwn(window.canvas, 'views') || Object.hasOwn(window.canvas, 'options'),
      view: instance.getCurrentViewName(), theme: instance.getTheme(), mode: instance.getMode(), shape: instance.getShape()
    }
  })
  expect(after).toEqual({ upgraded: true, ownProperties: false, view: 'details', theme: 'blue', mode: 'light-filled', shape: 'square' })
  await expect(page.locator('#upgraded .is-current-view')).toHaveText('Configured initial view')
})

test('connected canvas attributes update the instance and report style changes', async ({ page }) => {
  await fixture(page)
  await page.evaluate(async () => {
    const canvas = document.createElement('z-canvas')
    canvas.id = 'styled'
    canvas.views = { home: '<z-view>Theme preview</z-view>' }
    canvas.options = { theme: 'blue', mode: 'light', shape: 'circle', transitions: { driver: 'none' } }
    canvas.setAttribute('theme', 'orange')
    document.querySelector('#host').append(canvas)
    window.canvas = canvas
    window.instance = await canvas.ready
    window.styles = []
    canvas.addEventListener('zircle:stylechange', event => window.styles.push(event.detail))
  })
  await expect(page.locator('#styled .zumly-canvas')).toHaveAttribute('data-theme', 'orange')
  await page.evaluate(() => {
    window.canvas.setAttribute('theme', 'green')
    window.canvas.setAttribute('mode', 'dark-filled')
    window.canvas.setAttribute('shape', 'square')
  })
  await expect(page.locator('#styled .zumly-canvas')).toHaveAttribute('data-theme', 'green')
  await expect(page.locator('#styled .zumly-canvas')).toHaveAttribute('data-mode', 'dark-filled')
  await expect(page.locator('#styled .zumly-canvas')).toHaveAttribute('data-shape', 'square')
  expect(await page.evaluate(() => ({
    theme: window.instance.getTheme(), mode: window.instance.getMode(), shape: window.instance.getShape(),
    events: window.styles
  }))).toEqual({
    theme: 'green', mode: 'dark-filled', shape: 'square',
    events: [
      { theme: 'green', mode: 'light', shape: 'circle' },
      { theme: 'green', mode: 'dark-filled', shape: 'circle' },
      { theme: 'green', mode: 'dark-filled', shape: 'square' }
    ]
  })
})

test('moving a canvas retains its instance while disconnection cleans up and reconnect creates fresh state', async ({ page }) => {
  await fixture(page)
  await page.evaluate(async () => {
    window.rendered = 0
    window.cleaned = []
    window.destroyEvents = 0
    const canvas = document.createElement('z-canvas')
    canvas.id = 'lifecycle'
    canvas.options = { transitions: { driver: 'none' } }
    canvas.views = {
      home: ({ onCleanup }) => {
        const generation = ++window.rendered
        onCleanup(() => window.cleaned.push(generation))
        return `<z-view data-generation="${generation}">Generation ${generation}</z-view>`
      }
    }
    canvas.addEventListener('zircle:destroy', () => window.destroyEvents++)
    document.querySelector('#host').append(canvas)
    window.canvas = canvas
    window.firstInstance = await canvas.ready
    const newParent = document.createElement('div')
    newParent.id = 'second-parent'
    document.querySelector('#host').append(newParent)
    newParent.append(canvas)
  })
  expect(await page.evaluate(async () => ({
    sameInstance: (await window.canvas.ready) === window.firstInstance,
    rendered: window.rendered, cleaned: window.cleaned, destroys: window.destroyEvents
  }))).toEqual({ sameInstance: true, rendered: 1, cleaned: [], destroys: 0 })
  await page.evaluate(() => window.canvas.remove())
  await expect.poll(() => page.evaluate(() => window.cleaned)).toEqual([1])
  expect(await page.evaluate(() => ({
    empty: window.canvas.querySelectorAll('.z-stage').length === 0,
    instance: window.canvas.instance,
    readyAttribute: window.canvas.hasAttribute('data-ready'),
    destroys: window.destroyEvents
  }))).toEqual({ empty: true, instance: null, readyAttribute: false, destroys: 1 })
  await page.evaluate(async () => {
    document.querySelector('#host').append(window.canvas)
    window.secondInstance = await window.canvas.ready
  })
  await expect(page.locator('#lifecycle .is-current-view')).toHaveAttribute('data-generation', '2')
  expect(await page.evaluate(() => ({
    differentInstance: window.firstInstance !== window.secondInstance,
    history: window.secondInstance.getHistory(), cleaned: window.cleaned
  }))).toEqual({ differentInstance: true, history: ['home'], cleaned: [1] })
  await page.evaluate(() => { window.canvas.destroy(); window.canvas.destroy() })
  expect(await page.evaluate(() => ({ cleaned: window.cleaned, destroys: window.destroyEvents }))).toEqual({ cleaned: [1, 2], destroys: 2 })
})

test('multiple declarative canvases use their own templates, options, and teardown', async ({ page }) => {
  await fixture(page)
  await page.evaluate(async () => {
    const host = document.querySelector('#host')
    host.style.display = 'flex'
    const canvases = ['first', 'second'].map((name, index) => {
      const canvas = document.createElement('z-canvas')
      canvas.id = name
      canvas.style.cssText = 'display:block;position:relative;width:50%;height:400px'
      canvas.options = { theme: index ? 'blue' : 'white', transitions: { driver: 'none' } }
      canvas.innerHTML = `
        <template data-view="home"><z-view>${name} home
          <z-spot slot="extension" to-view="details">Open</z-spot>
        </z-view></template>
        <template data-view="details"><z-view>${name} details</z-view></template>`
      host.append(canvas)
      return canvas
    })
    window.canvases = canvases
    await Promise.all(canvases.map(canvas => canvas.ready))
    await canvases[0].setView('details')
  })
  await expect(page.locator('#first .is-current-view')).toHaveText('first details')
  expect(await page.evaluate(() => ({
    first: window.canvases[0].instance.getHistory(), second: window.canvases[1].instance.getHistory(),
    themes: window.canvases.map(canvas => canvas.instance.getTheme())
  }))).toEqual({ first: ['home', 'details'], second: ['home'], themes: ['white', 'blue'] })
  await page.evaluate(() => window.canvases[0].remove())
  await expect.poll(() => page.evaluate(() => window.canvases[0].instance)).toBe(null)
  await page.locator('#second .is-current-view z-spot').click()
  await expect(page.locator('#second .is-current-view')).toHaveText('second details')
  expect(await page.evaluate(() => window.canvases[1].instance.getTheme())).toBe('blue')
})

test('duplicate template registrations reject ready and emit an observable error without a partial canvas', async ({ page }) => {
  await fixture(page)
  const result = await page.evaluate(async () => {
    const canvas = document.createElement('z-canvas')
    canvas.views = { home: '<z-view>Programmatic home</z-view>' }
    canvas.innerHTML = '<template data-view="home"><z-view>Duplicate home</z-view></template>'
    const errors = []
    canvas.addEventListener('zircle:error', event => errors.push(event.detail.error.message))
    document.querySelector('#host').append(canvas)
    let rejection
    try { await canvas.ready } catch (error) { rejection = error.message }
    return { rejection, errors, stages: canvas.querySelectorAll('.z-stage').length, instance: canvas.instance }
  })
  expect(result.rejection).toContain('duplicate view "home"')
  expect(result.errors).toEqual([result.rejection])
  expect(result.stages).toBe(0)
  expect(result.instance).toBe(null)
})

test('disconnecting a never-resolving declarative source releases its generation and allows reconnect', async ({ page }) => {
  await fixture(page)
  await page.evaluate(() => {
    const canvas = document.createElement('z-canvas')
    canvas.id = 'pending-canvas'
    canvas.options = { transitions: { driver: 'none' } }
    window.renderCalls = 0
    window.canvasErrors = []
    window.pendingResult = { state: 'pending' }
    canvas.views = {
      home: () => {
        if (++window.renderCalls === 1) return new Promise(() => {})
        return '<z-view>Reconnected successfully</z-view>'
      }
    }
    canvas.addEventListener('zircle:error', event => window.canvasErrors.push(event.detail.error.message))
    document.querySelector('#host').append(canvas)
    window.canvas = canvas
    canvas.ready.then(
      value => { window.pendingResult = { state: 'resolved', value } },
      error => { window.pendingResult = { state: 'rejected', error: error.name } }
    )
  })
  await expect.poll(() => page.evaluate(() => window.renderCalls)).toBe(1)
  await expect(page.locator('#pending-canvas .z-stage')).toHaveCount(1)
  await page.evaluate(() => window.canvas.remove())
  await expect.poll(() => page.evaluate(() => window.pendingResult)).toEqual({ state: 'resolved', value: null })
  expect(await page.evaluate(() => ({
    stages: window.canvas.querySelectorAll('.z-stage').length,
    instance: window.canvas.instance,
    ready: window.canvas.hasAttribute('data-ready'),
    errors: window.canvasErrors
  }))).toEqual({ stages: 0, instance: null, ready: false, errors: [] })
  await page.evaluate(async () => {
    document.querySelector('#host').append(window.canvas)
    window.reconnected = await window.canvas.ready
  })
  await expect(page.locator('#pending-canvas .z-stage')).toHaveCount(1)
  await expect(page.locator('#pending-canvas .is-current-view')).toHaveText('Reconnected successfully')
  expect(await page.evaluate(() => ({ calls: window.renderCalls, history: window.reconnected.getHistory(), errors: window.canvasErrors })))
    .toEqual({ calls: 2, history: ['home'], errors: [] })
})

test('core signals reject pre-aborted startup and dispose an initialized instance once', async ({ page }) => {
  await fixture(page)
  const result = await page.evaluate(async () => {
    const host = document.querySelector('#host')
    host.style.position = 'static'
    const views = { home: '<z-view>Signal test</z-view>' }
    const stopped = new AbortController()
    stopped.abort()
    let rejection
    try { await window.Zircle.createZircle({ mount: host, views, signal: stopped.signal }) }
    catch (error) { rejection = { name: error.name, domException: error instanceof DOMException } }
    const before = { stages: host.querySelectorAll('.z-stage').length, position: host.style.position }
    const active = new AbortController()
    let cleanup = 0
    let destroyed = 0
    const instance = await window.Zircle.createZircle({
      mount: host, signal: active.signal, transitions: { driver: 'none' },
      views: { home: ({ onCleanup }) => { onCleanup(() => cleanup++); return '<z-view>Mounted signal test</z-view>' } }
    })
    instance.on('destroy', () => destroyed++)
    active.abort()
    instance.destroy()
    active.abort()
    const after = { stages: host.querySelectorAll('.z-stage').length, position: host.style.position, cleanup, destroyed }
    const remounted = await window.Zircle.createZircle({ mount: host, views, transitions: { driver: 'none' } })
    const remountedName = remounted.getCurrentViewName()
    remounted.destroy()
    return { rejection, before, after, remountedName }
  })
  expect(result).toEqual({
    rejection: { name: 'AbortError', domException: true },
    before: { stages: 0, position: 'static' },
    after: { stages: 0, position: 'static', cleanup: 1, destroyed: 1 },
    remountedName: 'home'
  })
})

test('aborting a pending core factory permits immediate remount and cleans its late result once', async ({ page }) => {
  await fixture(page)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.evaluate(() => {
    window.cleanup = []
    window.signalController = new AbortController()
    window.pendingResult = { state: 'pending' }
    window.mountedViews = []
    document.querySelector('#host').addEventListener('zircle:viewmount', event => window.mountedViews.push(event.detail.view))
    window.Zircle.createZircle({
      mount: '#host', signal: window.signalController.signal, transitions: { driver: 'none' },
      views: {
        late: async ({ onCleanup }) => {
          onCleanup(() => window.cleanup.push('early registration'))
          await new Promise(resolve => { window.releaseFactory = resolve })
          onCleanup(() => window.cleanup.push('late registration'))
          const view = document.createElement('z-view')
          view.id = 'late-result'
          view.textContent = 'Must not be mounted'
          window.lateResult = view
          return view
        }
      }
    }).then(
      () => { window.pendingResult = { state: 'resolved' } },
      error => { window.pendingResult = { state: 'rejected', name: error.name } }
    )
  })
  await page.waitForFunction(() => typeof window.releaseFactory === 'function')
  await page.evaluate(() => window.signalController.abort())
  await expect.poll(() => page.evaluate(() => window.pendingResult)).toEqual({ state: 'rejected', name: 'AbortError' })
  await expect(page.locator('#host .z-stage')).toHaveCount(0)
  await page.evaluate(async () => {
    window.replacement = await window.Zircle.createZircle({
      mount: '#host', views: { fresh: '<z-view>Fresh mount</z-view>' }, transitions: { driver: 'none' }
    })
    window.releaseFactory()
  })
  await expect.poll(() => page.evaluate(() => [...window.cleanup].sort())).toEqual(['early registration', 'late registration'])
  await expect(page.locator('#host .is-current-view')).toHaveText('Fresh mount')
  await expect(page.locator('#host .z-stage')).toHaveCount(1)
  expect(await page.evaluate(() => ({ lateConnected: window.lateResult.isConnected, mounted: window.mountedViews })))
    .toEqual({ lateConnected: false, mounted: ['fresh'] })
  await page.evaluate(() => { window.signalController.abort(); window.replacement.destroy(); window.replacement.destroy() })
  expect(await page.evaluate(() => window.cleanup.length)).toBe(2)
  expect(errors).toEqual([])
})

test('styles changed during initialization are applied and removing attributes restores options or defaults', async ({ page }) => {
  await fixture(page)
  await page.evaluate(() => {
    const canvas = document.createElement('z-canvas')
    canvas.id = 'pending-styles'
    canvas.options = { theme: 'blue', transitions: { driver: 'none' } }
    canvas.setAttribute('theme', 'orange')
    canvas.views = { home: () => new Promise(resolve => { window.releaseStyles = () => resolve('<z-view>Async styles</z-view>') }) }
    document.querySelector('#host').append(canvas)
    window.canvas = canvas
    window.styleReady = canvas.ready
  })
  await page.waitForFunction(() => typeof window.releaseStyles === 'function')
  await page.evaluate(async () => {
    window.canvas.setAttribute('theme', 'green')
    window.canvas.setAttribute('mode', 'dark-filled')
    window.canvas.setAttribute('shape', 'square')
    window.releaseStyles()
    window.instance = await window.styleReady
  })
  expect(await page.evaluate(() => [window.instance.getTheme(), window.instance.getMode(), window.instance.getShape()]))
    .toEqual(['green', 'dark-filled', 'square'])
  await expect(page.locator('#pending-styles z-view')).toHaveCSS('border-radius', '0px')
  await page.evaluate(() => {
    for (const attribute of ['theme', 'mode', 'shape']) window.canvas.removeAttribute(attribute)
  })
  expect(await page.evaluate(() => [window.instance.getTheme(), window.instance.getMode(), window.instance.getShape()]))
    .toEqual(['blue', 'dark', 'circle'])
  await expect(page.locator('#pending-styles .zumly-canvas')).toHaveAttribute('data-theme', 'blue')
  await expect(page.locator('#pending-styles .zumly-canvas')).toHaveAttribute('data-mode', 'dark')
  await expect(page.locator('#pending-styles .zumly-canvas')).toHaveAttribute('data-shape', 'circle')
  await expect(page.locator('#pending-styles z-view')).toHaveCSS('border-radius', '50%')
})

test('empty names and zero or multiple template roots fail before creating engine DOM', async ({ page }) => {
  await fixture(page)
  const results = await page.evaluate(async () => {
    const results = []
    for (const markup of [
      '<template data-view=""><z-view>Unnamed</z-view></template>',
      '<template data-view="   "><z-view>Whitespace name</z-view></template>',
      '<template data-view="home"></template>',
      '<template data-view="home"><z-view>One</z-view><z-view>Two</z-view></template>'
    ]) {
      const canvas = document.createElement('z-canvas')
      canvas.innerHTML = markup
      let events = 0
      canvas.addEventListener('zircle:error', () => events++)
      document.querySelector('#host').append(canvas)
      let error
      try { await canvas.ready } catch (rejection) { error = rejection.message }
      results.push({ error, events, stages: canvas.querySelectorAll('.z-stage').length, ready: canvas.hasAttribute('data-ready') })
      canvas.remove()
    }
    return results
  })
  expect(results).toHaveLength(4)
  for (const result of results) {
    expect(result.error).toContain('nonempty data-view name and exactly one root element')
    expect(result.events).toBe(1)
    expect(result.stages).toBe(0)
    expect(result.ready).toBe(false)
  }
})

test('local square overrides do not propagate to child spots and global shape respects explicit circles', async ({ page }) => {
  await fixture(page)
  await page.evaluate(async () => {
    window.instance = await window.Zircle.createZircle({
      mount: '#host', transitions: { driver: 'none' },
      views: { home: `<z-view id="shape-view" square>
        Local square view
        <z-spot id="default-spot" slot="extension" angle="0">
          Default spot
          <z-spot id="nested-spot" slot="extension" size="small">Nested spot</z-spot>
        </z-spot>
        <z-spot id="circle-spot" slot="extension" circle angle="120">Circle override</z-spot>
        <z-spot id="square-spot" slot="extension" square angle="240">Square override</z-spot>
      </z-view>` }
    })
  })
  await expect(page.locator('#shape-view')).toHaveCSS('border-radius', '0px')
  for (const id of ['default-spot', 'nested-spot', 'circle-spot']) {
    await expect(page.locator(`#${id}`)).toHaveCSS('border-radius', '50%')
  }
  await expect(page.locator('#square-spot')).toHaveCSS('border-radius', '0px')
  await page.evaluate(() => window.instance.setShape('square'))
  for (const id of ['shape-view', 'default-spot', 'nested-spot', 'square-spot']) {
    await expect(page.locator(`#${id}`)).toHaveCSS('border-radius', '0px')
  }
  await expect(page.locator('#circle-spot')).toHaveCSS('border-radius', '50%')
  await page.evaluate(() => window.instance.setShape('circle'))
  await expect(page.locator('#shape-view')).toHaveCSS('border-radius', '0px')
  await expect(page.locator('#default-spot')).toHaveCSS('border-radius', '50%')
  await expect(page.locator('#nested-spot')).toHaveCSS('border-radius', '50%')
  await expect(page.locator('#square-spot')).toHaveCSS('border-radius', '0px')
})
