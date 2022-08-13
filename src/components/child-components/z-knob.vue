<template>
  <section>
    <svg
      viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="z-range-bar"
      ref="bar"
      @click.prevent="bar">
      <circle r="52" cx="50" cy="50" :style="[styles]"></circle>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg" class="z-range-bar-bar"
      :style="circleStyle"
      @touchstart="drag = true"
      @touchmove.prevent="handleBar"
      @touchend="drag = false"
      @mousedown="drag = true"
      @mousemove.prevent="handleBar"
      @mouseup="drag = false">
      <circle r="8" cx="20" cy="20" class="z-range-bar-handlebar"></circle>
    </svg>
  </section>
</template>

<script>
export default {
  name: 'z-knob',
  props: {
    qty: {
      type: [Number]
    },
    min: {
      type: [Number]
    },
    max: {
      type: [Number]
    },
    pos: {
      type: [String]
    }
  },
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
      const diameter = this.$zircle.getComponentWidth(this.$parent.size) / 2
      return {
        X: (diameter - 3) * Math.cos(this.angle * (Math.PI / 180)),
        Y: (diameter - 3) * Math.sin(this.angle * (Math.PI / 180)),
        arc: (Math.PI * 100) * ((this.angle - 360) / 360)
      }
    },
    styles () {
      const circleLength = 2 * Math.PI * 50
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
  watch: {},
  methods: {
    bar (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      const dimensions = this.$refs.bar.getBoundingClientRect()
      const centerx = (dimensions.width / 2) + dimensions.left
      const centery = (dimensions.height / 2) + dimensions.top
      const posx = e.pageX
      const posy = e.pageY
      const deltay = centery - posy
      const deltax = centerx - posx
      let tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
      tangle -= 180
      tangle = Math.round(tangle)
      if (tangle < 0) tangle = 360 + tangle
      let prevAngle = Math.round(this.angle)
      const id = setInterval(() => {
        if (prevAngle > tangle) {
          prevAngle--
        } else if (prevAngle < tangle) {
          prevAngle++
        } else {
          clearInterval(id)
        }
        this.angle = prevAngle
        this.$emit('update:qty', Math.round((prevAngle / 360) * (this.max - this.min)) + this.min)
      }, 0)
    },
    handleBar (e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e
        const dimensions = this.$refs.bar.getBoundingClientRect()
        const centerx = (dimensions.width / 2) + dimensions.left
        const centery = (dimensions.height / 2) + dimensions.top
        const posx = e.pageX
        const posy = e.pageY
        const deltay = centery - posy
        const deltax = centerx - posx
        let tangle = Math.atan2(deltay, deltax) * (180 / Math.PI)
        tangle -= 180
        tangle = Math.round(tangle)
        if (tangle < 0) tangle = 360 + tangle
        this.angle = tangle
        this.$emit('update:qty', Math.round((tangle / 360) * (this.max - this.min)) + this.min)
      }
    }
  },
  mounted () {
    this.angle = Math.round(((this.qty - this.min) * 360) / (this.max - this.min))
  }
}
</script>
