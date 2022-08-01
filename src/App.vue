<template>
  <z-canvas :views="$options.components" />
</template>
<script>
import { markRaw } from 'vue'
import home from './demo/home.vue'
import docs from './demo/docs.vue'
export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    home: markRaw(home),
    docs: markRaw(docs)
  },
  mounted () {
    this.$zircle.config({
      debug: true,
      style: {
        theme: 'blue'
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
