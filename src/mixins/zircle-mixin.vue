<script>
export default {
  props: {
    distance: {
      type: Number,
      default: 100
    },
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    },
    color: {
      type: String,
      default: 'primary'
    },
    label: {
      type: [String, Number]
    },
    toView: {
      type: [String, Object]
    },
    imagesrc: {
      type: [String, Number]
    }
  },
  computed: {
    position () {
      let position
      this.type === 'panel' ? position = this.$zircle.calcPanelPosition() : position = this.$zircle.calcPosition(this)
      return position
    },
    classes () {
      return {
        zoom: this.type === 'scale' && this.toView !== undefined
      }
    },
    colors () {
      return this.color
    }
  }
}
</script>
