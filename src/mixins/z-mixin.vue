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
      return this.componentType === 'z-view' || this.componentType === 'z-view-list' ? this.$zircle.calcViewPosition() : this.$zircle.calcPosition(this)
    },
    classes () {
      return {
        zZoomInCursor: this.componentType === 'z-scale' && this.toView !== undefined
      }
    },
    colors () {
      return this.color
    }
  }
}
</script>
