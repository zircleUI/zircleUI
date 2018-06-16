<template>
  <section>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="z-range-bar"
      @click.self.prevent="point">
        <circle
          r="52"
          cx="50" cy="50"
          :style="[styles]">
        </circle>
    </svg>
    <svg
      v-show="hidden === false"
      xmlns="http://www.w3.org/2000/svg"
      class="z-range-bar-bar"
      :style="circleStyle"
      @touchstart="drag = true"
      @touchmove.prevent="slide1"
      @touchend="drag = false"
      @mousedown="drag = true"
      @mousemove.prevent="slide1"
      @mouseup="drag = false">
        <circle
          r="8"
          cx="20"
          cy="20"
          class="z-range-bar-handlebar">
        </circle>
    </svg>
  </section>
</template>

<script>
import zmixin from '../mixins/z-mixin'
export default {
  name: 'z-range-bar',
  mixins: [zmixin],
  props: ['progress'],
  data () {
    return {
      componentType: this.$options.name,
      drag: false,
      anglex: (this.progress * 360) / 100,
      duration: '0s',
      previousAngle: 0,
      hidden: false
    }
  },
  computed: {
    positionr () {
      var dimension = this.$zircle.getComponentWidth(this.$parent.size) / 2
      if (this.$parent.size === 'extralarge') {
        var strokeWidth = 3
      } else if (this.$parent.size === 'large') {
        strokeWidth = 7
      } else if (this.$parent.size === 'medium') {
        strokeWidth = 8
      } else if (this.$parent.size === 'small') {
        strokeWidth = 9
      } else if (this.$parent.size === 'xs' || this.$parent.size === 'extrasmall') {
        strokeWidth = 10
      }
      if (this.$parent.componentYype === 'z-view') {
        dimension = this.state.zircleWidth.xl
        strokeWidth = 3
      }
      return {
        X: (dimension - 3) * Math.cos(this.anglex * (Math.PI / 180)),
        Y: (dimension - 3) * Math.sin(this.anglex * (Math.PI / 180)),
        arc: (Math.PI * 100) * ((this.anglex - 360) / 360),
        strokeWidth: strokeWidth
      }
    },
    styles () {
      var circleLength = 2 * Math.PI * 50
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg)',
        strokeDasharray: circleLength,
        strokeDashoffset: -this.positionr.arc,
        strokeWidth: this.positionr.strokeWidth
      }
    },
    circleStyle () {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.positionr.X + 'px, ' + this.positionr.Y + 'px, 0px)'
      }
    }
  },
  methods: {
    point (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      const dimensions = this.$el.querySelector('.z-range-bar').getBoundingClientRect()
      var centerx = (dimensions.width / 2) + dimensions.left
      var centery = (dimensions.height / 2) + dimensions.top
      var posx = e.pageX
      var posy = e.pageY
      var deltay = centery - posy
      var deltax = centerx - posx
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
      tangle -= 180
      tangle = Math.ceil(tangle)
      if (tangle < 0) {
        tangle = 360 + tangle
      }
      var previousAngle = Math.ceil(this.anglex)
      var vm = this
      var id = setInterval(frame, 0)
      function frame () {
        if (previousAngle > tangle) {
          previousAngle--
        } else if (previousAngle < tangle) {
          previousAngle++
        } else {
          clearInterval(id)
        }
        vm.anglex = previousAngle
        vm.$emit('rangeVal', Math.ceil((previousAngle / 360) * 100))
      }
    },
    slide1 (e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e
        const dimensions = this.$el.querySelector('.z-range-bar').getBoundingClientRect()
        var centerx = (dimensions.width / 2) + dimensions.left
        var centery = (dimensions.height / 2) + dimensions.top
        var posx = e.pageX
        var posy = e.pageY
        var deltay = centery - posy
        var deltax = centerx - posx
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
        tangle -= 180
        tangle = Math.ceil(tangle)
        if (tangle < 0) {
          tangle = 360 + tangle
        }
        this.anglex = tangle
        this.$emit('rangeVal', Math.round((tangle / 360) * 100))
      }
    }
  }
}
</script>
