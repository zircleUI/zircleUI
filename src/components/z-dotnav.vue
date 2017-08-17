<template>
 <section title="z-dotnav">
  <div class="zui disc" :type="type" :class="[classes]"  :style="styles"> 
  <div class="navplate" ></div>
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
  name: 'z-disc',
  mixins: [zmixin],
  props: {
    type: {
      type: String,
      default: 'pagination'
    },
    total: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
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
          zwidth = this.state.zircleWidth.xxs / 3
          break
      }
      return {
        width: zwidth + 'px',
        height: zwidth + 'px',
        margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      }
    }
  },
  methods: {
  }
}
// trabajar con la escala y el grosor de las lineas para que sean uniformes aunque tenga diferentes tamanos
</script>

<style>

</style>
