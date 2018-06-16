import store from './store/store'
import ZCanvas from './components/z-canvas.vue'
import ZCanvasViewManager from './components/z-canvas-view-manager.vue'
import ZTransition from './transitions/z-transition.vue'
import ZView from './components/z-view.vue'
import ZViewScroll from './components/z-view-scroll.vue'
import ZViewList from './components/z-view-list.vue'
import ZViewListItem from './components/z-view-list-item.vue'
import ZViewListPagination from './components/z-view-list-pagination.vue'
import ZScale from './components/z-scale.vue'
import ZButton from './components/z-button.vue'
import ZRange from './components/z-range.vue'
import ZRangeBar from './components/z-range-bar.vue'
import ZDialog from './components/z-dialog.vue'
import ZSlider from './components/z-slider.vue'

const zircle = {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$zircle', {
      get () {
        return store.actions
      }
    })
    Object.defineProperty(Vue.prototype, '$ztate', {
      get () {
        return store.state
      }
    })
    Vue.component('z-canvas', ZCanvas)
    Vue.component('z-canvas-view-manager', ZCanvasViewManager)
    Vue.component('z-transition', ZTransition)
    Vue.component('z-view', ZView)
    Vue.component('z-view-scroll', ZViewScroll)
    Vue.component('z-view-list', ZViewList)
    Vue.component('z-view-list-item', ZViewListItem)
    Vue.component('z-view-list-pagination', ZViewListPagination)
    Vue.component('z-scale', ZScale)
    Vue.component('z-button', ZButton)
    Vue.component('z-range', ZRange)
    Vue.component('z-range-bar', ZRangeBar)
    Vue.component('z-dialog', ZDialog)
    Vue.component('z-slider', ZSlider)
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
