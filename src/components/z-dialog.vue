<template>
  <transition name="z-dialog-transition">
    <div
      class="z-shape is-extension"
      :class="[componentType, classes, colors]"
      :style="styles.main">
        <z-slider :progress="progress"></z-slider>
        <div class="z-outer-circle" :style="styles.plate"></div>
        <div class="z-content">
            <slot></slot>
        </div>
      <slot name="extension"></slot>
    </div>
  </transition>
</template>

<script>
import zmixin from '../mixins/z-mixin'
export default {
  name: 'z-dialog',
  mixins: [zmixin],
  data () {
    return {
      componentType: this.$options.name,
      progress: 0
    }
  },
  computed: {
    styles () {
      var zwidth = this.$zircle.getComponentWidth('xxl')
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
  methods: {
    close () {
      this.$zircle.setDialog(false)
    }
  },
  mounted () {
    var id = setInterval(frame, 300)
    var vm = this
    function frame () {
      if (vm.progress >= 101) {
        clearInterval(id)
        vm.close()
      } else {
        vm.progress += 10
      }
    }
  }
}
</script>
