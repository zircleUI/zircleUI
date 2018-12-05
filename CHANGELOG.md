# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
