<template>
  
 <section title="z-list" >
 
    <slot
    :item="item"
    v-for="(item, index) in state.pages[state.currentPage]"
    :angle="(360 / state.pages[state.currentPage].length * index) - 90">
    </slot>
 
    <z-dotnav
    v-for="(page, index) in $zircleStore.state.pages"
    size="xxs"
    color="accent"
    :key= "index"
    :index="index"
    :distance="112"
    :angle="(180 - (180 - ($zircleStore.state.pages.length * 10))) / $zircleStore.state.pages.length * ($zircleStore.state.pages.length - index) + ((180 - (180 - (180 - ($zircleStore.state.pages.length * 10)))) - ((180 - (180 - ($zircleStore.state.pages.length * 10))) / $zircleStore.state.pages.length)) / 2"
    :active="$zircleStore.state.currentPage"
    @mouseover.native = "state.backwardNavigation = true"
    @mouseleave.native = "state.backwardNavigation = false"
    @click.native="state.currentPage = index" />

</section>

</template>

<script>
import zmixin from '../mixins/zircle-mixin'
function chunk (myArray, chunkSize) {
  var res = []
  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize))
  }
  return res
}
export default {
  name: 'z-list',
  mixins: [zmixin],
  props: {
    collection: {
      type: Array
    },
    perPage: {
      type: [Number]
    },
    color: {
      type: String
    }
  },
  data () {
    return {
      type: 'panel',
      viewName: 'test'
    }
  },
  mounted () {
    this.$zircleStore.state.pages = chunk(this.collection, this.perPage)
  }
}
</script>
