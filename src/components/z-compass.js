/**
 * <z-compass>
 * Cardinal-direction compass that rotates to `heading`.
 *
 * Attributes:
 *   heading  deg, 0 = North        default 0
 *   orbit    ring number for N/S/E/W labels   default 5
 *   show-degrees  presence → also shows the numeric heading at the centre
 */
export class ZCompass extends HTMLElement {
  static get observedAttributes () { return ['heading', 'orbit', 'show-degrees'] }
  connectedCallback () { queueMicrotask(() => { if (this.isConnected) this._render() }) }
  attributeChangedCallback () { if (this.isConnected) this._render() }

  set heading (v) { this.setAttribute('heading', String(v)) }
  get heading () { return Number(this.getAttribute('heading') || 0) }

  _computeForce () {
    if (this.hasAttribute('force')) return this.getAttribute('force')
    const orbit = Math.max(1, Number(this.getAttribute('orbit') || 5))
    const cs = getComputedStyle(this)
    // Parse numeric vmin out of inherited properties; Orbit needs --o-force
    // as a plain length, not a calc() expression.
    const spotD = parseFloat(cs.getPropertyValue('--zircle-spot-diameter'))
    const viewR = parseFloat(cs.getPropertyValue('--zircle-view-radius'))
    const target = isFinite(spotD) ? spotD * 0.95
                  : isFinite(viewR) ? viewR * 1.8
                  : 60
    return `${target * 12 / orbit}vmin`
  }

  _render () {
    if (!this.isConnected) return
    const heading = this.heading
    const orbit = Number(this.getAttribute('orbit') || 5)
    const showDeg = this.hasAttribute('show-degrees')

    this.innerHTML = ''
    const bb = document.createElement('div')
    bb.className = 'bigbang'
    const gs = document.createElement('div')
    gs.className = 'gravity-spot'
    gs.style.setProperty('--o-force', this._computeForce())

    const ring = document.createElement('div')
    // No `fit-range` — that divides the range by (n-1), which collapses N
    // and W onto each other when n=4. A full 360° ÷ 4 step gives even quarters.
    ring.className = `orbit-${orbit}`
    ring.style.setProperty('--o-from', `${-heading}deg`)
    ring.style.setProperty('--o-range', '360deg')
    ;['N','E','S','W'].forEach(c => {
      const sat = document.createElement('div')
      sat.className = `satellite ${c === 'N' ? 'accent' : ''}`
      sat.innerHTML = `<div class="capsule">${c}</div>`
      ring.appendChild(sat)
    })
    gs.appendChild(ring)

    const centre = document.createElement('div')
    centre.className = 'orbit-0'
    centre.innerHTML = `<div class="satellite at-center"><div class="capsule">${showDeg ? Math.round(heading) + '°' : '·'}</div></div>`
    gs.appendChild(centre)

    bb.appendChild(gs)
    this.appendChild(bb)
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-compass')) {
  customElements.define('z-compass', ZCompass)
}
