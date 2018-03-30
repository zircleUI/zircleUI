<p align="center">
  <a href="http://zircle.io">
    <img src="docs/_images/logo-bold.svg" width="150">
  </a>
</p>

<p align="center">
  A lightweight front-end library for developing zoomable user interfaces. 
[![Twitter](https://img.shields.io/twitter/url/https/github.com/zircleUI/zircleUI.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FzircleUI%2FzircleUI)

</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zircle"><img src="https://img.shields.io/npm/v/zircle.svg"></a>
  <a href="https://vuejs.org/"><img alt="npm" src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"></a>
  <a href="https://travis-ci.org/zircleUI/zircleUI"><img alt="Build Status" src="https://travis-ci.org/zircleUI/zircleUI.svg?branch=master"></a>
</p>

## What is Zircle UI?

**Zircle UI** is a circular zooming user interface library based on Vue.js. It mixes two principles: **circular shapes** and **zooming navigation** in the aim of strengthening each other and create a good user experience.

### Main features
-   Zooming navigation up to 6 level of depth.
-   It works well on mobile devices and big screens as it is responsive.
-   It comes with a minimal set of UI components to build your app.
-   It is possible to customize themes and styles to fit your needs. 

> **Note:** Waiting Vue-CLI 3 to be ready for production. Please check out the Zircle´s dev branch since many changes are being made under the hood:
> 1. Optimize, modify, merge or delete some in-built components.
> 2. Optmize code for maintainbility.
> 3. Add unit tests based on Jest.
> 4. Add debug mode for development.
> 5. Optimize zircle state store. Only actions will be exposed.
> 6. Repack zircle with vueCLI in order to be more dev friendly.
> For those reasons, the next release will have some breaking changes.

## Documentation
To check out live examples and docs, visit http://zircle.io

## Installation
There are several ways to install zircle UI according your needs:

### Direct download 
* Download Zircle from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist)

### Content delivery networks (CDN)

* Include https://unpkg.com/zircle in your project with ```<script>``` tag. With CDN you will have the latest version of Zircle as soon as it is published to npm. You can also browse the source of the npm package at https://unpkg.com/zircle/ 

### NPM
NPM is the recommended installation method of zircle if you are building medium to large scale applications with Vue. 

```bash 
npm install zircle --save
```

> **Note**: When you install Zircle in a fresh project, Vue will also be installed since is a dependency of Zircle. On the other hand, you can install Zircle after you have started a project based on Vue. 

## License
[MIT](http://opensource.org/licenses/MIT)
