<p align="center">
  <a href="http://zircle.io">
    <img src="docs/_images/logo-bold.svg" width="150">
  </a>
</p>

<p align="center">
  A lightweight front-end library for developing zoomable user interfaces. <a href="https://twitter.com/intent/tweet?text=Wow%21+Checkout+%23ZircleUI%2C+an+Open+Source+project+to+build+Zoomable+User+Interfaces--%3E+&url=https%3A%2F%2Fgithub.com%2FzircleUI%2FzircleUI"><img alt="tweet" src="https://img.shields.io/twitter/url/https/github.com/zircleUI/zircleUI.svg?style=social"></a>

</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zircle"><img src="https://img.shields.io/npm/v/zircle.svg"></a>
  <a href="https://vuejs.org/"><img alt="npm" src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"></a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2FzircleUI%2FzircleUI?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2FzircleUI%2FzircleUI.svg?type=shield"/></a>
  <a href="https://travis-ci.org/zircleUI/zircleUI"><img alt="Build Status" src="https://travis-ci.org/zircleUI/zircleUI.svg?branch=master"></a>
</p>

## What is Zircle UI?

**Zircle UI** is a circular zooming user interface library based on Vue.js. It mixes two principles: **circular shapes** and **zooming navigation** in the aim of strengthening each other and create a good user experience.

### Main features
-   Zooming navigation up to 6 level of depth.
-   It works well on mobile devices and big screens as it is responsive.
-   It comes with a minimal set of UI components to build your app.
-   It is possible to customize themes and styles to fit your needs. 

> **Note:** Waiting Vue-CLI 3 to be ready for production. Please [**check out the Zircle´s dev branch**](https://github.com/zircleUI/zircleUI/tree/dev) since many changes are being made under the hood:

- [ ] Wrap zircle with Vue-CLI 3. Waiting for Vue-CLI to be ready
- [ ] Make Zircle dev friendly. **WIP** (waiting for Vue-CLI and tests)
- [ ] Automatic deploy, change log, versioning. **WIP** using commitizen and standar-release
- [ ] Add Unit testing. **WIP** using jest
- [ ] Update documentation. **WIP** --> [new doc site](https://zircleui.github.io/docs)
- [ ] Write migration guide. Just will be a few breaking changes.
- [ ] Publish a dev release. ASAP
- [ ] Group similar logs in the zircle's console log events. **WIP**
- [ ] Zircle State Management -> Expose state in development mode. **WIP**
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
- [X] Optimize code. --> [Maintainability status in Dev branch](https://codeclimate.com/github/zircleUI/zircleUI/maintainability)
- [X] Rewrite position and navigation system
- [X] Rewrite how zircle handle vue-router and views.
- [X] Add debug mode for development.
- [X] Rewrite Zircle State Management. Only actions are exposed.

## Documentation
To check out live examples and docs, visit http://zircle.io

## Installation

### Direct download 
* Download Zircle from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist)

### Content delivery networks (CDN)

* Include https://unpkg.com/zircle in your project with ```<script>``` tag. With CDN you will have the latest version of Zircle as soon as it is published to npm. You can also browse the source of the npm package at https://unpkg.com/zircle/ 

### NPM
NPM is the recommended installation method of zircle if you are building medium to large scale applications with Vue. 

```bash 
npm install zircle --save
```

## License
[MIT](http://opensource.org/licenses/MIT)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FzircleUI%2FzircleUI.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FzircleUI%2FzircleUI?ref=badge_large)