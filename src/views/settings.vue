<template>
  <z-view label="Settings">
  {{ theme }}
    <div slot="extension">
        <z-spot 
          v-for="(el, index) in elements" 
          button
          size="xs"
          :distance="120"
          :angle="el.angle"
          :label="el.label"
          :label-pos="el.labelPos"
          :class="$zircle.getTheme() === 'theme-' + el.label || $zircle.getThemeMode() === 'mode-' + el.label ? 'accent' : ''"
          :key="index"
          @click.native="changeStyle(el)"
          />
    </div>
  </z-view>
</template>
<script>
  export default {
    data () {
      return {
        theme: 'Select your theme',
        elements: [
          { type: 'theme', angle: -50, label: 'blue', labelPos: 'right'},
          { type: 'theme', angle: -30, label: 'black', labelPos: 'right'},
          { type: 'theme', angle: -10, label: 'green', labelPos: 'right'},
          { type: 'theme', angle: 10, label: 'red', labelPos: 'right'},
          { type: 'theme', angle: 30, label: 'light-blue', labelPos: 'right'},
          { type: 'theme', angle: 50, label: 'gray', labelPos: 'right'},
          { type: 'mode', angle: 210, label: 'dark', labelPos: 'left'},
          { type: 'mode', angle: 190, label: 'dark-filled', labelPos: 'left'},
          { type: 'mode', angle: 170, label: 'light', labelPos: 'left'},
          { type: 'mode', angle: 150, label: 'light-filled', labelPos: 'left'}
        ]
      }
    },
    methods: {
      changeStyle (el) {
        el.type === 'theme' ? this.$zircle.config({ style: { theme: el.label } }) : this.$zircle.config({ style: { mode: el.label }})
        var theme = this.$zircle.getTheme().split('theme-')[1]
        var mode = this.$zircle.getThemeMode().split('mode-')[1]
        this.theme = `The theme is ${theme} ${mode}`
      }
    }
  }
</script>
