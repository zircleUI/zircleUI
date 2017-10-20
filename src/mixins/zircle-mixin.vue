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
        // basic scheme
        primary: this.color === 'primary',
        text: this.color === 'info',
        background: this.color === 'background',
        accent: this.color === 'accent',
        success: this.color === 'success',
        warning: this.color === 'warning',
        danger: this.color === 'danger',
        // colores
        green: this.color === 'green',
        red: this.color === 'red',
        yellow: this.color === 'yellow',
        gray: this.color === 'gray',
        lightBlue: this.color === 'light-blue',
        black: this.color === 'black',
        purple: this.color === 'purple',
        orange: this.color === 'orange',
        blue: this.color === 'blue',
        // previuos view settings
        prevclass: this.view === this.state.previousView,
        hidden: this.$parent.view === this.state.previousView,
        pastclass: this.type === 'panel' && this.view === this.state.pastView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
        // responsive animation. solo para current view
        // animation: this.view === this.state.currentView || this.$parent.view === this.state.currentView
      }
    }
  }
}
</script>
