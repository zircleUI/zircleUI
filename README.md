<p align="center">
  <a href="http://zircle.io">
    <img src="https://raw.githubusercontent.com/zircleUI/docs/gh-pages/zircle-ui-blue.png" width="200">
  </a>
</p>

<p align="center">
  A frontend library to develop zoomable user interfaces.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zircle"><img src="https://img.shields.io/npm/v/zircle.svg"></a>
  <a href="https://vuejs.org/"><img alt="npm" src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"></a>
  <a href="https://travis-ci.org/zircleUI/zircleUI"><img alt="Build Status" src="https://travis-ci.org/zircleUI/zircleUI.svg?branch=master"></a>
  <a href="https://codeclimate.com/github/zircleUI/zircleUI/maintainability"><img src="https://api.codeclimate.com/v1/badges/bfcc880f5084f9e828ed/maintainability" /></a>
</p>

## What is zircle-ui?

**Zircle-ui** is an experimental frontend library to develop [zoomable user interfaces (ZUI)](https://en.wikipedia.org/wiki/Zooming_user_interface). It is based on [vue.js](https://vuejs.org/) and JavaScript and comes with a set of components to create unconventional user interfaces.

<img src="https://raw.githubusercontent.com/zircleUI/docs/gh-pages/final.gif" width="100%" style="border-radius: 6px;" alt="demo">

## Features

- **Zoomable UI/UX:** Enjoy a different UI/UX with the built-in zoomable navigation.

- **Circles everywhere:** Breaking away from the conventional UI with a circular UI Kit.

- **Responsive:** zircle-ui works pretty well on mobile devices and big screens. 

- **Customizable themes:** Aren't the integrated color themes enough? No problem, it is easy to create new ones.

- **Zero-conf routes:** Using Vue-router? Let **zircle-ui** handles the routes for you.

## When to use zircle-ui?

You can try **zircle-ui** to develop a wide range of applications, such as: dashboards, health/fitness trackers, IOT hubs or controllers, contact management, information and entertainment, interactive menus, etc.

In general, using **zircle-ui** should be fine if your application is highly interactive and you need to intuitively view and control information without loosing the user’s attention. 

## About zircle-ui
**Zircle-ui** is the first [Open Source Project](https://opensource.guide/starting-a-project/) I've made and it was possible thanks to the Open Source community, specially the [Vue](https://vuejs.org) community. In retribution, I've created a project of the highest quality I could within my limitations since I'm not a professional developer. 

**Zircle-ui** intends to promote approach in the universe of UIs. My main motivation is believing there is room for a new UI/UX not constrained to grid layouts or to squared shapes. 

**Zircle-ui** was inspired by the idea underneath some really awesome projects and articles like [prezi](https://www.prezi.com), [impress.js](https://github.com/impress/impress.js), [tizen](https://www.tizen.org/), [zoomooz](http://jaukia.github.io/zoomooz/), [creativebloq's article](https://www.creativebloq.com/create-zoomable-user-interface-css-transforms-9114269), [google maps](http://maps.google.com), [bootstrap](https://getbootstrap.com/), [UIKit](https://getuikit.com/) and [bulma](https://bulma.io) among others. 

---
## Table of contents
- [Status](#status-beta)
- [Documentation, examples and tutorial](#documentation-examples-and-tutorial)
- [Installation](#installation)
  * [Direct download](#--direct-download)
  * [Content delivery networks (CDN)](#--content-delivery-networks-cdn)
  * [NPM or Yarn](#--npm-or-yarn)
- [Quick Start](#quick-start)
  * [Code Sandbox](#--code-sandbox)
  * [Browser](#--browser)
  * [Single File Components and vue-cli](#--single-file-components-and-vue-cli)
- [Contributing](#contributing)
- [License](#license)

---

## Status: 
Despite **zircle-ui** could be considered **stable**, it will remains as beta for a while because I would like to hear feedbacks regarding its usability.

## Documentation, examples and tutorial
Please checkout [**zircle.io**](http://zircle.io) to learn how to use **zircle-ui**. For early **zircle-ui** users a **easy-to-follow migration guide** [is available here](https://zircleui.github.io/docs/guide/migration.html)

## Installation

### - Direct download 
Just download **zircle-ui** from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist). You need to download the zircle.umd.js or the zircle.umd.min.js file along with the zircle.css file.

### - Content delivery networks (CDN)
Include `https://unpkg.com/zircle` in your project with `<script>` tag. With CDN you will have the latest version of **zircle-ui** as soon as it is published to NPM. You can also browse the source of the npm package at [https://unpkg.com/zircle/](https://unpkg.com/zircle/) 

### - NPM or Yarn
NPM or Yarn are the recommended installation method for **zircle-ui**, if you are building medium to large scale applications. 

Create a project folder and inside it run:

```bash 
npm install zircle
# OR
yarn add zircle
```

> - [Install Vue.js](https://vuejs.org/v2/guide/installation.html) before **zircle-ui**.
> - For small applications or prototyping you can directly use **zircle-ui** into a browser and for more complex apps you can use **zircle-ui** with [Single File Components (SFC)](https://vuejs.org/v2/guide/single-file-components.html). 


## Quick Start
There are several options to setup and start using **zircle-ui**.

### - Code Sandbox 
The easiest way to try and start using **zircle-ui** is using [JSFiddle](https://jsfiddle.net/tinchox5/37mr5324/) or [Codepen](https://codepen.io/zircle/pen/ypZdWZ). For **zircle-ui** projects based on vue-cli 3 you can try [CodeSandbox](https://codesandbox.io/s/y26p3q79k9)

### - Browser
After you have installed **zicle ui** using [direct download](#--direct-download) or [CDN](#--content-delivery-networks-cdn), the following starter template creates a Vue Instance and provides `<z-canvas>` component to start the development of your **zircle-ui** application.

```html
<!DOCTYPE html>
<html>
  <head>
  <!-- Vue.js -->
  <script type="text/javascript" src="https://unpkg.com/vue"></script>
 
  <!-- Zircle from CDN-->
  <script type="text/javascript" src="https://unpkg.com/zircle"></script>
  <link href="https://unpkg.com/zircle/dist/zircle.css" rel="stylesheet">

  </head>
  <body>
  <div id="app">
    <z-canvas :views="$options.components"></z-canvas>
  </div>

  <script>
    const home = {
      template: `<z-view> Hello World! </z-view>`
    }
    new Vue({
      el: '#app',
      components: {
        home
      },
      mounted () {
        this.$zircle.setView('home')
      }
    })
  </script>
  </body>
</html>
```

### - Single File Components and vue-cli
As Vue documentation explains, with the previous setup you can work very well for small to medium-sized projects. However, in more complex projects it is better to use [Single File Components (SFC)](https://vuejs.org/v2/guide/single-file-components.html).

Vue-cli is a powerful tool to develop complex projects. So, after you have installed and run vue-cli as it is described in the [official Vue cli docs](https://cli.vuejs.org/guide/installation.html), you can install **zircle-ui** with [NPM or Yarn](#--npm-or-yarn) and add the following code to your vue-cli project:

In the `main.js` file add this code:
```js{3-5}
import Vue from 'vue'
import App from './App'
import zircle from 'zircle'
import 'zircle/dist/zircle.css'
Vue.use(zircle)
new Vue({
  render: h => h(App)
}).$mount('#app')
```

In the `App.vue` file add this code:
```vue
<template>
  <div id="app">
    <z-canvas :views="$options.components"></z-canvas>
  </div>
</template>

<script>
  import home from './components/home'
  export default {
    components: {
      home
    },
    mounted () {
      this.$zircle.setView('home')
    }
  }
</script>
```

Create the `home.vue` view in the **/components** folder:
```vue
<template>
  <z-view>
    This screen was zirclelized!
  </z-view>
</template>
```

## Contributing
Many things could be improved and enriched with you collaboration no matter if you are a developer or not. [Here you will find](https://zircleui.github.io/docs/contribute/) some guidelines for inspiration.

## Dedication
In memory of my dad Néstor

## License
[MIT Licensed | Copyright © 2017 - present | Juan Martín Muda](https://raw.githubusercontent.com/zircleUI/zircleUI/master/LICENSE)
