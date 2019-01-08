import store from '../store'
const app = {
  getAppMode () {
    return store.state.appMode
  },
  config (config) {
    if (config.debug === true || config.debug === false) store.state.debug = config.debug
    if (store.state.debug === true) {
      store.actions.setLog('config:')
      store.actions.setLog('- Debug enabled')
    }
    if (config.mode === 'full' || config.mode === 'mixed') {
      store.state.appMode = config.mode
      store.actions.setLog('- Mode: ' + config.mode)
    }
    if (config.style && config.style.theme) {
      store.state.appStyle.theme = 'theme-' + config.style.theme
      store.actions.setLog('- Theme: ' + config.style.theme)
    }
    if (config.style && config.style.mode) {
      store.state.appStyle.mode = 'mode-' + config.style.mode
      store.actions.setLog('- Theme mode: ' + config.style.mode)
    }
    if (config.router) {
      store.state.router = config.router
      store.state.isRouterEnabled = true
      store.actions.setRouterHooks()
      store.actions.setLog('- VueRouter enabled')
      // console.log(store.state.router.currentRoute)
      store.actions.setView({ name: store.state.router.currentRoute.name, params: store.state.router.currentRoute.params })
      if (store.actions.getAppMode() === 'mixed') store.actions.setLog('You should not use VueRouter when Zircle is in mixed mode.', 'warn')
    }
  }
}
export default app
