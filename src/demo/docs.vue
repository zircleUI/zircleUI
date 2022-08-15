<template>
  <z-view size="xl" style="border-width: 8px;">
    Links for docs & resources
    <template v-slot:extension>
      <z-list :items="sections" :per-page="5">
        <template v-slot:default="props">
        <z-spot
          :distance="60"
          size="s"
          button
          :index="props.index"
          :label='props.name'
          @click="openUrl(props.url)" >
            <i :class="props.icon"></i>
        </z-spot>
        </template>
      </z-list>
    </template>
  </z-view>
</template>
<script>
export default {
  data () {
    return {
      sections: [
        { name: 'Guide', url: 'https://zircleui.github.io/docs/guide/', icon: 'fas fa-compass' },
        { name: 'Tutorial', url: 'https://zircleui.github.io/docs/tutorial/', icon: 'fas fa-magic' },
        { name: 'API', url: 'https://zircleui.github.io/docs/api/', icon: 'fas fa-code' },
        { name: 'Examples', url: 'https://zircleui.github.io/docs/examples/vuejs-ecosystem.html', icon: 'fas fa-palette' },
        { name: 'Repo', url: 'https://github.com/zircleUI/zircleUI', icon: 'fab fa-github' }
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
