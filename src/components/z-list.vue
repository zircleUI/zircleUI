<template>
  <section title="list">
    <slot
      v-for="(item, index) in $zircle.getCurrentPage()"
      v-bind="item"
      :index=index>
    </slot>
    <z-list-pagination  v-if="$zircle.getNumberOfPages() > 1"
      v-for="(page, index) in $zircle.getNumberOfPages()"
      :key="index + '_page'"
      size="xxs"
      color="accent"
      :index="index"
      :distance="108"
      :angle="(180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages() * ($zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - ($zircle.getNumberOfPages() * 10)))) - ((180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages())) / 2"
      :active="$zircle.getCurrentPageIndex()"
      @mouseover.native = "$zircle.setBackNav(true)"
      @mouseleave.native = "$zircle.setBackNav(false)"
      @click.native="$zircle.setCurrentPageIndex(index)"/>
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
  mixins: [zmixin],
  props: {
    items: {
      type: Array,
      required: true
    },
    perPage: {
      type: [Number],
      default: 5
    }
  },
  name: 'z-list',
  data () {
    return {
      type: 'panel'
    }
  },
  computed: {
    collectionCopy () {
      return this.items.slice(0)
    }
  },
  mounted () {
    this.$zircle.setPages(chunk(this.collectionCopy, this.perPage))
  }
}
</script>
