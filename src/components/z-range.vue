<template>
  <div
    title="z-range"
    class="zui disc"
    :type="type"
    :class="[classes, colors, rangeClass]"
    :style="responsive === true ? styles.main : zpos.main"
    @mousedown="pulse"
    @touchstart="pulse">
    <div class="z-pulse"></div>
      <z-range-bar
        v-on:rangeVal="extraInfo"
        :progress='progress'>
      </z-range-bar>
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
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-range',
  mixins: [zmixin],
  props: {
    progress: {
      type: Number,
      default: 0
    },
    range: {
      type: [Boolean],
      default: true
    },
    type: {
      type: String,
      default: 'range'
    }
  },
  inject: ['view'],
  data () {
    return {
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
    rangeClass () {
      return {
        range: this.range === true
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
      pulse.classList.add('pulse')
      pulse.addEventListener('animationend', function () {
        pulse.classList.remove('pulse')
      }, false)
      pulse.removeEventListener('animationend', function () {
        pulse.classList.remove('pulse')
      }, false)
    },
    extraInfo (data) {
      this.extrainfo = data
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
