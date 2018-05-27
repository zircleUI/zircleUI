<template>
  <transition name="z-alert">
    <div 
      type="alert"
      class="zui pop"
      :class="[classes, colors]"
      :style="styles.main"> 
        <z-slider :progress="progress"></z-slider>
        <div class="z-popup-plate" :style="styles.plate"></div>
        <div class="z-content">
            <slot></slot>
        </div>
      <slot name="zircle"></slot>
    </div>
  </transition>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  name: 'z-alert',
  data () {
    return {
      type: 'alert',
      progress: 0
    }
  },
  computed: {
    styles () {
      var zwidth = this.$zircle.getComponentWidth('xxl')
      return {
        main: {
          width: zwidth + 50 + 'px',
          height: zwidth + 50 + 'px',
          margin: -((zwidth + 50) / 2) + 'px 0 0 ' + -((zwidth + 50) / 2) + 'px'
        },
        plate: {
          width: zwidth + 180 + 'px',
          height: zwidth + 180 + 'px',
          margin: -((zwidth + 180) / 2) + 'px 0 0 ' + -((zwidth + 180) / 2) + 'px'
        }
      }
    }
  },
  methods: {
    close () {
      this.$zircle.setAlert(false)
    }
  },
  mounted () {
    var id = setInterval(frame, 300)
    var vm = this
    function frame () {
      if (vm.progress >= 101) {
        clearInterval(id)
        vm.close()
      } else {
        vm.progress += 10
      }
    }
  }
}
</script>
