<template>
  <section class="z-list">
    <div v-for="(item, index) in $zircle.getCurrentPage()" :key="item[0] + '-' + index">
      <slot v-bind="item" :index=index></slot>
    </div>
    <z-pagination  v-if="$zircle.getThemeShape() === 'circle' && $zircle.getNumberOfPages() > 1"
      v-for="(page, index) in $zircle.getNumberOfPages()"
      :key="index + '_page'"
      :index="index"
      :distance="112"
      :angle="(180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages() * ($zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - ($zircle.getNumberOfPages() * 10)))) - ((180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages())) / 2"
      :active="$zircle.getCurrentPageIndex()"
      @mouseover.native = "$zircle.allowBackwardNavigation(true)"
      @mouseleave.native = "$zircle.allowBackwardNavigation(false)"
      @click.native="$zircle.setCurrentPageIndex(index)"/>
      <div v-if="($zircle.getThemeShape() === 'square' || square) && $zircle.getNumberOfPages() > 1" style="position: absolute; width: 90%; top: 112%; height: 40px; display: flex; justify-content: space-between;">
        <z-pagination
        v-for="(page, index) in $zircle.getNumberOfPages()"
        :key="index + '_page'"
        :index="index"
        :active="$zircle.getCurrentPageIndex()"
        @mouseover.native = "$zircle.allowBackwardNavigation(true)"
        @mouseleave.native = "$zircle.allowBackwardNavigation(false)"
        @click.native="$zircle.setCurrentPageIndex(index)"/>

      </div>
  </section>
</template>

<script>
import ZPagination from './child-components/z-pagination'
function chunk (myArray, chunkSize) {
  var res = []
  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize))
  }
  return res
}
export default {
  name: 'z-list',
  props: {
    size: {
      type: String,
      default: 'xxl'
    },
    items: {
      type: Array,
      required: true
    },
    square: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: [Number],
      default: 5
    }
  },
  inject: ['view'],
  components: {
    ZPagination
  },
  data () {
    return {
      componentType: this.$options.name // fix
    }
  },
  computed: {
    position () {
      return this.$zircle.calcViewPosition(this.$parent.fullView)
    },
    collectionCopy () {
      return this.items.slice(0)
    }
  },
  mounted () {
    this.$zircle.setPages(chunk(this.collectionCopy, this.perPage))
  },
  created () {
    this.$zircle.setCurrentPageIndex(0)
  }
}
</script>
