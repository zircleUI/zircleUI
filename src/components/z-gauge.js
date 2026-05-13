/**
 * <z-gauge>
 * Speedometer-style gauge built on Orbit's <o-arc>. Displays one or two
 * values: a filled arc + an optional needle/secondary mark.
 *
 * Attributes:
 *   value     0..max               default 0
 *   max       upper bound          default 100
 *   range     arc span in deg      default 270
 *   from      start angle in deg   default 135  (lower-left)
 *   orbit     ring number          default 4
 *   label     centre label         optional
 *   color     CSS color (--o-fill) optional
 *
 * Emits 'change' if `value` is updated via the property setter.
 */
export class ZGauge extends HTMLElement {
  static get observedAttributes () { return ['value', 'max', 'range', 'from', 'orbit', 'label', 'color'] }
  connectedCallback () { queueMicrotask(() => { if (this.isConnected) this._render() }) }
  attributeChangedCallback () { if (this.isConnected) this._render() }

  set value (v) {
    this.setAttribute('value', String(v))
    this.dispatchEvent(new CustomEvent('change', { detail: { value: Number(v) }, bubbles: true }))
  }
  get value () { return Number(this.getAttribute('value') || 0) }

  _computeForce () {
    if (this.hasAttribute('force')) return this.getAttribute('force')
    const orbit = Math.max(1, Number(this.getAttribute('orbit') || 4))
    const cs = getComputedStyle(this)
    const spotD = parseFloat(cs.getPropertyValue('--zircle-spot-diameter'))
    const viewR = parseFloat(cs.getPropertyValue('--zircle-view-radius'))
    const target = isFinite(spotD) ? spotD * 0.95
                  : isFinite(viewR) ? viewR * 1.8
                  : 60
    return `${target * 12 / orbit}vmin`
  }

  _render () {
    if (!this.isConnected) return
    const max   = Number(this.getAttribute('max')   || 100)
    const value = Math.max(0, Math.min(max, Number(this.getAttribute('value') || 0)))
    const pct   = (value / max) * 100
    const range = Number(this.getAttribute('range') || 270)
    const from  = Number(this.getAttribute('from')  || 135)
    const orbit = Number(this.getAttribute('orbit') || 4)
    const color = this.getAttribute('color')
    const label = this.getAttribute('label')

    this.innerHTML = ''
    const bb = document.createElement('div')
    bb.className = 'bigbang'
    const gs = document.createElement('div')
    gs.className = 'gravity-spot'
    gs.style.setProperty('--o-force', this._computeForce())

    const ring = document.createElement('div')
    ring.className = `orbit-${orbit}`
    ring.style.setProperty('--o-range', `${range}deg`)
    ring.style.setProperty('--o-from',  `${from}deg`)
    const arc = document.createElement('o-arc')
    arc.setAttribute('value', String(pct))
    if (color) arc.style.setProperty('--o-fill', color)
    ring.appendChild(arc)
    gs.appendChild(ring)

    const centre = document.createElement('div')
    centre.className = 'orbit-0'
    centre.innerHTML = label
      ? `<div class="satellite at-center"><div class="capsule">${label}<br><b>${value}</b></div></div>`
      : `<div class="satellite at-center"><div class="capsule"><b>${value}</b></div></div>`
    gs.appendChild(centre)

    bb.appendChild(gs)
    this.appendChild(bb)
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-gauge')) {
  customElements.define('z-gauge', ZGauge)
}
