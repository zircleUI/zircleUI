# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.3](https://github.com/zircleUI/zircleUI/compare/v1.5.2...v1.5.3) (2022-08-27)


### Features

* **state.js:** use a common initialState for Vue and resetConfig method ([4cec187](https://github.com/zircleUI/zircleUI/commit/4cec1872526eb0c80e9950c982acb6c6aa2d32c1))


### Bug Fixes

* **resetConfig:** set state's data property instead of state directly ([7ac7584](https://github.com/zircleUI/zircleUI/commit/7ac75843bb06aa4208bd8aae2728ec6dfecb27d8))
* **resetConfig:** set value for each prop in state and copy it instead of assign directly ([2a7a989](https://github.com/zircleUI/zircleUI/commit/2a7a989e76c6ae2a96365b0cccabf39eb998c9a4))

### [1.5.2](https://github.com/zircleUI/zircleUI/compare/v1.5.1...v1.5.2) (2022-08-26)

### [1.5.1](https://github.com/zircleUI/zircleUI/compare/v1.5.0...v1.5.1) (2022-08-25)


### Bug Fixes

* **z-list:** fix z-pagination distance in z-list using percentage instead of pixels ([6de3f16](https://github.com/zircleUI/zircleUI/commit/6de3f16435ed59a43061bcdd5dd8dba47906b6e9))

## [1.5.0](https://github.com/zircleUI/zircleUI/compare/v1.4.0...v1.5.0) (2022-08-23)


### Features

* **demo:** add button to switch usePercentSizes in demo ([c321800](https://github.com/zircleUI/zircleUI/commit/c3218008a21b28b4ae06097f451339b8c7ea9dd9))
* **percent-sizes:** allow using percent sizes thanks to new usePercentSizes prop and rename "getDimensions" method by "updateDiameters" ([4f9ff0e](https://github.com/zircleUI/zircleUI/commit/4f9ff0e23d0f40668ead3138222a140cadfe51f0))


### Bug Fixes

* avoid decimals on dinamic percent sizes ([21249aa](https://github.com/zircleUI/zircleUI/commit/21249aa6834b744bc47ff1b8c2d1d174eb78a38b))
* **config:** add management of percentSizes and minSizesInPixels in config method ([5b72f64](https://github.com/zircleUI/zircleUI/commit/5b72f6490bb531cdad9da1b52fc2f9ed6e168b62))
* **demo:** remove forgotten line in earth component ([2a2d141](https://github.com/zircleUI/zircleUI/commit/2a2d14162a56437549748d71ad9fc65398e2e43a))
* **devicePixelRatio:** add updateDiametersDependsOnPixelRatio method to fix positions issues link to browsers zoom and OS scale ([6f48ddc](https://github.com/zircleUI/zircleUI/commit/6f48ddc48a152e6b596b67dfd43685f4b422b550))
* **earth:** rename paused prop by isRunning ([1bb5fa9](https://github.com/zircleUI/zircleUI/commit/1bb5fa90df757701b74abfa182e8ae4ba5357fd3))
* position bug using percentSizes ([62c7c7c](https://github.com/zircleUI/zircleUI/commit/62c7c7cc211d8c371bac251ee0687cc5932143d3))
* re add getState() ([d2455b5](https://github.com/zircleUI/zircleUI/commit/d2455b5018d6f73ef74c146b517a0d6d8fe8807c))
* remove static values ([ca0a90b](https://github.com/zircleUI/zircleUI/commit/ca0a90bb6a7def24eaa4caafed248a11fcdc7518))
* **responsiveness:** add values in pixelsGapByPixelRatio constant ([5d7ed83](https://github.com/zircleUI/zircleUI/commit/5d7ed83da88ed9a324285fa9db3f1b014cf7824e))
* **updateDiametersInPercent:** verify container before use it ([d4335b8](https://github.com/zircleUI/zircleUI/commit/d4335b841b922134e353377097a64d6eaa88b027))
* **zoom:** adapt body zoom to pixel ratio in order to fix positions issues due to OS display scale ([1969a25](https://github.com/zircleUI/zircleUI/commit/1969a25e5a391960227fb009ff8c2f86c0a64319))

## [1.4.0](https://github.com/zircleUI/zircleUI/compare/v1.4.0-rc.0...v1.4.0) (2022-08-15)


### Features

* 🎸 add some features of z-view to z-dialog ([3508932](https://github.com/zircleUI/zircleUI/commit/350893250ccff91e2cf070e520e142b988c49f8b)), closes [#30](https://github.com/zircleUI/zircleUI/issues/30)
* **app:** add reset config action to reinitialize all parameters ([0a25f34](https://github.com/zircleUI/zircleUI/commit/0a25f34a0616a2e27d77b5702507c7db43e6699e))
* demo finished ([b798ecd](https://github.com/zircleUI/zircleUI/commit/b798ecdcc1509ba216649b3ec8837d87dfc7b6d3))
* **history:** add uniqueKey property when pushing a new view in history ([9bb51e3](https://github.com/zircleUI/zircleUI/commit/9bb51e379dffdfdb6d262e1d9d2a4cb9179982d3))
* improve demo ([1876aee](https://github.com/zircleUI/zircleUI/commit/1876aeedf3296eedc175c28911240d820325208f))
* **responsiveness:** use minSizesInPixels in getDimensions method in order to have a min size on each circle ([55549c6](https://github.com/zircleUI/zircleUI/commit/55549c6b892afdb6aee2b5eeb9e68e37ab38480e))
* **store:** add minSizesInPixels property in state.js ([f450a09](https://github.com/zircleUI/zircleUI/commit/f450a090e9af74b2d1c44262e2059f69ac7fdd3b))
* **store:** add utils file with createUniqueKey function ([04c2521](https://github.com/zircleUI/zircleUI/commit/04c2521d58110f0a0279ea21f740738b1341dcb0))


### Bug Fixes

* 🐛 Initial sizes that weren't display ok ([986b3eb](https://github.com/zircleUI/zircleUI/commit/986b3eb06cd0c23e74f78c3c9cac37d63714ca19)), closes [#29](https://github.com/zircleUI/zircleUI/issues/29)
* add curly brace ([12e414a](https://github.com/zircleUI/zircleUI/commit/12e414a5457fe2fd32d0b34d3e1d6d7fc653b04c))
* change key index ([5646dc5](https://github.com/zircleUI/zircleUI/commit/5646dc5a4fd5e912683f3501fae2134880c2f1ff))
* cursor ([d9b1699](https://github.com/zircleUI/zircleUI/commit/d9b1699163e0ddd23e52b9dc8019d6d4775d6a01))
* default pagination distance ([5039c4e](https://github.com/zircleUI/zircleUI/commit/5039c4ef425660de336070700dc82f4ea085f95d))
* delete firefox references ([d9d82e9](https://github.com/zircleUI/zircleUI/commit/d9d82e9c90aab3ff85e2fb8204410d174573d772))
* distance property ([27a0d83](https://github.com/zircleUI/zircleUI/commit/27a0d83eeb2d3f0738721c127a8b9f839c071eae))
* downgrade for vue2 implementation ([fc71c28](https://github.com/zircleUI/zircleUI/commit/fc71c28f966a56ea1d64710ab804314d51c64697))
* event propagation ([db5a3ce](https://github.com/zircleUI/zircleUI/commit/db5a3ce7ec3f7316517cd72e075b02368773e025))
* event propagation on nested components ([d63e513](https://github.com/zircleUI/zircleUI/commit/d63e513bcbbcc75183b543208308460afb85b402))
* image slot size ([62daf15](https://github.com/zircleUI/zircleUI/commit/62daf15407b9a69a4d4f5d8fdf03250bda713a3b))
* **jest:** configure @babel/eslint-parser (to replace the deprecated babel-eslint package) ([2741520](https://github.com/zircleUI/zircleUI/commit/2741520c809627568427374152cccf6545f384f6))
* lint warn ([edb53e2](https://github.com/zircleUI/zircleUI/commit/edb53e26e91555edd08069aa92fe51cee6921cd5))
* **navigation:** verify toView fromSpot position before use it ([8f7b280](https://github.com/zircleUI/zircleUI/commit/8f7b280655f06a3a980be5cde72cf7259cccf758))
* **navigation:** when setting a new view, use default value of position if scale is 0 ([c086107](https://github.com/zircleUI/zircleUI/commit/c086107274e7f69a58f77099aa7d4f198d39a95d))
* pagination distance ([7286d16](https://github.com/zircleUI/zircleUI/commit/7286d16a9f7cbba4e99bcd0d1863078d3f00423d))
* remove watch qty prop ([cda1f5c](https://github.com/zircleUI/zircleUI/commit/cda1f5c2a4b53e11719960f07274f06ca1064340))
* resp ([2d266c7](https://github.com/zircleUI/zircleUI/commit/2d266c7f8de6ec8725de6d83a91295da6febdd97))
* **retrieveViewName:** correctly verify pos parameter ([60a805d](https://github.com/zircleUI/zircleUI/commit/60a805d18b55548fc454f6f0686c9232057ca563))
* shape and scroll behaivour ([21db220](https://github.com/zircleUI/zircleUI/commit/21db2209e5dd575601b6c4212ecca4bc11fa361c))
* **state:** remove extra brace ([e357677](https://github.com/zircleUI/zircleUI/commit/e357677dd3e4b7600454f4d7e406eb19c4d756e6))
* WIP position ([f2c8344](https://github.com/zircleUI/zircleUI/commit/f2c8344b958ea09462d364e9ed4c2bc2dcf0b3c0))
* z-knob bind prop ([f404fda](https://github.com/zircleUI/zircleUI/commit/f404fda055fada53d553a96560b7232eef85d006))
* z-pagination click native ([f7394db](https://github.com/zircleUI/zircleUI/commit/f7394db2812ea75549aa223b6e4fe9a83ecfe6f1))
* zoom levels and element position ([ae524bd](https://github.com/zircleUI/zircleUI/commit/ae524bd7c148408cee437047847ab410e7874ac9))
* zoom out ([f9c11aa](https://github.com/zircleUI/zircleUI/commit/f9c11aabc3f115057ce4800b7e278db30d70e213))

# [1.4.0-rc.1](https://github.com/zircleui/zircleUI/compare/v1.4.0-rc.0...v1.4.0-rc.1) (2019-04-25)


### Bug Fixes

* 🐛 Initial sizes that weren't display ok ([986b3eb](https://github.com/zircleui/zircleUI/commit/986b3eb)), closes [#29](https://github.com/zircleui/zircleUI/issues/29)


### Features

* 🎸 add some features of z-view to z-dialog ([3508932](https://github.com/zircleui/zircleUI/commit/3508932)), closes [#30](https://github.com/zircleui/zircleUI/issues/30)



# [1.4.0-rc.0](https://github.com/zircleui/zircleUI/compare/v1.4.0-beta.2...v1.4.0-rc.0) (2019-04-25)

* 🐛 add nextTick to inform initial z-canvas width ([3bc9ad8](https://github.com/zircleui/zircleUI/commit/3bc9ad8)), closes [#28](https://github.com/zircleui/zircleUI/issues/28) [#29](https://github.com/zircleui/zircleUI/issues/29)

<a name="1.4.0-beta.3"></a>
# [1.4.0-beta.3](https://github.com/zircleui/zircleUI/compare/v1.4.0-beta.2...v1.4.0-beta.3) (2019-04-22)


### Bug Fixes

* 🐛 Initial sizes that weren't display ok ([986b3eb](https://github.com/zircleui/zircleUI/commit/986b3eb)), closes [#29](https://github.com/zircleui/zircleUI/issues/29)


<a name="1.4.0-beta.2"></a>
# [1.4.0-beta.2](https://github.com/zircleui/zircleUI/compare/v1.4.0-beta.1...v1.4.0-beta.2) (2019-04-22)


### Bug Fixes

* 🐛 Initial sizes ([fff2092](https://github.com/zircleui/zircleUI/commit/fff2092)), closes [#29](https://github.com/zircleui/zircleUI/issues/29)



<a name="1.4.0-beta.1"></a>
# [1.4.0-beta.1](https://github.com/zircleui/zircleUI/compare/v1.4.0-beta.0...v1.4.0-beta.1) (2019-04-22)



<a name="1.4.0-beta.0"></a>
# [1.4.0-beta.0](https://github.com/zircleui/zircleUI/compare/v1.2.5...v1.4.0-beta.0) (2019-04-21)


### Bug Fixes

* 🐛 hide z-scroll on squared shapes ([f7272e7](https://github.com/zircleui/zircleUI/commit/f7272e7)), closes [#23](https://github.com/zircleui/zircleUI/issues/23)


### Features

* 🎸 Add circle or square shapes to some components ([a852f28](https://github.com/zircleui/zircleUI/commit/a852f28)), closes [#23](https://github.com/zircleui/zircleUI/issues/23)
* 🎸 Fluid components size based on the size of z-canvas ([a3df60e](https://github.com/zircleui/zircleUI/commit/a3df60e)), closes [#28](https://github.com/zircleui/zircleUI/issues/28) [#29](https://github.com/zircleui/zircleUI/issues/29)



<a name="1.3.0"></a>
## [1.3.0](https://github.com/zircleui/zircleUI/compare/v1.2.1...v1.3.0) (2018-12-21)
* 🎸 Experimental Feature (WIP): add squared shapes ([f9d7bc0](https://github.com/zircleui/zircleUI/commit/f9d7bc0))

* Thanks @alextappin !!

<a name="1.2.5"></a>
## [1.2.5](https://github.com/zircleui/zircleUI/compare/v1.2.4...v1.2.5) (2019-03-14)


### Bug Fixes

* 🐛 retrieve params when zoom into a new view ([7211174](https://github.com/zircleui/zircleUI/commit/7211174)), closes [#26](https://github.com/zircleui/zircleUI/issues/26)


<a name="1.2.4"></a>
## [1.2.4](https://github.com/zircleui/zircleUI/compare/v1.2.3...v1.2.4) (2019-01-29)


### Bug Fixes

* 🐛 avoid CSS conflicts ([3c0e4d6](https://github.com/zircleui/zircleUI/commit/3c0e4d6)), closes [#24](https://github.com/zircleui/zircleUI/issues/24)


<a name="1.2.3"></a>
## [1.2.3](https://github.com/zircleui/zircleUI/compare/v1.2.2...v1.2.3) (2019-01-08)

### Features

* 🎸 improve usability of vue-router ([93cf44a](https://github.com/zircleui/zircleUI/commit/93cf44a)), closes [#19](https://github.com/zircleui/zircleUI/issues/19)


### BREAKING CHANGES

* You have to define the routes as usualy do with vue-router and use `named routes`
* You don't have to use `setView` to define the initial view as now is handled by Vue-router.
* There is no need to add the components in `$options.components`.
* More information and guides on [zircle docs](https://zircleui.github.io/docs/guide/using-vue-router.html)


<a name="1.2.2"></a>
## [1.2.2](https://github.com/zircleui/zircleUI/compare/v1.2.1...v1.2.2) (2019-01-06)
### Chores
* Update package.json


<a name="1.2.1"></a>
## [1.2.1](https://github.com/zircleui/zircleUI/compare/v1.2.0...v1.2.1) (2018-12-11)


### Bug Fixes

* 🐛 view size on mixed mode ([9dc5ca3](https://github.com/zircleui/zircleUI/commit/9dc5ca3)), closes [#21](https://github.com/zircleui/zircleUI/issues/21)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/zircleui/zircleUI/compare/v1.1.3...v1.2.0) (2018-12-05)


### Features

* 🎸 avoid using suffix for views with router enabled ([8127aa5](https://github.com/zircleui/zircleUI/commit/8127aa5)), closes [#19](https://github.com/zircleui/zircleUI/issues/19)



<a name="1.1.3"></a>
## [1.1.3](https://github.com/zircleui/zircleUI/compare/v1.1.2...v1.1.3) (2018-11-13)


### Bug Fixes

* 🐛 add Number type in label property ([424ac5e](https://github.com/zircleui/zircleUI/commit/424ac5e))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/zircleui/zircleUI/compare/v1.1.1...v1.1.2) (2018-11-08)


### Bug Fixes

* 🐛 avoid show title z-list on mouseover ([3f260d6](https://github.com/zircleui/zircleUI/commit/3f260d6))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/zircleui/zircleUI/compare/v1.1.0...v1.1.1) (2018-11-03)


### Bug Fixes

* 🐛 remove duplicate slot 'image' ([b38ef1d](https://github.com/zircleui/zircleUI/commit/b38ef1d)), closes [#18](https://github.com/zircleui/zircleUI/issues/18)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/zircleui/zircleUI/compare/v1.0.2...v1.1.0) (2018-10-17)


### Bug Fixes

* 🐛 Add v-bind key in z-list ([f289982](https://github.com/zircleui/zircleUI/commit/f289982))
* 🐛 Demo: fix view name reference and use z-list ([35e7a94](https://github.com/zircleui/zircleUI/commit/35e7a94))


### Features

* 🎸 Add .toView() action ([ac14b35](https://github.com/zircleui/zircleUI/commit/ac14b35)), closes [#16](https://github.com/zircleUI/zircleUI/issues/16)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/zircleui/zircleUI/compare/v1.0.1...v1.0.2) (2018-10-16)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/zircleui/zircleUI/compare/v1.0.0...v1.0.1) (2018-08-17)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/zircleui/zircleUI/compare/v0.9.1...v1.0.0) (2018-08-17)


### Bug Fixes

* 🐛 allow z-view scroll content zoom lvl > 1; show img bkg ([4c54565](https://github.com/zircleui/zircleUI/commit/4c54565))
* 🐛 transition animation ([8e4a263](https://github.com/zircleui/zircleUI/commit/8e4a263))


### Tests

* 💍 Update snapshot z-view ([1854e6a](https://github.com/zircleui/zircleUI/commit/1854e6a))


<a name="0.9.1"></a>
## [0.9.1](https://github.com/zircleui/zircleUI/compare/v0.9.0...v0.9.1) (2018-08-14)
### Chores
- Docs: update code sanboxes links


<a name="0.9.0"></a>
## [0.9.0](https://github.com/zircleui/zircleUI/compare/v0.3.3...v0.9.0) (2018-08-13)
### Changes
- With the release of **zircle-ui v0.9.0** many internal and external things have changed. As a result **zircle-ui** is now more intuitive and easy to use.

- Following [**this brief migration guide**](https://zircleui.github.io/docs/guide/migration.html) it will be easy for you to adatp your project to the new version of **zircle-ui**.

## [0.3.3] - 2018-01-31
### Fixes
- When using using vue-router, the initial configuration of the automatic routes are now case insensitive to avoid case errors.

## [0.3.2] - 2018-01-25
### Enhancement
- Now zircle is using https://github.com/julon/vue-cli-template-library that allows embed CSS in the JS by default. So, there is just one file to use zircle.js or zircle.min.js. Thanks https://github.com/julon
- Improved documentation. 

### Fixes
- Include latest src code into @npm release.

## [0.3.1] - 2018-01-14
### Fixes
- Fix build for producction error.

## [0.3.0] - 2018-01-14
### Enhancements
- Recursive navigation that allows reuse the same view again and again.
- Better responsiveness when resize viewport.
- Vue-router auto configuration. You don't need to define routes anymore.

### Fixes
- z-content position. Now it is centered. Thank you @zeratul1

## [0.2.2] to [0.2.4] - 2017-12-10
### Changed
- Add props (label, image and color) to `z-item`.

## [0.2.1] - 2017-12-10
### Fixes
- Fix again `z-list`component to allow customize item template. Now is it possible to add custom labels, background color and background images. Check docs # `z-list` and examples.

### Changed
- Zooming navigation to nine levels of depth.
- Remove `z-pagination` 

## [0.2.0] - 2017-11-23
### Fixes
- Fix `z-list`component to allow customize item template.
- Remove lastView because is useless.

### Changed
- Minor optimizations
- Remove z-style and embed css into `z-canvas`

## [0.1.9] - 2017-11-14
### Enhancements
- Smoother transitions thanks to improve function for positioning elements `point()`

### Changed
- Use ease-in-out for transitions. Slow start and slow end to improve UX. Thanks [Seylerius](https://news.ycombinator.com/item?id=15584954)
- Increment to 800ms the transition time.
- Change `z-transition` from `transition` to `transition-group` components.

### Fixes
- Fix a bug with `z-scroll` - circular scrollbar

## [0.1.5] - 2017-11-06
### Enhancements
- View names are case-insensitive [\#3](https://github.com/zircleUI/zircleUI/issues/3)

### Changed
- z-dotnav style [\#2](https://github.com/zircleUI/zircleUI/issues/2)
- Zooming navigation to six levels of depth.

## [0.1.1] - 2017-10-31
### Fixes
- Fix visual scrollbars visual problem on Ffox [\#1](https://github.com/zircleUI/zircleUI/issues/1)
