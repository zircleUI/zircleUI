<template>
<transition name="popup">
 <section title="popup">
 
  <div type="popup" class="zui pop" :class="[classes]" :style="styles" style="background: none;" @click.stop=""> 
    <z-slider strokeWidth="4px" :progress="progress"></z-slider>
    <div class="plate" style="filter: blur(2px); opacity: 0.65; background-color: #f5f5f5;"></div>
    <div class="contentbox dashed" style="opacity: 0.95; background-color: #fff;">
    <div class=" content" :class="[classesContent]">
      <slot name='content'></slot>
      <p class="bottom"></p>
    </div>
    </div>
    <slot></slot>
    <z-button
    size="xxs"
    :distance="135"
    :angle="-45"
    @click.native="close"
    >
       
          <i class="fa fa-close"></i>
       
    </z-button>
     
  </div>
</section>
</transition>
</template>

<script>
// eliminar props: msg (eso se hace en cada view), ver temitas de slots...
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  name: 'z-popup',
  mounted () {
    var id = setInterval(frame, 300)
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
      type: 'popup',
      scrollBar: false,
      progress: 1
    }
  },
  computed: {
    styles () {
      return {
        width: this.state.zircleWidth.xl + 50 + 'px',
        height: this.state.zircleWidth.xl + 50 + 'px',
        margin: -((this.state.zircleWidth.xl + 50) / 2) + 'px 0 0 ' + -((this.state.zircleWidth.xl + 50) / 2) + 'px',
        transform: 'translate3d(' + this.$parent.position.X + 'px, ' + this.$parent.position.Y + 'px, 0px) scale(' + this.$parent.position.scalei + ')'
      }
    },
    classesContent () {
      return {
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
.popup-enter-active, .popup-leave-active {
  transition: transform 0.3s;
  position: absolute;
  top: 50%; left: 50%;
  z-index: 500;
}
.popup-enter, .popup-leave-to {
  transform: scale(0);
}
</style>
