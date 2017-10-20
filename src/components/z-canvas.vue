<template>
  <div id="z-container" @click.stop="goback" :class="$zircleStore.state.theme" :style="[state.previousView !== '' ? {cursor: 'zoom-out'} : {}]">
    <div id="z-point">
     <slot> </slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-new */
import store from '../store/store'
export default {
  data () {
    return {
      state: store.state,
      store: store
    }
  },
  methods: {
    goback () {
      if (this.store.state.router === true && this.store.state.previousView !== '') {
        this.$router.back()
      }
      if (this.store.state.router === false) {
        this.store.goBack()
      }
    }
  },
  mounted () {
    var vue = this
    // seteo inicial de posiciom de circilos responsives pasarlo a store!!!
    this.store.getDimensions()
    // dynamic posiciom de circilos responsives
    window.addEventListener('resize', function (event) {
      vue.store.getDimensions(event)
    })
  }
}
</script>
