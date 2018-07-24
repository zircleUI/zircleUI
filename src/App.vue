<template>
  <z-canvas :views='$options.components'></z-canvas>
</template>
<script>
import tv from './views/tv'
import living from './views/living'
import device from './views/device'
import home from './views/home'
import settings from './views/settings'
import rooms from './views/rooms'
import devices from './views/devices'
import status from './views/status'
import scenes from './views/scenes'
import maps from './views/maps'
import logs from './views/logs'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// import tinycolor from 'tinycolor2'
const router = new Router()
// const search = () => import('./views/search')
const two = {
  template: `<z-view>2 
    <div slot="extension">
    <z-spot
      :angle="56"
      to-view="three">3
    </z-spot>
    <z-spot knob
      :angle="156"
      :progress="15"
      label="vol">3
    </z-spot>
    </div>
  </z-view>`
}
const three = {
  template: `<z-view>3
  <z-spot 
      slot="extension"
      :angle="56"
      to-view="one">1
    </z-spot>
  </z-view>`
}
export default {
  components: {
    two,
    living,
    home,
    scenes,
    devices,
    tv,
    device,
    settings,
    rooms,
    status,
    maps,
    logs
    // search: () => import('./views/search'),
  },
  router,
  data () {
    return {
      list: {living, three, two},
      state: this.$zircle.getState()
    }
  },
  mounted () {
    this.$zircle.config({
      mode: 'full',
      style: {
        theme: 'black',
        mode: 'dark'
      },
      debug: true
    })
    this.$zircle.setView('home')
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
@import url('https://use.fontawesome.com/releases/v5.1.0/css/all.css');
</style>
