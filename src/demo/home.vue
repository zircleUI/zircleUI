<template>
  <z-view style="border-width: 8px;" slider :progress=45>
    WELCOME TO ZIRCLE UI <br> <br>

    <div slot='extension'>
      
      <z-list
        :items="collection"
        :per-page="5">
          <z-spot
            slot-scope="props"
            :index="props.index"
            :to-view="{ name: 'device', params: { fruit: props.category}}">
          </z-spot>
      </z-list>
    </div>
  </z-view>
</template>
<script>
export default {
  data () {
    return {
      collection: [{name: 'Apple', color: 'red'}, {name: 'Apple1', color: 'green'}, {name: 'Apple2', color: 'yellow'}, {name: 'Apple3', color: 'purple'}, {name: 'Apple', color: 'red'}, {name: 'Apple1', color: 'green'}, {name: 'Apple2', color: 'yellow'}, {name: 'Apple3', color: 'purple'}, {name: 'Apple', color: 'red'}]
    }
  },
  methods: {
    openUrl () {
      window.open('https://github.com/zircleUI/zircleUI', '_blank')
    }
  }
}
</script>
