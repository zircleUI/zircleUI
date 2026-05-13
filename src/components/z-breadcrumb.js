/**
 * <z-breadcrumb>
 * Renders the current zoom path (initial view → … → current view) as a
 * horizontal trail. Place anywhere outside the canvas, e.g. in your header.
 *
 * Attributes:
 *   separator   character between segments       default '›'
 *   clickable   presence → segments call back()  to that depth
 */
export class ZBreadcrumb extends HTMLElement {
  connectedCallback () {
    this._render()
    const wait = () => {
      const canvas = document.querySelector('z-canvas')
      if (!canvas || !canvas.app) return setTimeout(wait, 60)
      this._canvas = canvas
      const update = () => this._update()
      canvas.app.on('afterZoomIn', update)
      canvas.app.on('afterZoomOut', update)
      canvas.app.on('afterLateral', update)
      update()
    }
    wait()
  }

  _update () {
    if (!this._canvas?.app) return
    const stored = this._canvas.app.storedViews || []
    const path = stored.map(stage => stage.views[stage.views.length - 1]?.viewName).filter(Boolean)
    this._render(path)
  }

  _render (path = []) {
    const sep = this.getAttribute('separator') || '›'
    const clickable = this.hasAttribute('clickable')
    this.innerHTML = path.length === 0
      ? ''
      : path.map((name, i) => {
          const isLast = i === path.length - 1
          const cls = isLast ? 'z-crumb current' : 'z-crumb'
          const tag = (clickable && !isLast) ? 'button' : 'span'
          const data = clickable && !isLast ? ` data-depth="${path.length - 1 - i}"` : ''
          return `<${tag} class="${cls}"${data}>${name}</${tag}>`
        }).join(`<span class="z-crumb-sep">${sep}</span>`)

    if (clickable) {
      this.querySelectorAll('button.z-crumb').forEach(b => {
        b.addEventListener('click', () => {
          const back = Number(b.dataset.depth)
          for (let i = 0; i < back; i++) this._canvas.zoomOut()
        })
      })
    }
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-breadcrumb')) {
  customElements.define('z-breadcrumb', ZBreadcrumb)
}
