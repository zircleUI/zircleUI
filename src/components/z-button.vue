<template>
  <div title="z-button"
    type="button"
    class="zui disc button"
    :class="[classes, colors]"
    :style="responsive === true ? styles.main : zpos.main"> 
    <div class="z-content">
      <slot></slot>
    </div>
    <section 
      class="z-content label"
      :style="responsive === true ? styles.label : zpos.label">
        <slot name="label" ></slot>
    </section>
    <slot name="circles"></slot>
  </div>
</template>

<script>
// mejorar estados y todo
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  inject: ['view'],
  name: 'z-button',
  data () {
    return {
      type: 'button',
      zpos: {}
    }
  },
  computed: {
    responsive () {
      if (this.view === this.$zircle.getCurrentViewName()) {
        this.zpos = this.styles
        return true
      } else {
        return false
      }
    },
    styles () {
      var zwidth = this.$zircle.getComponentWidth(this.size)
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
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
