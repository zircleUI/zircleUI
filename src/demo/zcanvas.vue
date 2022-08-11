<template>
  <z-view size="xl">
    Z-CANVAS
    <template #extension>
      <z-spot
        size="xs"
        :angle='45'
        to-view='docs'
        class=''
        label='Docs'>
        <i class='fas fa-book'></i>
      </z-spot>
      <z-spot
        size="xs"
        square
        button
        :angle='135'
        class=''
        label='Github'
        @click="openUrl">
        <i class='fab fa-github'></i>
      </z-spot>
       <z-spot
        size="xs"
        :angle='270'
        to-view='components'
        class=''
        label='Components'>
        <i class='fas fa-book'></i>
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
