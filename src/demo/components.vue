<template>
  <z-view size="xl" style="border-width: 8px;">
    Components
    <template v-slot:extension>
      <z-list :items="sections" size="l" :per-page="3">
        <template v-slot:default="props">
          <z-spot
            :distance="120"
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
  </z-view>
</template>

<script>
export default {
  data () {
    return {
      sections: [
        { name: 'Z-View', view: 'zview', icon: 'fas fa-compass' },
        { name: 'Z-List', view: 'zlist', icon: 'fas fa-magic' },
        { name: 'Z-Spot', view: 'zspot', icon: 'fas fa-code' },
        { name: 'Z-Dialog', view: 'zdialog', icon: 'fas fa-palette' },
        { name: 'Z-Canvas', view: 'zcanvas', icon: 'fas fa-palette' }
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
