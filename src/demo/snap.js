/**
 * snapDOM bridge — captures the canvas and POSTs each PNG/HTML to the dev
 * server so the agent driving the project can "see" the result.
 *
 * Navigation strategy:
 *   - From home, dispatch a real click on the corresponding `.zoom-me[data-to=X]`
 *     so Zumly's zoom transition has a real trigger rect and `hideTrigger`
 *     can fade the satellite the user came from.
 *   - Zoom out with `app.zoomOut()` (no trigger needed for reverse).
 *   - Wait for `afterZoomIn` / `afterZoomOut` events before snapping.
 */
import { snapdom } from '@zumer/snapdom'

async function captureAndPost (target, name) {
  const blob = await snapdom.toBlob(target, { type: 'png', dpr: 1, scale: 1, embedFonts: false })
  const resp = await fetch('/__snap__', {
    method: 'POST',
    headers: { 'content-type': 'image/png', 'x-snap-name': name },
    body: blob
  })
  if (!resp.ok) throw new Error(`POST /__snap__ → ${resp.status}`)
  return resp.json()
}

export function attachSnap (canvas) {
  const root = document.documentElement

  async function snapView (viewName = canvas.getCurrentViewName() || 'unknown') {
    // Hide non-current views so snapDOM doesn't capture them at cover scale.
    const others = [...canvas.querySelectorAll('.is-previous-view, .is-last-view, .is-new-current-view')]
    const stash = others.map(el => [el, el.style.display])
    others.forEach(el => { el.style.display = 'none' })
    try {
      const current = canvas.querySelector('.is-current-view')
      if (current) {
        fetch('/__dom__', {
          method: 'POST',
          headers: { 'content-type': 'text/html', 'x-snap-name': viewName },
          body: current.outerHTML
        }).catch(() => {})
      }
      const result = await captureAndPost(root, viewName)
      console.log('📸', result.path)
      return result
    } catch (err) {
      console.error('snap failed:', err)
    } finally {
      stash.forEach(([el, d]) => { el.style.display = d })
    }
  }

  /**
   * Wait for a Zumly event to fire after running `action()`.
   * Resolves on the event; rejects on a 6s timeout so the loop can recover.
   */
  const waitFor = (eventName, action, label = '') => new Promise((resolve, reject) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      clearTimeout(t)
      canvas.app.off(eventName, done)
      resolve()
    }
    const t = setTimeout(() => {
      if (settled) return
      settled = true
      canvas.app.off(eventName, done)
      console.warn(`[snap] timeout waiting for ${eventName}${label ? ' ('+label+')' : ''}`)
      resolve()  // resolve anyway so loop continues
    }, 6000)
    canvas.app.on(eventName, done)
    try { action() } catch (e) { console.error('[snap] action failed:', e); settled = true; clearTimeout(t); resolve() }
  })

  async function clickInto (name) {
    const trigger = canvas.querySelector(`.is-current-view .zoom-me[data-to="${name}"]`)
    if (!trigger) {
      console.warn(`[snap] no .zoom-me trigger found for "${name}", falling back to zoomTo`)
      await waitFor('afterZoomIn', () => canvas.zoomTo(name), name)
      return
    }
    console.log(`[snap] → ${name} via mouseup`)
    // Zumly listens on `mouseup` (and `touchend`), not `click`. Dispatching
    // a real MouseEvent('mouseup') is what actually triggers the zoom.
    await waitFor('afterZoomIn', () => {
      trigger.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }))
    }, name)
  }

  async function zoomBackHome () {
    let safety = 8
    while (canvas.getCurrentViewName() !== 'home' && safety-- > 0) {
      console.log('[snap] zoomOut from', canvas.getCurrentViewName())
      await waitFor('afterZoomOut', () => canvas.zoomOut(), 'back')
    }
  }

  async function snapAll () {
    const names = Object.keys(canvas._views || {})
    console.log(`📸 snapping ${names.length} views: ${names.join(', ')}`)
    const sleep = ms => new Promise(r => setTimeout(r, ms))

    await zoomBackHome()
    await sleep(400)
    await snapView('home')

    for (const name of names) {
      if (name === 'home') continue
      await zoomBackHome()
      await sleep(300)
      await clickInto(name)
      await sleep(900)        // let any rAF animations settle
      await snapView(name)
    }
    await zoomBackHome()
    console.log('📸 done')
  }

  window.__snap    = snapView
  window.__snapAll = snapAll

  document.addEventListener('keydown', e => {
    if (!e.shiftKey) return
    if (e.key === 'S') { e.preventDefault(); snapView() }
    if (e.key === 'A') { e.preventDefault(); snapAll() }
  })

  const param = new URL(location.href).searchParams.get('snap')
  if (param === 'all')   setTimeout(snapAll,  800)
  if (param === '1' || param === 'current') setTimeout(snapView, 600)
}
