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
  var res = []
  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize))
  }
  return res
}
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-pagination',
  mixins: [zmixin],
  props: ['collect', 'per-page'],
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
      this.state.currentPage = index
      this.active = this.state.currentPage
      this.$emit('updateItems', {
        data: data,
        progress: progress
      })
    }
  },
  computed: {
    pages () {
      // console.log(this.collection)
      return chunk(this.collect, this.perPage)
    }
  },
  mounted () {
    this.changePage(this.state.currentPage)
  }
}
</script>

