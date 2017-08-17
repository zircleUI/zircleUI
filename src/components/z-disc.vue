<template>
 <section title="z-disc">
  <div class="zui disc" :type="type" :class="[classes]" :style="styles" @click.stop="move"> 
     <z-range strokeWidth="8px" :progress='progress' v-if="range === true"></z-range>
    <z-slider v-if="slider === true" strokeWidth="8px" :progress='progress'></z-slider>
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
    progress: {
      type: Number,
      default: 70
    },
    range: {
      type: [Boolean],
      default: false
    },
    slider: {
      type: [Boolean],
      default: false
    },
    type: {
      type: String,
      default: 'disc'
    },
    total: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'radial'
    },
    id: {
      type: [Number, String]
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
    move () {
      if (this.$parent.view === this.state.previousView) {
        if (this.state.router === true && this.state.previousView !== '') {
          this.$router.back()
        }
        if (this.state.router === false) {
          this.store.goBack()
        }
      } else {
        if (this.gotoview !== undefined) {
          // Apply moveApp & setNextView
          // seteo el gotoview aca, xq dsp se borra el "this". OJO ver si usar algun hook
          var go = this.gotoview
          var position = {
            X: this.position.Xabs,
            Y: this.position.Yabs,
            scale: this.position.scale,
            Xi: this.position.Xi,
            Yi: this.position.Yi,
            scalei: this.position.scalei,
            go: go,
            next: true
          }
          // this.state.position = position
          // console.log('go: ' + go)
          if (this.state.router === true) {
            this.state.shadowPosition = position
            // this.store.setAppPos(position)
            this.$router.push({name: go})
          } else {
            this.store.setAppPos(position)
          }
        } else {
          console.error(' D NO HACE NADA')
        }
      }
    }
  }
}
// trabajar con la escala y el grosor de las lineas para que sean uniformes aunque tenga diferentes tamanos
</script>

<style>

</style>
