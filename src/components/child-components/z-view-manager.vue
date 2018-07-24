<template>
   <transition-group :name="$zircle.getNavigationMode() === 'forward' ? 'z-next' : 'z-prev'" tag="section">
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
        class="is-current-view"
        :key="$zircle.getCurrentViewName()">
      </router-view>
  </transition-group>
</template>
<script>
/* eslint-disable */
export default {
  name: 'z-view-manager',
  computed: {
    views () {
      return this.$zircle.getRouterState() === false ? this.$zircle.getHistory().slice(-3) : this.$zircle.getHistory().slice(-3, -1)
    }
  }
}
</script>
