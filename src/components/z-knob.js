/**
 * <z-knob>
 * Inner numeric control used by <z-spot knob> (or standalone).
 * Click on the upper half → +1, lower half → −1. Wheel & arrows also work.
 *
 * Attributes:
 *   qty    current value      default 0
 *   unit   suffix             default ''
 *   min    lower bound        default 0
 *   max    upper bound        default 100
 *
 * Emits 'change' with detail { qty }.
 */
export class ZKnob extends HTMLElement {
  static get observedAttributes () { return ['qty', 'unit', 'min', 'max'] }

  connectedCallback () {
    this.tabIndex = 0
    this._render()
    this.addEventListener('click', this._onClick)
    this.addEventListener('wheel',  this._onWheel, { passive: false })
    this.addEventListener('keydown', this._onKey)
  }

  attributeChangedCallback () { this._render() }

  get qty () { return Number(this.getAttribute('qty') ?? 0) }
  get min () { return Number(this.getAttribute('min') ?? 0) }
  get max () { return Number(this.getAttribute('max') ?? 100) }

  _clamp (v) { return Math.max(this.min, Math.min(this.max, v)) }

  _set (next) {
    const q = this._clamp(next)
    this.setAttribute('qty', String(q))
    this.dispatchEvent(new CustomEvent('change', { detail: { qty: q }, bubbles: true }))
  }

  _onClick = (e) => {
    const r = this.getBoundingClientRect()
    const local = e.clientY - r.top
    this._set(local < r.height / 2 ? this.qty + 1 : this.qty - 1)
    e.stopPropagation()
  }
  _onWheel = (e) => {
    e.preventDefault()
    this._set(this.qty + (e.deltaY < 0 ? 1 : -1))
  }
  _onKey = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight')      { this._set(this.qty + 1); e.preventDefault() }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { this._set(this.qty - 1); e.preventDefault() }
  }

  _render () {
    const unit = this.getAttribute('unit') ?? ''
    this.innerHTML = `<span class="z-knob-value">${this.qty}<small>${unit}</small></span>`
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-knob')) {
  customElements.define('z-knob', ZKnob)
}
