<template>
  <div
    v-show="hidden === false"
    class="z-shape is-extension"
    :class="[componentType, activated, shape]"
    :style="responsive === true ? styles.main : zpos.main">
    <div
      class="z-outer-point" :class="[shape]"
      :style="responsive === true ? styles.plate : zpos.plate">
    </div>
  </div>
</template>

<script>
export default {
  name: 'z-pagination',
  props: {
    distance: {
      type: Number,
      default: 100
    },
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'xs'
    },
    index: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    }
  },
  inject: ['view'],
  data () {
    return {
      componentType: this.$options.name,
      hidden: false,
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
    position () {
      return this.$zircle.calcPosition(this)
    },
    activated () {
      return {
        active: this.active === this.index,
        deactive: this.active < this.index || this.active > this.index
      }
    },
    shape () {
      return this.$zircle.getThemeShape() === 'square' ? 'papa' : ''
    },
    styles () {
      var zwidth = this.$zircle.getComponentWidth(this.size) / 2
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: this.$zircle.getThemeShape() === 'square' ? '' : -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: this.$zircle.getThemeShape() === 'square' ? '' : 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: zwidth + 12 + 'px',
          height: zwidth + 12 + 'px',
          margin: this.$zircle.getThemeShape() === 'square' ? '' : -((zwidth + 12) / 2) + 'px 0 0 ' + -((zwidth + 12) / 2) + 'px'
        }
      }
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
