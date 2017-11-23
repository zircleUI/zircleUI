<template>

  <div title="z-dotnav" class="zui disc" :type="type" :class="[classes, colors, activated]"  :style="styles.main"> 
  <div class="navplate" :style="styles.plate"></div>
  </div>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-scale',
  mixins: [zmixin],
  props: {
    type: {
      type: String,
      default: 'pagination'
    },
    total: {
      type: Number,
      default: 0
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
  computed: {
    position () {
      return this.store.point(this)
    },
    activated () {
      return {
        'accent-secondary': this.active === this.index,
        'accent-secondary-border': this.active < this.index || this.active > this.index
      }
    },
    styles () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m
          break
        case 'small':
          zwidth = this.state.zircleWidth.s
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs / 3
          break
      }
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: zwidth + 10 + 'px',
          height: zwidth + 10 + 'px',
          margin: -((zwidth + 10) / 2) + 'px 0 0 ' + -((zwidth + 10) / 2) + 'px'
        }
      }
    }
  }
}
</script>
