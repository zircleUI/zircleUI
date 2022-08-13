<template>
  <z-view size="xxl" class="shade">
    <template #extension>
      <z-spot
        size="l"
        :angle=orbit.qty
        :distance="0"
        class="transparent"
        to-view="sun"
        label='sun'
        image-path='./sun.png'>
        <z-spot
        slot="extension"
        size="s"
        :angle='earth'
        :distance='200'
        class="transparent"
        @mouseover.native="pause"
        @mouseleave="start"
        to-view="earth"
        label='earth'
        image-path='./earth.png'>
        <z-spot
          slot="extension"
          size="xs"
          :distance='160'
          class="transparent"
          :angle='moon'
          image-path='./moon.png'>
        </z-spot>
      </z-spot>
      </z-spot>
       <z-spot
        square
        size="xs"
        :angle='-30'
         @click="pause"
        :distance="200">
        ||
      </z-spot>
      <z-spot
        square
        size="xs"
        :angle='-60'
         @click="start"
        :distance="200">
        >
      </z-spot>
      <z-spot
        size="xs"
        :angle='270'
        button
        :distance='190'
        @click="show"
        label='button'>
        1
      </z-spot>
       <z-spot
        size="m"
        :angle='180'
        :distance='150'
        knob
        v-bind.sync='orbit'
        label='knob plus'>
        <z-spot
        slot="extension"
        size="s"
        :angle='150'
        :distance='200'
        knob
        :qty.sync='knob'
        label='basic knob'>
      </z-spot>
      </z-spot>
    </template>
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
  computed: {
  },
  methods: {
    show () {
      const panel = document.querySelector('.panel')
      panel.style.display === 'none' ? panel.style.display = 'block' : panel.style.display = 'none'
    },
    pause () {
      this.paused = !this.paused
    },
    start () {
      let start
      const Animacion = (relojInterno) => {
        if (!start) start = relojInterno
        this.earth = (relojInterno / 120) * (this.knob / 15) - start
        // this.moon = (relojInterno / 20) * (this.knob / 15) - start
        if (!this.paused) window.requestAnimationFrame(Animacion)
      }
      window.requestAnimationFrame(Animacion)
      const Animacion1 = (relojInterno) => {
        if (!start) start = relojInterno
        // this.earth = (relojInterno / 60) * (this.knob / 15) - start
        this.moon = (relojInterno / 60) * (this.knob / 15) - start
        window.requestAnimationFrame(Animacion1)
      }
      window.requestAnimationFrame(Animacion1)
    }
  },
  mounted () {
    this.start()
  }
}
</script>
