import { test, expect } from '@playwright/test'

test('progress rings and drag handles share the radial control center', async ({ page }) => {
  await page.goto('/tests/fixture.html')
  await page.waitForFunction(() => window.testReady)
  const geometry = await page.evaluate(() => {
    document.querySelector('#host').hidden = true
    document.querySelector('#app').innerHTML = '<z-view><z-spot id="spot" knob qty="25" slider progress="70" size="m"><z-scroll slot="extension" scroll-val="0"></z-scroll></z-spot><z-spot id="full" knob qty="100" slider progress="100" size="m" angle="180" class="transparent"></z-spot></z-view>'
    window.Orbit.refresh(document.querySelector('#app'))
    const rect = node => {
      const r = node.getBoundingClientRect()
      const s = getComputedStyle(node)
      return { x: r.x, y: r.y, width: r.width, height: r.height,
        cx: r.x + r.width / 2, cy: r.y + r.height / 2,
        transform: s.transform, position: s.position, left: s.left, top: s.top }
    }
    const controls = [...document.querySelectorAll('z-knob, z-slider, z-scroll')]
    return controls.map(host => {
      const orbit = host.querySelector('.z-control-orbit')
      const progress = orbit.querySelector('o-progress')
      const svg = progress.shadowRoot.querySelector('svg')
      const track = svg.querySelector('.progress-bg')
      const bar = svg.querySelector('.progress-bar')
      const handle = orbit.querySelector('.z-control-handle')
      return { kind: host.localName, host: rect(host), orbit: rect(orbit), progress: rect(progress),
        svg: rect(svg), track: rect(track), bar: rect(bar), value: Number(progress.getAttribute('value')),
        range: getComputedStyle(progress).getPropertyValue('--o-range'), handle: handle ? rect(handle) : null }
    })
  })
  for (const item of geometry) {
    const layers = item.kind === 'z-scroll' ? ['orbit', 'svg'] : ['orbit', 'svg', 'track']
    if (item.kind !== 'z-scroll' && item.value === 100) layers.push('bar')
    for (const layer of layers) {
      expect(Math.abs(item[layer].cx - item.host.cx), JSON.stringify(item)).toBeLessThan(1)
      expect(Math.abs(item[layer].cy - item.host.cy), JSON.stringify(item)).toBeLessThan(1)
    }
    if (item.handle) {
      const radius = item.host.width / 2 + (item.kind === 'z-scroll' ? 12 : 0)
      expect(Math.hypot(item.handle.cx - item.host.cx, item.handle.cy - item.host.cy), JSON.stringify(item)).toBeCloseTo(radius, 0)
      if (item.kind === 'z-knob' && item.value === 25) {
        expect(Math.abs(item.handle.cx - item.host.cx), JSON.stringify(item)).toBeLessThan(1)
        expect(item.handle.cy - item.host.cy, JSON.stringify(item)).toBeCloseTo(radius, 0)
      }
    }
    if (item.kind === 'z-scroll') expect(item.range).toBe('90deg')
  }
  expect(await page.locator('#full').evaluate(node => getComputedStyle(node).borderTopWidth)).toBe('0px')
  expect(await page.locator('#full > .z-surface-body').evaluate(node => getComputedStyle(node).borderTopColor)).toBe('rgba(0, 0, 0, 0)')
})
