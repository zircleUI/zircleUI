<template>
   <z-transition>
      <component v-for="view in views"
      :is="view.component"
      :class="{
        currclas: $zircle.getCurrentViewName() === view.viewName && $zircle.getRouterState() === false,
        prevclass: $zircle.getPreviousViewName() === view.viewName,
        pastclass: $zircle.getPastViewName() === view.viewName
      }"
      :key="view.viewName">
      </component>
      <router-view
        v-if="$zircle.getRouterState() === true && $zircle.getHistoryLength() >= 1"
        class="currclass"
        :key="$zircle.getCurrentViewName()">
      </router-view>
  </z-transition>
</template>

<script>
/* eslint-disable */
export default {
  name: 'z-view-manager',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    views () {
      var render = this.$zircle.getRouterState() === false ? this.$zircle.getHistory().slice(-3) : this.$zircle.getHistory().slice(-3, -1)
      return render
    }
  },
  created () {
    this.$zircle.setComponentList(this.list)
  }
}
</script>
