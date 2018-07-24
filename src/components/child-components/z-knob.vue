<template>
  <section>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="z-range-bar"
      ref="bar"
      @click="bar">
        <circle
          r="52"
          cx="50" cy="50"
          :style="[styles]">
        </circle>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="z-range-bar-bar"
      :style="circleStyle"
      @touchstart="drag = true"
      @touchmove.prevent="handleBar"
      @touchend="drag = false"
      @mousedown="drag = true"
      @mousemove.prevent="handleBar"
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
export default {
  name: 'z-knob',
  props: ['progress'],
  data () {
    return {
      componentType: this.$options.name,
      drag: false,
      angle: 0,
      prevAngle: 0
    }
  },
  computed: {
    position () {
      var dimension = this.$zircle.getComponentWidth(this.$parent.size) / 2
      return {
        X: (dimension - 3) * Math.cos(this.angle * (Math.PI / 180)),
        Y: (dimension - 3) * Math.sin(this.angle * (Math.PI / 180)),
        arc: (Math.PI * 100) * ((this.angle - 360) / 360)
      }
    },
    styles () {
      var circleLength = 2 * Math.PI * 50
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg)',
        strokeDasharray: circleLength,
        strokeDashoffset: -this.position.arc,
        strokeWidth: 11
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
    bar (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      const dimensions = this.$refs.bar.getBoundingClientRect()
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
      var prevAngle = Math.round(this.angle)
      var vm = this
      var id = setInterval(frame, 0)
      function frame () {
        if (prevAngle > tangle) {
          prevAngle--
        } else if (prevAngle < tangle) {
          prevAngle++
        } else {
          clearInterval(id)
        }
        vm.angle = prevAngle
        var max = 100
        var min = 0
        if (typeof vm.progress === 'object') {
          vm.progress.max === undefined ? max = 100 : max = vm.progress.max
          vm.progress.min === undefined ? min = 0 : min = vm.progress.min
        }
        vm.$emit('update:rangeVal', Math.round((prevAngle / 360) * (max - min)) + min)
      }
    },
    handleBar (e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e
        const dimensions = this.$refs.bar.getBoundingClientRect()
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
        this.angle = tangle
        var max = 100
        var min = 0
        if (typeof this.progress === 'object') {
          this.progress.max === undefined ? max = 100 : max = this.progress.max
          this.progress.min === undefined ? min = 0 : min = this.progress.min
        }
        this.$emit('update:rangeVal', Math.round((tangle / 360) * (max - min)) + min)
      }
    }
  },
  mounted () {
    var max = 100
    typeof this.progress === 'object' ? ( 
      this.progress.max === undefined ? max = 100 : max = this.progress.max,
      this.angle = (this.progress.value * 360) / max,
      this.$emit('update:rangeVal', this.progress.value)
      ) : (
      this.angle = (this.progress * 360) / 100,
      this.$emit('update:rangeVal', this.progress)
      )
  }
}
</script>
