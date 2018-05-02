
# Introduction

## What is Zircle UI?

Zircle UI is a lightweight front-end library for developing zoomable user interfaces. It mixes two principles: **circular shapes** and **zooming navigation** in the aim of strengthening each other and create a good user experience. It is an Open Source project based on Vue.js. 


## Main features
-   Zoomable navigation up to 6 level depth.
-   It works well on mobile devices and big screens as it is responsive.
-   It comes with a minimal set of UI components to build your app.
-   It is possible to customize themes and styles to fit your needs. 

## Quick examples 

### Vue.js Ecosystem

<iframe height='600' scrolling='no' title='Vue.js Ecosystem by Zircle' src='//codepen.io/zircle/embed/LeqKGK/?height=600&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/LeqKGK/'>Vue.js Ecosystem by Zircle</a>
</iframe>

### Counter 
<iframe height='450' scrolling='no' title='Counter by Zircle' src='//codepen.io/zircle/embed/qpgzqz/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/qpgzqz/'>Counter by Zircle</a>
</iframe>

### Zooming slider

<iframe height='450' scrolling='no' title='Zooming Slider by Zircle' src='//codepen.io/zircle/embed/VygJKw/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/VygJKw/'>Zooming Slider by Zircle</a>
</iframe>

## Dependencies
Zircle is a Vue plugin. For this reason, it is recommendable to have some idea of how Vue works. You can try Vue and learn it in http://vuejs.org

> **Information for Vue users**: Zircle UI follows the progressive philosophy of Vue. This implies that for small apps or prototyping you can use Zircle directly into the browser and for more complex apps you can use it with Single Page Applications. For this reason, Zircle works with or without Vue-Router.

# Guide

## Installation
**Options**

### Direct download 
* Download Zircle from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist)

### Content delivery networks (CDN)
* Include https://unpkg.com/zircle in your project with `<script>` tag. With CDN you will have the latest version of Zircle as soon as it is published to NPM. You can also browse the source of the npm package at https://unpkg.com/zircle/ 

### NPM
NPM is the recommended installation method of zircle if you are building medium to large scale applications with Vue. 

```bash 
npm install zircle --save
```

?> **Note**: When you install Zircle in a fresh project, Vue will also be installed since is a dependency of Zircle. On the other hand, you can install Zircle after you have started a project based on Vue. 

## Initial setup and starter templates
There are several options to setup and start using it.

### Sandbox 
The easiest way to try and start using Zircle is using the [JSFiddle Zircle sandbox](https://jsfiddle.net/tinchox5/37mr5324/) or the [Codepen Zircle sandbox](https://codepen.io/zircle/pen/MExYRv)

For Zircle projects based on Vue-CLi you con try the [CodeSandbox Zircle sandbox](https://codesandbox.io/s/my0ol78l08)

### Browser
After you have installed Zircle using direct download or CDN, the following starter template allows you to create a Vue Instance and provides the `<z-canvas>` component to start the development of your Zircle app.

```html
<!DOCTYPE html>
<html>
  <head>
  <!-- Vue.js -->
  <script type="text/javascript" src="https://unpkg.com/vue"></script>
  <!-- Local Zircle lib -->
  <!-- Note: from Zircle 0.3.2 css is embedded into js file. So, it is no longer necesary to include css file -->
  <link href="zircle.min.css" rel="stylesheet">
  <script type="text/javascript" src="zircle.min.js"></script>
  <!-- or Zircle from CDN-->
  <!-- Note: from Zircle 0.3.2 css is embedded into js file. So, it is no longer necesary to include css file -->
  <link href="https://unpkg.com/zircle/dist/zircle.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://unpkg.com/zircle"></script>
  </head>
  <body>
  <div id="app">
    <z-canvas>
      <z-panel view="home">
        {{ msg }}
      </z-panel>
    </z-canvas>
  </div>
  <script>
    new Vue({
      el: '#app',
      data () {
        return {
          msg: 'Hello World!'
        }
      }
    })
  </script>
  </body>
</html>
```

### Single File Components and Vue-CLI
As Vue Documentation explains, with the previous setup you can work very well for small to medium-sized projects. However, in more complex projects, or when your frontend is entirely driven by JavaScript it is better use single-file components with a .vue extension, made possible with build tools such as Webpack or Browserify.

Vue-CLI provides you with an powerful and easy tool to develop complex projects. So, after you installed and run Vue-CLI as it is described in the  [official Vue docs](https://vuejs.org/v2/guide/installation.html#CLI), you can use any of its templates with Zircle. 

Just, install Zircle with NPM and add this code to your vue-CLI project:

**Example using webpack-template**

In the `main.js` file add this code:
```js
import Vue from 'vue'
import app from './App'
import zircle from 'zircle'
<!-- Note: from Zircle 0.3.2 css is embedded into js file. So, it is no longer necesary to import css file -->
import 'zircle/dist/zircle.min.css'
Vue.use(zircle)
new Vue({
  el: '#app',
  components: {
    app
  },
  template: '<app/>'
})
```
In the `App.vue` file add this code:
```vue
<template>
    <z-canvas>
      <z-panel view="home">
        {{ msg }}
      </z-panel>
    </z-canvas>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>
```

?> **Note:** Before start a Zircle project with Vue-CLI you can play online with [CodeSandbox Zircle sandbox](https://codesandbox.io/s/my0ol78l08) based on Vue-CLI

### Vue-Router
You can use Zircle with Vue-Router in any environment (from sandbox to vue-cli). Just follow this tips and examples.

?> Since Zircle 0.3.0 using Vue-Router is simplier and straight forward because Zircle creates the routes automatically.

> When Zircle 0.5.0 arrives `routerHooks()` will be deprecated in favour if `setRouter()`

#### For Browser or online source code playgrounds.

**1. Install Vue-Router.**

Add Vue-Router using a `<script>` tag

```html
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

**2. Setup Zircle and the router.**

Steps:

* Add `<z-view-manager>` component in your html

In the html:

```html
<div id="app">
  <z-canvas>
    <z-view-manager :list='$options.components'></z-view-manager>
  </z-canvas>
</div>
```

* Create some view components.
* Config Vue Router.
* Config Vue Instance.

In the `<script>` that you have the Vue Instance:

```js
// Your view compoments
const foo = {
  template: `<z-panel view="foo">
  Foo View
  <z-scale slot="circles"
  :angle="45"
  gotoview="bar">
  Bar
  <span slot="label">Go to</span>
  </z-scale>
</z-panel>`
}
const bar = {
  template: `<z-panel view="bar">
  Bar View
  </z-panel>`
}
// Vue Router configuration
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/foo'
  }, {
    path: '/foo',
    name: 'foo',
    component: foo
  }, {
    path: '/bar',
    name: 'bar',
    component: bar
  }]
})
//  Zircle and router configuration for Vue instance 
new Vue({
  el: '#app',
  components: {
    foo,
    bar
  },
  router,
  data() {
    return {
      initialView: 'foo',
      enableRouter: true
    }
  },
  mounted() {
    this.$zircleStore.routerHooks(this)
  }
})
```

Check this demo in [JSFiddle](https://jsfiddle.net/tinchox5/g39omwxv/)

?> Since version 0.3.0 Zircle can manage automatically the routes, so the router set up is simplier:

In the `<script>` that you have the Vue Instance:

```js
// Your view compoments
const foo = {
  template: `<z-panel view="foo">
  Foo View
  <z-scale slot="circles"
  :angle="45"
  gotoview="bar">
  Bar
  <span slot="label">Go to</span>
  </z-scale>
</z-panel>`
}
const bar = {
  template: `<z-panel view="bar">
  Bar View
  </z-panel>`
}
// Vue Router configuration
const router = new VueRouter({
})
//  Zircle and router configuration for Vue instance 
new Vue({
  el: '#app',
  components: {
    foo,
    bar
  },
  router,
  data() {
    return {
      initialView: 'foo'
    }
  },
  mounted() {
    this.$zircleStore.setRouter(this)
  }
})
```  

#### For NPM or Vue-CLI

**1. Install Vue-Router in your project.**
```bash 
npm install vue-router
```

?> **Note:** In case using Vue-CLI simply accept to Install Vue-Router in the project generator. Of course, you can install the router later.

In your `main.js` file
```js
import Vue from "vue"
import App from "./App"
import zircle from "zircle"
<!-- Note: from Zircle 0.3.2 css is embedded into js file. So, it is no longer necesary to include css file -->
import "zircle/dist/zircle.min.css"
Vue.use(zircle)

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
})
```

**2. Setup Zircle and the router.**

Steps:

* Add `<z-view-manager>` component in your `<template>`
* Create some view components.
* Config Vue Router.
* Config Vue Instance.

In your `App.vue`
```vue
<template>
    <z-canvas>
          <z-view-manager :list='$options.components'/>
    </z-canvas>
</template>
<script>
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const foo = {
  template: `<z-panel view="foo">
  Foo View
  <z-scale
  slot="circles"
  :angle="45"
  gotoview="bar">
  Bar
  <div slot="label">Go to</div>
  </z-scale>
</z-panel>`
}
const bar = {
  template: `<z-panel view="bar">
  Bar View
  </z-panel>`
}
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/foo'
  }, {
    path: '/foo',
    name: 'foo',
    component: foo
  }, {
    path: '/bar',
    name: 'bar',
    component: bar
  }]
})

export default {
  data () {
    return {
      initialView: 'foo',
      enableRouter: true
    }
  },
  components: {
    foo,
    bar
  },
  router,
  mounted () {
    this.$zircleStore.routerHooks(this) // routerHooks will be deprecated in favour of setRouter()
  }
}
</script>
<style>
</style>
```


Check this example on [CodeSandbox](https://codesandbox.io/s/2x39p49kmn)

?> Since Zircle 0.3.0 using Vue-Router is simplier and straight forward because Zircle creates the routes automatically.

In your `App.vue`
```vue
<template>
    <z-canvas>
          <z-view-manager :list='$options.components'/>
    </z-canvas>
</template>
<script>
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const foo = {
  template: `<z-panel view="foo">
  Foo View
  <z-scale
  slot="circles"
  :angle="45"
  gotoview="bar">
  Bar
  <div slot="label">Go to</div>
  </z-scale>
</z-panel>`
}
const bar = {
  template: `<z-panel view="bar">
  Bar View
  </z-panel>`
}
const router = new Router({
  mode: 'history'
})

export default {
  data () {
    return {
      initialView: 'foo'
    }
  },
  components: {
    foo,
    bar
  },
  router,
  mounted () {
    this.$zircleStore.setRouter(this)
  }
}
</script>
<style>
</style>
```


## Themes and colors
Zircle comes with nine colors and four themes under hood that are built using CSS Variables.

The colors are:
* `.color--light-blue`
* `.color--blue`
* `.color--green`
* `.color--orange`
* `.color--yellow`
* `.color--red`
* `.color--purple`
* `.color--black` (default)
* `.color--gray`

Each color is a CSS class that wraps several CSS variables
```css
.color--red {
  --background-color: #fef8f8;
  --primary-color: #ef3c3b;
  --accent-color: #860c0b;
  --success-color: #7d8d4a;
  --warning-color: #fa7c12;
  --danger-color: #f34138;
}
```

The themes are:
* `.theme--light` for light backgrounds
* `.theme--bold-light` for light backgrounds and filled views
* `.theme--dark` for dark backgrounds (default)
* `.theme--bold-dark`for dark backgrounds and filled views

Each theme is a CSS class that wraps several CSS variables

```css 
.theme--light {
  --background: var(--background-color);
  --primary: var(--primary-color);
  --accent: var(--accent-color);
  --success: var(--success-color);
  --warning: var(--warning-color);
  --danger: var(--danger-color);
  --background-card: var(--background-color);
  --border-card: var(--primary-color);
  --primary-text: var(--primary-color);
}
```


### Setting up Themes ands Colors

One way to set up you prefered theme and color is to put them in `mounted()` 

```js
new Vue({
  el: '#app',
  components: {
    foo,
    bar
  },
  router,
  data() {
    return {
      sharedState: this.$zircleStore.state,
      initialView: 'foo'
    }
  },
  mounted () {
    this.sharedState.theme = 'theme--bold-light'
    this.sharedState.color = 'color--blue'
  }
})
```



### Customize
The easiest way to adapt the themes to your needs is to override the color CSS clases or create a new color names

Check the CSS tab of the following example
<iframe height='600' scrolling='no' title='Themes and Colors Selector by Zircle' src='//codepen.io/zircle/embed/MrLMvB/?height=600&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/MrLMvB/'>Themes and Colors Selector by Zircle</a>
</iframe>


## API

**In-built components:** Zircle provides a minimal set of component to make user interfaces.

### z-canvas

**Description:** This component is essential for Zircle. Your code needs to be inside `z-canvas`.

**Usage:**
```html
<div id="app">
  <z-canvas>
  <!-- your zircle app-->
  </z-canvas>
</div>
```

**Props:**
None

| Slot | Description
| :--- | :--- |
| `default` | Default Vue Slot.

### z-view-manager

**Description:** This component manages the views of your app. It is necesary when you have more than one view. In case you have just one view you can put the view inmediately after `<z-canvas>` and avoid to use `<z-view-manager>`.

**Usage:** Tell `<z-view-manager>` which views has to manage populating `list` prop with the components you defined in the Vue Instance.

```html
<div id="app">
  <z-canvas>
    <z-view-manager :list="$options.compoments" />
  </z-canvas>
</div>
```

```js
const foo = {
  template: `<z-panel view="foo">
  Foo View
  <z-scale
  slot="circles"
  :angle="45"
  gotoview="bar">
  Bar
  </z-scale>
</z-panel>`
}

const bar = {
  template: `<z-panel view="bar">
  Bar View
  </z-panel>`
}

new Vue({
  el: '#app',
  components: {
    foo,
    bar
  },
  mounted () {
    this.$zircleStore.setView('foo')
  }
})
```

Check this [example without Vue-Router](http://jsfiddle.net/tinchox5/umo398sw/) and this [example with Vue-Router](http://jsfiddle.net/tinchox5/g39omwxv/)

**Props**

| Prop | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `list` | Object | undefined | True | Is the list of components defined in the Vue instance: `$options.components`

**Slots:**
None

### z-panel

**Description:** This component is the principal element to define a view. You can have many views in your project and each one with a `<z-panel>`component. Inside it you can nest many others elements such as `<z-scale>`, `<z-button>` or `<z-alert>`

**Usage:**

```html
<z-panel view="foo" color="red" :slider="true" :progress="95">
  <!-- Default slot -->
  Welcome to the Foo view

  <!-- Picture slot -->
  <img slot="picture" src="your/image.jpg" width="100%" height="100%" />

  <!-- Circles slot with single nested element -->
  <z-scale
  slot="circles"
  :angle="45"
  gotoview="bar">
  Bar
  </z-scale>

  <!-- Circles slot with multiple nested elements-->
  <section slot="circles">
    <z-scale
    :angle="45"
    gotoview="bar">
    Bar
    </z-scale>
    <z-button
    :angle="180">
    </z-button>
  </section>
</z-panel>`
```

**Props**

| Prop | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `view` | String, Number | undefined | True | Is the View Name. It needs be the same name of you view component. It is not case sensitive
| `range` | Boolean | False | No | When it is `true` an interactive circular progress range is shown. Usefull to build controls like volume, dimmer, etc
| `slider` | Boolean | False | No | When it is `true` a circular progress bar is shown.
| `progress` | Number | 0 | No | progress works when range or slider are enabled and gives them the initial value

**Mixin**

| Mixin | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `color` | String | primary | False | This mixin gives the color of the `z-panel`. Probably it will be deprecated since you can use style attributes to set you color.

**Slots:**

| Slot | Description
| :--- | :--- |
| `default` | Default Vue Slot. It is used to put any kind of content such as text, icons, etc. If its content is larger than the view container the sub component `<z-scroll>`, that is a circular scrollbar, is activated.
| `picture` | It is used to insert one image as background inside the view container.
| `circles` | It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>` inside the view container.


### z-scale

**Description:** This component is zoomable if you define the `gotoview` prop with the name of other views. Inside it you can nest many others elements such as `<z-scale>`, `<z-button>` or `<z-alert>`

**Usage:**

```html
<z-scale :slider=true
  :angle="45"
  :distance="140"
  size="medium"
  color="green"
  gotoview="bar">
  
  <!-- Default slot -->
  Bar

  <!-- Label slot -->
  <span slot="label">Go to Bar</span>

  <!-- Picture slot -->
  <img slot="picture" src="your/image.jpg" width="100%" height="100%" />

  <!-- Circles slot with single nested element -->
  <z-button
  slot="circles"
  :angle="45">
  Bar
  </z-button>

  <!-- Circles slot with multiple nested elements-->
  <section slot="circles">
    <z-scale
    :angle="45"
    gotoview="bar">
    Bar
    </z-scale>
    <z-button
    :angle="180">
    </z-button>
  </section>
</z-scale>
```

**Props**

| Prop | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `range` | Boolean | False | No | When it is `true` an interactive circular progress range is shown. Usefull to build controls like volume, dimmer, etc
| `slider` | Boolean | False | No | When it is `true` a circular progress bar is shown.
| `progress` | Number | 0 | No | progress works when range or slider are enabled and gives them the initial value

**Mixin**

| Mixin | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `distance` | Number | 100 | False | Is the distance from the center of the `z-panel`. 100 means 100%.
| `angle` | Number | 0 | False | Is the angle of the `z-scale`. Accepts any number value positive or negative (ej: 345, -567)
| `size` | String | small | False | Represent the diameter of the `z-scale`component. Values: 'large', 'medium', 'small', 'extrasmall'
| `color` | String | primary | False | This mixin gives the color of the `z-scale`. Probably it will be deprecated since you can use style attributes to set you color.
| `gotoview` | String, Number | undefined | False | This works as a href. When put a View Name (ej: home) it goes to view Home.

**Slots:**

| Slot | Description
| :--- | :--- |
| `default` | Default Vue Slot. It is used to put any kind of content such as text, icons, etc. 
| `label` | It is used to include a label that is situated below the component. It is useful when the label is larger that the component.
| `picture` | It is used to insert one image as background inside the view container.
| `circles` | It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>` inside the view container.

### z-button

**Description:** This component is a button. Inside it you can nest many others elements such as `<z-scale>`, `<z-button>` or `<z-alert>`

**Usage:**

```html
<z-button
  :angle="45"
  :distance="140"
  size="small"
  color="success"
  @click.native="your method or inline expression">
  
  <!-- Default slot -->
  Press me

  <!-- Label slot -->
  <span slot="label">Turn on systems</span>

  <!-- Circles slot with single nested element -->
  <z-button
  slot="circles"
  :angle="45">
  onother button
  </z-button>

  <!-- Circles slot with multiple nested elements-->
  <section slot="circles">
    <z-scale
    :angle="45"
    gotoview="bar">
    Bar
    </z-scale>
    <z-button
    :angle="180">
    </z-button>
  </section>
</z-button>
```

**Props:**

none

**Mixin**

| Mixin | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `distance` | Number | 100 | False | Is the distance from the center of the `z-panel`. 100 means 100%.
| `angle` | Number | 0 | False | Is the angle of the `z-button`. Accepts any number value positive or negative (ej: 345, -567)
| `size` | String | small | False | Represent the diameter of the `z-button`component. Values: 'large', 'medium', 'small', 'extrasmall'
| `color` | String | primary | False | This mixin gives the color of the `z-button`. Probably it will be deprecated since you can use style attributes to set you color.

**Slots:**

| Slot | Description
| :--- | :--- |
| `default` | Default Vue Slot. It is used to put any kind of content such as text, icons, etc. 
| `label` | It is used to include a label that is situated below the component. It is useful when the label is larger that the component.
| `circles` | It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>` inside the view container.

### z-list

**Description:** This component manages lists or collections of items.

**Usage:** Populate `collection` prop with an array of elements and define how many items per page you want to show in `per-page` prop. 
`<z-list>` use `slot-scope` of Vue to customize the template of each item. When you click or touch an item, a new view "Item" is called.

```html
<!-- MyList component -->
<z-list
  slot="circles"
  :collection="[{name: 'Apple', color: 'red', image: 'http://img.com/apple'}, {name: 'Banana', color: 'yellow' , image: 'http://img.com/banana'}]"
  :per-page="3">
    <z-item <!-- It is necesary to include z-item component-->
    slot-scope="props"
    :angle="props.angle" <!-- angle is currently mandatory -->
    :color="props.item.color" <!-- color, label, image are optional -->
    :label="props.item.name"
    :image="props.item.image"> 
    </z-item>
</z-list>
```
> **Note** In case you populate the `collection` prop with an external Array, first you have to create a copy of this Array to prevent mutation
```js
// MyList component
...
computed: {
    myresults () {
      // clone array before put en collection prop
      return this.sharedState.results.slice(0)
    }
  }
...
```

> **Note** To show the details of the selected item you have to create a new component with `<z-panel view="item">` and call the selected Item with  `this.$zircleStore.state.selectedItem`

```js
const item = {
  name: 'item',
  template: `<z-panel view="item">
  {{ item }}
  </z-panel>`,
  data () {
    return {
      sharedState: store.state,
      item: this.$zircleStore.state.selectedItem
    }
  }
}
```

**Props**

| Prop | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `collection` | Array | undefined | True | An array with items.
| `perPage` | Number | undefined | True | The number of items per page.

**Mixin**

| Mixin | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `color` | String | accent | False | This mixin gives the color of the `z-list`. Probably it will be deprecated since you can use style attributes to set you color.


### z-item

**Description:** This component works as a sub-component of `z-list` and represent each item displayed.

**Props**

| Prop | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `size` | String | medium | True | The size of each item.
| `color` | String | accent | True | This mixin gives the color of the `z-item`. Probably it will be deprecated since you can use style attributes to set you color.
| `label` | String | '' | False | It is used to include a label that is situated below the component. 
| `image` | String | '' | No | It is used to include a url of an image that is situated as background of each item
| `item` | String, Object | '' | True | Is the prop that contains all current item data.
| `id` | String, Object | '' | False | Is id of the current item.
| `gotoview` | String | item | False | It the view name that Zircle opens when an item is clicked. You can put any other name, but you have to create an 'item' or 'your-view-name' component to show the details of the selected item.
| `angle` | Number | automatic | True | Is the angle of the `z-item`. Currently you don't need to edit this prop.


check this [JSFiddle](http://jsfiddle.net/tinchox5/az5cf0rd/)

### z-alert

**Description:** This component show a pop up when is invoked. Inside it you can nest many others elements such as `<z-scale>`, `<z-button>` or `<z-alert>`

**Usage:**

```html
<z-popup v-if="alert === true" >
    <!-- Default slot-->
    proceed?

     <!-- Circles slot with multiple nested elements-->
     <section slot="circles">
        <z-button
          :distance="115"
          :angle='135'
          color='danger'
          size='small'
          @click.native='alert = false'>
            Close
        </z-button>
        <z-button
          :distance="115"
          :angle='45'
          color='success'
          size='small'
          @click.native='alert = false'>
            Accept
        </z-button>
    </section>
</z-popup>
```


**Props:**
none

***Mixin***

| Mixin | Type | Default value | Required | Description
| :--- | :--- | :--- | :--- | :--- |
| `color` | String | primary | False | This mixin gives the color of the `z-alert`. Probably it will be deprecated since you can use style attributes to set you color.

**Slots:**

| Slot | Description
| :--- | :--- |
| `default` | Default Vue Slot. It is used to put any kind of content such as text, icons, etc.
| `label` | It is used to include a label that is situated below the component. It is useful when the label is larger that the component.
| `circles` | It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>` inside the view container.


## Examples

### Vue.js Ecosystem

<iframe height='600' scrolling='no' title='Vue.js Ecosystem by Zircle' src='//codepen.io/zircle/embed/preview/LeqKGK/?height=600&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/LeqKGK/'>Vue.js Ecosystem by Zircle</a>
</iframe>

### Counter 
<iframe height='450' scrolling='no' title='Counter by Zircle' src='//codepen.io/zircle/embed/preview/qpgzqz/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/qpgzqz/'>Counter by Zircle</a>
</iframe>

### Cuba Libre recipe

<iframe height='450' scrolling='no' title='Cuba Libre Recipe by Zircle' src='//codepen.io/zircle/embed/preview/VygJpY/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/VygJpY/'>Cuba Libre Recipe by Zircle</a>
</iframe>

### Fruit basquet
<iframe height='450' scrolling='no' title='Fruit Basquet by Zircle' src='//codepen.io/zircle/embed/preview/xpMoRe/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/xpMoRe/'>Fruit Basquet by Zircle</a>
</iframe>

### Zooming slider

<iframe height='450' scrolling='no' title='Zooming Slider by Zircle' src='//codepen.io/zircle/embed/preview/VygJKw/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/VygJKw/'>Zooming Slider by Zircle</a>
</iframe>

### Zircle without router

<iframe height='450' scrolling='no' title='Without Router Zircle' src='//codepen.io/zircle/embed/preview/ypZdWZ/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/ypZdWZ/'>Without Router Zircle</a>
</iframe>

### Zircle with Vue-Router

<iframe height='450' scrolling='no' title='With Router Zircle' src='//codepen.io/zircle/embed/preview/RxvzVa/?height=450&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/RxvzVa/'>With Router Zircle</a>
</iframe>

### Themes and Colors selector
<iframe height='500' scrolling='no' title='Themes and Colors Selector by Zircle' src='//codepen.io/zircle/embed/preview/MrLMvB/?height=500&theme-id=light&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/zircle/pen/MrLMvB/'>Themes and Colors Selector by Zircle</a>
</iframe>

## Stay tunned

!> Zircle is in <span style="color: green;"> active </span> development. Feedbacks and contributions are very welcome!

- Suscribe to the mailing list to receive news and updates about Zircle releases.

<!-- Begin MailChimp Signup Form -->
<div id="mc_embed_signup">
<form action="https://zircle.us17.list-manage.com/subscribe/post?u=91025581f3cf49d83896d0651&amp;id=8c7dd8cb4d" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
  
  <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_91025581f3cf49d83896d0651_8c7dd8cb4d" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->

- Follow Zircle on [Twitter](https://twitter.com/ZircleUI)

## License

[MIT](http://opensource.org/licenses/MIT)
