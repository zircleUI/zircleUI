<template>
  <transition-group :name="$zircle.getNavigationMode() === 'forward' ? 'z-next' : 'z-prev'" tag="section">
    <component
      v-for="view in views"
      :is="view.component"
      :class="{
        'is-current-view': $zircle.getCurrentViewName() === view.name,
        'is-previous-view': $zircle.getPreviousViewName() === view.name,
        'is-past-view': $zircle.getPastViewName() === view.name
      }"
      :key="view.uniqueKey">
    </component>
  </transition-group>
</template>
<script>
export default {
  name: 'z-view-manager',
  computed: {
    views () {
      return this.$zircle.getHistory().slice(-3)
    }
  }
}
</script>
