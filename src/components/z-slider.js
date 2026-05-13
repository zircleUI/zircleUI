/**
 * <z-slider>
 * Circular progress bar — thin wrapper around Orbit's <o-progress> with
 * zircle styling. Can be used standalone or inside another component.
 *
 * Attributes:
 *   progress   0..100        default 0
 *   color      CSS color     overrides --o-fill
 */
export class ZSlider extends HTMLElement {
  static get observedAttributes () { return ['progress', 'color'] }
  connectedCallback () { queueMicrotask(() => { if (this.isConnected) this._render() }) }
  attributeChangedCallback () { if (this.isConnected) this._render() }
  _render () {
    const p = Number(this.getAttribute('progress') || 0)
    const color = this.getAttribute('color')

    // Already initialised → patch in place.
    let bar = this.querySelector('o-progress')
    if (bar) {
      bar.setAttribute('value', String(p))
      if (color) bar.style.setProperty('--o-fill', color)
      return
    }

    // First render — wrap o-progress in the full Orbit chain so it shows up.
    const cs = getComputedStyle(this)
    const spotD = parseFloat(cs.getPropertyValue('--zircle-spot-diameter'))
    const viewR = parseFloat(cs.getPropertyValue('--zircle-view-radius'))
    const target = isFinite(spotD) ? spotD * 0.95
                  : isFinite(viewR) ? viewR * 1.8
                  : 40
    const force = `${target}vmin`  // orbit-12 fills the full force

    this.innerHTML =
      `<div class="bigbang" style="pointer-events:none">
         <div class="gravity-spot" style="--o-force:${force}">
           <div class="orbit-12">
             <o-progress value="${p}"${color ? ` style="--o-fill:${color}"` : ''}></o-progress>
           </div>
         </div>
       </div>`
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-slider')) {
  customElements.define('z-slider', ZSlider)
}
