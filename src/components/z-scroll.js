/**
 * <z-scroll>
 * Gives its slotted content a scrollable circular surface. Activates a
 * thin vertical scrollbar (or arc indicator) when content overflows.
 *
 * Use as the content host inside a <z-view> when the slot is large:
 *
 *   <z-view>
 *     <z-scroll>
 *       <p>... lots of text ...</p>
 *     </z-scroll>
 *   </z-view>
 *
 * Attributes:
 *   value  0..100  read-only reflection of the scroll position
 */
export class ZScroll extends HTMLElement {
  connectedCallback () {
    if (this._initialized) return
    this._initialized = true
    this.classList.add('z-scroll-host')

    const inner = document.createElement('div')
    inner.className = 'z-scroll-inner'
    while (this.firstChild) inner.appendChild(this.firstChild)
    this.appendChild(inner)

    // Thin vertical indicator on the right edge.
    const track = document.createElement('div')
    track.className = 'z-scroll-track'
    const thumb = document.createElement('div')
    thumb.className = 'z-scroll-thumb'
    track.appendChild(thumb)
    this.appendChild(track)

    inner.addEventListener('scroll', () => {
      const max = inner.scrollHeight - inner.clientHeight
      const v = max > 0 ? (inner.scrollTop / max) : 0
      const trackH = track.clientHeight
      const thumbH = Math.max(20, trackH * (inner.clientHeight / inner.scrollHeight))
      thumb.style.height = `${thumbH}px`
      thumb.style.top    = `${v * (trackH - thumbH)}px`
      this.setAttribute('value', String(Math.round(v * 100)))
    }, { passive: true })
    // Initial thumb sizing
    queueMicrotask(() => inner.dispatchEvent(new Event('scroll')))
  }
}

if (typeof window !== 'undefined' && !customElements.get('z-scroll')) {
  customElements.define('z-scroll', ZScroll)
}
