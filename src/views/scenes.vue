<template>
  <z-view 
  label="Scenes"
  slider
  :progress="progress"
  :style="styleActive">
  <h1>{{activeScene}}</h1>
  <div style="height: 60px;">
    {{msg}}
  </div>
  <div slot="extension">
        <z-spot 
          v-for="(el, index) in elements" 
          button
          size="s"
          :distance="120"
          :angle="325 + (90 / elements.length * index)"
          :style="activeScene === el.scene ? styleActive : ''"
          :key="index"
          @click.native="showMe(el)">
          <i class="fas" :class="el.icon"></i>
        </z-spot>
    </div>
  </z-view>
</template>
<script>
  export default {
    data () {
      return {
        activeScene: 'Night',
        color: 'blue',
        msg: '',
        progress: 0,
        elements: [
          { scene: 'Day', color: 'orange', icon: 'fa-sun', msg: 'Cooling rooms, blinds opened, playing ambient music'},
          { scene: 'Night', color: 'blue', icon: 'fa-moon', msg: 'Blinds closed, AC in silence mode, motion sensors active'},
          { scene: 'Away', color: 'red', icon: 'fa-shield-alt', msg: 'Alarm armed, cameras activated, blinds closed'},
          { scene: 'At home', color: 'green', icon: 'fa-home', msg: 'Lights in ambient mode, playing relax music, coffee is being prepared'}
        ]
      }
    },
    computed: {
      styleActive () {
        return {
          borderWidth: '8px',
          borderColor: this.color,
          color: this.color
        }
      }
    },
    methods: {
      showMe (el) {
        if (this.activeScene !== el.scene) {
          this.progress = 5
          this.activeScene = el.scene
          this.color = el.color
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
