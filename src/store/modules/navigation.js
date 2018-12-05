import store from '../store'
import Vue from 'vue'
function retrieveViewName (pos) {
  let viewName = ''
  if (store.state.history.length >= pos) {
    viewName = store.state.history[store.state.history.length - pos].name
  }
  return viewName
}
function papa (view, position, params) {
  return store.state.history.push({name: view.name, position: position, params: params, component: store.actions.resolveComponent(store.actions.getComponentList(), view.name)})
}
function transformViewName (view) {
  view = view.toLowerCase()
  var count = 0
  for (var i = 1; i <= store.state.history.length; i++) {
    if (store.state.history[store.state.history.length - i].name.split('--')[0] === view) {
      count += 1
    }
  }
  if (store.state.isRouterEnabled) {
    return view
  } else {
    return view + '--' + count
  }
}
function createRoute (path, name, component) {
  if (store.state.isRouterEnabled && store.state.router.resolve(path).route.matched[0] === undefined) {
    store.state.router.addRoutes([{path: path,
      name: name,
      component: component
    }])
    store.actions.setLog('VueRouter: route added ' + name, component)
  }
}
function parseView (data) {
  if (typeof data === 'string') {
    var name = transformViewName(data)
    var route = '/' + name
    createRoute(route, name, store.actions.resolveComponent(store.actions.getComponentList(), name))
  } else {
    name = transformViewName(data.name)
    let params = data.params
    let paramPath = ''
    Object.keys(params).forEach(function (key) {
      paramPath += '/' + key + '/:' + key
    })
    var path = '/' + name + paramPath
    route = {name: name, params: data.params}
    createRoute(path, name, store.actions.resolveComponent(store.actions.getComponentList(), name))
  }
  return {
    name,
    route
  }
}
const navigation = {
  resolveComponent (list, view) {
    view = view.split('--')[0]
    let key = Object.keys(list).find(function (k) {
      if (k.toLowerCase() === view) return k
    })
    if (key) {
      return list[key]
    } else {
      return Vue.component('missing', {
        render (h) {
          return h('z-view', view + ' not found')
        }
      })
    }
  },
  setComponentList (list) {
    store.state.componentList = Object.assign({}, store.state.componentList, list)
  },
  getComponentList () {
    return store.state.componentList
  },
  getCurrentViewName () {
    return retrieveViewName(1)
  },
  getPreviousViewName () {
    return retrieveViewName(2)
  },
  getPastViewName () {
    return retrieveViewName(3)
  },
  getHistoryLength () {
    return store.state.history.length
  },
  getHistory () {
    return store.state.history.slice(0)
  },
  setNavigationMode (value) {
    if (value === 'forward' || value === 'backward' || value === '') {
      store.state.navigationMode = value
      if (value === '') value = 'iddle'
      store.actions.setLog('Navigation mode is ' + value)
    }
  },
  getNavigationMode () {
    return store.state.navigationMode
  },
  getBackwardNavigationState () {
    return store.state.backwardNavigation
  },
  allowBackwardNavigation (value) {
    if (value !== store.state.backwardNavigation) {
      store.state.backwardNavigation = value
    }
  },
  toView (options) {
    if (typeof options === 'string') {
      store.actions.setView(options)
    } else {
      if (!options.to) store.actions.setLog('Programmatic navigation: "to" is required ', 'error')
      if (!options.fromSpot) store.actions.setLog('Programmatic navigation: "fromSpot" is required ', 'error')
      if (options.fromSpot && typeof options.fromSpot !== 'object') store.actions.setLog('Programmatic navigation: "fromSpot" should be an object ', 'error')
      if (options.params && typeof options.params !== 'object') store.actions.setLog('Programmatic navigation: "params" should be an object ', 'error')
      if (options.to && options.fromSpot && !options.params) store.actions.setView(options.to, {position: {X: options.fromSpot.position.Xabs, Y: options.fromSpot.position.Yabs, scale: options.fromSpot.position.scale, Xi: options.fromSpot.position.Xi, Yi: options.fromSpot.position.Yi, scalei: options.fromSpot.position.scalei}})
      if (options.to && options.fromSpot && options.params) store.actions.setView({name: options.to, params: options.params}, {position: {X: options.fromSpot.position.Xabs, Y: options.fromSpot.position.Yabs, scale: options.fromSpot.position.scale, Xi: options.fromSpot.position.Xi, Yi: options.fromSpot.position.Yi, scalei: options.fromSpot.position.scalei}})
    }
  },
  setView (data, options) {
    if (store.state.history.length < 6) {
      let view = parseView(data)
      let position = {}
      !options ? position = {X: 0, Y: 0, scale: 1, Xi: 0, Yi: 0, scalei: 1} : position = options.position
      papa(view, position, view.route.params)
      store.actions.setNavigationMode('forward')
      view.route && store.state.isRouterEnabled === true ? store.state.router.push(view.route) : store.state.params = view.route.params
    } else {
      store.actions.setLog('Max zoom level reached')
    }
  },
  goBack () {
    if (store.state.history.length > 1) {
      store.actions.setNavigationMode('backward')
      store.state.history.pop()
      store.state.isRouterEnabled === true ? store.state.params = '' : store.state.params = store.state.history[store.state.history.length - 1].params
      store.actions.setLog('goBack() => ' + store.state.history[store.state.history.length - 1].name)
    }
  }
}
export default navigation
