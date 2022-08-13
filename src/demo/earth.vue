<template>
  <z-view size="xxl"
  image-path="./earth.png"
  class="transparent">
    <z-spot
      slot="extension"
      size="m"
      :distance='160'
      class="transparent"
      @mouseover.native="pause"
      @mouseleave="start"
      to-view="moon"
      :angle='moon'
      label="moon"
      image-path='./moon.png'>
    </z-spot>
  </z-view>
</template>
<script>
export default {
  data () {
    return {
      knob: 48,
      dialog: true,
      orbit: { qty: 56, unit: '˚', min: 0, max: 360 },
      earth: 60,
      moon: 160,
      paused: false
    }
  },
  methods: {
    hide () {
      const panel = document.querySelector('.panel')
      panel.style.display = 'none'
      panel.innerHTML = ''
    },
    show () {
      const panel = document.querySelector('.panel')
      panel.style.display = 'block'
      const text = `
      <b>Characteristics of Earth</b><br>
      <b>Mass:</b> 5,972,190,000,000,000 billion kg<br>
      <b>Equatorial Circumference:</b>40,030 km<br>
      <b>Equatorial Diameter:</b> 12,756 km<br>
      <b>Orbit Distance:</b> 149,598,262 km (1 AU)<br>
      <b>Orbit Period:</b> 365.26 Earth days<br>
      <b>Surface Temperature:</b> -88 to 58° C<br><br>

      <a href='https://theplanets.org/earth/' target='_blank'>Source</a>
      `
      panel.innerHTML = text
    },
    pause () {
      this.paused = !this.paused
    },
    start () {
      let start
      const Animacion1 = (relojInterno) => {
        if (!start) start = relojInterno
        this.moon = (relojInterno / 80) * (this.knob / 15) - start
        if (!this.paused) window.requestAnimationFrame(Animacion1)
      }
      window.requestAnimationFrame(Animacion1)
    }
  },
  mounted () {
    this.start()
    setTimeout(() => {
      this.show()
    }, 1500)
  },
  destroyed () {
    this.hide()
  }
}
</script>
