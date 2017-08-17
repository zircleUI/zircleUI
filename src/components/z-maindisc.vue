<template>
 <section :title="view">
 
  <div type="maindisc" class="zui main" :class="[classes]" :style="styles" @click.stop="move"> 
    <z-range strokeWidth="4px" :progress='progress' v-if="range === true"></z-range>
    <z-scroll :scrollVal.sync="scrollVal" v-if="scrollBar === true" ></z-scroll>
    <z-slider v-if="slider === true" strokeWidth="4px" :progress='progress'></z-slider>
    <div class="plate"></div>
    <div class="contentbox dashed">
    <div class="content" :class="[classesContent]" @scroll="scroll">
      <slot name='content'></slot>
      
    </div>
    </div>
    <slot></slot>
     
  </div>
</section>
</template>

<script>
// eliminar props: msg (eso se hace en cada view), ver temitas de slots...
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
  name: 'z-maindisc',
  mounted () {
    this.width = this.state.zircleWidth.xl
    var test = this.$el.querySelector('.content>div')
    if (test.clientHeight > this.state.zircleWidth.xl) {
      this.scrollVal = -45
      this.scrollBar = true
    } else {
      this.scrollBar = false
    }
  },
  watch: {
    'scrollVal': function () {
      var test1 = this.$el.querySelector('.content')
      test1.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (test1.scrollHeight - test1.clientHeight) / 100
    },
    'state.zircleWidth.xl': function () {
      var test = this.$el.querySelector('.content>div')
      if (test.clientHeight > this.state.zircleWidth.xl) {
        this.scrollVal = -45
        this.scrollBar = true
      } else {
        this.scrollBar = false
      }
    }
  },
  data () {
    return {
      type: 'maindisc',
      scrollBar: false,
      alertar: '',
      scrollVal: 0,
      width: 0
    }
  },
  computed: {
    styles () {
      if (this.view === this.state.previousView) {
        var W = this.width
      } else {
        W = this.state.zircleWidth.xl
      }
      return {
        width: W + 'px',
        height: W + 'px',
        margin: -(W / 2) + 'px 0 0 ' + -(W / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
      }
    },
    classesContent () {
      return {
        longtext: this.scrollBar === true // ,
        // dashed: this.type === 'maindisc'
      }
    }
  },
  methods: {
    scroll () {
      var test1 = this.$el.querySelector('.content')
      this.scrollVal = -45 + ((test1.scrollTop * 100 / (test1.scrollHeight - test1.clientHeight)) * 86 / 100)
    },
    move () {
      if (this.state.currentView === this.view) {
      } else {
        if (this.state.router === true && this.state.previousView !== '') {
          this.$router.back()
        }
        if (this.state.router === false) {
          this.store.goBack()
        }
      }
    }
  }
}
</script>

<style>

</style>
