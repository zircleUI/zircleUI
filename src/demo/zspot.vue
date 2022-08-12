<template>
  <z-view size="xl" style="background-color: transparent">
   Milky Way
    <template #extension>
      <z-spot
        size="s"
        :angle=orbit.qty
        class='accent'
        label='sun'>
        <z-spot
        slot="extension"
        size="xs"
        :angle='earth'
        :distance='270'
        class='accent'
        label='earth'>
        <z-spot
          slot="extension"
          size="xxs"
          :distance='160'
          :angle='moon'
          >
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
        class='accent'
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
      paused: false,
      sections: [
        { name: 'Z-View', view: 'zview', icon: 'fas fa-compass' },
        { name: 'Z-List', view: 'zlist', icon: 'fas fa-magic' },
        { name: 'Z-Spot', view: 'zspot', icon: 'fas fa-code' },
        { name: 'Z-Dialog', view: 'zdialog', icon: 'fas fa-palette' },
        { name: 'Z-Canvas', view: 'zcanvas', icon: 'fas fa-palette' }
      ]
    }
  },
  computed: {
  },
  methods: {
    openUrl () {
      window.open('https://github.com/zircleUI/zircleUI', '_blank')
    },
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
        this.earth = (relojInterno / 60) * (this.knob / 15) - start
        this.moon = (relojInterno / 10) * (this.knob / 15) - start
        if (!this.paused) window.requestAnimationFrame(Animacion)
      }
      window.requestAnimationFrame(Animacion)
    }
  },
  mounted () {
    this.start()
  }
}
</script>
