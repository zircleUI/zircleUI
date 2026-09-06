# Returning to the original Zircle

This is the source audit and preservation contract for rebuilding Zircle without Vue. The original branch in this repository is named **`master`**, not `main`. This audit reads commit **`2bd60e731f7afb86c737177eb83decac01deb8e2`**, whose package version is `1.5.4`. It does not use the former `dev` implementation as the product specification.

The new composition is Orbit for radial layout, Zumly for spatial zoom and navigation, and Zircle for the original component vocabulary and its controls. The public tags remain `z-canvas`, `z-view`, `z-spot`, `z-list`, and `z-dialog`. They are framework-independent custom elements. Content is ordinary light DOM; `slot="content"`, `slot="image"`, `slot="media"`, and `slot="extension"` identify the original content relationships where supported.

This document records original behavior, including defects. A recorded behavior is not automatically a promise to preserve a bug. The checklist is a review contract, not a claim that every item has already been implemented or verified.

## Source coverage

All references in this document refer to that commit. Use `git show master:<path>` to inspect them without switching branches.

| Area | Original source |
| --- | --- |
| Five public components | `src/components/z-canvas.vue`, `z-view.vue`, `z-spot.vue`, `z-list.vue`, `z-dialog.vue` |
| Internal controls | `src/components/child-components/z-knob.vue`, `z-slider.vue`, `z-scroll.vue`, `z-pagination.vue` |
| View lifecycle | `src/components/child-components/z-view-manager.vue` |
| Plugin installation | `src/index.js` |
| Shared state and action composition | `src/store/state.js`, `store.js`, `actions.js` |
| Configuration, navigation, geometry | `src/store/modules/app.js`, `navigation.js`, `position.js` |
| Sizing and display | `src/store/modules/responsiveness.js`, `themes.js`, `src/store/utils/responsiveness.js` |
| Lists, route integration, diagnostics | `src/store/modules/list.js`, `router.js`, `debug.js` |
| Additional navigation utilities | `src/store/utils/navigation.js` — these duplicate helpers in the navigation module and are not imported there |
| Component and theme styling | `src/styles/sass/styles.sass`, `themes.sass` |
| Complete demo | `src/App.vue`, `src/main.js`, `src/demo/home.vue`, `demo.vue`, `sun.vue`, `earth.vue`, `moon.vue`, `docs.vue`, `state/index.js`, `public/index.css`, `public/index.html` |
| Assets | `public/sun.png`, `earth.png`, `moon.png` |
| Tests | All six files in `tests/unit/*.spec.js`, five `tests/unit/__snapshots__/*.snap`, `tests/unit/setup.js`, `jest.setup.js` |
| Product context | `README.md`, `CHANGELOG.md`, `package.json`, `LICENSE` |

The original tests cover plugin registration, initial theme and shape, selected props, and shallow HTML snapshots. They do **not** establish correct real-browser zoom geometry, touch behavior, cleanup, keyboard support, list isolation, or resizing. Several snapshots even accept missing dimensions and `NaN` transforms. Those snapshots should not be treated as correctness guarantees.

## Identity to preserve

The original description is “A frontend library to develop zoomable user interfaces.” Its defining interaction is entering a small circular spot and arriving inside the related larger view. Back navigation restores the surrounding context. Circles can orbit other circles recursively; the interface need not resolve into a rectangular grid.

Preserve these decisions:

- A circular view anchors a scene; smaller spots extend from it at explicit angles and distances. A spot can contain another spot in its extension.
- Zoom originates from the selected spot. Its position and size determine the destination transform. This is spatial navigation, not a page fade or a modal substitution.
- Older views remain visible as receding context. Only the active view receives interaction.
- The same vocabulary supports navigation targets, ordinary buttons, progress indicators, knobs, images, lists, and transient dialogs.
- Circular borders, a faint dashed outer view ring, a brief spot hover ring, and a press pulse provide recognizable feedback.
- Labels sit outside shapes on any of four sides. Images fill the circular content region while text or media can layer over them.
- Seven related size tiers, responsive sizing, full-screen and embedded canvases, and configurable color palettes are part of the library.
- Square forms are supported exceptions within the same component system.
- The solar-system example demonstrates composition, nesting, motion, and progressive exploration. Preserve the Sun → Earth → Moon relationship and the original assets.

The reconstruction does not need a new collection of unrelated tabs, menus, gauges, or compass controls to recover this identity. Keep the original MIT attribution and the README dedication, “In memory of my dad Néstor.”

## Public components: original contract

Names below are Vue property names. Declarative HTML uses their hyphenated equivalents, such as `image-path`, `label-pos`, `to-view`, `per-page`, and `self-close`. A property with no default is absent/undefined in the original source.

### `z-canvas`

Source: `src/components/z-canvas.vue`.

| Property | Type | Original default |
| --- | --- | --- |
| `views` | Object | Required |

The canvas registers a named view dictionary and renders a centered zoom layer. It applies the configured theme, mode, shape, and full/mixed display classes. The identity transform is scale 1 at the center. Navigation transforms use `scale(scale) translate3d(Xi, Yi, 0)` with a 1,000 ms `ease-in-out` transition.

Clicking the background goes back when history contains a previous view and the pointer is outside the active content. The original `allowBackwardNavigation(true)` name is misleading: that value actually **blocks** the canvas back handler while a view or pagination point is hovered. Router-enabled canvases call router back instead. Transition completion changes navigation mode to the misspelled original value `iddle`.

On mount and window resize, the canvas recalculates diameters. The original hardcodes `z-container` and `z-zoomable-layer` IDs and never removes its resize listener; the rebuild must scope these to instances and clean them up.

### `z-view`

Source: `src/components/z-view.vue`.

| Property | Type | Original default |
| --- | --- | --- |
| `distance` | Number | `0` |
| `angle` | Number | `0` |
| `size` | String | `xxl` |
| `circle` / `square` | Boolean | `false` / `false` |
| `label` | String or Number | Absent |
| `labelPos` | String | `bottom` |
| `imagePath` | String | Absent |
| `progress` | Number | `0` |
| `slider` | Boolean | `false` |

Supported slots: default content, `image`, `media`, and `extension`. `imagePath` wins over the image slot. Media layers over the text content. Extensions remain outside the clipped content and can contain spots, lists, or dialogs. The outer guide ring is 74 px wider than the view diameter, with a 1 px dashed border at 20% opacity. The view itself has a 3 px border.

The effective source shape is square only when `square` is true; otherwise it is circular. The declared `circle` property and global square theme have inconsistent effects because explicit `is-circle` classes override the global selector. The intended reconstruction should resolve global and per-element shapes consistently.

`slider` displays the circular progress ring only on a circle. Long content gets a circular arc scrollbar; square long content uses normal vertical overflow. Original overflow detection waits 1 second after mounting and compares inner text height with the component diameter. It only activates for the current view. Scrolling updates the arc and moving the arc updates scrolling.

The component captures a unique history view identity and provides it to descendants. The active view recomputes geometry on resize; inactive views keep captured geometry so zoom history does not jump. Forward current content fades in over 1 second; departing content fades out over 500 ms. The incoming view wrapper fades in over 2 seconds.

`distance` and `angle` are declared but not used for view geometry: view position comes from navigation history.

### `z-spot`

Source: `src/components/z-spot.vue`.

| Property | Type | Original default |
| --- | --- | --- |
| `distance` | Number | `100` |
| `angle` | Number | `0` |
| `index` | Number | Absent |
| `size` | String | `medium` |
| `circle` / `square` | Boolean | `false` / `false` |
| `label` | String or Number | Absent |
| `labelPos` | String | `bottom` |
| `imagePath` | String | Absent |
| `progress` | Number or Object | `0` |
| `qty` | Number | `0` |
| `unit` | String | Absent |
| `min` / `max` | Number | `0` / `100` |
| `pos` | String | Absent; quantity displays inside |
| `slider` / `button` / `knob` | Boolean | `false` each |
| `toView` | String or Object | Absent |

Supported slots: default content, `image`, and `extension`. There is no implemented media slot for spots. `imagePath` wins over the image slot; text and quantity layer above the image. Nested extension spots are first-class behavior.

Events: `click` forwards the native event; `update:qty` reports knob changes. A navigation target may be a view name or `{ name, params }`. On mouseup, a target spot sends its absolute position and scale to `setView`. Mouseup propagation is stopped to avoid activating parent spots. Mouse/touch press starts a 350 ms pulse. Hovering an active, navigable, non-button spot plays a 700 ms expanding ring whose plate is 15 px wider than the spot. A `button` has a pointer cursor, no outer spot ring, and a border hover treatment. A spot without a target has a default cursor. Hover raises spot stacking order for overlaps.

Quantity formatting is `qty` followed directly by `unit`; `pos="outside"` places it after the label, while absent or `inside` places it in the content. The original truthiness check wrongly hides quantity zero, and a label of numeric zero is likewise hidden. Preserve the numeric API, fix zero rendering. Although `progress` accepts Object, the ring implementation only performs numeric arithmetic; there is no implemented object progress contract to reproduce.

For direct children of a list, spots use evenly spaced angles `360 / visibleCount * index - 90`. A single item centers at distance 0. Otherwise the spot retains its configured distance. List spots use the accent class; other spots use primary styling.

### `z-list`

Source: `src/components/z-list.vue`, `src/store/modules/list.js`.

| Property | Type | Original default |
| --- | --- | --- |
| `size` | String | `xxl` |
| `items` | Array | Required |
| `square` | Boolean | `false` |
| `perPage` | Number | `5` |

The original copies the supplied items before chunking, so it does not mutate the caller's array. A scoped slot receives each item’s fields plus its current-page `index`; the caller authors each item spot. The list initializes page index 0 and renders only that page. A one-item page centers its spot; larger pages distribute spots clockwise from the top.

Multiple pages render clickable pagination dots around the lower perimeter only in the circular global theme. Pagination distance is `(listDiameter + xsDiameter + 10) / listDiameter * 100`. For `P` pages and zero-based dot index `i`, the original angle simplifies to `90 + 5 * P - 5 - 10 * i`: dots have 10-degree spacing and are symmetric around 90 degrees. Each pagination dot is half the `xs` diameter with a plate 12 px larger; active dots are filled and inactive dots outlined.

Original defects: page data is global across all lists; items and `perPage` are read only at mount; invalid page sizes can break chunking; page indices are not clamped; empty page access can throw; item keys read `item[0]` even for object items; the list `square` prop has no implemented effect. The new list needs local state, safe empty results, bounded pagination, and updates when its inputs change.

### `z-dialog`

Source: `src/components/z-dialog.vue`.

| Property | Type | Original default |
| --- | --- | --- |
| `selfClose` | Boolean | `false` |
| `size` | String | `xxl` |
| `circle` / `square` | Boolean | `false` / `false` |
| `imagePath` | String | Absent |

Supported slots: default content, `image`, `media`, and `extension`. `imagePath` takes precedence. The dialog is centered, at z-index 500; its body is the selected diameter plus 50 px and its guide ring is that diameter plus 180 px. Opening and closing scale between 0 and 1 over 300 ms. It supports the same long-content behavior as views.

`selfClose` starts progress at 5, increments one point every 100 ms, and emits **`done`** on the tick after reaching 100: approximately 9.6 seconds after mount. It does not remove itself; the consumer controls visibility in response to `done`. The progress indicator is gated by the original circular-theme conditions, but the timer still runs even when the ring is hidden. Timers are not cleaned up on destruction in the original. The intended semantic is a timed dialog with visible progress and a completion event, with proper lifecycle cleanup.

## Internal controls

| Original child | Properties and behavior |
| --- | --- |
| `z-slider` | `progress`; a noninteractive circular progress ring, despite its name. SVG circle radius 51 in a 100×100 view box; starts at the top, fills clockwise. Offset is circumference × `(1 - progress / 100)`. Stroke widths: `xxl` 3; `large`/`xl` 7; `small` 9; `xs`/`extrasmall` 10; `xxs` 11; otherwise 8. Aliases `l` and `s` wrongly miss their corresponding width cases. |
| `z-knob` | `qty`, `min`, `max`, `pos`; emits `update:qty`. Initial angle is `round((qty - min) * 360 / (max - min))`. Quantity is `round(angle / 360 * (max - min)) + min`. Click a ring to animate the handle to the clicked angle, or drag the handle using mouse/touch. Angle 0 is right, 90 down. Handle radius is parent radius minus 3 px; handle graphic has radius 8. The original knob does not resync after external quantity changes, clamp invalid input, handle `max === min`, or support keyboard interaction. |
| `z-scroll` | `scrollVal`; emits `update:scrollVal`. A quarter-circle track on the right from approximately −45° to +45°, with click/drag mouse and touch handling. Handle graphic radius 10. View/dialog map content progress to `−45 + fraction * 86` and inverse map it to scrollTop; the control can emit through +45, so the original mapping overshoots the last 4 degrees. Use a consistent bounded mapping in the rebuild. |
| `z-pagination` | `distance=100`, `angle=0`, `size='xs'`, `index=0`, `active=0`. Displays the active/inactive page dot. Injects owning view identity and freezes geometry while that view is inactive. |
| `z-view-manager` | Renders the last three history entries: current, previous, and past. Previous is blurred 2 px at 40% opacity; past blurred 2 px at 20%. Both disable pointer events. In router mode the current entry is supplied by router-view. |

The rebuilt public component vocabulary does not need to expose these children as extra mandatory tags. Their functionality belongs to the original five public components.

## Geometry, responsiveness, and themes

### Polar geometry

Sources: `src/store/modules/position.js`, `src/store/utils/responsiveness.js`.

`distance` is a percentage of the **parent radius**, not diameter or available canvas width:

```text
radius = parentDiameter / 2 * distance / 100
x = radius * cos(angle * π / 180)
y = radius * sin(angle * π / 180)
```

Angles increase clockwise in screen coordinates: 0° right, 90° bottom, 180° left, 270° top. A distance of 0 centers a spot; 100 places its center on the parent's circumference. Nested spot navigation composes absolute coordinates and scales through each ancestor. Destination scale is the previous scale multiplied by `xxlDiameter / spotDiameter`; the view carries the inverse scale so the destination appears at its normal diameter after the camera transform.

For the Orbit integration, preserve these meanings when converting to Orbit variables. Avoid applying a second JS translation or scale on top of Orbit's radial placement. For Zumly, derive zoom origins from the actual composed spot geometry rather than assuming every target is a direct child of a view.

### Sizes

Canonical sizes are `xxl`, `xl`, `l`, `m`, `s`, `xs`, and `xxs`. Case-insensitive aliases: `extralarge → xl`, `large → l`, `medium → m`, `small → s`, `extrasmall → xs`.

| Original sizing breakpoint | xxl | xl | l | m | s | xs | xxs |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Under 320 px | 200 | 124 | 76 | 48 | 30 | 18 | 10 |
| At least 320 px | 230 | 142 | 88 | 54 | 34 | 20 | 10 |
| At least 375 px, portrait | 260 | 160 | 100 | 62 | 38 | 22 | 12 |
| At least 375 px, landscape | 270 | 168 | 104 | 64 | 40 | 24 | 12 |
| At least 768 px, portrait, source pixel-ratio query | 340 | 210 | 130 | 80 | 52 | 32 | 14 |
| At least 768 px, landscape | 360 | 222 | 138 | 86 | 54 | 32 | 14 |
| At least 992 px, either orientation | 420 | 260 | 160 | 100 | 62 | 38 | 16 |
| At least 1200 px portrait, or at least 1800 px | 450 | 278 | 172 | 106 | 66 | 42 | 20 |

The full canvas uses window media queries; mixed mode chooses tiers from the canvas width, using the portrait entries at 375 and 768. Full mode is fixed at viewport size, mixed mode absolute within its containing element. The original canvas font is `Source Sans Pro, sans-serif`, with `calc(13px + 1vmax)` in full mode and 13 px when embedded. Label font is `calc(8px + 1vw)`.

Optional percentage sizing defaults to `{ xxl: 30, xl: 20, l: 16, m: 8, s: 6, xs: 4, xxs: 2 }` percent of canvas width, with pixel minima `{ xxl: 180, xl: 150, l: 100, m: 80, s: 50, xs: 30, xxs: 20 }`. Values are rounded. A device-pixel-ratio lookup then rounds diameters down to particular multiples to mitigate raster rounding during deep zoom. That specific lookup is an implementation workaround; the reconstruction needs stable visible geometry across browser zoom, resizing, and pixel ratios rather than mechanically copying it.

### Theme palette

Sources: `src/styles/sass/themes.sass`, `src/store/modules/themes.js`, `src/store/state.js`.

Default: `theme-black`, `mode-dark`, `circle`.

| Theme | Shade | Primary | Accent |
| --- | --- | --- | --- |
| white | black | white | gray |
| light-blue | `#f1f1f1` | `#5fc9f3` | `#0d7fac` |
| black | `#859ba6` | `#283237` | `#000000` |
| purple | `#fdecf0` | `#ee305a` | `#7b0a23` |
| orange | `#fff8f3` | `#f7892f` | `#884005` |
| yellow | `#fffcf2` | `#ffca26` | `#8c6a00` |
| blue | `#d4e1f1` | `#3e78bb` | `#182e48` |
| green | `#f6fbf6` | `#69bf66` | `#2b6329` |
| red | `#fef8f8` | `#ef3c3b` | `#860c0b` |
| gray | `#e4e4e5` | `#7c7e81` | `#313233` |

| Mode | Background | Main text/border | Main fill | Accent text |
| --- | --- | --- | --- | --- |
| light | shade | primary | shade | accent |
| light-filled | shade | accent | primary | accent |
| dark | primary | shade | primary | accent |
| dark-filled | primary | accent | shade | shade |

Theme classes derive colors from `--shade-color`, `--primary-color`, and `--accent-color`, allowing custom palettes. Original semantic classes are `primary`, `accent`, `shade`, `success`, `warning`, `danger`, and `transparent`. Status colors default to green, yellow, and red. Components can override colors and borders through ordinary CSS.

Some original CSS references nonexistent custom properties, including `--foreground-color`, `--primary-text-color`, and `--accent-text-and-border-color`. Fix these relationships instead of preserving unresolved colors. The original global `*` reset must be scoped so the library does not reset the surrounding host application.

## Original imperative API

The Vue plugin exposes all store actions as `$zircle`; there is no per-canvas state. The reconstruction should provide equivalent useful operations from the owning canvas/controller without requiring a Vue instance or coupling to a particular framework router.

| Area | Original methods and semantics |
| --- | --- |
| Configuration | `config({ debug, mode, usePercentSizes, percentSizes, minSizesInPixels, style: { theme, mode, shape }, router })`; `mode` accepts `full`/`mixed`. Theme/mode inputs omit `theme-`/`mode-` prefixes. `resetConfig()` deep-copies defaults, including clearing history. |
| App queries | `getAppMode()`, `isUsingPercentSizes()`, `getState()`; the last returns raw Vue state. |
| View registration | `setComponentList(list)` merges name→component entries; `getComponentList()`; `resolveComponent(list, name)` matches case-insensitively and supplies a “name not found” view for missing names. |
| Forward navigation | `setView(nameOrObject, { position }?)`; object form is `{ name, params }`. Position defaults to identity when absent or scale 0. `toView('name')` delegates to `setView`; `toView({ to, fromSpot, params })` uses the supplied spot's origin. |
| Back navigation | `goBack()` pops history only above depth 1, restores previous params, and sets backward mode. `getBackwardNavigationState()`, `allowBackwardNavigation(value)` expose the hover suppression state. |
| History | `getHistory()` returns a shallow array copy; `getHistoryLength()`; `getCurrentViewName()`, `getPreviousViewName()`, `getPastViewName()`. Without a router, repeated names become lowercase `name--0`, `name--1`, etc. |
| Navigation state | `setNavigationMode(value)`, `getNavigationMode()`; accepted values are `forward`, `backward`, `iddle`, `replace`. |
| Geometry | `getCurrentPosition()`, `getPreviousPosition()`, `getPastPosition()`, `calcViewPosition(viewName)`, `calcPosition(component)`. Missing positions return zero values; the canvas supplies an identity default. |
| Sizing | `updateDiameters()`, `getComponentWidth(size)`. |
| Theme | `getTheme()`, `getThemeMode()`, `getThemeShape()`, `setThemeShapeToSquare()`, `setThemeShapeToCircle()`. |
| Pagination | `setPages(value)`, `getPages()`, `getNumberOfPages()`, `getCurrentPage()`, `getCurrentPageIndex()`, `setCurrentPageIndex(value)`, `getNumberOfItemsInCurrentPage()`. These belonged to shared state; replace with scoped list operations. |
| Params | `setParams(value)`, `getParams()`; forward navigation exposes destination parameters, back restores the prior view's parameters. |
| Vue Router integration | `getRouterState()`, `evaluateRoute(view, position)`, `replace(view)`, `setRouterHooks()`, `setFallbackView(view)`, `getFallbackView()`, `isFallbackView()`. `replace` clears history and establishes a new identity root. Configuration registers router hooks and starts from its current named route. Framework-specific hooks should not carry into the core. |
| Diagnostics | `setLog(message, type)` prints only in debug mode; `type` can be `warn` or `error`. |

The original caps history at six entries, so further navigation silently returns after an optional debug message. Recursive views are intentional; the depth cap is a zoom safety limit, not a requirement that every view name be unique. Any changed depth policy should be explicit and consistently enforced with the engine.

## The complete original demo

Source: `src/demo/*`, `src/App.vue`, `public/index.css`.

1. **Home**: square `xl` view; a centered medium “Zoom me” spot opens `demo`. An `xs` spot at 45°, distance 130, links to `docs` with the label “doc & resources.”
2. **Solar system**: shaded `xxl` view. A centered, transparent `l` Sun spot opens `sun`. The Sun contains a transparent `s` Earth spot at distance 200 that opens `earth`. Earth contains a transparent `xxs` Moon spot at distance 160. Earth and Moon start at angle 160°.
3. **Controls**: a medium button at 135°/170 toggles play/pause; a medium knob at 45°/170 sets speed `{ qty: 1, unit: 'x', min: 1, max: 5 }`; a medium button at 225°/170 toggles percentage sizing. Earth takes 10 seconds per orbit at speed 1; Moon takes 7 seconds. Hovering Earth pauses Earth for selection.
4. **Sun profile**: transparent `xxl` view showing the original Sun asset; an external information panel appears after 1.5 seconds.
5. **Earth profile**: transparent `xxl` Earth view with a medium Moon spot at distance 160, moving on a 7-second orbit and pausing on hover. That spot opens `moon`; an external information panel describes Earth.
6. **Moon profile**: transparent `xxl` Moon view plus external information panel.
7. **Docs**: `xl` view with an 8 px border and a list of five labeled small buttons for Guide, Tutorial, API, Examples, and Repo, each at distance 60.

The surrounding page is white and sparse, with view-dependent title/subtitle, a small version marker, optional translucent facts panel, and a short bottom tip. The library’s default black theme is distinct from this demo’s white-theme configuration and forced white canvas background. The original page uses Google Sans and Font Awesome imports; those external dependencies are presentation choices, not requirements for the new library.

The original Moon animation in the main demo keeps running while Earth is paused, and animation scheduling can leak across lifecycle changes. Preserve the intended nested moving system, but make pause, speed changes, reduced motion, and teardown predictable. `src/demo/state/index.js` contains unrelated unused reactive state; it is not part of this demo's public behavior.

## Original-to-new review checklist

Reviewed against the reconstruction through source inspection, measured browser tests, and visual checks. See `tests/` for repeatable coverage. Desktop, tablet, mobile viewports, actual touch input, DPR 2, and reduced motion were exercised in Chromium, Firefox, and WebKit; browser/OS zoom combinations are not exhaustively covered.

- [x] All five original public tags work with normal HTML and ES modules, without Vue or a framework runtime.
- [x] Orbit performs radial positioning; Zumly performs spot-origin navigation and back navigation.
- [x] The canvas can fill the viewport or embed in a sized host; multiple canvases remain independent.
- [x] Angles, parent-radius distance, zero distance, nested spots, and every size alias preserve their original meaning.
- [x] Views support content, image, media, and extensions; spots support content, image, and nested extensions; image attributes take precedence predictably.
- [x] Navigation targets and ordinary buttons have separate, useful behavior; nested activation reaches the selected target once.
- [x] Forward/back history, repeated view names, destination parameters, and return-to-root behavior work at several levels of nesting.
- [x] Background navigation ignores active controls; inactive history views cannot intercept interaction or keyboard focus.
- [x] Progress is numeric, bounded, and visible; quantity zero and numeric label zero render correctly.
- [x] Knobs support mouse, touch, keyboard, min/max, fractional values where allowed, and external value changes without integer truncation.
- [x] Long circular content has a working arc scrollbar; square content scrolls normally; new or resized content updates overflow detection.
- [x] Radial lists preserve authored item content, even spacing, top origin, single-item centering, and lower-arc pagination.
- [x] Empty lists, changed items, invalid page sizes, and out-of-range page indices behave safely; lists do not share page state.
- [x] Dialogs support normal content and timed completion, visible progress, consumer-controlled closing, and timer cleanup.
- [x] Ten original palettes, four modes, custom CSS colors, status classes, and circle/square selection remain available.
- [x] The view ring, spot ring, pulse, outside labels, clipped imagery, and receding view context retain the original visual identity.
- [x] Layout remains centered and usable on mobile and desktop, after container resizing, and at a non-default device pixel ratio (DPR 2).
- [x] Pointer and keyboard behavior is accessible; motion respects reduced-motion preferences; focus stays in the active view.
- [x] Disconnection/destroy removes listeners, observers, timers, animations, and engine hooks.
- [x] Importing the package in a server-rendering environment does not require `window`, `document`, or `HTMLElement` at module evaluation.
- [x] The Sun/Earth/Moon example exercises actual nesting, zoom, back, motion, pause, and speed; component examples cover lists, progress, dialogs, scrolling, and themes.
- [x] Package documentation distinguishes preserved original behavior, intentionally corrected defects, and new integration syntax.

Avoid copying the original global singleton, hardcoded DOM IDs, missing cleanup, pointer-only controls, fragile route parsing (`{ name }` without params throws), hidden zero values, inconsistent square handling, incomplete progress object type, or leaked timer/animation behavior. Those were implementation limitations, not Zircle's identity.
