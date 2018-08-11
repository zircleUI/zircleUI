<template>
  <z-view style="border-width: 8px;">
    WELCOME TO ZIRCLE UI
    <div slot='extension'>
      <z-spot
        slot='extension'
        :angle='45'
        to-view='options'
        class='accent'
        label='Docs'>
        <i class='fas fa-book'></i>
      </z-spot>
      <z-spot
        button
        slot='extension'
        :angle='135'
        class='accent'
        label='Github'
        @click.native="openUrl">
        <i class='fab fa-github'></i>
      </z-spot>
    </div>
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
