<template>
  <div>
    <span
      style="z-index:999; position: absolute; top: 10px; right: 10px; font-weight: 500; font-size: 13px">v{{
        packageVersion
      }}</span>
    <transition-group name="head" appear>
      <div :key="view" class="title z-header" :class="view === 'home' ? 'home' : ''">
        {{ title }}
        <br>
        <div style="line-height: 0.9em; font-weight: 300; font-size: 20px; color: #8a8f94">
          <br>
          <span style="text-transform: capitalize">
            Sun, Earth & Moon
          </span>
        </div>
      </div>
      <div :key="view + 1" class="panel" style="display: none;">test</div>
      <div :key="view + 2" class="footer">
        <span style="font-size: 13px">
        <b>Tip: </b> use filter to change coding language & time period</span>
      </div>
    </transition-group>
    <z-canvas :views="$options.components"/>
  </div>
</template>

<script>
import pkg from '../package.json'
import home from './demo/home.vue'
import docs from './demo/docs.vue'
import moon from './demo/moon.vue'
import earth from './demo/earth.vue'
import demo from './demo/demo.vue'
import sun from './demo/sun.vue'

export default {
  data () {
    return {
      packageVersion: pkg.version
    }
  },
  computed: {
    view () {
      return this.$zircle.getCurrentViewName().slice(0, -3)
    },
    title () {
      switch (this.view) {
        case 'home':
          return 'Welcome to Zircle\'s demo'
        case 'sun':
          return 'Sun profile'
        case 'earth':
          return 'Earth profile'
        case 'moon':
          return 'Moon profile'
        case 'demo':
          return 'An eclectic showcase'
        default:
          return 'opps'
      }
    }
  },
  components: {
    /* eslint-disable vue/no-unused-components */
    home,
    docs,
    earth,
    moon,
    demo,
    sun
  },
  mounted () {
    this.$zircle.config({
      debug: true,
      style: {
        theme: 'white'
      }
    })
    this.$zircle.setView('home')
  }
}
</script>
<style>
@import url("../public/index.css");

</style>
