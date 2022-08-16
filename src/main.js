import Vue from 'vue'
import App from './App.vue'
import zircle from './index.js'

Vue.use(zircle)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
