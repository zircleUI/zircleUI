<p align="center">
  <a href="http://zircle.io">
    <img src="https://raw.githubusercontent.com/zircleUI/docs/gh-pages/zircle-dev.png" width="200">
  </a>
</p>

<p align="center">
  A frontend library to develop zoomable user interfaces — now framework-free.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zircle"><img src="https://img.shields.io/github/package-json/v/zircleui/zircleui"></a>
  <a href="https://www.npmjs.com/package/@zumer/orbit"><img alt="orbit" src="https://img.shields.io/badge/orbit-css-blue.svg"></a>
  <a href="https://www.npmjs.com/package/zumly"><img alt="zumly" src="https://img.shields.io/badge/zumly-js-blue.svg"></a>
  <br><br>
  Like it? Leave a star ⭐ to help attract more visitors and contributors.
</p>

## What is zircle 2.x?

zircle 2.x is a **vanilla-JS** rewrite of the original Vue 2 library. The radial layout math and the zoom navigation are no longer part of zircle's source — they are delegated to two purpose-built libraries:

- **[Orbit](https://github.com/zumerlab/orbit)** — CSS-only radial layout (`.bigbang / .gravity-spot / .orbit-N / .satellite`). Handles all polar positioning that the old `position.js` used to compute by hand.
- **[Zumly](https://github.com/zumerlab/zumly)** — zoom navigation engine (`zoom-me + data-to`, view stack, transitions, hash router). Replaces `z-canvas`, `z-view-manager`, `navigation.js`.

What zircle adds on top: themes, modes, shapes, a thin `createZircle()` wrapper and a demo.

This is the `dev` branch — work in progress.

## Quick start

```html
<link rel="stylesheet" href="https://unpkg.com/@zumer/orbit@latest/dist/orbit.css">
<link rel="stylesheet" href="https://unpkg.com/zumly@latest/dist/zumly.css">
<link rel="stylesheet" href="https://unpkg.com/zircle@latest/dist/zircle.css">

<script src="https://unpkg.com/@zumer/orbit@latest/dist/orbit.js"></script>
<script type="importmap">
  { "imports": { "zumly": "https://unpkg.com/zumly@latest/dist/zumly.mjs" } }
</script>

<div id="app"></div>

<script type="module">
  import { createZircle } from 'https://unpkg.com/zircle@latest/dist/zircle.js'

  const home = `
    <div class="z-view">
      <div class="bigbang"><div class="gravity-spot">
        <div class="orbit-0">
          <div class="satellite zoom-me at-center" data-to="profile">
            <div class="capsule">Zoom me</div>
          </div>
        </div>
      </div></div>
    </div>`

  const profile = `<div class="z-view"><div class="z-view-shape"><div class="z-view-content">Hello!</div></div></div>`

  await createZircle({
    mount: '#app',
    initialView: 'home',
    views: { home, profile },
    theme: 'white', mode: 'light', shape: 'circle'
  })
</script>
```

## API

### `createZircle(options) → Promise<Zircle>`

| Option        | Type    | Default            | Description |
|---------------|---------|--------------------|-------------|
| `mount`       | string \| Element | — | CSS selector or element. |
| `initialView` | string | — | Name of the first view. |
| `views`       | object | — | Map of view sources (string / URL / async fn / `{ render, mounted? }`). |
| `theme`       | string | `'black'` | Palette: `white`, `light-blue`, `black`, `purple`, `orange`, `yellow`, `blue`, `green`, `red`, `gray`. |
| `mode`        | string | `'dark'`  | Role mapping: `light`, `light-filled`, `dark`, `dark-filled`. |
| `shape`       | string | `'circle'`| `circle` or `square`. |
| `transitions` | object | sensible defaults | Passed to Zumly. |
| `depthNav`    | object | `{ position: 'bottom-left' }` | Back button. |
| `lateralNav`  | object\|bool | `false` | Lateral arrows/dots. |
| `inputs`      | object | `{ wheel: false }` | Input methods. |
| `router`      | bool   | `false` | Enable Zumly hash router. |
| `debug`       | bool   | `false` | |

Returned object: `{ app, canvas, setTheme, setMode, setShape, getTheme, getMode, getShape, goTo, zoomTo, back, zoomOut, getCurrentViewName, destroy }`. The underlying Zumly instance is exposed as `.app` for full access.

### View building blocks

Use Orbit's primitives directly inside each view:

| Old (zircle 1.x) | New (Orbit) |
|------------------|-------------|
| `<z-view>` | `<div class="z-view">` + `<div class="z-view-shape">` |
| `<z-spot to-view="x">` | `<div class="satellite zoom-me" data-to="x">` inside `.orbit-N` |
| `<z-spot button>` | `<div class="satellite button">` |
| `<z-list>` | `.orbit-N` with one satellite per item |
| polar coords `distance`/`angle` | `--o-from`/`--o-range`/`fit-range`/orbit number |

## Dev

```bash
git clone https://github.com/zircleui/zircleui.git
cd zircleui
git checkout dev
npm install

# build the library to dist/
npm run build

# serve the demo at http://localhost:8080/public/index.html
npm run dev
```

## License

MIT — © 2017 - present, [Juan Martín Muda](https://github.com/zircleUI/zircleUI/blob/dev/LICENSE)
