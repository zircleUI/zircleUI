<template>
  <z-view size="xl">
    Z-SPOT
    <template #extension>
      <z-spot
        size="s"
        :angle='45'
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
        size="m"
        :angle='-30'
        :distance="200">
        2
        <template v-slot:extension>
      <z-list :items="sections" :per-page="3">
        <template v-slot:default="props">
        <z-spot
          :distance="30"
          size="xs"
          :to-view='props.view'
          :index="props.index"
          :label='props.name'
          >
            <i :class="props.icon"></i>
        </z-spot>
        </template>
      </z-list>
    </template>
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
        v-bind.sync='temp'
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
      temp: { qty: 56, unit: 'C', min: -14, max: 100 },
      earth: 60,
      moon: 160,
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
    }
  },
  mounted () {
    let start
    const Animacion = (relojInterno) => {
      if (!start) start = relojInterno
      this.earth = (relojInterno / 60) - start
      this.moon = (relojInterno / 30) - start
      window.requestAnimationFrame(Animacion)
    }
    window.requestAnimationFrame(Animacion)
  }
}
</script>
