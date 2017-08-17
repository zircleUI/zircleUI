<template>
 <transition
  :name='name' 
  :mode="mode"
  :css="false"
  @before-enter="beforeEnter"
  @enter="enter"
  >
      <slot></slot>
 </transition>
</template>

<script>
import store from '../store/store'
export default {
  props: ['name'],
  data () {
    return {
      state: store.state,
      store: store
    }
  },
  computed: {
    direction () {
      return this.state.mode
    },
    mode () {
      if (this.direction === 'forward') {
        return 'out-in'
      } else {
        return 'in-out'
      }
    }
  },
  methods: {
    beforeEnter (el) {
      if (this.name === 'zuit') {
        if (this.direction === 'forward') {
          if (el.title === this.state.currentView) {
            el.style.opacity = 0
          }
        } else {
          if (el.title === this.state.currentView) {
            el.style.opacity = 0
          }
        }
      }
    },
    enter (el, done) {
      var point = document.querySelector('#point')
      if (this.name === 'zuit') {
        if (this.direction === 'forward') {
          if (el.title === this.state.currentView) {
            el.style.opacity = 1
          }
          point.style.transformStyle = 'preserve-3d'
          point.style.transitionDuration = '.5s'
          point.style.transitionTimingFunction = 'cubic-bezier(1, .04, .94, .93)' // 'cubic-bezier(0,0,.39,0)'
          point.style.transform = 'scale3d(' + this.state.position.scale + ', ' + this.state.position.scale + ', ' + this.state.position.scale + ') translate3d(' + this.state.position.Xi + 'px, ' + this.state.position.Yi + 'px, 0px)'
          done()
        } else {
          if (el.title === this.state.currentView) {
            el.style.opacity = 1
          }
          point.style.transformStyle = 'preserve-3d'
          point.style.transitionDuration = '.6s'
          point.style.transitionTimingFunction = 'ease-in-out'
          point.style.transform = 'scale3d(' + this.state.position.scale + ', ' + this.state.position.scale + ', ' + this.state.position.scale + ') translate3d(' + this.state.position.Xi + 'px, ' + this.state.position.Yi + 'px, 0px)'
          done()
        }
      }
    }
  }
}
</script>
<style>

</style>
