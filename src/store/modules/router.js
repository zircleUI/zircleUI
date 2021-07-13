import store from '../store'
const router = {
  evaluateRoute (view, position) {
    const match = store.state.router.resolve(view.path).route.matched[0]
    const component = match.components.default
    const name = match.name
    store.actions.setComponentList({ [name]: component })
    store.state.history.push({ name: name, position: position, params: view.route.params, component: component })
    store.actions.setNavigationMode('forward')
    if (view.name !== name) {
      return store.state.router.push({ name: name, params: view.route.params })
    } else {
      return store.state.router.push(view.route)
    }
  },
  replace (view) {
    const match = store.state.router.resolve(view).route.matched[0]
    const component = match.components.default
    store.state.params = ''
    store.state.history = []
    store.actions.setComponentList({ [view.name]: component })
    store.state.history.push({ name: view.name, position: { X: 0, Y: 0, scale: 1, Xi: 0, Yi: 0, scalei: 1 }, params: view.params, component: component })
    store.actions.setNavigationMode('forward')
    store.state.router.replace(view)
    store.actions.setLog('replace() => ' + store.state.history[store.state.history.length - 1].name)
  },
  getRouterState () {
    return store.state.isRouterEnabled
  },
  isFallbackView () {
    if (store.actions.getFallbackView() !== store.actions.getCurrentViewName() && store.actions.getHistoryLength() === 1) return true
  },
  setFallbackView (view) {
    store.state.goBackView = view
  },
  getFallbackView () {
    return store.state.goBackView
  },
  setRouterHooks () {
    store.state.router.beforeEach((to, from, next) => {
      if (store.actions.getNavigationMode() === 'forward' && store.state.history.length >= 1) {
        store.actions.setLog('VueRouter: zoom-in to ' + to.name)
        next()
      } else if (store.actions.getNavigationMode() === 'backward' && store.state.history.length >= 1) {
        store.actions.goBack()
        store.actions.setLog('VueRouter: zoom-out to ' + to.name)
        next()
      } else if (store.actions.getNavigationMode() === 'iddle' && store.state.history.length >= 1) {
        if (window.onhashchange || window.onpopstate) {
          store.actions.goBack()
          store.actions.setLog('VueRouter: goBack')
        } else {
          store.actions.replace({ name: to.name, params: to.params })
          store.actions.setLog('VueRouter: replace url')
        }
        next()
      }
    })
  }
}

export default router
