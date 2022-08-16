<template>
  <z-view size="xl" square>
    <template #extension>
      <z-spot
        size="xs"
        :angle='45'
        :distance='130'
        to-view='docs'
        class='shade'
        label='doc & resources'>
        <i class="fas fa-question-circle"></i>
      </z-spot>
      <z-spot
        size="m"
        :angle='0'
        :distance='0'
        class="shade"
        to-view='demo'>
        <b>Zoom me</b>
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
