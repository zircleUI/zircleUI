<template>
  <div>
    <transition-group name="head" appear>
      <div :key="view" class="title z-header">{{ title }}</div>
      <div :key="view + 1" class="panel" style="display: none; width: 200px; height: 80%; border: 1px solid red">test</div>
    </transition-group>
    <z-canvas :views="$options.components" />
  </div>
</template>
<script>
// import { markRaw } from 'vue'
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
    return {}
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
