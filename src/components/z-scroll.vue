<template>
  <section>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="scroll"
      @click.prevent="point">
        <circle
          r="51"
          cx="50"
          cy="50"
          :style="arcStyle">
        </circle>
    </svg>
    <svg
      v-show="hidden === false"
      xmlns="http://www.w3.org/2000/svg"
      class="scroll2"
      :style="circleStyle"
      @touchstart="drag = true"
      @touchmove.prevent="slide"
      @touchend="drag = false"
      @mousedown="drag = true"
      @mousemove.prevent="slide"
      @mouseup="drag = false">
        <circle
          r="10"
          cx="20"
          cy="20"
          class="handlebar">
        </circle>
    </svg>
  </section>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  props: ['scrollVal'],
  name: 'z-scroll',
  data () {
    return {
      type: 'scroll',
      drag: false,
      hidden: false
    }
  },
  computed: {
    arcStyle () {
      // progress circle
      var circleLength = 2 * Math.PI * 50
      // progress circle
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-45deg)',
        strokeDasharray: circleLength - 2,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -(Math.PI * 100) * ((90 - 360) / 360),
        strokeWidth: 3
      }
    },
    position () {
      var zwidth = this.$zircle.getComponentWidth('xxl') / 2
      return {
        X: (zwidth) * Math.cos(this.scrollVal * (Math.PI / 180)),
        Y: (zwidth) * Math.sin(this.scrollVal * (Math.PI / 180))
      }
    },
    circleStyle () {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      }
    }
  },
  methods: {
    point (e) {
      const dimensions = this.$el.querySelector('.scroll').getBoundingClientRect()
      var centerx = (dimensions.width / 2) + dimensions.left
      var centery = (dimensions.height / 2) + dimensions.top
      var posx = e.x
      var posy = e.y
      var deltay = centery - posy
      var deltax = centerx - posx
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
      tangle -= 135
      if (tangle < 0) {
        tangle = 360 + tangle
      }
      if (tangle >= 135) {
        tangle = 0
      }
      if (tangle > 90) {
        tangle = 90
      }
      tangle = Math.round(tangle) - 45
      this.$emit('update:scrollVal', tangle)
    },
    slide (e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e
        const dimensions = this.$el.querySelector('.scroll').getBoundingClientRect()
        var centerx = (dimensions.width / 2) + dimensions.left
        var centery = (dimensions.height / 2) + dimensions.top
        var posx = e.pageX
        var posy = e.pageY
        var deltay = centery - posy
        var deltax = centerx - posx
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
        tangle -= 135
        if (tangle < 0) {
          tangle = 360 + tangle
        }
        if (tangle >= 135) {
          tangle = 0
        }
        if (tangle > 90) {
          tangle = 90
        }
        tangle = Math.round(tangle) - 45
        this.$emit('update:scrollVal', tangle)
      }
    }
  }
}
</script>
