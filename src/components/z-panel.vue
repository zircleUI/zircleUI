<template>
 
  <div 
  :title="viewName" 
  type="panel" 
  class="zui main" 
  :class="[classes, colors]" 
  :style="styles.main" 
  style="overflow: visible;" 
  @click.stop="move"> 
    <div class="plate" :style="styles.plate"></div>

    <z-range :progress='progress' v-if="range === true"></z-range>
    
    <z-scroll :scrollVal.sync="scrollVal" v-if="scrollBar === true" style="overflow: visible;"></z-scroll>
    
    <z-slider v-if="slider === true" :progress='progress'></z-slider>
    
    
    
    <div class="z-contentbox dashed" :style="styles.background" >

     
         <slot name="picture"></slot>
    
      
      <div class="z-content maindisc" :class="[classesContent]" :style="styles.hideScroll" @scroll="scroll">
        
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
    },
    imgSource: {
      type: String,
      default: ''
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
      img: {}
    }
  },
  computed: {
    viewName () {
      return this.view.toLowerCase()
    },
    styles () {
      if (this.viewName === this.state.previousView) {
        var W = this.state.zircleWidth.xl
      } else {
        W = this.state.zircleWidth.xl
      }
      return {
        main: {
          width: W + 'px',
          height: W + 'px',
          margin: -(W / 2) + 'px 0 0 ' + -(W / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: W + 50 + 'px',
          height: W + 50 + 'px',
          margin: -((W + 50) / 2) + 'px 0 0 ' + -((W + 50) / 2) + 'px'
        },
        hideScroll: {
          width: W - 10 + 'px'
        },
        background: {
          // backgroundImage: `url(${this.imgSource})`
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
      var test1 = this.$el.querySelector('.z-content')
      this.scrollVal = -45 + ((test1.scrollTop * 100 / (test1.scrollHeight - test1.clientHeight)) * 86 / 100)
    },
    move () {
      if (this.state.previousView === this.viewName) {
        if (this.state.router === true && this.state.previousView !== '') {
          this.$router.back()
        } else {
          this.store.goBack()
        }
      }
      if (this.state.pastView === this.viewName) {
        if (this.state.router === true) {
          this.$router.back()
        } else {
          this.store.goBack()
        }
      }
    }
  },
  watch: {
    scrollVal () {
      var test1 = this.$el.querySelector('.z-content')
      test1.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (test1.scrollHeight - test1.clientHeight) / 100
    }
  },
  mounted () {
    this.width = this.state.zircleWidth.xl
    var test = this.$el.querySelector('.z-content > .z-text') // guarda con esto que no anda bien
    if (test.clientHeight > this.state.zircleWidth.xl) {
      this.scrollBar = true
    } else {
      this.scrollBar = false
    }
  }
}
</script>

