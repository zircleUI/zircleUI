<template>
  <z-canvas :views="$options.components" />
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
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
  @import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css');
</style>
