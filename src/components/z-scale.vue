<template>

  <div title="z-scale" class="zui disc" :type="type" :class="[classes]" :style="style.main"  @click.stop="move">
    
    <z-range :progress='progress' v-if="range === true"></z-range>

    <z-slider v-if="slider === true" :progress='progress'></z-slider>
    
    <section class="z-content label" :style="style.label" style="overflow: visible;" >
    <slot name="label" ></slot>
  </section>
    
    <div class="z-content">
      <slot name="picture"></slot>
      
      <section>
         <slot></slot>
      </section>
    </div>
    <slot name="circles"></slot>
   </div>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-scale',
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
      default: 'scale'
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
    style () {
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
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        label: {
          top: zwidth / 2 + 10 + 'px'
        }
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
          if (this.state.history.length < 9) {
            if (this.state.router === true) {
              this.state.shadowPosition = position
              // this.store.setAppPos(position)
              this.$router.push({name: go})
            } else {
              this.store.state.mode = 'forward'
              this.store.setAppPos(position)
            }
          } else {
            console.log('Max level of deeph reached')
          }
          // this.$el.style.opacity = 0
        } else {
          console.log('gotoview is not defined')
        }
      }
    }
  }
}
</script>

