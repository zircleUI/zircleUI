/**
 * Demo entry — registers components and wires up interactive showcases.
 * Each demo is a discrete <z-view> in public/index.html; this file just
 * binds buttons / animations once a view is mounted by Zumly.
 */
import '../zircle.js'
import { bindChrome } from './chrome.js'
import { attachSnap } from './snap.js'

const canvas = document.querySelector('z-canvas')

canvas.addEventListener('ready', () => {
  bindChrome(canvas)
  attachSnap(canvas)
  canvas.app.on('viewMounted', ({ viewName, node }) => bindDemo(viewName, node))
  // bind the home view too (it's already mounted before we attach the listener)
  const current = canvas.querySelector('.zumly-view') || canvas
  bindDemo(canvas.getCurrentViewName(), current)
  startSolarSystem()
}, { once: true })

canvas.addEventListener('error', e => console.error('[zircle] canvas error:', e.detail))

/** Animate Sun/Earth/Moon by mutating angle on any visible <z-spot> with data-role. */
function startSolarSystem () {
  const state = { earth: 160, moon: 160, raf: 0 }
  const tick = () => {
    state.earth = (state.earth - 0.6 + 360) % 360
    state.moon  = (state.moon  - 0.9 + 360) % 360
    document.querySelectorAll('z-spot[data-role="earth"]').forEach(s => s.setAttribute('angle', state.earth))
    document.querySelectorAll('z-spot[data-role="moon"]').forEach(s  => s.setAttribute('angle', state.moon))
    state.raf = requestAnimationFrame(tick)
  }
  state.raf = requestAnimationFrame(tick)
}

function bindDemo (name, root) {
  if (!root) return
  switch (name) {
    case 'd-list':       return bindListLinks(root)
    case 'd-knob':       return bindKnob(root)
    case 'd-slider':     return bindSlider(root)
    case 'd-scroll':     return bindScroll(root)
    case 'd-dialog':     return bindDialog()
    case 'd-menu':       return bindMenu(root)
    case 'd-gauge':      return bindGauge(root)
    case 'd-compass':    return bindCompass(root)
  }
}

function bindListLinks (root) {
  root.addEventListener('click', e => {
    const spot = e.target.closest('z-spot[data-url]')
    if (!spot) return
    e.stopPropagation()
    window.open(spot.dataset.url, '_blank', 'noopener')
  })
}

function bindKnob (root) {
  const knobSpot = root.querySelector('z-spot[knob]')
  root.querySelector('#knob-reset')?.addEventListener('click', e => {
    e.stopPropagation()
    knobSpot?.setAttribute('qty', '50')
    // re-render the knob inner display
    knobSpot?.querySelector('z-knob')?.setAttribute('qty', '50')
  })
}

function bindSlider (root) {
  const slider = root.querySelector('z-slider')
  const set = (delta) => {
    const cur = Number(slider.getAttribute('progress') || 0)
    slider.setAttribute('progress', String(Math.max(0, Math.min(100, cur + delta))))
  }
  root.querySelector('#slider-up')?.addEventListener('click',   e => { e.stopPropagation(); set(+10) })
  root.querySelector('#slider-down')?.addEventListener('click', e => { e.stopPropagation(); set(-10) })
}

function bindScroll (root) {
  const host = root.querySelector('#scroll-spot')
  if (!host || host._injected) return
  host._injected = true

  // Retry a few times — z-spot may render its inner .z-spot-content one
  // microtask after this binder runs.
  const inject = () => {
    const inner = host.querySelector('.z-spot-content') || host
    if (!inner) return false
    inner.style.pointerEvents = 'auto'
    inner.style.display = 'block'
    inner.innerHTML = `<z-scroll style="width:90%;height:90%;display:block;font-size:0.7em;text-align:left;padding:8px;">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Phasellus volutpat, mauris in tincidunt commodo, nulla velit cursus enim.</p>
      <p>Quisque varius, mauris nec congue dictum, nibh urna posuere arcu.</p>
      <p>Curabitur sed enim id leo blandit dapibus.</p>
      <p>Vivamus ac risus nec ligula vehicula scelerisque.</p>
      <p>Donec eget felis ut arcu fermentum lobortis.</p>
      <p>Cras quis lectus eget magna malesuada sodales.</p>
      <p>Aliquam erat volutpat, vel nisl pretium semper.</p>
    </z-scroll>`
    return true
  }
  if (!inject()) requestAnimationFrame(inject)
}

function bindDialog () {
  document.getElementById('dlg-open')?.addEventListener('click', e => {
    e.stopPropagation()
    document.getElementById('dialog-plain').open()
  }, { once: true })
  document.getElementById('dlg-self')?.addEventListener('click', e => {
    e.stopPropagation()
    document.getElementById('dialog-self').setAttribute('self-close', '')
    document.getElementById('dialog-self').open()
  }, { once: true })
}

function bindMenu (root) {
  const menu = root.querySelector('#menu-demo')
  const out  = root.querySelector('#menu-output')
  menu?.addEventListener('select', e => {
    const inner = out?.querySelector('.z-spot-content')
    if (inner) inner.textContent = e.detail.item.label
  })
}

function bindGauge (root) {
  const gauge = root.querySelector('#gauge-demo')
  const bump = (d) => gauge && (gauge.value = Math.max(0, Math.min(100, gauge.value + d)))
  root.querySelector('#g-up')?.addEventListener('click',   e => { e.stopPropagation(); bump(+10) })
  root.querySelector('#g-down')?.addEventListener('click', e => { e.stopPropagation(); bump(-10) })
}

function bindCompass (root) {
  const c = root.querySelector('#compass-demo')
  const bump = (d) => c && c.setAttribute('heading', String(((c.heading + d) % 360 + 360) % 360))
  root.querySelector('#c-up')?.addEventListener('click',   e => { e.stopPropagation(); bump(+15) })
  root.querySelector('#c-down')?.addEventListener('click', e => { e.stopPropagation(); bump(-15) })
}
