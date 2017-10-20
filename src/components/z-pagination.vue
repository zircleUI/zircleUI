<template>
 <section title="z-pagination" style="z-index:9000;">
  <z-dotnav v-for="(page, index) in pages"
  color="accent"
  :key="index"
  :total="pages.length"
  :index="index"
  :active="active"
  size="xxs" 
  :distance="112" 
  @click.native="changePage(index)">
  </z-dotnav>
</section>
</template>

<script>
function chunk (myArray, chunkSize) {
  var results = []
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize))
  }
  return results
}
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-pagination',
  mixins: [zmixin],
  props: ['collection', 'per-page'],
  data () {
    return {
      type: 'pagination',
      arc: 'half',
      active: 0
    }
  },
  methods: {
    changePage (index) {
      let data = this.pages[index]
      let progress = (index + 1) / this.pages.length * 100
      this.active = index
      this.$emit('updateItems', {
        data: data,
        progress: progress
      })
    }
  },
  computed: {
    pages () {
      return chunk(this.collection, this.perPage)
    }
  },
  mounted () {
    this.changePage(0)
  }
}
</script>

