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
      this.$zircle.setNavigationMode('iddle')
    },
    goback () {
      if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackwardNavigationState() === false && this.$zircle.getRouterState() === false) {
        this.$zircle.goBack()
      } else if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackwardNavigationState() === false && this.$zircle.getRouterState() === true) {
        this.$zircle.setNavigationMode('backward')
        this.$router.back()
      }
    },
    compareAndNotify () {
      this.$zircle.getDimensions()
    },
    addResizeHandlers () {
      this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify)
      this.$zircle.getDimensions()
    }
  },
  created () {
    this.$zircle.setComponentList(this.views)
  },
  mounted () {
    // Get window dimension to set the initial width of ui components such as z-panel
    const object = document.createElement('object')
    this._resizeObject = object
    object.setAttribute('aria-hidden', 'true')
    object.setAttribute('tabindex', -1)
    object.className = 'z-resizable-object'
    object.onload = this.addResizeHandlers
    object.type = 'text/html'
    object.data = 'about:blank'
    this.$el.appendChild(object)

    document.onmouseleave = () => this.$zircle.setNavigationMode('backward')
  }
}
</script>
<style lang="sass">
  @import '../styles/sass/themes.sass', '../styles/sass/styles.sass'
</style>
