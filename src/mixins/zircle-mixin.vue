<script>
import store from '../store/store'
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
    gotoview: {
      type: [String, Number]
    }
  },
  data () {
    return {
      state: store.state,
      store: store
    }
  },
  computed: {
    position () {
      return this.store.point(this)
    },
    classes () {
      return {
        // currclass: this.viewName === this.state.currentView,
        // lastclass: this.viewName === this.state.lastView,
        // pastclass: this.type === 'panel' && this.viewName === this.state.pastView && this.viewName !== this.state.previousView && this.viewName !== this.state.currentView,
        // prevclass: this.type === 'panel' && this.viewName === this.state.previousView && this.viewName !== this.state.currentView && this.viewName !== this.state.pastView,
        // hidden: this.$parent.viewName === this.state.previousView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
      }
    },
    colors () {
      return this.color
    }
  }
}
</script>
