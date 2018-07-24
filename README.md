<p align="center">
  <a href="http://zircle.io">
    <img src="public/zircle-dev.png" width="350">
  </a>
</p>

<p align="center">
  A frontend library for developing zoomable user interfaces.
</p>

> This is the development branch for the next version of Zircle

## Status Beta
Many things may change in the near future. 
- [ ] Wrap zircle with Vue-CLI 3. **WIP** Soon, vue-cli 3 is now RC
- [ ] Make Zircle dev friendly. **WIP** (waiting for vue-cli)
- [ ] Automatic deploy, change log, versioning. **WIP** using commitizen and standar-release
- [ ] Update documentation. **WIP** Almost done. Working on Tutorial
- [X] New doc site with @vuepress (https://zircleui.github.io/docs)
- [X] Write migration guide. ~~Just will be a few breaking changes.~~ **No so few, but improve usability**
- [ ] Publish a dev release. **ASAP**
- [X] Zircle State Management -> Expose state in development mode. 
- [X] Optimize themes maintainig custom variables
- [X] Add SASS and maintain de css separated from the js.
- [X] Add Jest unit tests and snapShoots.
- [X] Eslint components
- [X] Simplify `z-view-manager`
- [X] Improve animation and render performance. Resolve poor performance in Chrome when go back. Now transitions are smooth in Chrome, Firefox and Safari.
- [X] Group similar logs in the zircle's console log events.
- [X] Add `media` slot in `z-panel` to include maps, videos, etc. 
- [X] Allow zircle's apps to be in full mode (as happens currently) or embedded.
- [X] Add possibilty of use properties or slots for image source and labels.
- [X] Rewrite router auto config and routes management
- [X] Fix responsiveness
- [X] Improve SVG styles
- [X] Re write `z-list` component and its user templates.
- [X] Add `label` and `image src` properties to `z-button` `z-panel` `z-range` `z-scale` `z-alert` 
- [X] Improve circular scroll. Disable scroll event on Firefox desktop, but is it possible to use the circular scroll.
- [X] Promote `z-range` to independent component.
- [X] Add micro animations on user events
- [X] Remame some In-built component following Style Guide
- [X] Rewrite position and navigation system
- [X] Rewrite how zircle handle vue-router and views.
- [X] Add debug mode for development.
- [X] Rewrite Zircle State Management. Only actions are exposed.

## License
[MIT](http://opensource.org/licenses/MIT)
