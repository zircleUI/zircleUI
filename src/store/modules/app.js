import store from '../store'

const initialState = {
  appMode: 'full',
  navigationMode: 'forward',
  isRouterEnabled: false,
  router: {},
  history: [],
  backwardNavigation: false,
  componentList: {},
  goBackView: '',
  diameters: {},
  usePercentSizes: false,
  percentSizes: {
    xxl: 30,
    xl: 20,
    l: 16,
    m: 8,
    s: 6,
    xs: 4,
    xxs: 2
  },
  minSizesInPixels: {
    xxl: 180,
    xl: 150,
    l: 100,
    m: 80,
    s: 50,
    xs: 30,
    xxs: 20
  },
  appStyle: {
    theme: 'theme-black',
    mode: 'mode-dark',
    shape: 'circle'
  },
  currentPage: 0,
  items: [],
  pages: [],
  params: {},
  debug: false
}
const app = {
  getAppMode () {
    return store.state.appMode
  },
  isUsingPercentSizes () {
    return store.state.usePercentSizes
  },
  resetConfig () {
    store.state.data = initialState
  },
  config (config) {
    if (typeof config.debug === 'boolean') store.state.debug = config.debug
    if (store.state.debug === true) store.actions.setLog('- Debug enabled')
    if (config.mode === 'full' || config.mode === 'mixed') {
      store.state.appMode = config.mode
      store.actions.setLog('- Mode: ' + config.mode)
    }
    if (typeof config.usePercentSizes === 'boolean') {
      store.state.usePercentSizes = config.usePercentSizes
      store.actions.setLog(`- Percent sizes ${config.usePercentSizes ? 'ON' : 'OFF'}`)
    }
    if (config.percentSizes) {
      store.state.percentSizes = config.percentSizes
      store.actions.setLog('- Component percentSizes: ' + JSON.stringify(config.percentSizes))
    }
    if (config.minSizesInPixels) {
      store.state.minSizesInPixels = config.minSizesInPixels
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
