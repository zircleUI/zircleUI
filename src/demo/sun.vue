<template>
  <z-view
    size="xxl"
    image-path="./sun.png"
    class="transparent">
  </z-view>
</template>

<script>
export default {
  methods: {
    hide () {
      const panel = document.querySelector('.panel')
      panel.style.display = 'none'
      panel.innerHTML = ''
    },
    show () {
      const panel = document.querySelector('.panel')
      panel.style.display = 'block'
      panel.innerHTML = `
      <b>Characteristics of the Sun</b><br>
      <b>Age:</b> 4.6 Billion Years<br>
      <b>Type:</b> Yellow Dwarf (G2V)<br>
      <b>Mass:</b> 1,989,100,000,000,000,000, 000 billion kg (333,060 x Earth)<br>
      <b>Diameter:</b> 1,392,684 km (109 x Earth)<br>
      <b>Circumference at the Equator:</b> 4,370,005.6 km<br>
      <b>Surface Temperature:</b> 5,500 °C<br><br>

      <a href='https://theplanets.org/the-sun/' target='_blank'>Source</a>
      `
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
