# Zircle

Circular components and spatial navigation, built with **Orbit** and **Zumly**. The original `z-view`, `z-spot`, `z-list`, and `z-dialog` return as web components. Vue is no longer required.

This branch is the **2.0 alpha reconstruction**. The original Vue library remains on `master`; unversioned npm/CDN links may still serve that older release. Use this checkout or its locally built package to try this implementation.

```sh
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:8080` for the Sun, Earth & Moon demo. The development server is read-only; run `npm run build` again after editing the library. Node 20 or later is required for development.

## Start with HTML

Copy `dist/` from the build into your application and serve the files over HTTP:

```html
<link rel="stylesheet" href="./dist/zircle.css">
<script type="module" src="./dist/zircle.standalone.js"></script>

<z-canvas initial-view="home" theme="black" mode="dark"
          style="display:block; height:600px" aria-label="My Zircle app">
  <template data-view="home">
    <z-view>
      Hello, Zircle.
      <z-spot slot="extension" to-view="details"
              angle="45" distance="110" label="Explore">
        +
      </z-spot>
    </z-view>
  </template>
  <template data-view="details">
    <z-view>Inside another view.</z-view>
  </template>
</z-canvas>
```

Each template has one root `z-view`. Click the spot to zoom in, then use the back button or canvas background to return. A canvas needs a nonzero height; use `height:100dvh` for a full-screen interface.

The standalone module includes both engines. A classic-script alternative is `dist/zircle.iife.js`, which exposes `window.Zircle`; it also registers the elements and includes both engines. Load one JavaScript distribution, plus `zircle.css`.

## Use JavaScript

For a bundler, build and install this checkout's package first:

```sh
# In this repository; produces zircle-2.0.0-alpha.0.tgz
npm pack
# In your application, substitute the actual path to the generated file
npm install /path/to/zircle-2.0.0-alpha.0.tgz
```

```js
import { createZircle } from 'zircle'
import 'zircle/style'

const ui = await createZircle({
  mount: '#explorer', // a connected, sized element in the document
  initialView: 'home',
  views: {
    home: `<z-view>
      Home
      <z-spot slot="extension" to-view="details" label="Details">+</z-spot>
    </z-view>`,
    details: '<z-view>Details</z-view>'
  },
  theme: 'blue',
  mode: 'light'
})

const unsubscribe = ui.on('viewchange', event => {
  console.log(event.detail.view)
})
await ui.setView({ name: 'details', params: { id: 42 } })
await ui.goBack()
// When the owning application component is removed:
unsubscribe()
ui.destroy()
```

The default module keeps Orbit and Zumly as package imports so bundlers can share them. `zircle/style` combines all three stylesheets. If the host already loads Orbit and Zumly CSS, import `zircle/components.css` instead.

## The component vocabulary

| Component | Purpose | Main attributes/properties |
| --- | --- | --- |
| `z-canvas` | Independent navigation and theme context | `initial-view`, `theme`, `mode`, `shape`; `views`, `options`, `ready`, `instance` |
| `z-view` | A circular destination | `size`, `square`, `circle`, `label`, `label-pos`, `image-path`, `slider`, `progress` |
| `z-spot` | A nested satellite, target, button, or knob | `size`, `angle`, `distance`, `to-view`, `button`, `knob`, `qty`, `min`, `max`, `step`, `unit`, `slider`, `progress`, `label`, `label-pos`, `pos`, `image-path` |
| `z-list` | A locally paginated radial collection | `per-page`, `page`; `items`, `renderItem`, `next()`, `previous()` |
| `z-dialog` | Circular dialog with optional timed completion | `open`, `self-close`, `duration`, `size`, `image-path`; `show()`, `close()` |

Sizes: `xxl`, `xl`, `l`, `m`, `s`, `xs`, `xxs`. The original aliases `extralarge`, `large`, `medium`, `small`, and `extrasmall` are accepted. Views default to `xxl`; spots default to `medium`. Geometry adapts to the canvas size.

An angle of `0` points right and `90` points down. Distance is a percentage of the **parent radius**: `100` places a spot's center on its parent's circumference, and `0` centers it. Nest a spot in another spot using `slot="extension"` to compose orbital structures.

Ordinary child content occupies the center. Use `slot="image"` for imagery, `slot="media"` for view media, and `slot="extension"` for surrounding components. `image-path` takes precedence over the image slot. These are light-DOM relationships: ordinary DOM events, CSS, element references, and event listeners remain usable.

```html
<z-spot slot="extension" knob qty="1" min="0" max="5" step="0.1"
        unit="x" label="Speed" angle="45" distance="150"></z-spot>
<z-spot slot="extension" slider progress="65" qty="65" unit="%"
        label="Progress" angle="135" distance="150"></z-spot>
```

Knobs emit `input` while changing and `change` when committed; read `event.detail.qty`. Set `spot.qty` or its `qty` attribute to update it. Progress rings display a percentage; `slider` retains the original Zircle name and is not a draggable input.

Lists accept authored `z-spot` children or an array plus renderer:

```js
const list = document.createElement('z-list')
list.perPage = 5
list.renderItem = item => {
  const spot = document.createElement('z-spot')
  spot.setAttribute('button', '')
  spot.setAttribute('label', item.name)
  spot.textContent = item.initial
  spot.addEventListener('click', () => console.log(item.id))
  return spot
}
list.items = [{ id: 1, name: 'Ada', initial: 'A' }]
// Append to a mounted view's extension, or return it from a view factory.
list.slot = 'extension'
```

List pages start at **1**. `pagechange` supplies `{ page, previousPage, pageCount }`. A one-item page centers its spot. Each list owns its pagination and keeps authored item nodes and listeners.

Dialogs start closed. `dialog.show()` opens one; `dialog.close()` closes it. `self-close` defaults to 10 seconds, or specify `duration` in milliseconds. Completion closes the dialog and emits `done`; `close` reports the reason. This is an intentional lifecycle improvement over the original `done`-only timer.

## Views with state and cleanup

A view can be an HTML string, an element, or a factory. Use factories for fresh state, listeners, or framework mounts. HTML strings must be trusted application markup; render untrusted text with `textContent`.

```js
const clockView = ({ props, context, onCleanup }) => {
  const view = document.createElement('z-view')
  const time = document.createElement('time')
  view.append(time)
  const update = () => { time.textContent = new Date().toLocaleTimeString() }
  update()
  const timer = setInterval(update, 1000)
  onCleanup(() => clearInterval(timer))
  return view
}
```

Factories receive `{ target, trigger, props, context, onCleanup }` from Zumly. `props` includes navigation data; `context` is the Map passed as `createZircle({ context })`. Register cleanup for timers, subscriptions, and mounted framework roots. It runs when the engine discards that view or the canvas is destroyed, not every time another view becomes current.

Inside React, Vue, Svelte, Angular, or another DOM framework, give Zircle a dedicated, connected host element and initialize after mount. Let Zircle own that host's generated children. Pass an AbortSignal to cancel pending initialization or dispose the initialized controller on unmount. The package can be imported during SSR, but creating a canvas requires a browser and a document light-DOM host. Shadow-root mounts are not supported by the current Zumly integration.

```js
// Framework-neutral pattern for your mount/unmount hooks:
const lifetime = new AbortController()
createZircle({
  mount: hostElement, views, initialView: 'home', signal: lifetime.signal
}).catch(error => {
  if (error.name !== 'AbortError') console.error(error)
})
function onHostUnmount() {
  lifetime.abort()
}
```

Aborted `createZircle` initialization rejects with `AbortError` and releases its generated DOM immediately. It cannot force arbitrary application promises to stop: pass the same signal to your own fetches or other cancellable work. If a cancelled renderer later returns, its result is discarded and its registered cleanup runs.

For declarative canvases, set `.views` and `.options` before connecting the element, then await `.ready`. Removing `z-canvas` cancels pending initialization and cleans up its instance automatically; a cancelled `.ready` resolves to `null`. Reconnecting creates a fresh instance. The declarative canvas owns its lifetime signal; `.options` does not accept `signal`. Use `canvas.instance` for the full controller.

## Controller and themes

`createZircle(options)` returns a promise for the controller:

| Operation | API |
| --- | --- |
| Navigate | `setView(nameOrObject, options?)`, `goTo(name, options?)`, `zoomTo(name, options?)` |
| Return | `back()`, `goBack()`, `zoomOut()` |
| Inspect | `getCurrentViewName()`, `getHistory()` (names), `getHistoryLength()` |
| Style | `getTheme()`, `getMode()`, `getShape()`, `setTheme(name)`, `setMode(name)`, `setShape(name)` |
| Lifecycle | `refresh()`, `on(type, handler)` → unsubscribe, `destroy()` |
| Engines and DOM | `app` (Zumly), `canvas` (generated element), `mount` (host) |

Options include `mount`, `views`, `initialView`, `theme`, `mode`, `shape`, `transitions`, `inputs`, `context`, `preload`, `router`, `backButton`, `backLabel`, `label`, `debug`, and `signal`. `router: true` enables Zumly's optional hash router. Router state belongs to the page URL, so use one routed canvas per page. Navigation methods return promises; await them when sequencing transitions.

Controller events are `ready`, `viewmount`, `viewchange`, `stylechange`, and `destroy`. Mount elements receive the corresponding bubbling `zircle:*` CustomEvents. Attach `zircle:ready` before initialization when observing startup; declarative startup failures emit `zircle:error`. Controller listeners receive the CustomEvent, and `event.detail` contains the payload.

The original palettes remain: `white`, `light-blue`, `black`, `purple`, `orange`, `yellow`, `blue`, `green`, `red`, `gray`. Modes: `light`, `light-filled`, `dark`, `dark-filled`. Shape: `circle` or `square`; individual components can override it. The default is black/dark/circle. Customize components with CSS rather than editing their generated structure.

## Development and migration

```sh
npx playwright install chromium firefox webkit
npm test
npm pack --dry-run
```

`npm test` builds distributions, runs package checks, and runs browser tests. `npm run test:browser` reruns browser checks against an existing build. CI uses the same checks. The development server accepts only GET/HEAD and can use `PORT=8081 npm run dev`.

Read [the migration guide](docs/MIGRATION.md) for Vue syntax changes and lifecycle differences. [The original source audit](docs/ORIGINAL.md) records every original component and the preservation contract. This is a DOM-based web library; framework independence does not imply native UIKit, Android Views, or React Native support without a WebView.

MIT © Juan Martín Muda. Orbit and Zumly retain their own MIT licenses.

In memory of my dad Néstor.
