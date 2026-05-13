/**
 * <z-pagination>
 * Stand-alone version of the pagination dots used by <z-list>. Can be used
 * to drive any external collection.
 *
 * Attributes:
 *   pages    number of pages
 *   active   current page index (0-based)
 *   orbit    ring number for the dots          default 8
 *   from     base angle (deg)                  default 90
 *
 * Emits 'page-change' with detail { index }.
 */
export class ZPagination extends HTMLElement {
  static get observedAttributes () { return ['pages', 'active', 'orbit', 'from'] }
  connectedCallback () { this._render() }
  attributeChangedCallback () { this._render() }
  _render () {
    if (!this.isConnected) return
    const pages  = Math.max(1, Number(this.getAttribute('pages')  || 1))
    const active = Math.min(pages - 1, Math.max(0, Number(this.getAttribute('active') || 0)))
    const orbit  = Number(this.getAttribute('orbit') || 8)
    const from   = Number(this.getAttribute('from')  || 90)
    // Spread dots across ~60° so they breathe even with many pages.
    const step = 60 / Math.max(1, pages - 1)
    this.innerHTML = ''
    for (let p = 0; p < pages; p++) {
      const dot = document.createElement('z-spot')
      dot.setAttribute('size', 'xxs')
      dot.setAttribute('orbit', orbit)
      dot.setAttribute('angle', from - (p - (pages - 1) / 2) * step)
      dot.setAttribute('button', '')
      dot.classList.add('z-pagination')
      if (p === active) dot.classList.add('active')
      dot.addEventListener('click', e => {
        e.stopPropagation()
        this.setAttribute('active', String(p))
        this.dispatchEvent(new CustomEvent('page-change', { detail: { index: p }, bubbles: true }))
      })
      this.appendChild(dot)
    }
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-pagination')) {
  customElements.define('z-pagination', ZPagination)
}
