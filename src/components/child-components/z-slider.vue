<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="z-slider">
    <circle r="51" cx="50" cy="50" :style="[styles]"></circle>
  </svg>
</template>

<script>
export default {
  name: 'z-slider',
  props: ['progress'],
  data () {
    return {
      componentType: this.$options.name
    }
  },
  computed: {
    styles () {
      const zwidth = this.$parent.size
      let strokeWidth = 8
      if (zwidth === 'xxl') {
        strokeWidth = 3
      } else if (zwidth === 'large' || zwidth === 'xl') {
        strokeWidth = 7
      } else if (zwidth === 'small') {
        strokeWidth = 9
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        strokeWidth = 10
      } else if (zwidth === 'xxs') {
        strokeWidth = 11
      }

      const circleLength = 2 * Math.PI * 51
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        strokeDasharray: circleLength,
        strokeDashoffset: circleLength - (this.progress * circleLength / 100),
        strokeWidth
      }
    }
  }
}
</script>
