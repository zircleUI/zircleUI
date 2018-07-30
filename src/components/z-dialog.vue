<template>
  <transition name="z-dialog-transition">
    <div
      class="z-shape is-extension primary"
      :class="[componentType]"
      :style="styles.main">
        <z-slider v-if="selfClose" :progress="progress"></z-slider>
        <div class="z-outer-circle" :style="styles.plate"></div>
        <div class="z-content">
            <slot></slot>
        </div>
      <slot name="extension"></slot>
    </div>
  </transition>
</template>

<script>
import ZSlider from './child-components/z-slider'
export default {
  name: 'z-dialog',
  props: {
    selfClose: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'xxl'
    },
  },
  components: {
    ZSlider
  },
  data () {
    return {
      componentType: this.$options.name,
      progress: 0
    }
  },
  computed: {
    styles () {
      var zwidth = this.$zircle.getComponentWidth(this.size)
      return {
        main: {
          width: zwidth + 50 + 'px',
          height: zwidth + 50 + 'px',
          margin: -((zwidth + 50) / 2) + 'px 0 0 ' + -((zwidth + 50) / 2) + 'px'
        },
        plate: {
          width: zwidth + 180 + 'px',
          height: zwidth + 180 + 'px',
          margin: -((zwidth + 180) / 2) + 'px 0 0 ' + -((zwidth + 180) / 2) + 'px'
        }
      }
    }
  },
  mounted () {
    if (this.selfClose) {
      var vm = this
      this.progress = 5
      var id = setInterval(function () {
        if (vm.progress >= 100) {
          clearInterval(id)
          vm.$emit('done')
        } else {
          vm.progress++
        }
      }, 100)
    }
  }
}
</script>
