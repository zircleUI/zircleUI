<template>
  
 <section title="z-list" >
 
    <slot
    :item="item"
    v-for="(item, index) in $zircle.getCurrentPage()"
    :angle="(360 / $zircle.getNumberOfItemsInCurrentPage() * index) - 90">
    </slot>
 
    <z-list-pagination
    v-for="(page, index) in $zircle.getPages()"
    size="xxs"
    color="accent"
    :key= "index"
    :index="index"
    :distance="112"
    :angle="(180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages() * ($zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - ($zircle.getNumberOfPages() * 10)))) - ((180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages())) / 2"
    :active="$zircle.getCurrentPageIndex()"
    @mouseover.native = "$zircle.setBackNav(true)"
    @mouseleave.native = "$zircle.setBackNav(false)"
    @click.native="$zircle.setCurrentPageIndex(index)" />
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
    // this.$zircle.setNumberOfPages(chunk(this.collection, this.perPage))
    this.$zircle.setPages(chunk(this.collection, this.perPage))
  }
}
</script>
