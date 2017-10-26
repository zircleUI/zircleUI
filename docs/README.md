
!> Zircle is in active development

## Guide

### Introduction 

#### What is Zircle UI?

Zircle UI is a circular zooming user interface library based on Vue.js. It mixes two principles: **circular shapes** and **zooming navigation** in the aim of strengthening each other and create a good user experience.

#### Main features
-   Zooming navigation up to 9 level depth.
-   It works well on mobile devices and big screens as it is responsive.
-   It comes with a minimal set of UI components to build your app.
-   It is possible to customize themes and styles to fit your needs. 

#### Quick examples 

* **Zooming slider**

<iframe width="450" height="500" src="//jsfiddle.net/tinchox5/Lc48vwm0/embedded/result,html,js,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

* **Search for fruits**

fruits: ['apple', 'banana', 'orange', 'kiwi', 'melon', 'watermelon', 'lemon', 'grapes', 'peach']

<iframe width="450" height="500" src="//jsfiddle.net/tinchox5/az5cf0rd/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

* **Counter** 

<iframe width="450" height="500"  src="//jsfiddle.net/tinchox5/gj0bpwmf/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### Dependencies
Zircle is a Vue plugin. For this reason, it is recommendable to have some idea of how Vue works. You can try Vue and learn it in http://vuejs.org

> **Information for Vue users**: Zircle UI follows the progressive philosophy of Vue. This implies that for small apps or prototyping you can use Zircle directly into the browser and for more complex apps you can use it with Single Page Applications. For this reason, Zircle works with or without Vue-Router.

### Installation
**Options**

#### Direct download 
* Download Zircle from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist)

#### Content delivery networks (CDN)
* Include https://unpkg.com/zircle in your project with `<script>` tag. With CDN you will have the latest version of Zircle as soon as it is published to NPM. You can also browse the source of the npm package at https://unpkg.com/zircle/ 

#### NPM
NPM is the recommended installation method of zircle if you are building medium to large scale applications with Vue. 

```bash 
npm install zircle --save
```

?> **Note**: When you install Zircle in a fresh project, Vue will also be installed since is a dependency of Zircle. On the other hand, you can install Zircle after you have started a project based on Vue. 

### Initial setup and starter templates
There are several options to setup and start using it.

#### Sandbox 
The easiest way to try and start using Zircle is using the [JSFiddle Zircle sandbox](https://jsfiddle.net/tinchox5/37mr5324/) or the [Codepen Zircle sandbox](https://codepen.io/zircle/pen/MExYRv)

For Zircle projects based on Vue-CLi you con try the [CodeSandbox Zircle sandbox](https://codesandbox.io/s/my0ol78l08)

#### Browser
After you have installed Zircle using direct download or CDN, the following starter template allows you to create a Vue Instance and provides the `<z-canvas>` component to start the development of your Zircle app.

```html
<!DOCTYPE html>
<html>
  <head>
  <!-- Vue.js -->
  <script type="text/javascript" src="https://unpkg.com/vue"></script>
  <!-- Local Zircle lib -->
  <link href="zircle.min.css" rel="stylesheet">
  <script type="text/javascript" src="zircle.min.js"></script>
  <!-- or Zircle from CDN-->
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

#### Single File Components and Vue-CLI
As Vue Documentation explains, with the previous setup you can work very well for small to medium-sized projects. However, in more complex projects, or when your frontend is entirely driven by JavaScript it is better use single-file components with a .vue extension, made possible with build tools such as Webpack or Browserify.

Vue-CLI provides you with an powerful and easy tool to develop complex projects. So, after you installed and run Vue-CLI as it is described in the  [official Vue docs](https://vuejs.org/v2/guide/installation.html#CLI), you can use any of its templates with Zircle. 

Just, install Zircle with NPM and add this code to your vue-CLI project:

**Example using webpack-template**

In the `main.js` file add this code:
```js
import Vue from 'vue'
import app from './App'
import zircle from 'zircle'
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

#### Vue-Router
You can use Zircle with Vue-Router in any environment (from sandbox to vue-cli). Just follow this tips and examples.

##### For Browser or online source code playgrounds.

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
  beforeMount() {
    this.$zircleStore.routerHooks(this)
  }
})
```

Check this demo in [JSFiddle](https://jsfiddle.net/tinchox5/g39omwxv/)  

##### For NPM or Vue-CLI

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
  beforeMount () {
    this.$zircleStore.routerHooks(this)
  }
}
</script>
<style>
</style>
```


Check this example on [CodeSandbox](https://codesandbox.io/s/2x39p49kmn)

### Themes and colors
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

#### Customize
The easiest way to adapt the themes to your needs is to override the color CSS clases or create a new color names

Check the CSS tab of the following example
<iframe width="450" height="500" src="//jsfiddle.net/tinchox5/tgLhdv86/embedded/result,js,css,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


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

**Slots:**

**`default`** Default Vue Slot.


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
  beforeMount () {
    this.$zircleStore.setView('foo')
  }
})
```

Check this [example without Vue-Router](http://jsfiddle.net/tinchox5/umo398sw/) and this [example with Vue-Router](http://jsfiddle.net/tinchox5/g39omwxv/)

**Props:**

**`list`**

* **Type**: Object

* **Default**: undefined

* **Required**: True

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


**Props:**

**`view`**

* **Type**: String, Number

* **Default**: undefined

* **Required**: True

**`range`**

* **Type**: Boolean

* **Default**: false

**`slider`**

* **Type**: Boolean

* **Default**: false

**`progress`**

* **Type**: Number

* **Default**: 0

**Mixing:**

`<z-panel>` uses color mixing prop
  
**`color`**

* **Type**: String

* **Default**: 'primary'

**Slots:**

**`default`** Default Vue Slot. It is used to put any kind of content such as text, icons, etc. If the content is larger than the view container the sub component `<z-scroll>`is activated.

**`picture`** It is used to insert one image inside the container.

**`circles`** It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>`


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


**Props:**

**`range`**

* **Type**: Boolean

* **Default**: false

**`slider`**

* **Type**: Boolean

* **Default**: false

**`progress`**

* **Type**: Number

* **Default**: 0

**Mixing:**

`<z-panel>` uses mixing props
  
**`distance`**

* **Type**: Number

* **Default**: 100

**`angle`**

* **Type**: Number

* **Default**: 0

**`size`**

* **Type**: String

* **Default**: 'small'

**`color`**

* **Type**: String

* **Default**: 'primary'

**`gotoview`**

* **Type**: [String, Number]

* **Default**: undefined

**Slots:**

**`default`** Default Vue Slot. It is used to put any kind of content such as text, icons, etc.

**`label`** It is used to include a label that is situated below the component. It is useful when the label is larger thar the component. 

**`picture`** It is used to insert one image inside the container.

**`circles`** It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>`
 

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

**Mixing:**

`<z-button>` uses mixing props
  
**`distance`**

* **Type**: Number

* **Default**: 100

**`angle`**

* **Type**: Number

* **Default**: 0

**`size`**

* **Type**: String

* **Default**: 'small'

**`color`**

* **Type**: String

* **Default**: 'primary'

**Slots:**

**`default`** Default Vue Slot. It is used to put any kind of content such as text, icons, etc.

**`label`** It is used to include a label that is situated below the component. It is useful when the label is larger thar the component. 

**`circles`** It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>`

check this example 


### z-list

**Description:** This component manages lists or collections of items.

**Usage:** Populate `collection` prop with an array of elements and define how many items per page you want to show in `per-page` prop. 
`<z-list>` use `slot-scope` of Vue to customize the template of each item. When you click or touch an item, a new view "Item" is called.

```html
<!-- MyList component -->
<z-list
  slot="circles"
  color="accent"
  :collection="['Apple', 'Banana', 'Orange', 'Kiwi', 'Melon', 'Watermelon', 'Lemon', 'Grapes']"
  :per-page="3">
    <li slot-scope="props">
        {{props.item}}
      </li>
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
**Props:**

**`collection`**
* **Type**: Array

**`perPage`**
* **Type**: Number

**Mixing:**

`<z-list>` uses mixing props

**`color`**

* **Type**: String

* **Default**: 'primary'

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

**Mixing:**

`<z-alert>` uses mixing props

**`color`**

* **Type**: String

* **Default**: 'primary'

**Slots:**

**`default`** Default Vue Slot. It is used to put any kind of content such as text, icons, etc.

**`circles`** It is used when you nest other components such as `<z-scale>`, `<z-button>` or `<z-alert>` 


## Examples

### Counter 
<iframe width="450" height="500"  src="//jsfiddle.net/tinchox5/gj0bpwmf/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Cuba Libre recipe

<iframe width="450" height="500"  src="//jsfiddle.net/tinchox5/p8133xad/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Search for fruits
<iframe width="450" height="500" src="//jsfiddle.net/tinchox5/az5cf0rd/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Zooming slider

<iframe width="450" height="500" src="//jsfiddle.net/tinchox5/Lc48vwm0/embedded/result,html,js,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Zircle without router

<iframe width="450" height="500"  src="//jsfiddle.net/tinchox5/umo398sw/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Zircle with Vue-Router

<iframe width="450" height="500"  src="//jsfiddle.net/tinchox5/g39omwxv/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Themes and Colors changer
<iframe width="450" height="500"  src="//jsfiddle.net/tinchox5/tgLhdv86/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## ToDo
* Adapt Zircle to the style guide of Vue.
* Improve Zircle State Management.
* Improve documentation.
* Add more examples.
* Allow Zircle to be used in not Standalone mode.

## License

[MIT](http://opensource.org/licenses/MIT)
