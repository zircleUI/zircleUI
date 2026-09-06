# Moving from Vue Zircle to framework-free Zircle

The original source is `master` at commit `2bd60e731f7afb86c737177eb83decac01deb8e2` (Zircle 1.5.4). This branch rebuilds its component model with Orbit 1.5.0 and Zumly 0.97.0. It is an alpha rewrite; Vue templates and the global `$zircle` store are not source-compatible.

The circular composition, nested spots, labels, images, progress, knobs, lists, dialogs, and spatial navigation remain the reference. [ORIGINAL.md](ORIGINAL.md) has the complete source audit, including distinctions between intended behavior and original defects.

## Replace installation and view registration

Remove `Vue.use(zircle)` and any Vue requirement added solely for Zircle. Import the built module and combined stylesheet, or use the standalone files described in the [README](../README.md). Do not switch an existing CDN URL to unversioned `zircle`: the public package may still be the Vue release.

| Original Vue | New web component or controller |
| --- | --- |
| `<z-canvas :views="$options.components" />` | `<z-canvas>` with direct `<template data-view="home">` children, or `.views` set before connection |
| Components containing `<z-view>` | One root `<z-view>` per template, HTML string, or factory result |
| `$zircle.setView('home')` at startup | `initial-view="home"` or `initialView: 'home'` |
| `$zircle` singleton | `await canvas.ready`, or the result of `await createZircle(options)` |
| Vue SFCs registered by name | `{ home: '<z-view>…</z-view>' }` or view factories |

Each canvas owns its history, observers, controls, and theme. Give its host an explicit height. Templates require a nonempty `data-view` name and exactly one root element; empty or duplicate definitions reject `.ready` and emit `zircle:error`. Mounted canvases must live in document light DOM; the current engine integration does not mount inside a shadow root.

## Translate props, slots, and events

HTML attributes use hyphenated names. Set complex values as JavaScript properties. Boolean attributes use presence: omit `button` to turn it off; `button="false"` is still present.

| Original | New |
| --- | --- |
| `:angle="45"`, `:distance="130"` | `angle="45" distance="130"`, or `.angle` / `.distance` |
| `<template #extension>` | Put `slot="extension"` on the surrounding component or wrapper |
| `<template #image>` | `<img slot="image" …>` or another image-slot element |
| `<template #media>` | `slot="media"` on view media |
| Default Vue slot | Ordinary children; `slot="content"` can identify content explicitly |
| `@click="handler"` | `element.addEventListener('click', handler)` |
| `:qty.sync="value"` / `@update:qty` | Set `.qty`; listen for `input` / `change` and read `event.detail.qty` |
| `v-if="dialogVisible"` | A mounted `z-dialog` plus `.show()` / `.close()` or `open` |
| Scoped `z-list` item slot | Authored `z-spot` children, or `.items` and `.renderItem(item, index)` |

Light-DOM content keeps its nodes and ordinary event listeners. Components arrange content into generated wrappers; avoid relying on the precise internal wrapper markup in your application. Use supported slots, public attributes, and CSS custom properties instead.

Geometry retains the original semantics: angle 0 is right, positive angles move clockwise, and distance 100 equals the parent radius. The original seven sizes and long aliases remain. Responsive diameter calculations now use the mounted canvas rather than the old window media-query table and device-pixel-ratio lookup.

## Navigation

```js
const ui = await canvas.ready
await ui.setView({ name: 'profile', params: { id: 42 } })
await ui.goBack()

const off = ui.on('viewchange', event => {
  console.log(event.detail.view, event.detail.depth)
})
```

The controller supports `setView`, `goTo`, `zoomTo`, `back`, `goBack`, and `zoomOut`. Click a `z-spot[to-view]` for actual spot-origin zoom; programmatic navigation uses Zumly's programmatic geometry. Await navigation promises when sequencing operations.

`getHistory()` returns view names. It no longer exposes the original Vue component objects or `{ X, Y, Xi, Yi, scale, scalei }` implementation. Names no longer have the old `--0` suffix. Do not slice suffixes to derive a display name.

Replace direct store reads with controller queries and events. The old `calcPosition`, global `setPages`, hover suppression flag, `iddle` mode, `getState`, and Vue Router hook helpers are not public compatibility APIs. Navigation parameters reach factory `props`; use application-owned state for information that must outlive an engine view.

`router: true` enables Zumly's hash router. Existing Vue Router configuration objects cannot be passed directly. For a host framework router, coordinate it with controller events in application code, or let Zircle use its own unrouted canvas. Use one hash-routed canvas per page.

## Lists and dialogs

Lists have independent state. Page numbers start at **1**, replacing the old global zero-based `currentPage`. Assigning `.items`, changing `per-page`, and adding/removing authored spots updates the list. `pagechange` includes `{ page, previousPage, pageCount }`. Item renderers return a node; strings are treated as text.

```js
list.renderItem = item => {
  const spot = document.createElement('z-spot')
  spot.setAttribute('button', '')
  spot.textContent = item.name
  spot.addEventListener('click', () => select(item))
  return spot
}
list.items = people
list.page = 1
```

The old `self-close` dialog started a timer on mount, emitted `done` after approximately 9.6 seconds, and relied on a Vue parent to remove it. The new dialog starts closed, opens through `open` or `.show()`, and uses a 10,000 ms default when `self-close` is set. `duration` overrides that in milliseconds. At completion it closes and emits `done`; `close` reports `{ returnValue, reason }`. You can still listen to `done` for application behavior, but do not need to remove the element to hide it.

Dialogs use the browser's dialog behavior for modal focus and Escape handling. Closing, disconnecting, or destroying a view stops timers. The `cancel` event can be prevented to keep the dialog open on Escape.

## Styling and lifecycle

Use `theme`, `mode`, and `shape` on the canvas, or controller setters. Preserve original palette names and mode names without `theme-`/`mode-` prefixes. `mode` now refers only to a color mode; full-screen versus embedded layout is set by the host element's CSS size. Old `config({ mode: 'full' })`, `percentSizes`, and `minSizesInPixels` objects are not accepted by the new controller.

The default is black/dark/circle. Square/circle overrides are resolved consistently. Canvas style attributes react to changes, including changes made while an asynchronous initial view is loading. Removing an attribute restores its `.options` value or the default. CSS is scoped to Zircle's components; applications should no longer rely on the original library's global margin/padding reset.

View factories receive `{ target, trigger, props, context, onCleanup }`. Use `onCleanup` for subscriptions, timers, and framework root unmounting. Return a fresh `z-view` element for stateful views instead of sharing one mutable element between different canvases. Discarding a view releases its resources. Going deeper may keep earlier views mounted as navigation context, so cleanup is not a view-change notification.

`createZircle` returns an asynchronously initialized controller. Pass `signal: lifetime.signal` from an AbortController and call `lifetime.abort()` when the host framework unmounts. This cancels pending initialization or destroys an existing instance. Pending initialization rejects with `AbortError`; `destroy()` remains available for explicit disposal. Cancellation releases Zircle's stage and mount registration immediately, but arbitrary application promises need their own cancellation; pass the same signal to your fetches. A late factory result is discarded and its registered cleanup runs once when it arrives.

A declarative `z-canvas` owns its cancellation controller, so `.options.signal` is not supported. Disconnecting automatically cancels or destroys its instance; a cancelled `.ready` resolves to `null`. Reconnecting starts a new instance. Moving the connected canvas synchronously within the document retains the current instance. Imports are safe during SSR, while initialization requires the browser DOM.

Original limitations intentionally corrected include shared canvas/list state, quantity zero disappearing, integer-only knob handling, invalid page indices, brittle `{ name }` navigation parsing, missing listener/timer cleanup, and missing keyboard interaction. Verify migrated application behavior in a real browser; the old Vue snapshots primarily checked markup and did not cover these interactions.


## Engine integration notes

Zircle uses the published Orbit 1.5.0 and Zumly 0.97.0 packages without patching their installed code. Its square, centered navigation canvas keeps Zumly's stored zoom poses proportional during container resizing; the surrounding stage fills the host background.

Orbit 1.5.0 draws a full stroke ring using one almost-360-degree SVG arc, which can resolve to an incorrect center after endpoint rounding. Zircle passes `359.99deg` for full control rings. Round caps close the imperceptible gap; quarter-circle scrollbars keep their original 90-degree range. `tests/geometry.spec.mjs` checks the rendered SVG center and handle positions in all three browser engines.

Lists retain native page buttons arranged on a lower Orbit arc. Lists with more than five pages show a five-page window with Previous/Next controls, keeping page buttons separated and keyboard focus stable.
