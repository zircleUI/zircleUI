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
        <template #extension>
          <z-spot
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
            <template #extension>
              <z-spot
                size="xxs"
                :distance="160"
                class="transparent"
                :angle="moon"
                image-path="./moon.png"
              >
              </z-spot>
            </template>
          </z-spot>
        </template>
      </z-spot>
      <z-spot
        size="m"
        :angle="135"
        :distance="170"
        button
        @click.stop="isRunning ? pause() : play()"
        :label="isRunning ? 'pause' : 'play'">
        {{ isRunning ? '||' : '>' }}
      </z-spot>
      <z-spot
        size="m"
        :angle="45"
        :distance="170"
        knob
        v-bind.sync="speed"
        label="speed">
      </z-spot>
      <z-spot
        button
        size="m"
        :angle="225"
        :distance="170"
        @click="togglePercentSizes"
        label="Percent sizes">
        {{ $zircle.isUsingPercentSizes() ? 'ON' : 'OFF' }}
      </z-spot>
    </template>
  </z-view>
</template>

<script>
export default {
  data () {
    return {
      speed: { qty: 1, unit: 'x', min: 1, max: 5 },
      earth: 160,
      moon: 160,
      isRunning: true
    }
  },
  methods: {
    show () {
      const panel = document.querySelector('.panel')
      panel.style.display = (panel.style.display === 'none') ? 'block' : 'none'
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
        const safeProgress = Math.min(Number(progress.toFixed(3)), 1) // 2 decimal points
        const newPosition = -(safeProgress * distance)
        // we need to progress to reach 100%
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
        const safeProgress = Math.min(Number(progress.toFixed(3)), 1) // 2 decimal points
        const newPosition = -(safeProgress * distance)
        // we need to progress to reach 100%
        if (safeProgress !== 1) {
          this.moon = newPosition + offset
          requestAnimationFrame(moonOrbit)
        } else if (safeProgress === 1) {
          this.moon = offset
          this.animateMoon()
        }
      }
      requestAnimationFrame(moonOrbit)
    },
    togglePercentSizes () {
      this.$zircle.config({ usePercentSizes: !this.$zircle.isUsingPercentSizes() })
      this.$zircle.updateDiameters()
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
