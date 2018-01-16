var store = {
  state: {
    position: {
      X: 0,
      Y: 0,
      scale: 1,
      Xi: 0,
      Yi: 0,
      scalei: 1
    },
    alert: false,
    // navigation
    mode: 'forward',
    isRouterEnabled: false,
    $router: {},
    currentView: '',
    previousView: '',
    pastView: '',
    history: [],
    cache: [],
    lastViewCache: {},
    backwardNavigation: false,
    // styles
    zircleWidth: {
      xl: 200,
      l: 70,
      m: 50,
      s: 30,
      xs: 20,
      xxs: 20
    },
    color: 'color--black',
    theme: 'theme--light',
    // temporary for pagination
    selectedItem: '',
    currentPage: 0,
    items: [],
    pages: []
  },
  // routerHooks is deprecated and will be deleted on zircle 0.5.0. Use setRouter instead.
  routerHooks (data) {
    store.setRouter(data)
  },
  setRouter (data) {
    // Auto configuration for vue-router
    store.state.$router = data.$router
    store.state.isRouterEnabled = true
    store.setView(data.initialView.toLowerCase())
    // Add default redirect route to initialView and go to initialView
    store.state.$router.onReady(function () {
      var view = data.initialView.toLowerCase()
      store.state.$router.addRoutes([{path: '/',
        redirect: '/' + view + '--0'
      }])
      store.state.$router.addRoutes([{path: '/' + view + '--0',
        name: view + '--0',
        component: data.$options.components[view]
      }])
      store.state.$router.push({name: view + '--0'})
    })
    // Router hooks
    store.state.$router.beforeEach((to, from, next) => {
      if (from.name === store.state.cache[store.state.cache.length - 1].id && to.name !== store.state.lastViewCache.id) {
        // Go backward using both: browser navigation arrows or zircle UI
        store.goBack()
        next()
      } else if (to.name === store.state.cache[store.state.cache.length - 1].id && to.name !== store.state.lastViewCache.id) {
        // Check if the route exists
        if (to.matched.length === 0) {
          // If not, add route
          var component = to.name.split('--')
          let key = Object.keys(data.$options.components).find(function (k) {
            if (k.toLowerCase() === component[0]) {
              return k
            }
          })
          if (to.params.id === undefined) {
            store.state.$router.addRoutes([{path: '/' + to.name,
              name: to.name,
              component: data.$options.components[key]
            }])
            store.state.$router.push({name: to.name})
          } else {
            store.state.$router.addRoutes([{path: '/' + to.name + '/:id',
              name: to.name,
              component: data.$options.components[key]
            }])
            store.state.$router.push({name: to.name, params: to.params})
          }
        } else {
          // If exists, go forward
          store.state.lastViewCache = {}
          next()
        }
      } else if (to.name === store.state.lastViewCache.id && to.name === store.state.cache[store.state.cache.length - 1].id) {
        // Just in case browser navigation forward arrow is clicked
        store.state.lastViewCache = {}
        next()
      } else {
        console.log('Router Error')
        console.log(to.name, from.name, store.state.lastViewCache.id, store.state.cache[store.state.cache.length - 1].id)
        next(false)
      }
    })
  },
  setScroll (angle) {
    store.state.scroll = angle
  },
  killLastView () {
    store.state.lastView = ''
  },
  // no uso media query asi que seteo el ancho de cad circulo aca
  getDimensions () {
    // small devices
    if (window.matchMedia('(max-width: 319px)').matches) {
      store.state.zircleWidth.xl = 200
      store.state.zircleWidth.l = 70
      store.state.zircleWidth.m = 50
      store.state.zircleWidth.s = 30
      store.state.zircleWidth.xs = 20
      store.state.zircleWidth.xxs = 20
    }
    // medium
    if (window.matchMedia('(min-width: 320px)').matches) {
      store.state.zircleWidth.xl = 230
      store.state.zircleWidth.l = 85
      store.state.zircleWidth.m = 65
      store.state.zircleWidth.s = 45
      store.state.zircleWidth.xs = 30
      store.state.zircleWidth.xxs = 20
    }
    // medium - large devices
    if (window.matchMedia('(min-width: 375px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 260
      store.state.zircleWidth.l = 90
      store.state.zircleWidth.m = 70
      store.state.zircleWidth.s = 50
      store.state.zircleWidth.xs = 40
      store.state.zircleWidth.xxs = 30
    }
    if (window.matchMedia('(min-width: 375px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 270
      store.state.zircleWidth.l = 90
      store.state.zircleWidth.m = 70
      store.state.zircleWidth.s = 50
      store.state.zircleWidth.xs = 40
      store.state.zircleWidth.xxs = 30
    }
    // tablets
    if (window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)').matches) {
      store.state.zircleWidth.xl = 340
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    if (window.matchMedia('(min-width: 768px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 360
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    // desktop or large tablets
    if (window.matchMedia('(min-width: 992px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 420
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    if (window.matchMedia('(min-width: 992px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 420
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    // large desktop
    if (window.matchMedia('(min-width: 1200px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 430
      store.state.zircleWidth.l = 130
      store.state.zircleWidth.m = 110
      store.state.zircleWidth.s = 90
      store.state.zircleWidth.xs = 70
      store.state.zircleWidth.xxs = 50
    }
    // xl desktop
    if (window.matchMedia('(min-width: 1800px)').matches) {
      store.state.zircleWidth.xl = 650
      store.state.zircleWidth.l = 130
      store.state.zircleWidth.m = 110
      store.state.zircleWidth.s = 90
      store.state.zircleWidth.xs = 70
      store.state.zircleWidth.xxs = 50
    }
  },
  point (component) {
    // VARIABLE DECLARATION
    var scale = 1
    var scalei = 1
    var currentX = 0
    var currentY = 0
    var currentXi = 0
    var currentYi = 0
    var parentPosition = {}
    var newPosition = {}
    // EJECUTA FUNCI ON
    if (component.type === 'panel') {
      if (store.state.mode === 'backward' && store.state.cache.length >= 3 && store.state.cache[store.state.cache.length - 3].id === component.viewID) {
        newPosition = {
          X: store.state.cache[store.state.cache.length - 3].position.X,
          Xi: store.state.cache[store.state.cache.length - 3].position.Xi,
          Y: store.state.cache[store.state.cache.length - 3].position.Y,
          Yi: store.state.cache[store.state.cache.length - 3].position.Yi,
          scalei: store.state.cache[store.state.cache.length - 3].position.scalei,
          scale: store.state.cache[store.state.cache.length - 3].position.scale
        }
      } else {
        newPosition = {
          X: store.state.position.X,
          Xi: store.state.position.Xi,
          Y: store.state.position.Y,
          Yi: store.state.position.Yi,
          scalei: store.state.position.scalei,
          scale: store.state.position.scale
        }
      }
    } else {
      var angle = component.angle
      var distance = component.distance
      if (component.size === 'xxs') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xxs
        scalei = store.state.zircleWidth.xxs / store.state.zircleWidth.xl
      } else if (component.size === 'extrasmall') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xs
        scalei = store.state.zircleWidth.xs / store.state.zircleWidth.xl
      } else if (component.size === 'small') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.s
        scalei = store.state.zircleWidth.s / store.state.zircleWidth.xl
      } else if (component.size === 'medium') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.m
        scalei = store.state.zircleWidth.m / store.state.zircleWidth.xl
      } else if (component.size === 'large') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.l
        scalei = store.state.zircleWidth.l / store.state.zircleWidth.xl
      } else if (component.size === 'extralarge') {
        scale = 1
        scalei = 1
      }
      if (distance === 0) {
        currentX = 0
        currentY = 0
      } else {
        currentX = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180))
        currentY = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180))
      }
      if (currentX > 0) {
        currentXi = -Math.abs(Number(currentX))
      } else {
        currentXi = Math.abs(Number(currentX))
      }
      if (currentY > 0) {
        currentYi = -Math.abs(Number(currentY))
      } else {
        currentYi = Math.abs(Number(currentY))
      }
      if (component.$parent.type === 'panel') {
        parentPosition = {
          Xi: component.$parent.position.Xi,
          Yi: component.$parent.position.Yi,
          X: component.$parent.position.X,
          Y: component.$parent.position.Y,
          scalei: component.$parent.position.scalei,
          scale: component.$parent.position.scale
        }
      } else {
        parentPosition = {
          Xi: 0,
          Yi: 0,
          X: 0,
          Y: 0,
          scalei: 1,
          scale: 1
        }
      }
      newPosition = {
        X: currentX,
        Y: currentY,
        Xi: parentPosition.Xi + currentXi * parentPosition.scalei,
        Yi: parentPosition.Yi + currentYi * parentPosition.scalei,
        scale: parentPosition.scale * scale,
        scalei: parentPosition.scalei * scalei,
        Xabs: parentPosition.X + currentX * parentPosition.scalei,
        Yabs: parentPosition.Y + currentY * parentPosition.scalei
      }
    }
    return newPosition
  },
  setAppPos (data) {
    store.state.position = {
      X: data.X,
      Y: data.Y,
      scale: data.scale,
      Xi: data.Xi,
      Yi: data.Yi,
      scalei: data.scalei,
      go: data.go,
      itemID: data.itemID,
      item: data.item
    }
    store.setView(data.go)
  },
  setView (view) {
    // check if viewname exists in previous or past and rename '_0' or '_1'
    var viewName = view.toLowerCase()
    store.setHistory(viewName)
    if (store.state.history.length === 1) {
      store.state.previousView = ''
      store.state.pastView = ''
    } else if (store.state.history.length === 2) {
      store.state.previousView = store.state.history[store.state.history.length - 2]
      store.state.pastView = ''
    } else if (store.state.history.length >= 3) {
      store.state.previousView = store.state.history[store.state.history.length - 2]
      store.state.pastView = store.state.history[store.state.history.length - 3]
    }
    store.state.currentView = viewName
  },
  setHistory (view) {
    // only component with viewName
    if (store.state.mode === 'forward') {
      store.state.history.push(view)
      var prevViewName = ''
      var pastViewName = ''
      if (store.state.cache.length === 0) {
        newID = view + '--0'
      }
      if (store.state.cache.length === 1) {
        prevViewName = store.state.cache[store.state.cache.length - 1].id.split('--')
        if (view === prevViewName[0]) {
          var newID = view + '--' + (Number(prevViewName[1]) + 1)
        } else if (view !== prevViewName[0]) {
          newID = view + '--0'
        }
      }
      if (store.state.cache.length >= 2) {
        prevViewName = store.state.cache[store.state.cache.length - 1].id.split('--')
        pastViewName = store.state.cache[store.state.cache.length - 2].id.split('--')
        if (view === prevViewName[0] && view === pastViewName[0]) {
          newID = view + '--' + (Number(prevViewName[1]) + 1)
        } else if (view === prevViewName[0] && view !== pastViewName[0]) {
          newID = view + '--' + (Number(prevViewName[1]) + 1)
        } else if (view !== prevViewName[0] && view === pastViewName[0]) {
          newID = view + '--' + (Number(pastViewName[1]) + 1)
        } else if (view !== prevViewName[0] && view !== pastViewName[0]) {
          newID = view + '--0'
        }
      }
      if (store.state.cache.length >= 3) {
        var lastViewName = store.state.cache[store.state.cache.length - 3].id.split('--')
        if (view === lastViewName[0]) {
          newID = view + '--' + (Number(prevViewName[1]) + 1)
        } else {
          newID = view + '--0'
        }
      }
      var cacheView = {
        view: view,
        id: newID,
        position: store.state.position
      }
      store.state.cache.push(cacheView)
      if (store.state.isRouterEnabled === true) {
        if (store.state.position.itemID === undefined) {
          store.state.$router.push({name: newID})
        } else {
          store.state.selectedItem = store.state.position.item
          var id = store.state.position.itemID.toLowerCase()
          // trim spaces
          store.state.$router.push({name: newID, params: {id: id}})
        }
      } else {
        if (store.state.position.item !== undefined) {
          store.state.selectedItem = store.state.position.item
        }
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
      store.setAppPos(store.state.cache[store.state.cache.length - 1].position)
    }
  }
}

export default store
