/**
 * <z-menu>
 * Radial pie-menu built on top of Orbit's <o-arc> segments. Each entry is a
 * coloured wedge that emits a 'select' event when clicked.
 *
 * Attributes:
 *   items   JSON array of strings or { label, color, to } objects
 *   orbit   ring number                  default 5
 *   range   arc span in deg              default 360
 *   from    start angle in deg           default 90
 *   gap     gap between wedges in deg    default 6
 *
 * If an item has a `to` (view name), clicking it zooms there via the nearest
 * <z-canvas>; otherwise it just fires `select` with detail { index, item }.
 */
export class ZMenu extends HTMLElement {
  static get observedAttributes () { return ['items', 'orbit', 'range', 'from', 'gap'] }
  constructor () { super(); this._items = [] }
  set items (v) { this._items = Array.isArray(v) ? v : []; this._render() }
  get items () { return this._items }

  connectedCallback () {
    if (this.hasAttribute('items')) {
      try { this._items = JSON.parse(this.getAttribute('items')) } catch {}
    }
    // Defer one tick so the parent z-view/z-spot has set its CSS custom
    // properties (--zircle-view-radius / --zircle-spot-diameter) and
    // _computeForce() can read them.
    queueMicrotask(() => { if (this.isConnected) this._render() })
  }

  /**
   * Pick a sensible --o-force value:
   *  - explicit `force` attribute always wins
   *  - if inside a <z-spot>, fit the spot's diameter
   *  - if inside a <z-view>, fit ~1.7× the view radius (≈ view diameter)
   *  - otherwise fall back to 60vmin
   */
  /**
   * Pick --o-force so the active orbit ring fills the visible area.
   * Orbit's orbit-N diameter is `N × force / 12`, so:
   *   force = target_diameter × 12 / N
   * target_diameter falls back to the parent's spot diameter (×0.95) or
   * view diameter (≈ radius × 1.8) or a 60vmin default.
   */
  _computeForce () {
    if (this.hasAttribute('force')) return this.getAttribute('force')
    const orbit = Math.max(1, Number(this.getAttribute('orbit') || 6))
    const cs = getComputedStyle(this)
    const spotD = parseFloat(cs.getPropertyValue('--zircle-spot-diameter'))
    const viewR = parseFloat(cs.getPropertyValue('--zircle-view-radius'))
    const target = isFinite(spotD) ? spotD * 0.95
                  : isFinite(viewR) ? viewR * 1.8
                  : 60
    return `${target * 12 / orbit}vmin`
  }
  attributeChangedCallback (name) {
    if (name === 'items') { try { this._items = JSON.parse(this.getAttribute('items')) } catch {} }
    this._render()
  }

  _render () {
    if (!this.isConnected) return
    const orbit = Number(this.getAttribute('orbit') || 5)
    const range = Number(this.getAttribute('range') || 360)
    const from  = Number(this.getAttribute('from')  || 90)
    const gap   = Number(this.getAttribute('gap')   || 6)

    this.innerHTML = ''
    const bb = document.createElement('div')
    bb.className = 'bigbang'
    const gs = document.createElement('div')
    gs.className = 'gravity-spot'
    gs.style.setProperty('--o-force', this._computeForce())
    const orbitEl = document.createElement('div')
    orbitEl.className = `orbit-${orbit} fit-range`
    orbitEl.style.setProperty('--o-range', `${range}deg`)
    orbitEl.style.setProperty('--o-from',  `${from}deg`)

    // Each arc gets an explicit `value` so they stack predictably around
    // the ring (Orbit accumulates `--o_stack` from previousElementSibling).
    const slice = this._items.length > 0 ? (100 / this._items.length) : 0
    this._items.forEach((it, i) => {
      const norm = typeof it === 'string' ? { label: it } : it
      const arc = document.createElement('o-arc')
      arc.className = `gap-${gap}`
      arc.setAttribute('value', String(slice))
      if (norm.color) arc.style.setProperty('--o-fill', norm.color)
      if (norm.label) arc.textContent = norm.label
      arc.addEventListener('click', e => {
        e.stopPropagation()
        if (norm.to) this.closest('z-canvas')?.goTo(norm.to)
        this.dispatchEvent(new CustomEvent('select', { detail: { index: i, item: norm }, bubbles: true }))
      })
      orbitEl.appendChild(arc)
    })
    gs.appendChild(orbitEl)
    bb.appendChild(gs)
    this.appendChild(bb)
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-menu')) {
  customElements.define('z-menu', ZMenu)
}
