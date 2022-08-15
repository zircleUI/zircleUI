<template>
  <div>
    <span class="version">v{{ packageVersion }}</span>
    <transition-group name="head" appear>
      <div :key="view" class="title z-header" :class="view === 'home' ? 'home' : ''">{{ txt.title }}
        <br>
        <div class="subtitle">
          <br>
          <span>{{ txt.subtitle }}</span>
        </div>
      </div>
      <div :key="view + 1" class="panel" style="display: none;"></div>
      <div :key="view + 2" class="footer" v-if="txt.footer"><b>Tip:</b> {{ txt.footer }}</div>
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
    txt () {
      switch (this.view) {
        case 'home':
          return {
            title: 'Welcome to Zircle\'s demo',
            subtitle: 'Sun, Earth & Moon',
            footer: 'click/touch on circles!'
          }
        case 'sun':
          return {
            title: 'Sun profile',
            subtitle: 'Sun, Earth & Moon',
            footer: ''
          }
        case 'earth':
          return {
            title: 'Earth profile',
            subtitle: 'Sun, Earth & Moon',
            footer: 'zoom the Moon!'
          }
        case 'moon':
          return {
            title: 'Moon profile',
            subtitle: 'Sun, Earth & Moon',
            footer: ''
          }
        case 'demo':
          return {
            title: '',
            subtitle: 'Sun, Earth & Moon',
            footer: 'zoom the Sun & the Earth!'
          }
        default:
          return {
            title: 'oops',
            subtitle: '',
            footer: ''
          }
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
