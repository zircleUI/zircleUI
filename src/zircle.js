/**
 * Zircle 2.x — zoomable UI built on Orbit (radial layout, CSS) and Zumly
 * (zoom navigation, JS), exposed as a set of declarative web components.
 *
 * Importing this file:
 *   - registers every <z-*> custom element (z-canvas, z-view, z-spot, …)
 *   - re-exports a small JS API (`createZircle`) for code-first setups
 *
 * Orbit (CSS + web components) must be loaded separately, either via
 *   <link rel="stylesheet" href=".../orbit.css">
 *   <script src=".../orbit.js"></script>
 * or in a bundler:
 *   import '@zumer/orbit/style'
 *   import '@zumer/orbit'
 */
import { Zumly, ZumlyRouter } from 'zumly'
import './components/index.js'

const THEMES = new Set(['white', 'light-blue', 'black', 'purple', 'orange',
                        'yellow', 'blue', 'green', 'red', 'gray'])
const MODES  = new Set(['light', 'light-filled', 'dark', 'dark-filled'])
const SHAPES = new Set(['circle', 'square'])

function applyStyle (canvas, { theme, mode, shape }) {
  if (!canvas) return
  ;[...canvas.classList].forEach(c => {
    if (c.startsWith('theme-') || c.startsWith('mode-') || c.startsWith('shape-')) {
      canvas.classList.remove(c)
    }
  })
  if (theme && THEMES.has(theme)) canvas.classList.add(`theme-${theme}`)
  if (mode && MODES.has(mode))    canvas.classList.add(`mode-${mode}`)
  if (shape && SHAPES.has(shape)) canvas.classList.add(`shape-${shape}`)
}

/**
 * Code-first alternative to the declarative <z-canvas> element. Useful when
 * views come from JS modules (e.g. fetched at runtime) rather than being
 * declared in HTML.
 */
export async function createZircle (options = {}) {
  const {
    mount, initialView, views,
    theme = 'black', mode = 'dark', shape = 'circle',
    router = false,
    transitions, depthNav, lateralNav, inputs,
    debug = false,
    componentContext, preload, deferred
  } = options

  if (!mount)       throw new Error('zircle: "mount" is required')
  if (!initialView) throw new Error('zircle: "initialView" is required')
  if (!views)       throw new Error('zircle: "views" is required')

  const canvas = typeof mount === 'string' ? document.querySelector(mount) : mount
  if (!canvas) throw new Error(`zircle: mount selector "${mount}" not found`)
  canvas.classList.add('zumly-canvas', 'zircle')
  applyStyle(canvas, { theme, mode, shape })

  const app = new Zumly({
    mount: typeof mount === 'string' ? mount : canvas,
    initialView,
    views,
    transitions: {
      driver: 'css',
      duration: '900ms',
      ease: 'ease-in-out',
      cover: 'width',
      effects: ['blur(2px) brightness(0.7)', 'blur(6px) brightness(0.4)'],
      hideTrigger: false,
      ...transitions
    },
    depthNav: depthNav ?? { position: 'bottom-left' },
    lateralNav: lateralNav ?? false,
    inputs: inputs ?? { wheel: false },
    componentContext,
    preload,
    deferred,
    debug
  })

  if (router) app.use(ZumlyRouter)

  await app.init()

  const zircle = {
    app, canvas,
    setTheme: t => applyStyle(canvas, { theme: t, mode: currentMode(), shape: currentShape() }),
    setMode:  m => applyStyle(canvas, { theme: currentTheme(), mode: m, shape: currentShape() }),
    setShape: s => applyStyle(canvas, { theme: currentTheme(), mode: currentMode(), shape: s }),
    getTheme: () => currentTheme(),
    getMode:  () => currentMode(),
    getShape: () => currentShape(),
    goTo:     (name, opts) => app.goTo(name, opts),
    zoomTo:   (name, opts) => app.zoomTo(name, opts),
    back:     () => app.back(),
    zoomOut:  () => app.zoomOut(),
    getCurrentViewName: () => app.getCurrentViewName(),
    destroy:  () => app.destroy()
  }
  function currentTheme () { return classMatch(canvas, 'theme-') }
  function currentMode ()  { return classMatch(canvas, 'mode-') }
  function currentShape () { return classMatch(canvas, 'shape-') }
  return zircle
}

function classMatch (el, prefix) {
  if (!el) return null
  const hit = [...el.classList].find(c => c.startsWith(prefix))
  return hit ? hit.slice(prefix.length) : null
}

export { Zumly, ZumlyRouter }
export default createZircle
