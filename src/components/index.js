import { registerOrbit } from '@zumer/orbit'
import { ZCanvas } from './z-canvas.js'
import { ZView } from './z-view.js'
import { ZSpot } from './z-spot.js'
import { ZList } from './z-list.js'
import { ZDialog } from './z-dialog.js'
import { ZKnob } from './z-knob.js'
import { ZSlider } from './z-slider.js'
import { ZScroll } from './z-scroll.js'
import { ZPagination } from './z-pagination.js'

export function registerElements() {
  if (typeof customElements === 'undefined') return
  registerOrbit()
  const elements = { 'z-canvas': ZCanvas, 'z-view': ZView, 'z-spot': ZSpot, 'z-list': ZList, 'z-dialog': ZDialog, 'z-knob': ZKnob, 'z-slider': ZSlider, 'z-scroll': ZScroll, 'z-pagination': ZPagination }
  for (const [name, ctor] of Object.entries(elements)) {
    if (!customElements.get(name)) customElements.define(name, ctor)
  }
}
