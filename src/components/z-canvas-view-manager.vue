<template>
   <z-transition>
      <component v-for="view in views"
      :is="view.component"
      :class="{
        'is-current-view': $zircle.getCurrentViewName() === view.name && $zircle.getRouterState() === false,
        'is-previous-view': $zircle.getPreviousViewName() === view.name,
        'is-past-view': $zircle.getPastViewName() === view.name
      }"
      :key="view.name">
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
  name: 'z-canvas-view-manager',
  props: {
    list: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    views () {
      return this.$zircle.getRouterState() === false ? this.$zircle.getHistory().slice(-3) : this.$zircle.getHistory().slice(-3, -1)
    }
  }
}
</script>
