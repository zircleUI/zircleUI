<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="slider">
   
    <circle r="50" cx="50" cy="50"  :style="[styles]"></circle>
   
  </svg>
  
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  props: ['progress'],
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
    // getComponentWidth(this.size)
    styles () {
      var zwidth = this.$parent.size
      if (zwidth === 'extralarge') {
        var strokeWidth = 3
      } else if (zwidth === 'large') {
        strokeWidth = 7
      } else if (zwidth === 'medium') {
        strokeWidth = 8
      } else if (zwidth === 'small') {
        strokeWidth = 9
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        strokeWidth = 10
      } else if (zwidth === 'xxs') {
      }
      if (this.$parent.type === 'panel' || this.$parent.type === 'alert') {
        strokeWidth = 3
      }
      var circleLength = 2 * Math.PI * 50
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        // transition: 'stroke-dashoffset .3s ease-in-out',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -(Math.PI * 100) * ((this.progress - 100) / 100), // ((100 - this.progress) / 100) * circleLength,
        strokeWidth: strokeWidth
      }
    }
  }
}
</script>
