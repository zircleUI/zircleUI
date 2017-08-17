<template>
<section>
  <svg viewBox="0 0 100 100" version="1.1" class="scroll" @click="point">
   
    <circle r="50" cx="50" cy="50"  :style="[styles]"  ></circle>
  </svg>
  <svg version="1.1" class="scroll2" :style="[classesContent3]" 
  @touchstart="drag = true"
  @touchmove.prevent="slide1" 
  @touchend="drag = false"
  @mousedown="drag = true" 
  @mousemove="slide1" 
  @mouseup="drag = false"
  >
   <circle r="5" cx="20" cy="20" class="handlebar" 
    ></circle> 
  </svg>
  <div class="content">
      {{Math.round((anglex / 360) * 100, 0)}}
    </div>
  
  </section>
</template>

<script>
// HACER EL STROKE WIDTH AUTOMATICO SEGUN SIZE!
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  props: ['progress', 'strokeWidth'],
  name: 'z-range',
  data () {
    return {
      type: 'range',
      drag: false,
      anglex: (this.progress * 360) / 100,
      duration: 0,
      previousAngle: 0
    }
  },
  computed: {
    positionr () {
      if (this.$parent.size === 'extralarge') {
        var dimension = this.state.zircleWidth.xl
      } else if (this.$parent.size === 'large') {
        dimension = this.state.zircleWidth.l
      } else if (this.$parent.size === 'medium') {
        dimension = this.state.zircleWidth.m
      } else if (this.$parent.size === 'small') {
        dimension = this.state.zircleWidth.s
      } else if (this.$parent.size === 'xs' || this.$parent.size === 'extrasmall') {
        dimension = this.state.zircleWidth.xs
      } else if (this.$parent.size === 'xxs') {
        dimension = this.state.zircleWidth.xxs
      }
      if (this.$parent.type === 'maindisc') {
        dimension = this.state.zircleWidth.xl
      }
      return {
        X: (dimension / 2.04) * Math.cos(this.anglex * (Math.PI / 180)),
        Y: (dimension / 2.04) * Math.sin(this.anglex * (Math.PI / 180)),
        arc: (Math.PI * 100) * ((this.anglex - 360) / 360)
      }
    },
    styles () {
      // progress circle
      var circleLength = 2 * Math.PI * 50
      // progress circle
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg)',
        transitionDuration: this.duration,
        transitionTimingFunction: 'ease-in-out',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -this.positionr.arc,
        strokeWidth: 8,
        strokeOpacity: '0.5',
        fill: 'none',
        stroke: 'red'
      }
    },
    classesContent3 () {
      // progress circle
      // circle.style.strokeDashoffset = pct
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.positionr.X + 'px, ' + this.positionr.Y + 'px, 0px)',
        transitionDuration: this.duration,
        transitionTimingFunction: 'ease-in-out',
        fill: 'red'
      }
    }
  },
  methods: {
    point (e) {
      this.$nextTick(function () {
        this.duration = '0s'
      })
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
      var id = setInterval(frame, 5)
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
      // this.anglex = this.previousAngle
    },
    slide1 (e) {
      this.duration = '0s'
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
  }
}
</script>

<style scoped>

.handlebar:hover {
cursor: grab;
}
.handlebar:active {
cursor: grabbing;
}


</style>
