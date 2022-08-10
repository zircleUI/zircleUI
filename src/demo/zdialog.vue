<template>
  <z-view size="xl">
    Z-DIALOG
    <template #extension>
      <z-dialog
        v-if="dialog"
        self-close
        @done= "dialog = false">
        self close dialog
    </z-dialog>
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
       <z-spot
        size="xs"
        :angle='270'
        to-view='components'
        class='accent'
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
