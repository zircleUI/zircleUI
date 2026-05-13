/**
 * <z-list>
 * A paginated radial collection. Iterates `items` and clones the inner
 * <template> for each visible item, expanding `{{key}}` placeholders.
 *
 * Attributes:
 *   per-page    number per page                default 6
 *   orbit       which ring to use (1-12)        default 8
 *   range       arc span in deg                 default 360
 *   from        start angle in deg              default -90  (top)
 *   size        sets the satellite size class   default 's'
 *
 * Property `items` may be set as a JS array (preferred) or as a JSON attribute.
 *
 * Inside, the consumer provides a <template> with the markup for one item.
 * Strings are exposed as a single placeholder `{{.}}`; objects are exposed
 * with their keys.
 *
 *   <z-list per-page="5" orbit="7" .items="${data}">
 *     <template>
 *       <z-spot size="s" button label="{{name}}">{{icon}}</z-spot>
 *     </template>
 *   </z-list>
 */
export class ZList extends HTMLElement {
  static get observedAttributes () { return ['per-page', 'orbit', 'range', 'from', 'size', 'items'] }

  constructor () {
    super()
    this._items = []
    this._page = 0
    this._template = null
  }

  set items (v) {
    this._items = Array.isArray(v) ? v : []
    this._page = 0
    this._render()
  }
  get items () { return this._items }

  connectedCallback () {
    if (this.hasAttribute('items')) {
      try { this._items = JSON.parse(this.getAttribute('items')) } catch {}
    }
    this._template = this.querySelector(':scope > template')
    this._render()
  }

  attributeChangedCallback (name) {
    if (name === 'items') {
      try { this._items = JSON.parse(this.getAttribute('items')) } catch {}
      this._page = 0
    }
    this._render()
  }

  get perPage () { return Math.max(1, Number(this.getAttribute('per-page') || 6)) }
  get pages () { return Math.max(1, Math.ceil(this._items.length / this.perPage)) }

  _renderItem (item) {
    if (!this._template) {
      const t = document.createElement('div')
      t.textContent = typeof item === 'string' ? item : (item.name ?? JSON.stringify(item))
      return t
    }
    const clone = document.importNode(this._template.content, true)
    const wrap = document.createElement('div')
    wrap.appendChild(clone)
    let html = wrap.innerHTML
    if (typeof item === 'string' || typeof item === 'number') {
      html = html.replace(/\{\{\.\}\}/g, String(item))
    } else if (item && typeof item === 'object') {
      html = html.replace(/\{\{(\w+)\}\}/g, (_, k) => item[k] ?? '')
    }
    wrap.innerHTML = html
    return wrap.firstElementChild
  }

  _render () {
    if (!this.isConnected) return
    if (!this._template) this._template = this.querySelector(':scope > template')

    const orbit = Number(this.getAttribute('orbit') || 8)
    const range = Number(this.getAttribute('range') || 360)
    const from  = Number(this.getAttribute('from')  || -90)
    const pageItems = this._items.slice(this._page * this.perPage, (this._page + 1) * this.perPage)
    const n = pageItems.length || 1
    const step = range / n

    // Wipe previous render but keep the template
    ;[...this.children].forEach(c => { if (c !== this._template) c.remove() })

    pageItems.forEach((item, i) => {
      const node = this._renderItem(item)
      if (!node) return
      if (node.tagName === 'Z-SPOT') {
        node.setAttribute('orbit', orbit)
        node.setAttribute('angle', from + step * i + step / 2)
      }
      this.appendChild(node)
    })

    if (this.pages > 1) {
      const dotsOrbit = orbit + 2
      const pagAngleStep = 60 / Math.max(1, this.pages - 1)
      for (let p = 0; p < this.pages; p++) {
        const dot = document.createElement('z-spot')
        dot.setAttribute('size', 'xxs')
        dot.setAttribute('orbit', dotsOrbit)
        dot.setAttribute('angle', 90 - (p - (this.pages - 1) / 2) * pagAngleStep)
        dot.setAttribute('button', '')
        dot.classList.add('z-pagination')
        if (p === this._page) dot.classList.add('active')
        dot.addEventListener('click', e => {
          e.stopPropagation()
          this._page = p
          this._render()
        })
        this.appendChild(dot)
      }
    }
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-list')) {
  customElements.define('z-list', ZList)
}
