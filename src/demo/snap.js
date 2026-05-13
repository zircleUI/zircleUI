/**
 * snapDOM bridge — captures the canvas (or the whole page) and POSTs the PNG
 * to /__snap__ so the dev server can write it to disk. The agent driving the
 * project reads those files back to "see" the result.
 *
 * Triggers:
 *   - manual: window.__snap('home'), window.__snapAll()
 *   - auto:   ?snap=1 → snapAll() once the canvas is ready
 *   - hotkey: shift+S         → snap current view
 *             shift+A         → snap all views
 */
import { snapdom } from '@zumer/snapdom'

async function captureAndPost (target, name) {
  // toBlob with format png so the server stores raster
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
    // Hide non-current views; Zumly leaves them in the DOM at zoomed-out
    // cover scale and snapDOM happily captures them too.
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

  async function snapAll () {
    const names = Object.keys(canvas._views || {})
    console.log(`📸 snapping ${names.length} views: ${names.join(', ')}`)
    const sleep = ms => new Promise(r => setTimeout(r, ms))

    // Capture home first (we start there).
    if (canvas.getCurrentViewName() === 'home') {
      await sleep(800)
      await snapView('home')
    }

    // Helper: do an action and wait for a specific Zumly event before continuing.
    const waitFor = (eventName, action) => new Promise(resolve => {
      const done = () => { canvas.app.off(eventName, done); resolve() }
      canvas.app.on(eventName, done)
      action()
    })

    for (const name of names) {
      if (name === 'home') continue
      while (canvas.getCurrentViewName() !== 'home') {
        await waitFor('afterZoomOut', () => canvas.zoomOut())
      }
      await waitFor('afterZoomIn', () => canvas.zoomTo(name))
      await sleep(800)  // give children one more beat to settle (anim, animation frames)
      await snapView(name)
    }
    // Return to home at the end
    while (canvas.getCurrentViewName() !== 'home') {
      await waitFor('afterZoomOut', () => canvas.zoomOut())
    }
    console.log('📸 done')
  }

  window.__snap    = snapView
  window.__snapAll = snapAll

  document.addEventListener('keydown', e => {
    if (!e.shiftKey) return
    if (e.key === 'S') { e.preventDefault(); snapView() }
    if (e.key === 'A') { e.preventDefault(); snapAll() }
  })

  // Auto-trigger via ?snap=all or ?snap=current
  const param = new URL(location.href).searchParams.get('snap')
  if (param === 'all')   setTimeout(snapAll,  600)
  if (param === '1' || param === 'current') setTimeout(snapView, 600)
}
