<template>
  <z-view
    size="xxl"
    image-path="./earth.png"
    class="transparent">
    <template #extension>
      <z-spot
        size="m"
        :distance='160'
        class="transparent"
        @mouseover.native="pause"
        @mouseleave.native="play"
        to-view="moon"
        :angle='moon'
        label="moon"
        image-path='./moon.png'>
      </z-spot>
    </template>
  </z-view>
</template>

<script>
export default {
  data () {
    return {
      earth: 60,
      moon: 160,
      isRunning: false
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
      panel.innerHTML = `
      <b>Characteristics of Earth</b><br>
      <b>Mass:</b> 5,972,190,000,000,000 billion kg<br>
      <b>Equatorial Circumference:</b>40,030 km<br>
      <b>Equatorial Diameter:</b> 12,756 km<br>
      <b>Orbit Distance:</b> 149,598,262 km (1 AU)<br>
      <b>Orbit Period:</b> 365.26 Earth days<br>
      <b>Surface Temperature:</b> -88 to 58° C<br><br>

      <a href='https://theplanets.org/earth/' target='_blank'>Source</a>
      `
    },
    play () {
      this.isRunning = true
      this.animateMoon()
    },
    pause () {
      this.isRunning = false
      this.animateMoon()
    },
    animateMoon () {
      let startTime
      const offset = this.moon
      const distance = 360// 60FP
      const moonOrbit = (timestamp) => {
        startTime = startTime || timestamp // set startTime is null
        const timeElapsedSinceStart = timestamp - startTime
        const progress = timeElapsedSinceStart / 7000
        const safeProgress = Math.min(Number(progress.toFixed(3)), 1) // 2 decimal points
        const newPosition = -(safeProgress * distance)
        // we need to progress to reach 100%
        if (this.isRunning && safeProgress !== 1) {
          this.moon = newPosition + offset
          requestAnimationFrame(moonOrbit)
        } else if (this.isRunning && safeProgress === 1) {
          this.moon = offset
          this.play()
        }
      }
      requestAnimationFrame(moonOrbit)
    }
  },
  mounted () {
    this.play()
    setTimeout(() => {
      this.show()
    }, 1500)
  },
  destroyed () {
    this.pause()
    this.hide()
  }
}
</script>
