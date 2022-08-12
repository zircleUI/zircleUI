<template>
  <z-view size="xl" square>
    <template #extension>
      <z-spot
        size="xs"
        :angle='45'
        :distance='160'
        to-view='docs'
        class='accent'
        label='Docs'>
        <i class='fas fa-book'></i>
      </z-spot>
       <z-spot
        size="m"
        :angle='0'
        :distance='0'
        class="shade"
        to-view='zspot'
        label='click me!'>
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
