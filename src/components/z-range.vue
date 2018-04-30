<template>
  <section :type="type">
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg" 
      class="scroll" 
      @click="point">
        <circle 
          r="50"
          cx="50"cy="50"
          :style="[styles]">
        </circle>
    </svg>
    <svg 
      v-show="hidden === false"
      xmlns="http://www.w3.org/2000/svg"
      class="scroll2"
      :style="[classesContent3]"
      @touchstart="drag = true"
      @touchmove.prevent="slide1" 
      @touchend="drag = false"
      @mousedown="drag = true" 
      @mousemove="slide1" 
      @mouseup="drag = false">
        <circle 
          r="8"
          cx="20"
          cy="20"
          class="handlebar">
        </circle> 
    </svg>
    <div class="z-content">
        {{Math.round((anglex / 360) * 100, 0)}}
    </div>
  </section>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  props: ['progress'],
  name: 'z-range',
  data () {
    return {
      type: 'range',
      drag: false,
      anglex: (this.progress * 360) / 100,
      duration: '0s',
      previousAngle: 0,
      hidden: false
    }
  },
  computed: {
    positionr () {
      var zwidth = this.$zircle.getComponentWidth(this.$parent.size)
      if (zwidth === 'extralarge') {
        var dimension = this.state.zircleWidth.xl
        var strokeWidth = 3
      } else if (zwidth === 'large') {
        dimension = this.state.zircleWidth.l
        strokeWidth = 7
      } else if (zwidth === 'medium') {
        dimension = this.state.zircleWidth.m
        strokeWidth = 8
      } else if (zwidth === 'small') {
        dimension = this.state.zircleWidth.s
        strokeWidth = 9
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        dimension = this.state.zircleWidth.xs
        strokeWidth = 10
      } else if (zwidth === 'xxs') {
        dimension = this.state.zircleWidth.xxs
      }
      if (this.$parent.type === 'panel') {
        dimension = this.state.zircleWidth.xl
        strokeWidth = 3
      }
      return {
        X: (dimension / 2) * Math.cos(this.anglex * (Math.PI / 180)),
        Y: (dimension / 2) * Math.sin(this.anglex * (Math.PI / 180)),
        arc: (Math.PI * 100) * ((this.anglex - 360) / 360),
        strokeWidth: strokeWidth
      }
    },
    styles () {
      // progress circle
      var circleLength = 2 * Math.PI * 50
      // progress circle
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg)',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -this.positionr.arc,
        strokeWidth: this.positionr.strokeWidth
      }
    },
    classesContent3 () {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.positionr.X + 'px, ' + this.positionr.Y + 'px, 0px)'
      }
    }
  },
  methods: {
    point (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      const dimensions = this.$el.querySelector('.scroll').getBoundingClientRect()
      var centerx = (dimensions.width / 2) + dimensions.left
      var centery = (dimensions.height / 2) + dimensions.top
      var posx = e.pageX
      var posy = e.pageY
      var deltay = centery - posy
      var deltax = centerx - posx
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
      tangle -= 180
      tangle = Math.round(tangle)
      // console.log(tangle)
      if (tangle < 0) {
        tangle = 360 + tangle
      }
      var previousAngle = this.anglex
      var vm = this
      var id = setInterval(frame, 0)
      function frame () {
        if (previousAngle === tangle) {
          clearInterval(id)
        } else {
          if (previousAngle > tangle) {
            previousAngle--
          } else {
            previousAngle++
          }
          vm.anglex = previousAngle
        }
      }
    },
    slide1 (e) {
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
        tangle -= 180
        tangle = Math.round(tangle)
        if (tangle < 0) {
          tangle = 360 + tangle
        }
        this.anglex = tangle
      }
    }
  },
  updated () {
    this.$nextTick(function () {
      if (this.$parent.$el.classList.contains('prevclass') || this.$parent.$el.classList.contains('pastclass')) {
        this.hidden = true
      } else {
        this.hidden = false
      }
    })
  }
}
</script>

