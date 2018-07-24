<template>
  <z-view 
  style="border-width: 8px"
  slider
  :progress="progress">
    
    <span style="color: var(--accent-text-color)">Living room
      <h1>{{activeScene}}</h1>
      {{msg}}
    </span>

    <img slot="image" src="living.jpg" width="100%" height="100%" style="opacity: 0.3">
    <div slot="extension">
        <z-spot 
          v-for="(device, index) in devices"
          :button="device.name !== 'AC'"
          :knob="device.name === 'AC'"
          :progress="device.name === 'AC' ? device.temp : 0"
          :angle="90 + (180 / (devices.length - 1) * index)"
          :distance="100"
          size="m"
          :to-view="device.view"
          :label="device.name"
          :label-pos="device.name === 'AC' ? 'bottom' : 'left'"
          :key="'dev_' + index">
          <i :class="device.icon"></i>
          <z-spot slot="extension"
            button
            :angle="-45"
            size="xxs"
            :style="device.state === 'on' ? 'border-color: green; background-color: green;' : 'border-color: red; background-color: red;'">
          </z-spot>
        </z-spot>
        <z-spot 
          v-for="(scene, index) in scenes"
          button
          size="s"
          :angle="-30 + (60 / (scenes.length - 1) * index)"
          :distance="120"
          :label="scene.name"
          label-pos="right"
          :key="'scn_' + index"
          @click.native="showMe(scene)">
          <i :class="scene.icon"></i>
        </z-spot>
    </div>
  </z-view>
</template>
<script>
/*eslint-disable*/
export default {
  data () {
    return {
      progress: 0,
      msg: '',
      activeScene: 'Relax',
      devices: [
        {name: 'AC', state: 'on', temp: 28},
        {name: 'TV', state: 'off', vol: 14, bright: 30, source: 'youtube', icon: 'fas fa-tv', view: 'tv'},
        {name: 'Hifi', state: 'on', vol: 14, playlist: ['sounds of nature', 'party mix'], icon: 'fas fa-music'},
        {name: 'Ambient light', state: 'off', icon: 'far fa-lightbulb'},
        {name: 'Accent light', state: 'on', icon: 'far fa-lightbulb'}
      ],
      scenes: [
        {name: 'Relax', state: 'active', icon: 'fas fa-book'},
        {name: 'Theatre', state: 'deactive', icon: 'fas fa-film'},
        {name: 'Party', state: 'deactive', icon: 'fas fa-birthday-cake'}
      ]
    }
  },
  computed: {
    retrieveParams () {
      if (this.$zircle.getParams() !== undefined) {
        return this.$zircle.getParams().room
      }
    }
  },
  methods: {
    showMe (el) {
      if (this.activeScene !== el.name) {
        this.progress = 5
        this.activeScene = el.name
        this.devices = [
          {name: 'AC', state: 'off', temp: 8},
          {name: 'TV', state: 'on', vol: 14, bright: 30, source: 'youtube', icon: 'fas fa-tv', view: 'tv'},
          {name: 'Hifi', state: 'off', vol: 14, playlist: ['sounds of nature', 'party mix'], icon: 'fas fa-music'},
          {name: 'Ambient light', state: 'off', icon: 'far fa-lightbulb'},
          {name: 'Accent light', state: 'on', icon: 'far fa-lightbulb'}
        ]
        this.msg = 'Activating devices...'
        var vm = this
        var id = setInterval(function () {
          if (vm.progress >= 100) {
            clearInterval(id)
            vm.progress = 0
            vm.msg = el.msg
          } else if (vm.progress === 40) { 
            vm.msg = 'Applying rules...'
            vm.progress ++
          } else {
            vm.progress ++
          }
        }, 20)
      } else {
        this.msg = 'This scene is already activated'
      }
    }
  }
}
</script>

