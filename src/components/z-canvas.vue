<template>
  <div
    id="z-container"
    class="z-canvas"
    :class="[classes, $zircle.getTheme(), $zircle.getThemeMode(), $zircle.getThemeShape()]"
    :style="[$zircle.getPreviousViewName() !== '' ? {cursor: 'zoom-out'} : {}]"
    @click.stop="goback">
      <div id="z-zoomable-layer" ref="zoom" :style="zoom" @transitionend="notify">
        <z-view-manager />
      </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import ZViewManager from './child-components/z-view-manager'
export default {
  name: 'z-canvas',
  props: {
    views: {
      type: [Object],
      required: true
    }
  },
  components: {
    ZViewManager
  },
  computed: {
    zoom () {
      var pos = {}
      this.$zircle.getHistoryLength() === 0 ? pos = { X: 0, Y: 0, Xi: 0, Yi: 0, scale: 1, scalei: 1 } : pos = this.$zircle.getCurrentPosition()
      return {
        transform: 'scale(' + pos.scale + ') translate3d(' + pos.Xi + 'px, ' + pos.Yi + 'px, 0px)',
        transition: 'transform 1000ms ease-in-out'
      }
    },
    classes () {
      return {
        'is-full-mode': this.$zircle.getAppMode() === 'full',
        'is-mixed-mode': this.$zircle.getAppMode() === 'mixed'
      }
    }
  },
  methods: {
    notify () {
      this.$zircle.setNavigationMode('')
    },
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
    this.$nextTick()
      .then(function () {
      // DOM updated
        vm.$zircle.getDimensions()
      })
    window.addEventListener('resize', function (event) {
      // On resize change the width of ui components
      vm.$zircle.getDimensions()
    })
  }
}
</script>
<style lang="sass">
  @import '../styles/sass/themes.sass', '../styles/sass/styles.sass'
</style>
