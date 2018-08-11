<p align="center">
  <a href="http://zircle.io">
    <img src="https://github.com/zircleUI/docs/blob/gh-pages/zircle-ui-blue.png" width="250">
  </a>
</p>

<p align="center">
  A frontend library to develop zoomable user interfaces.
</p>

> This is the development branch for the next version of Zircle

## What is zircle-ui?

**Zircle-ui** is a frontend library to develop [zoomable user interfaces (ZUI)](https://en.wikipedia.org/wiki/Zooming_user_interface). It is based on [vue.js](https://vuejs.org/) and comes with a set of componentes, such as: buttons, knobs, sliders, scroll bars, dialogues, view controllers and lists.

<img src="https://github.com/zircleUI/docs/blob/gh-pages/final.gif" width="100%" style="border-radius: 6px;" alt="demo">

## Features

- **Zoomable UI/UX** Enjoy a different UI/UX with the built-in zoomable navigation.

- **Circles everywhere** Breaking away from the conventional UI with a circular UI Kit.

- **Responsive** zircle-ui works pretty well on mobile devices and big screens. 

- **Customizable themes** Aren't the integrated color themes enough? No problem, it is easy to create new ones.

- **Zero-conf routes** Using Vue-router? Let **zircle-ui** handles the routes for you.

## When to use zircle-ui?

You can try **zircle-ui** to develop a wide range of applications, such as: dashboards, health/fitness trackers, IOT hubs or controllers, contact management, information and entertainment, interactive menus, etc.

In general, using **zircle-ui** should be fine if your application is highly interactive and you need to intuitively view and control information without loosing the user’s attention. 

## About zircle-ui
**zircle-ui** is the first [Open Source Project](https://opensource.guide/starting-a-project/) I've made and it was possible thanks to the Open Source community, specially the [Vue](https://vuejs.org) community. In retribution, I've crearted a project of the hightest quality I could within my limitations since I'm not a professional developer. 

**Zircle-ui** intends to promote aproach in the universe of UIs. My main motivation is believing there is room for a new UI/UX not constrained to grid layouts or to squared shapes. 

**Zircle-ui** was inspired by the idea underneath some really awesome projects and articles like [prezi](https://www.prezi.com), [impress.js](https://github.com/impress/impress.js), [tizen](https://www.tizen.org/), [zoomooz](http://jaukia.github.io/zoomooz/), [creativebloq's article](https://www.creativebloq.com/create-zoomable-user-interface-css-transforms-9114269), [google maps](http://maps.google.com), [bootstrap](https://getbootstrap.com/), [UIKit](https://getuikit.com/) and [bulma](https://bulma.io) among others. 

*Juan Martín Muda*

## Contributing
Many things could be improved and enriched with you collaboration no matter if you are a developer or not. [Here you will find](http://zircle.io) some guidelines for inspiration.

## Status: Beta
Until reach the version 1.0.0 Zircle will remains as beta. However, since 0.9.0 api changes are unlikely.

## Documentation, examples and tutorial
Please checkout [zircle.io](http://zircle.io) to learn how to use zircle. There are examples and a tutorial for better understaning. For early zircle users a easy-to-follow migration guide [is available here](http://zircle.io)

## Installation

### Direct download 
Just download Zircle from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist) and put the zircle.min.js and the zircle.css in a script tag.

### Content delivery networks (CDN)
Include `https://unpkg.com/zircle` in your project with `<script>` tag. With CDN you will have the latest version of Zircle as soon as it is published to NPM. You can also browse the source of the npm package at [https://unpkg.com/zircle/](https://unpkg.com/zircle/) 

### NPM or Yarn
NPM or Yarn are the recommended installation method of zircle if you are building medium to large scale applications with Vue. 

Create a project folder and inside it run:

```bash 
npm install zircle
# OR
yarn add zircle
```

## Quick start
There are several options to setup and start using Zircle.

### Code Sandbox 
The easiest way to try and start using Zircle is using the [JSFiddle Zircle sandbox](https://jsfiddle.net/tinchox5/37mr5324/) or the [Codepen Zircle sandbox](https://codepen.io/zircle/pen/MExYRv)

For Zircle projects based on Vue-CLI you can try the [CodeSandbox Zircle sandbox](https://codesandbox.io/s/my0ol78l08)

### Browser
After you have installed Zircle using [direct download](#direct-download) or [CDN](#content-delivery-networks-cdn), the following starter template creates a Vue Instance and provides `<z-canvas>` component to start the development of your Zircle application.

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
      template: `<z-view>Hello World!<z-view>`
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

### Single File Components and Vue-CLI
As Vue documentation explains with the previous setup you can work very well for small to medium-sized projects. However, in more complex projects it is better use Single File Components (SFC)](https://vuejs.org/v2/guide/single-file-components.html).

Vue-CLI provides you with an powerful and easy tool to develop complex projects. So, after you have installed and run Vue-CLI as it is described in the [official Vue docs](https://vuejs.org/v2/guide/installation.html#CLI), you can install Zircle with [NPM or Yarn](#package-managers-npm-or-yarn) and add the following code to your vue-CLI project:

In the `main.js` file add this code:
```js
import Vue from 'vue'
import app from './App'
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
  const home = {
    template: `<z-view>Hello World!<z-view>`
  }
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

## License
[MIT](http://opensource.org/licenses/MIT)
