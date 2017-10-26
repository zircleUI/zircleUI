<template>

 <transition name="z-alert">
  <div type="alert" class="zui pop" :class="[classes, colors]" :style="styles.main"> 
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
  },
  data () {
    return {
      type: 'alert',
      scrollBar: false,
      progress: 1
    }
  },
  computed: {
    styles () {
      return {
        main: {
          width: this.state.zircleWidth.xl + 50 + 'px',
          height: this.state.zircleWidth.xl + 50 + 'px',
          margin: -((this.state.zircleWidth.xl + 50) / 2) + 'px 0 0 ' + -((this.state.zircleWidth.xl + 50) / 2) + 'px'
        },
        plate: {
          width: this.state.zircleWidth.xl + 150 + 'px',
          height: this.state.zircleWidth.xl + 150 + 'px',
          margin: -((this.state.zircleWidth.xl + 150) / 2) + 'px 0 0 ' + -((this.state.zircleWidth.xl + 150) / 2) + 'px'
        }
      }
    }
  },
  methods: {
    close () {
      this.progress = 100
      this.state.alert = false
    }
  }
}
</script>

<style>
.z-alert-enter-active, .z-alert-leave-active {
  transition: transform 0.3s;
  position: absolute;
  top: 50%; left: 50%;
  z-index: 500;
}
.z-alert-enter, .z-alert-leave-to {
  transform: scale(0);
}
</style>
