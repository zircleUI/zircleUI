import { createZircle, THEMES, MODES } from '/dist/zircle.standalone.js'

const mount = document.querySelector('#demo')
const title = document.querySelector('#title')
const subtitle = document.querySelector('#subtitle')
const hint = document.querySelector('#hint')
let ui
const html = markup => {
  const template = document.createElement('template')
  template.innerHTML = markup.trim()
  return template.content.firstElementChild
}
const data = {
  home: ['Welcome to Zircle.', 'Sun, Earth & Moon — back to where it started.', 'Click or touch a circle to explore.'],
  solar: ['Sun, Earth & Moon', 'A small universe. One circle leads to another.', 'Explore the Sun or Earth. Use the arrow to zoom back.'],
  sun: ['The Sun', 'At the centre of our original demo.', 'Use the arrow to return to the solar system.'],
  earth: ['The Earth', 'There is another world in this one.', 'Zoom into the Moon.'],
  moon: ['The Moon', 'A circle within a circle within a circle.', 'Zoom back to retrace your path.'],
  components: ['A vocabulary of circles.', 'The original Zircle components, ready to compose.', 'Choose a circle to try a component.'],
  spots: ['Spots', 'A label, an image, a button — and another way in.', 'The counter is a real button. The smaller circle is nested.'],
  views: ['Views', 'A circle for your content. Extensions for what comes next.', 'Long content scrolls. The surrounding controls stay in place.'],
  lists: ['Lists', 'A collection arranged around its centre.', 'Change the page. Each list keeps its own state.'],
  controls: ['Circular controls', 'A knob for input. An arc for progress.', 'Drag the dial or focus it and use the arrow keys.'],
  dialogs: ['Dialogs', 'A brief interruption, in the same visual language.', 'Open the dialog. Escape or the close button returns focus.'],
  themes: ['Themes', 'Ten original palettes. Four ways to use them.', 'Change the palette and mode to see the original themes.']
}
function orbitAnimation(node, ctx) {
  let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches
  let frame, previous = 0, earthAngle = 160, moonAngle = 160
  const earth = node.querySelector('[data-earth]')
  const moon = node.querySelector('[data-moon]')
  const control = node.querySelector('[data-play]')
  let speed = 1
  const updateButton = () => { if (control) { control.label = playing ? 'pause' : 'play'; control.setAttribute('aria-label', playing ? 'Pause orbits' : 'Play orbits'); control.querySelector('[data-symbol]').textContent = playing ? 'Ⅱ' : '▷' } }
  updateButton()
  control?.addEventListener('click', () => { playing = !playing; updateButton() })
  node.querySelector('[data-speed]')?.addEventListener('input', event => { speed = event.detail.qty })
  const tick = time => {
    const elapsed = previous ? Math.min(time - previous, 50) : 0
    previous = time
    if (playing && node.isConnected && node.classList.contains('is-current-view') && !node.matches(':has(z-spot[image-path]:hover)')) {
      earthAngle -= elapsed * .018 * speed
      moonAngle -= elapsed * .045 * speed
      if (earth) earth.angle = earthAngle
      if (moon) moon.angle = moonAngle
    }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  ctx.onCleanup(() => cancelAnimationFrame(frame))
}
const views = {
  home: `<z-view size="xl" square class="transparent" aria-label="Welcome to Zircle">
    <z-spot slot="extension" size="m" distance="0" to-view="solar" class="shade home-circle" aria-label="Zoom me"><strong>Zoom me</strong></z-spot>
    <z-spot slot="extension" size="xs" angle="45" distance="130" to-view="components" label="components" aria-label="Explore components">＋</z-spot>
  </z-view>`,
  solar: ctx => {
    const node = html(`<z-view class="solar-system" aria-label="Sun Earth and Moon">
      <z-spot size="l" distance="0" to-view="sun" image-path="/public/sun.png" class="transparent" label="sun" aria-label="Explore Sun">
        <z-spot data-earth size="s" angle="160" distance="215" to-view="earth" image-path="/public/earth.png" class="transparent" label="earth" aria-label="Explore Earth">
          <z-spot data-moon size="xxs" angle="160" distance="165" image-path="/public/moon.png" class="transparent" aria-label="Moon satellite"></z-spot>
        </z-spot>
      </z-spot>
      <z-spot data-play size="m" angle="135" distance="135" button label="pause"><span data-symbol>Ⅱ</span></z-spot>
      <z-spot data-speed size="m" angle="45" distance="135" knob qty="1" unit="×" min="1" max="5" step=".5" label="speed" aria-label="Orbit speed"></z-spot>
    </z-view>`)
    orbitAnimation(node, ctx)
    return node
  },
  sun: `<z-view image-path="/public/sun.png" class="transparent" aria-label="Sun profile"></z-view>`,
  earth: ctx => {
    const node = html(`<z-view image-path="/public/earth.png" class="transparent" aria-label="Earth profile"><z-spot data-moon size="s" angle="-35" distance="145" to-view="moon" image-path="/public/moon.png" class="transparent" label="moon" aria-label="Explore Moon"></z-spot></z-view>`)
    orbitAnimation(node, ctx)
    return node
  },
  moon: `<z-view image-path="/public/moon.png" class="transparent" aria-label="Moon profile"></z-view>`,
  components: `<z-view size="xl"><strong>zircle</strong><small>Explore the components</small>
    ${[['views', '◯'], ['spots', '•'], ['lists', '⋮'], ['controls', '◔'], ['dialogs', '◇'], ['themes', '◐']].map(([name, icon], index) => `<z-spot size="m" angle="${index * 60 - 90}" distance="145" to-view="${name}" label="${name}" label-pos="${['top', 'right', 'right', 'bottom', 'left', 'left'][index]}" aria-label="Explore ${name}">${icon}</z-spot>`).join('')}
  </z-view>`,
  spots: () => {
    const node = html(`<z-view size="xl"><strong>A spot can be…</strong>
      <z-spot size="m" angle="-90" distance="130" button label="a button" aria-label="Increment counter"><span data-count>0</span></z-spot>
      <z-spot size="m" angle="30" distance="130" image-path="/public/earth.png" class="transparent" label="an image"><z-spot size="xs" angle="-35" distance="160" to-view="moon" label="nested" aria-label="Explore nested Moon">↗</z-spot></z-spot>
      <z-spot size="m" angle="150" distance="130" square class="accent" label="a square">□</z-spot>
    </z-view>`)
    let count = 0
    node.querySelector('[button]').addEventListener('click', () => { node.querySelector('[data-count]').textContent = String(++count) })
    return node
  },
  views: `<z-view aria-label="Scrollable view"><strong>Space for your content.</strong><p>A view is the centre of a small world. It holds ordinary HTML, images and media.</p><p>Its extensions place related actions around its edge. Each spot can contain more spots, so the composition can grow naturally.</p><p>Open a spot to zoom into a new view. The previous view remains part of the journey.</p><p>This paragraph is here to demonstrate scrolling. A circular view can contain long text without moving its surrounding controls.</p><p>You have reached the end.</p><z-spot size="s" angle="-45" distance="110" to-view="spots" label="spots" aria-label="Explore spots">↗</z-spot></z-view>`,
  lists: () => {
    const node = html(`<z-view size="xl"><strong>One collection.</strong><small>Two pages.</small><z-list size="xl" per-page="5"></z-list></z-view>`)
    const list = node.querySelector('z-list')
    list.renderItem = (name, index) => html(`<z-spot size="s" distance="120" label="${name}" button aria-label="Select ${name}">${index + 1}</z-spot>`)
    list.items = ['canvas', 'view', 'spot', 'list', 'dialog', 'knob', 'progress', 'scroll']
    list.addEventListener('click', event => {
      const spot = event.target.closest('z-spot')
      if (spot) node.querySelector('strong').textContent = spot.label
    })
    return node
  },
  controls: () => {
    const node = html(`<z-view size="xl" slider progress="35"><strong>35%</strong><small>Progress follows the knob.</small><z-spot size="m" angle="90" distance="150" knob qty="35" min="0" max="100" unit="%" label="adjust" aria-label="Progress value"></z-spot></z-view>`)
    node.addEventListener('input', event => { node.progress = event.detail.qty; node.querySelector('strong').textContent = `${event.detail.qty}%` })
    return node
  },
  dialogs: () => {
    const node = html(`<z-view size="xl"><strong>A moment, please.</strong><z-spot size="m" angle="90" distance="135" button label="open dialog" aria-label="Open dialog">＋</z-spot><z-dialog aria-label="A Zircle dialog"><strong>Hello from Zircle.</strong><p>Ordinary HTML, inside a circle.</p></z-dialog></z-view>`)
    node.querySelector('z-spot').addEventListener('click', () => node.querySelector('z-dialog').show())
    return node
  },
  themes: () => {
    const node = html(`<z-view><label>Palette<select data-theme>${THEMES.map(theme => `<option value="${theme}">${theme}</option>`).join('')}</select></label><label>Mode<select data-mode>${MODES.map(mode => `<option value="${mode}">${mode}</option>`).join('')}</select></label><z-spot size="s" angle="0" distance="125" class="accent" label="accent">◐</z-spot></z-view>`)
    const theme = node.querySelector('[data-theme]'), mode = node.querySelector('[data-mode]')
    theme.value = ui.getTheme(); mode.value = ui.getMode()
    theme.addEventListener('change', () => ui.setTheme(theme.value))
    mode.addEventListener('change', () => ui.setMode(mode.value))
    return node
  }
}
let loadGeneration = 0
async function load(initialView) {
  const generation = ++loadGeneration
  ui?.destroy()
  document.querySelector('#error').hidden = true
  try {
    const instance = await createZircle({ mount, views, initialView, theme: 'white', mode: 'dark', label: 'Zircle demo' })
    if (generation !== loadGeneration) { instance.destroy(); return }
    ui = instance
    window.demo = ui
  } catch (error) {
    const notice = document.querySelector('#error')
    notice.textContent = error.message; notice.hidden = false
    console.error(error)
  }
}
mount.addEventListener('zircle:viewchange', event => {
  const [heading, subheading, tip] = data[event.detail.view] ?? data.home
  title.textContent = heading; subtitle.textContent = subheading; hint.textContent = tip
})
for (const button of document.querySelectorAll('[data-example]')) button.addEventListener('click', () => {
  for (const sibling of document.querySelectorAll('[data-example]')) sibling.setAttribute('aria-pressed', String(sibling === button))
  load(button.dataset.example)
})
load('home')
