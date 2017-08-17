<template>
 <section title="z-list">
   <z-item 
    size="small"
    :distance="60"
    v-for="(item, index) in items"
    :key="index"
    :total="items.length"
    :index="index"
    layout='radial'
    gotoview="item"
    :id="item">
    
      <slot :item="item">
        {{item}}
      </slot>
    </z-item>
<!-- hacer un navigation mas simple: total, perpage, current -->
    <z-pagination  
    :collection="collection"
    :per-page="perPage"
    @updateItems="displayedItems" />
</section>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-list',
  mixins: [zmixin],
  props: {
    collection: {
      type: [Array]
    },
    perPage: {
      type: [Number]
    }
  },
  data () {
    return {
      items: [],
      type: 'maindisc' // esto es para evitar que se compute mal position y escala
    }
  },
  methods: {
    displayedItems (data) {
      this.items = data.data
      this.$emit('updateProgress', data.progress)
    }
  }
}
// trabajar con la escala y el grosor de las lineas para que sean uniformes aunque tenga diferentes tamanos
</script>

<style>

</style>
