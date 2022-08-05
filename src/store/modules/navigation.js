import store from '../store'
import Vue from 'vue'
import { createUniqueKey, parseView, retrieveViewName } from '../utils'

const navigation = {
  addToHistory (view, position, params) {
    return store.state.history.push({
      uniqueKey: createUniqueKey(),
      name: view.name,
      position,
      params,
      component: store.actions.resolveComponent(store.actions.getComponentList(), view.name)
    })
  },
  resolveComponent (list, view) {
    view = view.split('--')[0]
    const key = Object.keys(list).find((k) => k.toLowerCase() === view)
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
    if (value === 'forward' || value === 'backward' || value === 'iddle' || value === 'replace') {
      store.state.navigationMode = value
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
      return
    }
    if (!options.to) store.actions.setLog('Programmatic navigation: "to" is required ', 'error')
    if (!options.fromSpot) store.actions.setLog('Programmatic navigation: "fromSpot" is required ', 'error')
    if (options.fromSpot && typeof options.fromSpot !== 'object') store.actions.setLog('Programmatic navigation: "fromSpot" should be an object ', 'error')
    if (options.params && typeof options.params !== 'object') store.actions.setLog('Programmatic navigation: "params" should be an object ', 'error')
    if (options.to && options.fromSpot) {
      if (!options.params) {
        options.params = {}
      }
      const positionParams = (
        options.fromSpot.position
          ? {
              position: {
                X: options.fromSpot.position.Xabs,
                Y: options.fromSpot.position.Yabs,
                scale: options.fromSpot.position.scale,
                Xi: options.fromSpot.position.Xi,
                Yi: options.fromSpot.position.Yi,
                scalei: options.fromSpot.position.scalei
              }
            }
          : {}
      )
      store.actions.setView(
        {
          name: options.to,
          params: options.params
        },
        positionParams
      )
    }
  },
  setView (data, options) {
    if (store.state.history.length >= 6) {
      store.actions.setLog('Max zoom level reached')
      return
    }

    const view = parseView(data)
    const position = (
      !options || (options.position && options.position.scale === 0)
        ? {
            X: 0,
            Y: 0,
            scale: 1,
            Xi: 0,
            Yi: 0,
            scalei: 1
          }
        : options.position
    )

    if (store.state.isRouterEnabled === false) {
      store.actions.addToHistory(view, position, view.route.params)
      store.actions.setNavigationMode('forward')
      if (view.route) {
        store.state.params = view.route.params
      }
    } else {
      store.actions.evaluateRoute(view, position)
    }
  },
  goBack () {
    if (store.state.history.length > 1) {
      store.actions.setNavigationMode('backward')
      store.state.history.pop()
      if (store.state.isRouterEnabled === true) {
        store.state.params = ''
      } else {
        store.state.params = store.state.history[store.state.history.length - 1].params
      }
      store.actions.setLog('goBack() => ' + store.state.history[store.state.history.length - 1].name)
    }
  }
}
export default navigation
