<template>
  <div
    class="z-shape primary"
    :class="[componentType]"
    :style="responsive === true ? styles.main : zpos.main"
    style="overflow: visible;"
    @animationend="notify"
    @mouseover = "$zircle.allowBackwardNavigation(true)"
    @mouseleave = "$zircle.allowBackwardNavigation(false)">
    <div :id="fullView" v-if="$slots['image'] || imagePath" class="z-content">
      <img v-if="imagePath" :src="imagePath" width="100%" height="100%" />
      <slot v-if="!imagePath" name="image"></slot>
    </div>
    <section style="opacity: 0" :style="animation">
      <div class="z-outer-circle"  :style="responsive === true ? styles.plate : zpos.plate"></div>
      <z-scroll v-if="scrollBar" :scrollVal.sync="scrollVal" style="overflow: visible;"/>
      <z-slider v-if="slider === true" :progress='progress'/>
      <div v-if="label" class="z-label" :class="labelPos">
        <div class="inside">
          {{label}}
        </div>
      </div>
      <div class="z-content maincontent" ref="maincontent" :class="[longContent, firefoxScroll]" @scroll.passive="scroll">
        <div ref="ztext">
          <slot></slot>
        </div>
      </div>
      <div v-if="$slots['media']" class="z-content" style="z-index: 60">
        <slot name="media" ></slot>
      </div>
     <slot name="extension"></slot>
   </section>
  </div>
</template>

<script>
import ZSlider from './child-components/z-slider'
import ZScroll from './child-components/z-scroll'
export default {
  name: 'z-view',
  props: {
    distance: {
      type: Number,
      default: 0
    },
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'xxl'
    },
    label: {
      type: [String, Number]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imagePath: {
      type: [String]
    },
    progress: {
      type: Number,
      default: 0
    },
    slider: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    ZScroll,
    ZSlider
  },
  data () {
    return {
      componentType: this.$options.name,
      scrollVal: -45,
      zpos: {},
      isMounted: false,
      ffox: false,
      fullView: this.$zircle.getNavigationMode() === 'forward' ? this.$zircle.getCurrentViewName() : this.$zircle.getPastViewName()
    }
  },
  provide () {
    return {
      view: this.fullView
    }
  },
  computed: {
    position () {
      return this.$zircle.calcViewPosition(this.fullView)
    },
    scrollBar () {
      var isScrollNeeded = false
      if (this.isMounted === true && this.fullView === this.$zircle.getCurrentViewName() && this.$refs.ztext.clientHeight > this.$zircle.getComponentWidth(this.size)) {
        isScrollNeeded = true
      }
      return isScrollNeeded
    },
    responsive () {
      if (this.fullView === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles
        return true
      } else {
        return false
      }
    },
    styles () {
      var width = this.$zircle.getComponentWidth(this.size)
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: width + 75 + 'px',
          height: width + 75 + 'px',
          margin: -((width + 75) / 2) + 'px 0 0 ' + -((width + 75) / 2) + 'px'
        }
      }
    },
    animation () {
      if (this.fullView === this.$zircle.getCurrentViewName() && this.$zircle.getNavigationMode() === 'forward') {
        var zstyle = 'opacity: 1; transition: opacity 1000ms linear;'
      } else if (this.fullView === this.$zircle.getCurrentViewName() && this.$zircle.getNavigationMode() !== 'forward') {
        zstyle = 'opacity: 1;'
      } else {
        zstyle = 'opacity: 0; transition: opacity 500ms linear;'
      }
      return zstyle
    },
    longContent () {
      return {
        'long-content': this.scrollBar === true
      }
    },
    firefoxScroll () {
      return {
        'z-scroll-disabled-for-firefox': this.scrollBar === true && this.ffox === true
      }
    }
  },
  methods: {
    notify () {
      if (this.$zircle.getHistoryLength() === 1) this.$zircle.setNavigationMode('')
    },
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
    if (navigator.userAgent.match('Firefox')) {
      this.$zircle.setLog('Firefox desktop detected. Scroll events disabled')
      this.ffox = true
    }
    this.zpos = this.styles
    var vm = this
    setTimeout(function () {
      vm.isMounted = true
    }, 1000)
  }
}
</script>
