<template>
  <section>

        <component :is="past"></component>
<component :is="previous"></component>

    
      <z-transition>

          <component v-if="$zircleStore.state.router === false" :is="current" :key="$zircleStore.state.currentView"></component>

          <router-view v-if="$zircleStore.state.router === true"> </router-view>

      </z-transition>



      

  </section>

</template>

<script>
/* eslint-disable no-new */
export default {
  name: 'z-view-manager',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    current () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.currentView) {
          return k
        }
      })
      return this.list[key]
    },
    previous () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.previousView) {
          return k
        }
      })
      return this.list[key]
    },
    past () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.pastView) {
          return k
        }
      })
      return this.list[key]
    }
  }
}
</script>
