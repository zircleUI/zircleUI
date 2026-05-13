/**
 * <z-canvas>
 * Root container of a zircle app. Wraps a Zumly instance and applies theme,
 * mode and shape classes. Declared <z-view name="…"> children are captured
 * SYNCHRONOUSLY (before any of their inner microtasks can fire) and removed
 * from the DOM; Zumly later instantiates them from their stored HTML.
 *
 * The canvas gains a `data-ready` attribute once Zumly's init() resolves.
 * z-view / z-spot check that flag (and the `name` attribute) so the original
 * definitions never render themselves — only the clones Zumly mounts do.
 */
import { Zumly, ZumlyRouter } from 'zumly'

const THEMES = ['white', 'light-blue', 'black', 'purple', 'orange', 'yellow', 'blue', 'green', 'red', 'gray']
const MODES  = ['light', 'light-filled', 'dark', 'dark-filled']
const SHAPES = ['circle', 'square']

export class ZCanvas extends HTMLElement {
  static get observedAttributes () { return ['theme', 'mode', 'shape'] }

  constructor () {
    super()
    this._initialized = false
    this._views = {}
    this._initialView = null
    this.app = null
  }

  connectedCallback () {
    if (this._initialized) return
    this._initialized = true
    this.classList.add('zumly-canvas', 'zircle')
    this._applyStyle()

    // Make sure we have a stable id for Zumly's mount selector.
    if (!this.id) this.id = `zircle-canvas-${Math.random().toString(36).slice(2, 8)}`

    // Capture SYNCHRONOUSLY so any child <z-view> definitions are pulled out
    // of the DOM before their connectedCallback / microtasks have a chance
    // to render them.
    this._captureViews()

    queueMicrotask(() => this._boot())
  }

  attributeChangedCallback () {
    if (!this._initialized) return
    this._applyStyle()
  }

  _applyStyle () {
    const theme = this.getAttribute('theme') || 'black'
    const mode  = this.getAttribute('mode')  || 'dark'
    const shape = this.getAttribute('shape') || 'circle'
    ;[...this.classList].forEach(c => {
      if (c.startsWith('theme-') || c.startsWith('mode-') || c.startsWith('shape-')) {
        this.classList.remove(c)
      }
    })
    if (THEMES.includes(theme)) this.classList.add(`theme-${theme}`)
    if (MODES.includes(mode))   this.classList.add(`mode-${mode}`)
    if (SHAPES.includes(shape)) this.classList.add(`shape-${shape}`)
  }

  _captureViews () {
    const declared = [...this.querySelectorAll(':scope > z-view[name]')]
    declared.forEach(node => {
      const name = node.getAttribute('name')
      if (!name) return
      // Clone, strip the `name` attribute on the clone so when Zumly mounts
      // it the component does NOT think it's a template.
      const tpl = node.cloneNode(true)
      tpl.removeAttribute('name')
      this._views[name] = tpl.outerHTML
      this._initialView ??= name
      node.remove()
    })
  }

  async _boot () {
    const initial = this.getAttribute('initial-view') || this._initialView
    if (!initial || !this._views[initial]) {
      console.warn('[z-canvas] no views defined; add <z-view name="…"> children or set initial-view')
      return
    }

    const useRouter = this.hasAttribute('router')
    const debug = this.hasAttribute('debug')
    const lateral = this.getAttribute('lateral-nav')
    const depthPos = this.getAttribute('depth-nav') || 'bottom-left'

    try {
      this.app = new Zumly({
        mount: '#' + this.id,
        initialView: initial,
        views: this._views,
        transitions: {
          driver: 'css',
          duration: '900ms',
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          cover: 'width',
          effects: ['blur(2px) brightness(0.7)', 'blur(6px) brightness(0.4)'],
          hideTrigger: 'fade'
        },
        depthNav: { position: depthPos },
        lateralNav: lateral === 'off' || lateral === null
          ? false
          : (lateral === 'true' ? true : { mode: lateral || 'auto' }),
        inputs: { wheel: false },
        debug
      })
      if (useRouter) this.app.use(ZumlyRouter)
      await this.app.init()
    } catch (err) {
      console.error('[z-canvas] failed to start Zumly:', err)
      this.dispatchEvent(new CustomEvent('error', { detail: err }))
      return
    }

    this.setAttribute('data-ready', 'true')
    window.zircle = this
    this.dispatchEvent(new CustomEvent('ready', { bubbles: true }))

    // Self-check: Zumly relies on `.is-current-view` to find the current view
    // during zoom-in. If our component code accidentally strips it the whole
    // navigation breaks, so warn loudly (and best-effort restore).
    const current = this.querySelector('.is-current-view')
    if (!current) {
      const first = this.querySelector(`[data-view-name="${initial}"]`)
      if (first) {
        first.classList.add('is-current-view')
        console.warn('[z-canvas] re-applied missing .is-current-view on initial view')
      } else {
        console.error('[z-canvas] initial view not found in DOM after init!')
      }
    }
  }

  // ── Public API ────────────────────────────────────────────────────────
  goTo (name, opts)   { return this.app?.goTo(name, opts) }
  zoomTo (name, opts) { return this.app?.zoomTo(name, opts) }
  back ()             { return this.app?.back() }
  zoomOut ()          { return this.app?.zoomOut() }
  getCurrentViewName(){ return this.app?.getCurrentViewName() }
  setTheme (t) { this.setAttribute('theme', t) }
  setMode (m)  { this.setAttribute('mode', m) }
  setShape (s) { this.setAttribute('shape', s) }
  getTheme () { return this.getAttribute('theme') }
  getMode ()  { return this.getAttribute('mode') }
  getShape () { return this.getAttribute('shape') }
  destroy () { this.app?.destroy() }
}

if (typeof window !== 'undefined' && !customElements.get('z-canvas')) {
  customElements.define('z-canvas', ZCanvas)
}
