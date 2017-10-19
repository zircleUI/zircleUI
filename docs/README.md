# Zircle UI

[![npm](https://img.shields.io/npm/v/zircle.svg)](https://www.npmjs.com/package/zircle) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A circular zooming UI

!> Docs are being updated

## Guide

### Introduction 

#### What is Zircle UI?

Zircle UI is a circular zooming user interface library based on Vue.js. It mixes two principles: **circular shapes** and **zooming navigation** in the aim of strengthening each other and create a good user experience.

#### Main features
-   Zooming navigation up to 9 level depth.
-   It works well on mobile devices and big screens as it is responsive.
-   It comes with a minimal set of UI components to build your app.
-   It is possible to customize themes and styles to fit your needs. 

#### Dependencies

Zircle UI uses Vue and technically is a Vue plugin. For this reason, it is recommendable to have some idea of how vue works. You can try vue and learn it in http://vuejs.org

> **Information for vuejs users**: Zircle UI follows the progressive philosophy of vue. This implies that for small apps or prototyping you can use Zircle directly into the browser and for more complex apps you can use it with .vue files, vue-cli, etc. For this reason, Zircle works with or without Vue-Router.

### Get started
Below there is a detailed guide to get started with Zircle 

#### Installation
There are several ways to install zircle UI according your needs:

##### Direct download 
* Download Zircle from [Github](https://github.com/zircleUI/zircleUI/tree/master/dist)

##### Content delivery networks (CDN)

* Include https://unpkg.com/zircle in your project with ```<script>``` tag. With CDN you will have the latest version of Zircle as soon as it is published to npm. You can also browse the source of the npm package at https://unpkg.com/zircle/ 

##### NPM
NPM is the recommended installation method of zircle if you are building medium to large scale applications with Vue. 

```bash 
npm install zircle --save
```

?> **Note**: When you install Zircle in a fresh project, Vue will also be installed since is a dependency of Zircle. On the other hand, you can install Zircle after you have started a project based on Vue. 

#### Initial setup and starter templates
As Zircle follows the progressive philosophy of Vue, there are several options to setup and start using it.

##### Sandbox 
The easiest way to try and start using zircle is using the [Jsfiddle sandbox](https://jsfiddle.net/tinchox5/37mr5324/)

##### Browser
After you have installed zircle using direct download or CDN , you need the following basic code to start using it:


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
    <!-- your code here -->
    </z-canvas>
	</div>
	<script>
		new Vue({
			el: '#app'
		})
	</script>
  </body>
</html>
```
This starter template allows to start a Vue Instance and provides the `<z-canvas>` component to start the development of your Zircle app.

See this very basic example of a Cuba Libre recipe

<iframe width="100%" height="400px" src="examples/cubalibre/index.html" allowfullscreen="allowfullscreen" frameborder="0">
</iframe>

[Source code](https://github.com/zircleUI/zircleUI/tree/master/docs/examples/cubalibre/index.html)

##### Single File Components and Vue-CLI
As Vue Documentation explains, with the previous setup you can work very well for small to medium-sized projects. However, in more complex projects, or when your frontend is entirely driven by JavaScript it is better use single-file components with a .vue extension, made possible with build tools such as Webpack or Browserify.

Vue-CLI provides you with an powerful and easy tool to develop complex projects. So, after you installed and run Vue-CLI you can use any of its templates with Zircle.

You can play with a zircle in [CODESANDBOX](https://codesandbox.io/s/y1xvq0l81)
Just, install Zircle with NPN, as is described above, and add this code to your vue-cli project:

Example using webpack-template
```Javascript
// main.js
import Vue from 'vue'
import zircle from './index'
import app from './App'
Vue.use(zircle)
new Vue({
  el: '#app',
  components: {
    app
  },
  template: '<app/>'
})
```

```Javascript
// App.vue

<template>
    <z-canvas>
        <z-view-manager :list='$options.components'></z-view-manager>
    </z-canvas>
</template>
<script>
const one = {
  name: 'one',
  template:
  `<z-panel view="one" >
    <img slot="picture" src="../static/cubata.png" width="100%" height="100%" />
    <section slot="circles">
      <z-scale 
        color="accent"
        :angle="-45"  
        size="large">
        <h1 >Cuba Libre</h1>
      </z-scale>
      <z-scale 
        :angle="180"  
        size="medium" 
        gotoview="mix">
        Mixing
      </z-scale>
      <z-scale 
        :angle="45"  
        size="small" 
        gotoview="recipe">
        3
        <div slot="label"> ingredients </div>
      </z-scale>
    </section>
  </z-panel>`
}
const recipe = {
  name: 'recipe',
  template:
  `<z-panel view="recipe">
    <section style="font-size: 20px; color: white">
      <p>12 cl Cola</p>
      <p>5 cl Light rum</p>
      <p>1 cl Fresh lime juice</p>
    </section>
  </z-panel>`
}
const mix = {
  name: 'mix',
  template:
  `<z-panel view="mix" >
      <section style="font-size: 20px; color: white">
          Build all ingredients in a Collins glass filled with ice. Garnish with lime wedge.
      </section>
  </z-panel>`
}
export default {
  components: {
    one,
    recipe,
    mix
  },
  beforeMount () {
    this.$zircleStore.setView('one')
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>
```
See this very basics example of gin tonic recipe

Do you need to use router?
Zircle can work with or without router. If you want to include router for navigation you could use Vue-router. You can use vue-router in any environment (from sandbox to vue-cli), just setup vue-router and tell zircle that the router is enabled.

Steps:
install vue-router from CDN or NPM

Setup router:
```html
import Router from 'vue-router'
Vue.use(Router)
import home from './views/Home'
const router = new Router({
  base: __dirname,
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: home
  }]
})
export default {
data () {
    return {
      initialView: 'home',
      enableRouter: true, // false
      colors: []
    }
  }
}
```
see examples with router

Styles and themes
Zircle comes with four themes under hood you can use. Each theme uses css variables.
The themes are:
theme--light
theme--bold-light
theme--dark
theme--bold-dark
The css variables are declared in the document root:
--background-color
--primary-color
--accent-color
--success-color
--warning-color
--danger--color

[exmples]

Customization:
You can change the css variables in the documento root to fill your needs. zircle provides a bunch of pre made color themes you can try.
[ponerlos]

You can also dive deep and make more advance customizations such as use images to decorate the zircle panels.
for instante, poner svg,. explicar como y poner un fucking ejemplo

see malbec card


API
In-built components
Zircle provides a minimal set of component to make user interfaces.

z-canvas
This component is essential for zircle. It is the canvas of zircle and your project needs to be inside it.
Use


Tips:
The default settings of the z-canvas is for a standalone zircle project. That it means thar zircle will occupy all the screen . In case you want to use zircle in other project you can override the css settings to allow zircle be inside a other element, such a div.
use: FULL PROPERTY
```css
#z-container {
position: absolute;
}
#z-point {
position:absolute;
}
```

AS a default z-canas uses the background-color of the project, but you can change that modifying :
```css
.z-container {
background: your awesome background;
}
```
z-view-manager

z-panel
Z-panel represent the most visible element in each view.

Properties:
Viewname
Color
Slider?
Range? terminar de ajustar ese componente
If the content is longer than panel an scroll appears
Slot circles to add child zircle componenets. IN this slot slot you can nest buttons and or mini panels, popups
one element add slot="circles", more created a section elements with the slot circles

Example con ajustes dinamicos?

sub compoments:
z-slider
z-range
z-scroll


Z-scale
This conponent is zoomable. If you define a view to go
It cones with this properties:
Angle 
Distance 
Color
Size
Gotoview
Range ?
Slider?

Z-scale could cointain nested z-buttons and z-scales

Example

sub compoments:
z-slider
z-range


Z-button
Properties 
Angle
Distance
Size
@click.native
Color

You can nest elements

Z-list
It is a compound component that allow show list o collections of data. It comes with pagination 
Properties 
Item-per-page
Collection

sub compoments:
z-item
z-pagination
z-dotnav


z-popup
its an overlay alert with auto close timer

subcomponents
z-button
z-slider


Z-range and z-slider are addons you can use inside z-panel, z-scale, z-popup



EXAMPLES
First steps with Zircle
We will start with a very basic counter app...and then we will add some features to make it more interesting and to have an idea of what you can do with zircle

one counter 


one counter with router


## License

[MIT](http://opensource.org/licenses/MIT)
