<template>
  <z-view size="xl" square>
    WELCOME TO ZIRCLE UI
    <template #extension>
      <z-spot
        size="xs"
        :angle='45'
        to-view='docs'
        class='accent'
        label='Docs'>
        <i class='fas fa-book'></i>
      </z-spot>
      <z-spot
        size="xs"
        square
        button
        :angle='135'
        class='accent'
        label='Github'
        @click="openUrl">
        <i class='fab fa-github'></i>
      </z-spot>
    </template>
  </z-view>
</template>
<script>
export default {
  methods: {
    openUrl () {
      window.open('https://github.com/zircleUI/zircleUI', '_blank')
    }
  }
}
</script>
