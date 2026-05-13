/**
 * <z-view>
 * Zoomable surface — equivalent to zircle 1.x's `<z-view>`.
 *
 * Implementation notes:
 *   - z-view is a thin shell. The visible circle/square is a separate
 *     `<div class="z-view-shape">` inserted at the start of the children list.
 *   - The user's declared children (z-spot, z-list, …) stay in place as
 *     absolute siblings — we never move them, which preserves Zumly's
 *     `is-current-view` class and avoids unnecessary disconnect/connect
 *     storms on every re-render.
 *   - The optional circular slider is wrapped in a full Orbit chain
 *     (.bigbang → .gravity-spot → .orbit-N) so the framework doesn't flag
 *     it as malformed.
 */
import { viewRadius, normaliseSize } from './sizes.js'

export class ZView extends HTMLElement {
  static get observedAttributes () {
    return ['size', 'square', 'circle', 'image-path', 'label', 'label-pos', 'slider', 'progress', 'ring-shade']
  }

  constructor () {
    super()
    this._initialized = false
  }

  connectedCallback () {
    if (this.hasAttribute('name')) return            // definition, not instance
    this.classList.add('z-view')
    queueMicrotask(() => { if (this.isConnected) this._render() })
  }

  attributeChangedCallback () {
    if (this.hasAttribute('name')) return
    if (this._initialized) this._render()
  }

  _render () {
    const size = normaliseSize(this.getAttribute('size') || 'xxl', 'xxl')
    const radius = viewRadius(size)
    const square = this.hasAttribute('square')
    const shape = square ? 'square' : 'circle'
    const img = this.getAttribute('image-path')
    const label = this.getAttribute('label')
    const labelPos = this.getAttribute('label-pos') || 'bottom'
    const hasSlider = this.hasAttribute('slider')
    const progress = Number(this.getAttribute('progress') || 0)
    const extraShade = this.getAttribute('ring-shade') || ''

    this.style.setProperty('--zircle-view-radius', `${radius}vmin`)

    // ── First render: build the shape and (optional) slider in place ──
    if (!this._initialized) {
      this._initialized = true

      // Move only non-component children (text, paragraphs, …) into the shape.
      const componentTags = new Set(['Z-SPOT', 'Z-LIST', 'Z-MENU', 'Z-GAUGE', 'Z-COMPASS', 'Z-TABS', 'Z-SLIDER', 'Z-SCROLL', 'Z-PAGINATION', 'Z-KNOB'])
      const inside = document.createDocumentFragment()
      ;[...this.childNodes].forEach(n => {
        const isComp = n.nodeType === Node.ELEMENT_NODE && componentTags.has(n.tagName)
        if (!isComp) { n.remove(); inside.appendChild(n) }
      })

      const shapeEl = document.createElement('div')
      shapeEl.className = `z-view-shape shape-${shape} ${extraShade}`
      shapeEl.style.width  = `${radius * 2}vmin`
      shapeEl.style.height = `${radius * 2}vmin`
      if (img) {
        const i = document.createElement('img')
        i.src = img; i.alt = ''
        shapeEl.appendChild(i)
      }
      const content = document.createElement('div')
      content.className = 'z-view-content'
      content.appendChild(inside)
      shapeEl.appendChild(content)
      this.insertBefore(shapeEl, this.firstChild)
      this._shapeEl = shapeEl

      if (label) {
        const lab = document.createElement('div')
        lab.className = `z-label ${labelPos}`
        lab.innerHTML = `<div class="inside">${label}</div>`
        this.appendChild(lab)
        this._labelEl = lab
      }

      if (hasSlider) {
        // Orbit's orbit-N diameter = N × force / 12 (max-orbits). To wrap
        // the view's perimeter we need orbit-12 with force ≈ view diameter.
        const bb = document.createElement('div')
        bb.className = 'z-view-slider-wrap bigbang'
        bb.innerHTML =
          `<div class="gravity-spot" style="--o-force:${(radius * 2) + 6}vmin">
             <div class="orbit-12"><o-progress value="${progress}"></o-progress></div>
           </div>`
        this.appendChild(bb)
      }
      return
    }

    // ── Patch updates ────────────────────────────────────────────────
    if (this._shapeEl) {
      this._shapeEl.style.width  = `${radius * 2}vmin`
      this._shapeEl.style.height = `${radius * 2}vmin`
      this._shapeEl.className = `z-view-shape shape-${shape} ${extraShade}`
    }
    if (this._labelEl) {
      this._labelEl.className = `z-label ${labelPos}`
      const inner = this._labelEl.querySelector('.inside')
      if (inner && label) inner.textContent = label
    }
    const sliderEl = this.querySelector(':scope > .z-view-slider-wrap o-progress')
    if (sliderEl) sliderEl.setAttribute('value', String(progress))
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-view')) {
  customElements.define('z-view', ZView)
}
