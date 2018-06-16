<template>
  <div
    class="z-shape is-extension"
    :class="[componentType, classes, colors]"
    :style="responsive === true ? styles.main : zpos.main"
    @mousedown="pulse"
    @touchstart="pulse">
    <div class="z-pulse"></div>
    <section class="label" v-if="label || $slots['label']">
      {{label}}
      <slot v-if="!label" name="label"></slot>
    </section>
    <div class="z-content">
      <img v-if="imagesrc" :src="imagesrc" width="100%" height="100%" />
      <slot v-if="!imagesrc" name="image"></slot>
    </div>
    <div class="z-content">
      <span class="overflow">
        <slot></slot>
      </span>
    </div>
    <slot name="extension"></slot>
  </div>
</template>

<script>
// mejorar estados y todo
import zmixin from '../mixins/z-mixin'
export default {
  name: 'z-button',
  mixins: [zmixin],
  inject: ['view'],
  data () {
    return {
      componentType: this.$options.name,
      zpos: {}
    }
  },
  methods: {
    pulse () {
      let pulse = this.$el.querySelector('.z-pulse')
      pulse.classList.add('pulse-animation')
      pulse.addEventListener('animationend', function () {
        pulse.classList.remove('pulse-animation')
      }, false)
      pulse.removeEventListener('animationend', function () {
        pulse.classList.remove('pulse-animation')
      }, false)
    }
  },
  computed: {
    responsive () {
      if (this.view === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles
        return true
      } else {
        return false
      }
    },
    styles () {
      var zwidth = this.$zircle.getComponentWidth(this.size)
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        }
      }
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
