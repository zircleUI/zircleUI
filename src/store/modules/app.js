import store from '../store'
const app = {
  getAppMode () {
    return store.state.appMode
  },
  resetConfig () {
    store.state.appMode = 'full'
    store.state.navigationMode = 'forward'
    store.state.isRouterEnabled = false
    store.state.router = {}
    store.state.history = []
    store.state.backwardNavigation = false
    store.state.componentList = {}
    store.state.goBackView = ''
    store.state.lastView = ''
    store.state.diameters = {}
    store.state.sizes = {
      xxl: 55,
      xl: 32,
      l: 20,
      m: 12,
      s: 8,
      xs: 5,
      xxs: 2
    }
    store.state.appStyle = {
      theme: 'theme-black',
      mode: 'mode-dark',
      shape: 'circle'
    }
    store.state.currentPage = 0
    store.state.items = []
    store.state.pages = []
    store.state.params = {}
    store.state.debug = false
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
    if (config.sizes) {
      if (config.sizes.xxl) store.state.sizes.xxl = config.sizes.xxl
      if (config.sizes.xl) store.state.sizes.xl = config.sizes.xl
      if (config.sizes.l) store.state.sizes.l = config.sizes.l
      if (config.sizes.m) store.state.sizes.m = config.sizes.m
      if (config.sizes.s) store.state.sizes.s = config.sizes.s
      if (config.sizes.xs) store.state.sizes.xs = config.sizes.xs
      if (config.sizes.xxs) store.state.sizes.xxs = config.sizes.xxs
      store.actions.setLog('- Component sizes: ' + JSON.stringify(config.sizes))
    }
    if (config.style && config.style.theme) {
      store.state.appStyle.theme = 'theme-' + config.style.theme
      store.actions.setLog('- Theme: ' + config.style.theme)
    }
    if (config.style && config.style.mode) {
      store.state.appStyle.mode = 'mode-' + config.style.mode
      store.actions.setLog('- Theme mode: ' + config.style.mode)
    }
    if (config.style && config.style.shape) {
      store.state.appStyle.shape = config.style.shape
      store.actions.setLog('- Theme shape: ' + config.style.shape)
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
