import store from './store/store'
import ZCanvas from './components/z-canvas.vue'
import ZView from './components/z-view.vue'
import ZViewList from './components/z-list.vue'
import ZSpot from './components/z-spot.vue'
import ZDialog from './components/z-dialog.vue'

const zircle = {
  install (app, options) {
    if (!options) {
      options = {}
    }

    app.component('z-canvas', ZCanvas)
    app.component('z-view', ZView)
    app.component('z-list', ZViewList)
    app.component('z-spot', ZSpot)
    app.component('z-dialog', ZDialog)

    app.config.globalProperties.$zircle = store.actions
  }
}
export default zircle
