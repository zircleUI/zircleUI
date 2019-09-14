<template>
  <transition name="z-dialog-transition">
    <div
      class="z-shape is-extension primary"
      :class="[componentType, shape]"
      :style="styles.main">
        <div v-if="$slots['image'] || imagePath" class="z-content">
          <img v-if="imagePath" :src="imagePath" width="100%" height="100%" />
          <slot v-if="!imagePath" name="image"></slot>
        </div>
        <div class="z-outer-circle" :class="[shape]" :style="styles.plate"></div>
        <z-slider v-if="selfCloseEnabled" :progress="progress"></z-slider>
        <z-scroll v-if="scrollBarEnabled" :scrollVal.sync="scrollVal" style="overflow: visible;"/>
        <div class="z-content maincontent" ref="maincontent" :class="[shape, longContent, firefoxScroll]" @scroll.passive="scroll">
          <div ref="ztext">
            <slot></slot>
          </div>
        </div>
        <div v-if="$slots['media']" :class="[shape]" class="z-content" style="z-index: 60">
          <slot name="media" ></slot>
        </div>
      <slot name="extension"></slot>
    </div>
  </transition>
</template>

<script>
import ZSlider from './child-components/z-slider'
import ZScroll from './child-components/z-scroll'
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
    circle: {
      type: [Boolean],
      default: false
    },
    imagePath: {
      type: [String]
    },
    square: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    ZSlider,
    ZScroll
  },
  data () {
    return {
      componentType: this.$options.name,
      progress: 0,
      scrollVal: -45,
      isMounted: false,
      ffox: false
    }
  },
  computed: {
    scrollBarEnabled () {
      let result
      this.scrollBar === true && this.square === false && this.$zircle.getThemeShape() === 'circle' ? result = true
        : this.scrollBar === true && this.circle === true && this.$zircle.getThemeShape() === 'square' ? result = true
          : result = false
      return result
    },
    scrollBar () {
      var isScrollNeeded = false
      if (this.isMounted === true && this.$refs.ztext.clientHeight > this.$zircle.getComponentWidth(this.size)) {
        isScrollNeeded = true
      }
      return isScrollNeeded
    },
    longContent () {
      return {
        'long-content': this.scrollBarEnabled === true,
        'overflow-square': this.scrollBarEnabled === false
      }
    },
    firefoxScroll () {
      return {
        'z-scroll-disabled-for-firefox': this.scrollBar === true && this.ffox === true
      }
    },
    selfCloseEnabled () {
      let result
      this.selfClose === true && this.square === false && this.$zircle.getThemeShape() === 'circle' ? result = true
        : this.selfClose === true && this.circle === true && this.$zircle.getThemeShape() === 'square' ? result = true
          : result = false
      return result
    },
    shape () {
      return this.circle ? 'is-circle' : this.square ? 'is-square' : ''
    },
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
  methods: {
    scroll () {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent
        this.scrollVal = -45 + ((container.scrollTop * 100 / (container.scrollHeight - container.clientHeight)) * 86 / 100)
      }
    }
  },
  watch: {
    scrollVal () {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent
        container.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (container.scrollHeight - container.clientHeight) / 100
      }
    }
  },
  mounted () {
    if (navigator.userAgent.match('Firefox') && this.scrollBarEnabled) {
      this.$zircle.setLog('Firefox desktop detected. Scroll events disabled')
      this.ffox = true
    }
    setTimeout(() => { this.isMounted = true }, 1000)
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
