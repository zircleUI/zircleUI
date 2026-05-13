/**
 * <z-dialog>
 * A modal dialog that appears centred on top of the current view. Reuses the
 * `z-view-shape` styling for visual consistency.
 *
 * Attributes:
 *   size         xxl|xl|l|m|s|xs                default 'l'
 *   square       presence → square
 *   image-path   background image
 *   self-close   presence → auto-dismiss after `duration` ms (default 3000)
 *   duration     ms                              default 3000
 *
 * Methods: open(), close()
 * Events:  'open', 'close', 'done' (only when self-close fires)
 */
import { viewRadius, normaliseSize } from './sizes.js'

export class ZDialog extends HTMLElement {
  connectedCallback () {
    this._render()
    if (this.hasAttribute('open-on-connect')) this.open()
    if (this.hasAttribute('self-close')) this.open()
  }

  open () {
    this.classList.add('open')
    this.dispatchEvent(new CustomEvent('open', { bubbles: true }))
    if (this.hasAttribute('self-close')) {
      const dur = Number(this.getAttribute('duration') || 3000)
      const start = performance.now()
      const slider = this.querySelector('o-progress.z-dialog-slider')
      const tick = (now) => {
        if (!this.classList.contains('open')) return
        const p = Math.min(100, ((now - start) / dur) * 100)
        if (slider) slider.setAttribute('value', String(p))
        if (p >= 100) { this.dispatchEvent(new CustomEvent('done')); this.close(); return }
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }
  close () {
    this.classList.remove('open')
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }))
  }

  _render () {
    if (this._initialized) return
    this._initialized = true
    const size = normaliseSize(this.getAttribute('size') || 'l', 'l')
    const radius = viewRadius(size)
    const square = this.hasAttribute('square')
    const img = this.getAttribute('image-path')
    const selfClose = this.hasAttribute('self-close')

    const inside = document.createDocumentFragment()
    ;[...this.childNodes].forEach(n => inside.appendChild(n))

    this.innerHTML = ''
    const shape = document.createElement('div')
    shape.className = `z-view-shape shape-${square ? 'square' : 'circle'}`
    shape.style.width  = `${radius * 2}vmin`
    shape.style.height = `${radius * 2}vmin`
    if (img) {
      const i = document.createElement('img')
      i.src = img; i.alt = ''
      shape.appendChild(i)
    }
    const content = document.createElement('div')
    content.className = 'z-view-content'
    content.appendChild(inside)
    shape.appendChild(content)
    this.appendChild(shape)

    if (selfClose) {
      const slider = document.createElement('o-progress')
      slider.className = 'z-dialog-slider'
      slider.setAttribute('value', '0')
      this.appendChild(slider)
    }
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-dialog')) {
  customElements.define('z-dialog', ZDialog)
}
