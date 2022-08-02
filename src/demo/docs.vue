<template>
  <z-view size="l" style="border-width: 8px;">
    Documentation
    <template v-slot:extension>
      <z-list :items="sections" :per-page="5">
        <template v-slot:default="props">
        <z-spot
          :distance="60"
          size="xs"
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
        { name: 'Contributing', url: 'https://zircleui.github.io/docs/contribute/', icon: 'fas fa-hands-helping' }
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
