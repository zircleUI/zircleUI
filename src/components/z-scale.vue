<template>
  <div 
    
    title="z-scale"
    class="zui disc"
    :type="type"
    :class="[classes, colors]"
    :style="responsive === true ? styles.main : zpos.main"
    @click.stop="move">
      <z-range 
        :progress='progress'
        v-if="range === true">
      </z-range>
      <z-slider
        v-if="slider === true"
        :progress='progress'>
      </z-slider>
    <section 
      class="z-content label"
      :style="responsive === true ? styles.label : zpos.label"
      style="overflow: visible;">
      <slot name="label"></slot>
    </section>
    <div class="z-content">
      <slot name="picture"></slot>
      <section>
         <slot></slot>
      </section>
    </div>
    <slot name="zircle"></slot>
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
    }
  },
  inject: ['view'],
  data () {
    return {
      zpos: {},
      innerpos: {}
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
          top: zwidth / 2 + 10 + 'px'
        }
      }
    }
  },
  methods: {
    move () {
      var position = {
        X: this.position.Xabs,
        Y: this.position.Yabs,
        scale: this.position.scale,
        Xi: this.position.Xi,
        Yi: this.position.Yi,
        scalei: this.position.scalei
      }
      /* var position1 = {
        X: 0,
        Y: 0,
        scale: 1,
        Xi: 0,
        Yi: 0,
        scalei: 1
      } */
      this.$zircle.setView(this.toView, {
        // set view implica si o si mode forward
        // si el hystory length es > 6 cancel move
        mode: 'forward',
        position: position
      })
      // this.$zircle.setComponent_uid(this._uid)
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>

