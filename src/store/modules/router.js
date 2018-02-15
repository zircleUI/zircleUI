import store from '../store'
function createRoute (path, name, component, params) {
  store.state.$router.addRoutes([{path: path,
    name: name,
    component: component
  }])
  store.actions.setLog('vue-router: route added: ' + name)
  params !== undefined ? store.state.$router.push({name: name, params: params}) : store.state.$router.push({name: name})
}
function findComponent (list, view) {
  return Object.keys(list).find(function (k) {
    if (k.toLowerCase() === view) {
      return k
    }
  })
}
const router = {
  getRouterState () {
    return store.state.isRouterEnabled
  },
  // RouterHooks() is deprecated and will be deleted on zircle 0.5.0. Use setRouter() instead.
  routerHooks (data) {
    store.actions.setLog('Consider use setRouter() instead', 'warn')
    store.actions.setRouter(data)
  },
  setRouter (data) {
    store.actions.setLog('vue-router enabled')
    // Auto configuration for vue-router
    store.state.$router = data.$router
    store.state.isRouterEnabled = true
    store.actions.setViewName(data.initialView.toLowerCase())
    // Add default redirect route to initialView and go to initialView
    store.state.$router.onReady(function () {
      var view = data.initialView.toLowerCase()
      store.state.$router.addRoutes([{path: '/', redirect: '/' + view + '--0'}])
      // 0.3.3 (fix bug init)
      let key = findComponent(data.$options.components, view)
      createRoute('/' + view + '--0', view + '--0', data.$options.components[key])
    })
    // Router hooks
    store.state.$router.beforeEach((to, from, next) => {
      if (from.name === store.state.cache[store.state.cache.length - 1].id && to.name !== store.state.lastViewCache.id) {
        // Go backward using both: browser navigation arrows or zircle UI
        store.actions.setLog('vue-router: Go backward' + to.name)
        store.actions.goBack()
        next()
      } else if (to.name === store.state.cache[store.state.cache.length - 1].id && to.name !== store.state.lastViewCache.id) {
        // Check if the route exists
        if (to.matched.length === 0) {
          // If not, add route
          let component = to.name.split('--')
          let key = findComponent(data.$options.components, component[0])
          if (to.params.id === undefined) {
            createRoute('/' + to.name, to.name, data.$options.components[key])
          } else {
            createRoute('/' + to.name + '/:id', to.name, data.$options.components[key], to.params)
          }
        } else {
          // If exists, go forward
          store.actions.setLog('vue-router: Go forward: ' + to.name)
          store.state.lastViewCache = {}
          next()
        }
      } else if (to.name === store.state.lastViewCache.id && to.name === store.state.cache[store.state.cache.length - 1].id) {
        // Just in case browser navigation forward arrow is clicked
        store.actions.setLog('vue-router: browser forward arrow was clicked: ' + to.name)
        store.state.lastViewCache = {}
        next()
      } else {
        store.actions.setLog('Router Error: unable to resolve routes :(', 'error')
        next(false)
      }
    })
  }
}

export default router
