<template>
  <div id="container" @click.stop="goback">
  <div id="point">
   <slot> </slot>
  </div>
  </div>
</template>

<script>
/* eslint-disable no-new */
import store from '../store/store'
export default {
  components: {
  },
  data () {
    return {
      state: store.state,
      store: store
    }
  },
  computed: {
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

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#container{
  position: fixed;
  height: 100%;
  width: 100%;
  background: radial-gradient(circle, white, #c5c5c5);
}
#point{
 color: #2c3e50;
 font-family: sans-serif;
 font-size: 20px;
 position: fixed;
 top: 50%; left: 50%;
 perspective: 800px;
}

#point a {
  color: #42b983;
  text-decoration: none;
}




</style>
