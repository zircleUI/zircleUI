<template>
  <div 
    :title="'z-panel - ' + viewName" 
    type="panel" 
    class="zui main" 
    :class="[classes, colors]" 
    :style="responsive === true ? styles.main : zpos.main" 
    style="overflow: visible;"
    @mouseover = "$zircle.setBackNav(true)"
    @mouseleave = "$zircle.setBackNav(false)"> 
      <div class="plate" :style="responsive === true ? styles.plate : zpos.plate"></div>
      <z-scroll v-if="scrollBar === true" :scrollVal.sync="scrollVal" style="overflow: visible;"/> 
      <z-slider v-if="slider === true" :progress='progress'/>
      <section class="label" v-if="label || $slots['label']">
        {{label}}
        <slot v-if="!label" name="label"></slot>
      </section>
      <div class="z-content">

        <img v-if="imagesrc" :src="imagesrc" width="100%" height="100%" />
        <slot v-if="!imagesrc" name="image"></slot>
      </div>
      <div class="z-content maindisc" :class="[longtext, ffoxScroll]" @scroll.passive="scroll">
        <slot name="media"></slot>
        <div ref="ztext" class="z-text">
          <slot></slot>
        </div>
      </div>
     <slot name="zircle"></slot>
  </div>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  mixins: [zmixin],
  props: {
    progress: {
      type: Number,
      default: 0
    },
    viewName: {
      type: [String, Number],
      required: true
    },
    slider: {
      type: [Boolean],
      default: false
    }
  },
  name: 'z-panel',
  data () {
    return {
      type: 'panel',
      scrollVal: -45,
      width: 0,
      img: {},
      zpos: {},
      isMounted: false,
      viewID: '',
      ffox: false,
      fullView: this.$zircle.getCurrentViewName()
    }
  },
  provide () {
    return {
      view: this.$zircle.getCurrentViewName()
    }
  },
  computed: {
    scrollBar () {
      var isScrollNeeded = false
      if (this.isMounted === true && this.viewName.toLowerCase() === this.$zircle.getCurrentViewName().split('--')[0] && this.$refs.ztext.clientHeight > this.$zircle.getComponentWidth('xxl')) {
        isScrollNeeded = true
      }
      return isScrollNeeded
    },
    responsive () {
      if (this.fullView === this.$zircle.getCurrentViewName()) {
        this.zpos = this.styles
        return true
      } else {
        return false
      }
    },
    styles () {
      var width = this.$zircle.getComponentWidth('xxl')
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: width + 60 + 'px',
          height: width + 60 + 'px',
          margin: -((width + 60) / 2) + 'px 0 0 ' + -((width + 60) / 2) + 'px'
        }
      }
    },
    longtext () {
      return {
        longtext: this.scrollBar === true
      }
    },
    ffoxScroll () {
      return {
        ffoxScroll: this.scrollBar === true && this.ffox === true
      }
    }
  },
  methods: {
    scroll () {
      if (this.scrollBar === true) {
        var container = this.$el.querySelector('.maindisc')
        this.scrollVal = -45 + ((container.scrollTop * 100 / (container.scrollHeight - container.clientHeight)) * 86 / 100)
      }
    }
  },
  watch: {
    scrollVal () {
      if (this.scrollBar === true) {
        var container = this.$el.querySelector('.maindisc')
        container.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (container.scrollHeight - container.clientHeight) / 100
      }
    }
  },
  mounted () {
    if (navigator.userAgent.match('Firefox')) {
      console.log('Firefox detected. Disable scroll event')
      this.ffox = true
    }
    this.zpos = this.styles
    this.isMounted = true
    if (this.$el.classList.contains('pastclass')) {
      this.viewID = this.$zircle.getPastViewName()
      this.zpos = this.styles
    } else {
      this.viewID = ''
    }
  }
}
</script>

