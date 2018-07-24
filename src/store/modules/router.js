import store from '../store'
const router = {
  getRouterState () {
    return store.state.isRouterEnabled
  },
  setRouterHooks () {
    store.state.router.beforeEach((to, from, next) => {
      if (store.actions.getNavigationMode() === 'forward' && store.state.history.length >= 1) {
        store.actions.setLog('VueRouter: zoom-in to ' + to.name)
        next()
      } else {
        if (store.state.history.length > 1) {
          store.actions.goBack()
          store.actions.setLog('VueRouter: zoom-out to ' + to.name)
          next()
        }
      }
    })
  }
}

export default router
