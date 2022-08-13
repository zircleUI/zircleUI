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
    openUrl () {
      window.open('https://github.com/zircleUI/zircleUI', '_blank')
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
      <b>Surface Temperature:</b> 5,500 °C<br>
      <b>Internal Temperature:</b> 15 million °C<br>
      <b>Composition:</b> 72% Hydrogen, 26% Helium<br>
      <b>Energy output:</b> Solar Radiation<br>
      <b>Rotation:</b> 27 days<br>
      <b>Sunlight Travel Time:</b> 8 minutes to reach Earth<br>
      <b>Apparent Magnitude:</b> −26.74<br>
      `
    }
  }
}
</script>
