<template>

  <div v-show="hidden === false" title="z-dotnav" class="zui disc" :type="type" :class="[classes, colors, activated]"  :style="styles.main"> 
  <div class="navplate" :style="styles.plate"></div>
  </div>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-list-pagination',
  mixins: [zmixin],
  props: {
    type: {
      type: String,
      default: 'pagination'
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
  data () {
    return {
      hidden: false
    }
  },
  computed: {
    position () {
      return this.$zircle.calcPosition(this)
    },
    activated () {
      return {
        'accent-secondary': this.active === this.index,
        'accent-secondary-border': this.active < this.index || this.active > this.index
      }
    },
    styles () {
      var zwidth = this.$zircle.getComponentWidth(this.size) / 3
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
  },
  updated () {
    this.$nextTick(function () {
      if (this.$parent.$parent.$el.classList.contains('prevclass') || this.$parent.$parent.$el.classList.contains('pastclass')) {
        this.hidden = true
      } else {
        this.hidden = false
      }
    })
  }
}
</script>
