import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.preUpgradeSpot = document.createElement('z-spot')
    window.preUpgradeSpot.angle = 180
    window.preUpgradeSpot.distance = 50
    window.preUpgradeSpot.size = 'small'
    window.preUpgradeSpot.label = 'Upgraded'
  })
  await page.goto('/tests/fixture.html')
  await page.waitForFunction(() => window.testReady)
})

async function standalone (page, markup) {
  await page.evaluate(html => {
    document.querySelector('#host').style.display = 'none'
    const mount = document.querySelector('#app')
    mount.style.cssText = '--z-size-xxl:400px;--z-size-xl:240px;--z-size-l:160px;--z-size-m:100px;--z-size-s:50px;--z-size-xs:30px;--z-size-xxs:16px'
    mount.innerHTML = html
    window.Orbit.refresh(mount)
  }, markup)
}

async function geometry (page, selector) {
  return page.locator(selector).evaluate(node => {
    const rect = node.getBoundingClientRect()
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width, height: rect.height }
  })
}

function near (actual, expected) { expect(Math.abs(actual - expected)).toBeLessThan(1.25) }

test('Orbit positions original angle/distance spots and nested satellites', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await standalone(page, `<z-view id="view" style="transform:translate(120px,120px)">
    Home
    <z-spot id="east" angle="0" distance="100" size="medium">East
      <z-spot id="nested" angle="180" distance="100" size="xxs">N</z-spot>
    </z-spot>
    <z-spot id="south" angle="90" distance="150" size="small">South</z-spot>
  </z-view>`)
  const view = await geometry(page, '#view')
  const east = await geometry(page, '#east')
  const south = await geometry(page, '#south')
  const nested = await geometry(page, '#nested')
  near(view.width, 400)
  near(east.x, view.x + 200)
  near(east.y, view.y)
  near(east.width, 100)
  near(south.x, view.x)
  near(south.y, view.y + 300)
  near(nested.x, east.x - 50)
  near(nested.y, east.y)
  expect(await page.locator('#east').evaluate(node => node.parentElement.matches('.gravity-spot > .orbit-12'))).toBe(true)
  expect(await page.locator('#east').evaluate(node => node.style.transform)).toBe('')
  expect(errors).toEqual([])
})

test('size, polar coordinates, label and image attributes update without replacing content', async ({ page }) => {
  await standalone(page, '<z-view id="view"><z-spot id="spot" label="Before"><button id="authored">Keep me</button></z-spot></z-view>')
  await page.evaluate(() => {
    window.authoredNode = document.querySelector('#authored')
    window.authoredClicks = 0
    window.authoredNode.addEventListener('click', () => window.authoredClicks++)
    const view = document.querySelector('#view')
    const spot = document.querySelector('#spot')
    view.size = 'extralarge'
    spot.size = 'small'
    spot.angle = 270
    spot.distance = 50
    spot.label = '<After>'
    spot.labelPos = 'left'
    spot.imagePath = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'
    window.Orbit.refresh(view)
  })
  const view = await geometry(page, '#view')
  const spot = await geometry(page, '#spot')
  near(view.width, 240)
  near(spot.width, 50)
  near(spot.x, view.x)
  near(spot.y, view.y - 60)
  await expect(page.locator('#spot > .z-label.left')).toHaveText('<After>')
  await expect(page.locator('#spot .z-image-source')).toHaveCount(1)
  expect(await page.evaluate(() => document.querySelector('#authored') === window.authoredNode)).toBe(true)
  await page.evaluate(() => window.authoredNode.click())
  expect(await page.evaluate(() => window.authoredClicks)).toBe(1)
  await page.locator('#spot').evaluate(node => {
    node.removeAttribute('label')
    node.removeAttribute('image-path')
  })
  await expect(page.locator('#spot > .z-label')).toHaveCount(0)
  await expect(page.locator('#spot .z-image-source')).toHaveCount(0)
})

test('initialized clones and reconnects reuse their internal structure', async ({ page }) => {
  await standalone(page, '<z-view id="view"><p id="text">Original content</p><z-spot id="spot" label="Child">Nested</z-spot></z-view>')
  await page.evaluate(() => {
    const view = document.querySelector('#view')
    const clone = view.cloneNode(true)
    clone.id = 'clone'
    clone.querySelector('#spot').id = 'clone-spot'
    clone.querySelector('#text').id = 'clone-text'
    document.querySelector('#app').append(clone)
    view.remove()
    document.querySelector('#app').append(view)
    view.refresh()
    clone.refresh()
    window.Orbit.refresh(document.querySelector('#app'))
  })
  for (const selector of ['#view', '#clone', '#spot', '#clone-spot']) {
    await expect(page.locator(`${selector} > [data-z-part="surface"]`)).toHaveCount(1)
    await expect(page.locator(`${selector} > [data-z-part="plate"]`)).toHaveCount(1)
    await expect(page.locator(`${selector} > [data-z-part="extensions"]`)).toHaveCount(1)
  }
  await expect(page.locator('#clone .z-spot-orbit')).toHaveCount(1)
  await expect(page.locator('#clone-text')).toHaveText('Original content')
  await expect(page.locator('#clone-spot > .z-label')).toHaveText('Child')
})

test('predefinition properties upgrade and light DOM slots accept dynamic additions', async ({ page }) => {
  await standalone(page, '<z-view id="view"><div id="slotted" slot="media">Media</div></z-view>')
  await page.evaluate(() => {
    const view = document.querySelector('#view')
    window.preUpgradeSpot.id = 'upgraded'
    view.append(window.preUpgradeSpot)
    view.refresh()
    document.querySelector('#slotted').setAttribute('slot', 'image')
  })
  await expect(page.locator('#upgraded > .z-label')).toHaveText('Upgraded')
  await expect(page.locator('#view > .z-surface-body > .z-image > #slotted')).toHaveCount(1)
  const view = await geometry(page, '#view')
  const upgraded = await geometry(page, '#upgraded')
  near(upgraded.width, 50)
  near(upgraded.x, view.x - 100)
  near(upgraded.y, view.y)
  expect(await page.locator('#upgraded').evaluate(node => node.angle)).toBe(180)
})

test('surface sliders and knobs update, forward values, and remove cleanly', async ({ page }) => {
  await standalone(page, '<z-view id="view" slider progress="32"><z-spot id="knob" knob qty="10" min="0" max="20" unit="°"></z-spot></z-view>')
  await expect(page.locator('#view > z-slider o-progress')).toHaveAttribute('value', '32')
  await page.locator('#view').evaluate(node => { node.progress = 64 })
  await expect(page.locator('#view > z-slider o-progress')).toHaveAttribute('value', '64')
  await page.evaluate(() => {
    window.knobEvents = []
    const spot = document.querySelector('#knob')
    spot.addEventListener('change', event => window.knobEvents.push({ target: event.target.id, qty: event.detail.qty }))
  })
  const knob = page.locator('#knob > z-knob')
  await knob.focus()
  await knob.press('ArrowRight')
  await expect(page.locator('#knob')).toHaveAttribute('qty', '11')
  expect(await page.evaluate(() => window.knobEvents)).toEqual([{ target: 'knob', qty: 11 }])
  await page.locator('#knob').evaluate(node => { node.disabled = true })
  await expect(knob).toHaveAttribute('disabled', '')
  await page.locator('#view').evaluate(node => { node.slider = false })
  await page.locator('#knob').evaluate(node => { node.knob = false })
  await expect(page.locator('#view > z-slider')).toHaveCount(0)
  await expect(page.locator('#knob > z-knob')).toHaveCount(0)
})

test('nested buttons are isolated from parent zoom and disabled spots reject activation', async ({ page }) => {
  await page.evaluate(async () => {
    window.surfaceActions = 0
    window.instance = await window.Zircle.createZircle({
      mount: '#host', initialView: 'home', transitions: { driver: 'none' },
      views: {
        home: '<z-view><z-spot id="parent-zoom" to-view="detail" size="large" angle="0" distance="60"><button id="nested-native">Action</button><z-spot id="nested-button" button size="small" angle="90" distance="150">Nested</z-spot></z-spot><z-spot id="disabled" to-view="detail" disabled angle="180">Disabled</z-spot></z-view>',
        detail: '<z-view>Detail</z-view>'
      }
    })
    for (const selector of ['#nested-native', '#nested-button', '#disabled']) document.querySelector(selector).addEventListener('click', () => window.surfaceActions++)
  })
  await page.locator('#nested-native').click()
  expect(await page.evaluate(() => window.instance.getCurrentViewName())).toBe('home')
  await page.locator('#nested-button').focus()
  await page.locator('#nested-button').press('Enter')
  expect(await page.evaluate(() => window.instance.getCurrentViewName())).toBe('home')
  await page.locator('#disabled').evaluate(node => node.click())
  expect(await page.evaluate(() => window.surfaceActions)).toBe(2)
  expect(await page.evaluate(() => window.instance.getCurrentViewName())).toBe('home')
  await page.locator('#parent-zoom').focus()
  await page.locator('#parent-zoom').press('Enter')
  await expect.poll(() => page.evaluate(() => window.instance.getCurrentViewName())).toBe('detail')
})

test('overflowing views restore the original radial scrollbar and synchronize native scrolling', async ({ page }) => {
  await standalone(page, '<z-view id="view"><div id="long" style="height:1200px">Long content</div></z-view>')
  const control = page.locator('#view > z-scroll')
  await expect(control).toHaveCount(1)
  await control.focus()
  await control.press('End')
  expect(await page.locator('#view').evaluate(node => {
    const content = node.contentElement
    return Math.abs(content.scrollTop - content.scrollHeight + content.clientHeight)
  })).toBeLessThan(2)
  await page.locator('#view').evaluate(node => { node.contentElement.scrollTop = 0 })
  await expect(control).toHaveAttribute('scroll-val', '-45')
  await page.locator('#long').evaluate(node => { node.style.height = '30px' })
  await expect(control).toHaveCount(0)
  await page.locator('#long').evaluate(node => { node.style.height = '1200px' })
  await expect(control).toHaveCount(1)
  await page.locator('#view').evaluate(node => { node.square = true })
  await expect(control).toHaveCount(0)
})


test('image-path takes precedence over the image slot without losing its node', async ({ page }) => {
  await standalone(page, `<z-view id="picture" image-path="/sun.png"><img id="authored-image" slot="image" src="/earth.png" alt="Earth"></z-view>`)
  await page.evaluate(() => { window.authoredImage = document.querySelector('#authored-image') })
  await expect(page.locator('#authored-image')).toBeHidden()
  await expect(page.locator('#picture .z-image-source')).toBeVisible()
  await page.locator('#picture').evaluate(node => node.removeAttribute('image-path'))
  await expect(page.locator('#authored-image')).toBeVisible()
  await expect(page.locator('#picture .z-image-source')).toHaveCount(0)
  expect(await page.evaluate(() => document.querySelector('#authored-image') === window.authoredImage)).toBe(true)
})
