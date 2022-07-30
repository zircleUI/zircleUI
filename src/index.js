import store from './store/store'
import ZCanvas from './components/z-canvas.vue'
import ZView from './components/z-view.vue'
import ZViewList from './components/z-list.vue'
import ZSpot from './components/z-spot.vue'
import ZDialog from './components/z-dialog.vue'

const zircle = {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$zircle', {
      get () {
        return store.actions
      }
    })
    Vue.component('z-canvas', ZCanvas)
    Vue.component('z-view', ZView)
    Vue.component('z-list', ZViewList)
    Vue.component('z-spot', ZSpot)
    Vue.component('z-dialog', ZDialog)
  }
}

export default zircle

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(zircle)
}
