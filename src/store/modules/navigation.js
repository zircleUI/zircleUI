import store from '../store'
function transformViewName (view) {
  view = view.toLowerCase()
  var count = 0
  for (var i = 1; i <= store.state.history.length; i++) {
    if (store.state.history[store.state.history.length - i].viewName.split('--')[0] === view) {
      count += 1
    }
  }
  return view + '--' + count
}
function createRoute (path, name, component) {
  store.state.$router.addRoutes([{path: path,
    name: name,
    component: component
  }])
  store.actions.setLog('vue-router: route added: ' + name, component)
}
function parseView (data) {
  if (typeof data === 'string') {
    data = (data.length && data[0] === '/') ? data.substr(1) : data
    let chunkData = data.split('/')
    let name = transformViewName(chunkData[0])
    let params = {}
    let paramPath = ''
    for (var i = 1; i < chunkData.length; i++) {
      params['param' + i] = chunkData[i]
      paramPath += '/' + chunkData[i]
    }
    var route = '/' + name + paramPath
    if (store.state.isRouterEnabled && store.state.$router.resolve(route).route.matched[0] === undefined) {
      let component = store.actions.resolveComponent(store.actions.getComponentList(), name)
      console.log('/' + name + '' + paramPath)
      createRoute(route, route, component)
    }
    return {
      name,
      route
    }
  } else {
    // error
  }
}
const navigation = {
  resolveComponent (list, view) {
    if (view !== '') {
      view = view.split('--')[0]
      let key = Object.keys(list).find(function (k) {
        if (k.toLowerCase() === view) {
          return k
        }
      })
      return list[key]
    } else {
      console.log('todo mal chabon')
    }
  },
  setComponentList (list) {
    store.state.componentList = list
  },
  getComponentList () {
    return store.state.componentList
  },
  getComponent_uid () {
    return store.state.component_uid
  },
  setComponent_uid (value) {
    setTimeout(function () {
      store.state.component_uid = value
    }, 800)
  },
  resetComponent_uid () {
    store.state.component_uid = ''
  },
  getCurrentViewName () {
    if (store.state.history.length >= 1) {
      return store.state.history[store.state.history.length - 1].viewName
    } else {
      return ''
    }
  },
  getPreviousViewName () {
    if (store.state.history.length >= 2) {
      return store.state.history[store.state.history.length - 2].viewName
    } else {
      return ''
    }
  },
  getPastViewName () {
    if (store.state.history.length >= 3) {
      return store.state.history[store.state.history.length - 3].viewName
    } else {
      return ''
    }
  },
  getHistoryLength () {
    return store.state.history.length
  },
  setNavigationMode (value) {
    if (value === 'forward' || value === 'backward') {
      store.state.mode = value
      store.actions.setLog('Navigation mode is ' + value)
    } else {
      store.actions.setLog('setNavigationMode() only acepts forward or backward values', 'error')
    }
  },
  getNavigationMode () {
    return store.state.mode
  },
  getBackNavState () {
    return store.state.goBackNav
  },
  setBackNav (value) {
    if (value !== store.state.goBackNav) {
      store.state.goBackNav = value
    }
  },
  setView (data, options) {
    let view = parseView(data)
    if (options && options.router) {
      store.actions.setRouter(options.router, view.name)
    }
    let position = {}
    store.state.history.length === 0 ? position = {
      X: 0,
      Y: 0,
      scale: 1,
      Xi: 0,
      Yi: 0,
      scalei: 1
    } : position = options.position
    store.state.mode = 'forward'
    store.state.history.push({viewName: view.name, position: position})
    if (view.route && store.state.isRouterEnabled === true) store.state.$router.push(view.route)
  },
  goBack () {
    if (store.state.history.length >= 1) {
      store.state.lastViewHistory = store.state.history[store.state.history.length - 1]
      store.state.history.pop()
      store.actions.setLog('goBack() => ' + store.state.history[store.state.history.length - 1].viewName)
      store.state.component_uid = ''
    }
  }
}
export default navigation
