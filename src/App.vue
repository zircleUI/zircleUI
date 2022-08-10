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
      return this.$zircle.getCurrentViewName()
    },
    title () {
      const view = this.view.charAt(0).toUpperCase() + this.view.slice(1, -3)
      return view
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
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700");
@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
.title {
  text-align: center
}
.head-enter {
  opacity: 0;
  color: red
}

.head-enter-active {
  transition: opacity 2s 0.8s;
  color: green
}
</style>
