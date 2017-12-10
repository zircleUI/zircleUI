<template>
   <z-transition>
      <component :is="past" :key="$zircleStore.state.pastView"></component>
      <component :is="previous" :key="$zircleStore.state.previousView"></component>
      <component v-if="$zircleStore.state.router === false" :is="current" :key="$zircleStore.state.currentView"></component>
      <router-view v-if="$zircleStore.state.router === true" :key="$zircleStore.state.currentView"> </router-view>
  </z-transition>
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
      if (this.$zircleStore.state.currentView === this.$zircleStore.state.previousView || this.$zircleStore.state.currentView === this.$zircleStore.state.pastView) {
        this.$zircleStore.state.currentView = this.$zircleStore.state.currentView + ' 1'
        console.log('repetidoa')
        return this.list[key]
      } else {
        return this.list[key]
      }
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
