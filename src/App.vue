<template>
  <div>
    <span style="z-index:999; position: absolute; top: 10px; right: 10px; font-weight: 500; font-size: 13px" >v{{pkg.version}}</span>
    <transition-group name="head" appear>
      <div :key="view" class="title z-header">{{ title }}</div>
      <div :key="view + 1" class="panel" style="display: none;">test</div>
      <div :key="view + 2" class="footer">
        <span style="font-size: 13px" >
        <b>Tip: </b> use filter to change coding language & time period</span>
      </div>
    </transition-group>
    <z-canvas :views="$options.components" />
  </div>
</template>
<script>
// import { markRaw } from 'vue'
import pkg from '../package.json'
import home from './demo/home.vue'
import docs from './demo/docs.vue'
import components from './demo/components.vue'
import zcanvas from './demo/zcanvas.vue'
import zview from './demo/zview.vue'
import zlist from './demo/zlist.vue'
import zspot from './demo/zspot.vue'
import zdialog from './demo/zdialog.vue'

export default {
  data () {
    return {
      pkg
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
        case 'components':
          return 'MIni showcase'
        default:
          return 'opps'
      }
    }
  },
  components: {
    /* eslint-disable vue/no-unused-components */
    home,
    docs,
    components,
    zview,
    zspot,
    zlist,
    zdialog,
    zcanvas
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
