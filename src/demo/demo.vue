<template>
  <z-view size="xxl" class="shade">
    <template #extension>
      <z-spot
        size="l"
        :angle="0"
        :distance="0"
        class="transparent"
        to-view="sun"
        label="sun"
        image-path="./sun.png"
      >
        <z-spot
          slot="extension"
          size="s"
          :angle="earth"
          :distance="200"
          class="transparent"
          @mouseover.native="pause"
          @mouseleave.native="play"
          @click.native="pause"
          to-view="earth"
          label="earth"
          image-path="./earth.png"
        >
          <z-spot
            slot="extension"
            size="xs"
            :distance="160"
            class="transparent"
            :angle="moon"
            image-path="./moon.png"
          >
          </z-spot>
        </z-spot>
      </z-spot>
      <z-spot
        size="m"
        :angle="135"
        :distance="150"
        button
        @click.stop="isRunning ? pause() : play()"
        :label="isRunning ? 'pause' : 'play'">
        {{isRunning ? '||' : '>'}}
      </z-spot>
      <z-spot
        size="m"
        :angle="45"
        :distance="150"
        knob
        v-bind.sync="speed"
        label="speed">
      </z-spot>
    </template>
  </z-view>
</template>
<script>
export default {
  data () {
    return {
      dialog: true,
      speed: { qty: 1, unit: 'x', min: 1, max: 5 },
      earth: 160,
      moon: 160,
      year: 0,
      month: 0,
      init: null,
      isRunning: true
    }
  },
  computed: {},
  methods: {
    show () {
      const panel = document.querySelector('.panel')
      panel.style.display === 'none'
        ? (panel.style.display = 'block')
        : (panel.style.display = 'none')
    },
    play () {
      this.isRunning = true
      this.animateEarth()
    },
    pause () {
      this.isRunning = false
      this.animateEarth()
    },
    animateEarth () {
      let startTime
      const offset = this.earth
      const distance = 360// 60FP
      const earthOrbit = (timestamp) => {
        startTime = startTime || timestamp // set startTime is null
        const timeElapsedSinceStart = timestamp - startTime
        const progress = timeElapsedSinceStart / 10000 * this.speed.qty
        const safeProgress = Math.min(progress.toFixed(3), 1) // 2 decimal points
        const newPosition = -(safeProgress * distance)
        // we need to rogress to reach 100%
        if (this.isRunning && safeProgress !== 1) {
          this.earth = newPosition + offset
          requestAnimationFrame(earthOrbit)
        } else if (this.isRunning && safeProgress === 1) {
          this.earth = offset
          this.play()
        }
      }
      requestAnimationFrame(earthOrbit)
    },
    animateMoon () {
      let startTime
      const offset = this.moon
      const distance = 360// 60FP
      const moonOrbit = (timestamp) => {
        startTime = startTime || timestamp // set startTime is null
        const timeElapsedSinceStart = timestamp - startTime
        const progress = timeElapsedSinceStart / 7000 * this.speed.qty
        const safeProgress = Math.min(progress.toFixed(3), 1) // 2 decimal points
        const newPosition = -(safeProgress * distance)
        // we need to rogress to reach 100%
        if (safeProgress !== 1) {
          this.moon = newPosition + offset
          requestAnimationFrame(moonOrbit)
        } else if (safeProgress === 1) {
          this.moon = offset
          this.animateMoon()
        }
      }
      requestAnimationFrame(moonOrbit)
    }
  },
  mounted () {
    this.play()
    this.animateMoon()
  },
  destroyed () {
    this.pause()
  }
}
</script>
