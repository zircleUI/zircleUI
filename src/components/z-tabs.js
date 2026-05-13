/**
 * <z-tabs>
 * Lateral navigation between sibling views — small spots on an outer ring
 * that switch views without zooming.
 *
 * Attributes:
 *   views    JSON array of strings (view names) or { name, label, icon }
 *   active   currently active view name
 *   orbit    ring number for the dots         default 10
 *   range    arc span in deg                  default 90
 *   from     start angle in deg               default 0
 *   size     size class                        default 'xs'
 *
 * Triggers Zumly lateral navigation on click. Watches the canvas for
 * navigation events and updates `active` automatically.
 */
export class ZTabs extends HTMLElement {
  static get observedAttributes () { return ['views', 'active', 'orbit', 'range', 'from', 'size'] }
  connectedCallback () {
    this._render()
    const canvas = this.closest('z-canvas')
    if (canvas) {
      canvas.addEventListener('ready', () => {
        canvas.app.on('afterLateral', () => this.setAttribute('active', canvas.getCurrentViewName()))
      }, { once: true })
    }
  }
  attributeChangedCallback () { this._render() }

  _render () {
    if (!this.isConnected) return
    let views = []
    try { views = JSON.parse(this.getAttribute('views') || '[]') } catch {}
    if (!Array.isArray(views) || views.length === 0) { this.innerHTML = ''; return }
    const active = this.getAttribute('active')
    const orbit  = Number(this.getAttribute('orbit') || 10)
    const range  = Number(this.getAttribute('range') || 90)
    const from   = Number(this.getAttribute('from')  || 0)
    const size   = this.getAttribute('size') || 'xs'
    const n = views.length
    const step = range / n

    this.innerHTML = ''
    views.forEach((v, i) => {
      const norm = typeof v === 'string' ? { name: v, label: v } : v
      const spot = document.createElement('z-spot')
      spot.setAttribute('size', size)
      spot.setAttribute('orbit', orbit)
      spot.setAttribute('angle', from + step * i + step / 2 - 90)
      spot.setAttribute('button', '')
      spot.setAttribute('label', norm.label || norm.name)
      if (norm.icon) spot.textContent = norm.icon
      if (norm.name === active) spot.classList.add('active')
      spot.addEventListener('click', e => {
        e.stopPropagation()
        const canvas = this.closest('z-canvas')
        canvas?.goTo(norm.name, { mode: 'lateral' })
      })
      this.appendChild(spot)
    })
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-tabs')) {
  customElements.define('z-tabs', ZTabs)
}
