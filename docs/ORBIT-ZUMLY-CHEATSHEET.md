# Orbit + Zumly + zircle — cheatsheet

Quick reference for how the three pieces fit together. Re-read before
touching `src/components/` or `src/zircle.js`.

## TL;DR mental model

| Concern | Library | What it owns |
|---|---|---|
| Radial layout (polar coordinates, arcs, gauges, satellites) | **Orbit** (CSS) | `.bigbang`, `.gravity-spot`, `.orbit-N`, `.satellite`, `<o-arc>`, `<o-progress>` |
| Zoom navigation (stack of views, transitions, history, router) | **Zumly** (JS) | `Zumly` class, `.z-view` class on view roots, `.zoom-me[data-to]` triggers |
| Visual identity + declarative components | **zircle** (this repo) | `<z-canvas>`, `<z-view>`, `<z-spot>`, etc. + themes/modes/shapes |

The three operate in different layers — they do **not** overlap. Bugs
usually come from making one of them do the other's job.

## Three rules I keep forgetting

### 1. Orbit only works inside its full chain

```html
<div class="bigbang">
  <div class="gravity-spot">
    <div class="orbit-N">
      <o-arc> | <o-progress> | <div class="satellite"> ...
    </div>
  </div>
</div>
```

- `.bigbang` → direct children: `.gravity-spot` only.
- `.gravity-spot` → direct children: `.orbit*` or `.gravity-spot` only.
- `.satellite` → direct children: `.capsule` or `.gravity-spot` only.
- Anything outside this chain (e.g. `<o-arc>` floating in a `<z-spot>`)
  will get a **red dotted border + ⚠️ icon**. Those visual warnings are
  Orbit's way of saying *"you used me wrong"* — they are not decorations.

  Add `dev-orbit` to a `.bigbang` to see the layout grid while debugging.

### 2. Zumly's mount must be a CSS selector string

```js
new Zumly({ mount: '#app', ... })   // ✅ Zumly does document.querySelector(mount)
new Zumly({ mount: el,     ... })   // ❌ silently fails — canvas becomes null
```

In `z-canvas.js` we auto-assign an id if the element has none, then pass
`'#' + this.id`.

### 3. `<z-view name>` definitions must be stripped before storing

`<z-canvas>` reads its declared `<z-view name="X">` children **synchronously**
in `connectedCallback`, then:

1. **Clones** the node.
2. **Removes** the `name` attribute on the clone.
3. Stores `clone.outerHTML` in `this._views[X]`.
4. Removes the original from the DOM.

The component code uses the `name` attribute as the discriminator
("definition vs. instance"). Forgetting to strip it on the clone means
the version Zumly inserts back into the canvas is treated as a definition
too and silently refuses to render.

## When to use Orbit vs. position by hand

| Use Orbit's chain | Position with transform yourself |
|---|---|
| `<o-arc>` (pie wedges, gauges) | `<z-spot>` with `orbit` + `angle` |
| `<o-progress>` (sliders around z-view/z-spot) | nested z-spots (Sun → Earth → Moon) |
| `<z-menu>`, `<z-gauge>`, `<z-compass>` (internally) | `<z-list>` items, `<z-pagination>` dots |

**Why the split?** Orbit's `.satellite` rule (only `.capsule` / `.gravity-spot`
as children) is incompatible with our `<z-spot>` API, which has arbitrary
HTML inside. So `<z-spot>` is **not** a `.satellite` — it's a custom element
that computes its own polar transform in JS (`src/components/sizes.js → polarOffset`).
This is why `z-view` keeps its child `<z-spot>`s as plain absolute siblings,
**not** inside `.bigbang > .gravity-spot`.

## Component lifecycle

```
HTML parsed
  ↓
<z-canvas> connectedCallback
  ├─ syncronously captures <z-view name="…"> children
  │   • cloneNode → removeAttribute('name') → outerHTML → views[name]
  │   • original removed from DOM
  ├─ queueMicrotask(() => boot)
  └─ boot:
       new Zumly({ mount:'#'+id, views, ... })
       await app.init()           ← inserts initialView clone, gets .is-current-view
       setAttribute('data-ready')

<z-view> connectedCallback (clone, no name attr)
  ├─ classList.add('z-view')      ← Zumly requires this class
  └─ queueMicrotask(() => render)
       • capture non-component children → fragment
       • insertBefore(shapeEl, firstChild)   ← do NOT innerHTML=''
       • leave nested <z-spot> as siblings

<z-spot> connectedCallback
  ├─ classList.add('z-spot')
  └─ queueMicrotask(() => render)
       • applyTransform()  (orbit+angle → cos/sin)
       • insertBefore(image) at start, append(content/label/slider) at end
       • never moves existing children
```

The "insert without moving" pattern is critical — it preserves Zumly's
`.is-current-view`, `.is-previous-view`, `.zoomed` classes and avoids a
disconnect/connect storm at every render.

## Orbit visual warnings — common causes

| What you see | What I broke |
|---|---|
| Red dotted border + ⚠️ on a `.gravity-spot` | Put non-orbit children inside (e.g. a `<z-spot>`) |
| Red dotted border + ⚠️ on a `.satellite` | Put non-capsule children inside |
| `<o-arc>` invisible / 0×0 | It is not inside an `.orbit-N` inside a `.gravity-spot` inside a `.bigbang` |
| `<o-progress>` invisible | Same — needs the full chain |
| z-spot positioned at center | Its parent has no z-view/z-spot ancestor → `_findParentRadiusVmin()` fell back to `xxl` |

## Debugging without DevTools

`public/index.html` ships with a red top-bar overlay that catches
`window.onerror` and unhandled rejections, then POSTs them to
`/__client_log__`. `scripts/dev.mjs` logs each request *and* prints
incoming client errors prefixed with `[browser]`. Use that to surface
bugs from the terminal alone.

## Loading dependencies

In a browser (no bundler):

```html
<link rel="stylesheet" href="https://unpkg.com/@zumer/orbit@latest/dist/orbit.css">
<link rel="stylesheet" href="https://unpkg.com/zumly@latest/dist/zumly.css">
<link rel="stylesheet" href="dist/zircle.css">

<!-- Orbit ships as IIFE — load via script tag so its custom elements register -->
<script src="https://unpkg.com/@zumer/orbit@latest/dist/orbit.js"></script>

<!-- Zumly ships as ESM — import map so `import 'zumly'` resolves -->
<script type="importmap">
  { "imports": { "zumly": "https://unpkg.com/zumly@latest/dist/zumly.mjs" } }
</script>

<script type="module" src="dist/zircle.js"></script>
```

`zircle.js` does **not** import `@zumer/orbit` transitively (Orbit is a
side-effecting global that registers `<o-arc>` / `<o-progress>` on load).
The consumer must load it themselves — same as how Zumly's own docs do it.

## Where the code lives

| Path | Role |
|---|---|
| `src/zircle.js` | Top-level entry. Registers every custom element via `./components/index.js` and exports `createZircle()` for code-first setups. |
| `src/components/z-canvas.js` | Owns the Zumly instance. Reads `<z-view name>` definitions, applies theme/mode/shape. |
| `src/components/z-view.js` | Inserts the visible shape; leaves children as siblings. |
| `src/components/z-spot.js` | Polar-positioned satellite via `orbit + angle`. |
| `src/components/sizes.js` | Shared scale (xxl..xxs → vmin) + `polarOffset()`. |
| `src/components/z-list.js` | Paginated radial — items are `<z-spot>`s, not Orbit satellites. |
| `src/components/z-menu.js`, `z-gauge.js`, `z-compass.js` | The only components that build their own Orbit chain internally. |
| `src/components/z-knob.js`, `z-slider.js`, `z-scroll.js`, `z-pagination.js`, `z-dialog.js`, `z-tabs.js`, `z-breadcrumb.js` | Standalone helpers / sub-components. |
| `src/styles/zircle.css` | Themes (`theme-*`), modes (`mode-*`), shapes (`shape-*`), labels, pulse/hover animations, demo chrome. |
| `public/index.html` | Component showcase: one `<z-view name="d-…">` per component. |
| `src/demo/{app,chrome}.js` | Wires up interactive demos (knob → reset, gauge → ±10, etc.) and updates title/footer. |
| `esbuild.config.mjs` | Builds `dist/zircle.{js,iife.js,css}`. |
| `scripts/dev.mjs` | Static dev server with request logging and `/__client_log__` ingestion. |
