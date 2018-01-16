<template>
   <z-transition>
      <component 
      v-if="$zircleStore.state.cache.length >= 3" 
      class="pastclass"
      :is="pastView" 
      :key="$zircleStore.state.cache[$zircleStore.state.cache.length - 3].id" />

      <component 
      v-if="$zircleStore.state.cache.length >= 2" 
      :is="previousView" 
      class="prevclass" 
      :key="$zircleStore.state.cache[$zircleStore.state.cache.length - 2].id" />

      <component 
      v-if="$zircleStore.state.isRouterEnabled === false && $zircleStore.state.cache.length >= 1"
      :is="currentView" 
      :class="$zircleStore.state.mode === 'forward' ? 'currclass' : ''"  
      :key="$zircleStore.state.cache[$zircleStore.state.cache.length - 1].id" />

      <router-view 
        v-if="$zircleStore.state.isRouterEnabled === true && $zircleStore.state.cache.length >= 1" 
        :class="$zircleStore.state.mode === 'forward' ? 'currclass' : ''" 
        :key="$zircleStore.state.cache[$zircleStore.state.cache.length - 1].id"> 
      </router-view>

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
    currentView () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.currentView) {
          return k
        }
      })
      if (this.$zircleStore.state.isRouterEnabled === false) {
        return this.list[key]
      }
    },
    previousView () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.previousView) {
          return k
        }
      })
      return this.list[key]
    },
    pastView () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.pastView) {
          return k
        }
      })
      return this.list[key]
    }
  },
  mounted () {
  }
}
</script>
