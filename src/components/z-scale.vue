<template>
  <div 
    v-show="$zircle.getComponent_uid() !== _uid"
    title="z-scale"
    class="zui disc"
    :type="type"
    :class="[classes, colors]"
    :style="resize === false ? styles.main : zpos.main"
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
      :style="resize === false ? styles.label : zpos.label"
      style="overflow: visible;">
      <slot name="label"></slot>
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
    }
  },
  data () {
    return {
      resize: false,
      zpos: {}
    }
  },
  computed: {
    gotoviewName () {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase()
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
      if (this.gotoview !== undefined) {
        // Apply moveApp & setNextView
        // seteo el gotoview aca, xq dsp se borra el "this". OJO ver si usar algun hook
        var go = this.gotoviewName
        var position = {
          X: this.position.Xabs,
          Y: this.position.Yabs,
          scale: this.position.scale,
          Xi: this.position.Xi,
          Yi: this.position.Yi,
          scalei: this.position.scalei,
          go: go
        }
        if (this.$zircle.getHistoryLength() < 6) {
          this.$zircle.setNavigationMode('forward')
          this.$zircle.setAppPos(position)
          var vm = this
          vm.$zircle.setComponent_uid(vm._uid)
        } else {
          console.log('Max level of deep reached')
        }
      } else {
        console.log('gotoview is not defined')
      }
    }
  },
  mounted () {
    var zwidth = this.$zircle.getComponentWidth(this.size)
    this.zpos = {
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
  },
  beforeUpdate () {
    if (this.$parent.view.toLowerCase() === this.$zircle.getCurrentViewName()) {
      this.zpos = this.styles
    }
  },
  updated () {
    var vm = this
    this.$nextTick(function () {
      if (vm.$parent.view.toLowerCase() === vm.$zircle.getCurrentViewName()) {
        vm.resize = false
      } else {
        vm.resize = true
      }
    })
  }
}
</script>

