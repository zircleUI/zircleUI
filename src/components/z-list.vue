<template>
  <section title="list">
    <slot
      v-for="(item, index) in $zircle.getCurrentPage()"
      v-bind="item"
      :index=index>
    </slot>
    <z-list-pagination  
      v-for="(page, index) in $zircle.getNumberOfPages()"
      :key="index + '_page'"
      size="xxs"
      color="accent"
      :index="index"
      :distance="112"
      :angle="(180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages() * ($zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - ($zircle.getNumberOfPages() * 10)))) - ((180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages())) / 2"
      :active="$zircle.getCurrentPageIndex()"
      @mouseover.native = "$zircle.setBackNav(true)"
      @mouseleave.native = "$zircle.setBackNav(false)"
      @click.native="$zircle.setCurrentPageIndex(index)"/>
  </section>
</template>

<script>
// prevenir que se use en otro lugar que no sea parent.
// parsear gotoview para detectar si tiene id
// permitir el uso del id
// explicar el uso de label or image as prop or as slot
// METER COMENTARIOS EN LOS COMPONENTES HTML
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
      type: Array
    },
    perPage: {
      type: [Number]
    }
  },
  name: 'z-list',
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

