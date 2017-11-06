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
      // var colorp = this.color
      return {
        // previuos view settings
        prevclass: this.viewName === this.state.previousView,
        hidden: this.$parent.viewName === this.state.previousView,
        pastclass: this.type === 'panel' && this.viewName === this.state.pastView && this.viewName === this.state.pastView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
        // responsive animation. solo para current view
        // animation: this.view === this.state.currentView || this.$parent.view === this.state.currentView
      }
    },
    colors () {
      return this.color
    }
  }
}
</script>
