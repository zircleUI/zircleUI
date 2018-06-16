<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="z-slider">
    <circle r="51" cx="50" cy="50"  :style="[styles]"></circle>
  </svg>
</template>

<script>
import zmixin from '../mixins/z-mixin'
export default {
  name: 'z-slider',
  mixins: [zmixin],
  props: ['progress'],
  data () {
    return {
      componentType: this.$options.name,
      drag: false,
      anglex: 0,
      duration: 0.05
    }
  },
  computed: {
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
      if (this.$parent.componentType === 'z-view' || this.$parent.componentType === 'z-dialog') {
        strokeWidth = 3
      }
      var circleLength = 2 * Math.PI * 50
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        strokeDasharray: circleLength,
        strokeDashoffset: -(Math.PI * 100) * ((this.progress - 100) / 100),
        strokeWidth: strokeWidth
      }
    }
  }
}
</script>
