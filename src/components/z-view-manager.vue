<template>
   <z-transition>
      <component 
        v-if="$zircle.getHistoryLength() >= 3" 
        class="pastclass"
        :is="pastView" 
        :key="$zircle.getPastViewId()" />
      <component 
        v-if="$zircle.getHistoryLength() >= 2" 
        :is="previousView" 
        class="prevclass" 
        :key="$zircle.getPreviousViewId()" />
      <component 
        v-if="$zircle.getRouterState() === false && $zircle.getHistoryLength() >= 1"
        :is="currentView" 
        :class="$zircle.getNavigationMode() === 'forward' ? 'currclass' : ''"  
        :key="$zircle.getCurrentViewId()" />
      <router-view 
        v-if="$zircle.getRouterState() === true && $zircle.getHistoryLength() >= 1" 
        :class="$zircle.getNavigationMode() === 'forward' ? 'currclass' : ''" 
        :key="$zircle.getCurrentViewId()"> 
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
        if (k.toLowerCase() === vm.$zircle.getCurrentViewName()) {
          return k
        }
      })
      if (this.$zircle.getRouterState() === false) {
        return this.list[key]
      }
    },
    previousView () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircle.getPreviousViewName()) {
          return k
        }
      })
      return this.list[key]
    },
    pastView () {
      let vm = this
      let key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircle.getPastViewName()) {
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
