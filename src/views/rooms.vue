<template>
  <z-view>
    Rooms
    <section slot="extension">
      <z-list
        :items="rooms"
        :per-page="3">
          <z-spot
            slot-scope="props"
            :index="props.index"
            :to-view="props.name"
            :label="props.name"
            :image-src="props.image"
            label-pos="bottom">
            <z-spot slot="extension"
              v-if="props.status"
              style="background-color: red; border: none;"
              :angle='-45'
              size='xxs'>
            </z-spot>
          </z-spot>
      </z-list>
    </section>
</z-view>
</template>
<script>
export default {
  data () {
    return {
      rooms: [
        {name: 'Living', devices: 6, image: './living.jpg'},
        {name: 'Bedroom', devices: 2, status: 'alert'},
        {name: 'Kitchen', devices: 5},
        {name: 'Studio', devices: 1},
        {name: 'Bath', devices: 1}
      ]
    }
  }
}
</script>
