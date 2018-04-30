<template>
  <transition name="z-alert">
    <div 
      type="alert"
      class="zui pop"
      :class="[classes, colors]"
      :style="styles.main"> 
        <z-slider :progress="progress"></z-slider>
        <div class="z-popup-plate" :style="styles.plate"></div>
        <div class="z-contentbox dashed">
        <div class="z-content">
          <section>
            <slot></slot>
          </section>
        </div>
      </div>
      <slot name="circles"></slot>
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
      scrollBar: false,
      progress: 1
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
          width: zwidth + 150 + 'px',
          height: zwidth + 150 + 'px',
          margin: -((zwidth + 150) / 2) + 'px 0 0 ' + -((zwidth + 150) / 2) + 'px'
        }
      }
    }
  },
  methods: {
    close () {
      this.progress = 100
      this.$zircle.setAlert(false)
    }
  },
  mounted () {
    var id = setInterval(frame, 100)
    var vm = this
    function frame () {
      if (vm.progress >= 100) {
        clearInterval(id)
        vm.progress = 1
        vm.close()
      } else {
        vm.progress++
      }
    }
  }
}
</script>
