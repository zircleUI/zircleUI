<template>
  <z-view style="border-width: 8px;">
    WELCOME TO ZIRCLE UI
    <template #extension>
      <z-spot
        :angle='45'
        to-view='docs'
        class='accent'
        label='Docs'>
        <i class='fas fa-book'></i>
      </z-spot>
      <z-spot
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
      console.log('hola')
      window.open('https://github.com/zircleUI/zircleUI', '_blank')
    }
  }
}
</script>
