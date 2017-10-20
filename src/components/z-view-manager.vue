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
  props: ['list'],
  computed: {
    current () {
      return this.list[this.$zircleStore.state.currentView]
    },
    previous () {
      return this.list[this.$zircleStore.state.previousView]
    },
    past () {
      return this.list[this.$zircleStore.state.pastView]
    }
  }
}
</script>
