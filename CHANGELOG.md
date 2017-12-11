# Changelog
All notable changes to this project will be documented in this file.

## [0.2.3] - 2017-12-10
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
