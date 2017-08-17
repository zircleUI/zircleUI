<template>
 <section title="z-pagination" style="z-index:9000;">
  <z-dotnav v-for="(page, index) in pages"
  :key="index"
  :total="pages.length"
  :index="index"
  size="xxs" 
  :distance="112" 
  @click.native="changePage(index)">
  </z-dotnav>
</section>
</template>

<script>
import _ from 'lodash'
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-pagination',
  mixins: [zmixin],
  props: ['collection', 'per-page'],
  data () {
    return {
      type: 'pagination',
      arc: 'half'
    }
  },
  methods: {
    changePage (index) {
      let data = this.pages[index]
      let progress = (index + 1) / this.pages.length * 100
      this.$emit('updateItems', {
        data: data,
        progress: progress
      })
    }
  },
  computed: {
    pages () {
      return _.chunk(this.collection, this.perPage)
    }
  },
  mounted () {
    this.changePage(0)
  }
}
</script>

<style>

</style>
