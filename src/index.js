import store from './store/store'
import zpanel from './components/z-panel.vue'
import zscale from './components/z-scale.vue'
import zcanvas from './components/z-canvas.vue'
import zviewmanager from './components/z-view-manager.vue'
import ztransition from './transitions/z-transition.vue'
import zalert from './components/z-alert.vue'
import zbutton from './components/z-button.vue'
import zslider from './components/z-slider.vue'
import zrange from './components/z-range.vue'
import zscroll from './components/z-scroll.vue'
import zlist from './components/z-list.vue'
import zitem from './components/z-list-item.vue'
import zdotnav from './components/z-list-pagination.vue'
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
    Vue.component('z-canvas', zcanvas)
    Vue.component('z-view-manager', zviewmanager)
    Vue.component('z-panel', zpanel)
    Vue.component('z-scale', zscale)
    Vue.component('z-list', zlist)
    Vue.component('z-item', zitem)
    Vue.component('z-list-pagination', zdotnav)
    Vue.component('z-slider', zslider)
    Vue.component('z-range', zrange)
    Vue.component('z-scroll', zscroll)
    Vue.component('z-transition', ztransition)
    Vue.component('z-alert', zalert)
    Vue.component('z-button', zbutton)
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
