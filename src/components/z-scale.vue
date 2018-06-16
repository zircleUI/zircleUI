<template>
  <div
    class="z-shape is-extension"
    :class="[componentType, classes, colors]"
    :style="responsive === true ? styles.main : zpos.main"
    @mousedown="pulse"
    @touchstart="pulse"
    @mouseup="move">
    <div class="z-pulse"></div>
      <z-slider
        v-if="slider === true"
        :progress='progress'>
      </z-slider>
      <section class="label" v-if="label || $slots['label']">
        {{label}}
        <slot v-if="!label" name="label"></slot>
        {{extrainfo}}
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
import zmixin from '../mixins/z-mixin'
export default {
  name: 'z-scale',
  mixins: [zmixin],
  props: {
    progress: {
      type: Number,
      default: 0
    },
    slider: {
      type: [Boolean],
      default: false
    }
  },
  inject: ['view'],
  data () {
    return {
      componentType: this.$options.name,
      zpos: {},
      innerpos: {},
      extrainfo: ''
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
    },
    move () {
      var position = {
        X: this.position.Xabs,
        Y: this.position.Yabs,
        scale: this.position.scale,
        Xi: this.position.Xi,
        Yi: this.position.Yi,
        scalei: this.position.scalei
      }
      if (this.toView) {
        this.$zircle.setView(this.toView, {
          position: position
        })
      }
    },
    extraInfo (data) {
      this.extrainfo = data
    }
  },
  mounted () {
    this.zpos = this.styles
    if (this.slider) this.extrainfo = this.progress
  }
}
</script>
