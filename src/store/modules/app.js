import store from '../store'
const app = {
  getAppMode () {
    return store.state.appMode
  },
  isUsingPercentSizes () {
    return store.state.usePercentSizes
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
    store.state.usePercentSizes = false
    store.state.percentSizes = {
      xxl: 55,
      xl: 32,
      l: 20,
      m: 12,
      s: 8,
      xs: 5,
      xxs: 2
    }
    store.state.minSizesInPixels = {
      xxl: 200,
      xl: 180,
      l: 150,
      m: 100,
      s: 80,
      xs: 50,
      xxs: 20
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
    if (typeof config.usePercentSizes === 'boolean') {
      store.state.usePercentSizes = config.usePercentSizes
      store.actions.setLog(`- Percent sizes ${config.usePercentSizes ? 'ON' : 'OFF'}`)
    }
    if (config.percentSizes) {
      if (config.percentSizes.xxl) store.state.percentSizes.xxl = config.percentSizes.xxl
      if (config.percentSizes.xl) store.state.percentSizes.xl = config.percentSizes.xl
      if (config.percentSizes.l) store.state.percentSizes.l = config.percentSizes.l
      if (config.percentSizes.m) store.state.percentSizes.m = config.percentSizes.m
      if (config.percentSizes.s) store.state.percentSizes.s = config.percentSizes.s
      if (config.percentSizes.xs) store.state.percentSizes.xs = config.percentSizes.xs
      if (config.percentSizes.xxs) store.state.percentSizes.xxs = config.percentSizes.xxs
      store.actions.setLog('- Component percentSizes: ' + JSON.stringify(config.percentSizes))
    }
    if (config.minSizesInPixels) {
      if (config.minSizesInPixels.xxl) store.state.minSizesInPixels.xxl = config.minSizesInPixels.xxl
      if (config.minSizesInPixels.xl) store.state.minSizesInPixels.xl = config.minSizesInPixels.xl
      if (config.minSizesInPixels.l) store.state.minSizesInPixels.l = config.minSizesInPixels.l
      if (config.minSizesInPixels.m) store.state.minSizesInPixels.m = config.minSizesInPixels.m
      if (config.minSizesInPixels.s) store.state.minSizesInPixels.s = config.minSizesInPixels.s
      if (config.minSizesInPixels.xs) store.state.minSizesInPixels.xs = config.minSizesInPixels.xs
      if (config.minSizesInPixels.xxs) store.state.minSizesInPixels.xxs = config.minSizesInPixels.xxs
      store.actions.setLog('- Component minSizesInPixels: ' + JSON.stringify(config.minSizesInPixels))
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
      store.actions.setView({
        name: store.state.router.currentRoute.name,
        params: store.state.router.currentRoute.params
      })
      if (store.actions.getAppMode() === 'mixed') store.actions.setLog('You should not use VueRouter when Zircle is in mixed mode.', 'warn')
    }
  }
}
export default app
