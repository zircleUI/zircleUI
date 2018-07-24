<template>
  <z-view>
    <iframe slot="media" width="560" height="315" src="https://www.youtube.com/embed/aJOTlE1K90k" frameborder="0" allowfullscreen></iframe>
     Channel 9
     
          <div slot="extension">
            <z-spot button
              :distance='130'
              :angle='-15'
              size='s'>
              +
            </z-spot>
            <z-spot button
              :distance='130'
              :angle='15'
              size='s'>
              -
            </z-spot>
            <z-spot button
              class="success"
              :distance='110'
              :angle='-45'
              size='s'>
              <i class="fa fa-power-off"></i>
            </z-spot>
            <z-spot button
              :distance='100'
              :angle='135'
              :progress="14"
              size='s'
              label="vol">
            </z-spot>
            <z-spot button
              class="accent"
              :distance='100'
              :angle='45'
              size='s'
              label="ch.">
            </z-spot>
          </div>

  </z-view>
</template>
<script>
/*eslint-disable*/
export default {
  data () {
    return {
      items: [
        {name: 'tv', state: 'on', vol: 14, bright: 30, channel: '3'},
        {name: 'lights', state: 'on', color: 'red'},
        {name: 'lights', state: 'on', color: 'green'},
        {name: 'lights', state: 'off', color: 'white'},
        {name: 'Air', state: 'on', temp: 29},
        {name: 'Camera', state: 'off'}
      ]
    }
  },
  computed: {
    retrieveParams () {
      if (this.$zircle.getParams() !== undefined) {
        return this.$zircle.getParams().room
      }
    }
  }
}
</script>

