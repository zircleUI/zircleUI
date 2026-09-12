# Zircle

Zircle is a JavaScript library for circular interfaces with zoom navigation. Place controls around a view, nest circles inside other circles, and click a spot to zoom into another view.

Zircle was my first project, built with Vue. I later split its layout and navigation into Orbit and Zumly. Version 2.0 is the first merge of those two projects back into Zircle: Orbit handles radial layout, Zumly handles zoom and view history, and Zircle provides the components. You can use them directly in HTML or from a JavaScript framework.

This version is published to npm as `zircle@2.0.0`. The original Vue library is tagged `legacy-vue`. Install the package or build this checkout; the examples below work with either.

## Run the demo

Use Node.js 20 or newer:

```sh
git clone https://github.com/zircleUI/zircleUI.git
cd zircleUI
npm ci
npm run compile
npm run dev
```

Open http://127.0.0.1:8080 for the Sun, Earth & Moon demo and component examples. Run `npm run compile` again after editing the library, then reload the page.

## Use it in HTML

Copy the `dist/` directory from the npm package (or from a local build) into your site and serve it over HTTP:

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

Each template defines a named view with one root `z-view`. Click the spot to zoom in; use the back button or canvas background to return. Give the canvas a height, such as `600px` or `100dvh`.

The standalone module includes Orbit and Zumly. For a classic script tag, replace the module script with:

```html
<script defer src="./dist/zircle.iife.js"></script>
```

This exposes `window.Zircle` and registers the same elements. `defer` lets the browser parse your templates before Zircle initializes. Load one JavaScript distribution and the stylesheet.

The same files are available from a CDN without copying anything:

```html
<link rel="stylesheet" href="https://unpkg.com/zircle@2.0.0/dist/zircle.css">
<script defer src="https://unpkg.com/zircle@2.0.0/dist/zircle.iife.js"></script>
```

## Use it with JavaScript

Install the package:

```sh
npm install zircle
```

To try a local build instead, run `npm run build` in this repository and install the generated `zircle-2.0.0.tgz` by path.

Add a host element to your page:

```html
<div id="explorer" style="height:600px"></div>
```

Then initialize Zircle after the element is mounted:

```js
import { createZircle } from 'zircle'
import 'zircle/style'

const ui = await createZircle({
  mount: '#explorer',
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

ui.on('viewchange', event => {
  console.log(event.detail.view)
})
```

You can also navigate with `await ui.setView('details')` and `await ui.goBack()`. Call `ui.destroy()` when removing the app.

The package module imports Orbit and Zumly as dependencies. `zircle/style` includes their CSS and Zircle's CSS. If your app already loads both engines' stylesheets, use `zircle/components.css` instead.

## Components and layout

| Component | What it does | Main attributes and properties |
| --- | --- | --- |
| `z-canvas` | Owns navigation and theme for one app | `initial-view`, `theme`, `mode`, `shape`; `views`, `options`, `ready`, `instance` |
| `z-view` | Defines a destination | `size`, `square`, `circle`, `label`, `label-pos`, `image-path`, `slider`, `progress` |
| `z-spot` | Places a satellite, link, button, or knob | `size`, `angle`, `distance`, `to-view`, `button`, `knob`, `qty`, `min`, `max`, `step`, `unit`, `slider`, `progress`, `label`, `label-pos`, `pos`, `image-path` |
| `z-list` | Arranges items around a view, with pagination | `per-page`, `page`; `items`, `renderItem`, `next()`, `previous()` |
| `z-dialog` | Opens a circular dialog | `open`, `self-close`, `duration`, `size`, `image-path`; `show()`, `close()` |

Sizes are `xxl`, `xl`, `l`, `m`, `s`, `xs`, and `xxs`. The original aliases `extralarge`, `large`, `medium`, `small`, and `extrasmall` also work. Views default to `xxl`; spots default to `medium`. Sizes scale with the canvas.

An angle of `0` points right and `90` points down. Distance is a percentage of the parent radius: `100` places a spot's center on its parent's circumference; `0` centers it.

Ordinary child content sits in the center. Use `slot="extension"` to place surrounding components, including a spot inside another spot. Use `slot="image"` for images and `slot="media"` for view media. When set, `image-path` takes precedence over the image slot. Components use light DOM, so you can style them and attach ordinary DOM listeners.

### Controls

Add these to a view or spot:

```html
<z-spot slot="extension" knob qty="1" min="0" max="5" step="0.1"
        unit="x" label="Speed" angle="45" distance="150"></z-spot>
<z-spot slot="extension" slider progress="65" qty="65" unit="%"
        label="Progress" angle="135" distance="150"></z-spot>
```

Knobs emit `input` while changing and `change` when committed. Read the value from `event.detail.qty`; set `spot.qty` or the `qty` attribute to update it. The `slider` attribute keeps its original Zircle meaning: a progress ring displaying a percentage.

### Lists and dialogs

A list accepts authored `z-spot` children or an array with a renderer. For a `<z-list>` already in your view:

```js
const list = document.querySelector('z-list')
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
```

Pages start at `1`. Each list has its own pagination and emits `pagechange` with `{ page, previousPage, pageCount }` in `event.detail`.

Dialogs start closed. Call `dialog.show()` to open one and `dialog.close()` to close it. Add `self-close` for automatic completion after 10 seconds, or set `duration` in milliseconds. Completion closes the dialog and emits `done`; the `close` event reports the reason.

## Views with state

A view can be an HTML string, an element, or a factory. Use factories for state, listeners, timers, or framework mounts. HTML strings are application markup; put untrusted text in `textContent`.

```js
const clockView = ({ onCleanup }) => {
  const view = document.createElement('z-view')
  const time = document.createElement('time')
  view.append(time)

  const update = () => { time.textContent = new Date().toLocaleTimeString() }
  update()
  const timer = setInterval(update, 1000)
  onCleanup(() => clearInterval(timer))
  return view
}

// Use it in the views map: views: { clock: clockView }
```

Factories receive `{ target, trigger, props, context, onCleanup }`. Navigate with `ui.setView({ name: 'details', params: { id: 42 } })` to pass data in `props`. Supply a Map or object as `context` to share data between views; the default is a new Map. Cleanup runs when Zumly discards the view or the canvas is destroyed. Earlier views can remain mounted while you zoom deeper.

For React, Vue, Svelte, Angular, or another DOM framework, give Zircle a dedicated host element and initialize after mount. Let Zircle manage that host's generated children. Use an `AbortController` to tie it to your component's lifetime:

```js
const lifetime = new AbortController()
createZircle({
  mount: hostElement, views, initialView: 'home', signal: lifetime.signal
}).catch(error => {
  if (error.name !== 'AbortError') console.error(error)
})

// In your component's unmount hook:
lifetime.abort()
```

Aborting cancels pending initialization or destroys the initialized controller. Pending initialization rejects with `AbortError`. Pass the signal to your own fetches too if they should stop when the host is removed.

For declarative `z-canvas`, set `.views` and `.options` before mounting, then await `.ready`. The canvas handles cleanup when removed and creates a fresh instance when reconnected. A cancelled `.ready` resolves to `null`. Use `.instance` to access the controller; `.options` does not accept a lifetime signal.

You can import Zircle during SSR, but initialization needs a browser and a connected light-DOM host. Zumly's current integration does not support mounting inside a shadow root. Native mobile apps need a WebView.

## Controller and themes

`createZircle(options)` returns a promise for the controller:

| Operation | API |
| --- | --- |
| Navigate | `setView(nameOrObject, options?)`, `goTo(name, options?)`, `zoomTo(name, options?)` |
| Return | `back()`, `goBack()`, `zoomOut()` |
| Inspect | `getCurrentViewName()`, `getHistory()` (view names), `getHistoryLength()` |
| Style | `getTheme()`, `getMode()`, `getShape()`, `setTheme(name)`, `setMode(name)`, `setShape(name)` |
| Lifecycle | `refresh()`, `on(type, handler)` (returns an unsubscribe function), `destroy()` |
| Engines and DOM | `app` (Zumly), `canvas` (generated element), `mount` (host) |

Options include `mount`, `views`, `initialView`, `theme`, `mode`, `shape`, `transitions`, `inputs`, `context`, `preload`, `router`, `backButton`, `backLabel`, `label`, `debug`, and `signal`. Set `router: true` for Zumly's hash router; use one routed canvas per page. Await navigation methods when sequencing transitions. See [the TypeScript declarations](index.d.ts) for signatures and payloads.

Controller events are `ready`, `viewmount`, `viewchange`, `stylechange`, and `destroy`. Listeners receive a CustomEvent with data in `event.detail`. The host also receives bubbling `zircle:*` events. Attach `zircle:ready` before initialization to observe startup; declarative startup failures emit `zircle:error`.

Palettes: `white`, `light-blue`, `black`, `purple`, `orange`, `yellow`, `blue`, `green`, `red`, `gray`. Modes: `light`, `light-filled`, `dark`, `dark-filled`. Shape: `circle` or `square`, with per-component overrides. The defaults are black, dark, and circle.

## Development and releases

The scripts follow SnapDOM's release workflow:

| Command | What it does |
| --- | --- |
| `npm run compile` | Generates JavaScript and CSS in `dist/` |
| `npm run dev` | Serves the local demo on port 8080 |
| `npm test` | Compiles, checks the package, and runs Chromium, Firefox, and WebKit tests |
| `npm run bump:dry` | Previews a version bump with `@zumerbox/bump` |
| `npm run bump` | Bumps the version, commits and tags it, then generates the changelog |
| `npm run build` | Compiles and creates the `.tgz` package with `npm pack` |
| `npm run release:push` | Commits `CHANGELOG.md` and pushes the current branch with its tags |

Install the test browsers once with `npx playwright install chromium firefox webkit`. Run `npm run test:browser` to repeat browser tests against an existing build, or `npm run test:package` for package checks.

For a release, start from a clean working tree on `main`: run `bump:dry`, `bump`, the tests, `build`, then `release:push`. Publishing to npm is a separate step. See [CONTRIBUTING](.github/CONTRIBUTING.md) for the commands.

If you're coming from the Vue version, read [the migration guide](docs/MIGRATION.md). [The original component audit](docs/ORIGINAL.md) records the source and behavior used for this merge.

MIT © Juan Martín Muda. Orbit and Zumly retain their own MIT licenses.

In memory of my dad Néstor.
