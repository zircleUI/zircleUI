<template>
  <z-view> {{retrieveParams}}
    <z-spot slot="extension"
      to-view='home'
      :distance='130'
      :angle='30'
      size='small' >
    </z-spot>
  </z-view>
</template>
<script>
/*eslint-disable*/
// just $router.params.fruit
export default {
  computed: {
    retrieveParams () {
      if (this.$zircle.getParams() !== undefined) {
        return this.$zircle.getParams().fruit
      }
    }
  }
}
</script>

