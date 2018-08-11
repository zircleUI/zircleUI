<template>
  <z-canvas :views="$options.components" />
</template>
<script>
export default {
  components: {
    home: () => import('./demo/home'),
    options: () => import('./demo/options')
  },
  mounted () {
    this.$zircle.setView('home')
  }
}
</script>
