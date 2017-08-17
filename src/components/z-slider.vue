<template>
  <svg viewBox="0 0 100 100" version="1.1" class="slider" 
  @mousedown="drag = true" 
  @click="point"
  @mousemove="slide" 
  @mouseup="drag = false">
   
    <circle r="50" cx="50" cy="50"  :style="[styles]"></circle>
   

  </svg>
  
</template>

<script>
// HACER EL STROKE WIDTH AUTOMATICO SEGUN SIZE!
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  props: ['progress', 'strokeWidth'],
  name: 'z-slider',
  data () {
    return {
      type: 'slider',
      drag: false,
      anglex: 0,
      duration: 0.05
    }
  },
  computed: {
    styles () {
      var circleLength = 2 * Math.PI * 50
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: ((100 - this.progress) / 100) * circleLength,
        strokeWidth: this.strokeWidth,
        strokeOpacity: '0.5',
        fill: 'none',
        stroke: 'gray'
      }
    }
  },
  methods: {
    point (e) {
      this.$nextTick(function () {
        this.duration = 1
      })
      const dimensions = this.$el.getBoundingClientRect()
      var centerx = (dimensions.width / 2) + dimensions.left
      var centery = (dimensions.height / 2) + dimensions.top
      var posx = e.x
      var posy = e.y
      var deltay = centery - posy
      var deltax = centerx - posx
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
      tangle -= 180
      tangle = Math.round(tangle)
      // console.log(tangle)
      this.anglex = tangle
      this.$nextTick(function () {
        this.duration = 0.05
      })
    },
    slide (e) {
      if (this.drag === true) {
        const dimensions = this.$el.getBoundingClientRect()
        var centerx = (dimensions.width / 2) + dimensions.left
        var centery = (dimensions.height / 2) + dimensions.top
        var posx = e.x
        var posy = e.y
        var deltay = centery - posy
        var deltax = centerx - posx
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
        tangle -= 180
        tangle = Math.round(tangle)
        console.log(deltax, deltay)
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
