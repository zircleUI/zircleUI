<template>
   <z-transition>
    
      <component 
        v-if="$zircle.getHistoryLength() >= 3" 
        class="pastclass"
        :is="pastView" 
        :key="$zircle.getPastViewName()" />
      <component 
        v-if="$zircle.getHistoryLength() >= 2" 
        :is="previousView" 
        class="prevclass"
        :key="$zircle.getPreviousViewName()" />
   
      <component 
        v-if="$zircle.getRouterState() === false && $zircle.getHistoryLength() >= 1"
        :is="currentView" 
        :class="$zircle.getNavigationMode() === '' ? 'currclass' : ''"  
        :key="$zircle.getCurrentViewName()" />
      <router-view 
        v-if="$zircle.getRouterState() === true && $zircle.getHistoryLength() >= 1" 
        :class="$zircle.getNavigationMode() === '' ? 'currclass' : ''" 
        :key="$zircle.getCurrentViewName()"> 
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
      if (this.$zircle.getRouterState() === false) {
        return this.$zircle.resolveComponent(this.list, this.$zircle.getCurrentViewName())
      }
    },
    previousView () {
      return this.$zircle.resolveComponent(this.list, this.$zircle.getPreviousViewName())
    },
    pastView () {
      return this.$zircle.resolveComponent(this.list, this.$zircle.getPastViewName())
    }
  },
  created () {
    this.$zircle.setComponentList(this.list)
  }
}
</script>
