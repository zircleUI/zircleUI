import store from '../store'
function transformViewName (view) {
  if (store.state.cache.length === 0) {
    var newID = view + '--0'
  } else if (store.state.cache.length === 1) {
    var prevViewName = store.state.cache[store.state.cache.length - 1].id.split('--')
    view === prevViewName[0] ? newID = view + '--' + (Number(prevViewName[1]) + 1) : newID = view + '--0'
  } else if (store.state.cache.length === 2) {
    prevViewName = store.state.cache[store.state.cache.length - 1].id.split('--')
    var pastViewName = store.state.cache[store.state.cache.length - 2].id.split('--')
    if (view === prevViewName[0]) {
      newID = view + '--' + (Number(prevViewName[1]) + 1)
    } else {
      view === pastViewName[0] ? newID = view + '--' + (Number(pastViewName[1]) + 1) : newID = view + '--0'
    }
  } else {
    var lastViewName = store.state.cache[store.state.cache.length - 3].id.split('--')
    view === lastViewName[0] ? newID = view + '--' + (Number(prevViewName[1]) + 1) : newID = view + '--0'
  }
  return newID
}
const navigation = {
  getCurrentViewName () {
    console.log(store.state.currentView)
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
    store.actions.setLog('setHistory() => new view: ' + view)
    // only component with viewName
    if (store.state.mode === 'forward') {
      store.state.history.push(view)
      var newID = transformViewName(view)
      store.state.cache.push({view: view, id: newID, position: store.state.position})
      if (store.state.isRouterEnabled === true) {
        store.state.position.itemID === undefined ? store.state.$router.push({name: newID}) : (
            store.state.selectedItem = store.state.position.item,
            store.state.$router.push({name: newID, params: {id: store.state.position.itemID.toLowerCase()}})
          )
      } else {
        store.state.position.item !== undefined ? store.state.selectedItem = store.state.position.item : ''
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
    }
  }
}
export default navigation
