<template>
  <div title="z-button" type="button" class="zui disc button" :class="[classes, colors]" :style="style.main"> 
    <div class="z-content">
      <slot></slot>
    </div>
    <section class="z-content label" :style="style.label">
      <slot name="label" ></slot>
    </section>
    <slot name="circles"></slot>
  </div>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  name: 'z-button',
  data () {
    return {
      type: 'button'
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
          zwidth = this.state.zircleWidth.xxs
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
          top: zwidth / 2 + 10 + 'px',
          fontSize: '14px',
          overflow: 'visible'
        }
      }
    }
  }
}
</script>

