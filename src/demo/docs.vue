<template>
  <z-view style="border-width: 8px;">
    Documentation
    <div slot='extension'>
      <z-spot v-for='(section, index) in sections' :key='index'
      button
      :angle='360 / sections.length * index'
      :label='section.name'
      @click.native="openUrl(section.url)" >
        <i :class="section.icon"></i>
      </z-spot>
    </div>
  </z-view>
</template>
<script>
export default {
  data () {
    return {
      sections: [
        {name: 'Guide', url: 'https://zircleui.github.io/docs/guide/', icon: 'fas fa-compass'},
        {name: 'Tutorial', url: 'https://zircleui.github.io/docs/tutorial/', icon: 'fas fa-magic'},
        {name: 'API', url: 'https://zircleui.github.io/docs/api/', icon: 'fas fa-code'},
        {name: 'Examples', url: 'https://zircleui.github.io/docs/examples/vuejs-ecosystem.html', icon: 'fas fa-palette'},
        {name: 'Contributing', url: 'https://zircleui.github.io/docs/contribute/', icon: 'fas fa-hands-helping'}
      ]
    }
  },
  methods: {
    openUrl (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
