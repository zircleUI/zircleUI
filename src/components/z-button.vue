<template>
 <section title="z-button">
  <div class="zui disc" :class="[classes]" :style="styles"> 
    <div class="content">
      <slot></slot>
    </div>
  </div>
</section>
</template>

<script>
// eliminar props: msg (eso se hace en cada view), ver temitas de slots...
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  // props: ['label'],
  name: 'z-button',
  data () {
    return {
      type: 'button'
    }
  },
  computed: {
    styles () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m
          break
        case 'small':
          zwidth = this.state.zircleWidth.s
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs
          break
      }
      return {
        width: zwidth + 'px',
        height: zwidth + 'px',
        margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      }
    }
  }
}
// trabajar con la escala y el grosor de las lineas para que sean uniformes aunque tenga diferentes tamanos
</script>

<style>
  
</style>
