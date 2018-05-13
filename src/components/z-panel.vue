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
          <section class="z-text">
             <slot></slot>
             <span class="bottom"></span>
          </section>
        </div>
      </div>
     <slot name="circles"></slot>
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
    view: {
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
      scrollBar: false,
      alertar: '',
      scrollVal: -45,
      width: 0,
      img: {},
      zpos: {},
      viewID: ''
    }
  },
  provide () {
    return {
      view: this.viewName
    }
  },
  computed: {
    viewName () {
      return this.view.toLowerCase()
    },
    responsive () {
      if (this.viewName === this.$zircle.getCurrentViewName()) {
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
          width: width + 50 + 'px',
          height: width + 50 + 'px',
          margin: -((width + 50) / 2) + 'px 0 0 ' + -((width + 50) / 2) + 'px'
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
      var container = this.$el.querySelector('.z-content')
      this.scrollVal = -45 + ((container.scrollTop * 100 / (container.scrollHeight - container.clientHeight)) * 86 / 100)
    }
  },
  watch: {
    scrollVal () {
      var container = this.$el.querySelector('.z-content')
      container.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (container.scrollHeight - container.clientHeight) / 100
    }
  },
  mounted () {
    if (this.$el.classList.contains('pastclass')) {
      this.viewID = this.$zircle.getPastViewName()
    }
    var width = this.$zircle.getComponentWidth('xxl')
    this.zpos = this.styles
    var container = this.$el.querySelector('.z-content > .z-text')
    if (container.clientHeight > width) {
      this.scrollBar = true
    } else {
      this.scrollBar = false
    }
  }
}
</script>

