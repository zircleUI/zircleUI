import store from '../store'
function createRoute (path, name, component) {
  store.state.$router.addRoutes([{path: path,
    name: name,
    component: component
  }])
  store.actions.setLog('vue-router: route added: ' + name)
}
function runHooks () {
  store.state.$router.beforeEach((to, from, next) => {
    if (store.state.mode === 'forward' && store.state.history.length >= 1) {
      store.actions.setLog('vue-router: Go forward: ' + to.name)
      next()
    } else {
      if (store.state.history.length > 1) {
        store.actions.goBack()
        store.actions.setLog('vue-router: Go backward: ' + to.name)
        next()
      }
    }
  })
}
const router = {
  getRouterState () {
    return store.state.isRouterEnabled
  },
  setRouter (data, view) {
    // Auto configuration for vue-router
    store.state.$router = data
    store.state.isRouterEnabled = true
    store.actions.setLog('vue-router enabled')
    if (store.actions.getAppMode() === 'embedded') store.actions.setLog('As zircle is embedded maybe you should not use vue-router as affects whole app.', 'warn')
    store.actions.setLog('vue-router enabled')
    // Add default redirect route to initialView and go to initialView
    store.state.$router.onReady(function () {
      store.state.$router.addRoutes([{path: '/', redirect: '/' + view}])
      createRoute('/' + view, view, store.actions.resolveComponent(store.actions.getComponentList(), view))
    })
    runHooks()
  }
}

export default router
