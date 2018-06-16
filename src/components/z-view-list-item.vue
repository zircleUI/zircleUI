<template>
    <div
      class="z-shape is-extension"
      :class="[componentType, classes, colors]"
      :style="responsive === true ? styles.main : zpos.main"
      @mousedown="pulse"
      @touchstart="pulse"
      @mouseup="move">
      <div class="z-pulse"></div>
      <section class="label overflow" v-if="label || $slots['label']">
        {{label}}
        <slot v-if="!label" name="label"></slot>
      </section>
      <div class="z-content">
        <img v-if="imagesrc" :src="imagesrc" width="100%" height="100%" />
        <slot v-if="!imagesrc" name="image"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'z-view-list-item',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    index: {
      type: Number,
      required: true
    },
    color: {
      default: 'accent'
    },
    label: {
      type: [String, Number]
    },
    imagesrc: {
      type: [String, Number]
    },
    toView: {
      type: [String, Number]
    }
  },
  inject: ['view'],
  data () {
    return {
      componentType: this.$options.name,
      zpos: {}
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
    angle () {
      return (360 / this.$zircle.getNumberOfItemsInCurrentPage() * this.index) - 90
    },
    distance () {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : 60
    },
    position () {
      return this.$zircle.calcPosition(this)
    },
    classes () {
      return {
        zZoomInCursor: this.type === 'scale' && this.gotoview !== undefined
      }
    },
    colors () {
      return this.color
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
      this.$zircle.setView(this.toView, {
        position: position
      })
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
