import store from '../store'
function retrieveViewName (pos) {
  let viewName = ''
  if (store.state.history.length >= pos) {
    viewName = store.state.history[store.state.history.length - pos].viewName
  }
  return viewName
}
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
  data = (data.length && data[0] === '/') ? data.substr(1) : data
  let chunkData = data.split('/')
  let name = transformViewName(chunkData[0])
  // let params = {}
  let paramPath = ''
  for (var i = 1; i < chunkData.length; i++) {
    // params['param' + i] = chunkData[i]
    paramPath += '/' + chunkData[i]
  }
  var route = '/' + name + paramPath
  if (store.state.isRouterEnabled && store.state.$router.resolve(route).route.matched[0] === undefined) {
    createRoute(route, route, store.actions.resolveComponent(store.actions.getComponentList(), name))
  }
  return {
    name,
    route
  }
}
const navigation = {
  setFirst (data) {
    store.state.first = data
  },
  setLast (data) {
    store.state.last = data
  },
  getFirst (data) {
    return store.state.first
  },
  getLast (data) {
    return store.state.last
  },
  resolveComponent (list, view) {
    if (view) {
      view = view.split('--')[0]
      let key = Object.keys(list).find(function (k) {
        if (k.toLowerCase() === view) {
          return k
        }
      })
      return list[key]
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
      // store.state.component_uid = value
    }, 700)
  },
  resetComponent_uid () {
    store.state.component_uid = ''
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
  setNavigationMode (value) {
    if (value === 'forward' || value === 'backward' || value === '') {
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
    if (store.state.history.length < 6) {
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
    } else {
      store.actions.setLog('setView() => You have reach the max level of navigation')
    }
  },
  goBack () {
    if (store.state.history.length >= 1) {
      store.actions.setNavigationMode('backward')
      store.state.lastViewHistory = store.state.history[store.state.history.length - 1]
      store.state.history.pop()
      store.actions.setLog('goBack() => ' + store.state.history[store.state.history.length - 1].viewName)
    }
  }
}
export default navigation
