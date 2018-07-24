<template>
  <!-- usar este esquema: /pagina/:id/param1/:param1/paramn/:paramn. poner validador de alguna forma -->
   <!-- ouser este esquema "{ name: 'user', params: { userId: 123 }}" ventajas ... es como vue-router -->
  <z-view>

    <section slot="extension">
      <z-spot button
        class="danger"
        :angle='45'
        :distance="130"
        size='s'>
        +
      </z-spot>
      <z-spot button
        class="danger"
        :angle='135'
        :distance="130"
        size='s'
        @click.native="dialog = true">
        Trash
      </z-spot>
      <z-list
        :items="devices"
        :per-page="5">
          <z-spot
            slot-scope="props"
            :index="props.index"
            :to-view="{ name: 'device', params: { fruit: props.category}}"
            :label="props.category">
            <span style="color: white;">{{props.qty}}</span>
            <z-spot slot="extension"
              :style="props.category === 'care' ? 'background-color: red; border: none;': 'background-color: green; border: none;'"
              :angle='-45'
              size='xxs'>
            </z-spot>
          </z-spot>
      </z-list>
      <z-dialog 
      v-if="dialog"
      timer 
      @done = "dialog = false"
      >
        proceed?
      </z-dialog>
    </section>
</z-view>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      devices: [
        {category: 'cameras & sensors', qty: 4},
        {category: 'care', qty: 1},
        {category: 'climate', qty: 2},
        {category: 'doors & locks', qty: 2},
        {category: 'energy', qty: 1},
        {category: 'garage doors', qty: 1},
        {category: 'home & family', qty: 6},
        {category: 'lawn & garden', qty: 0},
        {category: 'lights & switches', qty: 13},
        {category: 'smoke & co', qty: 3},
        {category: 'voice assistant', qty: 1},
        {category: 'water', qty: 1},
        {category: 'windows & blinds', qty: 3},
        {category: 'entertainment', qty: 3}
      ]
    }
  }
}
</script>
