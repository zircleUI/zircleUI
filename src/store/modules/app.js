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
    if (config.mode === 'full' || config.mode === 'embedded') {
      store.state.appMode = config.mode
      store.actions.setLog('- Mode: ' + config.mode)
    }
    if (config.style.theme) {
      store.state.appStyle.theme = 'theme-' + config.style.theme
      store.actions.setLog('- Theme: ' + config.style.theme)
    }
    if (config.style.mode) {
      store.state.appStyle.mode = 'mode-' + config.style.mode
      store.actions.setLog('- Theme mode: ' + config.style.mode)
    }
    if (config.router) {
      store.state.router = config.router
      store.state.isRouterEnabled = true
      store.actions.setRouterHooks()
      store.actions.setLog('- VueRouter enabled')
      if (store.actions.getAppMode() === 'embedded') store.actions.setLog('You should not use VueRouter when Zircle is in embedded mode.', 'warn')
    }
  }
}
export default app
