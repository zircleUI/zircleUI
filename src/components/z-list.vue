<template>
  <section class="z-list">
    <div v-for="(item, index) in $zircle.getCurrentPage()" :key="item[0] + '-' + index">
      <slot v-bind="item" :index=index></slot>
    </div>
    <template v-if="$zircle.getThemeShape() === 'circle' && $zircle.getNumberOfPages() > 1">
      <z-pagination
        v-for="(page, index) in $zircle.getNumberOfPages()"
        :key="index + '_page'"
        :index="index"
        :distance="distance"
        :angle="(180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages() * ($zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - ($zircle.getNumberOfPages() * 10)))) - ((180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages())) / 2"
        :active="$zircle.getCurrentPageIndex()"
        @mouseover="$zircle.allowBackwardNavigation(true)"
        @mouseleave="$zircle.allowBackwardNavigation(false)"
        @click.native="$zircle.setCurrentPageIndex(index)"/>
    </template>
  </section>
</template>

<script>
import ZPagination from './child-components/z-pagination'

function chunk (myArray, chunkSize) {
  const res = []
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
    distance () {
      const distanceInPixels = this.$zircle.getComponentWidth(this.size) + this.$zircle.getComponentWidth('xs') + 10
      return distanceInPixels * 100 / this.$zircle.getComponentWidth(this.size)
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
