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
      <z-range :progress='progress' v-if="range === true"/> 
      <z-scroll :scrollVal.sync="scrollVal" v-if="scrollBar === true" style="overflow: visible;"/> 
      <z-slider v-if="slider === true" :progress='progress'/>
      <div class="z-contentbox dashed" :style="styles.background">
          <slot name="picture"></slot>
        <div class="z-content maindisc" :class="[classesContent]" :style="responsive === true ? styles.hideScroll : zpos.hideScroll" @scroll="scroll">
          <section ref="ztext" class="z-text">
             <slot></slot>
             <span class="bottom"></span>
          </section>
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
    range: {
      type: [Boolean],
      default: false
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
      alertar: '',
      scrollVal: -45,
      width: 0,
      img: {},
      zpos: {},
      isMounted: false,
      viewID: '',
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
        },
        hideScroll: {
          width: width - 5 + 'px',
          marginLeft: -width * 0.0392 + 3.08 + 'px'
        }
      }
    },
    classesContent () {
      return {
        longtext: this.scrollBar === true
      }
    }
  },
  methods: {
    scroll () {
      if (this.scrollBar === true) {
        var container = this.$el.querySelector('.z-content')
        this.scrollVal = -45 + ((container.scrollTop * 100 / (container.scrollHeight - container.clientHeight)) * 86 / 100)
      }
    }
  },
  watch: {
    scrollVal () {
      if (this.scrollBar === true) {
        var container = this.$el.querySelector('.z-content')
        container.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (container.scrollHeight - container.clientHeight) / 100
      }
    }
  },
  mounted () {
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

