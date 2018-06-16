<template>
  <div
    id="z-container"
    class="z-canvas"
    :class="[classes, $zircle.getTheme(), $zircle.getThemeMode()]"
    :style="[$zircle.getPreviousViewName() !== '' ? {cursor: 'zoom-out'} : {}]"
    @click.stop="goback">
      <div id="z-zoomable-layer">
        <z-canvas-view-manager :list="$zircle.getComponentList()" />
      </div>
  </div>
</template>

<script>
/* eslint-disable no-new */
export default {
  name: 'z-canvas',
  props: {
    views: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    classes () {
      return {
        'is-full-mode': this.$zircle.getAppMode() === 'full',
        'is-embedded-mode': this.$zircle.getAppMode() === 'embedded',
      }
    }
  },
  methods: {
    goback () {
      if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackwardNavigationState() === false) {
        if (this.$zircle.getRouterState() === false) {
          this.$zircle.goBack()
        } else {
          this.$router.back()
        }
      }
    }
  },
  created () {
    this.$zircle.setComponentList(this.views)
  },
  mounted () {
    var vm = this
    // Get window dimension to set the initial width of ui components such as z-panel
    this.$zircle.getDimensions()
    window.addEventListener('resize', function (event) {
      // On resize change the width of ui components
      vm.$zircle.getDimensions()
    })
  }
}
</script>
<style lang="sass">
  @import url('../styles/sass/themes.sass')
  @import url('../styles/sass/styles.sass')
</style>
