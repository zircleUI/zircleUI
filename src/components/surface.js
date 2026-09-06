import { normaliseSize, sizeVariable } from './sizes.js'

const HTMLElementBase = globalThis.HTMLElement || class {}
const own = (node, key) => Object.prototype.hasOwnProperty.call(node, key)
const booleanAttributes = new Set(['circle', 'square', 'button', 'disabled', 'slider', 'knob'])
const attributes = [
  'size', 'distance', 'angle', 'circle', 'square', 'label', 'label-pos',
  'image-path', 'to-view', 'button', 'disabled', 'slider', 'progress',
  'knob', 'qty', 'unit', 'min', 'max', 'step', 'pos'
]
const defaults = { distance: 100, angle: 0, progress: 0, qty: 0, min: 0, max: 100, step: 1 }
const properties = Object.fromEntries(attributes.map(attribute => [
  attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), attribute
]))

function numberAttribute (element, name, fallback) {
  const text = element.getAttribute(name)
  const value = text === null || text.trim() === '' ? fallback : Number(text)
  return Number.isFinite(value) ? value : fallback
}

function part (parent, name, tag = 'div', className = '') {
  let node = Array.from(parent.children).find(child => child.dataset.zPart === name)
  if (!node) {
    node = parent.ownerDocument.createElement(tag)
    node.dataset.zPart = name
    if (className) node.className = className
    parent.append(node)
  }
  return node
}

function isDefinition (element) {
  const view = element.localName === 'z-view' ? element : element.closest('z-view')
  return view?.hasAttribute('name') && !view.hasAttribute('data-view-name') &&
    view.parentElement?.localName === 'z-canvas'
}

function logicalParent (element) {
  return element.parentElement?.closest('z-view, z-spot, z-list') || null
}

function setAttribute (element, name, value) {
  if (element.getAttribute(name) !== String(value)) element.setAttribute(name, String(value))
}

/**
 * Shared light-DOM surfaces. Authored nodes are moved, never serialized or
 * replaced. Marked internal parts let a cloned initialized view rehydrate.
 */
export class ZSurface extends HTMLElementBase {
  static get observedAttributes () { return attributes }

  constructor () {
    super()
    this._surfaceUpdating = false
    this._surfaceQueued = false
    this._surfaceListening = false
    this._surfaceParts = null
    this._surfaceObserver = null
    this._surfaceResizeObserver = null
    this._onSurfaceAction = event => this._handleAction(event)
    this._onSurfaceDisabled = event => {
      if (this.hasAttribute('disabled') && event.target.closest?.('z-spot') === this) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }
    this._onSurfaceKey = event => this._handleKey(event)
    this._onSurfaceValue = event => this._handleValue(event)
    this._onSurfaceScroll = () => this._syncScrollValue()
  }

  connectedCallback () {
    if (isDefinition(this)) return
    this.refresh()
  }

  disconnectedCallback () {
    // Orbit and Zumly legitimately move and detach existing nodes. A reconnect
    // retains the controls and authored content, then reattaches observation.
    queueMicrotask(() => {
      if (this.isConnected) return
      this._surfaceObserver?.disconnect()
      this._surfaceResizeObserver?.disconnect()
      this._unlisten()
    })
  }

  attributeChangedCallback () {
    if (this.isConnected && !isDefinition(this)) this.refresh()
  }

  get contentElement () { return this._surfaceParts?.content || null }

  refresh () {
    if (this._surfaceUpdating || !this.isConnected || isDefinition(this)) return this
    this._surfaceUpdating = true
    this._surfaceObserver?.disconnect()
    try {
      for (const property of Object.keys(properties)) {
        if (own(this, property)) {
          const value = this[property]
          delete this[property]
          this[property] = value
        }
      }
      this.classList.add('z-surface', `z-${this.surfaceType}`)
      if (this.surfaceType === 'spot') this.classList.add('satellite')
      const body = part(this, 'surface', 'div', 'z-surface-body')
      this._surfaceParts = {
        body,
        plate: part(this, 'plate', 'div', 'z-plate'),
        image: part(body, 'image', 'div', 'z-image'),
        content: part(body, 'content', 'div', 'z-content'),
        media: part(body, 'media', 'div', 'z-media'),
        extensions: part(this, 'extensions', 'div', 'z-extensions')
      }
      this._adoptContent()
      this._syncAppearance()
      this._syncControls()
      this._syncPosition()
      this._syncScroll()
      this._listen()
    } finally {
      this._surfaceUpdating = false
      this._observe()
    }
    return this
  }

  _adoptContent () {
    const slots = this._surfaceParts
    const authored = [this, slots.content, slots.image, slots.media, slots.extensions]
      .flatMap(holder => Array.from(holder.childNodes))
    for (const node of authored) {
      if (node.nodeType === 1 && node.hasAttribute('data-z-part')) continue
      const slot = node.nodeType === 1 ? node.getAttribute('slot') : null
      const radial = node.nodeType === 1 && node.matches('z-spot, z-list')
      const target = slot === 'image' ? slots.image : slot === 'media' ? slots.media :
        slot === 'extension' || radial ? slots.extensions : slots.content
      if (node.parentNode !== target) target.append(node)
    }
    for (const node of Array.from(slots.extensions.children)) {
      if (node.localName === 'z-spot') this._adoptSpot(node)
    }
  }

  _adoptSpot (spot) {
    const extensions = this._surfaceParts?.extensions
    if (!extensions || spot === this) return
    const layout = part(extensions, 'layout', 'div', 'bigbang z-orbit-layout')
    const gravity = part(layout, 'gravity', 'div', 'gravity-spot')
    let ring = spot.parentElement
    if (ring?.dataset.zPart !== 'spot-orbit' || ring.parentElement !== gravity) {
      ring = this.ownerDocument.createElement('div')
      ring.className = 'orbit-12 z-spot-orbit'
      ring.dataset.zPart = 'spot-orbit'
      gravity.append(ring)
      ring.append(spot)
    }
    this._sizeSpotOrbit(spot, ring)
  }

  _sizeSpotOrbit (spot, ring) {
    const size = sizeVariable(this.getAttribute('size'), this.defaultSize)
    const distance = numberAttribute(spot, 'distance', 100)
    ring.style.setProperty('--o-force', `calc(${size} * ${distance / 100})`)
    ring.style.setProperty('--o-force-ratio', '1')
    ring.style.setProperty('--o-range', '0deg')
  }

  _syncPosition () {
    const size = normaliseSize(this.getAttribute('size'), this.defaultSize)
    this.style.setProperty('--z-diameter', sizeVariable(size))
    this.dataset.zSize = size
    if (this.surfaceType === 'spot') {
      // The original convention: zero is east, positive angles clockwise.
      this.style.setProperty('--o-from', `${numberAttribute(this, 'angle', 0)}deg`)
      this.style.setProperty('--o-offset', '0deg')
      const parent = logicalParent(this)
      if (parent instanceof ZSurface) parent._adoptSpot(this)
    }
    const gravity = this._surfaceParts.extensions.querySelector(':scope > [data-z-part="layout"] > [data-z-part="gravity"]')
    if (gravity) {
      for (const ring of gravity.children) {
        if (ring.dataset.zPart !== 'spot-orbit') continue
        const spot = Array.from(ring.children).find(child => child.localName === 'z-spot')
        if (spot) this._sizeSpotOrbit(spot, ring)
        else ring.remove()
      }
    }
  }

  _syncAppearance () {
    const square = this.hasAttribute('square')
    this.classList.toggle('is-square', square)
    this.classList.toggle('is-circle', !square)
    this.classList.toggle('z-button', this.hasAttribute('button'))
    const disabled = this.hasAttribute('disabled')
    this.classList.toggle('is-disabled', disabled)
    const target = this.getAttribute('to-view')
    const navigable = this.surfaceType === 'spot' && Boolean(target) && !disabled
    this.classList.toggle('zoom-me', navigable)
    if (navigable) this.dataset.to = target
    else delete this.dataset.to
    if (this.surfaceType === 'spot') {
      const button = Boolean(target) || this.hasAttribute('button')
      if (button) {
        setAttribute(this, 'role', 'button')
        setAttribute(this, 'tabindex', disabled ? '-1' : '0')
        setAttribute(this, 'aria-disabled', disabled ? 'true' : 'false')
        this.dataset.zInteractive = ''
      } else if (this.hasAttribute('data-z-interactive')) {
        this.removeAttribute('role')
        this.removeAttribute('tabindex')
        this.removeAttribute('aria-disabled')
        delete this.dataset.zInteractive
      }
    }

    const image = this._surfaceParts.image
    let source = Array.from(image.children).find(node => node.dataset.zPart === 'image-source')
    const path = this.getAttribute('image-path')
    if (path) {
      source ||= part(image, 'image-source', 'img', 'z-image-source')
      setAttribute(source, 'src', path)
      setAttribute(source, 'alt', '')
    } else source?.remove()
    image.hidden = !image.childNodes.length
    this._surfaceParts.media.hidden = !this._surfaceParts.media.childNodes.length

    const labelText = this.getAttribute('label') || ''
    const quantityOutside = this.getAttribute('pos') === 'outside' && this.hasAttribute('qty') && !this.hasAttribute('knob')
    let label = Array.from(this.children).find(node => node.dataset.zPart === 'label')
    if (labelText || quantityOutside) {
      label ||= part(this, 'label', 'div', 'z-label')
      const position = this.getAttribute('label-pos') || 'bottom'
      for (const token of ['top', 'bottom', 'left', 'right', 'center']) label.classList.toggle(token, token === position)
      label.dataset.position = position
      const inside = part(label, 'label-text', 'span', 'inside')
      if (inside.textContent !== labelText) inside.textContent = labelText
    } else label?.remove()

    let quantity = this.querySelector(':scope > [data-z-part="label"] > [data-z-part="quantity"], :scope > [data-z-part="surface"] > [data-z-part="content"] > [data-z-part="quantity"]')
    if (this.hasAttribute('qty') && !this.hasAttribute('knob')) {
      const holder = quantityOutside ? label : this._surfaceParts.content
      if (!quantity) quantity = part(holder, 'quantity', 'span', 'z-quantity')
      else if (quantity.parentElement !== holder) holder.append(quantity)
      const text = `${numberAttribute(this, 'qty', 0)}${this.getAttribute('unit') || ''}`
      if (quantity.textContent !== text) quantity.textContent = text
    } else quantity?.remove()
  }

  _syncControls () {
    for (const [flag, tag, className, forwarded] of [
      ['slider', 'z-slider', 'z-surface-slider', ['progress']],
      ['knob', 'z-knob', 'z-surface-knob', ['qty', 'unit', 'min', 'max', 'step', 'disabled']]
    ]) {
      let control = Array.from(this.children).find(node => node.dataset.zPart === flag)
      if (this.hasAttribute(flag) && (flag !== 'slider' || !this.hasAttribute('square'))) {
        control ||= part(this, flag, tag, className)
        for (const attribute of forwarded) {
          if (this.hasAttribute(attribute)) setAttribute(control, attribute, this.getAttribute(attribute))
          else control.removeAttribute(attribute)
        }
        setAttribute(control, 'aria-label', this.getAttribute('aria-label') || this.getAttribute('label') || (flag === 'knob' ? 'Value' : 'Progress'))
      } else control?.remove()
    }
    this._surfaceParts.content.hidden = this.hasAttribute('knob')
  }

  _syncScroll () {
    if (this.surfaceType !== 'view') return
    const content = this._surfaceParts.content
    const square = this.hasAttribute('square') || (!this.hasAttribute('circle') &&
      this.closest('[data-shape]')?.dataset.shape === 'square')
    const overflowing = !square && content.clientHeight > 0 && content.scrollHeight > content.clientHeight + 1
    let control = Array.from(this.children).find(node => node.dataset.zPart === 'scroll')
    if (overflowing) {
      control ||= part(this, 'scroll', 'z-scroll', 'z-surface-scroll')
      setAttribute(control, 'aria-label', 'Scroll content')
      this._syncScrollValue()
    } else control?.remove()
  }

  _syncScrollValue () {
    const control = Array.from(this.children).find(node => node.dataset.zPart === 'scroll')
    if (!control || !this._surfaceParts) return
    const content = this._surfaceParts.content
    const range = content.scrollHeight - content.clientHeight
    setAttribute(control, 'scroll-val', range > 0 ? -45 + 90 * content.scrollTop / range : -45)
  }

  _listen () {
    if (this._surfaceListening) return
    this._surfaceListening = true
    for (const type of ['mouseup', 'touchend', 'click']) {
      this.addEventListener(type, this._onSurfaceAction)
      this.addEventListener(type, this._onSurfaceDisabled, true)
    }
    this.addEventListener('keydown', this._onSurfaceKey)
    // Intercept child controls before consumer bubble listeners, including
    // listeners installed by a view factory before this element connects.
    this.addEventListener('input', this._onSurfaceValue, true)
    this.addEventListener('change', this._onSurfaceValue, true)
    this._surfaceParts.content.addEventListener('scroll', this._onSurfaceScroll, { passive: true })
  }

  _unlisten () {
    if (!this._surfaceListening) return
    this._surfaceListening = false
    for (const type of ['mouseup', 'touchend', 'click']) {
      this.removeEventListener(type, this._onSurfaceAction)
      this.removeEventListener(type, this._onSurfaceDisabled, true)
    }
    this.removeEventListener('keydown', this._onSurfaceKey)
    this.removeEventListener('input', this._onSurfaceValue, true)
    this.removeEventListener('change', this._onSurfaceValue, true)
    this._surfaceParts?.content.removeEventListener('scroll', this._onSurfaceScroll)
  }

  _handleAction (event) {
    if (this.surfaceType !== 'spot') return
    if (event.target.closest?.('z-spot') !== this) return
    const control = event.target.closest?.('button, a, input, select, textarea, z-knob, z-scroll')
    if (event.type === 'click' && !this.getAttribute('to-view') && !this.parentElement?.closest('.zoom-me')) return
    if (this.hasAttribute('disabled') || !this.getAttribute('to-view') || (control && control !== this)) {
      event.stopPropagation()
      if (this.hasAttribute('disabled')) event.preventDefault()
    }
  }

  _handleKey (event) {
    if (this.surfaceType !== 'spot' || event.target !== this) return
    if (this.hasAttribute('disabled')) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation() }
      return
    }
    // Zumly owns keyboard activation for navigation spots.
    if (this.getAttribute('to-view') || !this.hasAttribute('button')) return
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault()
      event.stopPropagation()
      this.click()
    }
  }

  _handleValue (event) {
    if (event.target.parentElement === this && event.target.dataset.zPart === 'scroll') {
      const value = Number(event.detail?.scrollVal ?? event.detail?.value)
      if (Number.isFinite(value)) {
        const content = this._surfaceParts.content
        content.scrollTop = (Math.min(45, Math.max(-45, value)) + 45) / 90 *
          Math.max(0, content.scrollHeight - content.clientHeight)
      }
      event.stopPropagation()
      return
    }
    if (event.target.parentElement !== this || event.target.dataset.zPart !== 'knob') return
    const qty = event.detail?.qty ?? event.detail?.value
    if (!Number.isFinite(Number(qty))) return
    setAttribute(this, 'qty', Number(qty))
    event.stopImmediatePropagation()
    this.dispatchEvent(new CustomEvent(event.type, {
      detail: { ...event.detail, qty: Number(qty), value: Number(qty) }, bubbles: true, composed: true
    }))
  }

  _observe () {
    if (!this.isConnected) return
    this._surfaceObserver ||= new MutationObserver(records => {
      const holders = [this, this._surfaceParts?.extensions, this._surfaceParts?.content,
        this._surfaceParts?.image, this._surfaceParts?.media]
      if (records.some(record => record.type === 'attributes' ||
        (holders.includes(record.target) && record.addedNodes.length) ||
        this._surfaceParts?.content.contains(record.target))) this._queueRefresh()
    })
    this._surfaceObserver.observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['slot'] })
    if (this.surfaceType === 'view') {
      this._surfaceResizeObserver ||= new ResizeObserver(() => this._syncScroll())
      this._surfaceResizeObserver.disconnect()
      this._surfaceResizeObserver.observe(this._surfaceParts.content)
      for (const child of this._surfaceParts.content.children) this._surfaceResizeObserver.observe(child)
    }
  }

  _queueRefresh () {
    if (this._surfaceQueued) return
    this._surfaceQueued = true
    queueMicrotask(() => {
      this._surfaceQueued = false
      this.refresh()
    })
  }
}

for (const [property, attribute] of Object.entries(properties)) {
  Object.defineProperty(ZSurface.prototype, property, {
    configurable: true,
    get () {
      if (booleanAttributes.has(attribute)) return this.hasAttribute(attribute)
      if (own(defaults, attribute)) return numberAttribute(this, attribute,
        attribute === 'distance' && this.surfaceType === 'view' ? 0 : defaults[attribute])
      if (attribute === 'size') return normaliseSize(this.getAttribute(attribute), this.defaultSize)
      return this.getAttribute(attribute) ?? ''
    },
    set (value) {
      if (booleanAttributes.has(attribute)) this.toggleAttribute(attribute, Boolean(value))
      else if (value === null || value === undefined) this.removeAttribute(attribute)
      else setAttribute(this, attribute, value)
    }
  })
}

/** Run synchronously in Zumly's viewMounted hook, before it reads geometry. */
export function hydrateSurfaces (root) {
  if (!root) return
  if (root instanceof ZSurface) root.refresh()
  for (const surface of root.querySelectorAll?.('z-view, z-spot') || []) {
    if (surface instanceof ZSurface) surface.refresh()
  }
}
