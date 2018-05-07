import store from '../store'
function newIDGen (view, viewPosition) {
  let ID = ''
  if (viewPosition === 'previous') {
    var index = 1
  } else if (viewPosition === 'past') {
    index = 2
  } else {
    index = 3
  }
  store.state.cache[store.state.cache.length - index].id.split('--')
  view === viewPosition[0] ? ID = view + '--' + (Number(viewPosition[1]) + 1) : ID = view + '--0'
  return ID
}
function transformViewName (view) {
  switch (store.state.cache.length) {
    case 0:
      var newID = view + '--0'
      break
    case 1:
      newID = newIDGen(view, 'previous')
      break
    case 2:
      var prevViewName = store.state.cache[store.state.cache.length - 1].id.split('--')
      view === prevViewName[0] ? newID = newIDGen(view, 'previous') : newID = newIDGen(view, 'past')
      break
    default:
      newID = newIDGen(view, 'last')
      break
  }
  return newID
}
const navigation = {
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
    return store.state.currentView
  },
  getPreviousViewName () {
    return store.state.previousView
  },
  getPastViewName () {
    return store.state.pastView
  },
  getCurrentViewId () {
    return store.state.cache[store.state.cache.length - 1].id
  },
  getPreviousViewId () {
    return store.state.cache[store.state.cache.length - 2].id
  },
  getPastViewId () {
    return store.state.cache[store.state.cache.length - 3].id
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
      // let state = ''
      // value === true ? state = 'enabled' : state = 'disabled'
      // store.actions.setLog('BackNav is ' + state)
      store.state.goBackNav = value
    }
  },
  // setView() is deprecated and will be deleted on zircle 0.5.0. Use setViewName() instead.
  setView (view) {
    store.actions.setViewName(view)
    store.actions.setLog('Consider use setViewName() instead', 'warn')
  },
  setViewName (view) {
    store.actions.setLog('setViewName() => current view: ' + view)
    // check if viewname exists in previous or past and rename '_0' or '_1'
    var viewName = view.toLowerCase()
    store.actions.setHistory(viewName)
    switch (store.state.history.length) {
      case 1:
        store.state.previousView = ''
        store.state.pastView = ''
        break
      case 2:
        store.state.previousView = store.state.history[store.state.history.length - 2]
        store.state.pastView = ''
        break
      default:
        store.state.previousView = store.state.history[store.state.history.length - 2]
        store.state.pastView = store.state.history[store.state.history.length - 3]
        break
    }
    store.state.currentView = viewName
  },
  setHistory (view) {
    // only component with viewName
    if (store.state.mode === 'forward') {
      store.state.history.push(view)
      store.actions.setLog('setHistory() => new view: ' + view)
      var newID = transformViewName(view)
      store.state.cache.push({view: view, id: newID, position: store.state.position})
      if (store.state.isRouterEnabled === true && store.state.position.itemID === undefined) {
        store.state.$router.push({name: newID})
      } else if (store.state.isRouterEnabled === true && store.state.position.itemID !== undefined) {
        store.state.selectedItem = store.state.position.item
        store.state.$router.push({name: newID, params: {id: store.state.position.itemID.toLowerCase()}})
      } else {
        store.state.selectedItem = store.state.position.item
      }
    }
  },
  goBack () {
    if (store.state.cache.length > 1) {
      store.state.history.pop()
      store.state.lastViewCache = store.state.cache[store.state.cache.length - 1]
      store.state.cache.pop()
      store.state.cache[store.state.cache.length - 1].position.go = store.state.history[store.state.history.length - 1]
      store.state.mode = 'backward'
      store.actions.setLog('goBack() => ' + store.state.history[store.state.history.length - 1])
      store.actions.setAppPos(store.state.cache[store.state.cache.length - 1].position)
      store.state.component_uid = ''
    }
  }
}
export default navigation