/**
 * <z-spot>
 * Satellite around a <z-view> (or another <z-spot>) — equivalent to zircle
 * 1.x's `<z-spot>`. Triggers a zoom when `to-view` is set; otherwise behaves
 * as a button / knob / decorative dot.
 *
 * Nested z-spots remain as siblings; we never move them. The image,
 * knob and slider are inserted as additional children alongside the
 * original content.
 *
 * Positioning is by polar coordinates: `orbit` (1-12) sets the distance
 * (orbit/6 × parent radius), `angle` (deg) sets the direction.
 */
import { spotDiameter, viewRadius, polarOffset, normaliseSize } from './sizes.js'

export class ZSpot extends HTMLElement {
  static get observedAttributes () {
    return ['to-view', 'size', 'orbit', 'angle', 'square', 'image-path', 'label',
            'label-pos', 'button', 'knob', 'qty', 'unit', 'min', 'max', 'slider',
            'progress', 'pos', 'class-style']
  }

  constructor () {
    super()
    this._initialized = false
  }

  connectedCallback () {
    if (this.closest('z-view[name]')) return
    this.classList.add('z-spot')
    queueMicrotask(() => { if (this.isConnected) this._render() })
  }

  attributeChangedCallback () {
    if (this.closest('z-view[name]')) return
    if (this._initialized) this._render()
  }

  // ── Geometry ──────────────────────────────────────────────────────────
  _findParentRadiusVmin () {
    let el = this.parentElement
    while (el) {
      if (el.tagName === 'Z-SPOT' && el !== this) {
        return spotDiameter(normaliseSize(el.getAttribute('size') || 'm', 'm')) / 2
      }
      if (el.tagName === 'Z-VIEW') {
        return viewRadius(normaliseSize(el.getAttribute('size') || 'xxl', 'xxl'))
      }
      el = el.parentElement
    }
    return viewRadius('xxl')
  }

  _applyTransform () {
    const orbit = Number(this.getAttribute('orbit') ?? 6)
    const angle = Number(this.getAttribute('angle') ?? 0)
    const parentRadius = this._findParentRadiusVmin()
    const { x, y } = polarOffset({ parentRadiusVmin: parentRadius, orbit, angle })
    const size = normaliseSize(this.getAttribute('size') || 'm', 'm')
    const d = spotDiameter(size)
    this.style.setProperty('--zircle-spot-diameter', `${d}vmin`)
    this.style.width  = `${d}vmin`
    this.style.height = `${d}vmin`
    this.style.transform = `translate(${x}vmin, ${y}vmin)`
  }

  _render () {
    this._applyTransform()

    const toView   = this.getAttribute('to-view')
    const isButton = this.hasAttribute('button')
    const isKnob   = this.hasAttribute('knob')
    const square   = this.hasAttribute('square')
    const img      = this.getAttribute('image-path')
    const label    = this.getAttribute('label')
    const labelPos = this.getAttribute('label-pos') || 'bottom'
    const hasSlider= this.hasAttribute('slider')
    const progress = Number(this.getAttribute('progress') || 0)
    const customCls= this.getAttribute('class-style') || ''

    if (toView) { this.classList.add('zoom-me'); this.dataset.to = toView }
    else        { this.classList.remove('zoom-me'); delete this.dataset.to }
    this.classList.toggle('shape-square', square)
    this.classList.toggle('shape-circle', !square)
    this.classList.toggle('button', isButton)
    if (customCls) this.classList.add(customCls)

    if (this._initialized) {
      if (this._labelEl && label) this._labelEl.querySelector('.inside').textContent = label
      const knob = this.querySelector(':scope > z-knob')
      if (knob) {
        if (this.hasAttribute('qty'))  knob.setAttribute('qty',  this.getAttribute('qty'))
        if (this.hasAttribute('unit')) knob.setAttribute('unit', this.getAttribute('unit'))
      }
      const sliderEl = this.querySelector(':scope > .z-spot-slider-wrap o-progress')
      if (sliderEl) sliderEl.setAttribute('value', String(progress))
      return
    }
    this._initialized = true

    // Capture the "inner content" (non-component children) into a fragment;
    // leave nested z-spots / z-list / etc. as direct children, unmoved.
    const componentTags = new Set(['Z-SPOT', 'Z-LIST', 'Z-MENU', 'Z-GAUGE', 'Z-COMPASS', 'Z-TABS'])
    const inside = document.createDocumentFragment()
    ;[...this.childNodes].forEach(n => {
      const isComp = n.nodeType === Node.ELEMENT_NODE && componentTags.has(n.tagName)
      if (!isComp) { n.remove(); inside.appendChild(n) }
    })

    // Background image
    if (img) {
      const i = document.createElement('img')
      i.src = img; i.alt = ''
      i.className = 'z-spot-image'
      this.insertBefore(i, this.firstChild)
    }

    // Knob (replaces inner content)
    if (isKnob) {
      const knob = document.createElement('z-knob')
      knob.setAttribute('qty',  this.getAttribute('qty') ?? '0')
      knob.setAttribute('unit', this.getAttribute('unit') ?? '')
      knob.setAttribute('min',  this.getAttribute('min') ?? '0')
      knob.setAttribute('max',  this.getAttribute('max') ?? '100')
      knob.addEventListener('change', e => {
        this.setAttribute('qty', String(e.detail.qty))
        this.dispatchEvent(new CustomEvent('change', { detail: e.detail, bubbles: true }))
      })
      this.appendChild(knob)
    } else if (inside.childNodes.length) {
      const content = document.createElement('div')
      content.className = 'z-spot-content'
      content.appendChild(inside)
      this.appendChild(content)
    }

    if (hasSlider) {
      const d = spotDiameter(normaliseSize(this.getAttribute('size') || 'm', 'm'))
      const bb = document.createElement('div')
      bb.className = 'z-spot-slider-wrap bigbang'
      bb.innerHTML =
        `<div class="gravity-spot" style="--o-force:${d + 3}vmin">
           <div class="orbit-12"><o-progress value="${progress}"></o-progress></div>
         </div>`
      this.appendChild(bb)
    }

    if (label) {
      const lab = document.createElement('div')
      lab.className = `z-label ${labelPos}`
      lab.innerHTML = `<div class="inside">${label}</div>`
      this.appendChild(lab)
      this._labelEl = lab
    }
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-spot')) {
  customElements.define('z-spot', ZSpot)
}
