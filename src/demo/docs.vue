<template>
  <z-view style="border-width: 8px;">
    Documentation
    <div slot='extension'>

      <z-list :items="sections" :per-page="5">
        <z-spot
          button
          slot-scope="props"
          :index="props.index"
          :label='props.name'
          @click.native="openUrl(props.url)" >
            <i :class="props.icon"></i>
        </z-spot>
      </z-list>
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
