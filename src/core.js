import { Zumly, ZumlyRouter } from 'zumly'
import { Orbit } from '@zumer/orbit'
import { hydrateSurfaces } from './components/surface.js'

export const THEMES = Object.freeze(['white', 'light-blue', 'black', 'purple', 'orange', 'yellow', 'blue', 'green', 'red', 'gray'])
export const MODES = Object.freeze(['light', 'light-filled', 'dark', 'dark-filled'])
const instances = new WeakMap()
let sequence = 0

function choice(value, allowed, label) {
  if (!allowed.includes(value)) throw new TypeError(`Zircle: unknown ${label} "${value}". Use ${allowed.join(', ')}.`)
  return value
}

/** Mount a self-contained Zircle canvas. Each canvas has its own state and history. */
export async function createZircle(options = {}) {
  if (typeof document === 'undefined') throw new Error('Zircle: createZircle() needs a browser. Call it after mounting your component.')
  if (options.signal?.aborted) throw new DOMException('Zircle initialization was cancelled.', 'AbortError')
  const mount = typeof options.mount === 'string' ? document.querySelector(options.mount) : options.mount
  if (!(mount instanceof HTMLElement) || !mount.isConnected) throw new Error('Zircle: mount must be a connected HTML element or a matching selector.')
  if (mount.getRootNode() !== document) throw new Error('Zircle: Zumly requires a mount in the document light DOM.')
  if (instances.has(mount)) throw new Error('Zircle: this element already has an instance. Destroy it before mounting again.')
  const views = options.views
  if (!views || typeof views !== 'object' || !Object.keys(views).length) throw new TypeError('Zircle: provide a nonempty views map.')
  const initialView = options.initialView ?? Object.keys(views)[0]
  if (!Object.hasOwn(views, initialView)) throw new Error(`Zircle: initial view "${initialView}" is not registered.`)
  let theme = choice(options.theme ?? 'black', THEMES, 'theme')
  let mode = choice(options.mode ?? 'dark', MODES, 'mode')
  let shape = choice(options.shape ?? 'circle', ['circle', 'square'], 'shape')
  let destroyed = false
  let abortListener
  const stage = document.createElement('div')
  stage.className = 'zircle z-stage'
  const canvas = document.createElement('div')
  canvas.className = 'zircle zumly-canvas'
  canvas.dataset.zircleInstance = String(++sequence)
  canvas.setAttribute('aria-label', options.label ?? 'Zircle')
  const applyStyle = () => {
    canvas.dataset.theme = theme
    canvas.dataset.mode = mode
    canvas.dataset.shape = shape
    stage.dataset.theme = theme
    stage.dataset.mode = mode
    stage.dataset.shape = shape
  }
  applyStyle()
  const originalPosition = mount.style.position
  const needsPosition = getComputedStyle(mount).position === 'static'
  if (needsPosition) mount.style.position = 'relative'
  stage.append(canvas)
  mount.append(stage)
  const resize = () => {
    const { width, height } = mount.getBoundingClientRect()
    // A square scene scales uniformly: Zumly's saved zoom poses then stay valid
    // when a host changes aspect ratio or resizes independently of the window.
    const side = Math.max(1, Math.min(840, width, height))
    canvas.style.width = `${side}px`
    canvas.style.height = `${side}px`
    canvas.style.left = `${(width - side) / 2}px`
    canvas.style.top = `${(height - side) / 2}px`
    const diameter = side * 0.5
    for (const [size, ratio] of Object.entries({ xxl: 1, xl: 260 / 420, l: 160 / 420, m: 100 / 420, s: 62 / 420, xs: 38 / 420, xxs: 16 / 420 })) {
      canvas.style.setProperty(`--z-size-${size}`, `${diameter * ratio}px`)
    }
    Orbit.refresh(canvas)
  }
  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(mount)
  const app = new Zumly({
    mount: `[data-zircle-instance="${sequence}"]`, initialView, views,
    transitions: { driver: 'css', duration: '700ms', ease: 'ease-in-out', cover: 'width', effects: ['blur(1px) opacity(0.35)', 'blur(3px) opacity(0.12)'], hideTrigger: false, ...options.transitions },
    depthNav: false, lateralNav: false,
    inputs: { click: true, touch: true, keyboard: true, wheel: false, ...options.inputs },
    debug: options.debug ?? false,
    componentContext: options.context ?? new Map(),
    preload: options.preload,
    deferred: false
  })
  const events = new EventTarget()
  const emit = (type, detail) => {
    events.dispatchEvent(new CustomEvent(type, { detail }))
    mount.dispatchEvent(new CustomEvent(`zircle:${type}`, { detail, bubbles: true }))
  }
  const refresh = () => { hydrateSurfaces(canvas); resize() }
  app.on('viewMounted', ({ node, viewName }) => {
    hydrateSurfaces(node)
    Orbit.refresh(node)
    if (node.classList.contains('is-current-view') && !node.style.transform) {
      node.style.transform = `translate(${(canvas.clientWidth - node.offsetWidth) / 2}px, ${(canvas.clientHeight - node.offsetHeight) / 2}px)`
    }
    emit('viewmount', { view: viewName, node })
  })
  const back = document.createElement('button')
  back.type = 'button'
  back.className = 'z-back z-depth-nav'
  back.textContent = '←'
  back.setAttribute('aria-label', options.backLabel ?? 'Go back')
  back.hidden = true
  back.addEventListener('click', () => api.back())
  const notifyNavigation = () => {
    back.hidden = app.zoomLevel() <= 1
    if (options.backButton !== false) canvas.append(back)
    emit('viewchange', { view: app.getCurrentViewName(), depth: Math.max(0, app.zoomLevel() - 1) })
  }
  for (const event of ['afterZoomIn', 'afterZoomOut', 'afterLateral']) app.on(event, notifyNavigation)
  if (options.router) app.use(ZumlyRouter, typeof options.router === 'object' ? options.router : undefined)
  const validateTarget = name => {
    if (destroyed) throw new Error('Zircle: this instance has been destroyed.')
    if (!Object.hasOwn(views, name)) throw new Error(`Zircle: view "${name}" is not registered.`)
  }
  const api = {
    app, canvas, mount,
    getCurrentViewName: () => app.getCurrentViewName(),
    getHistory: () => app.storedViews.map(stage => stage.views[0].viewName),
    getHistoryLength: () => app.storedViews.length,
    getTheme: () => theme,
    getMode: () => mode,
    getShape: () => shape,
    setTheme(value) { theme = choice(value, THEMES, 'theme'); applyStyle(); emit('stylechange', { theme, mode, shape }); return api },
    setMode(value) { mode = choice(value, MODES, 'mode'); applyStyle(); emit('stylechange', { theme, mode, shape }); return api },
    setShape(value) { shape = choice(value, ['circle', 'square'], 'shape'); applyStyle(); hydrateSurfaces(canvas); emit('stylechange', { theme, mode, shape }); return api },
    async goTo(name, opts = {}) { validateTarget(name); await app.goTo(name, opts) },
    async zoomTo(name, opts = {}) { validateTarget(name); await app.zoomTo(name, opts) },
    async setView(target, opts = {}) {
      const name = typeof target === 'string' ? target : target?.name
      validateTarget(name)
      await app.goTo(name, { ...opts, props: typeof target === 'object' ? target.params ?? opts.props : opts.props })
    },
    async back() { if (!destroyed) await app.back() },
    async zoomOut() { if (!destroyed) await app.zoomOut() },
    goBack() { return api.back() },
    refresh,
    on(type, handler) { events.addEventListener(type, handler); return () => events.removeEventListener(type, handler) },
    destroy() {
      if (destroyed) return
      destroyed = true
      if (abortListener) options.signal.removeEventListener('abort', abortListener)
      observer.disconnect()
      app.destroy()
      stage.remove()
      if (needsPosition && mount.style.position === 'relative') mount.style.position = originalPosition
      instances.delete(mount)
      emit('destroy', {})
    }
  }
  instances.set(mount, api)
  if (options.signal) {
    abortListener = () => api.destroy()
    options.signal.addEventListener('abort', abortListener, { once: true })
  }
  try {
    await app.init()
    if (options.signal?.aborted) throw new DOMException('Zircle initialization was cancelled.', 'AbortError')
    if (!app.isValid || !app.getCurrentViewName()) throw new Error(`Zircle: could not render initial view "${initialView}".`)
    refresh()
    notifyNavigation()
    emit('ready', { instance: api })
    return api
  } catch (error) {
    api.destroy()
    throw error
  }
}
