<template>
  <z-view size="xxl"
  image-path="./moon.png"
  class="transparent">
  </z-view>
</template>
<script>
export default {
  methods: {
    openUrl () {
      window.open('https://github.com/zircleUI/zircleUI', '_blank')
    },
    hide () {
      const panel = document.querySelector('.panel')
      panel.style.display = 'none'
      panel.innerHTML = ''
    },
    show () {
      const panel = document.querySelector('.panel')
      panel.style.display = 'block'
      const text = `
      <b>Characteristics of the Moon</b><br>
      <b>Age:</b> 4.527 Billion Years<br>
      <b>Mass:</b> 73,476,730,924,573,500 million kg (0.0123 x Earth)<br>
      <b>Diameter:</b> 3,475 km<br>
      <b>Circumference at the Equator:</b> 10,917 km<br>
      <b>Surface Temperature:</b> -233 to 123 °C<br><br>

      <a href='https://theplanets.org/the-moon/' target='_blank'>Source</a>
      `
      panel.innerHTML = text
    }
  },
  mounted () {
    setTimeout(() => {
      this.show()
    }, 1500)
  },
  destroyed () {
    this.hide()
  }
}
</script>
