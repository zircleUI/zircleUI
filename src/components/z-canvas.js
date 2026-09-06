import { createZircle } from '../core.js'

const HTMLElementBase = globalThis.HTMLElement ?? class {}

/** Declarative canvas: inert <template data-view="name"> children define views. */
export class ZCanvas extends HTMLElementBase {
  static observedAttributes = ['theme', 'mode', 'shape']

  connectedCallback() {
    this._upgradeProperty('views')
    this._upgradeProperty('options')
    queueMicrotask(() => { if (this.isConnected && !this._ready) this.init() })
  }

  disconnectedCallback() {
    queueMicrotask(() => { if (!this.isConnected) this.destroy() })
  }

  _upgradeProperty(name) {
    if (Object.hasOwn(this, name)) {
      const value = this[name]
      delete this[name]
      this[name] = value
    }
  }

  get ready() { return this._ready ?? this.init() }
  get instance() { return this._instance ?? null }
  get views() { return this._views }
  set views(value) { this._views = value }
  get options() { return this._options }
  set options(value) { this._options = value }

  init() {
    if (this._ready) return this._ready
    const generation = this._generation = (this._generation ?? 0) + 1
    this._controller = new AbortController()
    const signal = this._controller.signal
    const views = { ...this._views }
    let templateError
    for (const template of this.querySelectorAll(':scope > template[data-view]')) {
      const name = template.dataset.view
      if (Object.hasOwn(views, name)) {
        templateError = new Error(`Zircle: duplicate view "${name}".`)
        break
      }
      if (!name.trim() || template.content.children.length !== 1) {
        templateError = new Error('Zircle: each view template needs a nonempty data-view name and exactly one root element.')
        break
      }
      views[name] = () => template.content.firstElementChild.cloneNode(true)
    }
    this._ready = (templateError ? Promise.reject(templateError) : createZircle({
      ...this._options, mount: this, views, signal,
      initialView: this.getAttribute('initial-view') ?? this._options?.initialView ?? Object.keys(views)[0],
      theme: this.getAttribute('theme') ?? this._options?.theme,
      mode: this.getAttribute('mode') ?? this._options?.mode,
      shape: this.getAttribute('shape') ?? this._options?.shape,
      label: this.getAttribute('aria-label') ?? this._options?.label,
      router: this.hasAttribute('router') || this._options?.router
    })).then(instance => {
      if (generation !== this._generation || !this.isConnected) { instance.destroy(); return null }
      this._instance = instance
      for (const name of ['theme', 'mode', 'shape']) this._applyStyleAttribute(name)
      this.setAttribute('data-ready', '')
      return instance
    }).catch(error => {
      if (signal.aborted) return null
      throw error
    })
    this._ready.catch(error => this.dispatchEvent(new CustomEvent('zircle:error', { detail: { error }, bubbles: true })))
    return this._ready
  }

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value || !this._instance) return
    this._applyStyleAttribute(name)
  }

  _applyStyleAttribute(name) {
    const defaults = { theme: 'black', mode: 'dark', shape: 'circle' }
    const value = this.getAttribute(name) ?? this._options?.[name] ?? defaults[name]
    const suffix = `${name[0].toUpperCase()}${name.slice(1)}`
    if (this._instance[`get${suffix}`]() !== value) this._instance[`set${suffix}`](value)
  }

  async setView(name, options) { return (await this.ready)?.setView(name, options) }
  async back() { return (await this.ready)?.back() }

  destroy() {
    this._generation = (this._generation ?? 0) + 1
    this._controller?.abort()
    this._controller = null
    this._instance?.destroy()
    this._instance = null
    this._ready = null
    this.removeAttribute('data-ready')
  }
}
